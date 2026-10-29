import { defineArrayMember, defineField, defineType, type SchemaTypeDefinition } from "sanity";

const seoFields = [
  defineField({
    name: "seoTitle",
    title: "SEO title",
    type: "string",
    description: "Browser tab and search title. Keep it under ~60 characters.",
  }),
  defineField({
    name: "seoDescription",
    title: "SEO description",
    type: "text",
    rows: 3,
    description: "Search snippet. Keep it under ~155 characters.",
  }),
  defineField({
    name: "ogImage",
    title: "Social share image",
    type: "image",
    options: { hotspot: true },
    fields: [defineField({ name: "alt", type: "string", title: "Alt text", validation: (r) => r.required() })],
  }),
  defineField({ name: "noIndex", title: "Hide from search engines", type: "boolean", initialValue: false }),
];

const imageWithAlt = (name: string, title: string, required = true) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alt text",
        type: "string",
        description: "Describe the photo for screen readers. Required.",
        validation: (r) => r.required(),
      }),
    ],
    validation: required ? (r) => r.required() : undefined,
  });

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "brand", title: "Brand", default: true },
    { name: "contact", title: "Contact" },
    { name: "seo", title: "SEO" },
    { name: "extras", title: "Analytics & extras" },
  ],
  fields: [
    defineField({ name: "businessName", title: "Business name", type: "string", group: "brand", initialValue: "Shoreline Cleaning LLC", validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string", group: "brand" }),
    imageWithAlt("logo", "Logo"),
    defineField({ name: "phone", title: "Phone", type: "string", group: "contact", description: "Use a real number. Leave the placeholder token until you have one. Do not invent a number." }),
    defineField({ name: "textNumber", title: "Text number", type: "string", group: "contact" }),
    defineField({ name: "email", title: "Email", type: "string", group: "contact" }),
    defineField({ name: "address", title: "Business address", type: "string", group: "contact" }),
    defineField({
      name: "hours",
      title: "Business hours",
      type: "array",
      group: "contact",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "days", type: "string", title: "Days" }),
            defineField({ name: "hours", type: "string", title: "Hours" }),
          ],
        }),
      ],
    }),
    defineField({ name: "hoursSummary", title: "Hours summary (short)", type: "string", group: "contact" }),
    defineField({
      name: "serviceAreaLine",
      title: "Service-area sentence",
      type: "string",
      group: "contact",
      initialValue: "Serving the 757 and surrounding Hampton Roads communities",
    }),
    defineField({ name: "googleBusinessUrl", title: "Google Business Profile URL", type: "url", group: "contact" }),
    defineField({ name: "facebookUrl", title: "Facebook URL", type: "url", group: "contact" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url", group: "contact" }),
    defineField({ name: "bookingUrl", title: "Booking URL (optional)", type: "url", group: "contact" }),
    defineField({
      name: "announcement",
      title: "Sitewide announcement bar",
      type: "object",
      group: "brand",
      fields: [
        defineField({ name: "enabled", type: "boolean", title: "Show announcement bar", initialValue: false }),
        defineField({ name: "text", type: "string", title: "Text" }),
        defineField({ name: "href", type: "string", title: "Link (optional)" }),
      ],
    }),
    defineField({ name: "footerNote", title: "Footer text", type: "text", rows: 3, group: "brand" }),
    defineField({ name: "googleReviewUrl", title: "Google review URL", type: "url", group: "contact" }),
    defineField({ name: "googleReviewButtonLabel", title: "Google review button label", type: "string", group: "contact", initialValue: "Read or Leave a Review on Google" }),
    ...seoFields.map((f) => ({ ...f, group: "seo" })),
    defineField({ name: "googleAnalyticsId", title: "Google Analytics ID (optional)", type: "string", group: "extras", description: "Leave empty to keep analytics off." }),
    defineField({ name: "plausibleDomain", title: "Plausible domain (optional)", type: "string", group: "extras" }),
    defineField({ name: "cookieBannerEnabled", title: "Show cookie banner", type: "boolean", group: "extras", initialValue: false }),
  ],
  preview: { select: { title: "businessName" } },
});

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({ name: "heroEyebrow", title: "Hero eyebrow", type: "string" }),
    defineField({ name: "heroHeadline", title: "Hero headline", type: "string", validation: (r) => r.required() }),
    defineField({ name: "heroSubheadline", title: "Hero subheadline", type: "text", rows: 3 }),
    defineField({ name: "heroPrimaryCta", title: "Primary button label", type: "string" }),
    defineField({ name: "heroSecondaryCta", title: "Secondary button label", type: "string" }),
    imageWithAlt("heroImage", "Hero image"),
    defineField({
      name: "highlights",
      title: "Marketing highlights",
      description: "Editable talking points. Not certifications unless you have them.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "description", type: "text", rows: 2, title: "Description" }),
          ],
        }),
      ],
    }),
    defineField({ name: "introHeading", title: "Intro heading", type: "string" }),
    defineField({ name: "introBody", title: "Intro body", type: "text", rows: 5 }),
    defineField({ name: "featuredServices", title: "Featured services", type: "array", of: [{ type: "reference", to: [{ type: "service" }] }] }),
    defineField({ name: "howItWorksHeading", title: "How it works heading", type: "string" }),
    defineField({ name: "howItWorksIntro", title: "How it works intro", type: "text", rows: 2 }),
    defineField({
      name: "howItWorksSteps",
      title: "How it works steps",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "description", type: "text", rows: 3, title: "Description" }),
          ],
        }),
      ],
    }),
    defineField({ name: "featuredBeforeAfter", title: "Featured before & after", type: "reference", to: [{ type: "beforeAfter" }] }),
    defineField({ name: "closingHeading", title: "Closing CTA heading", type: "string" }),
    defineField({ name: "closingBody", title: "Closing CTA body", type: "text", rows: 3 }),
    ...seoFields,
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Service name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "shortDescription", title: "Short description", type: "text", rows: 2 }),
    defineField({ name: "overview", title: "Detailed overview", type: "text", rows: 6 }),
    defineField({ name: "included", title: "What's included", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "notIncluded", title: "Not included (optional)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "idealFor", title: "Ideal for (optional)", type: "array", of: [{ type: "string" }] }),
    imageWithAlt("image", "Service photo"),
    defineField({
      name: "gallery",
      title: "Related photos",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alt text", validation: (r) => r.required() })] })],
    }),
    defineField({ name: "relatedFaqs", title: "Related FAQs", type: "array", of: [{ type: "reference", to: [{ type: "faq" }] }] }),
    defineField({
      name: "pricingNote",
      title: "Pricing note",
      type: "string",
      description: "Do not enter dollar amounts. Default: quoted after intake.",
      initialValue: "Quoted after intake. We'll follow up by phone, text, or email.",
    }),
    defineField({ name: "featured", title: "Feature on homepage", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Order", type: "number" }),
    defineField({ name: "published", title: "Published", type: "boolean", initialValue: true }),
    ...seoFields,
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", media: "image", published: "published" }, prepare: ({ title, media, published }) => ({ title, subtitle: published ? "Published" : "Unpublished", media }) },
});

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery image",
  type: "document",
  fields: [
    imageWithAlt("image", "Photo"),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Kitchens", value: "kitchens" },
          { title: "Bathrooms", value: "bathrooms" },
          { title: "Homes", value: "homes" },
          { title: "Commercial", value: "commercial" },
          { title: "Move-out", value: "move-out" },
          { title: "Before/after", value: "before-after" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: { select: { title: "caption", media: "image", subtitle: "category" } },
});

export const beforeAfter = defineType({
  name: "beforeAfter",
  title: "Before & after",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    imageWithAlt("before", "Before photo"),
    imageWithAlt("after", "After photo"),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Kitchens", value: "kitchens" },
          { title: "Bathrooms", value: "bathrooms" },
          { title: "Homes", value: "homes" },
          { title: "Commercial", value: "commercial" },
          { title: "Move-out", value: "move-out" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: { select: { title: "title", media: "after" } },
});

export const review = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({ name: "displayName", title: "Reviewer display name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "rating", title: "Rating (1–5)", type: "number", validation: (r) => r.min(1).max(5).integer() }),
    defineField({ name: "text", title: "Review text", type: "text", rows: 5, validation: (r) => r.required() }),
    defineField({ name: "serviceType", title: "Service type (optional)", type: "string" }),
    defineField({ name: "date", title: "Date (optional)", type: "date" }),
    defineField({
      name: "isSample",
      title: "This is a SAMPLE review",
      type: "boolean",
      initialValue: false,
      description: "Turn this off for real customer reviews. Sample reviews show a visible label on the site.",
    }),
    defineField({ name: "showOnHomepage", title: "Show on homepage", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: { select: { title: "displayName", subtitle: "text" } },
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 5, validation: (r) => r.required() }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: { select: { title: "question", subtitle: "category" } },
});

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 4 }),
    imageWithAlt("photo", "Photo", false),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});

