import { motion } from 'framer-motion'
import { fadeUp, viewport } from '../../lib/motion'

/**
 * Scroll-reveal wrapper. Wrap anything; it fades and rises into place once.
 *
 *   <Reveal delay={0.1}>…</Reveal>
 *   <Reveal variants={fromLeft}>…</Reveal>
 */
export default function Reveal({
  children,
  delay = 0,
  variants = fadeUp,
  as = 'div',
  className = '',
  ...rest
}) {
  const Comp = motion[as] ?? motion.div
  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </Comp>
  )
}
