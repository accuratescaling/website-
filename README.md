# Accurate Scaling — Company Website

The company homepage for **Accurate Scaling**, the parent brand of **ClinicOS**.
React + Vite + Tailwind CSS v4 + Framer Motion. Mobile-first, dark high-contrast
deep-teal theme, fully bilingual Arabic / English with RTL.

All copy on the page is pulled from the supplied source documents
(`AccurateScaling_GoToMarket_Plan.docx`, `AccurateScaling_Pricing.pdf`,
`ClinicOS_Defense_Presentation2.pptx`) — there is no Lorem Ipsum anywhere.

---

## Run it

```bash
npm install
```

```bash
npm run dev
```

Opens on <http://localhost:5180>.

```bash
npm run build
```

Output lands in `dist/` — a plain static build. Deploy it to any static
host (Netlify, Cloudflare Pages, GitHub Pages, your own server, ...) by
pointing it at that folder.

---

## Configuration

Everything you need to configure lives in **one file**: `src/config/site.js`.

| What | Field | Current state |
| --- | --- | --- |
| Calendly booking link | `calendlyUrl` | ✅ Connected — `accuratescaling/free-consultation` → <https://calendly.com/accuratescaling/free-consultation> |
| Contact email | `email` | `accuratescaling@gmail.com` |

### Calendly

```js
calendlyUrl: 'accuratescaling/free-consultation',
calendlyMode: 'modal',   // 'modal' opens an overlay · 'redirect' opens a new tab
```

**All 11 "Book a Call" buttons route through one handler**, so they all follow
this single value — there is no per-button wiring:

| Location | Button |
| --- | --- |
| Navbar (desktop) | Book a Call |
| Navbar (mobile sheet) | Book a Discovery Call |
| Hero | Book a Discovery Call |
| ClinicOS product card | Book a Call |
| ClinicOS masthead | Book a Free Call |
| Pricing × 4 | Book a Call ×3 · Request a quote |
| Final CTA | Book a Discovery Call |
| Footer | Book a Call |

`calendlyUrl` accepts any of these and normalises them to a full URL:

```
accuratescaling
accuratescaling/discovery-call
calendly.com/accuratescaling/discovery-call
https://calendly.com/accuratescaling/discovery-call
```

**Currently pointed at the profile page**, so visitors see your list of event
types and pick one. To drop them straight onto a single bookable calendar, use
the event link instead — e.g. `accuratescaling/discovery-call`.

The modal embeds Calendly in an `<iframe>` (Calendly serves
`x-frame-options: ALLOWALL`, so this is supported). No third-party script is
loaded. Theme params match the site's dark teal skin, and `locale` follows the
active language — Arabic visitors get an Arabic booking page. The query string
is built with `URLSearchParams`, so a link that already carries params keeps
them.

If the embed is ever blocked (a strict corporate network, say), flip
`calendlyMode` to `'redirect'` and every button opens Calendly in a new tab
instead — no other change needed.

### Pricing, packages and the feature strip

All of it lives as plain arrays in `src/i18n/en.js` and `src/i18n/ar.js` —
`pricing.tiers` (the 4 pricing cards) and `marquee.items` (the scrolling
feature strip under the hero). Both files must stay the same shape — add a
tier or feature to one, add the matching entry to the other. There is no
external service involved; edit the arrays directly and rebuild.

---

## Structure

```
src/
├─ config/site.js          ← ALL config: Calendly, socials
├─ i18n/                   ← ALL copy, in both languages (see below)
├─ lib/
│  ├─ motion.js            ← shared Framer Motion variants (one easing curve)
│  └─ storage.js           ← localStorage that can never throw (see note below)
│
├─ pages/
│  ├─ HomePage.jsx         ← route "/"          — the agency
│  └─ ClinicOSPage.jsx     ← route "/clinicos"  — the product
│
├─ components/
│  ├─ layout/RootLayout.jsx ← shared shell: navbar, footer, page transition,
│  │                          scroll/hash handling, error boundary
│  ├─ ErrorBoundary.jsx    ← keeps a thrown render from blanking the whole site
│  ├─ CalendlyProvider.jsx ← context + booking modal. useCalendly() anywhere
│  ├─ BookCallButton.jsx   ← the single conversion action, drop in anywhere
│  ├─ Navbar.jsx           ← scroll-blur bar + mobile sheet
│  ├─ Hero.jsx             ← positioning statement, CTAs
│  ├─ FeatureMarquee.jsx   ← infinite marquee of what the SYSTEM does
│  ├─ WhatWeDo.jsx         ← the agency's own offering  (#services)
│  ├─ About.jsx            ← mission + markets           (#about)
│  ├─ ProductBridge.jsx    ← the one card that routes to /clinicos (#products)
│  ├─ AgencyCTA.jsx        ← closing conversion band     (#contact)
│  ├─ LanguageToggle.jsx   ← the EN / ع switch
│  ├─ Footer.jsx           ← nav, products, socials
│  │
│  ├─ clinicos/            ← product-page blocks: Pillars, DoctorChat,
│  │                         Automations, Dashboards, BeforeAfter,
│  │                         HowItWorks, Pricing
│  │
│  └─ ui/                  ← Aurora, GlowCard, Reveal, SectionHeading,
│                            Button, Logo, DashboardMock, SectionLink
└─ index.css               ← design tokens (@theme), keyframes, custom utilities
```

### Routing, scrolling and the "blank page" rules

Three things here are load-bearing. Changing them casually reintroduces bugs
that were specifically fixed:

