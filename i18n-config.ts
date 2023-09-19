export const i18n = {
  defaultLocale: 'jp',
  locales: ['jp', 'en', 'ch'],
} as const

export type Locale = (typeof i18n)['locales'][number]
