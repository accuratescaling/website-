import { createContext, useContext } from 'react'
import en from './en'
import ar from './ar'
import { safeGet } from '../lib/storage'

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
  /* Storage access can throw outright (private mode, blocked storage, some
   * in-app webviews) — safeGet swallows that so a blocked browser gets
   * English instead of a blank page. */
  const saved = safeGet(STORAGE_KEY)
  if (LANGS.includes(saved)) return saved
  let nav = ''
  try {
    nav = window.navigator.language || ''
  } catch {
    nav = ''
  }
  return nav.toLowerCase().startsWith('ar') ? 'ar' : 'en'
}
