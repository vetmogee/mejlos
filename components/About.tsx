import { getTranslations } from 'next-intl/server'

export default async function About() {
  const t = await getTranslations('about')

  return (
    <section id="about" className="bg-bg2 py-24 px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-3">{t('title')}</h2>
        <div className="w-12 h-0.5 bg-white mx-auto mb-10 rounded" />
        <p className="text-muted text-lg leading-relaxed max-w-2xl mx-auto">{t('bio')}</p>
      </div>
    </section>
  )
}
