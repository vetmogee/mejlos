import { getTranslations }              from 'next-intl/server'
import { siteConfig, skills, techTags, works, cv } from '@/lib/data'

import NavBar        from '@/components/NavBar'
import Hero          from '@/components/Hero'
import About         from '@/components/About'
import SkillsSection from '@/components/SkillsSection'
import WorksCarousel from '@/components/WorksCarousel'
import Contact       from '@/components/Contact'
import Footer        from '@/components/Footer'

export default async function Page() {
  const t = await getTranslations('footer')

  return (
    <>
      <NavBar name={siteConfig.name} />
      <main>
        <Hero    name={siteConfig.name} />
        <About />
        <SkillsSection skills={skills} tags={techTags} />
        <WorksCarousel works={works} />
        <Contact email={siteConfig.contactEmail} linkedin={cv.linkedin} github={cv.github} />
      </main>
      <Footer name={siteConfig.name} rights={t('rights')} />
    </>
  )
}
