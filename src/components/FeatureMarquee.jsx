import { useLang } from '../i18n/context'

/**
 * Infinite marquee of what the system DOES — the features a clinic owner
 * cares about, not the tools we happened to build it with.
 *
 * In RTL the strip travels the other way, so it always scrolls "forward"
 * relative to the reading direction.
 */
export default function FeatureMarquee() {
  const { t, dir } = useLang()
  const items = [...t.marquee.items, ...t.marquee.items] // duplicated for a seamless loop

  return (
    <section
      aria-label={t.marquee.ariaLabel}
      className="relative border-y border-brand-300/8 bg-ink-2/40 py-6"
    >
      <div
        className="flex overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
        <div
          className="flex w-max animate-marquee items-center gap-10 pe-10 sm:gap-14 sm:pe-14"
          style={{ animationDirection: dir === 'rtl' ? 'reverse' : 'normal' }}
        >
          {items.map((label, i) => (
            <div key={`${label}-${i}`} className="flex shrink-0 items-center gap-10 sm:gap-14">
              <span className="font-display text-sm font-semibold tracking-tight whitespace-nowrap rtl:tracking-normal text-muted/80 transition-colors hover:text-brand-300 sm:text-base">
                {label}
              </span>
              <span aria-hidden className="size-1 shrink-0 rounded-full bg-brand-400/40" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
