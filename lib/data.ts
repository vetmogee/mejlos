// ─────────────────────────────────────────────────────────────────────────────
// Static site content — edit this file to customise the page.
// ─────────────────────────────────────────────────────────────────────────────

export const siteConfig = {
  name:  'Duc Anh Nguyen',
  email: 'leducthao12345@seznam.cz',
}

// ── Skills ────────────────────────────────────────────────────────────────────
// level: 0–100. category groups the bars into columns.
export const skills = [
  { id: 1,  name: 'Tailwind',           level: 92, category: 'Frontend', order: 1 },
  { id: 2,  name: 'Design',             level: 80, category: 'Frontend', order: 2 },
  { id: 3,  name: 'Animations',         level: 75, category: 'Frontend', order: 3 },
  { id: 4,  name: 'DB Design',          level: 78, category: 'Backend',  order: 1 },
  { id: 5,  name: 'REST API',           level: 88, category: 'Backend',  order: 2 },
  { id: 6,  name: 'Node.js',            level: 82, category: 'Backend',  order: 3 },
  { id: 7,  name: 'Git',                level: 90, category: 'Tools',    order: 1 },
  { id: 8,  name: 'Prompt Engineering', level: 85, category: 'Tools',    order: 2 },
  { id: 9,  name: 'Framer + Figma',     level: 70, category: 'Tools',    order: 3 },
]

// ── Tech tag cloud ────────────────────────────────────────────────────────────
export const techTags = [
  'Next.js', 'TypeScript', 'Tailwind', 'Node.js',
  'REST API', 'Prisma', 'Framer', 'Figma', 'Git',
]

// ── Projects ──────────────────────────────────────────────────────────────────
// url is optional — set to null to hide the link.
export const projects = [
  {
    id:          1,
    title:       'Schedula',
    description: 'Salon booking & management platform. Customers browse and book appointments; salon owners manage calendars, services, and staff.',
    icon:        '📅',
    url:         'https://schedula-murex.vercel.app/',
    tags:        ['Next.js', 'Tailwind', 'Node.js', 'REST API'],
    order:       1,
  },
  {
    id:          2,
    title:       'Fancy Beauty',
    description: 'Premium beauty services website for a salon in the Zurich & Schlieren area of Switzerland.',
    icon:        '✨',
    url:         'https://fancybeauty.ch',
    tags:        ['Next.js', 'Tailwind', 'Design'],
    order:       2,
  },
  {
    id:          3,
    title:       'Oldřich Turner',
    description: 'Website for a Czech financial advisor specialising in investment real estate and advanced financing.',
    icon:        '📈',
    url:         'https://oldrichturner.cz',
    tags:        ['Next.js', 'Tailwind', 'Design'],
    order:       3,
  },
  {
    id:          4,
    title:       'Lyniq Studio',
    description: 'Nail care & beauty studio site for a salon in Děčín, CZ — sharp aesthetic, animated UI.',
    icon:        '💅',
    url:         'https://lyniqstudio.cz',
    tags:        ['Next.js', 'Tailwind', 'Animations'],
    order:       4,
  },
]
