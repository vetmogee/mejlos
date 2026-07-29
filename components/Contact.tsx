import { getTranslations } from 'next-intl/server'

export default async function Contact({ email, linkedin }: { email: string; linkedin: string }) {
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
        </div>
      </div>
    </section>
  )
}
