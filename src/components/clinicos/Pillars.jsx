import { motion } from 'framer-motion'
import { ArrowLeft, Bell, BarChart3, Bot, Monitor } from 'lucide-react'
import GlowCard from '../ui/GlowCard'
import { useLang } from '../../i18n/context'
import { viewport } from '../../lib/motion'

const ICONS = { bot: Bot, monitor: Monitor, bell: Bell, chart: BarChart3 }

export default function Pillars() {
  const { t, lang } = useLang()
  const labels = t.clinicos.pillarLabels

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {t.clinicos.pillars.map((p, i) => {
        const Icon = ICONS[p.icon]
        return (
          <motion.div
            key={`${lang}-${p.icon}`}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlowCard className="flex h-full flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-brand-300/18 bg-brand-400/[0.09] text-brand-300 transition-transform duration-500 group-hover:scale-110">
                  <Icon className="size-5.5" strokeWidth={1.7} />
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-brand-300/30">
                  0{i + 1}
                </span>
              </div>

              <h4 className="mt-5 font-display text-lg font-bold">{p.name}</h4>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{p.what}</p>

              <dl className="mt-auto space-y-3 border-t border-brand-300/10 pt-5 text-[12px]">
                <div>
                  <dt className="text-[9px] tracking-[0.16em] text-brand-300/50 uppercase">
                    {labels.who}
                  </dt>
                  <dd className="mt-1 font-medium text-paper/85">{p.who}</dd>
                </div>
                <div>
                  <dt className="text-[9px] tracking-[0.16em] text-brand-300/50 uppercase">
                    {labels.replaces}
                  </dt>
                  <dd className="mt-1 flex items-start gap-1.5 leading-snug text-faint">
                    <ArrowLeft className="mt-0.5 size-3 shrink-0 text-brand-300/30 rtl:rotate-180" />
                    <span className="line-through decoration-brand-300/25">{p.replaces}</span>
                  </dd>
                </div>
              </dl>
            </GlowCard>
          </motion.div>
        )
      })}
    </div>
  )
}
