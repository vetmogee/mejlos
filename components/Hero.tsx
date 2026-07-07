import { getTranslations } from 'next-intl/server'
import HeroHeadline from './HeroHeadline'

export default async function Hero({ name }: { name: string }) {
  const t = await getTranslations('hero')

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden px-8">
      {/* Glass bubbles */}
      <div className="absolute top-[15%] left-[8%] w-14 h-14 sm:w-28 sm:h-28 rounded-full
        backdrop-blur-md bg-white/5 border border-white/10
        shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]
        animate-[float_7s_ease-in-out_infinite] pointer-events-none" />
      <div className="absolute top-[60%] left-[6%] w-10 h-10 sm:w-16 sm:h-16 rounded-full
        backdrop-blur-md bg-white/5 border border-white/10
        shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]
        animate-[float_9s_ease-in-out_infinite_1.5s] pointer-events-none" />
      <div className="absolute top-[20%] right-[7%] w-12 h-12 sm:w-20 sm:h-20 rounded-full
        backdrop-blur-md bg-white/5 border border-white/10
        shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]
        animate-[float_8s_ease-in-out_infinite_0.5s] pointer-events-none" />
      <div className="hidden sm:block absolute bottom-[20%] right-[10%] w-36 h-36 rounded-full
        backdrop-blur-md bg-white/[0.03] border border-white/[0.08]
        shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
        animate-[float_11s_ease-in-out_infinite_2s] pointer-events-none" />
      <div className="hidden sm:block absolute bottom-[30%] left-[12%] w-10 h-10 rounded-full
        backdrop-blur-sm bg-white/5 border border-white/10
        animate-[float_6s_ease-in-out_infinite_3s] pointer-events-none" />

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
