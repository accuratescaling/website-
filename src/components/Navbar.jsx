import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, Menu, X } from 'lucide-react'
import Logo from './ui/Logo'
import BookCallButton from './BookCallButton'
import LanguageToggle from './LanguageToggle'
import { useLang } from '../i18n/context'

/* ----------------------------------------------------------------------------
 *  The navbar is route-aware, because the two pages have nothing in common.
 *
 *    /          → company sections. NO booking button: the agency page never
 *                 books, it bridges to the product.
 *    /clinicos  → product sections + the Book a Call button.
 *
 *  Rendering the company's section anchors on the product page would give
 *  links that scroll nowhere, so each route gets its own set.
 * --------------------------------------------------------------------------*/

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const { t, dir } = useLang()
  const { pathname } = useLocation()

  const onProduct = pathname.startsWith('/clinicos')
  const links = onProduct ? t.productNav : t.nav

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  /* Close the mobile sheet whenever the route changes. */
  useEffect(() => setOpen(false), [pathname])

  /* Lock scroll while the mobile sheet is open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  /* The sheet slides in from the inline-end edge, whichever side that is. */
  const offscreen = dir === 'rtl' ? '-100%' : '100%'

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[80]"
      >
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? 'border-b border-brand-300/12 bg-ink/80 backdrop-blur-xl'
              : 'border-b border-transparent'
          }`}
        >
          <nav className="container-x flex h-[68px] items-center justify-between gap-4">
            {/* the logo always returns to the company */}
            <Link to="/" aria-label={t.brand.name} className="shrink-0">
              <Logo />
            </Link>

            {/* desktop links */}
            <ul className="hidden items-center gap-1 lg:flex">
              {onProduct && (
                <li>
                  <Link
                    to="/"
                    className="group inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-medium whitespace-nowrap text-muted transition-colors duration-300 hover:text-paper"
                  >
                    <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5 rtl:rotate-180 rtl:group-hover:translate-x-0.5" />
                    {t.products.backToCompany}
                  </Link>
                </li>
              )}
              {links.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="relative rounded-full px-3.5 py-2 text-[13px] font-medium whitespace-nowrap text-muted transition-colors duration-300 hover:text-paper"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2.5">
              <LanguageToggle size="sm" />

              {/* Booking is product-only. Wrapper, not a class on the button:
                * Button's base sets inline-flex, which Tailwind emits after
                * .hidden and would win. */}
              {onProduct && (
                <span className="hidden sm:block">
                  <BookCallButton label={t.ui.bookCallShort} size="sm" />
                </span>
              )}

              <button
                onClick={() => setOpen(true)}
                aria-label={t.ui.openMenu}
                className="grid size-10 shrink-0 place-items-center rounded-full border border-brand-300/18 text-paper transition hover:border-brand-300/45 lg:hidden"
              >
                <Menu className="size-4.5" />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[95] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, pointerEvents: 'none' }}
          >
            <div
              className="absolute inset-0 bg-void/80 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: offscreen }}
              animate={{ x: 0 }}
              exit={{ x: offscreen }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="absolute inset-y-0 end-0 flex w-[86%] max-w-sm flex-col border-s border-brand-300/14 bg-ink-2/95 backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between border-b border-brand-300/12 px-5 py-4">
                <Logo />
                <button
                  onClick={() => setOpen(false)}
                  aria-label={t.ui.closeMenu}
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-brand-300/18 text-muted transition hover:text-paper"
                >
                  <X className="size-4.5" />
                </button>
              </div>

              <ul className="flex-1 overflow-y-auto px-3 py-4">
                {onProduct && (
                  <li>
                    <Link
                      to="/"
                      onClick={() => setOpen(false)}
                      className="mb-2 flex items-center gap-2.5 rounded-2xl border border-brand-300/12 px-4 py-3 text-[13.5px] font-medium text-muted transition hover:text-paper"
                    >
                      <ArrowLeft className="size-4 rtl:rotate-180" />
                      {t.products.backToCompany}
                    </Link>
                  </li>
                )}
                {links.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: dir === 'rtl' ? -22 : 22 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-lg font-semibold text-paper transition hover:bg-brand-300/10"
                    >
                      {item.label}
                      <span className="font-mono text-[11px] text-brand-300/55">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="space-y-3 border-t border-brand-300/12 p-5">
                <LanguageToggle className="w-fit" />
                {onProduct ? (
                  <BookCallButton size="lg" className="w-full" />
                ) : (
                  <Link
                    to="/clinicos"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-b from-brand-300 to-brand-500 px-7 py-3.5 text-[15px] font-semibold text-on-brand"
                  >
                    {t.ui.exploreClinicOS}
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
