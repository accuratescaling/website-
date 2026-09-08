import { motion } from 'framer-motion'
import { Building2, Check, Sparkles } from 'lucide-react'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import BookCallButton from '../BookCallButton'
import { useLang } from '../../i18n/context'
import { viewport } from '../../lib/motion'

export default function Pricing() {
  const { t, lang } = useLang()
  const p = t.pricing
  const L = p.labels
  const E = p.enterprise

  /* A tier shows figures only when the master switch is on AND it actually
   * has them. Custom-scoped tiers never do. Keeping this as a predicate (not
   * a bare `p.showPrices`) means re-enabling prices later can't accidentally
   * put numbers on a tier that was never meant to have any. */
  const showPrices = (tier) => p.showPrices && Boolean(tier.upfront && tier.monthly)

  return (
    <section id="pricing" className="relative isolate section overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 size-[54rem] -translate-x-1/2 -translate-y-1/3 rounded-full blur-[150px]"
        style={{
          background:
            'radial-gradient(circle, rgba(16,179,196,0.15) 0%, rgba(35,78,140,0.07) 48%, transparent 72%)',
        }}
      />

      <div className="container-x relative">
        <SectionHeading eyebrow={p.eyebrow} title={p.title} lede={p.note} />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-18 lg:grid-cols-3">
          {p.tiers.map((tier, i) => (
            <motion.article
              key={`${lang}-${tier.name}`}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ delay: i * 0.09, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border p-6 backdrop-blur-xl transition-colors duration-500 sm:p-7 ${
                tier.featured
                  ? 'border-brand-300/40 bg-brand-400/[0.07] shadow-[0_0_60px_-24px_rgba(16,179,196,0.4)]'
                  : 'border-brand-300/12 bg-brand-300/[0.03] hover:border-brand-300/28'
              }`}
            >
              {tier.featured && (
                <>
                  <span
                    aria-hidden
                    className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-300 to-transparent"
                  />
                  <span className="absolute top-5 end-5 inline-flex items-center gap-1.5 rounded-full bg-brand-400/20 px-2.5 py-1 text-[8.5px] font-bold tracking-[0.14em] text-brand-100">
                    <Sparkles className="size-2.5" />
                    {L.popular}
                  </span>
                </>
              )}

              <header>
                <h3 className="font-display text-xl font-bold">{tier.name}</h3>
                <p className="mt-2 min-h-[2.6rem] text-[12.5px] leading-snug text-muted">
                  {tier.who}
                </p>
              </header>

              {/* Prices, or the "we scope it on the call" line in their place.
                * Both occupy the same bordered band so the cards keep an even
                * rhythm either way. Which one shows is driven by
                * `pricing.showPrices` plus whether this tier has figures at
                * all — a tier with `custom: true` never shows numbers. */}
              <div className="mt-6 border-y border-brand-300/10 py-5">
                {showPrices(tier) ? (
                  <>
                    <p className="text-[9px] tracking-[0.18em] text-brand-300/55 uppercase">
                      {L.upfront}
                    </p>
                    <p className="mt-1.5 flex flex-wrap items-baseline gap-x-2">
                      <span className="font-display text-3xl leading-none font-bold text-gradient">
                        {tier.upfront}
                      </span>
                      {tier.originalUpfront && (
                        <span className="text-[13px] font-medium text-faint line-through">
                          {tier.originalUpfront}
                        </span>
                      )}
                    </p>

                    <p className="mt-5 text-[9px] tracking-[0.18em] text-brand-300/55 uppercase">
                      {L.monthly}
                    </p>
                    <p className="mt-1.5 flex flex-wrap items-baseline gap-x-2">
                      <span className="font-display text-xl font-bold text-paper">
                        {tier.monthly}
                        <span className="ms-1 text-[12px] font-medium text-faint">
                          {L.perMonth}
                        </span>
                      </span>
                      {tier.originalMonthly && (
                        <span className="text-[12px] font-medium text-faint line-through">
                          {tier.originalMonthly}
                        </span>
                      )}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-[9px] tracking-[0.18em] text-brand-300/55 uppercase">
                      {L.scoped}
                    </p>
                    <p className="mt-2 font-display text-[15px] leading-relaxed font-semibold text-balance text-paper/90">
                      {tier.quote}
                    </p>
                  </>
                )}
              </div>

              {/* what's included */}
              <ul className="mt-5 flex-1 space-y-2.5">
                {tier.includes.map((f) => (
                  <li key={f} className="flex gap-2.5 text-[12.5px] leading-snug text-muted">
                    <Check
                      className={`mt-0.5 size-3.5 shrink-0 ${tier.featured ? 'text-brand-200' : 'text-brand-300/70'}`}
                      strokeWidth={2.6}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              {tier.footnote && (
                <p className="mt-5 rounded-xl border border-brand-300/10 bg-brand-300/[0.03] px-3.5 py-2.5 text-[11px] leading-relaxed text-faint">
                  {tier.footnote}
                </p>
              )}
            </motion.article>
          ))}
        </div>

        {/* ── Enterprise — a full-width band, not a fourth card ───────────
          * Institution-scale work is a different conversation from the three
          * packages above, so it gets its own row rather than competing with
          * them in the grid. */}
        <Reveal delay={0.12} className="mt-5">
          <div className="overflow-hidden rounded-3xl border border-brand-300/18 bg-brand-300/[0.045] p-6 backdrop-blur-xl sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-12">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-300/28 bg-brand-400/15 px-3 py-1.5 text-[9px] font-bold tracking-[0.14em] text-brand-100 uppercase">
                  <Building2 className="size-2.5" />
                  {E.badge}
                </span>

                <h3 className="mt-4 font-display text-2xl font-bold">{E.name}</h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{E.who}</p>

                {E.footnote && (
                  <p className="mt-4 text-[11.5px] leading-relaxed text-faint">{E.footnote}</p>
                )}
              </div>

              <div>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {E.includes.map((f) => (
                    <li key={f} className="flex gap-2.5 text-[12.5px] leading-snug text-muted">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-brand-300" strokeWidth={2.6} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* the single conversion moment for the whole pricing section — every
          * tier and the enterprise band used to carry its own CTA; one large,
          * unmissable button converts better than three competing ones. */}
        <Reveal delay={0.15} className="mt-14 flex justify-center lg:mt-16">
          <BookCallButton
            label={t.ui.bookCallShort}
            size="xl"
            className="w-full sm:w-auto"
          />
        </Reveal>
      </div>
    </section>
  )
}
