import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowLeft } from 'lucide-react'
import Aurora from '../components/ui/Aurora'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import BookCallButton from '../components/BookCallButton'
import BrandText from '../components/ui/BrandText'
import { Title } from '../components/ui/SectionHeading'
import { ClinicOSMark, LogoMark } from '../components/ui/Logo'
import Pillars from '../components/clinicos/Pillars'
import DoctorChat from '../components/clinicos/DoctorChat'
import Automations from '../components/clinicos/Automations'
import BeforeAfter from '../components/clinicos/BeforeAfter'
import Dashboards from '../components/clinicos/Dashboards'
import HowItWorks from '../components/clinicos/HowItWorks'
import Pricing from '../components/clinicos/Pricing'
import { useLang } from '../i18n/context'
import { scaleIn } from '../lib/motion'

/* ----------------------------------------------------------------------------
 *  ROUTE "/clinicos" — THE PRODUCT.
 *
 *  Everything clinic-specific lives here and only here: the four pillars, the
 *  AI doctor chat, the automations, the dashboards, the before/after, the
 *  packages and pricing — and every Calendly "Book a Call" on the site.
 *
 *  The ECG / heartbeat pulse also lives here exclusively. It used to sit under
 *  the company hero, which is the wrong home for it: it reads as the heart of
 *  a clinic, so it belongs to the clinic's product page.
 * --------------------------------------------------------------------------*/

/** A small labelled divider used between the sub-blocks of the product page. */
function Block({ label, title, children, className = '' }) {
  return (
    <div className={`pt-20 lg:pt-28 ${className}`}>
      <Reveal>
        <div className="mb-10 flex items-center gap-4">
          <span className="font-mono text-[10.5px] tracking-[0.22em] whitespace-nowrap text-brand-300/60 uppercase">
            {label}
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-brand-300/25 to-transparent" />
        </div>
        {title && (
          <h3 className="mb-10 font-display text-2xl leading-tight font-bold text-balance sm:text-3xl">
            <Title value={title} />
          </h3>
        )}
      </Reveal>
      {children}
    </div>
  )
}

/** The heartbeat. Product-page only — this is the pulse of a clinic. */
function PulseLine() {
  const reduce = useReducedMotion()

  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[200px] w-full opacity-60"
    >
      <defs>
        <linearGradient id="clinicos-ecg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#10b3c4" stopOpacity="0" />
          <stop offset="0.35" stopColor="#10b3c4" stopOpacity="0.95" />
          <stop offset="0.72" stopColor="#234e8c" stopOpacity="0.6" />
          <stop offset="1" stopColor="#16315a" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 150 H300 l26 -96 l24 178 l22 -134 l20 62 l18 -30 H760 l30 -70 l22 120 l20 -74 H1440"
        fill="none"
        stroke="url(#clinicos-ecg)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray={reduce ? undefined : '1400 1400'}
        className={reduce ? undefined : 'animate-ecg'}
      />
    </svg>
  )
}

const PRICING_ANCHOR = 'packages'

export default function ClinicOSPage() {
  const { t } = useLang()
  const c = t.clinicos
  const b = c.blocks

  const scrollToPricing = () =>
    document.getElementById(PRICING_ANCHOR)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <>
      {/* ═══════════════════════════════════════════ product masthead ═════ */}
      <section id="top" className="relative isolate overflow-hidden pt-28 pb-24 lg:pt-36">
        <Aurora variant="hero" />
        <PulseLine />

        <div className="container-x relative">
          <div className="mx-auto max-w-3xl text-center">
            {/* back to the parent company */}
            <Reveal>
              <Link
                to="/"
                className="group inline-flex items-center gap-2.5 rounded-full border border-brand-300/15 py-2 pe-4 ps-3 text-[12.5px] text-muted transition-colors hover:border-brand-300/35 hover:text-paper"
              >
                <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5 rtl:rotate-180 rtl:group-hover:translate-x-0.5" />
                {t.products.backToCompany}
              </Link>
            </Reveal>

            <Reveal variants={scaleIn} delay={0.06}>
              <ClinicOSMark className="mx-auto mt-8 size-16 animate-float" />
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 font-mono text-[11px] tracking-[0.24em] text-brand-300/70 uppercase">
                {c.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <h1 className="mt-4 font-display text-4xl leading-[1.05] font-bold sm:text-5xl md:text-6xl">
                Clinic<span className="text-gradient-teal">OS</span>
              </h1>
            </Reveal>

            {/* the parent-company byline — ClinicOS is a product, not the company */}
            <Reveal delay={0.2}>
              <p className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-brand-300/14 bg-brand-300/[0.05] py-1.5 pe-4 ps-2 text-[11.5px] text-muted">
                <LogoMark className="size-5 shrink-0" />
                {c.byline}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mt-5 text-base text-muted sm:text-lg">{c.tagline}</p>
            </Reveal>

            <Reveal delay={0.36}>
              <p className="mt-9 text-[15px] leading-relaxed text-muted">{c.what}</p>
            </Reveal>

            {/* every booking CTA on the site lives on this page. Stacked and
              * full-width on mobile so both are easy, unambiguous taps. */}
            <Reveal delay={0.42}>
              <div className="mt-9 flex flex-col items-stretch justify-center gap-3.5 sm:flex-row sm:flex-wrap sm:items-center">
                <BookCallButton size="lg" label={t.ui.bookFreeCall} className="w-full sm:w-auto" />
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={scrollToPricing}
                  className="w-full sm:w-auto"
                >
                  {t.ui.seePackages}
                  <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════ product detail ═════ */}
      <section id="features" className="relative isolate overflow-hidden pb-4">
        <Aurora />

        <div className="container-x relative">
          <Block label={b.pillars.label} title={b.pillars.title} className="!pt-0">
            <Pillars />
            <Reveal delay={0.2}>
              <p className="mt-6 rounded-2xl border border-brand-300/12 bg-brand-300/[0.035] px-6 py-4 text-center text-[13px] leading-relaxed text-faint">
                {c.multiTenantNote}
              </p>
            </Reveal>
          </Block>

          <Block label={b.chat.label}>
            <DoctorChat />
          </Block>

          <Block label={b.automations.label} title={b.automations.title}>
            <Automations />
          </Block>

          <Block label={b.dashboards.label} title={b.dashboards.title}>
            <Dashboards />
          </Block>

          <Block label={b.beforeAfter.label} title={b.beforeAfter.title}>
            <BeforeAfter />

            {/* the clinic pull-quote — product-level, so it lives here */}
            <Reveal delay={0.15} className="mt-10">
              <blockquote className="relative mx-auto max-w-3xl rounded-3xl border border-brand-300/14 bg-brand-300/[0.045] px-7 py-9 text-center backdrop-blur-md sm:px-12">
                <span
                  aria-hidden
                  className="absolute top-4 start-6 font-display text-6xl leading-none text-brand-300/20 select-none"
                >
                  &ldquo;
                </span>
                <p className="font-display text-lg leading-snug font-semibold text-balance text-paper sm:text-2xl">
                  {c.quote}
                </p>
                <footer className="mt-5 text-[11px] tracking-[0.2em] text-brand-300/70 uppercase">
                  <BrandText>{c.quoteFooter}</BrandText>
                </footer>
              </blockquote>
            </Reveal>
          </Block>

          <Block label={b.howItWorks.label} title={b.howItWorks.title}>
            <HowItWorks />
          </Block>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ the packages ══════ */}
      <div id={PRICING_ANCHOR} className="scroll-mt-[80px]">
        <Pricing />
      </div>
    </>
  )
}
