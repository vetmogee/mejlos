'use client'

import { useEffect, useRef, useState } from 'react'
import { onIntroFinished } from '@/lib/introSignal'

const FALL_DURATION = 1800
const HOLD_DURATION = 300
const CROSSFADE_DURATION = 400
const SAMPLE_STEP = 4
const FONT_CYCLE_INTERVAL = 140

const FONTS = [
  'Poppins',
  'Playfair Display',
  'Righteous',
  'Pacifico',
  'Roboto Mono',
  'Oswald',
  'Abril Fatface',
  'Caveat',
  'Orbitron',
  'Merriweather',
]

type Pixel = {
  x: number
  targetY: number
  startY: number
  delay: number
  duration: number
  size: number
  alpha: number
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function pickFont(exclude: string) {
  const options = FONTS.filter(f => f !== exclude)
  return options[Math.floor(Math.random() * options.length)]
}

export default function HeroHeadline({ name }: { name: string }) {
  const containerRef = useRef<HTMLHeadingElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasVisible, setCanvasVisible] = useState(true)
  const [textVisible, setTextVisible] = useState(false)
  const [font, setFont] = useState<string | undefined>(undefined)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true)
      setCanvasVisible(false)
      setTextVisible(true)
      return
    }

    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId = 0
    let intervalId: ReturnType<typeof setInterval> | undefined
    const timers: ReturnType<typeof setTimeout>[] = []
    let handleResize = () => {}

    function runFall() {
      let width = 0
      let height = 0
      let pixels: Pixel[] = []

      function buildScene() {
        const dpr = window.devicePixelRatio || 1
        const rect = container!.getBoundingClientRect()
        width = rect.width
        height = rect.height
        canvas!.width = width * dpr
        canvas!.height = height * dpr
        canvas!.style.width = `${width}px`
        canvas!.style.height = `${height}px`
        ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

        const offscreen = document.createElement('canvas')
        offscreen.width = width
        offscreen.height = height
        const offCtx = offscreen.getContext('2d')!
        const fontSize = Math.min(width / (name.length * 0.56), height * 0.72)
        offCtx.font = `800 ${fontSize}px Segoe UI, system-ui, sans-serif`
        offCtx.textAlign = 'center'
        offCtx.textBaseline = 'middle'
        offCtx.fillStyle = '#fff'
        offCtx.fillText(name, width / 2, height / 2)

        const { data } = offCtx.getImageData(0, 0, width, height)
        pixels = []
        for (let py = 0; py < height; py += SAMPLE_STEP) {
          for (let px = 0; px < width; px += SAMPLE_STEP) {
            const alpha = data[(py * width + px) * 4 + 3]
            if (alpha > 128) {
              const delay = Math.random() * (FALL_DURATION * 0.5)
              pixels.push({
                x: px,
                targetY: py,
                startY: -20 - Math.random() * height * 2,
                delay,
                duration: FALL_DURATION - delay,
                size: SAMPLE_STEP - 1,
                alpha: 0.85 + Math.random() * 0.15,
              })
            }
          }
        }
      }

      buildScene()

      handleResize = () => buildScene()
      window.addEventListener('resize', handleResize)

      const start = performance.now()

      function frame(now: number) {
        const elapsed = now - start
        ctx!.clearRect(0, 0, width, height)
        ctx!.fillStyle = 'rgba(232, 232, 232, 1)'

        for (const p of pixels) {
          if (elapsed < p.delay) continue
          const t = Math.min(1, (elapsed - p.delay) / p.duration)
          const y = p.startY + (p.targetY - p.startY) * easeOutCubic(t)
          ctx!.globalAlpha = p.alpha
          ctx!.fillRect(p.x, y, p.size, p.size)
        }
        ctx!.globalAlpha = 1

        if (elapsed < FALL_DURATION) {
          rafId = requestAnimationFrame(frame)
        }
      }
      rafId = requestAnimationFrame(frame)

      timers.push(
        setTimeout(() => {
          setFont(pickFont(''))
          setTextVisible(true)
          setCanvasVisible(false)
        }, FALL_DURATION + HOLD_DURATION),
      )

      timers.push(
        setTimeout(() => {
          intervalId = setInterval(
            () => setFont(prev => pickFont(prev ?? '')),
            FONT_CYCLE_INTERVAL,
          )
        }, FALL_DURATION + HOLD_DURATION + CROSSFADE_DURATION),
      )
    }

    const unsubscribe = onIntroFinished(runFall)

    return () => {
      unsubscribe()
      cancelAnimationFrame(rafId)
      clearInterval(intervalId)
      timers.forEach(clearTimeout)
      window.removeEventListener('resize', handleResize)
    }
  }, [name])

  return (
    <div className="relative inline-block">
      <h1
        ref={containerRef}
        className="m-0 whitespace-nowrap text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white transition-opacity"
        style={{
          opacity: textVisible ? 1 : 0,
          transitionDuration: `${CROSSFADE_DURATION}ms`,
          fontFamily: font,
        }}
      >
        {name}
      </h1>
      {!reduced && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full transition-opacity pointer-events-none"
          style={{
            opacity: canvasVisible ? 1 : 0,
            transitionDuration: `${CROSSFADE_DURATION}ms`,
          }}
        />
      )}
    </div>
  )
}
