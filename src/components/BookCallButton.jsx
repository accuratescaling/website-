import { ArrowUpRight, CalendarCheck } from 'lucide-react'
import Button from './ui/Button'
import FreeTag, { splitFreeWord } from './ui/FreeTag'
import { useCalendly } from '../lib/calendly'
import { useT } from '../i18n/context'

/**
 * The site's single conversion action. Drop it anywhere.
 * With no `label`, it falls back to the active language's "Book a Free Call"
 * — never a hardcoded English string.
 *
 * When the label says the call is free, that word is lifted out of the
 * sentence into a green tag at the start of the button — so it reads
 * "[FREE] Book a Call" rather than burying the offer mid-phrase. Works in
 * both languages, and a label without a free-word renders untouched.
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
  const { word, rest } = splitFreeWord(label ?? t.ui.bookCall)

  return (
    <Button variant={variant} size={size} onClick={openCalendly} className={className}>
      {word && <FreeTag>{word}</FreeTag>}
      <Icon className="size-4 shrink-0" />
      {rest}
    </Button>
  )
}
