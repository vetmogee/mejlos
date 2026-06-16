import { getTranslations } from 'next-intl/server'

export default async function Hero({ name }: { name: string }) {
  const t = await getTranslations('hero')

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden px-8">
      <div className="absolute w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl animate-pulse pointer-events-none" />
      <div className="relative z-10">
        <p className="text-accent text-sm uppercase tracking-widest mb-2">{t('greeting')}</p>
        <h1 className="text-6xl font-extrabold leading-tight mb-4 bg-gradient-to-br from-white via-white to-accent bg-clip-text text-transparent">
          {name}
        </h1>
        <p className="text-muted text-xl mb-8">{t('tagline')}</p>
        <a
          href="#skills"
          className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-accent to-accent2 text-white font-semibold hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(124,111,255,0.4)] transition-all"
        >
          {t('cta')}
        </a>
      </div>
    </section>
  )
}
