import { motion } from 'framer-motion'
import { Check, LayoutDashboard, LineChart } from 'lucide-react'
import GlowCard from '../ui/GlowCard'
import { useLang } from '../../i18n/context'
import { viewport } from '../../lib/motion'

const ICONS = [LayoutDashboard, LineChart]

export default function Dashboards() {
  const { t, lang } = useLang()

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {t.clinicos.dashboards.map((d, i) => {
        const Icon = ICONS[i]
        return (
          <motion.div
            key={`${lang}-${d.role}`}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ delay: i * 0.12, duration: 0.6 }}
          >
            <GlowCard className="h-full p-6 sm:p-7">
              <header className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-brand-300/18 bg-brand-400/[0.09] text-brand-300">
                  <Icon className="size-4.5" strokeWidth={1.8} />
                </span>
                <h4 className="font-display text-lg font-bold">{d.role}</h4>
              </header>

              <ul className="mt-5 space-y-3">
                {d.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[13.5px] leading-relaxed text-muted">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-300/75" strokeWidth={2.2} />
                    {item}
                  </li>
                ))}
              </ul>
            </GlowCard>
          </motion.div>
        )
      })}
    </div>
  )
}
