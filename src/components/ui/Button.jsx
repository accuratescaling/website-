import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/* Created once at module scope. Calling motion.create() inside the component
 * would produce a new component type on every render and remount the button. */
const MotionLink = motion.create(Link)

const base =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-300 disabled:opacity-50'

const sizes = {
  sm: 'px-5 py-2.5 text-[13px]',
  md: 'px-6 py-3 text-sm',
  lg: 'px-7 py-3.5 text-[15px]',
  /* The single, standalone conversion moment — e.g. the consolidated pricing
   * CTA — where the button itself is the headline action on the page. */
  xl: 'px-10 py-5 text-base',
}

const variants = {
  /* Filled cyan-to-cobalt — the single primary action on a page. */
  primary:
    'bg-gradient-to-b from-brand-300 to-brand-500 text-on-brand shadow-[0_10px_34px_-10px_rgba(16,179,196,0.4)] hover:from-brand-200 hover:to-brand-400',
  /* Glass outline — secondary navigation actions, for use on the page's
   * normal light ground. */
  ghost:
    'border border-brand-300/25 bg-brand-300/[0.06] text-paper backdrop-blur-md hover:border-brand-300/50 hover:bg-brand-300/12',
  /* Same shape as `ghost`, but for the few sections that stay a deliberately
   * dark "glass" band (e.g. AgencyCTA) — `text-paper` and `ghost`'s
   * brand-tinted border both assume the light page and go unreadable on a
   * dark island, so this variant hardcodes light-on-dark instead. */
  ghostDark:
    'border border-white/25 bg-white/[0.08] text-on-brand backdrop-blur-md hover:border-white/45 hover:bg-white/15',
  /* Bare text with an underline that grows. */
  link: 'text-brand-300 hover:text-brand-200 px-0',
}

/**
 * `as` accepts:
 *   'button' (default) · 'a' for external/anchor links · 'link' for an
 *   in-app route, which renders react-router's <Link> and takes `to`.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  as = 'button',
  className = '',
  ...rest
}) {
  const Tag = as === 'a' ? motion.a : as === 'link' ? MotionLink : motion.button

  return (
    <Tag
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.975 }}
      transition={{ type: 'spring', stiffness: 420, damping: 26 }}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    >
      {/* sheen sweep on the primary variant */}
      {variant === 'primary' && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
        >
          <span className="absolute -inset-y-4 -left-1/3 w-1/3 rotate-12 bg-white/35 blur-md transition-transform duration-700 group-hover:translate-x-[420%]" />
        </span>
      )}
      <span className="relative inline-flex items-center gap-2.5">{children}</span>
    </Tag>
  )
}
