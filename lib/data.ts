// ─────────────────────────────────────────────────────────────────────────────
// Static site content — edit this file to customise the page.
// ─────────────────────────────────────────────────────────────────────────────

export const siteConfig = {
  name:         'Duc Anh Nguyen',
  nickname:     'mejlos',
  email:        'leducthao12345@seznam.cz',
  contactEmail: 'main@mejlos.com',
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

// ── CV ────────────────────────────────────────────────────────────────────────
export const cv = {
  linkedin: 'https://www.linkedin.com/in/duc-anh-nguyen-ab0845290/',
  github:   'https://github.com/vetmogee',
  experience: [
    {
      role:     'Web Developer and Administrator',
      company:  'Freelance',
      type:     'Freelance',
      period:   'Oct 2025 – Present',
      location: 'Remote',
      points:   ['Lovable web building and management', 'Prompt engineer'],
      tags:     ['Cursor AI', 'Lovable'],
    },
    {
      role:     'Sales Employee',
      company:  'Freelance',
      type:     'Freelance',
      period:   'Sep 2025 – Present',
      location: 'Remote',
      points:   ['Frontend junior', 'Web sales'],
      tags:     ['Next.js', 'Prisma ORM'],
    },
    {
      role:     'Contact Manager',
      company:  'Webforte',
      type:     'Freelance',
      period:   'Jun 2025 – Sep 2025',
      location: 'Remote',
      points:   ['Excel contact management', 'Shopify inventory management'],
      tags:     ['Microsoft Excel', 'Shopify'],
    },
  ],
  education: [
    {
      school: 'Unicorn University',
      url:    'https://unicornuniversity.net',
      field:  '',
      period: 'Sep 2026 – Present',
      points: [],
      tags:   [],
    },
    {
      school: 'SPSUL',
      url:    'https://spsul.cz',
      field:  'Information Technology',
      period: 'Sep 2022 – Sep 2026',
      points: [
        'Learnt coding in C#, basics of Cisco netacad networking, building multiple React and Next.js web apps, basics in Unity',
      ],
      tags:   ['Next.js', 'SQL'],
    },
  ],
  certifications: [
    {
      name:   'Cambridge English: C1 Advanced (CAE)',
      issuer: 'Cambridge English',
      issued: 'Mar 2026',
    },
  ],
}

// ── Works ─────────────────────────────────────────────────────────────────────
// url is optional — set to null to hide the link.
// logo is an image in /public shown instead of the emoji icon when set.
export const works = [
  {
    id:          1,
    title:       'Schedula',
    description: 'Salon booking & management platform. Customers browse and book appointments; salon owners manage calendars, services, and staff.',
    icon:        '📅',
    logo:        null,
    url:         'https://schedula.mejlos.com/',
    tags:        ['School Project', 'Next.js', 'React', 'TypeScript', 'Tailwind', 'Node.js', 'REST API'],
    order:       1,
  },
  {
    id:          2,
    title:       'Fancy Beauty',
    description: 'Premium beauty services website for a salon in the Zurich & Schlieren area of Switzerland.',
    icon:        '✨',
    logo:        '/fancylogolong-BiBxCGFi.png',
    url:         'https://fancybeauty.ch',
    tags:        ['Personal Project', 'Vite', 'React', 'TypeScript', 'Tailwind', 'Design'],
    order:       2,
  },
  {
    id:          3,
    title:       'Lyniq Studio',
    description: 'Nail care & beauty studio site for a salon in Děčín, CZ — sharp aesthetic, animated UI.',
    icon:        '💅',
    logo:        '/lyniq2.svg',
    url:         'https://lyniqstudio.cz',
    tags:        ['Personal Project', 'Next.js', 'React', 'TypeScript', 'Tailwind', 'Animations'],
    order:       3,
  },
  {
    id:          4,
    title:       'QuickCart POS',
    description: 'Modern point-of-sale system — product management, sales tracking with detailed reports, and a streamlined checkout.',
    icon:        '🛒',
    logo:        '/quickcartposlogonobg.png',
    url:         'https://quickcartpos.mejlos.com',
    tags:        ['School Project', 'Next.js', 'React', 'TypeScript', 'Tailwind', 'Supabase'],
    order:       4,
  },
]
