/* ============================================================================
 *  SITE CONFIG — edit this file, nothing else, to wire the site up.
 * ==========================================================================*/

export const site = {
  name: 'Accurate Scaling',
  domain: 'accuratescaling.com',
  year: 2026,

  /* --------------------------------------------------------------------------
   *  CALENDLY — paste your scheduling link here.
   *
   *  Any of these forms work — they are all normalised to a full URL:
   *      'accuratescaling'                                  (just the handle)
   *      'accuratescaling/discovery-call'                   (handle + event)
   *      'calendly.com/accuratescaling/discovery-call'
   *      'https://calendly.com/accuratescaling/discovery-call'
   *
   *  Find it in Calendly → your event type → "Copy link".
   *  Prefer the link to a specific 15-minute event over your bare profile, so
   *  visitors land straight on a bookable calendar.
   *
   *  Every "Book a Call" button on the site already routes here — there are 11
   *  of them and none need touching.
   * ------------------------------------------------------------------------*/
  calendlyUrl: "accuratescaling/free-consultation",
  calendlyMode: 'modal', // 'modal' = overlay on the page · 'redirect' = new tab

  email: "accuratescaling@gmail.com",
  socials: {
    "facebook": "https://www.facebook.com/profile.php?id=61578918687566",
    "instagram": "https://www.instagram.com/accurate.scaling/"
  },

}

/**
 * Normalises whatever was pasted into `calendlyUrl` to a full https URL, so a
 * bare handle, a protocol-less link, or a full URL all work. Trailing slashes
 * and stray whitespace are trimmed; any query string already on the link is
 * preserved so personal Calendly params survive.
 */
export const calendlyUrl = () => {
  let raw = (site.calendlyUrl || '').trim().replace(/\/+$/, '')
  if (!raw) return ''
  if (/^https?:\/\//i.test(raw)) return raw
  raw = raw.replace(/^\/\//, '').replace(/^calendly\.com\//i, '')
  return `https://calendly.com/${raw}`
}

/** True while the Calendly link is still the shipped placeholder. */
export const calendlyIsPlaceholder = () =>
  !site.calendlyUrl.trim() || /YOUR-HANDLE/i.test(site.calendlyUrl)

/* Nav labels now live in the language dictionaries (src/i18n/en.js, ar.js)
 * so they translate with the rest of the site. */
