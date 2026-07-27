import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { siteConfig, techTags, cv } from '@/lib/data'
import { Link } from '@/i18n/navigation'

import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'CV — Duc Anh Nguyen',
  description: 'CV of Duc Anh Nguyen — experience, education and certifications of a full-stack developer working with Next.js, Tailwind and Node.js.',
}

export default async function CvPage() {
  const t  = await getTranslations('cv')
  const th = await getTranslations('hero')
  const tf = await getTranslations('footer')

  return (
    <>
      <header className="fixed top-[calc(1rem+env(safe-area-inset-top))] inset-x-0 z-50 flex justify-center px-4">
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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-3">{siteConfig.name}</h1>
          <div className="w-12 h-0.5 bg-white mx-auto mb-4 rounded" />
          <p className="text-muted text-center mb-6">{th('tagline')}</p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm mb-16">
            <a href={`mailto:${siteConfig.email}`} className="text-muted hover:text-white transition-colors">
              {siteConfig.email}
            </a>
            <a href={cv.linkedin} target="_blank" rel="noreferrer" className="text-muted hover:text-white transition-colors">
              LinkedIn ↗
            </a>
          </div>

          <section className="mb-14">
            <h2 className="text-xl font-bold mb-6">{t('experience')}</h2>
            <div className="space-y-4">
              {cv.experience.map(job => (
                <article key={job.role} className="bg-surface border border-border rounded-xl p-6">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h3 className="font-semibold text-lg">{job.role}</h3>
                    <span className="text-xs text-muted shrink-0">{job.period}</span>
                  </div>
                  <p className="text-muted text-sm mb-4">{job.company} · {job.type} · {job.location}</p>
                  <ul className="list-disc list-inside text-sm leading-relaxed text-white/70 space-y-1 mb-4">
                    {job.points.map(point => <li key={point}>{point}</li>)}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {job.tags.map(tag => (
                      <span key={tag} className="bg-bg border border-border rounded-full px-2.5 py-0.5 text-xs text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-14">
            <h2 className="text-xl font-bold mb-6">{t('education')}</h2>
            <div className="space-y-4">
              {cv.education.map(edu => (
                <article key={edu.school} className="bg-surface border border-border rounded-xl p-6">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h3 className="font-semibold text-lg">{edu.school}</h3>
                    <span className="text-xs text-muted shrink-0">{edu.period}</span>
                  </div>
                  <p className="text-muted text-sm mb-4">{edu.field}</p>
                  <ul className="list-disc list-inside text-sm leading-relaxed text-white/70 space-y-1 mb-4">
                    {edu.points.map(point => <li key={point}>{point}</li>)}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.tags.map(tag => (
                      <span key={tag} className="bg-bg border border-border rounded-full px-2.5 py-0.5 text-xs text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-14">
            <h2 className="text-xl font-bold mb-6">{t('certifications')}</h2>
            <div className="space-y-4">
              {cv.certifications.map(cert => (
                <article key={cert.name} className="bg-surface border border-border rounded-xl p-6">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h3 className="font-semibold text-lg">{cert.name}</h3>
                    <span className="text-xs text-muted shrink-0">{t('issued')} {cert.issued}</span>
                  </div>
                  <p className="text-muted text-sm">{cert.issuer}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-6">{t('skills')}</h2>
            <div className="flex flex-wrap gap-1.5">
              {techTags.map(tag => (
                <span key={tag} className="bg-bg border border-border rounded-full px-2.5 py-0.5 text-xs text-muted">
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer name={siteConfig.name} rights={tf('rights')} />
    </>
  )
}
