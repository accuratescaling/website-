import { motion } from 'framer-motion'
import { MessagesSquare, Workflow, LayoutDashboard, Database } from 'lucide-react'
import GlowCard from './ui/GlowCard'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import { useLang } from '../i18n/context'
import { viewport } from '../lib/motion'

/* ----------------------------------------------------------------------------
 *  WHAT WE DO — the agency's own offering.
 *
 *  COMPANY-level content. Before this section existed the landing page never
 *  actually said what Accurate Scaling does; it only described ClinicOS, which
 *  is what made the company read as though it *were* the product. These four
 *  services are the parts every product gets assembled from.
 * --------------------------------------------------------------------------*/

const ICONS = {
  assistants: MessagesSquare,
  automation: Workflow,
  dashboards: LayoutDashboard,
  foundation: Database,
}

export default function WhatWeDo() {
  const { t, lang } = useLang()
  const s = t.services

  return (
    <section id="services" className="relative isolate section overflow-hidden">
      {/* brighter twin wash so this section reads as lit, not flat */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/4 start-[-10%] size-[46rem] rounded-full blur-[150px]"
        style={{
          background:
            'radial-gradient(circle, rgba(16,179,196,0.15) 0%, rgba(35,78,140,0.07) 45%, transparent 72%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute end-[-12%] bottom-0 size-[40rem] rounded-full blur-[150px]"
        style={{
          background:
            'radial-gradient(circle, rgba(143,220,230,0.16) 0%, rgba(35,78,140,0.06) 50%, transparent 74%)',
        }}
      />

      <div className="container-x relative">
        <SectionHeading eyebrow={s.eyebrow} title={s.title} lede={s.lede} />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:gap-5">
          {s.items.map((item, i) => {
            const Icon = ICONS[item.id]
            return (
              <motion.div
                key={`${lang}-${item.id}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ delay: i * 0.09, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlowCard className="h-full p-7 sm:p-8">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-brand-300/25 bg-brand-400/15 text-brand-200 transition-transform duration-500 group-hover:scale-110">
                    <Icon className="size-5.5" strokeWidth={1.7} />
                  </span>

                  <h3 className="mt-6 font-display text-xl leading-snug font-bold text-balance">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{item.body}</p>
                </GlowCard>
              </motion.div>
            )
          })}
        </div>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-10 max-w-2xl rounded-2xl border border-brand-300/15 bg-brand-300/[0.05] px-6 py-5 text-center text-[14px] leading-relaxed text-paper/90">
            {s.note}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
