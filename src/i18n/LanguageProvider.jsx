import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DICTS, LanguageContext, STORAGE_KEY, detectLang } from './context'
import { safeSet } from '../lib/storage'

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
  /* The language the UI is *travelling to*. During the 190ms fade-out `lang`
   * is still the old value, so a second click in that window used to compare
   * against a stale value and could re-trigger a switch to the language you
   * were already heading for. */
  const pending = useRef(null)
  const langRef = useRef(lang)
  langRef.current = lang

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  /* Resolve the real language after mount, so the first paint isn't a guess.
   * Idempotent on purpose: StrictMode runs this twice in development and both
   * passes compute the same value from the same source. */
  useEffect(() => {
    setLangState(detectLang())
    setReady(true)
    return clearTimers
  }, [])

  /* Keep the document in sync — this drives RTL and the Arabic font stack. */
  useEffect(() => {
    const html = document.documentElement
    html.lang = lang
    html.dir = DICTS[lang].meta.dir
    /* safeSet, not localStorage directly: a browser that throws on storage
     * access must not take the render down with it. */
    if (ready) safeSet(STORAGE_KEY, lang)
  }, [lang, ready])

  /* Watchdog. `phase === 'out'` means LanguageFade is holding the page at
   * opacity 0 — if a transition were ever interrupted so that the reset timer
   * never ran, the site would sit there completely blank. This guarantees the
   * fade always resolves, whatever happens to the timers above. */
  useEffect(() => {
    if (phase === 'idle') return undefined
    const guard = setTimeout(() => {
      setPhase('idle')
      pending.current = null
    }, FADE_OUT + FADE_IN + 400)
    return () => clearTimeout(guard)
  }, [phase])

  /* Stable identity — no `lang` dependency, so the callback never goes stale
   * and consumers do not re-render just because the language changed. */
  const setLang = useCallback((next) => {
    if (!DICTS[next]) return
    if (next === (pending.current ?? langRef.current)) return

    pending.current = next
    clearTimers()
    setPhase('out')

    // swap while the content is invisible, so the reflow is never seen
    timers.current.push(
      setTimeout(() => {
        setLangState(next)
        setPhase('in')
      }, FADE_OUT),
      setTimeout(() => {
        setPhase('idle')
        pending.current = null
      }, FADE_OUT + FADE_IN),
    )
  }, [])

  const toggleLang = useCallback(
    () => setLang((pending.current ?? langRef.current) === 'en' ? 'ar' : 'en'),
    [setLang],
  )

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
