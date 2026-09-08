/**
 * Ambient background: slow-drifting frosted-glass clouds + technical grid + grain.
 * Purely decorative, pointer-events-none, sits behind everything in a section.
 *
 *   <Aurora variant="hero" />   full-bleed, brightest
 *   <Aurora />                  subtle section wash
 *
 * "Frost Glass" theme: soft cyan/cobalt clouds on an ice-pale ground, closer
 * to light passing through frosted glass than a glow in a dark room. Alpha
 * values are much lower than a dark-theme aurora needs, since even a little
 * saturated color reads strongly against a near-white canvas.
 */
export default function Aurora({ variant = 'section', className = '' }) {
  const hero = variant === 'hero'

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* technical grid, faded out towards the edges */}
      <div
        className="absolute inset-0 grid-lines"
        style={{
          maskImage: 'radial-gradient(ellipse 78% 62% at 50% 38%, black 20%, transparent 78%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 78% 62% at 50% 38%, black 20%, transparent 78%)',
          opacity: hero ? 1 : 0.5,
        }}
      />

      {/* frosted clouds — cyan and cobalt, soft enough to stay glass-like
          rather than becoming solid colour patches on the light ground */}
      <div
        className="absolute -top-[22%] left-[8%] size-[46rem] animate-aurora rounded-full blur-[130px]"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(16,179,196,0.32) 0%, rgba(35,78,140,0.14) 45%, transparent 70%)',
          opacity: hero ? 1 : 0.65,
        }}
      />
      <div
        className="absolute top-[6%] -right-[14%] size-[40rem] animate-aurora rounded-full blur-[120px]"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(143,220,230,0.34) 0%, rgba(35,78,140,0.12) 48%, transparent 72%)',
          animationDelay: '-7s',
          opacity: hero ? 1 : 0.55,
        }}
      />
      <div
        className="absolute -bottom-[28%] left-[30%] size-[52rem] animate-aurora rounded-full blur-[150px]"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(35,78,140,0.3) 0%, rgba(16,25,48,0.1) 50%, transparent 74%)',
          animationDelay: '-14s',
        }}
      />

      {/* vignette — blends the clouds back into the page ground at the
          edges, so they read as light in frosted glass rather than flat
          colour patches. Lightens toward the ground colour, not darkens. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 70% at 50% 40%, transparent 40%, rgba(239,244,250,0.55) 80%, #eff4fa 100%)',
        }}
      />

      {/* film grain */}
      <div className="absolute inset-0 noise opacity-[0.035] mix-blend-overlay" />
    </div>
  )
}
