/* ----------------------------------------------------------------------------
 *  Renders a string while protecting brand names from `text-transform`.
 *
 *  Several labels on the page are styled `uppercase`, which would render
 *  "ClinicOS" as "CLINICOS" and "Accurate Scaling" as "ACCURATE SCALING" —
 *  wrong casing for a trademark. This wraps each brand occurrence in a
 *  `normal-case` span so the label style still applies to the words around it.
 *
 *      <span className="uppercase"><BrandText>{t.pricing.eyebrow}</BrandText></span>
 *      →  BAQAT ClinicOS   (label uppercased, name untouched)
 *
 *  Add any future product name to BRANDS and every uppercase label is covered.
 * --------------------------------------------------------------------------*/

const BRANDS = ['Accurate Scaling', 'ClinicOS']

/* Longest first, so "Accurate Scaling" wins before a shorter partial match. */
const PATTERN = new RegExp(
  `(${[...BRANDS].sort((a, b) => b.length - a.length).join('|')})`,
  'g',
)

export default function BrandText({ children }) {
  if (typeof children !== 'string') return children

  const parts = children.split(PATTERN)
  if (parts.length === 1) return children // no brand name in this string

  return parts.map((part, i) =>
    BRANDS.includes(part) ? (
      <span key={i} className="normal-case">
        {part}
      </span>
    ) : (
      part
    ),
  )
}
