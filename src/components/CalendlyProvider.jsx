import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, CalendarCheck, ExternalLink } from 'lucide-react'
import { site, calendlyUrl } from '../config/site'
import { CalendlyContext } from '../lib/calendly'
import { useLang } from '../i18n/context'

/* ----------------------------------------------------------------------------
 *  Calendly, done two ways.
 *
 *  · site.calendlyMode === 'modal'    → opens the booking page in an overlay
 *  · site.calendlyMode === 'redirect' → opens the booking page in a new tab
 *
 *  Any component can trigger it with:   const { openCalendly } = useCalendly()
 *  The overlay embeds Calendly in an iframe, so there is no third-party script
 *  to load and nothing to clean up.
 * --------------------------------------------------------------------------*/

export default function CalendlyProvider({ children }) {
  const [open, setOpen] = useState(false)
  const { t, lang } = useLang()

  const openCalendly = useCallback(() => {
    if (site.calendlyMode === 'redirect') {
      window.open(calendlyUrl(), '_blank', 'noopener,noreferrer')
      return
    }
    setOpen(true)
  }, [])

  const closeCalendly = useCallback(() => setOpen(false), [])

  /* Escape to close + lock the page behind the overlay */
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  /* Calendly's own params: dark teal skin + booking page in the active
   * language. Built with URLSearchParams so a link that already carries a
   * query string (e.g. ?month=2026-09) gains "&" rather than a second "?". */
  const embedUrl = (() => {
    const base = calendlyUrl()
    if (!base) return base
    const [path, existing] = base.split(/[?]/)
    const params = new URLSearchParams(existing || '')
    params.set('hide_gdpr_banner', '1')
    params.set('background_color', 'ffffff')
    params.set('text_color', '101826')
    params.set('primary_color', '234e8c')
    params.set('locale', lang)
    return `${path}?${params.toString()}`
  })()

  return (
    <CalendlyContext.Provider value={{ openCalendly, closeCalendly }}>
      {children}

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            /* pointerEvents flips off the instant the exit starts, so a stalled
             * exit animation (e.g. a backgrounded tab) can never leave an
             * invisible full-screen overlay swallowing clicks. */
            exit={{ opacity: 0, pointerEvents: 'none' }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={t.calendly.title}
          >
            <div className="absolute inset-0 bg-void/85 backdrop-blur-md" onClick={closeCalendly} />

            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 240, damping: 26 }}
              className="relative flex h-[min(88svh,780px)] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-brand-300/20 bg-ink-2 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
            >
              <header className="flex shrink-0 items-center justify-between gap-4 border-b border-brand-300/12 px-5 py-4 sm:px-7">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-400/12 text-brand-300">
                    <CalendarCheck className="size-4.5" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold">{t.calendly.title}</p>
                    <p className="text-xs text-muted">{t.calendly.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={closeCalendly}
                  aria-label={t.ui.close}
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-brand-300/15 text-muted transition hover:border-brand-300/40 hover:text-paper"
                >
                  <X className="size-4" />
                </button>
              </header>

              <iframe
                src={embedUrl}
                title={t.calendly.title}
                className="flex-1 border-0 bg-ink-2"
                loading="lazy"
              />
              <footer className="shrink-0 border-t border-brand-300/12 px-5 py-3 text-center sm:px-7">
                <a
                  href={calendlyUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-muted transition hover:text-brand-300"
                >
                  {t.calendly.trouble} <ExternalLink className="size-3" />
                </a>
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </CalendlyContext.Provider>
  )
}
