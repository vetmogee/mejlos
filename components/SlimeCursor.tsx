'use client'

import { useEffect, useRef } from 'react'

/* Diameters of the goo chain, lead dot first. Dots below ~13px would fall
   under the goo filter's alpha threshold and vanish when isolated. */
const SIZES = [36, 29, 24, 19, 16, 13]
/* Per-second exponential follow rates — lead is snappy, tail drags. */
const RATES = [40, 19, 14, 10.5, 8, 6.5]
/* Idle wobble: per-dot angular speeds (rad/s) and phase offsets. */
const WOBBLE_SPEED = [2.1, 1.6, 2.6, 1.9, 3.1, 2.4]
const WOBBLE_PHASE = [0, 2.1, 4.2, 1.1, 3.4, 5.2]

/* The filtered box travels with the cursor so the goo blur only ever
   processes this small region, not the whole viewport. */
const BOX = 320

export default function SlimeCursor() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const finePointer = window.matchMedia('(pointer: fine)').matches
    const touchCapable = window.matchMedia('(any-pointer: coarse)').matches || 'ontouchstart' in window
    if (!finePointer && !touchCapable) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    /* Only hide the native cursor where there is one to hide. */
    if (finePointer) document.documentElement.classList.add('has-slime-cursor')

    const n = SIZES.length
    const xs = new Float64Array(n)
    const ys = new Float64Array(n)
    let targetX = 0
    let targetY = 0
    let visible = false
    let stretch = 0
    let angle = 0
    let last = performance.now()
    let raf = 0

    let hideTimer: number | undefined

    const show = (x: number, y: number) => {
      targetX = x
      targetY = y
      if (!visible) {
        xs.fill(x)
        ys.fill(y)
        visible = true
        wrap.style.opacity = '1'
      }
    }

    const hide = () => {
      visible = false
      wrap.style.opacity = '0'
    }

    const onMove = (e: MouseEvent) => show(e.clientX, e.clientY)

    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) hide()
    }

    /* Touch: the blob appears at a tap, tracks the finger while sliding,
       and — if a new tap lands while it is still visible — oozes over to
       the new point instead of teleporting. */
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      if (hideTimer !== undefined) {
        clearTimeout(hideTimer)
        hideTimer = undefined
      }
      show(t.clientX, t.clientY)
    }

    const onTouchEnd = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) {
        targetX = t.clientX
        targetY = t.clientY
        return
      }
      hideTimer = window.setTimeout(hide, 600)
    }

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      if (visible && dt > 0) {
        const t = now / 1000
        const prevLeadX = xs[0]
        const prevLeadY = ys[0]

        let px = targetX
        let py = targetY
        for (let i = 0; i < n; i++) {
          const k = reduceMotion ? 1 : 1 - Math.exp(-RATES[i] * dt)
          xs[i] += (px - xs[i]) * k
          ys[i] += (py - ys[i]) * k
          px = xs[i]
          py = ys[i]
        }

        /* Squash/stretch the lead dot along its direction of travel. */
        const vx = (xs[0] - prevLeadX) / dt
        const vy = (ys[0] - prevLeadY) / dt
        const speed = Math.hypot(vx, vy)
        const targetStretch = reduceMotion ? 0 : Math.min(speed / 2200, 0.35)
        stretch += (targetStretch - stretch) * Math.min(dt * 10, 1)
        if (speed > 60) angle = Math.atan2(vy, vx)

        wrap.style.transform = `translate3d(${xs[0]}px, ${ys[0]}px, 0)`

        for (let i = 0; i < n; i++) {
          const el = dotRefs.current[i]
          if (!el) continue
          const half = SIZES[i] / 2
          if (i === 0) {
            el.style.transform =
              `translate3d(${BOX / 2 - half}px, ${BOX / 2 - half}px, 0)` +
              ` rotate(${angle}rad) scale(${1 + stretch}, ${1 - stretch * 0.55})`
          } else {
            const wob = reduceMotion ? 0 : Math.sin(t * WOBBLE_SPEED[i] + WOBBLE_PHASE[i])
            const ox = reduceMotion ? 0 : Math.sin(t * WOBBLE_SPEED[i] * 0.8 + WOBBLE_PHASE[i]) * 3
            const oy = reduceMotion ? 0 : Math.cos(t * WOBBLE_SPEED[i] + WOBBLE_PHASE[i] * 1.7) * 3
            el.style.transform =
              `translate3d(${BOX / 2 + (xs[i] - xs[0]) - half + ox}px, ${BOX / 2 + (ys[i] - ys[0]) - half + oy}px, 0)` +
              ` scale(${1 + wob * 0.12})`
          }
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    if (finePointer) {
      window.addEventListener('mousemove', onMove, { passive: true })
      document.addEventListener('mouseout', onOut)
    }
    window.addEventListener('touchstart', onTouch, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('touchend', onTouchEnd)
    window.addEventListener('touchcancel', onTouchEnd)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(hideTimer)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseout', onOut)
      window.removeEventListener('touchstart', onTouch)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchEnd)
      document.documentElement.classList.remove('has-slime-cursor')
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="fixed left-0 top-0 z-[200] pointer-events-none opacity-0 transition-opacity duration-150"
      style={{ mixBlendMode: 'difference' }}
    >
      <div
        style={{
          width: BOX,
          height: BOX,
          marginLeft: -BOX / 2,
          marginTop: -BOX / 2,
          filter: 'url(#slime-goo)',
        }}
      >
        {SIZES.map((size, i) => (
          <div
            key={i}
            ref={el => { dotRefs.current[i] = el }}
            className="absolute left-0 top-0 rounded-full bg-white"
            style={{ width: size, height: size, willChange: 'transform' }}
          />
        ))}
      </div>
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          {/* Blur merges the dots, then the alpha matrix re-thresholds the
              result to a near-hard edge so the inversion is full strength
              from edge to edge instead of fading out. */}
          <filter id="slime-goo" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
            />
          </filter>
        </defs>
      </svg>
    </div>
  )
}
