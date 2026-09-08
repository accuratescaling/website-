import { motion } from 'framer-motion'
import { useLang } from '../../i18n/context'
import { viewport } from '../../lib/motion'

const TIMES = ['10:00', '10:30', '11:00', '11:30']
const STATES = ['now', 'next', 'wait', 'wait']
const BARS = [42, 66, 38, 84, 58, 92, 71]

/**
 * Abstract product visual — a stylised receptionist dashboard.
 * Pure CSS/HTML so it stays crisp at any size and needs no image assets.
 */
export default function DashboardMock({ className = '' }) {
  const { t, lang } = useLang()
  const m = t.products.mock

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-brand-300/14 bg-gradient-to-br from-ink-3 to-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] ${className}`}
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-brand-300/10 bg-brand-300/[0.03] px-3.5 py-2.5">
        <span className="size-2 shrink-0 rounded-full bg-brand-400/50" />
        <span className="size-2 shrink-0 rounded-full bg-brand-300/25" />
        <span className="size-2 shrink-0 rounded-full bg-brand-300/15" />
        <span className="ms-2 truncate font-mono text-[9px] tracking-wider text-brand-300/45">
          {m.window}
        </span>
        <span className="ms-auto inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-400/12 px-2 py-0.5 text-[8px] font-bold tracking-[0.1em] text-brand-200">
          <span className="size-1 animate-pulse rounded-full bg-brand-300" />
          {m.live}
        </span>
      </div>

      <div className="grid grid-cols-[1fr_1.15fr] gap-3 p-3.5">
        {/* live queue */}
        <div>
          <p className="mb-2 text-[8.5px] tracking-[0.16em] text-faint uppercase">{m.queue}</p>
          <ul className="space-y-1.5">
            {m.patients.map((name, i) => (
              <motion.li
                key={`${lang}-${name}`}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewport}
                transition={{ delay: 0.25 + i * 0.09, duration: 0.45 }}
                className={`flex items-center gap-2 rounded-lg border px-2 py-1.5 ${
                  STATES[i] === 'now'
                    ? 'border-brand-300/30 bg-brand-400/12'
                    : 'border-brand-300/8 bg-black/[0.02]'
                }`}
              >
                <span
                  className={`size-1.5 shrink-0 rounded-full ${
                    STATES[i] === 'now'
                      ? 'bg-brand-300'
                      : STATES[i] === 'next'
                        ? 'bg-brand-400/50'
                        : 'bg-black/15'
                  }`}
                />
                <span
                  className={`truncate text-[9.5px] font-medium ${
                    STATES[i] === 'now' ? 'text-paper' : 'text-muted/75'
                  }`}
                >
                  {name}
                </span>
                <span className="ms-auto font-mono text-[8.5px] text-faint">{TIMES[i]}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* revenue chart */}
        <div className="flex flex-col">
          <p className="mb-2 text-[8.5px] tracking-[0.16em] text-faint uppercase">{m.revenue}</p>
          <div className="flex flex-1 items-end gap-1.5 rounded-lg border border-brand-300/8 bg-black/[0.02] px-2.5 pt-3 pb-2.5">
            {BARS.map((h, i) => (
              <motion.span
                key={i}
                className="flex-1 rounded-t-[3px] bg-gradient-to-t from-brand-600/50 to-brand-300/85"
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={viewport}
                transition={{ delay: 0.35 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* AI report strip — the report itself is always Arabic, in both languages */}
      <div className="mx-3.5 mb-3.5 flex items-center gap-2 rounded-lg border border-brand-300/10 bg-brand-400/[0.05] px-2.5 py-2">
        <span className="grid size-4 shrink-0 place-items-center rounded bg-brand-400/20 font-mono text-[7px] font-bold text-brand-200">
          AI
        </span>
        <span dir="rtl" lang="ar" className="truncate font-arabic text-[9px] text-brand-100/70">
          {m.reportLine}
        </span>
      </div>
    </div>
  )
}
