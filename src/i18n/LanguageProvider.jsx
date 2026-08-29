import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DICTS, LanguageContext, STORAGE_KEY, detectLang } from './context'

/* ----------------------------------------------------------------------------
 *  Holds the active language, mirrors it onto <html lang/dir>, and persists
 *  the choice.
 *
 *  The switch is a crossfade, NOT a remount. Nothing unmounts when the
 *  language changes — the dictionary swaps under a brief blur-and-fade
 *  (see LanguageFade.jsx). That keeps scroll position exactly where the
 *  reader left it and avoids re-firing every scroll-reveal on the page.
 *
 *  Sequence:  fade out 190ms → swap dictionary + <html dir> → fade in 260ms
 * --------------------------------------------------------------------------*/

const FADE_OUT = 190
const FADE_IN = 260

export default function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('en')
  const [phase, setPhase] = useState('idle') // 'idle' | 'out' | 'in'
  const [ready, setReady] = useState(false)
  const timers = useRef([])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  /* Resolve the real language after mount, so the first paint isn't a guess. */
  useEffect(() => {
    const initial = detectLang()
    setLangState(initial)
    setReady(true)
    return clearTimers
  }, [])

  /* Keep the document in sync — this drives RTL and the Arabic font stack. */
  useEffect(() => {
    const html = document.documentElement
    html.lang = lang
    html.dir = DICTS[lang].meta.dir
    if (ready) window.localStorage.setItem(STORAGE_KEY, lang)
  }, [lang, ready])

  const setLang = useCallback(
    (next) => {
      if (!DICTS[next] || next === lang) return

      clearTimers()
      setPhase('out')

      // swap while the content is invisible, so the reflow is never seen
      timers.current.push(
        setTimeout(() => {
          setLangState(next)
          setPhase('in')
        }, FADE_OUT),
        setTimeout(() => setPhase('idle'), FADE_OUT + FADE_IN),
      )
    },
    [lang],
  )

  const toggleLang = useCallback(() => setLang(lang === 'en' ? 'ar' : 'en'), [lang, setLang])

  const value = useMemo(
    () => ({
      lang,
      dir: DICTS[lang].meta.dir,
      t: DICTS[lang],
      phase,
      switching: phase !== 'idle',
      setLang,
      toggleLang,
    }),
    [lang, phase, setLang, toggleLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
