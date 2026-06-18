import { getTranslations } from 'next-intl/server'

export default async function Hero({ name }: { name: string }) {
  const t = await getTranslations('hero')

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden px-8">
      {/* Background glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent2/10 blur-[100px] animate-pulse pointer-events-none [animation-delay:1s]" />

      {/* Glass bubbles */}
      <div className="absolute top-[15%] left-[8%] w-28 h-28 rounded-full
        backdrop-blur-md bg-white/5 border border-white/10
        shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_4px_24px_rgba(124,111,255,0.15)]
        animate-[float_7s_ease-in-out_infinite] pointer-events-none" />
      <div className="absolute top-[60%] left-[6%] w-16 h-16 rounded-full
        backdrop-blur-md bg-accent/10 border border-accent/20
        shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_4px_20px_rgba(124,111,255,0.2)]
        animate-[float_9s_ease-in-out_infinite_1.5s] pointer-events-none" />
      <div className="absolute top-[20%] right-[7%] w-20 h-20 rounded-full
        backdrop-blur-md bg-accent2/10 border border-accent2/20
        shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_4px_20px_rgba(255,111,176,0.2)]
        animate-[float_8s_ease-in-out_infinite_0.5s] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-36 h-36 rounded-full
        backdrop-blur-md bg-white/[0.03] border border-white/[0.08]
        shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.3)]
        animate-[float_11s_ease-in-out_infinite_2s] pointer-events-none" />
      <div className="absolute bottom-[30%] left-[12%] w-10 h-10 rounded-full
        backdrop-blur-sm bg-accent2/15 border border-accent2/25
        shadow-[0_2px_12px_rgba(255,111,176,0.25)]
        animate-[float_6s_ease-in-out_infinite_3s] pointer-events-none" />

      <div className="relative z-10">
        <p className="text-accent text-sm uppercase tracking-widest mb-2">{t('greeting')}</p>
        <h1 className="text-6xl font-extrabold leading-tight mb-4 bg-gradient-to-br from-white via-white to-accent bg-clip-text text-transparent">
          {name}
        </h1>
        <p className="text-muted text-xl mb-8">{t('tagline')}</p>
        <a
          href="#skills"
          className="inline-block px-8 py-3 rounded-full
            backdrop-blur-sm bg-gradient-to-r from-accent to-accent2
            border border-white/20 text-white font-semibold
            shadow-[0_0_20px_rgba(124,111,255,0.35),inset_0_1px_0_rgba(255,255,255,0.15)]
            hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(124,111,255,0.55)] transition-all"
        >
          {t('cta')}
        </a>
      </div>
    </section>
  )
}
