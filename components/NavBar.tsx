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
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-bg/70 border-b border-border">
      <nav className="max-w-5xl mx-auto px-8 py-4 flex justify-between items-center">
        <span className="font-bold text-lg bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
          {name}
        </span>
        <div className="flex items-center gap-6">
          <ul className="flex gap-6">
            {links.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`text-sm transition-colors ${active === l.href.slice(1) ? 'text-white' : 'text-muted hover:text-white'}`}
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
