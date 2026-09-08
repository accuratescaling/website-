/* ----------------------------------------------------------------------------
 *  localStorage, but it can never take the page down with it.
 *
 *  `window.localStorage` is not always readable: Safari in Lockdown/private
 *  mode, Chrome with "block third-party cookies" when the site is framed, and
 *  some in-app webviews all throw on *access* — not just on read. That throw
 *  happened inside LanguageProvider's mount effect, which is unhandled, which
 *  unmounts the entire React root: a blank white page for those visitors.
 *
 *  Every call here degrades to "no stored preference" instead.
 * --------------------------------------------------------------------------*/

export function safeGet(key) {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

export function safeSet(key, value) {
  try {
    window.localStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}
