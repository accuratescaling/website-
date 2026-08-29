import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

import LanguageProvider from '../i18n/LanguageProvider'
import CalendlyProvider from '../components/CalendlyProvider'
import RootLayout from '../components/layout/RootLayout'
import HomePage from '../pages/HomePage'
import ClinicOSPage from '../pages/ClinicOSPage'
import en from '../i18n/en'
import ar from '../i18n/ar'

/* ----------------------------------------------------------------------------
 *  Whole-page render tests. These are the ones that catch a white screen:
 *  a bad i18n path, a missing import, a component that throws. They mount the
 *  real routed app with the real providers, in both languages.
 * --------------------------------------------------------------------------*/

function renderAt(route, lang = 'en') {
  window.localStorage.setItem('as-lang', lang)
  return render(
    <LanguageProvider>
      <CalendlyProvider>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/clinicos" element={<ClinicOSPage />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </CalendlyProvider>
    </LanguageProvider>,
  )
}

describe.each([
  ['en', en],
  ['ar', ar],
])('renders in %s', (lang, dict) => {
  it('mounts the home page with its company sections', async () => {
    const { container } = renderAt('/', lang)
    for (const id of ['top', 'services', 'about', 'products', 'contact']) {
      expect(container.querySelector(`#${id}`), `#${id} missing`).toBeTruthy()
    }
  })

  it('mounts the ClinicOS page with its product sections', async () => {
    const { container } = renderAt('/clinicos', lang)
    for (const id of ['top', 'features', 'pricing']) {
      expect(container.querySelector(`#${id}`), `#${id} missing`).toBeTruthy()
    }
  })

  it('never leaks a literal "undefined" into the page text', async () => {
    for (const route of ['/', '/clinicos']) {
      const { container, unmount } = renderAt(route, lang)
      expect(container.textContent, `${route} (${lang})`).not.toMatch(/\bundefined\b/)
      unmount()
    }
  })

  it('sets html lang and dir to match the dictionary', async () => {
    renderAt('/', lang)
    expect(document.documentElement.lang).toBe(dict.meta.code)
    expect(document.documentElement.dir).toBe(dict.meta.dir)
  })
})

describe('strict company / product separation', () => {
  it('keeps pricing and the pulse OFF the company page (booking is sitewide)', () => {
    const { container } = renderAt('/')
    const text = container.textContent

    expect(text).not.toMatch(/Doctor Pack|Clinic Pack|Enterprise Pack/)
    expect(container.querySelector('.animate-ecg')).toBeNull()
  })

  it('puts booking and the pulse ON the product page', () => {
    const { container } = renderAt('/clinicos')
    const buttons = [...container.querySelectorAll('button')].map((b) => b.textContent)

    expect(buttons.some((b) => /Book a/.test(b))).toBe(true)
    expect(container.querySelector('.animate-ecg')).toBeTruthy()
  })

  it('offers exactly one route into the product from the company page', () => {
    const { container } = renderAt('/')
    const links = [...container.querySelectorAll('a[href="/clinicos"]')]
    expect(links.length).toBeGreaterThan(0)
    /* and no leftover teaser cards for products that do not exist */
    expect(container.textContent).not.toMatch(/Stay Tuned|Product 0?2|Product 0?3/i)
  })
})

describe('pricing section', () => {
  it('shows three cards, no figures, and a separate enterprise band', () => {
    const { container } = renderAt('/clinicos')
    const pricing = container.querySelector('#pricing')

    expect(within(pricing).getAllByRole('article')).toHaveLength(3)
    expect(pricing.textContent).not.toMatch(/\d[\d,]*\s*(JD|د\.أ)/)
    expect(pricing.textContent).toMatch(/Enterprise Pack/)

    /* the enterprise band must live OUTSIDE the three-card grid */
    const grid = container.querySelector('#pricing .grid')
    expect(grid.textContent).not.toMatch(/Enterprise Pack/)
  })

  it('carries no CTA button inside any individual tier card', () => {
    const { container } = renderAt('/clinicos')
    const cards = [...container.querySelectorAll('#pricing article')]
    for (const card of cards) expect(card.querySelector('button')).toBeNull()
  })

  it('offers exactly one consolidated CTA below the whole pricing section', () => {
    const { container } = renderAt('/clinicos')
    const pricing = container.querySelector('#pricing')
    const buttons = [...pricing.querySelectorAll('button')]
    expect(buttons).toHaveLength(1)
    expect(buttons[0].textContent).toMatch(/Book a Call/)
  })
})

