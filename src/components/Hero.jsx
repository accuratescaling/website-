import { motion } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'
import Aurora from './ui/Aurora'
import Button from './ui/Button'
import BookCallButton from './BookCallButton'
import { useLang } from '../i18n/context'
import { EASE, stagger, fadeUp } from '../lib/motion'

/* ----------------------------------------------------------------------------
 *  The AGENCY hero. Company introduction only.
 *
 *  The ECG heartbeat pulse still lives on /clinicos only — it belongs to the
 *  clinic. The primary CTA here books a call directly (see BookCallButton);
 *  the secondary action still bridges to the product for anyone who wants to
 *  look around first.
 * --------------------------------------------------------------------------*/

export default function Hero() {
  const { t, lang } = useLang()

  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh items-center overflow-hidden pt-24 pb-20"
    >
      <Aurora variant="hero" />

      <div className="container-x relative">
        <motion.div
          variants={stagger(0.15, 0.11)}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          {/* eyebrow */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-300/22 bg-brand-300/[0.07] py-2 pe-4 ps-2 text-[11px] font-semibold tracking-[0.2em] text-brand-200 uppercase backdrop-blur-md">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-400/18">
                <Sparkles className="size-3 text-brand-300" />
              </span>
              {t.hero.eyebrow}
            </span>
          </motion.div>

          {/* headline — each line masked and pushed up into place */}
          <h1 className="mt-7 font-display text-[clamp(2.4rem,7.2vw,5.1rem)] leading-[1.03] font-bold tracking-[-0.03em] rtl:tracking-normal">
            {t.hero.headline.map((line, i) => (
              <span key={`${lang}-${i}`} className="block overflow-hidden pb-1">
                <motion.span
                  className={`block ${i === 1 ? 'text-gradient-teal' : 'text-paper'}`}
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ delay: 0.22 + i * 0.11, duration: 0.85, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* lede */}
          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {t.hero.lede}
          </motion.p>

          {/* CTAs — primary books a call directly; secondary bridges to the product.
            * Stacked and full-width on mobile so both are easy, unambiguous taps;
            * side by side from sm: up. */}
          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col items-stretch gap-3.5 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <BookCallButton size="lg" icon="arrow" label={t.ui.bookCall} className="w-full sm:w-auto" />
            <Button as="a" href="#services" variant="ghost" size="lg" className="w-full sm:w-auto">
              {t.ui.whatWeDo}
              <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
