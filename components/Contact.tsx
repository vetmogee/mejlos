import { getTranslations } from 'next-intl/server'

export default async function Contact({ email, linkedin, github }: { email: string; linkedin: string; github: string }) {
  const t = await getTranslations('contact')

  return (
    <section id="contact" className="bg-bg py-24 px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-3">{t('title')}</h2>
        <div className="w-12 h-0.5 bg-white mx-auto mb-10 rounded" />
        <p className="text-muted text-lg leading-relaxed max-w-2xl mx-auto mb-12">{t('subtitle')}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-3 px-6 py-3 rounded-xl
              backdrop-blur-md bg-white/5 border border-white/10
              shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
              text-muted hover:text-white transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m2 7 10 6 10-6" />
            </svg>
            <span>{email}</span>
          </a>

          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-xl
              backdrop-blur-md bg-white/5 border border-white/10
              shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
              text-muted hover:text-white transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
            </svg>
            <span>LinkedIn</span>
          </a>
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-xl
              backdrop-blur-md bg-white/5 border border-white/10
              shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
              text-muted hover:text-white transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </section>
  )
}
