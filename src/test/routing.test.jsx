import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

import LanguageProvider from '../i18n/LanguageProvider'
import CalendlyProvider from '../components/CalendlyProvider'
import RootLayout from '../components/layout/RootLayout'
import ErrorBoundary from '../components/ErrorBoundary'
import HomePage from '../pages/HomePage'
import ClinicOSPage from '../pages/ClinicOSPage'
import en from '../i18n/en'
import ar from '../i18n/ar'

/* The Arabic language-toggle label, as it appears in the dictionary. */
const AR_LABEL = ar.meta.label

/* ----------------------------------------------------------------------------
 *  Regression tests for the reported white-screen / flashing / navigation bugs.
 * --------------------------------------------------------------------------*/

function renderApp(route, { extraRoute } = {}) {
  return render(
    <LanguageProvider>
      <CalendlyProvider>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/clinicos" element={<ClinicOSPage />} />
              {extraRoute}
            </Route>
          </Routes>
        </MemoryRouter>
      </CalendlyProvider>
    </LanguageProvider>,
  )
}

describe('white screen: an uncaught render error', () => {
  const Boom = () => {
    throw new Error('kaboom')
  }

  afterEach(() => vi.restoreAllMocks())

  it('shows a readable panel instead of unmounting the whole app', () => {
    /* React logs the caught error; keep the test output clean. */
    vi.spyOn(console, 'error').mockImplementation(() => {})

    const { container } = renderApp('/boom', {
      extraRoute: <Route path="/boom" element={<Boom />} />,
    })

    /* The page did NOT go blank... */
    expect(container.textContent).toContain(en.error.label)
    expect(screen.getByText(en.error.retry)).toBeTruthy()
    /* ...and the shell around it survived, so the visitor can navigate out. */
    expect(container.querySelector('header')).toBeTruthy()
    expect(container.querySelectorAll('footer').length).toBeGreaterThan(0)
  })

  it('recovers when the visitor navigates to a working route', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})

    const { container, rerender } = render(
      <ErrorBoundary resetKey="/boom">
        <Boom />
      </ErrorBoundary>,
    )
    expect(container.textContent).toContain('Something went wrong')

    rerender(
      <ErrorBoundary resetKey="/">
        <p>recovered</p>
      </ErrorBoundary>,
    )
    expect(container.textContent).toContain('recovered')
  })
})

describe('white screen: storage access that throws', () => {
  afterEach(() => vi.restoreAllMocks())

  it('still renders when localStorage is blocked', () => {
    /* Safari lockdown/private mode, blocked third-party storage in a frame,
     * and some in-app webviews throw on access rather than returning null.
     * That throw used to happen inside LanguageProvider's mount effect, which
     * unmounts the entire React root. */
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage blocked')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('storage blocked')
    })

    const { container } = renderApp('/')

    expect(container.querySelector('#services')).toBeTruthy()
    expect(container.querySelector('#products')).toBeTruthy()
    expect(container.textContent).not.toContain(en.error.label)
    expect(document.documentElement.lang).toBe('en')
  })
})

describe('navbar navigation goes through the router', () => {
  it('renders fully-qualified hrefs on the company page', () => {
    const { container } = renderApp('/')
    const links = [...container.querySelectorAll('header nav ul a')]

    expect(links.length).toBeGreaterThan(0)
    for (const a of links) {
      /* A bare "#services" is handled by the browser alone: it never reaches
       * React Router, so the shell's scroll handling never runs and the
       * router's location silently drifts from the real URL. */
      expect(a.getAttribute('href'), a.textContent).toMatch(/^\/#/)
    }
  })

  it('renders product hrefs against the product route', () => {
    const { container } = renderApp('/clinicos')
    const links = [...container.querySelectorAll('header nav ul a')].filter((a) =>
      a.getAttribute('href')?.includes('#'),
    )

    expect(links.length).toBeGreaterThan(0)
    for (const a of links) {
      expect(a.getAttribute('href'), a.textContent).toMatch(/^\/clinicos#/)
    }
  })

  it('routes the hero secondary CTA through the router too', () => {
    const { container } = renderApp('/')
    const hero = [...container.querySelectorAll('a')].filter(
      (a) => a.textContent.trim() === en.ui.whatWeDo,
    )
    expect(hero.length, 'hero "what we do" link').toBeGreaterThan(0)
    for (const a of hero) expect(a.getAttribute('href')).toBe('/#services')
  })

  it('keeps external, mail and booking links as plain anchors', () => {
    const { container } = renderApp('/')
    const mail = container.querySelector('a[href^="mailto:"]')
    const social = container.querySelector('a[target="_blank"]')

    expect(mail, 'contact email must stay a real mailto anchor').toBeTruthy()
    expect(social, 'socials must stay external anchors').toBeTruthy()
    expect(social.getAttribute('rel')).toContain('noopener')
  })
})

describe('hash scrolling is deterministic', () => {
  afterEach(() => vi.restoreAllMocks())

  it('scrolls straight to the section, with no polling', () => {
    const raf = vi.spyOn(globalThis, 'requestAnimationFrame')
    const spy = vi.spyOn(Element.prototype, 'scrollIntoView')
    /* spyOn returns the SAME mock if the method is already spied, so call
     * history can leak in from an earlier test in this file. */
    raf.mockClear()
    spy.mockClear()

    renderApp('/#about')

    const targets = (spy.mock.contexts ?? spy.mock.instances).filter(Boolean)
    expect(targets.some((el) => el.id === 'about')).toBe(true)
    /* the old implementation queued up to 90 animation frames hunting for the
     * element; a background tab throttles rAF to a standstill and the scroll
     * simply never happened. */
    expect(raf).not.toHaveBeenCalled()
  })

  it('falls back to the top for a hash that matches nothing', () => {
    window.scrollTo.mockClear?.()
    const spy = vi.spyOn(Element.prototype, 'scrollIntoView')
    spy.mockClear()

    renderApp('/#does-not-exist')

    expect(spy).not.toHaveBeenCalled()
    expect(window.scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({ top: 0, behavior: 'instant' }),
    )
  })
})

describe('mobile sheet', () => {
  it('restores body scrolling after it closes', () => {
    const { container } = renderApp('/')
    const open = container.querySelector('button[aria-label="' + en.ui.openMenu + '"]')

    fireEvent.click(open)
    expect(document.body.style.overflow).toBe('hidden')

    fireEvent.click(container.querySelector('button[aria-label="' + en.ui.closeMenu + '"]'))
    expect(document.body.style.overflow).toBe('')
  })
})

describe('language switching', () => {
  afterEach(() => vi.restoreAllMocks())

  it('never leaves the page stuck invisible after rapid toggling', () => {
    vi.useFakeTimers()
    try {
      const { container } = renderApp('/')
      const byLabel = (label) =>
        container.querySelector('header button[aria-label="' + label + '"]')

      /* hammer the switch faster than the 190ms fade-out */
      for (let i = 0; i < 6; i++) {
        const btn = i % 2 === 0 ? byLabel(AR_LABEL) : byLabel('English')
        if (btn) fireEvent.click(btn)
        vi.advanceTimersByTime(40)
      }
      vi.advanceTimersByTime(2000)

      expect(['en', 'ar']).toContain(document.documentElement.lang)
      expect(document.documentElement.dir).toBe(
        document.documentElement.lang === 'ar' ? 'rtl' : 'ltr',
      )
    } finally {
      vi.useRealTimers()
    }
  })
})
