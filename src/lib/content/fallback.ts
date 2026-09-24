import { SERVICE_AREA_LINE, SITE_NAME } from "@/lib/site-config";
import type { SiteContent } from "./types";

const img = (src: string, alt: string, width = 1600, height = 1200) => ({
  src,
  alt,
  width,
  height,
});

export const fallbackContent: SiteContent = {
  settings: {
    businessName: SITE_NAME,
    tagline: "Residential and commercial cleaning for the 757",
    phone: "[PHONE NUMBER]",
    textNumber: "[TEXT NUMBER]",
    email: "[EMAIL ADDRESS]",
    address: "[BUSINESS ADDRESS OR SERVICE-AREA BUSINESS]",
    hoursSummary: "[BUSINESS HOURS]",
    hours: [{ days: "Hours", hours: "[BUSINESS HOURS]" }],
    serviceAreaLine: SERVICE_AREA_LINE,
    social: {
      googleBusiness: "[GOOGLE BUSINESS PROFILE URL]",
      facebook: "[FACEBOOK URL]",
      instagram: "[INSTAGRAM URL]",
      booking: "[BOOKING URL]",
    },
    announcement: {
      enabled: false,
      text: "Now accepting quote requests for residential and commercial cleaning.",
      href: "/contact",
    },
    footerNote:
      "Shoreline Cleaning LLC provides residential and commercial cleaning in the 757 and surrounding Hampton Roads communities. Quotes are provided after a short intake — by phone, text, or email.",
    cookieBannerEnabled: false,
    googleReviewUrl: "[GOOGLE BUSINESS PROFILE URL]",
    googleReviewButtonLabel: "Read or Leave a Review on Google",
    seo: {
      title: "Shoreline Cleaning LLC | Residential & Commercial Cleaning in the 757",
      description:
        "Shoreline Cleaning LLC is a locally focused cleaning company serving the 757 and surrounding Hampton Roads communities. Request a free quote — we'll follow up by call, text, or email.",
      ogImage: img("/og.jpg", "Shoreline Cleaning LLC", 1200, 630),
    },
  },
  home: {
    seo: {
      title: "Shoreline Cleaning LLC | Fresh, Careful Cleaning in the 757",
      description:
        "Request a free cleaning quote from Shoreline Cleaning LLC. Residential and commercial service for the 757 and surrounding Hampton Roads communities. We'll follow up by call, text, or email.",
    },
    heroEyebrow: "757 · Hampton Roads",
    heroHeadline: "Fresh, careful cleaning for homes and businesses",
    heroSubheadline:
      "Shoreline Cleaning LLC is a locally focused residential and commercial cleaning company serving the 757 and surrounding Hampton Roads communities. Tell us about your space — we'll follow up with a quote by call, text, or email.",
    heroPrimaryCta: "Request a Free Quote",
    heroSecondaryCta: "Call or Text Us",
    heroImage: img(
      "/images/hero-kitchen.jpg",
      "Bright, professionally cleaned kitchen with white cabinets, a navy island, and morning light",
      1792,
      1008,
    ),
    highlights: [
      {
        title: "Locally focused",
        description: "Built for neighbors and businesses across the 757 and nearby Hampton Roads communities.",
      },
      {
        title: "Flexible scheduling",
        description: "One-time, move-out, or recurring visits — we'll work with the timing that fits your space.",
      },
      {
        title: "Residential & commercial",
        description: "Homes, apartments, offices, rentals, and post-construction spaces.",
      },
      {
        title: "Satisfaction-focused service",
        description: "Clear communication, careful work, and a walkthrough of what you need before we quote.",
      },
    ],
    introHeading: "Cleaning that feels organized, not rushed",
    introBody:
      "Shoreline Cleaning LLC is a locally owned cleaning company serving the 757 and surrounding Hampton Roads communities. We keep the process simple: you fill out a short intake, we follow up to discuss the details, and you receive a quote by phone, text, or email before any work is scheduled. No published price list — every space is different, and we'd rather quote yours accurately.",
    featuredServiceSlugs: [
      "standard-residential-cleaning",
      "deep-cleaning",
      "recurring-cleaning",
      "commercial-office-cleaning",
    ],
    howItWorksHeading: "How a quote works",
    howItWorksIntro:
      "There are no prices on this site. After you send a short intake, the owner follows up to talk through the work and send a quote.",
    howItWorksSteps: [
      {
        title: "Request a quote",
        description:
          "Fill out the intake form with your space, the service you need, and how you'd like us to reach you.",
      },
      {
        title: "Talk with us",
        description:
          "We'll call, text, or email to discuss the details and give you a quote. No surprise numbers on the website.",
      },
      {
        title: "Enjoy a cleaner space",
        description:
          "If the quote is a fit, we schedule the visit and show up prepared — then leave your space fresh and organized.",
      },
    ],
    beforeAfterHeading: "See the difference",
    beforeAfterIntro:
      "A careful clean should be easy to see. These sample photos show the kind of reset we aim for — replace them in Sanity with your own work.",
    featuredBeforeAfterId: "kitchen-reset",
    reviewsHeading: "What customers say",
    serviceAreaHeading: "Where we work",
    serviceAreaBody:
      "Serving the 757 and surrounding Hampton Roads communities. City-by-city coverage will be listed here as it's confirmed. If you're nearby and not sure we reach you, request a quote anyway — we'll let you know.",
    faqHeading: "Quick answers",
    closingHeading: "Ready for a cleaner space?",
    closingBody:
      "Send a short intake and we'll follow up with a quote by phone, text, or email. No prices listed online — every home and business is quoted individually.",
  },
  about: {
    seo: {
      title: "About Shoreline Cleaning LLC | Local Cleaning in the 757",
      description:
        "Learn about Shoreline Cleaning LLC, a locally focused residential and commercial cleaning company serving the 757 and surrounding Hampton Roads communities.",
    },
    heading: "A local cleaning company with a simple promise",
    storyHeading: "Our story",
    story: [
      "Shoreline Cleaning LLC is a locally focused residential and commercial cleaning company serving the 757 and surrounding Hampton Roads communities. The name matches the region we live in — coastal Virginia, everyday homes, offices, and rentals that deserve careful work.",
      "We're building this company around clear communication and a straightforward quote process. You tell us about the space. We follow up by call, text, or email. You get a quote before anything is scheduled.",
      "This page is editable in Sanity. Replace this story with the owner's real background, values, and photos when you're ready.",
    ],
    whyHeading: "Why choose Shoreline Cleaning LLC",
    whyItems: [
      {
        title: "Quoted after intake, not guessed online",
        description:
          "Every home and business is different. We quote after we understand the space, the service, and the timing.",
      },
      {
        title: "Residential and commercial",
        description:
          "One company for houses, apartments, offices, short-term rentals, move-outs, and post-construction resets.",
      },
      {
        title: "Locally focused",
        description:
          "We serve the 757 and surrounding Hampton Roads communities — not a national franchise template.",
      },
    ],
    valuesHeading: "How we work",
    values: [
      {
        title: "Careful",
        description: "We treat kitchens, desks, and bathrooms as if the next person walking in is you.",
      },
      {
        title: "Clear",
        description: "You'll know what is included, what is not, and how we'll follow up on your quote.",
      },
      {
        title: "Respectful",
        description: "On-time communication, attention to the details you flag, and no pressure tactics.",
      },
    ],
    communityHeading: "Part of the 757",
    community:
      "Hampton Roads is home. We serve neighbors and local businesses across the 757 and nearby communities. We don't list specific cities until they're confirmed in our service-area settings — if you're close and unsure, just ask.",
  },
  services: [
    {
      slug: "standard-residential-cleaning",
      name: "Standard Residential Cleaning",
      shortDescription: "A thorough refresh for kitchens, baths, floors, and living spaces.",
      overview:
        "Standard residential cleaning is the everyday reset: kitchens, bathrooms, floors, dusting, and the living areas you use most. It's a good fit when the home is already maintained and you want it consistently fresh.",
      included: [
        "Kitchen surfaces, sinks, and appliance exteriors",
        "Bathroom sinks, toilets, tubs/showers, and mirrors",
        "Dusting of reachable surfaces and fixtures",
        "Floor vacuuming and mopping of finished floors",
        "Tidying of common living areas",
        "Trash removal from interior bins we service",
      ],
      notIncluded: [
        "Inside ovens, refrigerators, or cabinets unless requested as an add-on",
        "Windows (interior/exterior glass packages are quoted separately)",
        "Laundry, dishes, or organization projects unless noted on the quote",
      ],
      idealFor: ["Occupied homes", "Weekly or biweekly upkeep", "A reliable maintenance clean"],
      image: img("/images/living-room.jpg", "Professionally cleaned living room with a white sofa and navy pillows"),
      relatedFaqIds: ["how-quoting-works", "what-to-prepare"],
      featured: true,
      order: 1,
      published: true,
      pricingNote: "Quoted after intake. We'll follow up by phone, text, or email.",
      seo: {
        title: "Standard Residential Cleaning | Shoreline Cleaning LLC",
        description:
          "Standard house cleaning in the 757 from Shoreline Cleaning LLC. Request a free quote after a short intake.",
      },
    },
    {
      slug: "deep-cleaning",
      name: "Deep Cleaning",
      shortDescription: "A detailed clean for build-up, neglected spaces, or a seasonal reset.",
      overview:
        "Deep cleaning goes further than a standard visit. We spend more time on build-up, baseboards, grout-adjacent detail, appliance edges, and the corners that don't get attention every week.",
      included: [
        "Everything in a standard clean, with extra time",
        "Baseboards, door frames, and light-switch plates",
        "Detail work around appliances and fixtures",
        "Interior window sills and reachable tracks",
        "More thorough bathroom and kitchen degreasing",
      ],
      notIncluded: [
        "Hoarding or biohazard situations",
        "Mold remediation",
        "Exterior pressure washing",
      ],
      idealFor: ["Seasonal resets", "First-time cleans", "Homes that haven't been detailed in a while"],
      image: img("/images/bathroom.jpg", "Bright bathroom with glass shower and neatly folded navy towels"),
      featured: true,
      order: 2,
      published: true,
      pricingNote: "Quoted after intake. We'll follow up by phone, text, or email.",
      seo: {
        title: "Deep Cleaning | Shoreline Cleaning LLC",
        description:
          "Deep cleaning for homes in the 757. Shoreline Cleaning LLC quotes after a short intake — no online price list.",
      },
    },
    {
      slug: "move-in-move-out-cleaning",
      name: "Move-In / Move-Out Cleaning",
      shortDescription: "Empty-home cleaning so the next chapter starts fresh.",
      overview:
        "Move-in and move-out cleaning is built for empty or nearly empty homes. We focus on kitchens, baths, floors, interiors of cabinets and appliances when accessible, and the details landlords, buyers, and new occupants notice first.",
      included: [
        "Kitchen cabinets, drawers, and appliance interiors (if empty and accessible)",
        "Bathrooms, including cabinets and fixtures",
        "Floors throughout the home",
        "Interior windows sills and reachable glass",
        "Closets and pantry interiors when empty",
      ],
      notIncluded: [
        "Packing, hauling, or junk removal",
        "Carpet steam cleaning unless quoted separately",
        "Wall painting or repair",
      ],
      idealFor: ["Renters ending a lease", "Sellers before closing", "Buyers walking into an empty home"],
      image: img("/images/move-out.jpg", "Empty, freshly cleaned living room ready for new occupants"),
      featured: false,
      order: 3,
      published: true,
      pricingNote: "Quoted after intake. We'll follow up by phone, text, or email.",
      seo: {
        title: "Move-In and Move-Out Cleaning | Shoreline Cleaning LLC",
        description:
          "Move-in and move-out cleaning in the 757 from Shoreline Cleaning LLC. Request a quote after a short intake.",
      },
    },
    {
      slug: "recurring-cleaning",
      name: "Recurring Cleaning",
      shortDescription: "Weekly, biweekly, or monthly visits that keep the home consistently fresh.",
      overview:
        "Recurring cleaning is a scheduled cadence — weekly, biweekly, monthly, or a custom rhythm. After the first visit, we learn the home and keep a consistent checklist so you're not re-explaining the kitchen every time.",
      included: [
        "A standing checklist tailored after the first visit",
        "Kitchen, bathrooms, floors, and living areas",
        "Flexible rescheduling discussed in advance",
        "Notes for pets, kids, or rooms to skip",
      ],
      idealFor: ["Busy households", "Anyone who wants the home to stay ahead of clutter and dust"],
      image: img("/images/hero-kitchen.jpg", "Airy kitchen kept consistently clean on a recurring schedule", 1792, 1008),
      featured: true,
      order: 4,
      published: true,
      pricingNote: "Quoted after intake. We'll follow up by phone, text, or email.",
      seo: {
        title: "Recurring House Cleaning | Shoreline Cleaning LLC",
        description:
          "Weekly, biweekly, or monthly house cleaning in the 757. Shoreline Cleaning LLC quotes after intake.",
      },
    },
    {
      slug: "commercial-office-cleaning",
      name: "Commercial / Office Cleaning",
      shortDescription: "Offices, suites, and small commercial spaces that need a reliable reset.",
      overview:
        "Commercial and office cleaning covers desks, floors, kitchens/break rooms, restrooms, and common areas. We quote around your hours so the work happens when it won't interrupt the team.",
      included: [
        "Floors, trash, restrooms, and break areas",
        "Dusting of reachable office surfaces",
        "Glass on interior doors and partitions as quoted",
        "Scheduling outside peak business hours when needed",
      ],
      notIncluded: [
        "Medical or industrial specialized cleaning unless separately scoped",
        "After-hours alarm handling without written instructions",
      ],
      idealFor: ["Small offices", "Professional suites", "Shared workspaces"],
      image: img("/images/office.jpg", "Clean, bright office with organized desks and large windows"),
      featured: true,
      order: 5,
      published: true,
      pricingNote: "Quoted after intake. We'll follow up by phone, text, or email.",
      seo: {
        title: "Commercial and Office Cleaning | Shoreline Cleaning LLC",
        description:
          "Office and commercial cleaning in the 757 from Shoreline Cleaning LLC. Request a quote after a short intake.",
      },
    },
    {
      slug: "airbnb-turnover-cleaning",
      name: "Airbnb / Short-Term Rental Turnover Cleaning",
      shortDescription: "Guest-ready turnovers between stays, including linens when requested.",
      overview:
        "Short-term rental turnovers are timed to checkout and the next arrival. We reset kitchens, baths, floors, and living spaces, and can include linen changes when that's part of the quote.",
      included: [
        "Full guest-area reset between stays",
        "Kitchen and bathroom sanitation",
        "Floors, trash, and staging of common areas",
        "Linen change when included in the quote",
      ],
      notIncluded: [
        "Guest communication or lockbox management unless agreed separately",
        "Restocking supplies you don't provide",
      ],
      idealFor: ["Airbnb hosts", "VRBO and similar short-term rentals", "Corporate apartments"],
      image: img("/images/bedroom.jpg", "Guest bedroom with white linens and a navy throw, staged after a turnover clean"),
      featured: false,
      order: 6,
      published: true,
      pricingNote: "Quoted after intake. We'll follow up by phone, text, or email.",
      seo: {
        title: "Airbnb Turnover Cleaning | Shoreline Cleaning LLC",
        description:
          "Short-term rental turnover cleaning in the 757. Shoreline Cleaning LLC quotes after a short intake.",
      },
    },
    {
      slug: "post-construction-cleaning",
      name: "Post-Construction Cleaning",
      shortDescription: "Dust-out and detail work after remodel or construction.",
      overview:
        "Post-construction cleaning is a different job than house cleaning. We quote it after we understand the dust load, the stage of work, and whether this is a rough clean, final clean, or both.",
      included: [
        "Dust removal from surfaces, fixtures, and floors",
        "Kitchen and bath wipe-down after construction dust",
        "Interior glass and tracks as quoted",
        "A walkthrough of remaining construction debris (removal of debris is separate unless quoted)",
      ],
      notIncluded: [
        "Hazardous material handling",
        "Heavy debris hauling unless quoted",
        "Touch-up painting",
      ],
      idealFor: ["Remodels", "New finishes", "Builders and homeowners after construction"],
      image: img("/images/kitchen-after.jpg", "Spotless modern kitchen after a detailed post-construction clean"),
      featured: false,
      order: 7,
      published: true,
      pricingNote: "Quoted after intake. We'll follow up by phone, text, or email.",
      seo: {
        title: "Post-Construction Cleaning | Shoreline Cleaning LLC",
        description:
          "Post-construction cleaning in the 757 from Shoreline Cleaning LLC. Request a quote after intake.",
      },
    },
  ],
  gallery: [
    {
      id: "gal-kitchen",
      image: img("/images/hero-kitchen.jpg", "Bright professionally cleaned kitchen with a navy island", 1792, 1008),
      caption: "Kitchen reset — sample photo, replace in Sanity",
      category: "kitchens",
      order: 1,
    },
    {
      id: "gal-living",
      image: img("/images/living-room.jpg", "Professionally cleaned living room with abundant daylight"),
      caption: "Living space — sample photo, replace in Sanity",
      category: "homes",
      order: 2,
    },
    {
      id: "gal-bath",
      image: img("/images/bathroom.jpg", "Clean bathroom with glass shower and folded navy towels"),
      caption: "Bathroom detail — sample photo, replace in Sanity",
      category: "bathrooms",
      order: 3,
    },
    {
      id: "gal-office",
      image: img("/images/office.jpg", "Clean commercial office with organized desks"),
      caption: "Office cleaning — sample photo, replace in Sanity",
      category: "commercial",
      order: 4,
    },
    {
      id: "gal-bedroom",
      image: img("/images/bedroom.jpg", "Short-term rental bedroom staged after turnover cleaning"),
      caption: "Rental turnover — sample photo, replace in Sanity",
      category: "homes",
      order: 5,
    },
    {
      id: "gal-moveout",
      image: img("/images/move-out.jpg", "Empty living room after a move-out clean"),
      caption: "Move-out — sample photo, replace in Sanity",
      category: "move-out",
      order: 6,
    },
  ],
  beforeAfter: [
    {
      id: "kitchen-reset",
      title: "Kitchen reset",
      caption: "",
      category: "kitchens",
      before: img(
        "/images/kitchen-before.jpg",
        "Lived-in family kitchen before cleaning, with a cluttered island, dishes in the sink, and crumbs on the floor",
      ),
      after: img(
        "/images/kitchen-after.jpg",
        "The same kitchen after a professional clean, with clear counters, an empty sink, and a wiped floor",
      ),
      order: 1,
    },
    {
      id: "bath-reset",
      title: "Bathroom reset",
      caption: "",
      category: "bathrooms",
      before: img(
        "/images/bathroom-before.jpg",
        "Lived-in bathroom before cleaning, with clustered bottles and a dull mirror",
      ),
      after: img("/images/bathroom.jpg", "Bathroom after a professional clean, with folded towels and clear surfaces"),
      order: 2,
    },
  ],
  reviews: [
    {
      id: "sample-jordan",
      displayName: "Jordan M.",
      rating: 5,
      text: "On time, respectful of the house, and the kitchen looked brand new. Easy to request a quote and hear back quickly.",
      serviceType: "Standard Residential Cleaning",
      date: "2026-06-12",
      isSample: true,
      showOnHomepage: true,
      order: 1,
    },
    {
      id: "sample-priya",
      displayName: "Priya S.",
      rating: 5,
      text: "We used Shoreline for a move-out. Communication was clear, and the empty rooms were ready for the walkthrough.",
      serviceType: "Move-In / Move-Out Cleaning",
      date: "2026-07-02",
      isSample: true,
      showOnHomepage: true,
      order: 2,
    },
    {
      id: "sample-chris",
      displayName: "Chris T.",
      rating: 5,
      text: "Our small office looks so much better. The quote process was straightforward — intake form, a call, then a scheduled visit.",
      serviceType: "Commercial / Office Cleaning",
      date: "2026-08-18",
      isSample: true,
      showOnHomepage: true,
      order: 3,
    },
  ],
  faqs: [
    {
      id: "how-quoting-works",
      question: "How do I get a quote?",
      answer:
        "Fill out the intake form on the Contact page. There are no prices listed on the website. The owner will call, text, or email — whichever you prefer — to discuss the work and give you a quote.",
      category: "Quotes",
      order: 1,
    },
    {
      id: "what-to-prepare",
      question: "How should I prepare for a cleaning?",
      answer:
        "A little prep helps: pick up personal items, clear kitchen counters if you can, and note any rooms to skip or focus on. We'll confirm details when we follow up on your quote.",
      category: "Appointments",
      order: 2,
    },
    {
      id: "supplies",
      question: "Do you bring supplies?",
      answer:
        "Yes — standard cleaning supplies and equipment are part of a typical visit. If you prefer we use products you already have, mention that on the intake form.",
      category: "Service details",
      order: 3,
    },
    {
      id: "pets",
      question: "Are you okay with pets in the home?",
      answer:
        "Usually yes. Tell us about pets on the intake form so we can plan around crates, gates, or rooms to keep closed.",
      category: "Service details",
      order: 4,
    },
    {
      id: "service-area",
      question: "Do you serve my city?",
      answer:
        "We serve the 757 and surrounding Hampton Roads communities. Specific cities will be listed on the Service Areas page as they're confirmed. If you're nearby, request a quote and we'll tell you whether we can help.",
      category: "Service area",
      order: 5,
    },
    {
      id: "payment",
      question: "How does payment work?",
      answer:
        "Payment details are confirmed with your quote. We do not collect card numbers or process payments through this website.",
      category: "Quotes",
      order: 6,
    },
  ],
  team: [],
  blogCategories: [
    { slug: "preparing", title: "Preparing for a Clean" },
    { slug: "types-of-cleaning", title: "Types of Cleaning" },
    { slug: "moving", title: "Moving" },
  ],
  posts: [
    {
      slug: "how-to-prepare-for-a-professional-house-cleaning",
      title: "How to Prepare for a Professional House Cleaning",
      excerpt: "A short, practical checklist so your cleaning visit goes smoothly. Sample article — replace in Sanity.",
      author: "Shoreline Cleaning LLC",
      category: "preparing",
      publishedAt: "2026-09-01",
      featuredImage: img("/images/living-room.jpg", "Tidy living room ready for a professional cleaning visit"),
      relatedSlugs: [
        "deep-cleaning-vs-standard-cleaning",
        "move-out-cleaning-checklist",
      ],
      isPlaceholder: true,
      published: true,
      body: [
        "This is a sample / placeholder article for Shoreline Cleaning LLC. Replace it in Sanity with your own voice before you treat it as published expertise.",
        "A little preparation helps a cleaning visit go further. You don't need to pre-clean — that's our job — but clearing personal items and flagging priorities makes the time on site more useful.",
        "Pick up clothing, toys, and papers from floors and counters. Empty the sink if you can. Secure pets, or let us know if they will be home. Write down rooms to skip and products you prefer we avoid.",
        "If this is a first visit, photos of kitchens and bathrooms on the intake form help us quote more accurately. There is no online price list; we quote after we understand the space.",
      ],
      seo: {
        title: "How to Prepare for a Professional House Cleaning | Shoreline Cleaning LLC",
        description:
          "A simple checklist to prepare for a house cleaning visit. Sample article from Shoreline Cleaning LLC.",
      },
    },
    {
      slug: "deep-cleaning-vs-standard-cleaning",
      title: "Deep Cleaning vs. Standard Cleaning: What's the Difference?",
      excerpt: "When a regular clean is enough — and when a deeper visit is the better fit. Sample article.",
      author: "Shoreline Cleaning LLC",
      category: "types-of-cleaning",
      publishedAt: "2026-09-04",
      featuredImage: img("/images/bathroom.jpg", "Detailed bathroom after a thorough professional cleaning"),
      relatedSlugs: [
        "how-to-prepare-for-a-professional-house-cleaning",
        "move-out-cleaning-checklist",
      ],
      isPlaceholder: true,
      published: true,
      body: [
        "This is a sample / placeholder article. Edit or unpublish it in Sanity. It is not a claim of specialized training.",
        "Standard cleaning is maintenance: kitchens, baths, floors, dusting, and the rooms you live in. It's the right cadence when the home is already in decent shape.",
        "Deep cleaning adds time and detail — baseboards, build-up, appliance edges, and the spots a weekly visit doesn't linger on. First-time cleans and seasonal resets often start here.",
        "Not sure which you need? Describe the home on the intake form. We'll recommend a starting point when we call, text, or email your quote.",
      ],
      seo: {
        title: "Deep Cleaning vs. Standard Cleaning | Shoreline Cleaning LLC",
        description:
          "The difference between a standard clean and a deep clean. Sample article from Shoreline Cleaning LLC.",
      },
    },
    {
      slug: "move-out-cleaning-checklist",
      title: "A Move-Out Cleaning Checklist for a Fresh Start",
      excerpt: "What to handle before the keys are returned — and what a move-out clean usually covers. Sample article.",
      author: "Shoreline Cleaning LLC",
      category: "moving",
      publishedAt: "2026-09-08",
      featuredImage: img("/images/move-out.jpg", "Empty, freshly cleaned room after a move-out service"),
      relatedSlugs: [
        "how-to-prepare-for-a-professional-house-cleaning",
        "deep-cleaning-vs-standard-cleaning",
      ],
      isPlaceholder: true,
      published: true,
      body: [
        "This is a sample / placeholder article for Shoreline Cleaning LLC. Replace the copy in Sanity before launch if you want it in your own words.",
        "Move-out cleaning is easiest when the home is empty. Cabinets, appliance interiors, and closets can only be done well if they're accessible.",
        "Before we arrive: remove belongings, take photos of existing damage for your own records, and confirm whether carpets, interior windows, or garage space should be included in the quote.",
        "A typical move-out visit covers kitchens, baths, floors, and empty storage. Hauling, painting, and carpet extraction are separate unless we quote them. Send the intake form with your move date and we'll follow up.",
      ],
      seo: {
        title: "Move-Out Cleaning Checklist | Shoreline Cleaning LLC",
        description:
          "A practical move-out cleaning checklist. Sample article from Shoreline Cleaning LLC in the 757.",
      },
    },
  ],
  serviceAreas: {
    seo: {
      title: "Service Areas | Shoreline Cleaning LLC | 757 & Hampton Roads",
      description:
        "Shoreline Cleaning LLC serves the 757 and surrounding Hampton Roads communities. Request a quote even if your city is not listed yet.",
    },
    heading: "Service areas",
    intro:
      "Serving the 757 and surrounding Hampton Roads communities. Individual cities and neighborhoods will appear here as they're added in Sanity. We are not listing specific cities until they're confirmed.",
    areas: [],
    outsideAreaNote:
      "Outside the listed area — or not sure? Request a quote anyway. If we can help, we'll say so when we follow up. If we can't, we'll tell you that too.",
  },
  legal: [
    {
      slug: "privacy",
      title: "Privacy Policy",
      lastUpdated: "2026-09-21",
      isTemplate: true,
      body: [
        "TEMPLATE — review with counsel before using this as your official privacy policy. This placeholder describes, at a high level, how a small service business website typically handles inquiry forms.",
        "Shoreline Cleaning LLC (\"we\") operates www.shorelinecleaning757.com. When you submit the quote form, we collect the information you enter (name, contact details, property details, and message) so we can respond by call, text, or email.",
        "We do not sell your information. We do not collect payment card numbers through this website. Form submissions may be processed by our email provider (for example Resend) so the message reaches our inbox.",
        "Analytics tools are disabled by default. If they are turned on later, this page should be updated to name the provider.",
        "Contact us using the details in Site Settings to ask questions about this policy. Replace this template before launch.",
      ],
      seo: {
        title: "Privacy Policy | Shoreline Cleaning LLC",
        description: "Privacy policy template for Shoreline Cleaning LLC. Review before launch.",
      },
    },
    {
      slug: "terms",
      title: "Terms of Use",
      lastUpdated: "2026-09-21",
      isTemplate: true,
      body: [
        "TEMPLATE — review with counsel before using this as your official terms of use.",
        "This website is provided by Shoreline Cleaning LLC to share information about cleaning services and to collect quote requests. Submitting a form is a request for a quote, not a booking and not a contract.",
        "Quotes are provided after intake, by phone, text, or email. Published pages may include sample reviews, sample photos, and draft articles clearly marked as such until you replace them.",
        "Website content is for general information. Services actually offered, scheduling, and pricing are confirmed only in a quote conversation.",
        "Replace this template before launch.",
      ],
      seo: {
        title: "Terms of Use | Shoreline Cleaning LLC",
        description: "Terms of use template for Shoreline Cleaning LLC. Review before launch.",
      },
    },
  ],
};
