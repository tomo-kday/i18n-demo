export const i18n = {
  defaultLocale: 'jp',
  locales: ['jp', 'en', 'ch'],
  domains: [
    {
      domain: 'localhost',
      defaultLocale: 'jp',
      http: true,
    },
    {
      domain: 'en.localhost',
      defaultLocale: 'en',
      http: true,
    },
    {
      domain: 'ch.localhost',
      defaultLocale: 'ch',
      // an optional http field can also be used to test
      // locale domains locally with http instead of https
      http: true,
    },
  ],
} as const

export type Locale = (typeof i18n)['locales'][number]
