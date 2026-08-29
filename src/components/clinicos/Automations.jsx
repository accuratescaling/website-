import { motion } from 'framer-motion'
import { BellRing, ChevronRight, FileText } from 'lucide-react'
import GlowCard from '../ui/GlowCard'
import Reveal from '../ui/Reveal'
import { useLang } from '../../i18n/context'
import { viewport } from '../../lib/motion'

const ICONS = { reminders: BellRing, reports: FileText }

export default function Automations() {
  const { t, lang } = useLang()

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {t.clinicos.automations.map((a, idx) => {
        const Icon = ICONS[a.key]
        return (
          <Reveal key={`${lang}-${a.key}`} delay={idx * 0.12}>
            <GlowCard className="flex h-full flex-col p-6 sm:p-8" lift={false}>
              <header className="flex items-center gap-3.5">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-brand-300/18 bg-brand-400/[0.09] text-brand-300">
                  <Icon className="size-5" strokeWidth={1.7} />
                </span>
                <h4 className="font-display text-xl font-bold">{a.title}</h4>
              </header>

              <ul className="mt-6 space-y-3.5">
                {a.lines.map((line, i) => (
                  <motion.li
                    key={line}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={viewport}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                    className="flex gap-3 text-[14px] leading-relaxed text-muted"
                  >
                    <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-brand-400/70" />
                    {line}
                  </motion.li>
                ))}
              </ul>

              {/* per-card proof visual */}
              <div className="mt-auto pt-7">
                {a.key === 'reminders' ? <ReminderPreview /> : <ReportPipeline />}
              </div>
            </GlowCard>
          </Reveal>
        )
      })}
    </div>
  )
}

/* The actual reminder copy from the plan, shown as a delivered message. */
function ReminderPreview() {
  const { t } = useLang()
  const r = t.clinicos.reminderPreview

  return (
    <div className="rounded-2xl border border-brand-300/10 bg-ink-3/60 p-4">
      <p className="mb-3 text-[9px] tracking-[0.16em] text-faint uppercase">{r.label}</p>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.55 }}
        dir="rtl"
        lang="ar"
        className="rounded-2xl rounded-tr-md border border-brand-300/20 bg-brand-400/10 px-4 py-3"
      >
        <p className="font-arabic text-[13px] leading-relaxed text-brand-100">{r.message}</p>
        <p className="mt-2 flex items-center justify-end gap-1.5 text-[9px] text-brand-300/60">
          <span className="size-1 rounded-full bg-brand-300" />
          {r.meta}
        </p>
      </motion.div>
    </div>
  )
}

/* Live clinic data → aggregation → AI → Arabic narrative → Dashboard + Inbox */
function ReportPipeline() {
  const { t, lang } = useLang()
  const p = t.clinicos.reportPipeline

  return (
    <div className="rounded-2xl border border-brand-300/10 bg-ink-3/60 p-4">
      <p className="mb-3.5 text-[9px] tracking-[0.16em] text-faint uppercase">{p.label}</p>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
        {p.steps.map((step, i) => (
          <motion.li
            key={`${lang}-${step}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ delay: i * 0.11, duration: 0.4 }}
            className="flex items-center gap-1.5"
          >
            <span
              className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-medium ${
                i === p.steps.length - 1
                  ? 'border-brand-300/28 bg-brand-400/12 text-brand-100'
                  : 'border-brand-300/10 bg-black/[0.035] text-muted'
              }`}
            >
              {step}
            </span>
            {i < p.steps.length - 1 && (
              <ChevronRight className="size-3 shrink-0 text-brand-300/35 rtl:rotate-180" />
            )}
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
