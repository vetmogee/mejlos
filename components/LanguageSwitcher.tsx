'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { useTransition } from 'react'

const locales = [
  { code: 'en', label: 'EN', title: 'English' },
  { code: 'cs', label: 'CS', title: 'Čeština' },
  { code: 'vi', label: 'VI', title: 'Tiếng Việt' },
] as const

export default function LanguageSwitcher() {
  const locale   = useLocale()
  const router   = useRouter()
  const pathname = usePathname()
  const [, startTransition] = useTransition()

  function switchTo(next: string) {
    startTransition(() => {
      router.replace(pathname, { locale: next })
    })
  }

  return (
    <div className="flex gap-1.5">
      {locales.map(l => (
        <button
          key={l.code}
          onClick={() => switchTo(l.code)}
          title={l.title}
          className={`text-xs px-2 py-1 rounded border transition-colors ${
            locale === l.code
              ? 'border-white text-white'
              : 'border-border text-muted hover:border-white hover:text-white'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