describe('footer', () => {
  it('keeps every nav/product link route-aware regardless of the current page', () => {
    /* The footer is global and renders both the company nav and the product
     * nav no matter which route is active, so every href must be fully
     * qualified — a bare "#about" would look for that id on whatever page
     * happens to be mounted, which is wrong from /clinicos. */
    for (const route of ['/', '/clinicos']) {
      const { container, unmount } = renderAt(route)
      /* ClinicOSPage's blockquote citation is also a <footer> tag (valid
       * HTML5), and it sits earlier in the DOM than the real global one, so
       * a plain querySelector('footer') would grab the wrong element on
       * /clinicos. The site's actual Footer is always the last one — it's
       * the very last thing RootLayout renders. */
      const footer = [...container.querySelectorAll('footer')].at(-1)

      const navLinks = [...footer.querySelectorAll('nav a')]
      expect(navLinks.length, route).toBeGreaterThan(0)
      for (const a of navLinks) {
        expect(a.getAttribute('href'), `${route}: "${a.textContent}"`).toMatch(/^\/#/)
      }

      const productLinks = [...footer.querySelectorAll('a[href^="/clinicos"]')]
      expect(productLinks.length, route).toBeGreaterThanOrEqual(3)
      for (const a of productLinks) {
        expect(a.getAttribute('href'), `${route}: "${a.textContent}"`).toMatch(
          /^\/clinicos(#[\w-]+)?$/,
        )
      }

      unmount()
    }
  })

  it('points Instagram at the correct handle', () => {
    const { container } = renderAt('/')
    const insta = container.querySelector('footer a[aria-label="Instagram"]')
    expect(insta).toBeTruthy()
    expect(insta.getAttribute('href')).toBe('https://www.instagram.com/accurate.scaling/')
  })
})

describe('cross-page hash routing', () => {
  /* Landing on /#about (or /clinicos#packages) must scroll to that section.
   * The browser cannot do this on its own here: the target section belongs to
   * a client-rendered page that has not mounted yet when the hash is read, so
   * RootLayout waits for the element and scrolls to it. */
  it('scrolls to the hashed section when the route carries a hash', () => {
    const spy = vi.spyOn(Element.prototype, 'scrollIntoView')
    try {
      renderAt('/#about')
      expect(spy).toHaveBeenCalled()
      const scrolled = spy.mock.contexts ?? spy.mock.instances
      expect(scrolled.some((el) => el?.id === 'about')).toBe(true)
    } finally {
      spy.mockRestore()
    }
  })

  it('scrolls to a product section from a /clinicos hash', () => {
    const spy = vi.spyOn(Element.prototype, 'scrollIntoView')
    try {
      renderAt('/clinicos#packages')
      const scrolled = spy.mock.contexts ?? spy.mock.instances
      expect(scrolled.some((el) => el?.id === 'packages')).toBe(true)
    } finally {
      spy.mockRestore()
    }
  })

  it('jumps to the top instead when the route has no hash', () => {
    window.scrollTo.mockClear?.()
    renderAt('/')
    expect(window.scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({ top: 0, behavior: 'instant' }),
    )
  })
})

describe('final CTA removal', () => {
  it('no longer renders the removed dark conversion band on the product page', () => {
    const { container } = renderAt('/clinicos')
    expect(container.querySelectorAll('#contact')).toHaveLength(0)
    expect(container.textContent).not.toMatch(/running on a system/i)
  })
})

describe('video removal', () => {
  it('renders no <video> or <iframe> anywhere on the company page', () => {
    const { container } = renderAt('/')
    expect(container.querySelector('video')).toBeNull()
    expect(container.querySelector('iframe')).toBeNull()
  })

  it('renders no <video> or <iframe> anywhere on the product page', () => {
    const { container } = renderAt('/clinicos')
    expect(container.querySelector('video')).toBeNull()
    expect(container.querySelector('iframe')).toBeNull()
  })
})
