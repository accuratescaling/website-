import { motion } from 'framer-motion'
import { ArrowRight, Check, X } from 'lucide-react'
import Reveal from '../ui/Reveal'
import BrandText from '../ui/BrandText'
import { useLang } from '../../i18n/context'
import { viewport } from '../../lib/motion'

export default function BeforeAfter() {
  const { t, lang } = useLang()
  const b = t.clinicos.beforeAfter

  return (
    <div className="overflow-hidden rounded-3xl border border-brand-300/12 bg-brand-300/[0.02] backdrop-blur-md">
      {/* column headers */}
      <div className="grid grid-cols-1 border-b border-brand-300/10 sm:grid-cols-2">
        <div className="flex items-center gap-2.5 px-6 py-4">
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-red-400/12 text-red-300/80">
            <X className="size-3.5" strokeWidth={2.6} />
          </span>
          <span className="text-[10.5px] font-bold tracking-[0.2em] text-red-200/60 uppercase">
            <BrandText>{b.beforeLabel}</BrandText>
          </span>
        </div>
        <div className="flex items-center gap-2.5 border-t border-brand-300/10 bg-brand-400/[0.04] px-6 py-4 sm:border-t-0 sm:border-s">
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-400/18 text-brand-200">
            <Check className="size-3.5" strokeWidth={2.6} />
          </span>
          <span className="text-[10.5px] font-bold tracking-[0.2em] text-brand-200 uppercase">
            <BrandText>{b.afterLabel}</BrandText>
          </span>
        </div>
      </div>

      <ul>
        {b.rows.map((row, i) => (
          <motion.li
            key={`${lang}-${i}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ delay: i * 0.07, duration: 0.5 }}
            className="group grid grid-cols-1 border-b border-brand-300/[0.07] last:border-b-0 sm:grid-cols-2"
          >
            {/* before */}
            <div className="relative flex items-start gap-3 px-6 py-4">
              <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-red-300/35" />
              <p className="text-[13.5px] leading-relaxed text-muted/65">{row.before}</p>
              {/* the arrow that sits on the seam, desktop only */}
              <span
                aria-hidden
                className="absolute top-1/2 -end-3 z-10 hidden size-6 -translate-y-1/2 place-items-center rounded-full border border-brand-300/20 bg-ink text-brand-300/60 transition-colors duration-500 group-hover:border-brand-300/50 group-hover:text-brand-300 sm:grid"
              >
                <ArrowRight className="size-3 rtl:rotate-180" strokeWidth={2.4} />
              </span>
            </div>

            {/* after */}
            <div className="flex items-start gap-3 bg-brand-400/[0.03] px-6 py-4 transition-colors duration-500 group-hover:bg-brand-400/[0.06] sm:border-s sm:border-brand-300/[0.07]">
              <Check className="mt-0.5 size-4 shrink-0 text-brand-300" strokeWidth={2.4} />
              <p className="text-[13.5px] leading-relaxed font-medium text-paper/90">{row.after}</p>
            </div>
          </motion.li>
        ))}
      </ul>

      <Reveal className="border-t border-brand-300/10 bg-ink-2/50 px-6 py-5">
        <p className="text-center text-[12.5px] leading-relaxed text-faint">{b.note}</p>
      </Reveal>
    </div>
  )
}
