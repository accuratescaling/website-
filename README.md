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
├─ config/site.js          ← ALL config: Calendly, socials, nav
├─ i18n/                   ← ALL copy, in both languages (see below)
├─ lib/motion.js           ← shared Framer Motion variants (one easing curve)
│
├─ components/
│  ├─ CalendlyProvider.jsx ← context + booking modal. useCalendly() anywhere
│  ├─ BookCallButton.jsx   ← the single conversion action, drop in anywhere
│  ├─ Navbar.jsx           ← scroll-blur bar + mobile sheet
│  ├─ Hero.jsx             ← positioning statement, CTAs, stat strip, ECG line
│  ├─ FeatureMarquee.jsx   ← infinite marquee of what the SYSTEM does
│  ├─ About.jsx            ← mission + animated Branded House tree + markets
│  ├─ ProductsHub.jsx      ← ★ ClinicOS card + blurred "Stay Tuned…" teaser
│  ├─ LanguageToggle.jsx   ← the EN / ع switch
│  ├─ FinalCTA.jsx         ← conversion band
│  ├─ Footer.jsx           ← nav, products, socials (Facebook + Instagram)
│  │
│  ├─ clinicos/
│  │  ├─ ClinicOSSection.jsx  ← wrapper: Arabic hook + all sub-blocks
│  │  ├─ Pillars.jsx          ← the Four Pillars (who uses it / what it replaces)
│  │  ├─ DoctorChat.jsx       ← AI chat detail + Arabic voice-note thread mock
│  │  ├─ Automations.jsx      ← reminders + AI reports, with the real reminder text
│  │  ├─ Dashboards.jsx       ← receptionist vs manager
│  │  ├─ BeforeAfter.jsx      ← the 6-row before/after comparison
│  │  ├─ HowItWorks.jsx       ← book a call → one week → running
│  │  └─ Pricing.jsx          ← the four JD packages
│  │
│  └─ ui/                  ← Aurora, GlowCard, Reveal, SectionHeading,
│                            Button, Logo, DashboardMock, TeaserArt
└─ index.css               ← design tokens (@theme), keyframes, custom utilities
```

### The "Stay Tuned…" teaser card

`ProductsHub.jsx` renders artwork, then covers it with a `backdrop-blur-[26px]`
glass veil that eases to `18px` on hover. The hint chips (Restaurant / Gym /
Pharmacy) are additionally CSS-blurred so they read as shapes only.

To use a real photo instead of the generated artwork, drop it in
`public/products/teaser.jpg` and set:

```js
teaserImage: '/products/teaser.jpg',
```

---

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

The homepage is built to scale exactly the way the go-to-market plan describes —
add a product, don't rebuild:

1. Add the product's content to `src/i18n/en.js` and `ar.js`.
2. Replace the teaser card in `ProductsHub.jsx` with a real product card
   (copy the ClinicOS card block).
3. Add a fresh teaser card for Product 03.

No new domain, no new brand, no structural change to the homepage.

### Splitting ClinicOS onto its own route

The plan calls for `accuratescaling.com/clinicos` as a separate sales page. This
build ships as one page with the ClinicOS content already isolated in
`components/clinicos/`, so the split is mechanical when you want it:

```bash
npm install react-router-dom
```

Then render `<ClinicOSSection />` + `<Pricing />` under a `/clinicos` route and
leave the hub card linking to it instead of the `#clinicos` anchor.
