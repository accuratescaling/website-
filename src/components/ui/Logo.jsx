import { useT } from '../../i18n/context'

/** Accurate Scaling mark — a rising ECG/scaling line inside a rounded tile. */
export function LogoMark({ className = 'size-9' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="as-mark" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#16315a" />
          <stop offset="0.55" stopColor="#234e8c" />
          <stop offset="1" stopColor="#10b3c4" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="17" fill="#eaf7fa" />
      <rect width="64" height="64" rx="17" fill="none" stroke="rgba(35,78,140,0.18)" />
      <path
        d="M13 42 L25.5 18 L32 30.5 L38.5 21.5 L51 42"
        fill="none"
        stroke="url(#as-mark)"
        strokeWidth="4.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Logo({ className = '' }) {
  const t = useT()
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-bold tracking-tight text-paper">
          {t.brand.name}
        </span>
        <span className="mt-1 text-[9px] font-semibold tracking-[0.28em] text-brand-300/70 uppercase">
          {t.brand.tagline}
        </span>
      </span>
    </span>
  )
}

/** ClinicOS product mark — a pulse ring with a cross. */
export function ClinicOSMark({ className = 'size-11' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="cos-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#10b3c4" />
          <stop offset="1" stopColor="#234e8c" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="#eaf7fa" />
      <circle cx="32" cy="32" r="30" fill="none" stroke="rgba(35,78,140,0.16)" />
      <circle
        cx="32"
        cy="32"
        r="22"
        fill="none"
        stroke="url(#cos-mark)"
        strokeWidth="2"
        strokeDasharray="4 6"
        opacity="0.7"
      />
      <path
        d="M32 21.5v21M21.5 32h21"
        stroke="url(#cos-mark)"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
