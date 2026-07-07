'use client'

import { useEffect, useRef, useState } from 'react'

const WORD = 'mejlos'
const FALL_DURATION = 5000
const HOLD_DURATION = 700
const FADE_DURATION = 600
const SAMPLE_STEP = 5
const RAIN_COUNT = 70

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

  useEffect(() => {
    if (done) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true)
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    let width = window.innerWidth
    let height = window.innerHeight
    let letterPixels: LetterPixel[] = []
    let rainPixels: RainPixel[] = []

    function buildScene() {
      const dpr = window.devicePixelRatio || 1
      width = window.innerWidth
      height = window.innerHeight
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
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
      offCtx.fillText(WORD, width / 2, height / 2)

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
    let fadeTimer: ReturnType<typeof setTimeout>
    let doneTimer: ReturnType<typeof setTimeout>
    const start = performance.now()
    let lastTime = start

    function frame(now: number) {
      const elapsed = now - start
      const dt = (now - lastTime) / 1000
      lastTime = now

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

      if (elapsed < FALL_DURATION + HOLD_DURATION + FADE_DURATION) {
        rafId = requestAnimationFrame(frame)
      }
    }

    rafId = requestAnimationFrame(frame)

    fadeTimer = setTimeout(() => setFading(true), FALL_DURATION + HOLD_DURATION)
    doneTimer = setTimeout(
      () => setDone(true),
      FALL_DURATION + HOLD_DURATION + FADE_DURATION,
    )

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
      window.removeEventListener('resize', handleResize)
      document.body.style.overflow = prevOverflow
    }
  }, [done])

  if (done) return null

  return (
    <div
      className="fixed inset-0 z-[100] transition-opacity ease-out pointer-events-none"
      style={{
        opacity: fading ? 0 : 1,
        transitionDuration: `${FADE_DURATION}ms`,
      }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}
