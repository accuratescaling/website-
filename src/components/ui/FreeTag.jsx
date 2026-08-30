/* ----------------------------------------------------------------------------
 *  The "FREE" tape that rides at the start of a booking CTA.
 *
 *  "Free" is the strongest word in a booking button, so instead of leaving it
 *  inline in the sentence it gets lifted out into its own bright badge — the
 *  one warm-green thing on a page that is otherwise entirely teal and cobalt,
 *  so the eye lands on it first.
 *
 *  The tag text is not a new dictionary key: it is the free-word taken out of
 *  the label itself. That keeps the two from ever drifting apart, and means a
 *  new language needs nothing here beyond its word in WORDS below.
 *
 *      splitFreeWord('Book a Free Call')     → { word: 'Free',   rest: 'Book a Call' }
 *      splitFreeWord('احجز مكالمة مجانية')   → { word: 'مجانية', rest: 'احجز مكالمة' }
 * --------------------------------------------------------------------------*/

/* \b does not work against Arabic script, so the boundary is handled by the
 * alternation itself: the Arabic forms are listed longest-first so "مجانية"
 * matches before the shorter "مجاني" prefix inside it. English keeps \b to
 * avoid lighting up "freely" or "freedom". */
const WORDS = '\\bfree\\b|مجانية|مجاناً|مجانا|مجاني'
const MATCH = new RegExp(WORDS, 'i')

/**
 * Pulls the free-word out of a label. Returns the word (for the tag) and the
 * label without it (for the button), with the leftover double space cleaned
 * up so "Book a Free Call" does not become "Book a  Call".
 */
export function splitFreeWord(label) {
  if (typeof label !== 'string') return { word: null, rest: label }

  const found = label.match(MATCH)
  if (!found) return { word: null, rest: label }

  return {
    word: found[0],
    rest: label.replace(MATCH, '').replace(/\s{2,}/g, ' ').trim(),
  }
}

export default function FreeTag({ children }) {
  return (
    <span
      data-free-tag
      className="
        relative isolate inline-flex shrink-0 items-center overflow-hidden rounded-full
        bg-gradient-to-b from-[#c4ffdd] via-[#4ade80] to-[#16a34a]
        px-2.5 py-1 text-[10.5px] font-extrabold tracking-[0.12em] uppercase
        text-[#032b16] rtl:tracking-normal
        shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(5,80,40,0.35),0_0_0_1px_rgba(34,197,94,0.5),0_3px_16px_-1px_rgba(74,222,128,0.9)]
      "
    >
      {/* specular sweep — the 'shiny' pass across the badge */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -inset-x-2 animate-shine bg-gradient-to-r from-transparent via-white/85 to-transparent"
      />
      <span className="relative">{children}</span>
    </span>
  )
}
