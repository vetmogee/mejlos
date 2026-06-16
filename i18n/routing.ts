import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales:       ['en', 'cs', 'vi'],
  defaultLocale: 'en',
})
