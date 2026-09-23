const PROJECT = "1jg0vghv";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const TOKEN = process.env.SANITY_API_WRITE_TOKEN;
const SITE = "https://www.shorelinecleaning757.com";
const API = `https://${PROJECT}.api.sanity.io/v2026-09-01`;

export async function seed() {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) return "SANITY_API_WRITE_TOKEN is not set on this deployment.";
  const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

let keyCount = 0;
const key = () => `k${(keyCount += 1).toString(36)}`;
const item = (fields) => ({ _key: key(), ...fields });
const slug = (current) => ({ _type: "slug", current });
const image = (assetId, alt) =>
  assetId
    ? { _type: "image", alt, asset: { _type: "reference", _ref: assetId } }
    : undefined;

async function query(expression) {
  const url = `${API}/data/query/${DATASET}?query=${encodeURIComponent(expression)}`;
  const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const body = await response.json();
  if (!response.ok) throw new Error(`Sanity query failed: ${JSON.stringify(body)}`);
  return body.result;
}

async function upload(path) {
  const response = await fetch(`${SITE}${path}`);
  if (!response.ok) {
    console.log(`Skip image ${path}: ${response.status}`);
    return undefined;
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  const filename = path.split("/").pop();
  const uploaded = await fetch(`${API}/assets/images/${DATASET}?filename=${filename}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": response.headers.get("content-type") || "image/jpeg",
    },
    body: bytes,
  });
  const body = await uploaded.json();
  if (!uploaded.ok) {
    console.log(`Image upload failed for ${path}: ${JSON.stringify(body).slice(0, 240)}`);
    return undefined;
  }
  return body.document?._id;
}

function blocks(paragraphs) {
  return paragraphs.map((text) => ({
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  }));
}

const hasText = (value) => typeof value === "string" && value.trim().length > 0;

function addSingleton(mutations, id, doc, publishedValue, draftValue) {
  if (!hasText(publishedValue)) mutations.push({ createOrReplace: { ...doc, _id: id } });
  if (!hasText(draftValue)) mutations.push({ createOrReplace: { ...doc, _id: `drafts.${id}` } });
}

const assets = {};
for (const path of [
  "/images/hero-kitchen.jpg",
  "/images/living-room.jpg",
  "/images/bathroom.jpg",
  "/images/office.jpg",
  "/images/bedroom.jpg",
  "/images/move-out.jpg",
  "/images/kitchen-before.jpg",
  "/images/kitchen-after.jpg",
  "/images/bathroom-before.jpg",
  "/og.jpg",
]) {
  assets[path] = await upload(path);
}

const existing = await query(`{
  "home": *[_id=="homePage"][0].heroHeadline,
  "homeDraft": *[_id=="drafts.homePage"][0].heroHeadline,
  "about": *[_id=="aboutPage"][0].heading,
  "aboutDraft": *[_id=="drafts.aboutPage"][0].heading,
  "areas": *[_id=="serviceAreasPage"][0].heading,
  "areasDraft": *[_id=="drafts.serviceAreasPage"][0].heading,
  "settings": *[_id=="siteSettings"][0].businessName,
  "settingsDraft": *[_id=="drafts.siteSettings"][0].businessName,
  "services": count(*[_type=="service" && defined(name)]),
  "reviews": count(*[_type=="review" && defined(displayName)]),
  "faqs": count(*[_type=="faq" && defined(question)]),
  "gallery": count(*[_type=="galleryImage" && defined(caption)]),
  "pairs": count(*[_type=="beforeAfter" && defined(title)]),
  "posts": count(*[_type=="blogPost" && defined(title)]),
  "legal": count(*[_type=="legalPage" && defined(title)]),
  "cats": count(*[_type=="blogCategory" && defined(title)])
}`);

const mutations = [];

addSingleton(
  mutations,
  "siteSettings",
  {
    _type: "siteSettings",
    businessName: "Shoreline Cleaning LLC",
    tagline: "Residential and commercial cleaning for the 757",
    email: "infoshorelinecleaning757@gmail.com",
    phone: "",
    textNumber: "",
    address: "",
    hoursSummary: "",
    hours: [],
    serviceAreaLine: "Serving the 757 and surrounding Hampton Roads communities",
    googleReviewUrl: "https://www.google.com/search?q=Shoreline+Cleaning+LLC+Virginia+Beach+reviews",
    googleReviewButtonLabel: "CLICK HERE TO LEAVE A GOOGLE REVIEW!",
    announcement: {
      enabled: false,
      text: "Now accepting quote requests for residential and commercial cleaning.",
      href: "/contact",
    },
    footerNote:
      "Shoreline Cleaning LLC provides residential and commercial cleaning in the 757 and surrounding Hampton Roads communities. Quotes are provided after a short intake — by phone, text, or email.",
    cookieBannerEnabled: false,
    seoTitle: "Shoreline Cleaning LLC | Residential & Commercial Cleaning in the 757",
    seoDescription:
      "Shoreline Cleaning LLC is a locally focused cleaning company serving the 757 and surrounding Hampton Roads communities. Request a free quote — we'll follow up by call, text, or email.",
    ogImage: image(assets["/og.jpg"], "Shoreline Cleaning LLC"),
  },
  existing.settings,
  existing.settingsDraft,
);

addSingleton(
  mutations,
  "homePage",
  {
    _type: "homePage",
    heroEyebrow: "757 · Hampton Roads",
    heroHeadline: "Fresh, careful cleaning for homes and businesses",
    heroSubheadline:
      "Shoreline Cleaning LLC is a locally focused residential and commercial cleaning company serving the 757 and surrounding Hampton Roads communities. Tell us about your space — we'll follow up with a quote by call, text, or email.",
    heroPrimaryCta: "Request a Free Quote",
    heroSecondaryCta: "",
    heroImage: image(
      assets["/images/hero-kitchen.jpg"],
      "Bright, professionally cleaned kitchen with white cabinets, a navy island, and morning light",
    ),
    highlights: [
      item({
        title: "Locally focused",
        description: "Built for neighbors and businesses across the 757 and nearby Hampton Roads communities.",
      }),
      item({
        title: "Flexible scheduling",
        description: "One-time, move-out, or recurring visits — we'll work with the timing that fits your space.",
      }),
      item({
        title: "Residential & commercial",
        description: "Homes, apartments, offices, rentals, and post-construction spaces.",
      }),
      item({
        title: "Satisfaction-focused service",
        description: "Clear communication, careful work, and a walkthrough of what you need before we quote.",
      }),
    ],
    introHeading: "Cleaning that feels organized, not rushed",
    introBody:
      "Shoreline Cleaning LLC is a locally owned cleaning company serving the 757 and surrounding Hampton Roads communities. We keep the process simple: you fill out a short intake, we follow up to discuss the details, and you receive a quote by phone, text, or email before any work is scheduled. No published price list — every space is different, and we'd rather quote yours accurately.",
    featuredServices: [
      "service-deep-cleaning",
      "service-post-move-out-cleaning",
      "service-recurring-cleaning",
      "service-commercial-office-cleaning",
      "service-airbnb-turnover-cleaning",
    ].map((ref) => ({ _key: key(), _type: "reference", _ref: ref })),
    howItWorksHeading: "How a quote works",
    howItWorksIntro:
      "There are no prices on this site. After you send a short intake, the owner follows up to talk through the work and send a quote.",
    howItWorksSteps: [
      item({
        title: "Request a Quote",
        description:
          "Fill out our intake form with information on your address, type of cleaning service you're requesting and all additional info you can provide, so that we can provide the best quote for the job!",
      }),
      item({
        title: "Talk with Us",
        description:
          "Once we receive your intake form, we'll reach out to schedule the best time to call, text or email to discuss our fee and to schedule our first cleaning service.",
      }),
      item({
        title: "Enjoy a cleaner space",
        description:
          "Once we've agreed and gotten the job on our schedule, we'll provide tips on how to prepare for our first service. Leave the rest to us!",
      }),
    ],
    featuredBeforeAfter: { _type: "reference", _ref: "beforeAfter-kitchen-reset" },
    closingHeading: "Ready for a cleaner space?",
    closingBody:
      "Send a short intake and we'll follow up with a quote by phone, text, or email. No prices listed online — every home and business is quoted individually.",
    seoTitle: "Shoreline Cleaning LLC | Fresh, Careful Cleaning in the 757",
    seoDescription:
      "Request a free cleaning quote from Shoreline Cleaning LLC. Residential and commercial service for the 757 and surrounding Hampton Roads communities. We'll follow up by call, text, or email.",
  },
  existing.home,
  existing.homeDraft,
);

addSingleton(
  mutations,
  "aboutPage",
  {
    _type: "aboutPage",
    heading: "A local cleaning company with a simple promise",
    storyHeading: "Our story",
    story: [
      "Shoreline Cleaning LLC is a locally focused residential and commercial cleaning company serving the 757 and surrounding Hampton Roads communities. The name matches the region we live in — coastal Virginia, everyday homes, offices, and rentals that deserve careful work.",
      "We're building this company around clear communication and a straightforward quote process. You tell us about the space. We follow up by call, text, or email. You get a quote before anything is scheduled.",
    ],
    whyItems: [
      item({
        title: "Quoted after intake, not guessed online",
        description: "Every home and business is different. We quote after we understand the space, the service, and the timing.",
      }),
      item({
        title: "Residential and commercial",
        description: "One company for houses, apartments, offices, short-term rentals, move-outs, and post-construction resets.",
      }),
      item({
        title: "Locally focused",
        description: "We serve the 757 and surrounding Hampton Roads communities — not a national franchise template.",
      }),
    ],
    values: [
      item({ title: "Careful", description: "We treat kitchens, desks, and bathrooms as if the next person walking in is you." }),
      item({ title: "Clear", description: "You'll know what is included, what is not, and how we'll follow up on your quote." }),
      item({
        title: "Respectful",
        description: "On-time communication, attention to the details you flag, and no pressure tactics.",
      }),
    ],
    community:
      "Hampton Roads is home. Since 2018 we have served clients across Virginia Beach, Norfolk, Chesapeake, Suffolk, Hampton, Newport News, Williamsburg, Elizabeth City, and Moyock.",
    seoTitle: "About Shoreline Cleaning LLC | Local Cleaning in the 757",
    seoDescription:
      "Learn about Shoreline Cleaning LLC, a locally focused residential and commercial cleaning company serving the 757 and surrounding Hampton Roads communities.",
  },
  existing.about,
  existing.aboutDraft,
);

addSingleton(
  mutations,
  "serviceAreasPage",
  {
    _type: "serviceAreasPage",
    heading: "Service areas",
    intro:
      "Since 2018, we are privileged to have served over 50+ clients in the general Hampton Roads region including Virginia Beach, Norfolk, Chesapeake, Suffolk, Hampton, and Newport News....with clients extending into Williamsburg, Virginia and parts of North Carolina (Elizabeth City and Moyock). What makes us stand out from other cleaning companies in our community is the value we place on our client relationships and consistent quality of service. For that reason, we are proud of the fact that most of our clients have remained on our regular schedule (weekly or monthly).",
    areas: [
      "Virginia Beach",
      "Norfolk",
      "Chesapeake",
      "Suffolk",
      "Hampton",
      "Newport News",
      "Williamsburg",
      "Elizabeth City, NC",
      "Moyock, NC",
    ].map((name) => item({ name })),
    outsideAreaNote:
      "Simply fill out our intake form and when we discuss via call, text or email, we can determine if our company is a good fit for your needs!",
    seoTitle: "Service Areas | Shoreline Cleaning LLC | 757 & Hampton Roads",
    seoDescription:
      "Shoreline Cleaning LLC serves Virginia Beach, Norfolk, Chesapeake, Suffolk, Hampton, Newport News, Williamsburg, and parts of North Carolina including Elizabeth City and Moyock.",
  },
  existing.areas,
  existing.areasDraft,
);

const services = [
  {
    id: "service-deep-cleaning",
    name: "Deep Cleaning",
    slug: "deep-cleaning",
    order: 1,
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
    notIncluded: ["Hoarding or biohazard situations", "Mold remediation", "Exterior pressure washing"],
    idealFor: ["Seasonal resets", "First-time cleans", "Homes that haven't been detailed in a while"],
    image: ["/images/bathroom.jpg", "Bright bathroom with glass shower and neatly folded navy towels"],
    seoTitle: "Deep Cleaning | Shoreline Cleaning LLC",
    seoDescription: "Deep cleaning for homes in the 757. Shoreline Cleaning LLC quotes after a short intake — no online price list.",
  },
  {
    id: "service-post-move-out-cleaning",
    name: "Post Move-Out Cleaning",
    slug: "post-move-out-cleaning",
    order: 2,
    shortDescription: "Empty-home cleaning so the next chapter starts fresh.",
    overview:
      "Post move-out cleaning is built for empty or nearly empty homes. We focus on kitchens, baths, floors, interiors of cabinets and appliances when accessible, and the details landlords, buyers, and new occupants notice first.",
    included: [
      "Kitchen cabinets, drawers, and appliance interiors (if empty and accessible)",
      "Bathrooms, including cabinets and fixtures",
      "Floors throughout the home",
      "Interior windows sills and reachable glass",
      "Closets and pantry interiors when empty",
    ],
    notIncluded: ["Packing, hauling, or junk removal", "Carpet steam cleaning unless quoted separately", "Wall painting or repair"],
    idealFor: ["Renters ending a lease", "Sellers before closing", "Buyers walking into an empty home"],
    image: ["/images/move-out.jpg", "Empty, freshly cleaned living room ready for new occupants"],
    seoTitle: "Post Move-Out Cleaning | Shoreline Cleaning LLC",
    seoDescription: "Post move-out cleaning in the 757 from Shoreline Cleaning LLC. Request a quote after a short intake.",
  },
  {
    id: "service-recurring-cleaning",
    name: "Recurring Cleaning (Weekly/Monthly)",
    slug: "recurring-cleaning",
    order: 3,
    shortDescription: "Weekly, biweekly, or monthly visits that keep the home consistently fresh.",
    overview:
      "Recurring cleaning is a scheduled cadence — weekly, every two weeks, monthly, or a custom rhythm. After the first visit, we learn the home and keep a consistent checklist so you're not re-explaining the kitchen every time.",
    included: [
      "A standing checklist tailored after the first visit",
      "Kitchen, bathrooms, floors, and living areas",
      "Flexible rescheduling discussed in advance",
      "Notes for pets, kids, or rooms to skip",
    ],
    idealFor: ["Busy households", "Anyone who wants the home to stay ahead of clutter and dust"],
    image: ["/images/hero-kitchen.jpg", "Airy kitchen kept consistently clean on a recurring schedule"],
    seoTitle: "Recurring House Cleaning | Shoreline Cleaning LLC",
    seoDescription: "Weekly, biweekly, or monthly house cleaning in the 757. Shoreline Cleaning LLC quotes after intake.",
  },
  {
    id: "service-commercial-office-cleaning",
    name: "Commercial/Office Cleaning",
    slug: "commercial-office-cleaning",
    order: 4,
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
    image: ["/images/office.jpg", "Clean, bright office with organized desks and large windows"],
    seoTitle: "Commercial and Office Cleaning | Shoreline Cleaning LLC",
    seoDescription: "Office and commercial cleaning in the 757 from Shoreline Cleaning LLC. Request a quote after a short intake.",
  },
  {
    id: "service-airbnb-turnover-cleaning",
    name: "Airbnb/Short-Term Rental Turnover Cleaning",
    slug: "airbnb-turnover-cleaning",
    order: 5,
    shortDescription: "Guest-ready turnovers between stays, including linens when requested.",
    overview:
      "Short-term rental turnovers are timed to checkout and the next arrival. We reset kitchens, baths, floors, and living spaces, and can include linen changes when that's part of the quote.",
    included: [
      "Full guest-area reset between stays",
      "Kitchen and bathroom sanitation",
      "Floors, trash, and staging of common areas",
      "Linen change when included in the quote",
    ],
    notIncluded: ["Guest communication or lockbox management unless agreed separately", "Restocking supplies you don't provide"],
    idealFor: ["Airbnb hosts", "VRBO and similar short-term rentals", "Corporate apartments"],
    image: ["/images/bedroom.jpg", "Guest bedroom with white linens and a navy throw, staged after a turnover clean"],
    seoTitle: "Airbnb Turnover Cleaning | Shoreline Cleaning LLC",
    seoDescription: "Short-term rental turnover cleaning in the 757. Shoreline Cleaning LLC quotes after a short intake.",
  },
];

if (existing.services === 0) {
  for (const service of services) {
    mutations.push({
      createIfNotExists: {
        _id: service.id,
        _type: "service",
        name: service.name,
        slug: slug(service.slug),
        shortDescription: service.shortDescription,
        overview: service.overview,
        included: service.included,
        notIncluded: service.notIncluded,
        idealFor: service.idealFor,
        image: image(assets[service.image[0]], service.image[1]),
        pricingNote: "Quoted after intake. We'll follow up by phone, text, or email.",
        featured: true,
        order: service.order,
        published: true,
        seoTitle: service.seoTitle,
        seoDescription: service.seoDescription,
      },
    });
  }
}

if (existing.reviews === 0) {
  const reviews = [
    ["sample-jordan", "Jordan M.", "Deep Cleaning", "On time, respectful of the house, and the kitchen looked brand new. Easy to request a quote and hear back quickly.", "2026-06-12", 1],
    ["sample-priya", "Priya S.", "Post Move-Out Cleaning", "We used Shoreline for a move-out. Communication was clear, and the empty rooms were ready for the walkthrough.", "2026-07-02", 2],
    ["sample-chris", "Chris T.", "Commercial/Office Cleaning", "Our small office looks so much better. The quote process was straightforward — intake form, a call, then a scheduled visit.", "2026-08-18", 3],
  ];
  for (const [id, displayName, serviceType, text, date, order] of reviews) {
    mutations.push({
      createIfNotExists: {
        _id: id,
        _type: "review",
        displayName,
        rating: 5,
        text,
        serviceType,
        date,
        isSample: true,
        showOnHomepage: true,
        order,
      },
    });
  }
}

if (existing.faqs === 0) {
  const faqs = [
    ["how-quoting-works", "How do I get a quote?", "Simply fill out our intake form on this website and we'll set up a good time to call, text or email. Personalizing your cleaning plan is important to us and varies from client to client. Once we've reviewed your needs and discussed with you directly, we'll provide a quote.", "Quotes", 1],
    ["what-to-prepare", "How should I prepare for a cleaning?", "A little prep helps: pick up personal items, clear kitchen counters if you can, and note any rooms to skip or focus on. We'll confirm details when we follow up on your quote.", "Appointments", 2],
    ["supplies", "Do you bring supplies?", "Yes — standard cleaning supplies and equipment are part of a typical visit. If you prefer we use products you already have, mention that on the intake form.", "Service details", 3],
    ["pets", "Do you clean homes that have pets?", "Yes, we clean plenty of homes with various types of pets. We can discuss the details of your living arrangement and the number and types of pets you have to determine the best plan for you!", "Service details", 4],
    ["service-area", "My address is outside of the places mentioned in your Service Areas. Are you able to help me?", "We generally serve clients throughout Hampton Roads and the areas we mentioned in the Service Areas section of this website. However, if you are outside of those listed areas, we can discuss your needs after you complete the initial intake form and determine if our company is a good fit for you!", "Service area", 5],
    ["payment", "How does payment work?", "Payment details and arrangements will be discussed and agreed upon during our call, text or email after receiving your initial intake form.", "Quotes", 6],
  ];
  for (const [id, question, answer, category, order] of faqs) {
    mutations.push({ createIfNotExists: { _id: id, _type: "faq", question, answer, category, order } });
  }
}

if (existing.gallery === 0) {
  const photos = [
    ["gal-kitchen", "/images/hero-kitchen.jpg", "Bright professionally cleaned kitchen with a navy island", "Kitchen reset — sample photo, replace in Studio", "kitchens", 1],
    ["gal-living", "/images/living-room.jpg", "Professionally cleaned living room with abundant daylight", "Living space — sample photo, replace in Studio", "homes", 2],
    ["gal-bath", "/images/bathroom.jpg", "Clean bathroom with glass shower and folded navy towels", "Bathroom detail — sample photo, replace in Studio", "bathrooms", 3],
    ["gal-office", "/images/office.jpg", "Clean commercial office with organized desks", "Office cleaning — sample photo, replace in Studio", "commercial", 4],
    ["gal-bedroom", "/images/bedroom.jpg", "Short-term rental bedroom staged after turnover cleaning", "Rental turnover — sample photo, replace in Studio", "homes", 5],
    ["gal-moveout", "/images/move-out.jpg", "Empty living room after a move-out clean", "Move-out — sample photo, replace in Studio", "move-out", 6],
  ];
  for (const [id, path, alt, caption, category, order] of photos) {
    mutations.push({
      createIfNotExists: {
        _id: id,
        _type: "galleryImage",
        image: image(assets[path], alt),
        caption,
        category,
        order,
      },
    });
  }
}

if (existing.pairs === 0) {
  mutations.push({
    createIfNotExists: {
      _id: "beforeAfter-kitchen-reset",
      _type: "beforeAfter",
      title: "Kitchen reset",
      caption: "Sample before-and-after pair. Replace with real job photos in Studio.",
      category: "kitchens",
      before: image(assets["/images/kitchen-before.jpg"], "Lived-in kitchen before a professional clean"),
      after: image(assets["/images/kitchen-after.jpg"], "Kitchen after a professional clean"),
      order: 1,
    },
  });
  mutations.push({
    createIfNotExists: {
      _id: "beforeAfter-bath-reset",
      _type: "beforeAfter",
      title: "Bathroom reset",
      caption: "Sample before-and-after pair. Replace with real job photos in Studio.",
      category: "bathrooms",
      before: image(assets["/images/bathroom-before.jpg"], "Lived-in bathroom before cleaning"),
      after: image(assets["/images/bathroom.jpg"], "Bathroom after a professional clean"),
      order: 2,
    },
  });
}

if (existing.cats === 0) {
  for (const [id, title, current] of [
    ["blogCategory-preparing", "Preparing for a Clean", "preparing"],
    ["blogCategory-types", "Types of Cleaning", "types-of-cleaning"],
    ["blogCategory-moving", "Moving", "moving"],
  ]) {
    mutations.push({ createIfNotExists: { _id: id, _type: "blogCategory", title, slug: slug(current) } });
  }
}

if (existing.posts === 0) {
  const posts = [
    {
      id: "post-prepare",
      title: "How to Prepare for a Professional House Cleaning",
      current: "how-to-prepare-for-a-professional-house-cleaning",
      excerpt: "A short, practical checklist so your cleaning visit goes smoothly. Sample article — replace in Studio.",
      category: "blogCategory-preparing",
      publishedAt: "2026-09-01T12:00:00.000Z",
      image: ["/images/living-room.jpg", "Tidy living room ready for a professional cleaning visit"],
      body: [
        "This is a sample article for Shoreline Cleaning LLC. Replace it in Studio with your own voice.",
        "A little preparation helps a cleaning visit go further. You don't need to pre-clean. Clearing personal items and flagging priorities makes the time on site more useful.",
        "Pick up clothing, toys, and papers from floors and counters. Secure pets, or let us know if they will be home. Write down rooms to skip and products you prefer we avoid.",
      ],
    },
    {
      id: "post-deep-vs-standard",
      title: "Deep Cleaning vs. a Regular Clean: What's the Difference?",
      current: "deep-cleaning-vs-standard-cleaning",
      excerpt: "When a regular clean is enough — and when a deeper visit is the better fit. Sample article.",
      category: "blogCategory-types",
      publishedAt: "2026-09-04T12:00:00.000Z",
      image: ["/images/bathroom.jpg", "Detailed bathroom after a thorough professional cleaning"],
      body: [
        "This is a sample article. Edit or unpublish it in Studio.",
        "A regular clean is maintenance: kitchens, baths, floors, dusting, and the rooms you live in.",
        "Deep cleaning adds time and detail — baseboards, build-up, appliance edges, and the spots a weekly visit doesn't linger on.",
        "Not sure which you need? Describe the home on the intake form. We'll recommend a starting point when we follow up.",
      ],
    },
    {
      id: "post-move-out",
      title: "A Move-Out Cleaning Checklist for a Fresh Start",
      current: "move-out-cleaning-checklist",
      excerpt: "What to handle before the keys are returned — and what a move-out clean usually covers. Sample article.",
      category: "blogCategory-moving",
      publishedAt: "2026-09-08T12:00:00.000Z",
      image: ["/images/move-out.jpg", "Empty, freshly cleaned room after a move-out service"],
      body: [
        "This is a sample article. Replace the copy in Studio when you want it in your own words.",
        "Move-out cleaning is easiest when the home is empty. Cabinets, appliance interiors, and closets can only be done well if they're accessible.",
        "A typical move-out visit covers kitchens, baths, floors, and empty storage. Hauling and painting are separate unless we quote them.",
      ],
    },
  ];
  for (const post of posts) {
    mutations.push({
      createIfNotExists: {
        _id: post.id,
        _type: "blogPost",
        title: post.title,
        slug: slug(post.current),
        excerpt: post.excerpt,
        author: "Shoreline Cleaning LLC",
        category: { _type: "reference", _ref: post.category },
        publishedAt: post.publishedAt,
        featuredImage: image(assets[post.image[0]], post.image[1]),
        body: blocks(post.body),
        isPlaceholder: true,
        published: true,
        seoTitle: post.title,
        seoDescription: post.excerpt,
      },
    });
  }
}

if (existing.legal === 0) {
  mutations.push({
    createIfNotExists: {
      _id: "legal-privacy",
      _type: "legalPage",
      title: "Privacy Policy",
      slug: "privacy",
      lastUpdated: "2026-09-21",
      isTemplate: true,
      body: blocks([
        "Shoreline Cleaning LLC operates www.shorelinecleaning757.com. When you submit the quote form, we collect the information you enter so we can respond by call, text, or email.",
        "We do not sell your information. We do not collect payment card numbers through this website. Form submissions are sent through our email provider so the message reaches infoshorelinecleaning757@gmail.com.",
        "This page is a working draft. Review it before treating it as a final legal policy.",
      ]),
      seoTitle: "Privacy Policy | Shoreline Cleaning LLC",
      seoDescription: "How Shoreline Cleaning LLC handles quote requests sent through this website.",
    },
  });
  mutations.push({
    createIfNotExists: {
      _id: "legal-terms",
      _type: "legalPage",
      title: "Terms of Use",
      slug: "terms",
      lastUpdated: "2026-09-21",
      isTemplate: true,
      body: blocks([
        "This website shares information about Shoreline Cleaning LLC and collects quote requests. Submitting the form is a request for a quote, not a booking and not a contract.",
        "Quotes are provided after intake, by phone, text, or email. Services, scheduling, and pricing are confirmed only in that conversation.",
        "This page is a working draft. Review it before treating it as a final legal policy.",
      ]),
      seoTitle: "Terms of Use | Shoreline Cleaning LLC",
      seoDescription: "Terms for using the Shoreline Cleaning LLC website and quote form.",
    },
  });
}

if (mutations.length === 0) {
  return "Studio already has content. Seed left existing documents alone.";
}

const response = await fetch(`${API}/data/mutate/${DATASET}`, {
  method: "POST",
  headers,
  body: JSON.stringify({ mutations }),
});
const body = await response.json();
if (!response.ok) {
  throw new Error(JSON.stringify(body).slice(0, 2000));
}
return `Seeded ${mutations.length} Sanity documents.`;
}

const isDirect = process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop());
if (isDirect) {
  seed()
    .then((message) => {
      console.log(message);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
