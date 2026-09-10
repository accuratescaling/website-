import { useEffect, useLayoutEffect, useRef } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../Navbar'
import Footer from '../Footer'
import ErrorBoundary from '../ErrorBoundary'
import LanguageFade from '../../i18n/LanguageFade'
import { useLang } from '../../i18n/context'

/* ----------------------------------------------------------------------------
 *  The shell both pages share.
 *
 *  Navbar, Footer, and the scroll-progress bar are global. Only the routed
 *  page swaps, and it crossfades on the way.
 *
 *  IMPORTANT: every `position: fixed` element (Navbar, the scroll bar, and
 *  the Calendly overlay that CalendlyProvider renders) stays OUTSIDE
 *  both the page-transition wrapper and LanguageFade. Those wrappers animate
 *  `filter` / `transform`, which makes them containing blocks — anything fixed
 *  inside would position against the wrapper instead of the viewport.
 * --------------------------------------------------------------------------*/

/** Thin teal reading-progress bar pinned to the very top of the viewport. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[99] h-[2px] origin-left bg-gradient-to-r from-brand-500 via-brand-300 to-brand-200 rtl:origin-right"
    />
  )
}

/* ----------------------------------------------------------------------------
 *  Scroll handling.
 *
 *  This component is rendered INSIDE the keyed <motion.main>, which is the
 *  whole point: AnimatePresence mode="wait" holds the incoming page back until
 *  the outgoing one has finished exiting, so anything that runs from the shell
 *  fires while the destination section still does not exist. That is what the
 *  old implementation worked around by polling requestAnimationFrame for up to
 *  90 frames — brittle (rAF is throttled to a standstill in a background tab,
 *  so a restored/background tab simply never scrolled), racy against the user's
 *  own scrolling, and it fired its scroll reset a frame after the new page had
 *  already painted at the *old* page's offset, which is the visible jump.
 *
 *  Mounting here instead makes it deterministic: this effect runs in the same
 *  commit that puts the new page in the DOM, so getElementById always resolves
 *  on the first try. No polling, no timers, no race.
 *
 *  `location.key` is in the dependencies so clicking the same hash twice, or
 *  navigating to the URL you are already on, scrolls again rather than
 *  silently doing nothing.
 * --------------------------------------------------------------------------*/
function RouteScroll() {
  const { hash, key } = useLocation()

  /* useLayoutEffect, not useEffect: a passive effect runs *after* the browser
   * has painted, so the incoming page was visibly rendered for one frame at
   * the outgoing page's scroll offset before snapping to the top — the
   * "content flashes on and off during navigation" that was reported. A layout
   * effect runs in the same commit, before paint, so the first frame the
   * visitor sees is already in the right place. */
  useLayoutEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }

    /* Hashes can legitimately be percent-encoded in the URL bar. */
    let id = hash.slice(1)
    try {
      id = decodeURIComponent(id)
    } catch {
      /* malformed escape — fall back to the raw fragment */
    }

    const el = document.getElementById(id)
    if (!el) {
      /* A hash that matches nothing on this page (a stale bookmark, a typo)
       * must not leave the reader stranded mid-document. */
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }

    /* No explicit `behavior`: html carries `scroll-behavior: smooth` and the
     * reduced-motion block in index.css switches it to `auto`, so this honours
     * the visitor's preference for free. `scroll-padding-top: 5.5rem` on html
     * supplies the fixed-navbar offset. */
    el.scrollIntoView({ block: 'start' })
  }, [hash, key])

  return null
}

export default function RootLayout() {
  const { pathname } = useLocation()
  const { t } = useLang()

  /* ------------------------------------------------------------------------
   *  Why this ref exists, and why `initial={false}` is NOT on <AnimatePresence>
   *
   *  The page-transition fade should not play on the very first load — you
   *  should not watch the landing page fade in from nothing. The obvious way
   *  to express that is <AnimatePresence initial={false}>, and that is what
   *  this file used to do. It has a severe side effect:
   *
   *  AnimatePresence passes `initial: false` down through PresenceContext, and
   *  EVERY descendant motion component reads it — not just its direct child.
   *  So on first load every <Reveal> on the page rendered straight at its
   *  final state with no `initial="hidden"` applied at all, leaving nothing to
   *  fade in from. The scroll-reveal animations were dead on whichever page
   *  was loaded first, while any page reached by clicking a link animated
   *  normally (a second presence child is not the "initial" one).
   *
   *  Putting `initial={false}` on the <motion.main> itself gets the same
   *  result for the page transition without touching PresenceContext, so the
   *  reveals below keep their own initial states.
   * ----------------------------------------------------------------------*/
  const firstRender = useRef(true)
  useEffect(() => {
    firstRender.current = false
  }, [])

  return (
    <>
      <ScrollProgress />
      <Navbar />

      <LanguageFade>
        {/* mode="wait" so the outgoing page finishes before the next arrives —
          * two full pages crossfading on top of each other reads as a glitch. */}
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={firstRender.current ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, pointerEvents: 'none' }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Keyed by pathname too, so a page that throws stops showing its
              * fallback the moment you navigate somewhere else. Without a
              * boundary a single render error unmounted the entire root and
              * left a blank white document. */}
            <ErrorBoundary
              resetKey={pathname}
              label={t.error?.label}
              message={t.error?.message}
              retryLabel={t.error?.retry}
              homeLabel={t.error?.home}
            >
              <RouteScroll />
              <Outlet />
            </ErrorBoundary>
          </motion.main>
        </AnimatePresence>

        <Footer />
      </LanguageFade>
    </>
  )
}
