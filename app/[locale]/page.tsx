import { getTranslations } from 'next-intl/server'
import { siteConfig, techTags, works, cv } from '@/lib/data'

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-muted text-[11px] uppercase tracking-widest mb-2 lg:mb-3">{children}</h2>
}

// The whole CV on one screen: below lg the secondary details (bullet
// points, bio, project tags) are dropped so it still fits a phone.
export default async function Page() {
  const t  = await getTranslations('cv')
  const th = await getTranslations('hero')
  const ta = await getTranslations('about')
  const tw = await getTranslations('works')

  return (
    <div className="h-full max-w-5xl mx-auto px-5 sm:px-8 py-5 lg:py-10 flex flex-col justify-center gap-6 lg:gap-12">
      <section>
        <p className="text-muted text-xs uppercase tracking-widest mb-1">{th('greeting')}</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white">{siteConfig.name}</h1>
        <p className="text-white/70 mt-1">{th('tagline')}</p>
        <p className="hidden sm:block text-muted text-sm leading-relaxed max-w-xl mt-3">{ta('bio')}</p>
      </section>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5 lg:gap-x-12 text-sm">
        <section className="col-span-2 lg:col-span-1">
          <Heading>{t('experience')}</Heading>
          <ul className="space-y-2.5 lg:space-y-4">
            {cv.experience.map(job => (
              <li key={job.role}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-white">{job.role}</span>
                  <span className="text-muted text-xs shrink-0">{job.period}</span>
                </div>
                <p className="text-muted text-xs">{job.company} · {job.location}</p>
                <p className="hidden lg:block text-white/50 text-xs mt-1">{job.points.join(' · ')}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="col-span-2 lg:col-span-1 grid grid-cols-2 gap-6 lg:flex lg:flex-col lg:gap-8">
          <section>
            <Heading>{t('education')}</Heading>
            <div className="space-y-2 lg:space-y-3">
              {cv.education.map(edu => (
                <div key={edu.school}>
                  <a href={edu.url} target="_blank" rel="noreferrer" className="text-white hover:underline">
                    {edu.school} <span className="text-muted">↗</span>
                  </a>
                  {edu.field && <p className="text-muted text-xs">{edu.field}</p>}
                  <p className="text-muted text-xs">{edu.period}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <Heading>{t('certifications')}</Heading>
            {cv.certifications.map(cert => (
              <div key={cert.name}>
                <p className="text-white">{cert.name}</p>
                <p className="text-muted text-xs">{cert.issuer} · {cert.issued}</p>
              </div>
            ))}
          </section>
        </div>

        <div className="col-span-2 lg:col-span-1 grid grid-cols-2 gap-6 lg:flex lg:flex-col lg:gap-8">
          <section>
            <Heading>{tw('title')}</Heading>
            <ul className="space-y-1 lg:space-y-2">
              {works.map(w => (
                <li key={w.id}>
                  {w.url ? (
                    <a href={w.url} target="_blank" rel="noreferrer" className="text-white hover:underline">
                      {w.title} <span className="text-muted">↗</span>
                    </a>
                  ) : (
                    <span className="text-white">{w.title}</span>
                  )}
                  <p className="hidden lg:block text-muted text-xs">{w.tags.slice(1, 4).join(' · ')}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <Heading>{t('skills')}</Heading>
            <p className="text-white/70 text-xs leading-relaxed">{techTags.join(' · ')}</p>
          </section>
        </div>
      </div>
    </div>
  )
}
