/* Shared Framer Motion variants so every section animates on the same curve. */

export const EASE = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.75, ease: EASE } },
}

export const fromLeft = {
  hidden: { opacity: 0, x: -34 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
}

export const fromRight = {
  hidden: { opacity: 0, x: 34 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
}

/** Parent that staggers its children. */
export const stagger = (delayChildren = 0, staggerChildren = 0.09) => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
})

/** Default viewport settings — fire once, slightly before fully in view. */
export const viewport = { once: true, margin: '-80px' }

/** Springy hover used on cards and buttons. */
export const hoverLift = {
  y: -6,
  transition: { type: 'spring', stiffness: 320, damping: 22 },
}
