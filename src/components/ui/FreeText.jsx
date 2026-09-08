/* ----------------------------------------------------------------------------
 *  Tints the word that says the call costs nothing.
 *
 *  "Free" is the strongest word in a booking CTA, so it gets its own colour
 *  instead of disappearing into the rest of the label. Same idiom as
 *  <BrandText> — split the string, wrap the matches, leave everything else
 *  untouched — so it composes with whatever styling the label already has.
 *
 *      <FreeText>Book a Free Call</FreeText>
 *      →  Book a <span class="text-free">Free</span> Call
 *
 *  Both languages are covered: English "Free" and the Arabic forms of مجاني.
 *  Add a language and its word goes in WORDS; nothing else changes.
 * --------------------------------------------------------------------------*/

/* \b does not work against Arabic script, so the boundary is handled by the
 * alternation itself: the Arabic forms are listed longest-first so "مجانية"
 * matches before the shorter "مجاني" prefix inside it. English keeps \b to
 * avoid lighting up "freely" or "freedom". */
const WORDS = '\\bfree\\b|مجانية|مجاناً|مجانا|مجاني'

const SPLIT = new RegExp(`(${WORDS})`, 'gi')
/* A separate, non-global copy for the per-part check: `.test()` on a /g regex
 * advances lastIndex between calls, so reusing SPLIT here would match only
 * every other time — tinting the word on alternating buttons. */
const IS_FREE = new RegExp(`^(?:${WORDS})$`, 'i')

export default function FreeText({ children }) {
  if (typeof children !== 'string') return children

  const parts = children.split(SPLIT)
  if (parts.length === 1) return children // nothing to highlight

  return parts.map((part, i) =>
    IS_FREE.test(part) ? (
      <span key={i} data-free-word className="text-free">
        {part}
      </span>
    ) : (
      part
    ),
  )
}
