'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'

type Skill = { id: number; name: string; level: number; category: string }

export default function SkillsSection({ skills, tags }: { skills: Skill[]; tags: string[] }) {
  const t = useTranslations('skills')
  const categories = Array.from(new Set(skills.map(s => s.category)))
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          entry.target.querySelectorAll<HTMLElement>('[data-level]').forEach(bar => {
            bar.style.width = bar.dataset.level + '%'
          })
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.3 },
    )
    ref.current?.querySelectorAll('.skill-category').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="bg-bg py-24 px-8" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3">{t('title')}</h2>
        <div className="w-12 h-0.5 bg-white mx-auto mb-12 rounded" />

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {categories.map(cat => (
            <div key={cat} className="skill-category bg-surface border border-border rounded-xl p-6">
              <h3 className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-5">{cat}</h3>
              <div className="flex flex-col gap-4">
                {skills.filter(s => s.category === cat).map(s => (
                  <div key={s.id}>
                    <span className="text-sm text-white block mb-1">{s.name}</span>
                    <div className="h-1.5 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full transition-[width] duration-[1200ms] ease-out"
                        style={{ width: 0 }}
                        data-level={s.level}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted text-xs uppercase tracking-widest mb-4">{t('tech')}</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {tags.map(tag => (
              <span
                key={tag}
                className="bg-surface border border-border rounded-full px-4 py-1.5 text-sm text-muted hover:border-white hover:text-white transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