1. **Internal links go through the router.** Section links use
   `ui/SectionLink.jsx`, which renders a real `<Link>` with a fully-qualified
   target (`/#about`, `/clinicos#packages`). A bare `<a href="#about">` is
   handled by the browser alone — it fires `hashchange` but not `popstate`, so
   React Router never learns about it, the shell's scroll handling never runs,
   and the router's location drifts out of sync with the address bar.
   External links, `mailto:` and Calendly stay plain `<a>`.

2. **Scrolling lives inside the routed `<main>`.** `RouteScroll` in
   `RootLayout.jsx` is rendered *within* the keyed `motion.main`, so its layout
   effect runs in the same commit that mounts the destination page — the target
   section is guaranteed to exist and no polling is needed. It is a
   `useLayoutEffect` on purpose: a passive effect runs after paint, which shows
   the new page for one frame at the previous page's scroll offset.
   The fixed-navbar offset comes from `scroll-padding-top: 5.5rem` on `html`,
   not from per-section margins.

3. **Nothing may blank the page.** `ErrorBoundary` wraps the routed content
   (keyed by pathname, so navigating away clears it) — without it a single
   render error unmounts the entire React root and leaves a white document.
   `lib/storage.js` exists for the same reason: `localStorage` *throws on
   access* in private/lockdown modes and some in-app webviews, and that throw
   used to happen inside a mount effect.

## Bilingual — Arabic / English

The whole site switches language in place. Nothing reloads and nothing unmounts:
the dictionary swaps under a 190ms fade-out / 260ms fade-in, so scroll position
is kept and already-revealed sections do not re-animate.

```
src/i18n/
├─ en.js                ← English dictionary — EVERY visible string
├─ ar.js                ← Arabic mirror, identical shape
├─ context.js           ← LanguageContext + useLang() / useT() + detectLang()
├─ LanguageProvider.jsx ← holds the language, syncs <html lang/dir>, persists it
└─ LanguageFade.jsx     ← the crossfade wrapper (opacity + blur only)
```

### Editing copy

`en.js` and `ar.js` **must keep the same keys and the same array lengths** —
components read the same paths in both. Add a key to one, add it to the other.

In a component:

```jsx
import { useLang } from '../i18n/context'

const { t, lang, dir } = useLang()
return <h1>{t.hero.headline[0]}</h1>
```

Titles that need a teal-gradient fragment are stored as `{ pre, accent, post }`
and rendered by the `<Title>` helper in `ui/SectionHeading.jsx`, so the
highlight survives translation.

### How the language is chosen

1. Saved choice in `localStorage` (`as-lang`)
2. Otherwise the browser language — anything starting `ar` gets Arabic
3. Otherwise English

### RTL

`LanguageProvider` sets `<html dir>`, and layout uses logical properties
(`ps-/pe-`, `ms-/me-`, `start-/end-`, `border-s`, `text-start`) so it mirrors
automatically. Directional details use Tailwind's `rtl:` variant — arrows get
`rtl:rotate-180`, the marquee reverses, and headings drop negative letter-spacing
via `rtl:tracking-normal` (Arabic must never be letter-spaced).

**Arabic typography:** Space Grotesk and Inter carry no Arabic glyphs, so
`html[lang="ar"]` redefines the `--font-display` and `--font-sans` *variables*
to IBM Plex Sans Arabic. Every `font-display` / `font-sans` utility then switches
automatically — no specificity fight with Tailwind's utility layer. `--font-mono`
is left alone so Latin fragments (ClinicOS, JD, URLs) keep a Latin face.

## Design system

Tokens live in `src/index.css` under `@theme` — no `tailwind.config.js` needed
(Tailwind v4).

| Token | Value | Use |
| --- | --- | --- |
| `ink` / `ink-2` / `ink-3` | `#040a09` → `#0b1c18` | page & surface grounds |
| `brand-300` / `400` / `500` | `#5eead4` / `#2dd4bf` / `#14b8a6` | accents, glows, CTAs |
| `paper` / `muted` / `faint` | `#e9f6f2` / `#8ba8a2` / `#5c7a74` | text hierarchy |

Fonts: **Space Grotesk** (display), **Inter** (body), **IBM Plex Sans Arabic**
(all Arabic copy, via the `font-arabic` utility with `dir="rtl"`).

Custom utilities: `text-gradient`, `text-gradient-teal`, `grid-lines`, `noise`,
`glass`, `container-x`, `section`, `font-arabic`.

Every scroll animation runs on one easing curve (`lib/motion.js`) and fires
once. `prefers-reduced-motion` is respected globally in `index.css`.

---

## Adding Product 02 later

The site is built to scale exactly the way the go-to-market plan describes —
add a product, don't rebuild:

1. Add the product's content to `src/i18n/en.js` and `ar.js`.
2. Add a page under `src/pages/` and a route in `src/App.jsx`.
3. Copy the ClinicOS card block in `ProductBridge.jsx` for the new product.

No new domain, no new brand, no structural change to the company page.

---

## Deploying

`npm run build` emits a plain static `dist/`. Because the site uses real URLs
(`/clinicos`) rather than hash routes, **the host must serve `index.html` for
unknown paths**, or a hard refresh on `/clinicos` returns 404 — which the
visitor sees as a blank page.

| Host | What you need |
| --- | --- |
| Netlify, Cloudflare Pages | `public/_redirects` — already in the repo ✅ |
| Vercel | `vercel.json` with a rewrite of `/(.*)` → `/index.html` |
| GitHub Pages | no server rewrites: copy `dist/index.html` to `dist/404.html` |
| Nginx | `try_files $uri $uri/ /index.html;` |
| Apache | `.htaccess` with `FallbackResource /index.html` |
| IIS | URL Rewrite rule to `index.html` |

`vite preview` does this automatically, so a deep link that works locally can
still 404 on a host that is not configured — test the real host after deploying.
