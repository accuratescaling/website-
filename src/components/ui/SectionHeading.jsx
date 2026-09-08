import Reveal from './Reveal'
import BrandText from './BrandText'

/**
 * Renders a `{ pre, accent, post }` title object from the dictionary, with the
 * accent span carrying the teal gradient. Pass a plain string or JSX instead
 * and it renders that as-is.
 */
export function Title({ value }) {
  if (!value || typeof value === 'string') return value ?? null
  if (!value.pre && !value.accent) return value
  return (
    <>
      {value.pre}
      {value.accent && <span className="text-gradient-teal">{value.accent}</span>}
      {value.post}
    </>
  )
}

/** Eyebrow + title + optional lede, with consistent rhythm across sections. */
export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'center',
  className = '',
}) {
  const centered = align === 'center'
  return (
    <div
      className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl text-start'} ${className}`}
    >
      {eyebrow && (
        <Reveal>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-300/20 bg-brand-400/6 px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] text-brand-300 uppercase">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-brand-400" />
              <span className="relative inline-flex size-1.5 rounded-full bg-brand-300" />
            </span>
            {/* single wrapper: the eyebrow is an inline-flex with gap-2.5, so the
              * parts BrandText splits out must stay inside ONE flex item. */}
            <span>
              <BrandText>{eyebrow}</BrandText>
            </span>
          </span>
        </Reveal>
      )}

      <Reveal delay={0.08}>
        <h2 className="mt-6 text-3xl leading-[1.1] font-bold text-balance sm:text-4xl md:text-5xl">
          <Title value={title} />
        </h2>
      </Reveal>

      {lede && (
        <Reveal delay={0.16}>
          <p
            className={`mt-5 text-base leading-relaxed text-muted sm:text-lg ${centered ? 'mx-auto' : ''}`}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  )
}
