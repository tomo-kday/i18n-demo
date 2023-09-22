import 'server-only'
import type { Locale } from './i18n-config'


type LocalizeComponent = 'footer' | "header"

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  jp: (component :LocalizeComponent) => import(`./dictionaries/${component}/jp.json`).then((module) => module.default),
  ch: (component :LocalizeComponent) => import(`./dictionaries/${component}/ch.json`).then((module) => module.default),
  en: (component :LocalizeComponent) => import(`./dictionaries/${component}/en.json`).then((module) => module.default),
}


export const getDictionary = async (locale: Locale, component: LocalizeComponent) => {
  return dictionaries[locale]?.(component) ?? dictionaries.jp(component)
}
  
