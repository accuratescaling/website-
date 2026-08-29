import { motion } from 'framer-motion'
import { useLang } from './context'

/**
 * Wraps the content that should crossfade when the language changes.
 * Nothing here unmounts — only opacity and blur animate, so scroll position
 * and every already-revealed section stay exactly as they were.
 *
 * The navbar sits OUTSIDE this wrapper: the control you just clicked
 * shouldn't fade out from under your cursor.
 */
export default function LanguageFade({ children, className = '' }) {
  const { phase } = useLang()
  const out = phase === 'out'

  return (
    <motion.div
      className={className}
      animate={{
        opacity: out ? 0 : 1,
        filter: out ? 'blur(6px)' : 'blur(0px)',
      }}
      transition={{ duration: out ? 0.19 : 0.26, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: 'opacity, filter' }}
    >
      {children}
    </motion.div>
  )
}