export const blogCategory = defineType({
  name: "blogCategory",
  title: "Blog category",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
  ],
});

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    defineField({ name: "author", title: "Author", type: "string" }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "blogCategory" }] }),
    defineField({ name: "publishedAt", title: "Publish date", type: "datetime" }),
    imageWithAlt("featuredImage", "Featured image"),
    defineField({ name: "body", title: "Page content", type: "array", of: [{ type: "block" }, { type: "image", fields: [defineField({ name: "alt", type: "string", title: "Alt text" })] }] }),
    defineField({ name: "relatedPosts", title: "Related posts", type: "array", of: [{ type: "reference", to: [{ type: "blogPost" }] }] }),
    defineField({ name: "isPlaceholder", title: "Mark as sample / draft placeholder", type: "boolean", initialValue: false }),
    defineField({ name: "published", title: "Published", type: "boolean", initialValue: false }),
    ...seoFields,
  ],
  preview: { select: { title: "title", subtitle: "publishedAt", media: "featuredImage" } },
});

export const serviceAreasPage = defineType({
  name: "serviceAreasPage",
  title: "Service areas page",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "intro", title: "Introductory text", type: "text", rows: 4 }),
    defineField({
      name: "areas",
      title: "Cities / communities served",
      description: "Leave empty until you are ready to name specific places.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", title: "Name" }),
            defineField({ name: "note", type: "string", title: "Note (optional)" }),
          ],
        }),
      ],
    }),
    defineField({ name: "outsideAreaNote", title: "Note for visitors outside the list", type: "text", rows: 3 }),
    defineField({
      name: "mapEmbedHtml",
      title: "Map embed HTML (optional)",
      type: "text",
      rows: 4,
      description: "Paste a Google Maps embed only when you have one. Leave empty to hide the map.",
    }),
    ...seoFields,
  ],
  preview: { prepare: () => ({ title: "Service areas" }) },
});

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "storyHeading", title: "Story heading", type: "string" }),
    defineField({ name: "story", title: "Company story", type: "array", of: [{ type: "text" }] }),
    defineField({
      name: "whyItems",
      title: "Why choose us",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "description", type: "text", rows: 3 }),
          ],
        }),
      ],
    }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "description", type: "text", rows: 3 }),
          ],
        }),
      ],
    }),
    defineField({ name: "community", title: "Community / local service message", type: "text", rows: 4 }),
    ...seoFields,
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});

export const legalPage = defineType({
  name: "legalPage",
  title: "Legal page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "string",
      options: { list: [{ title: "Privacy", value: "privacy" }, { title: "Terms", value: "terms" }] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "lastUpdated", title: "Last updated", type: "date" }),
    defineField({
      name: "isTemplate",
      title: "Show “template: review before use” banner",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }] }),
    ...seoFields,
  ],
});

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  homePage,
  aboutPage,
  serviceAreasPage,
  service,
  galleryImage,
  beforeAfter,
  review,
  faq,
  teamMember,
  blogCategory,
  blogPost,
  legalPage,
];
