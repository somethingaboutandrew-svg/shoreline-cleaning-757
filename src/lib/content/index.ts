import { createClient } from "next-sanity";
import { GOOGLE_REVIEW_URL, PUBLIC_EMAIL, PUBLIC_PHONE } from "@/lib/site-config";
import { isPlaceholderPost, isSampleCopy } from "@/lib/sample-content";
import { OFFERED_SLUGS } from "./offered-slugs";
import { fallbackContent } from "./fallback";
import type {
  AboutPage,
  BeforeAfterPair,
  BlogPost,
  Faq,
  GalleryItem,
  HomePageContent,
  LegalPage,
  Review,
  Service,
  ServiceAreasPage,
  SiteContent,
  SiteSettings,
  TeamMember,
} from "./types";

const HOME_TITLE = "Shoreline Cleaning | House & Commercial Cleaning, 757";
const HOME_DESCRIPTION =
  "House and commercial cleaning in Hampton Roads from Shoreline Cleaning LLC. Serving Virginia Beach and the 757. Request a free quote.";
const RETIRED_HOME_TITLE = "House Cleaning in Virginia Beach | Shoreline Cleaning LLC";

function resolveHomeTitle(remoteTitle: string | undefined, fallback: string) {
  const candidate = remoteTitle?.trim();
  if (!candidate || candidate === RETIRED_HOME_TITLE || candidate.length > 60) return fallback;
  return candidate;
}

function localizeServiceSeo(service: Service): Service {
  const title = service.seo.title.includes("Virginia Beach")
    ? service.seo.title
    : `${service.name} in Virginia Beach | Shoreline Cleaning LLC`;
  const description = service.seo.description.includes("Virginia Beach")
    ? service.seo.description
    : `${service.name} in Virginia Beach and Hampton Roads from Shoreline Cleaning LLC. Request a free quote and we'll follow up by call, text, or email.`;
  return { ...service, seo: { ...service.seo, title, description } };
}

function publicService(service: Service): Service | null {
  const renamed =
    service.slug === "move-in-move-out-cleaning"
      ? { ...service, slug: "post-move-out-cleaning", name: "Post Move-Out Cleaning" }
      : service.slug === "recurring-cleaning"
        ? { ...service, name: "Recurring Cleaning (Weekly/Monthly)" }
        : service.slug === "commercial-office-cleaning"
          ? { ...service, name: "Commercial/Office Cleaning" }
          : service.slug === "airbnb-turnover-cleaning"
            ? { ...service, name: "Airbnb/Short-Term Rental Turnover Cleaning" }
            : service;
  if (!OFFERED_SLUGS.has(renamed.slug) || !renamed.published) return null;
  return { ...renamed, pricingNote: "" };
}

function sanityConfigured() {
  const id = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  return Boolean(id && id !== "placeholder");
}

function client() {
  if (!sanityConfigured()) return null;
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2026-09-01",
    useCdn: false,
  });
}

async function fetchOrFallback<T>(query: string, fallback: T): Promise<T> {
  const sanity = client();
  if (!sanity) return fallback;
  try {
    const data = await sanity.fetch<T | null>(query, {}, { next: { revalidate: 60 } });
    return data ?? fallback;
  } catch {
    return fallback;
  }
}

type Lookup<T> = { status: "unavailable" } | { status: "missing" } | { status: "found"; data: T };

/** Per-slug read. A cache miss hits Sanity, so a doc published after the last deploy still resolves. */
async function fetchLookup<T>(query: string, params: Record<string, unknown>): Promise<Lookup<T>> {
  const sanity = client();
  if (!sanity) return { status: "unavailable" };
  try {
    const data = await sanity.fetch<T | null>(query, params, { next: { revalidate: 60 } });
    if (!data) return { status: "missing" };
    return { status: "found", data };
  } catch {
    return { status: "unavailable" };
  }
}

