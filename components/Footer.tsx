'use client'

import { useState, useTransition } from 'react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'

const locales = [
  { code: 'en', label: 'English' },
  { code: 'cs', label: 'Čeština' },
  { code: 'vi', label: 'Tiếng Việt' },
] as const

export default function Footer({ name, rights }: { name: string; rights: string }) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [, startTransition] = useTransition()
  const [open, setOpen] = useState(false)

  function switchTo(next: string) {
    setOpen(false)
    startTransition(() => router.replace(pathname, { locale: next }))
  }

  const current = locales.find(l => l.code === locale) ?? locales[0]

  return (
    <footer className="bg-bg2 border-t border-border py-8 px-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-muted text-sm">
        <span>&copy; {new Date().getFullYear()} {name}. {rights}</span>

        <div className="relative">
          <button
            onClick={() => setOpen(o => !o)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl
              backdrop-blur-md bg-white/5 border border-white/10
              shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
              text-muted hover:text-white transition-colors"
          >
            <span>{current.label}</span>
            <svg
              width="12" height="12" viewBox="0 0 12 12" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            >
              <polyline points="2,4 6,8 10,4" />
            </svg>
          </button>

          {open && (
            <div className="absolute bottom-full mb-2 right-0 min-w-[140px] py-1 rounded-xl
              backdrop-blur-xl bg-white/5 border border-white/10
              shadow-[0_-8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]">
              {locales.map(l => (
                <button
                  key={l.code}
                  onClick={() => switchTo(l.code)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    locale === l.code ? 'text-white' : 'text-muted hover:text-white'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
