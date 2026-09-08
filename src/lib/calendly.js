import { createContext, useContext } from 'react'

/* Kept in its own module (no component export) so React Fast Refresh can
 * hot-update CalendlyProvider.jsx instead of forcing a full page reload. */

export const CalendlyContext = createContext({
  openCalendly: () => {},
  closeCalendly: () => {},
})

/** Opens the booking modal (or new tab, per site.calendlyMode). */
export const useCalendly = () => useContext(CalendlyContext)