function text(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

export function getFallbackContent(): SiteContent {
  return fallbackContent;
}

export async function getSettings(): Promise<SiteSettings> {
  const base: SiteSettings = {
    ...fallbackContent.settings,
    email: PUBLIC_EMAIL,
    phone: PUBLIC_PHONE,
    textNumber: PUBLIC_PHONE,
    googleReviewButtonLabel: "CLICK HERE TO LEAVE A GOOGLE REVIEW!",
    googleReviewUrl: GOOGLE_REVIEW_URL,
  };
  const remote = await fetchOrFallback<{
    businessName?: string;
    tagline?: string;
    footerNote?: string;
    serviceAreaLine?: string;
    googleReviewUrl?: string;
    googleBusinessUrl?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    logo?: { src?: string; alt?: string };
    seoTitle?: string;
    seoDescription?: string;
  } | null>(
    `*[_id == "siteSettings"][0]{
      businessName, tagline, footerNote, serviceAreaLine, googleReviewUrl, seoTitle, seoDescription,
      googleBusinessUrl, facebookUrl, instagramUrl,
      "logo": logo{ "src": asset->url, alt }
    }`,
    null,
  );
  if (!remote?.businessName) return base;
  return {
    ...base,
    businessName: text(remote.businessName, base.businessName),
    tagline: text(remote.tagline, base.tagline),
    footerNote: text(remote.footerNote, base.footerNote),
    serviceAreaLine: text(remote.serviceAreaLine, base.serviceAreaLine),
    googleReviewUrl:
      remote.googleReviewUrl &&
      !remote.googleReviewUrl.startsWith("[") &&
      !remote.googleReviewUrl.includes("google.com/search?q=")
        ? remote.googleReviewUrl
        : base.googleReviewUrl,
    social: {
      ...base.social,
      googleBusiness: text(remote.googleBusinessUrl, base.social.googleBusiness ?? ""),
      facebook: text(remote.facebookUrl, base.social.facebook ?? ""),
      instagram: text(remote.instagramUrl, base.social.instagram ?? ""),
    },
    logo: remote.logo?.src
      ? { src: remote.logo.src, alt: remote.logo.alt || `${base.businessName} logo` }
      : base.logo,
    seo: {
      ...base.seo,
      title: text(remote.seoTitle, base.seo.title),
      description: text(remote.seoDescription, base.seo.description),
    },
  };
}

export async function getHome(): Promise<HomePageContent> {
  const home = fallbackContent.home;
  const live = {
    ...home,
    featuredServiceSlugs: [
      "house-cleaning-virginia-beach",
      "small-business-cleaning-virginia-beach",
      "deep-cleaning",
      "post-move-out-cleaning",
      "recurring-cleaning",
      "commercial-office-cleaning",
      "airbnb-turnover-cleaning",
    ],
    howItWorksSteps: [
      {
        title: "Request a Quote",
        description:
          "Fill out our intake form with information on your address, type of cleaning service you're requesting and all additional info you can provide, so that we can provide the best quote for the job!",
      },
      {
        title: "Talk with Us",
        description:
          "Once we receive your intake form, we'll reach out to schedule the best time to call, text or email to discuss our fee and to schedule our first cleaning service.",
      },
      {
        title: "Enjoy a cleaner space",
        description:
          "Once we've agreed and gotten the job on our schedule, we'll provide tips on how to prepare for our first service. Leave the rest to us!",
      },
    ],
    serviceAreaBody:
      "Since 2018 we have served clients across Hampton Roads, including Virginia Beach, Norfolk, Chesapeake, Suffolk, Hampton, and Newport News, with work extending into Williamsburg and parts of North Carolina (Elizabeth City and Moyock).",
    seo: {
      ...home.seo,
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
    },
  };
  const remote = await fetchOrFallback<{
    heroEyebrow?: string;
    heroHeadline?: string;
    heroSubheadline?: string;
    heroPrimaryCta?: string;
    introHeading?: string;
    introBody?: string;
    howItWorksHeading?: string;
    howItWorksIntro?: string;
    howItWorksSteps?: { title?: string; description?: string }[];
    highlights?: { title?: string; description?: string }[];
    closingHeading?: string;
    closingBody?: string;
    seoTitle?: string;
    seoDescription?: string;
    heroImage?: { src?: string; alt?: string };
  } | null>(
    `*[_id == "homePage"][0]{
      heroEyebrow, heroHeadline, heroSubheadline, heroPrimaryCta,
      introHeading, introBody, howItWorksHeading, howItWorksIntro,
      howItWorksSteps[]{title, description}, highlights[]{title, description},
      closingHeading, closingBody, seoTitle, seoDescription,
      "heroImage": heroImage{ "src": asset->url, alt }
    }`,
    null,
  );
  if (!remote?.heroHeadline) return live;
  const steps = (remote.howItWorksSteps ?? []).filter((step) => step.title);
  const highlights = (remote.highlights ?? []).filter((item) => item.title);
  return {
    ...live,
    heroEyebrow: text(remote.heroEyebrow, live.heroEyebrow),
    heroHeadline: text(remote.heroHeadline, live.heroHeadline),
    heroSubheadline: text(remote.heroSubheadline, live.heroSubheadline),
    heroPrimaryCta: text(remote.heroPrimaryCta, live.heroPrimaryCta),
    heroImage: remote.heroImage?.src
      ? {
          ...live.heroImage,
          src: remote.heroImage.src,
          alt: remote.heroImage.alt || live.heroImage.alt,
        }
      : live.heroImage,
    introHeading: text(remote.introHeading, live.introHeading),
    introBody: text(remote.introBody, live.introBody),
    howItWorksHeading: text(remote.howItWorksHeading, live.howItWorksHeading),
    howItWorksIntro: text(remote.howItWorksIntro, live.howItWorksIntro),
    howItWorksSteps: steps.length
      ? steps.map((step) => ({ title: step.title as string, description: step.description || "" }))
      : live.howItWorksSteps,
    highlights: highlights.length
      ? highlights.map((item) => ({
          title: item.title as string,
          description: item.description || "",
        }))
      : live.highlights,
    closingHeading: text(remote.closingHeading, live.closingHeading),
    closingBody: text(remote.closingBody, live.closingBody),
    seo: {
      ...live.seo,
      title: resolveHomeTitle(remote.seoTitle, live.seo.title),
      description: text(remote.seoDescription, live.seo.description),
    },
  };
}

export async function getAbout(): Promise<AboutPage> {
  const about = fallbackContent.about;
  const remote = await fetchOrFallback<{
    heading?: string;
    storyHeading?: string;
    story?: string[];
    whyItems?: { title?: string; description?: string }[];
    values?: { title?: string; description?: string }[];
    community?: string;
    seoTitle?: string;
    seoDescription?: string;
  } | null>(
    `*[_id == "aboutPage"][0]{
      heading, storyHeading, story, whyItems[]{title, description}, values[]{title, description}, community,
      seoTitle, seoDescription
    }`,
    null,
  );
  if (!remote?.heading) return about;
  const story = (remote.story ?? []).filter(
    (paragraph) => typeof paragraph === "string" && paragraph.trim(),
  );
  const whyItems = (remote.whyItems ?? []).filter((item) => item.title);
  const values = (remote.values ?? []).filter((item) => item.title);
  return {
    ...about,
    heading: text(remote.heading, about.heading),
    storyHeading: text(remote.storyHeading, about.storyHeading),
    story: story.length ? story : about.story,
    whyItems: whyItems.length
      ? whyItems.map((item) => ({
          title: item.title as string,
          description: item.description || "",
        }))
      : about.whyItems,
    values: values.length
      ? values.map((item) => ({ title: item.title as string, description: item.description || "" }))
      : about.values,
    community: text(remote.community, about.community),
    seo: {
      ...about.seo,
      title: text(remote.seoTitle, about.seo.title),
      description: text(remote.seoDescription, about.seo.description),
    },
  };
}

export async function getServices(): Promise<Service[]> {
  const live = fallbackContent.services
    .map(publicService)
    .filter((service): service is Service => Boolean(service))
    .sort((a, b) => a.order - b.order);
  const remote = await fetchOrFallback<
    {
      slug?: string;
      name?: string;
      shortDescription?: string;
      overview?: string;
      included?: string[];
      notIncluded?: string[];
      idealFor?: string[];
      featured?: boolean;
      order?: number;
      image?: { src?: string; alt?: string };
      seoTitle?: string;
      seoDescription?: string;
      _updatedAt?: string;
    }[]
  >(
    `*[_type == "service" && published == true]{
      _updatedAt,
      "slug": slug.current, name, shortDescription, overview, included, notIncluded, idealFor,
      featured, order, seoTitle, seoDescription,
      "image": image{ "src": asset->url, alt }
    }`,
    [],
  );
  if (!remote.length) return live.map(localizeServiceSeo);
  const bySlug = new Map(live.map((service) => [service.slug, service]));
  const mapped = remote
    .filter((service) => service.slug && OFFERED_SLUGS.has(service.slug))
    .map((service) => {
      const base = bySlug.get(service.slug as string) ?? live[0];
      return {
        ...base,
        slug: service.slug as string,
        name: text(service.name, base.name),
        shortDescription: text(service.shortDescription, base.shortDescription),
        overview: text(service.overview, base.overview),
        included: service.included?.length ? service.included : base.included,
        notIncluded: service.notIncluded?.length ? service.notIncluded : base.notIncluded,
        idealFor: service.idealFor?.length ? service.idealFor : base.idealFor,
        image: service.image?.src
          ? { ...base.image, src: service.image.src, alt: service.image.alt || base.image.alt }
          : base.image,
        featured: service.featured ?? base.featured,
        order: typeof service.order === "number" ? service.order : base.order,
        published: true,
        pricingNote: "",
        updatedAt: typeof service._updatedAt === "string" ? service._updatedAt : undefined,
        seo: {
          ...base.seo,
          title: text(service.seoTitle, base.seo.title),
          description: text(service.seoDescription, base.seo.description),
        },
      };
    })
    .sort((a, b) => a.order - b.order);
  return (mapped.length ? mapped : live).map(localizeServiceSeo);
}

type RemoteService = {
  slug?: string;
  name?: string;
  shortDescription?: string;
  overview?: string;
  included?: string[];
  notIncluded?: string[];
  idealFor?: string[];
  featured?: boolean;
  order?: number;
  image?: { src?: string; alt?: string };
  seoTitle?: string;
  seoDescription?: string;
  _updatedAt?: string;
};

function offeredFallbackServices(): Service[] {
  return fallbackContent.services
    .map(publicService)
    .filter((service): service is Service => Boolean(service))
    .sort((a, b) => a.order - b.order);
}

function applyRemoteService(service: RemoteService, base: Service): Service {
  return localizeServiceSeo({
    ...base,
    slug: service.slug as string,
    name: text(service.name, base.name),
    shortDescription: text(service.shortDescription, base.shortDescription),
    overview: text(service.overview, base.overview),
    included: service.included?.length ? service.included : base.included,
    notIncluded: service.notIncluded?.length ? service.notIncluded : base.notIncluded,
    idealFor: service.idealFor?.length ? service.idealFor : base.idealFor,
    image: service.image?.src
      ? { ...base.image, src: service.image.src, alt: service.image.alt || base.image.alt }
      : base.image,
    featured: service.featured ?? base.featured,
    order: typeof service.order === "number" ? service.order : base.order,
    published: true,
    pricingNote: "",
    updatedAt: typeof service._updatedAt === "string" ? service._updatedAt : undefined,
    seo: {
      ...base.seo,
      title: text(service.seoTitle, base.seo.title),
      description: text(service.seoDescription, base.seo.description),
    },
  });
}

const SERVICE_BY_SLUG = `*[_type == "service" && published == true && slug.current == $slug][0]{
  _updatedAt,
  "slug": slug.current, name, shortDescription, overview, included, notIncluded, idealFor,
  featured, order, seoTitle, seoDescription,
  "image": image{ "src": asset->url, alt }
}`;

export async function getService(slug: string): Promise<Service | undefined> {
  if (!OFFERED_SLUGS.has(slug)) return undefined;
  const lookedUp = await fetchLookup<RemoteService>(SERVICE_BY_SLUG, { slug });
  if (lookedUp.status === "missing") return undefined;
  if (lookedUp.status === "found" && lookedUp.data.slug && OFFERED_SLUGS.has(lookedUp.data.slug)) {
    const live = offeredFallbackServices();
    const base = live.find((service) => service.slug === lookedUp.data.slug) ?? live[0];
    if (!base) return undefined;
    return applyRemoteService(lookedUp.data, base);
  }
  const services = await getServices();
  return services.find((service) => service.slug === slug);
}

export async function getGallery(): Promise<GalleryItem[]> {
  return [...fallbackContent.gallery].sort((a, b) => a.order - b.order);
}

function portableTextToParagraphs(body: unknown): string[] {
  if (!Array.isArray(body)) return [];
  const paragraphs: string[] = [];
  for (const block of body) {
    if (typeof block === "string") {
      if (block.trim()) paragraphs.push(block.trim());
      continue;
    }
    if (!block || typeof block !== "object") continue;
    const children = (block as { children?: { text?: string }[] }).children;
    if (!Array.isArray(children)) continue;
    const text = children
      .map((child) => child?.text ?? "")
      .join("")
      .trim();
    if (text) paragraphs.push(text);
  }
  return paragraphs;
}

export async function getBeforeAfter(): Promise<BeforeAfterPair[]> {
  const fallback = [...fallbackContent.beforeAfter]
    .map((pair) => ({ ...pair, isSample: true }))
    .sort((a, b) => a.order - b.order);
  const remote = await fetchOrFallback<
    {
      id?: string;
      title?: string;
      caption?: string;
      category?: BeforeAfterPair["category"];
      order?: number;
      before?: { src?: string; alt?: string };
      after?: { src?: string; alt?: string };
    }[]
  >(
    `*[_type == "beforeAfter"] | order(order asc){
      "id": _id, title, caption, category, order,
      "before": before{ "src": asset->url, alt },
      "after": after{ "src": asset->url, alt }
    }`,
    [],
  );
  if (!remote.length) return fallback;
  const mapped = remote
    .filter((pair) => pair.title && pair.before?.src && pair.after?.src)
    .map((pair) => ({
      id: pair.id || (pair.title as string),
      title: pair.title as string,
      caption: pair.caption,
      category: pair.category,
      before: {
        src: pair.before?.src as string,
        alt: pair.before?.alt || `${pair.title} before cleaning`,
      },
      after: {
        src: pair.after?.src as string,
        alt: pair.after?.alt || `${pair.title} after cleaning`,
      },
      order: typeof pair.order === "number" ? pair.order : 0,
      isSample: isSampleCopy(`${pair.title ?? ""}\n${pair.caption ?? ""}`),
    }))
    .sort((a, b) => a.order - b.order);
  return mapped.length ? mapped : fallback;
}

export async function getReviews(): Promise<Review[]> {
  return [...fallbackContent.reviews]
    .map((review) => ({
      ...review,
      isSample: false,
    }))
    .sort((a, b) => a.order - b.order);
}

export async function getFaqs(): Promise<Faq[]> {
  const overrides: Record<string, Partial<Faq>> = {
    "how-quoting-works": {
      answer:
        "Simply fill out our intake form on this website and we'll set up a good time to call, text or email. Every quote is based on your space after that short intake. Personalizing your cleaning plan is important to us and varies from client to client. Once we've reviewed your needs and discussed with you directly, we'll provide a quote.",
    },
    payment: {
      answer:
        "Payment details and arrangements will be discussed and agreed upon during our call, text or email after receiving your initial intake form.",
    },
    pets: {
      question: "Do you clean homes that have pets?",
      answer:
        "Yes, we clean plenty of homes with various types of pets. We can discuss the details of your living arrangement and the number and types of pets you have to determine the best plan for you!",
    },
    "service-area": {
      question:
        "My address is outside of the places mentioned in your Service Areas. Are you able to help me?",
      answer:
        "We generally serve clients throughout Hampton Roads and the areas we mentioned in the Service Areas section of this website. However, if you are outside of those listed areas, we can discuss your needs after you complete the initial intake form and determine if our company is a good fit for you!",
    },
  };
  const live = [...fallbackContent.faqs]
    .map((faq) => ({ ...faq, ...overrides[faq.id] }))
    .sort((a, b) => a.order - b.order);
  const remote = await fetchOrFallback<Faq[]>(
    `*[_type == "faq" && defined(question)] | order(order asc) {
      "id": _id, question, answer, category, order
    }`,
    [],
  );
  return remote.length ? remote : live;
}

export async function getTeam(): Promise<TeamMember[]> {
  return [...fallbackContent.team].sort((a, b) => a.order - b.order);
}

export async function getPosts(): Promise<BlogPost[]> {
  const fallback = fallbackContent.posts
    .filter((post) => post.published)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  const remote = await fetchOrFallback<
    {
      slug?: string;
      title?: string;
      excerpt?: string;
      author?: string;
      category?: string;
      publishedAt?: string;
      isPlaceholder?: boolean;
      body?: unknown;
      seoTitle?: string;
      seoDescription?: string;
      noIndex?: boolean;
      _updatedAt?: string;
      featuredImage?: { src?: string; alt?: string };
      relatedSlugs?: string[];
    }[]
  >(
    `*[_type == "blogPost" && published == true]{
      "slug": slug.current, title, excerpt, author, publishedAt, isPlaceholder,
      body, seoTitle, seoDescription, noIndex, _updatedAt,
      "category": category->slug.current,
      "featuredImage": featuredImage{ "src": asset->url, alt },
      "relatedSlugs": relatedPosts[]->slug.current
    }`,
    [],
  );
  if (!remote.length) return fallback;
  const bySlug = new Map(fallback.map((post) => [post.slug, post]));
  const mapped = remote
    .filter((post) => post.slug && post.title)
    .map((post) => {
      const base = bySlug.get(post.slug as string);
      const body = portableTextToParagraphs(post.body);
      const next: BlogPost = {
        slug: post.slug as string,
        title: text(post.title, base?.title ?? ""),
        excerpt: text(post.excerpt, base?.excerpt ?? ""),
        author: text(post.author, base?.author ?? "Shoreline Cleaning LLC"),
        category: text(post.category, base?.category ?? ""),
        publishedAt: text(post.publishedAt, base?.publishedAt ?? ""),
        featuredImage: post.featuredImage?.src
          ? {
              src: post.featuredImage.src,
              alt: post.featuredImage.alt || base?.featuredImage.alt || (post.title as string),
            }
          : (base?.featuredImage ?? {
              src: "/images/living-room.webp",
              alt: "Shoreline Cleaning LLC",
            }),
        relatedSlugs: post.relatedSlugs?.filter(Boolean) ?? base?.relatedSlugs,
        isPlaceholder: Boolean(post.isPlaceholder),
        published: true,
        updatedAt: typeof post._updatedAt === "string" ? post._updatedAt : undefined,
        body: body.length ? body : (base?.body ?? []),
        seo: {
          title: text(post.seoTitle, base?.seo.title ?? `${post.title} | Shoreline Cleaning LLC`),
          description: text(post.seoDescription, base?.seo.description ?? ""),
          noIndex: post.noIndex || undefined,
        },
      };
      if (isPlaceholderPost(next)) next.isPlaceholder = true;
      return next;
    })
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  return mapped.length ? mapped : fallback;
}

export async function getPageUpdatedAt(): Promise<Record<string, string | undefined>> {
  const sanity = client();
  if (!sanity) return {};
  try {
    const data = await sanity.fetch<{
      home?: string | null;
      about?: string | null;
      areas?: string | null;
      faq?: string | null;
    } | null>(`{
      "home": *[_id == "homePage"][0]._updatedAt,
      "about": *[_id == "aboutPage"][0]._updatedAt,
      "areas": *[_id == "serviceAreasPage"][0]._updatedAt,
      "faq": *[_type == "faq"] | order(_updatedAt desc)[0]._updatedAt
    }`);
    if (!data) return {};
    return {
      "/": data.home ?? undefined,
      "/about": data.about ?? undefined,
      "/service-areas": data.areas ?? undefined,
      "/faq": data.faq ?? undefined,
    };
  } catch {
    return {};
  }
}

type RemotePost = {
  slug?: string;
  title?: string;
  excerpt?: string;
  author?: string;
  category?: string;
  publishedAt?: string;
  isPlaceholder?: boolean;
  body?: unknown;
  seoTitle?: string;
  seoDescription?: string;
  noIndex?: boolean;
  _updatedAt?: string;
  featuredImage?: { src?: string; alt?: string };
  relatedSlugs?: string[];
};

function applyRemotePost(post: RemotePost, base: BlogPost | undefined): BlogPost {
  const body = portableTextToParagraphs(post.body);
  const next: BlogPost = {
    slug: post.slug as string,
    title: text(post.title, base?.title ?? ""),
    excerpt: text(post.excerpt, base?.excerpt ?? ""),
    author: text(post.author, base?.author ?? "Shoreline Cleaning LLC"),
    category: text(post.category, base?.category ?? ""),
    publishedAt: text(post.publishedAt, base?.publishedAt ?? ""),
    featuredImage: post.featuredImage?.src
      ? {
          src: post.featuredImage.src,
          alt: post.featuredImage.alt || base?.featuredImage.alt || (post.title as string),
        }
      : (base?.featuredImage ?? {
          src: "/images/living-room.webp",
          alt: "Shoreline Cleaning LLC",
        }),
    relatedSlugs: post.relatedSlugs?.filter(Boolean) ?? base?.relatedSlugs,
    isPlaceholder: Boolean(post.isPlaceholder),
    published: true,
    updatedAt: typeof post._updatedAt === "string" ? post._updatedAt : undefined,
    body: body.length ? body : (base?.body ?? []),
    seo: {
      title: text(post.seoTitle, base?.seo.title ?? `${post.title} | Shoreline Cleaning LLC`),
      description: text(post.seoDescription, base?.seo.description ?? ""),
      noIndex: post.noIndex || undefined,
    },
  };
  if (isPlaceholderPost(next)) next.isPlaceholder = true;
  return next;
}

const POST_BY_SLUG = `*[_type == "blogPost" && published == true && slug.current == $slug][0]{
  "slug": slug.current, title, excerpt, author, publishedAt, isPlaceholder,
  body, seoTitle, seoDescription, noIndex, _updatedAt,
  "category": category->slug.current,
  "featuredImage": featuredImage{ "src": asset->url, alt },
  "relatedSlugs": relatedPosts[]->slug.current
}`;

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  const lookedUp = await fetchLookup<RemotePost>(POST_BY_SLUG, { slug });
  if (lookedUp.status === "missing") return undefined;
  if (lookedUp.status === "found" && lookedUp.data.slug && lookedUp.data.title) {
    const base = fallbackContent.posts.find((post) => post.slug === lookedUp.data.slug);
    return applyRemotePost(lookedUp.data, base);
  }
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getServiceAreas(): Promise<ServiceAreasPage> {
  const live: ServiceAreasPage = {
    seo: {
      title: "Service Areas | Shoreline Cleaning LLC | 757 & Hampton Roads",
      description:
        "Shoreline Cleaning LLC serves Virginia Beach, Norfolk, Chesapeake, Suffolk, Hampton, Newport News, Williamsburg, and parts of North Carolina including Elizabeth City and Moyock.",
    },
    heading: "Service areas",
    intro:
      "Since 2018, we are privileged to have served over 50+ clients in the general Hampton Roads region including Virginia Beach, Norfolk, Chesapeake, Suffolk, Hampton, and Newport News....with clients extending into Williamsburg, Virginia and parts of North Carolina (Elizabeth City and Moyock). What makes us stand out from other cleaning companies in our community is the value we place on our client relationships and consistent quality of service. For that reason, we are proud of the fact that most of our clients have remained on our regular schedule (weekly or monthly).",
    areas: [
      { name: "Virginia Beach" },
      { name: "Norfolk" },
      { name: "Chesapeake" },
      { name: "Suffolk" },
      { name: "Hampton" },
      { name: "Newport News" },
      { name: "Williamsburg" },
      { name: "Elizabeth City, NC" },
      { name: "Moyock, NC" },
    ],
    outsideAreaNote:
      "Simply fill out our intake form and when we discuss via call, text or email, we can determine if our company is a good fit for your needs!",
  };
  const remote = await fetchOrFallback<{
    heading?: string;
    intro?: string;
    areas?: { name?: string; note?: string }[];
    outsideAreaNote?: string;
    seoTitle?: string;
    seoDescription?: string;
  } | null>(
    `*[_id == "serviceAreasPage"][0]{
      heading, intro, areas[]{name, note}, outsideAreaNote, seoTitle, seoDescription
    }`,
    null,
  );
  if (!remote?.heading) return live;
  const areas = (remote.areas ?? []).filter((area) => area.name);
  return {
    ...live,
    heading: text(remote.heading, live.heading),
    intro: text(remote.intro, live.intro),
    areas: areas.length
      ? areas.map((area) => ({ name: area.name as string, note: area.note }))
      : live.areas,
    outsideAreaNote: text(remote.outsideAreaNote, live.outsideAreaNote),
    seo: {
      ...live.seo,
      title: text(remote.seoTitle, live.seo.title),
      description: text(remote.seoDescription, live.seo.description),
    },
  };
}

export async function getLegal(slug: "privacy" | "terms"): Promise<LegalPage | undefined> {
  return fallbackContent.legal.find((p) => p.slug === slug);
}

export async function getSiteContent(): Promise<SiteContent> {
  const [
    settings,
    home,
    about,
    services,
    gallery,
    beforeAfter,
    reviews,
    faqs,
    team,
    posts,
    serviceAreas,
  ] = await Promise.all([
    getSettings(),
    getHome(),
    getAbout(),
    getServices(),
    getGallery(),
    getBeforeAfter(),
    getReviews(),
    getFaqs(),
    getTeam(),
    getPosts(),
    getServiceAreas(),
  ]);
  return {
    settings,
    home,
    about,
    services,
    gallery,
    beforeAfter,
    reviews,
    faqs,
    team,
    posts,
    blogCategories: fallbackContent.blogCategories,
    serviceAreas,
    legal: fallbackContent.legal,
  };
}

export { sanityConfigured as isSanityConfigured };
