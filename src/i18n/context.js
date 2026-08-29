import { createContext, useContext } from 'react'
import en from './en'
import ar from './ar'

export const DICTS = { en, ar }
export const LANGS = ['en', 'ar']
export const STORAGE_KEY = 'as-lang'

/* Kept free of component exports so Fast Refresh keeps working. */
export const LanguageContext = createContext({
  lang: 'en',
  dir: 'ltr',
  t: en,
  phase: 'idle',
  switching: false,
  setLang: () => {},
  toggleLang: () => {},
})

/**
 * Everything a component needs to render in the active language.
 *
 *   const { t, lang, dir, toggleLang } = useLang()
 *   <h1>{t.hero.headline[0]}</h1>
 */
export const useLang = () => useContext(LanguageContext)

/** Shorthand when you only need the dictionary. */
export const useT = () => useContext(LanguageContext).t

/** Reads the visitor's preferred language: saved choice → browser → English. */
export function detectLang() {
  if (typeof window === 'undefined') return 'en'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (LANGS.includes(saved)) return saved
  const nav = window.navigator.language || ''
  return nav.toLowerCase().startsWith('ar') ? 'ar' : 'en'
}
