/* ============================================================================
 *  ENGLISH DICTIONARY
 *
 *  Every visible string on the site lives here (and its mirror in ar.js).
 *  Both files MUST keep the same shape — components read the same paths and
 *  only the active dictionary changes.
 *
 *  Copy is drawn from the supplied source documents:
 *    · AccurateScaling_GoToMarket_Plan.docx   (company, pillars, philosophy)
 *    · AccurateScaling_Pricing.pdf            (packages, JD pricing)
 *    · ClinicOS_Defense_Presentation2.pptx    (product capabilities)
 * ==========================================================================*/

export default {
  meta: { code: 'en', dir: 'ltr', label: 'English', short: 'EN' },

  /* ------------------------------------------------------------------ CHROME */
  brand: { name: 'Accurate Scaling', tagline: 'Intelligent Systems' },

  /* Company-level navigation only. ClinicOS and its pricing are product-level
   * and are reached through the Products section, not the company nav. */
  nav: [
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Products', href: '#products' },
    { label: 'Contact', href: '#contact' },
  ],

  /* Product-page navigation. Rendered only on /clinicos — the company's
   * section anchors do not exist there. */
  productNav: [
    { label: 'Features', href: '#features' },
    { label: 'Packages', href: '#packages' },
  ],

  ui: {
    bookCall: 'Book a Free Call',
    bookCallShort: 'Book a Call',
    bookFreeCall: 'Book a Free Call',
    requestQuote: 'Request a quote',
    exploreProducts: 'Explore our products',
    exploreClinicOS: 'Explore ClinicOS',
    seePackages: 'See the packages',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    close: 'Close',
    backToTop: 'Back to top',
    switchLanguage: 'Switch language',
    whatWeDo: 'What we do',
  },

  /* -------------------------------------------------------------------- HERO */
  hero: {
    eyebrow: 'AI & Workflow Automation Agency',
    headline: ['We build intelligent', 'automation systems', 'for businesses.'],
    lede: 'Accurate Scaling is an AI and workflow automation agency. We build intelligent systems that take over the repetitive, manual parts of running a business , so our clients spend less time on busywork and more time on the work that actually matters. Every system we build runs on its own, and we design, build, deploy and maintain it end to end.',
  },

  /* ------------------------------------------------------------- WHAT WE DO */
  /* The AGENCY's own offering. Describes Accurate Scaling as a company —
   * deliberately industry-neutral, because these services are what every
   * future product is assembled from, not just ClinicOS. */
  services: {
    eyebrow: 'What we do',
    title: {
      pre: 'We do not sell software. We ',
      accent: 'build the system a business runs on',
      post: '.',
    },
    lede: 'Every engagement starts the same way , we map how the business actually works today, then design and build the system that replaces the manual parts of it. We deploy it, and we keep it running.',
    items: [
      {
        id: 'assistants',
        title: 'Arabic-first AI assistants',
        body: 'Conversational agents your team talks to the way they already talk , typed or by voice, in Arabic or English. Natural language in, structured records out.',
      },
      {
        id: 'automation',
        title: 'Automation that runs itself',
        body: 'Reminders, follow-ups and scheduled reports that go out on time whether anyone remembers or not. Every send logged, nothing sent twice.',
      },
      {
        id: 'dashboards',
        title: 'Dashboards for every role',
        body: 'One panel for the people doing the work, another for the people running the business. Live data, no refreshing, no exporting to a spreadsheet.',
      },
      {
        id: 'foundation',
        title: 'One connected foundation',
        body: 'Every part of the business writes to a single source of truth, multi-tenant from day one. Adding a client is configuration, never new code.',
      },
    ],
    note: 'We design it, build it, deploy it in about a week, and keep it running , we will be there for you 24/7.',
  },

  /* ---------------------------------------------------------------- MARQUEE */
  /* What the system does — not what we built it with. */
  marquee: {
    ariaLabel: 'System features',
    items: [
      "AI Chatbots",
      "Voice Assistants",
      "Automated Reminders",
      "Smart Scheduling",
      "Live Dashboards",
      "Weekly AI Reports",
      "Workflow Automation",
      "Data Sync & Records",
      "Payment Tracking",
      "Multi-Branch Support"
    ],
  },

  /* ------------------------------------------------------------------- ABOUT */
  about: {
    eyebrow: 'About the company',
    title: { pre: 'We look for the industries the software industry ', accent: 'forgot', post: '.' },
    lede: 'Accurate Scaling is a technology agency that builds intelligent operating systems for Arab businesses. We identify industries still running on paper and manual processes, and replace everything with one AI-powered system that works automatically.',

    vision: {
      label: 'The Vision',
      title: 'A Branded House, not a portfolio of side projects',
      body: 'Accurate Scaling is built as a Branded House. One parent brand, multiple products underneath it, each targeting a different industry. Every client we win in any niche builds the Accurate Scaling reputation , and that reputation transfers when we launch the next product.',
      bullets: [
        'One brand',
        'Multiple products',
        'One reputation that compounds over time',
        'No rebuild needed when we expand',
        'Just add a product',
      ],
    },

    parentBrand: 'Parent brand',
    /* Only real products are listed. The 'Product 2 / 3' placeholders were
     * removed — the page bridges to ClinicOS and nothing else. */
    tree: [
      { name: 'ClinicOS', status: 'NOW', detail: 'Clinic Management System', live: true },
    ],
    treeNote:
      'Adding a product means adding one page and one card. No rebuild. No new domain. No new brand to establish.',
  },

  /* ---------------------------------------------------------------- PRODUCTS */
  products: {
    eyebrow: 'Our products',
    title: { pre: 'One brand. ', accent: 'Multiple operating systems.', post: '' },
    lede: 'Each product owns an industry. Same architecture underneath, completely different world on top.',

    /* chrome for the full-screen product view */
    detailAria: 'Product details',
    backToCompany: 'Back to Accurate Scaling',

    clinicos: {
      subtitle: 'Clinic Management System',
      badge: 'LIVE NOW',
      what: 'ClinicOS is a complete operating system for clinics. It replaces paper appointment books, manual phone calls, forgotten reminders, and disconnected spreadsheets with one integrated system. Every part of the clinic connects to a single database and runs automatically.',
      pillarNames: ['Doctor Bot', 'Dashboard', 'Reminders', 'Reports'],
      openAria: 'Open ClinicOS product details',
      detailsHint: 'Features · Pricing',
    },

    /* strings inside the dashboard visual */
    mock: {
      window: 'clinicos · reception',
      live: 'LIVE',
      queue: 'Live queue',
      revenue: 'Revenue · 7d',
      patients: ['Ahmad H.', 'Layan S.', 'Omar K.', 'Nour A.'],
      reportLine: 'تقرير الأسبوع جاهز — الإيرادات ارتفعت ١٢٪',
    },

  },

  /* ---------------------------------------------------------------- CLINICOS */
  clinicos: {
    eyebrow: 'Product 01 · Live now',
    tagline: 'An AI-Powered Multi-Clinic Management System',
    /* Stated on the product view so the product is never mistaken for the company. */
    byline: 'A product by Accurate Scaling',
    /* Clinic-specific pull-quote — belongs with the product, not the company. */
    quote: "This wasn't one clinic's problem. It was how most clinics still run.",
    quoteFooter: 'Why we built ClinicOS',
    hookAr: 'العيادات في العالم العربي لسا بتشتغل بالورق والتليفون',
    hookGloss: 'Clinics in the Arab world still run on paper and the phone.',
    what: 'ClinicOS is a complete operating system for clinics. It replaces paper appointment books, manual phone calls, forgotten reminders, and disconnected spreadsheets with one integrated system. Every part of the clinic connects to a single database and runs automatically.',

    blocks: {
      pillars: {
        label: 'The Four Pillars',
        title: {
          pre: 'One system that runs the whole clinic — ',
          accent: 'doctor, reception and management',
          post: '',
        },
      },
      chat: { label: 'Inside Pillar 01' },
      automations: {
        label: 'Pillars 03 & 04',
        title: { pre: 'Automation that runs ', accent: 'while the clinic sleeps', post: '' },
      },
      dashboards: {
        label: 'Pillar 02 · The Dashboards',
        title: 'Where reception and management actually work',
      },
      beforeAfter: { label: 'The difference', title: 'What actually changes on day one' },
      howItWorks: { label: 'Getting started', title: 'Three steps, one week' },
    },

    multiTenantNote:
      'Built multi-tenant from day one: one system serves many clinics and many institutions. Adding a new client is configuration — not new code.',

    /* The Four Pillars — Go-To-Market Plan §02 */
    pillarLabels: { who: 'Who uses it', replaces: 'What it replaces' },
    pillars: [
      {
        icon: 'bot',
        name: 'Doctor Bot',
        what: 'AI Telegram bot — Arabic, English and Voice',
        who: 'The Doctor',
        replaces: 'Manual messaging apps, sticky notes, verbal instructions',
      },
      {
        icon: 'monitor',
        name: 'Dashboard',
        what: 'Web panel for scheduling, queue and billing',
        who: 'The Receptionist',
        replaces: 'Paper books, Excel sheets, phone chaos',
      },
      {
        icon: 'bell',
        name: 'Reminders',
        what: 'Automated patient reminder messages',
        who: 'Runs itself',
        replaces: 'Manual reminder calls from the receptionist',
      },
      {
        icon: 'chart',
        name: 'Reports',
        what: 'Automated weekly and monthly clinic reports',
        who: 'Clinic Owner',
        replaces: 'No visibility, scattered spreadsheets',
      },
    ],

    /* AI Doctor Chat — Defense presentation, slide 5 */
    doctorChat: {
      label: 'Pillar 01 · The AI Doctor Chat',
      headline: 'The doctor speaks. The system does the rest.',
      points: [
        {
          title: 'Natural language, in Arabic',
          body: 'No commands, no menus. The doctor writes the way he speaks.',
        },
        {
          title: 'Voice messages',
          body: "Send a voice note — it's transcribed automatically, then understood.",
        },
        {
          title: 'Smart Arabic name matching',
          body: 'Handles spelling variations and missing diacritics. Asks which patient when two names are too close.',
        },
        {
          title: 'Confirms before it writes',
          body: 'Nothing is saved to the database until the doctor approves it.',
        },
      ],
      mock: {
        botName: 'ClinicOS Bot',
        status: 'online · Telegram',
        footer: 'Nothing is written to the database until the doctor approves it.',
      },
    },

    /* Automation layer — Defense presentation, slide 6 */
    automations: [
      {
        key: 'reminders',
        title: 'Reminder System',
        lines: [
          'Two reminder windows — 24 hours and 2 hours before the appointment',
          'Every send is logged, so no patient is ever reminded twice',
          'Supports both phone and email delivery',
          'Runs on email today — SMS and chat delivery are built and waiting on provider approval',
        ],
      },
      {
        key: 'reports',
        title: 'AI Report System',
        lines: [
          'One SQL function aggregates patients, appointments and revenue',
          'AI turns those numbers into a written Arabic report',
          "Delivered to the manager's dashboard and inbox at the same time",
          'Runs weekly on a schedule, or instantly on demand',
        ],
      },
    ],
    reminderPreview: {
      label: '24 hours before · delivered',
      message: 'تذكير: موعدك غداً الساعة 10 صباحاً في عيادة الدكتور [name]',
      meta: 'logged · never sent twice',
    },
    reportPipeline: {
      label: 'How a report is made',
      steps: ['Live clinic data', 'Aggregation', 'AI writing', 'Arabic narrative', 'Dashboard + Inbox'],
    },

    /* Dashboards — Defense presentation, slide 7 */
    dashboards: [
      {
        role: 'Receptionist',
        items: [
          'Live queue — updates in real time, no refresh',
          'Pending appointments — times the doctor left open',
          'Full patient profile: history, payments, appointments',
        ],
      },
      {
        role: 'Manager',
        items: [
          'Revenue and appointment analytics across clinics',
          'Switch between every clinic in the institution',
          'Generate an AI report on demand, read it in place',
        ],
      },
    ],

    /* Before / After — Go-To-Market Plan §02 */
    beforeAfter: {
      beforeLabel: 'Before ClinicOS',
      afterLabel: 'After ClinicOS',
      rows: [
        {
          before: 'Appointments in a paper book or Excel',
          after: 'Live digital scheduler with all doctors and slots',
        },
        {
          before: 'Doctor manually tells receptionist about patients',
          after: 'Doctor speaks to the bot in Arabic — system updates automatically',
        },
        {
          before: 'Patients forget appointments — no reminders',
          after: 'Automatic reminder sent to every patient before their visit',
        },
        {
          before: 'No clear picture of monthly revenue',
          after: 'Automated weekly and monthly financial report delivered automatically',
        },
        {
          before: 'Receptionist drowns in repetitive tasks',
          after: 'System handles repetitive tasks — receptionist focuses on patients',
        },
        {
          before: 'Patient history scattered across notebooks',
          after: 'Full patient profile: records, payments, diagnosis, notes, history',
        },
      ],
      note: 'Both dashboards and the AI chat share one database. What the doctor says on Telegram appears on the receptionist’s screen instantly.',
    },

    howItWorks: [
      {
        step: '01',
        title: 'Book a call',
        body: 'A short discovery call. We look at how your clinic runs today and what is costing you the most time.',
      },
      {
        step: '02',
        title: 'We set it up in one week',
        body: 'We deploy the system, connect the doctor bot, load your doctors and slots, and switch the reminders on.',
      },
      {
        step: '03',
        title: 'Your clinic runs on the system',
        body: 'Reception works from the live queue. Reminders go out on their own. Your report arrives every week.',
      },
    ],
  },

  /* ----------------------------------------------------------------- PRICING */
  /* Source: AccurateScaling_Pricing.pdf — June 2026. Jordanian Dinar. */
  pricing: {
    eyebrow: 'ClinicOS packages',
    title: { pre: 'Pick the pack that fits ', accent: 'the clinic you actually run', post: '' },
    note: 'Three ways to run ClinicOS. Which one fits depends on how many doctors you have and how your reception works — so we scope it with you on a short call, then send a written quote.',

    /* ------------------------------------------------------------------
     * PRICE VISIBILITY — master switch.
     *
     *   false → every card hides its figures and shows `tier.quote` instead
     *           ("we scope it on the call"). This is the current, deliberate
     *           choice: nothing is priced on the page, everything is
     *           discussed on the discovery call.
     *   true  → the upfront/monthly figures below render as they used to.
     *
     * The numbers are intentionally KEPT in the data while hidden, so
     * switching pricing back on is this one flag and nothing else. Note that
     * any figure written into an `includes` line or a `footnote` is plain
     * rendered text and is NOT covered by this switch — those were rewritten
     * to stay price-free.
     * ------------------------------------------------------------------ */
    showPrices: false,

    labels: {
      upfront: 'Upfront · one-time',
      monthly: 'Monthly retainer',
      perMonth: '/ month',
      popular: 'MOST POPULAR',
      /* sits where the "Upfront · one-time" label sits, when prices are hidden */
      scoped: 'What it costs',
    },
    tiers: [
      {
        name: 'Doctor Pack',
        who: 'Solo doctor — AI bot only',
        /* hidden while pricing.showPrices is false — see the note above */
        upfront: '500 JD',
        monthly: '65 JD',
        featured: false,
        quote: 'Priced on the call — we scope the bot around how you actually work, then send you the quote.',
        includes: [
          'Telegram Bot (Arabic, English + Voice)',
          'Patient Records via Bot',
          'Appointments via Bot',
          'Payments via Bot',
          'Setup & Implementation included',
        ],
      },
      {
        name: 'Clinic Pack',
        who: '1 doctor + 1 reception',
        upfront: '1,500 JD',
        monthly: '150 JD',
        featured: true,
        quote: 'Priced on the call — we look at your reception setup together and quote the full clinic system.',
        includes: [
          'Reception Dashboard (1 user)',
          'Reminder System (automated patient messages)',
          'Manager Dashboard + Reports',
          'Setup & Implementation included',
        ],
        footnote: 'Add the Doctor Pack for the complete system — we fold it into a single quote.',
      },
      {
        name: 'Multi-Doctor / Institution',
        who: 'Each doctor gets their own bot. All share one dashboard, reminder system and database.',
        /* no figures at all — this one is genuinely scoped per clinic */
        custom: true,
        quote: "Pricing depends on your number of doctors and clinics — book a call and we'll build you a custom quote within 24 hours.",
        includes: [
          'A dedicated bot for every doctor',
          'Shared reception dashboard',
          'Shared reminder system',
          'One database across all doctors',
          'Manager dashboard + reports (optional)',
        ],
        footnote: 'The quote scales with the number of doctors and branches.',
      },
    ],

    /* Deliberately OUTSIDE `tiers` — rendered as its own full-width band
     * below the three cards, not as a fourth column in the grid. */
    enterprise: {
      badge: 'For institutions',
      name: 'Enterprise Pack',
      who: 'Multi-clinic · Multi-branch · Hospital groups',
      includes: [
        'Full system + multi-clinic dashboard',
        'Institution dashboard across every branch',
        'Custom reports',
        'Dedicated onboarding',
        'Scoped after a full discovery call',
      ],
      footnote: 'Discovery call → full scope assessment → written proposal within 48 hours.',
    },
  },

  /* ------------------------------------------------------------- AGENCY CTA */
  /* The COMPANY page's closing band. No booking — that is product-only. */
  agencyCta: {
    eyebrow: 'Start with a conversation',
    title: {
      pre: 'Tell us how your business runs today, and we will show you ',
      accent: 'what it looks like on a system',
      post: '.',
    },
    lede: 'ClinicOS is the first system we built this way. If you run something that still lives on paper, phone calls and spreadsheets, the next one could be yours.',
  },

  /* ------------------------------------------------------------------ FOOTER */
  footer: {
    blurb:
      'We build intelligent automation systems for businesses , one AI-powered system that replaces the paper, the phone calls and the spreadsheets.',
    navigate: 'Navigate',
    products: 'Products',
    getInTouch: 'Get in touch',
    live: 'LIVE',
    soon: 'SOON',
    product2: 'Product 02',
    product3: 'Product 03',
    rights: 'All rights reserved.',
  },

  /* ---------------------------------------------------------------- CALENDLY */
  calendly: {
    title: 'Book a Free Call',
    subtitle: 'Free 15-minute consultation',
    trouble: 'Trouble loading? Open in a new tab',
  },
}
