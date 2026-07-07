'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

export default function NavBar({ name }: { name: string }) {
  const t = useTranslations('nav')
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '#about',   label: t('about') },
    { href: '#skills',  label: t('skills') },
    { href: '#works',   label: t('works') },
    { href: '#contact', label: t('contact') },
  ]

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    )
    document.querySelectorAll('section[id]').forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <div className="w-full max-w-3xl flex flex-col">
        <nav className="flex justify-between items-center px-6 py-3 rounded-2xl
          backdrop-blur-xl bg-white/5 border border-white/10
          shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]">
          <span className="font-bold text-lg text-white select-none">
            {name}
          </span>

          {/* Desktop links */}
          <ul className="hidden md:flex gap-6">
            {links.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`text-sm transition-all duration-200 ${
                    active === l.href.slice(1)
                      ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                      : 'text-muted hover:text-white'
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="flex md:hidden p-1.5 rounded-lg text-muted hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="17" y2="6" />
                <line x1="3" y1="10" x2="17" y2="10" />
                <line x1="3" y1="14" x2="17" y2="14" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-2 px-6 py-4 rounded-2xl
            backdrop-blur-xl bg-white/5 border border-white/10
            shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]">
            <ul className="flex flex-col gap-4">
              {links.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block text-sm transition-all duration-200 ${
                      active === l.href.slice(1)
                        ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                        : 'text-muted hover:text-white'
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}
