import { useEffect } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../Navbar'
import Footer from '../Footer'
import LanguageFade from '../../i18n/LanguageFade'

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

/** Routing does not reset scroll on its own — a new page must start at its top. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }

    /* An in-page anchor (…/clinicos#pricing) can't be left to the browser's
     * native hash-jump: the destination page is client-rendered and, thanks
     * to AnimatePresence's mode="wait" above, doesn't even mount until the
     * outgoing page's exit animation finishes — so the target element almost
     * never exists yet at the moment the browser tries to jump to it. Poll
     * for it instead, for a bounded number of frames, then scroll to it once
     * it appears. */
    const id = hash.slice(1)
    let frame
    let attempts = 0
    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      if (attempts++ < 90) frame = requestAnimationFrame(tryScroll)
    }
    tryScroll()

    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}

export default function RootLayout() {
  const { pathname } = useLocation()

  return (
    <>
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />

      <LanguageFade>
        {/* mode="wait" so the outgoing page finishes before the next arrives —
          * two full pages crossfading on top of each other reads as a glitch. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, pointerEvents: 'none' }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>

        <Footer />
      </LanguageFade>
    </>
  )
}
