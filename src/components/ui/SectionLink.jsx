import { Link, useLocation } from 'react-router-dom'

/* ----------------------------------------------------------------------------
 *  An in-page section link that goes through the router.
 *
 *  The navbar used to render these as plain <a href="#services">. A bare hash
 *  anchor is handled entirely by the browser: it pushes a history entry and
 *  fires `hashchange`, but NOT `popstate` — which is the only thing
 *  BrowserRouter listens to. So React Router's location never learned about
 *  the navigation. Consequences:
 *
 *    · useLocation().hash stayed '', so the shell's scroll handling never ran
 *      for any navbar click — it was dead code on the site's main nav.
 *    · the router's idea of the current URL drifted from the real one, so a
 *      later <Link> to the same place pushed a duplicate history entry and
 *      Back appeared to do nothing.
 *
 *  Routing it through <Link> fixes both while still rendering a real anchor,
 *  so middle-click, ctrl-click and "copy link address" keep working.
 *
 *  `to` accepts a bare '#services' (resolved against the page you are on) or a
 *  fully-qualified '/clinicos#packages'. Only internal targets belong here —
 *  mailto:, tel: and external URLs stay plain <a>.
 * --------------------------------------------------------------------------*/

export default function SectionLink({ to, children, ...rest }) {
  const { pathname } = useLocation()
  const target = to.startsWith('#') ? `${pathname}${to}` : to

  return (
    <Link to={target} {...rest}>
      {children}
    </Link>
  )
}
