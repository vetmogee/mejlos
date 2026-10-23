import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { siteConfig, cv } from '@/lib/data'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import '../globals.css'

type Props = { children: React.ReactNode; params: { locale: string } }

export const metadata: Metadata = {
  title: 'Duc Anh Nguyen — Developer & Creator',
  description: 'Portfolio of Duc Anh Nguyen — full-stack developer specialising in Next.js, Tailwind, Node.js and crafting beautiful UIs.',
  openGraph: {
    title: 'Duc Anh Nguyen — Developer & Creator',
    description: 'Portfolio of Duc Anh Nguyen — full-stack developer specialising in Next.js, Tailwind, Node.js and crafting beautiful UIs.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#000000',
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  const messages = await getMessages()
  const t = await getTranslations('footer')

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {/* The page fits a single screen: the shell is exactly the
              dynamic viewport tall and clips anything that would overflow,
              so the document itself never scrolls. */}
          <div className="h-dvh flex flex-col overflow-hidden">
            <NavBar nickname={siteConfig.nickname} email={siteConfig.contactEmail} linkedin={cv.linkedin} github={cv.github} />
            <main className="flex-1 min-h-0 overflow-hidden">{children}</main>
            <Footer name={siteConfig.name} rights={t('rights')} />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
