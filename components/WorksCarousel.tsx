'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

type Work = { id: number; title: string; description: string; icon: string; url?: string | null; tags: string[] }

const AUTOPLAY_MS = 5000

// Coverflow positions per signed distance from the front card.
// Cards have a fixed size; side cards are pushed out just far enough that
// their titles stay visible next to the front card — closer together on mobile.
const POSITIONS: Record<string, string> = {
  '0':  'z-30 opacity-100 [transform:translateX(0)_scale(1)]',
  '-1': 'z-20 opacity-60 [transform:translateX(-150px)_scale(0.8)] sm:[transform:translateX(-280px)_scale(0.85)]',
  '1':  'z-20 opacity-60 [transform:translateX(150px)_scale(0.8)] sm:[transform:translateX(280px)_scale(0.85)]',
  '-2': 'z-10 opacity-30 [transform:translateX(-200px)_scale(0.62)] sm:[transform:translateX(-500px)_scale(0.7)]',
  '2':  'z-10 opacity-30 [transform:translateX(200px)_scale(0.62)] sm:[transform:translateX(500px)_scale(0.7)]',
}

function signedOffset(i: number, index: number, n: number) {
  let off = ((i - index) % n + n) % n
  if (off > n / 2) off -= n
  return off
}

export default function WorksCarousel({ works }: { works: Work[] }) {
  const t = useTranslations('works')
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)
  const n = works.length

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setReduced(true)
  }, [])

  useEffect(() => {
    if (paused || reduced || n <= 1) return
    const id = setTimeout(() => setIndex(i => (i + 1) % n), AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [index, paused, reduced, n])

  const prev = () => setIndex(i => (i - 1 + n) % n)
  const next = () => setIndex(i => (i + 1) % n)

  return (
    <section id="works" className="bg-bg2 py-24 px-4 sm:px-8 overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-3">{t('title')}</h2>
      <div className="w-12 h-0.5 bg-white mx-auto mb-12 rounded" />

      <div
        className="relative max-w-5xl mx-auto h-[400px] sm:h-[380px] outline-none"
        role="region"
        aria-roledescription="carousel"
        aria-label={t('title')}
        tabIndex={0}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={e => {
          if (e.key === 'ArrowLeft') prev()
          if (e.key === 'ArrowRight') next()
        }}
      >
        {works.map((w, i) => {
          const off = signedOffset(i, index, n)
          const pos = POSITIONS[String(off)]
          const isFront = off === 0
          return (
            <div key={w.id} className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <article
                onClick={() => !isFront && setIndex(i)}
                aria-hidden={!isFront}
                className={`pointer-events-auto w-[250px] h-[350px] sm:w-[380px] sm:h-[320px] p-6 sm:p-7
                  flex flex-col items-center text-center
                  bg-surface border border-border rounded-2xl
                  transition-[transform,opacity] duration-500 ease-out
                  ${pos ?? 'opacity-0 [transform:scale(0.5)]'}
                  ${isFront ? 'border-white/30 shadow-[0_16px_48px_rgba(0,0,0,0.6)]' : 'cursor-pointer'}`}
              >
                <div className="text-4xl mb-4">{w.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{w.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-4 sm:line-clamp-3">{w.description}</p>
                <div className="flex flex-wrap justify-center gap-1.5 mt-auto">
                  {w.tags.map(tag => (
                    <span key={tag} className="bg-bg border border-border rounded-full px-2.5 py-0.5 text-xs text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
                {w.url && isFront && (
                  <a
                    href={w.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 text-xs text-white/60 hover:text-white hover:underline transition-colors"
                  >
                    {t('viewProject')}
                  </a>
                )}
              </article>
            </div>
          )
        })}

        {/* Arrows */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 z-40 p-2.5 rounded-full
            backdrop-blur-md bg-white/5 border border-white/10 text-muted
            hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="10,3 5,8 10,13" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 z-40 p-2.5 rounded-full
            backdrop-blur-md bg-white/5 border border-white/10 text-muted
            hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6,3 11,8 6,13" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {works.map((w, i) => (
          <button
            key={w.id}
            onClick={() => setIndex(i)}
            aria-label={w.title}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? 'w-6 bg-white' : 'w-2 bg-white/25 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          href="/works"
          className="inline-block text-sm text-white/60 hover:text-white hover:underline transition-colors"
        >
          {t('viewAll')}
        </Link>
      </div>
    </section>
  )
}
