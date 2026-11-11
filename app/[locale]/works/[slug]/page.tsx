import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { works } from '@/lib/data'
import { routing } from '@/i18n/routing'
import { Link } from '@/i18n/navigation'
import SitePreview from '@/components/SitePreview'

type Props = { params: { locale: string; slug: string } }

export const dynamicParams = false

export function generateStaticParams() {
  return routing.locales.flatMap(locale => works.map(w => ({ locale, slug: w.slug })))
}

export function generateMetadata({ params }: Props): Metadata {
  const work = works.find(w => w.slug === params.slug)
  if (!work) return {}
  return {
    title: `${work.title} — Duc Anh Nguyen`,
    description: work.description,
  }
}

export default async function WorkPage({ params }: Props) {
  const work = works.find(w => w.slug === params.slug)
  if (!work) notFound()

  const t = await getTranslations('works')
  const [kind, ...stack] = work.tags

  return (
    // The layout shell never scrolls, so the article scrolls inside main.
    <div className="h-full overflow-y-auto">
      <article className="max-w-2xl mx-auto px-5 sm:px-8 py-8 lg:py-12">
        <Link href="/" className="text-muted text-sm hover:text-white transition-colors">
          ← {t('back')}
        </Link>

        <header className="mt-8">
          {work.logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={work.logo} alt="" className="block mx-auto h-24 sm:h-32 w-auto max-w-full object-contain mb-8" />
          )}
          {kind === 'School Project' ? (
            <p className="inline-block text-white text-xs uppercase tracking-widest border border-border rounded-full px-3 py-1 mb-2">
              🎓 {t('schoolProject')}
            </p>
          ) : stack.length > 0 && (
            <p className="text-muted text-[11px] uppercase tracking-widest">{kind}</p>
          )}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">{work.title}</h1>
          <p className="text-white/70 mt-2">{work.description}</p>
        </header>

        <div className="mt-8 space-y-4 text-white/80 leading-relaxed">
          {work.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        <section className="mt-8">
          <h2 className="text-muted text-[11px] uppercase tracking-widest mb-2">{t('stack')}</h2>
          <p className="text-white/70 text-sm">{(stack.length > 0 ? stack : work.tags).join(' · ')}</p>
        </section>

        {work.url && (
          <a
            href={work.url}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-8 text-sm text-white border border-border rounded px-4 py-2 hover:bg-white hover:text-black transition-colors"
          >
            {t('visit')} ↗
          </a>
        )}

        {/* Live preview of the site, at the end of the article. */}
        {work.url && (
          <div className="mt-8">
            <SitePreview url={work.url} title={work.title} />
          </div>
        )}
      </article>
    </div>
  )
}
