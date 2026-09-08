import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Bell, BarChart3, Bot, Monitor } from 'lucide-react'
import GlowCard from './ui/GlowCard'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import DashboardMock from './ui/DashboardMock'
import { ClinicOSMark } from './ui/Logo'
import { useLang } from '../i18n/context'
import { scaleIn } from '../lib/motion'

const PILLAR_ICONS = [Bot, Monitor, Bell, BarChart3]

/* ----------------------------------------------------------------------------
 *  THE BRIDGE — the company page's only link to the product.
 *
 *  One premium card. No "Product 02", no "Stay Tuned" teaser: the single job
 *  of this section is to move a visitor from the agency to /clinicos.
 *
 *  It advertises; it does not explain. No pillars detail, no pricing, and
 *  deliberately no "Book a Call" — booking belongs to the product page.
 * --------------------------------------------------------------------------*/

export default function ProductBridge() {
  const { t, lang } = useLang()
  const p = t.products

  return (
    <section id="products" className="relative isolate section overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-lines opacity-40"
        style={{
          maskImage: 'radial-gradient(ellipse 70% 55% at 50% 45%, black 10%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 55% at 50% 45%, black 10%, transparent 75%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute start-1/2 top-1/2 size-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px] rtl:translate-x-1/2"
        style={{
          background:
            'radial-gradient(circle, rgba(16,179,196,0.14) 0%, rgba(35,78,140,0.06) 46%, transparent 72%)',
        }}
      />

      <div className="container-x relative">
        <SectionHeading eyebrow={p.eyebrow} title={p.title} lede={p.lede} />

        {/* one card, centred — the product portfolio is a single product */}
        <Reveal variants={scaleIn} className="mx-auto mt-14 max-w-3xl lg:mt-18">
          <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
            <Link
              to="/clinicos"
              aria-label={p.clinicos.openAria}
              className="group/card block rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-300"
            >
              <GlowCard className="flex h-full flex-col p-6 sm:p-9" lift={false}>
                <header className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <ClinicOSMark className="size-14 shrink-0" />
                    <div>
                      <h3 className="font-display text-3xl font-bold tracking-tight">ClinicOS</h3>
                      <p className="mt-1 text-[13px] text-brand-300/75">{p.clinicos.subtitle}</p>
                    </div>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand-300/28 bg-brand-400/15 px-3 py-1.5 text-[9.5px] font-bold tracking-[0.14em] text-brand-100">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-brand-300" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-brand-300" />
                    </span>
                    {p.clinicos.badge}
                  </span>
                </header>

                <p className="mt-7 text-[15px] leading-relaxed text-muted">{p.clinicos.what}</p>

                <div className="mt-8">
                  <DashboardMock />
                </div>

                {/* the four pillars, named only — detail lives on the product page */}
                <ul className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {p.clinicos.pillarNames.map((name, i) => {
                    const Icon = PILLAR_ICONS[i]
                    return (
                      <li
                        key={`${lang}-${name}`}
                        className="flex items-center gap-2.5 rounded-xl border border-brand-300/12 bg-brand-300/[0.04] px-3 py-2.5"
                      >
                        <Icon className="size-4 shrink-0 text-brand-300" strokeWidth={1.8} />
                        <span className="truncate text-[12.5px] font-medium text-paper/85">
                          {name}
                        </span>
                      </li>
                    )
                  })}
                </ul>

                <div className="mt-9 flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-b from-brand-300 to-brand-500 px-7 py-3.5 text-[15px] font-semibold text-on-brand shadow-[0_10px_34px_-10px_rgba(16,179,196,0.4)] transition-all duration-300 group-hover/card:from-brand-200 group-hover/card:to-brand-400">
                    {t.ui.exploreClinicOS}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover/card:translate-x-1 rtl:rotate-180 rtl:group-hover/card:-translate-x-1" />
                  </span>
                  <span className="hidden text-[11px] tracking-[0.14em] text-faint uppercase sm:block">
                    {p.clinicos.detailsHint}
                  </span>
                </div>
              </GlowCard>
            </Link>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
