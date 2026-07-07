import { getTranslations } from 'next-intl/server'

type Work = { id: number; title: string; description: string; icon: string; url?: string | null; tags: string[] }

export default async function WorksGrid({ works }: { works: Work[] }) {
  const t = await getTranslations('works')

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {works.map(w => (
        <div
          key={w.id}
          className="bg-surface border border-border rounded-xl p-6 hover:border-white hover:-translate-y-1 transition-all"
        >
          <div className="text-3xl mb-4">{w.icon}</div>
          <h3 className="font-semibold text-lg mb-2">{w.title}</h3>
          <p className="text-muted text-sm leading-relaxed mb-4">{w.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {w.tags.map(tag => (
              <span key={tag} className="bg-bg border border-border rounded-full px-2.5 py-0.5 text-xs text-muted">
                {tag}
              </span>
            ))}
          </div>
          {w.url && (
            <a href={w.url} target="_blank" rel="noreferrer" className="mt-4 inline-block text-xs text-white/60 hover:text-white hover:underline transition-colors">
              {t('viewProject')}
            </a>
          )}
        </div>
      ))}
    </div>
  )
}
