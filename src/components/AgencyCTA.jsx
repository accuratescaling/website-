import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import Reveal from './ui/Reveal'
import Button from './ui/Button'
import { Title } from './ui/SectionHeading'
import { site } from '../config/site'
import { useLang } from '../i18n/context'
import { scaleIn } from '../lib/motion'

/* ----------------------------------------------------------------------------
 *  The COMPANY page's closing band.
 *
 *  Deliberately has no Calendly button of its own — the homepage's booking
 *  moment is the hero CTA, up top. This band offers the two things that are
 *  genuinely agency-level here — a direct message or an email — plus one more
 *  route into the product.
 *
 *  This is a deliberately dark "smoked glass" island on the light page, so
 *  every text color inside is set explicitly rather than left to the site's
 *  default light-page tokens — see Button.jsx's `ghostDark`.
 * --------------------------------------------------------------------------*/

export default function AgencyCTA() {
  const { t } = useLang()

  return (
    <section id="contact" className="relative isolate section overflow-hidden">
      <div className="container-x relative">
        <Reveal variants={scaleIn}>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 px-6 py-16 text-center sm:px-12 sm:py-20">
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                background:
                  /* alpha never drops low enough for the light page to show
                   * through — verified against the email link near the
                   * gradient's origin, the lightest point in the card. */
                  'radial-gradient(ellipse 70% 90% at 50% 110%, rgba(16,179,196,0.9) 0%, rgba(18,38,68,0.95) 45%, rgba(11,25,48,0.98) 80%)',
              }}
            />
            <div aria-hidden className="absolute inset-0 -z-10 grid-lines opacity-30" />
            <motion.div
              aria-hidden
              className="absolute -bottom-24 left-1/2 -z-10 size-[36rem] -translate-x-1/2 rounded-full blur-[110px]"
              style={{
                background: 'radial-gradient(circle, rgba(16,179,196,0.4) 0%, transparent 68%)',
              }}
              animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />

            <p className="text-[11px] font-semibold tracking-[0.24em] text-brand-300 uppercase">
              {t.agencyCta.eyebrow}
            </p>

            <h2 className="mx-auto mt-6 max-w-3xl font-display text-3xl leading-[1.08] font-bold text-balance text-on-brand sm:text-5xl">
              <Title value={t.agencyCta.title} />
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-[#c3d6e6] sm:text-base">
              {t.agencyCta.lede}
            </p>

            <div className="mt-10 flex justify-center">
              <Button as="link" to="/clinicos" size="lg" className="w-full sm:w-auto">
                {t.ui.exploreClinicOS}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Button>
            </div>

            <a
              href={`mailto:${site.email}`}
              className="mt-8 inline-flex items-center gap-2 text-[13px] text-[#c3d6e6] transition-colors hover:text-brand-300"
            >
              <Mail className="size-3.5" />
              <span dir="ltr">{site.email}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
