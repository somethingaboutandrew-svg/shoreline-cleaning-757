import { createClient } from "next-sanity";
import { GOOGLE_REVIEW_URL, PUBLIC_EMAIL, PUBLIC_PHONE } from "@/lib/site-config";
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

const OFFERED_SLUGS = new Set([
  "deep-cleaning",
  "post-move-out-cleaning",
  "recurring-cleaning",
  "commercial-office-cleaning",
  "airbnb-turnover-cleaning",
  "house-cleaning-virginia-beach",
  "commercial-cleaning-virginia-beach",
  "deep-cleaning-move-in-move-out",
  "small-business-cleaning-virginia-beach",
]);

function localizeServiceSeo(service: Service): Service {
  const title = service.seo.title.includes("Virginia Beach")
    ? service.seo.title
    : `${service.name} in Virginia Beach | Shoreline Cleaning LLC`;
  const description = service.seo.description.includes("Virginia Beach")
    ? service.seo.description
    : `${service.name} in Virginia Beach and Hampton Roads from Shoreline Cleaning LLC. Quotes after a short intake — no prices online.`;
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
    const data = await sanity.fetch<T | null>(query);
    return data ?? fallback;
  } catch {
    return fallback;
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
    seoTitle?: string;
    seoDescription?: string;
  } | null>(
    `*[_id == "siteSettings"][0]{
      businessName, tagline, footerNote, serviceAreaLine, googleReviewUrl, seoTitle, seoDescription
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
      title: "House Cleaning in Virginia Beach | Shoreline Cleaning LLC",
      description:
        "House cleaning in Virginia Beach and the 757 from Shoreline Cleaning LLC. Residential and commercial service across Hampton Roads. Request a free quote — we'll follow up by call, text, or email.",
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
      ? { ...live.heroImage, src: remote.heroImage.src, alt: remote.heroImage.alt || live.heroImage.alt }
      : live.heroImage,
    introHeading: text(remote.introHeading, live.introHeading),
    introBody: text(remote.introBody, live.introBody),
    howItWorksHeading: text(remote.howItWorksHeading, live.howItWorksHeading),
    howItWorksIntro: text(remote.howItWorksIntro, live.howItWorksIntro),
    howItWorksSteps: steps.length
      ? steps.map((step) => ({ title: step.title as string, description: step.description || "" }))
      : live.howItWorksSteps,
    highlights: highlights.length
      ? highlights.map((item) => ({ title: item.title as string, description: item.description || "" }))
      : live.highlights,
    closingHeading: text(remote.closingHeading, live.closingHeading),
    closingBody: text(remote.closingBody, live.closingBody),
    seo: {
      ...live.seo,
      title: remote.seoTitle?.includes("Virginia Beach")
        ? text(remote.seoTitle, live.seo.title)
        : live.seo.title,
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
  const story = (remote.story ?? []).filter((paragraph) => typeof paragraph === "string" && paragraph.trim());
  const whyItems = (remote.whyItems ?? []).filter((item) => item.title);
  const values = (remote.values ?? []).filter((item) => item.title);
  return {
    ...about,
    heading: text(remote.heading, about.heading),
    storyHeading: text(remote.storyHeading, about.storyHeading),
    story: story.length ? story : about.story,
    whyItems: whyItems.length
      ? whyItems.map((item) => ({ title: item.title as string, description: item.description || "" }))
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
    }[]
  >(
    `*[_type == "service" && published == true]{
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

export async function getService(slug: string): Promise<Service | undefined> {
  const services = await getServices();
  return services.find((s) => s.slug === slug);
}

export async function getGallery(): Promise<GalleryItem[]> {
  return [...fallbackContent.gallery].sort((a, b) => a.order - b.order);
}

export async function getBeforeAfter(): Promise<BeforeAfterPair[]> {
  return [...fallbackContent.beforeAfter].sort((a, b) => a.order - b.order);
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
        "Simply fill out our intake form on this website and we'll set up a good time to call, text or email. Personalizing your cleaning plan is important to us and varies from client to client. Once we've reviewed your needs and discussed with you directly, we'll provide a quote.",
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
      question: "My address is outside of the places mentioned in your Service Areas. Are you able to help me?",
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
  return fallbackContent.posts
    .filter((p) => p.published)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug);
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
    areas: areas.length ? areas.map((area) => ({ name: area.name as string, note: area.note })) : live.areas,
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
