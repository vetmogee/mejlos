'use client'

import { useEffect, useRef, useState } from 'react'
import { markIntroFinished } from '@/lib/introSignal'

const WORD = 'mejlos'
const FALL_DURATION = 5000
const HOLD_DURATION = 700
const FADE_DURATION = 600
const SAMPLE_STEP = 5
const RAIN_COUNT = 70
// Extra canvas size beyond the physical screen (total, split per edge) so
// coverage never depends on how mobile Safari sizes its viewport.
const OVERSCAN = 320
// While the intro plays, the page sits scrolled this far down. iOS Safari
// only draws content behind the top status bar once it has scrolled past
// the viewport top — nothing above document y=0 is ever painted — so the
// canvas's top strip has to be real, scrolled-past document content.
const RUNWAY = OVERSCAN / 2

type LetterPixel = {
  x: number
  y: number
  targetY: number
  startY: number
  delay: number
  duration: number
  size: number
  alpha: number
}

type RainPixel = {
  x: number
  y: number
  speed: number
  size: number
  alpha: number
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export default function PixelIntro() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [fading, setFading] = useState(false)
  const [done, setDone] = useState(false)

  // Safari (especially iOS) restores the page from the back-forward cache
  // when returning to the tab or navigating back — no reload happens, so
  // without this the intro only ever plays on a cold load.
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        setFading(false)
        setDone(false)
      }
    }
    window.addEventListener('pageshow', onPageShow)
    return () => window.removeEventListener('pageshow', onPageShow)
  }, [])

  useEffect(() => {
    if (done) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true)
      markIntroFinished()
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Scroll lock without body overflow:hidden — iOS 26 Safari stops
    // rendering page content behind its toolbars when the page is made
    // non-scrollable that way. touch-action blocks touch panning; the
    // scroll listener snaps back anything else (e.g. desktop wheel).
    const prevTouchAction = document.documentElement.style.touchAction
    document.documentElement.style.touchAction = 'none'
    // Pin the page RUNWAY px down (the in-flow spacer in the JSX keeps the
    // real content at its natural visual position despite this) so the
    // canvas's top strip counts as scrolled-past content.
    // 'instant' so the page's scroll-behavior:smooth doesn't animate it.
    const keepRunway = () =>
      window.scrollTo({ top: RUNWAY, left: 0, behavior: 'instant' })
    window.addEventListener('scroll', keepRunway)
    keepRunway()

    let width = 0
    let height = 0
    let letterPixels: LetterPixel[] = []
    let rainPixels: RainPixel[] = []
    let fadeStarted = false

    function buildScene() {
      // Cap dpr: the oversized canvas would otherwise get a huge buffer.
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      // Vertical: size from the physical screen plus overscan, never the
      // viewport — mobile Safari resizes its viewport around its toolbars,
      // so overshoot the top and bottom screen edges instead.
      // Horizontal: exactly the viewport width; there is no side chrome,
      // and right-side bleed would add horizontal scroll range now that
      // the overlay is in-flow (absolute, not fixed).
      width = document.documentElement.clientWidth
      height = Math.max(window.innerHeight, screen.height) + OVERSCAN
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      // Anchored at the document top while the intro plays (rows [0,
      // RUNWAY) are the scrolled-past strip behind the status bar);
      // shifted up once the fade begins and scroll returns to 0.
      canvas!.style.top = fadeStarted ? `${-RUNWAY}px` : '0px'
      canvas!.style.left = '0px'
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      const offscreen = document.createElement('canvas')
      offscreen.width = width
      offscreen.height = height
      const offCtx = offscreen.getContext('2d')!
      const fontSize = Math.min(width / (WORD.length * 0.68), 150)
      offCtx.font = `900 ${fontSize}px Segoe UI, system-ui, sans-serif`
      offCtx.textAlign = 'center'
      offCtx.textBaseline = 'middle'
      offCtx.fillStyle = '#fff'
      // The viewport is pinned RUNWAY px down while the intro plays, so
      // the visible centre line is RUNWAY + innerHeight/2 in canvas space.
      offCtx.fillText(WORD, width / 2, RUNWAY + window.innerHeight / 2)

      const { data } = offCtx.getImageData(0, 0, width, height)
      letterPixels = []
      for (let py = 0; py < height; py += SAMPLE_STEP) {
        for (let px = 0; px < width; px += SAMPLE_STEP) {
          const alpha = data[(py * width + px) * 4 + 3]
          if (alpha > 128) {
            const delay = Math.random() * 2600
            letterPixels.push({
              x: px,
              y: 0,
              targetY: py,
              startY: -20 - Math.random() * height * 0.6,
              delay,
              duration: FALL_DURATION - delay,
              size: SAMPLE_STEP - 1,
              alpha: 0.75 + Math.random() * 0.25,
            })
          }
        }
      }

      rainPixels = Array.from({ length: RAIN_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 60 + Math.random() * 140,
        size: 1 + Math.random() * 2,
        alpha: 0.08 + Math.random() * 0.1,
      }))
    }

    buildScene()

    function handleResize() {
      buildScene()
    }
    window.addEventListener('resize', handleResize)

    let rafId: number
    let elapsed = 0
    let lastTime: number | null = null

    function frame(now: number) {
      if (lastTime === null) lastTime = now
      // Advance the timeline only by rendered-frame time, capped per step:
      // rAF doesn't fire while the page is hidden (e.g. Safari restoring
      // the tab behind its launch snapshot on app restart), and wall-clock
      // timers would finish the intro before anyone ever saw a frame.
      const step = Math.min(now - lastTime, 100)
      lastTime = now
      elapsed += step
      const dt = step / 1000

      ctx!.clearRect(0, 0, width, height)
      ctx!.fillStyle = '#000'
      ctx!.fillRect(0, 0, width, height)

      ctx!.fillStyle = 'rgba(232, 232, 232, 1)'
      for (const r of rainPixels) {
        r.y += r.speed * dt
        if (r.y > height) {
          r.y = -10
          r.x = Math.random() * width
        }
        ctx!.globalAlpha = r.alpha
        ctx!.fillRect(r.x, r.y, r.size, r.size)
      }

      for (const p of letterPixels) {
        if (elapsed < p.delay) continue
        const t = Math.min(1, (elapsed - p.delay) / p.duration)
        const y = p.startY + (p.targetY - p.startY) * easeOutCubic(t)
        ctx!.globalAlpha = p.alpha
        ctx!.fillRect(p.x, y, p.size, p.size)
      }
      ctx!.globalAlpha = 1

      if (!fadeStarted && elapsed >= FALL_DURATION + HOLD_DURATION) {
        fadeStarted = true
        // Hand scrolling back while the overlay is still fully opaque:
        // return to the real top, shift the canvas up by the runway so
        // nothing visibly moves, and let React drop the spacer in the
        // same commit that starts the fade — the page underneath gets
        // revealed at its natural position.
        window.removeEventListener('scroll', keepRunway)
        document.documentElement.style.touchAction = prevTouchAction
        canvas!.style.top = `${-RUNWAY}px`
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        setFading(true)
      }
      if (elapsed >= FALL_DURATION + HOLD_DURATION + FADE_DURATION) {
        setDone(true)
        markIntroFinished()
        return
      }
      rafId = requestAnimationFrame(frame)
    }

    rafId = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
      if (!fadeStarted) {
        // Unmounted mid-intro: undo the pin and land at the real top.
        window.removeEventListener('scroll', keepRunway)
        document.documentElement.style.touchAction = prevTouchAction
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      }
    }
  }, [done])

  if (done) return null

  // Document-anchored, NOT position:fixed: iOS 26 Safari clips fixed
  // elements to the layout viewport and won't draw them behind its
  // toolbars/status bar, while in-flow content renders edge-to-edge.
  return (
    <>
      {/* In-flow runway spacer matching the pinned scroll offset; removed
          in the same commit that starts the fade, after scroll returns
          to 0, so the page never visibly shifts. */}
      {!fading && <div style={{ height: RUNWAY }} aria-hidden />}
      <div
        className="absolute inset-0 z-[100] bg-black transition-opacity ease-out pointer-events-none"
        style={{
          opacity: fading ? 0 : 1,
          transitionDuration: `${FADE_DURATION}ms`,
        }}
      >
        {/* Oversized canvas bleeding below the screen and into the runway
            strip above the pinned viewport. Offset + size set in JS. */}
        <canvas ref={canvasRef} className="absolute" />
      </div>
    </>
  )
}
