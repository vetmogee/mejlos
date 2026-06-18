import { getTranslations }              from 'next-intl/server'
import { siteConfig, skills, techTags, projects } from '@/lib/data'

import NavBar          from '@/components/NavBar'
import Hero            from '@/components/Hero'
import About           from '@/components/About'
import SkillsSection   from '@/components/SkillsSection'
import ProjectsSection from '@/components/ProjectsSection'
import Contact         from '@/components/Contact'
import Footer          from '@/components/Footer'

export default async function Page() {
  const t = await getTranslations('footer')

  return (
    <>
      <NavBar name={siteConfig.name} />
      <main>
        <Hero    name={siteConfig.name} />
        <About />
        <SkillsSection   skills={skills} tags={techTags} />
        <ProjectsSection projects={projects} />
        <Contact email={siteConfig.email} />
      </main>
      <Footer name={siteConfig.name} rights={t('rights')} />
    </>
  )
}
