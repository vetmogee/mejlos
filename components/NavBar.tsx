'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'

export default function NavBar({ name }: { name: string }) {
  const t = useTranslations('nav')
  const [active, setActive] = useState('')

  const links = [
    { href: '#about',    label: t('about') },
    { href: '#skills',   label: t('skills') },
    { href: '#projects', label: t('projects') },
    { href: '#contact',  label: t('contact') },
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
      <nav className="w-full max-w-3xl flex justify-between items-center px-6 py-3 rounded-2xl
        backdrop-blur-xl bg-white/5 border border-white/10
        shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]">
        <span className="font-bold text-lg bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent select-none">
          {name}
        </span>
        <div className="flex items-center gap-6">
          <ul className="flex gap-6">
            {links.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`text-sm transition-all duration-200 ${
                    active === l.href.slice(1)
                      ? 'text-white drop-shadow-[0_0_8px_rgba(124,111,255,0.8)]'
                      : 'text-muted hover:text-white'
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  )
}
