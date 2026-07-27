import { getTranslations } from 'next-intl/server'
import HeroHeadline from './HeroHeadline'

export default async function Hero({ name }: { name: string }) {
  const t = await getTranslations('hero')

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden px-8">
      <div className="relative z-10">
        <p className="text-white/50 text-sm uppercase tracking-widest mb-2">{t('greeting')}</p>
        <div className="my-10">
          <HeroHeadline name={name} />
        </div>
        <p className="text-muted text-xl mb-8">{t('tagline')}</p>
        <a
          href="#skills"
          className="inline-block px-8 py-3 rounded-full
            bg-white text-black font-semibold border border-white/20
            hover:-translate-y-0.5 hover:bg-white/90 transition-all"
        >
          {t('cta')}
        </a>
      </div>
    </section>
  )
}
