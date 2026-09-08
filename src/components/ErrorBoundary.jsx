import { Component } from 'react'

/* ----------------------------------------------------------------------------
 *  A render error anywhere below this point used to unmount the WHOLE React
 *  tree — React 18+ deliberately throws the root away when nothing catches —
 *  which is exactly the "completely white screen with no explanation" the site
 *  was reported to show. There was no boundary anywhere in the app.
 *
 *  This keeps the shell (navbar, footer, language switch) alive and swaps only
 *  the broken subtree for a readable panel, so the visitor can still navigate
 *  out instead of staring at a blank page.
 *
 *  `resetKey` — pass the current pathname. When it changes the boundary drops
 *  its error state, so navigating away from a page that threw actually
 *  recovers rather than pinning the fallback forever.
 * --------------------------------------------------------------------------*/

export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null })
    }
  }

  componentDidCatch(error, info) {
    /* Keep the real stack in the console — a silent boundary is almost as
     * hard to debug as the blank page it replaced. */
    console.error('[ErrorBoundary]', error, info?.componentStack)
  }

  render() {
    if (!this.state.error) return this.props.children

    if (this.props.fallback) return this.props.fallback(this.state.error)

    return (
      <section className="container-x flex min-h-[60svh] flex-col items-center justify-center gap-5 py-24 text-center">
        <p className="font-mono text-[11px] tracking-[0.24em] text-brand-300/70 uppercase">
          {this.props.label ?? 'Something went wrong'}
        </p>
        <p className="max-w-md text-[15px] leading-relaxed text-muted">
          {this.props.message ??
            'This section failed to load. The rest of the site is still working — try again, or head back to the home page.'}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => this.setState({ error: null })}
            className="rounded-full bg-gradient-to-b from-brand-300 to-brand-500 px-6 py-3 text-[14px] font-semibold text-on-brand"
          >
            {this.props.retryLabel ?? 'Try again'}
          </button>
          <a
            href="/"
            className="rounded-full border border-brand-300/25 px-6 py-3 text-[14px] font-medium text-muted transition-colors hover:text-paper"
          >
            {this.props.homeLabel ?? 'Back to home'}
          </a>
        </div>
      </section>
    )
  }
}
