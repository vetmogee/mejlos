import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
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

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
