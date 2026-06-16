import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Site config
  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Your Name',
      tagline: 'Developer & Creator',
      bio: "I'm a passionate developer who loves building clean, functional, and beautiful things. I enjoy solving hard problems and learning new technologies along the way.",
      email: 'you@example.com',
    },
  })

  // Skills
  const skillsData = [
    { name: 'HTML / CSS',   level: 95, category: 'Frontend', order: 1 },
    { name: 'JavaScript',   level: 88, category: 'Frontend', order: 2 },
    { name: 'React',        level: 80, category: 'Frontend', order: 3 },
    { name: 'TypeScript',   level: 75, category: 'Frontend', order: 4 },
    { name: 'Node.js',      level: 82, category: 'Backend',  order: 1 },
    { name: 'Python',       level: 78, category: 'Backend',  order: 2 },
    { name: 'SQL',          level: 70, category: 'Backend',  order: 3 },
    { name: 'REST APIs',    level: 85, category: 'Backend',  order: 4 },
    { name: 'Git',          level: 90, category: 'Tools',    order: 1 },
    { name: 'Docker',       level: 65, category: 'Tools',    order: 2 },
    { name: 'Linux',        level: 72, category: 'Tools',    order: 3 },
    { name: 'Figma',        level: 60, category: 'Tools',    order: 4 },
  ]

  await prisma.skill.deleteMany()
  await prisma.skill.createMany({ data: skillsData })

  // Tech tags
  const tags = ['JavaScript', 'Python', 'React', 'Node.js', 'PostgreSQL',
                 'MongoDB', 'Docker', 'Git', 'Linux', 'TypeScript', 'CSS / Sass', 'REST APIs']
  await prisma.techTag.deleteMany()
  for (const name of tags) await prisma.techTag.create({ data: { name } })

  // Projects
  await prisma.project.deleteMany()
  const p1 = await prisma.project.create({
    data: { title: 'Project One', description: 'A cool project built with React and Node.js.', icon: '💻', order: 1 },
  })
  await prisma.projectTag.createMany({ data: [{ name: 'React', projectId: p1.id }, { name: 'Node.js', projectId: p1.id }] })

  const p2 = await prisma.project.create({
    data: { title: 'Project Two', description: 'An awesome project built with Python and PostgreSQL.', icon: '🌐', order: 2 },
  })
  await prisma.projectTag.createMany({ data: [{ name: 'Python', projectId: p2.id }, { name: 'PostgreSQL', projectId: p2.id }] })

  const p3 = await prisma.project.create({
    data: { title: 'Project Three', description: 'Something exciting, built with TypeScript and Docker.', icon: '🚀', order: 3 },
  })
  await prisma.projectTag.createMany({ data: [{ name: 'TypeScript', projectId: p3.id }, { name: 'Docker', projectId: p3.id }] })

  console.log('Seed complete.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
