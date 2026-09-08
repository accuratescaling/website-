import { motion } from 'framer-motion'
import { useLang } from '../../i18n/context'
import { viewport } from '../../lib/motion'

export default function HowItWorks() {
  const { t, lang } = useLang()

  return (
    <div className="relative">
      {/* the connecting rail — grows from the reading-start edge */}
      <motion.div
        aria-hidden
        className="absolute top-6 start-6 hidden h-px origin-left bg-gradient-to-r from-brand-300/45 via-brand-400/25 to-transparent rtl:origin-right md:block md:end-6"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewport}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />

      <ol className="grid gap-8 md:grid-cols-3 md:gap-6">
        {t.clinicos.howItWorks.map((s, i) => (
          <motion.li
            key={`${lang}-${s.step}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
            className="relative md:px-6"
          >
            <span className="relative z-10 grid size-12 place-items-center rounded-2xl border border-brand-300/22 bg-ink-2 font-display font-bold text-brand-300 shadow-[0_0_0_6px_var(--color-ink)]">
              {s.step}
            </span>
            <h4 className="mt-5 font-display text-lg font-bold">{s.title}</h4>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">{s.body}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
