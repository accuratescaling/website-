import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Glass card with a teal spotlight that follows the cursor and a gradient
 * hairline that brightens on hover. The workhorse surface of the whole site.
 */
export default function GlowCard({
  children,
  className = '',
  as: Tag = 'div',
  spotlight = true,
  lift = true,
  ...rest
}) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 50, y: 0 })
  const [active, setActive] = useState(false)

  const onMove = (e) => {
    if (!spotlight || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
  }

  const MotionTag = motion[Tag] ?? motion.div

  return (
    <MotionTag
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      whileHover={lift ? { y: -5 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`group relative isolate overflow-hidden rounded-3xl border border-brand-300/12 bg-brand-300/[0.035] backdrop-blur-xl transition-colors duration-500 hover:border-brand-300/30 ${className}`}
      {...rest}
    >
      {/* cursor spotlight */}
      {spotlight && (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 transition-opacity duration-500"
          style={{
            opacity: active ? 1 : 0,
            background: `radial-gradient(420px circle at ${pos.x}% ${pos.y}%, rgba(16,179,196,0.14), transparent 62%)`,
          }}
        />
      )}

      {/* top edge highlight */}
      <div
        aria-hidden
        className="absolute inset-x-6 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-brand-300/45 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100"
      />

      {children}
    </MotionTag>
  )
}
