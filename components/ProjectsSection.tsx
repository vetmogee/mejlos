import { getTranslations } from 'next-intl/server'

type Project = { id: number; title: string; description: string; icon: string; url?: string | null; tags: string[] }

export default async function ProjectsSection({ projects }: { projects: Project[] }) {
  const t = await getTranslations('projects')

  return (
    <section id="projects" className="bg-bg2 py-24 px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3">{t('title')}</h2>
        <div className="w-12 h-0.5 bg-gradient-to-r from-accent to-accent2 mx-auto mb-12 rounded" />

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map(p => (
            <div
              key={p.id}
              className="bg-surface border border-border rounded-xl p-6 hover:border-accent hover:-translate-y-1 transition-all"
            >
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{p.title}</h3>
              <p className="text-muted text-sm leading-relaxed mb-4">{p.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map(tag => (
                  <span key={tag} className="bg-bg border border-border rounded-full px-2.5 py-0.5 text-xs text-muted">
                    {tag}
                  </span>
                ))}
              </div>
              {p.url && (
                <a href={p.url} target="_blank" rel="noreferrer" className="mt-4 inline-block text-xs text-accent hover:underline">
                  {t('viewProject')}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
