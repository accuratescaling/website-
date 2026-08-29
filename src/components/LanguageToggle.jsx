import { motion } from 'framer-motion'
import { Languages } from 'lucide-react'
import { DICTS, LANGS, useLang } from '../i18n/context'

/* ----------------------------------------------------------------------------
 *  EN / ع segmented switch.
 *
 *  A single teal pill slides between the two options via a shared layoutId,
 *  so the highlight travels rather than jumping. Both labels stay visible
 *  the whole time — the reader can always see what they're switching to.
 * --------------------------------------------------------------------------*/

export default function LanguageToggle({ className = '', size = 'md' }) {
  const { lang, setLang, t } = useLang()

  const pad = size === 'sm' ? 'px-2.5 py-1' : 'px-3 py-1.5'
  const text = size === 'sm' ? 'text-[11px]' : 'text-[12px]'

  return (
    <div
      role="group"
      aria-label={t.ui.switchLanguage}
      className={`relative flex shrink-0 items-center gap-0.5 rounded-full border border-brand-300/18 bg-brand-300/[0.045] p-0.5 backdrop-blur-md ${className}`}
    >
      <Languages
        aria-hidden
        className={`${size === 'sm' ? 'ms-1.5 size-3' : 'ms-2 size-3.5'} shrink-0 text-brand-300/60`}
      />

      {LANGS.map((code) => {
        const active = code === lang
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            /* full name for screen readers, short code on screen */
            aria-label={DICTS[code].meta.label}
            className={`relative rounded-full font-semibold transition-colors duration-300 ${pad} ${text} ${
              active ? 'text-on-brand' : 'text-muted hover:text-paper'
            }`}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-brand-300 to-brand-500"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className={code === 'ar' ? 'font-arabic' : undefined}>
              {DICTS[code].meta.short}
            </span>
          </button>
        )
      })}
    </div>
  )
}
