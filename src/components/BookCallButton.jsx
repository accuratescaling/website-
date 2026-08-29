import { ArrowUpRight, CalendarCheck } from 'lucide-react'
import Button from './ui/Button'
import { useCalendly } from '../lib/calendly'
import { useT } from '../i18n/context'

/**
 * The site's single conversion action. Drop it anywhere.
 * With no `label`, it falls back to the active language's "Book a Discovery
 * Call" — never a hardcoded English string.
 */
export default function BookCallButton({
  label,
  size = 'md',
  variant = 'primary',
  icon = 'calendar',
  className = '',
}) {
  const { openCalendly } = useCalendly()
  const t = useT()
  const Icon = icon === 'arrow' ? ArrowUpRight : CalendarCheck

  return (
    <Button variant={variant} size={size} onClick={openCalendly} className={className}>
      <Icon className="size-4 shrink-0" />
      {label ?? t.ui.bookCall}
    </Button>
  )
}
