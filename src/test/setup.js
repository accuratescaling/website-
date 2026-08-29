import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

/* jsdom implements neither of these, and Framer Motion needs both — every
 * `whileInView` reveal on the site uses IntersectionObserver, and
 * `useReducedMotion` reads matchMedia. Without the stubs any page render
 * throws before a single assertion runs. */

class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback
  }
  observe(el) {
    /* Report every observed element as fully visible, so scroll-reveal
     * content is present in the tree instead of being stuck at opacity 0. */
    this.callback([{ target: el, isIntersecting: true, intersectionRatio: 1 }], this)
  }
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
globalThis.IntersectionObserver = MockIntersectionObserver
globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!globalThis.matchMedia) {
  globalThis.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })
}

/* jsdom has no media pipeline: HTMLMediaElement.play() is unimplemented and
 * throws "Not implemented". Stub it to a resolved promise so autoplay code
 * runs its real path under test. */
globalThis.HTMLMediaElement.prototype.play = vi.fn(() => Promise.resolve())
globalThis.HTMLMediaElement.prototype.pause = vi.fn()

/* scrollIntoView is used by the "See the packages" button; window.scrollTo by
 * RootLayout's ScrollToTop on every route change. jsdom implements neither. */
globalThis.Element.prototype.scrollIntoView ??= vi.fn()
globalThis.scrollTo = vi.fn()

afterEach(() => {
  cleanup()
  window.localStorage.clear()
})
