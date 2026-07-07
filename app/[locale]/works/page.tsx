import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { siteConfig, works } from '@/lib/data'
import { Link } from '@/i18n/navigation'

import WorksGrid from '@/components/WorksGrid'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Works — Duc Anh Nguyen',
  description: 'Selected works of Duc Anh Nguyen — websites and web apps built with Next.js, Tailwind and Node.js.',
}

export default async function WorksPage() {
  const t = await getTranslations('works')
  const tf = await getTranslations('footer')

  return (
    <>
      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
        <nav className="w-full max-w-3xl flex justify-between items-center px-6 py-3 rounded-2xl
          backdrop-blur-xl bg-white/5 border border-white/10
          shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]">
          <span className="font-bold text-lg text-white select-none">{siteConfig.name}</span>
          <Link href="/" className="text-sm text-muted hover:text-white transition-colors">
            ← {t('back')}
          </Link>
        </nav>
      </header>

      <main className="min-h-screen bg-bg2 pt-32 pb-24 px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-3">{t('title')}</h1>
          <div className="w-12 h-0.5 bg-white mx-auto mb-4 rounded" />
          <p className="text-muted text-center mb-12">{t('subtitle')}</p>
          <WorksGrid works={works} />
        </div>
      </main>

      <Footer name={siteConfig.name} rights={tf('rights')} />
    </>
  )
}
