import { Facebook, Instagram, Mail, ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from './ui/Logo'
import Reveal from './ui/Reveal'
import { site } from '../config/site'
import { useLang } from '../i18n/context'

const SOCIALS = [
  { label: 'Facebook', href: site.socials.facebook, Icon: Facebook },
  { label: 'Instagram', href: site.socials.instagram, Icon: Instagram },
]

/* ----------------------------------------------------------------------------
 *  Global footer — identical on both routes.
 *
 *  EVERY internal link is a router <Link> with a fully-qualified target
 *  (`/#about`, `/clinicos#packages`) rather than a bare `#about` anchor.
 *  Two things would break otherwise:
 *    · a bare `#about` from /clinicos looks for that id on the PRODUCT page,
 *      finds nothing, and does nothing.
 *    · a plain <a href="/#about"> does find the right page, but only by
 *      reloading the whole SPA — a white flash and a full re-download.
 *
 *  The scroll itself is handled centrally by RootLayout's ScrollToTop, which
 *  waits for the destination section to mount before scrolling to it.
 * --------------------------------------------------------------------------*/

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="relative isolate overflow-hidden border-t border-brand-300/12 bg-ink-2/40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/35 to-transparent"
      />

      <div className="container-x relative py-14">
        <div className="grid gap-11 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* brand */}
          <Reveal>
            <div>
              <Link to="/" aria-label={t.brand.name}>
                <Logo />
              </Link>
              <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-muted">
                {t.footer.blurb}
              </p>

              <div className="mt-6 flex items-center gap-2.5">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-10 shrink-0 place-items-center rounded-full border border-brand-300/18 text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300/50 hover:bg-brand-300/10 hover:text-brand-300"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* company navigation */}
          <Reveal delay={0.06}>
            <nav>
              <h3 className="text-[10px] font-semibold tracking-[0.2em] text-brand-300/65 uppercase">
                {t.footer.navigate}
              </h3>
              <ul className="mt-5 space-y-2.5">
                {t.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={`/${item.href}`}
                      className="text-[13.5px] text-muted transition-colors hover:text-paper"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          {/* products */}
          <Reveal delay={0.12}>
            <div>
              <h3 className="text-[10px] font-semibold tracking-[0.2em] text-brand-300/65 uppercase">
                {t.footer.products}
              </h3>
              <ul className="mt-5 space-y-2.5">
                <li>
                  <Link
                    to="/clinicos"
                    className="inline-flex items-center gap-2 text-[13.5px] text-muted transition-colors hover:text-paper"
                  >
                    ClinicOS
                    <span className="rounded-full bg-brand-400/18 px-1.5 py-0.5 text-[8px] font-bold tracking-wider text-brand-100">
                      {t.footer.live}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/clinicos#features"
                    className="text-[13.5px] text-muted transition-colors hover:text-paper"
                  >
                    {t.productNav[0].label}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/clinicos#packages"
                    className="text-[13.5px] text-muted transition-colors hover:text-paper"
                  >
                    {t.productNav[1].label}
                  </Link>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* contact */}
          <Reveal delay={0.18}>
            <div>
              <h3 className="text-[10px] font-semibold tracking-[0.2em] text-brand-300/65 uppercase">
                {t.footer.getInTouch}
              </h3>
              <a
                href={`mailto:${site.email}`}
                className="mt-5 inline-flex items-center gap-2 text-[13.5px] break-all text-muted transition-colors hover:text-brand-300"
              >
                <Mail className="size-3.5 shrink-0" />
                <span dir="ltr">{site.email}</span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* bottom bar */}
        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-5 border-t border-brand-300/12 pt-7 sm:flex-row">
          <p className="text-center text-[11.5px] text-faint sm:text-start">
            © {site.year} {t.brand.name}. {t.footer.rights}
          </p>

          {/* Scrolls the CURRENT page, whichever it is — not a route change,
            * so a button rather than a link to some other page's #top. */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-brand-300/18 px-4 py-2 text-[11.5px] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300/45 hover:text-brand-300"
          >
            {t.ui.backToTop}
            <ArrowUp className="size-3" />
          </button>
        </div>
      </div>
    </footer>
  )
}
