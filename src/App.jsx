import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import LanguageProvider from './i18n/LanguageProvider'
import CalendlyProvider from './components/CalendlyProvider'
import RootLayout from './components/layout/RootLayout'
import HomePage from './pages/HomePage'
import ClinicOSPage from './pages/ClinicOSPage'

/* ----------------------------------------------------------------------------
 *  STRICT COMPANY / PRODUCT SEPARATION
 *
 *      /            → Accurate Scaling, the agency. Company content only.
 *      /clinicos    → ClinicOS, the product. Product content and ALL booking.
 *
 *  These are two distinct pages, not one page with a section. Nothing about
 *  the clinic — pillars, packages, pricing, the heartbeat pulse, Calendly —
 *  appears on the company page; the only bridge is the "Explore ClinicOS"
 *  card, which routes.
 *
 *  BrowserRouter gives real `/clinicos` URLs as specified. That means the host
 *  must serve index.html for unknown paths (SPA fallback) or a hard refresh on
 *  /clinicos 404s — `public/_redirects` covers Netlify and Cloudflare Pages;
 *  see the README for other hosts. Vite's dev server does this automatically.
 * --------------------------------------------------------------------------*/

export default function App() {
  return (
    <LanguageProvider>
      {/* Calendly lives above the router so its overlay is never unmounted by
        * a page transition mid-booking. Only the product page triggers it. */}
      <CalendlyProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/clinicos" element={<ClinicOSPage />} />
              {/* anything else falls back to the company page */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CalendlyProvider>
    </LanguageProvider>
  )
}
