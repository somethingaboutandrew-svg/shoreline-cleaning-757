import { createClient } from "next-sanity";
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
]);

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
    useCdn: true,
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

export function getFallbackContent(): SiteContent {
  return fallbackContent;
}

export async function getSettings(): Promise<SiteSettings> {
  const settings = await fetchOrFallback(
    `*[_type == "siteSettings"][0]{
      businessName, tagline, phone, textNumber, email, address, hours, hoursSummary,
      serviceAreaLine, social, announcement, footerNote, analytics, cookieBannerEnabled,
      googleReviewUrl, googleReviewButtonLabel,
      "logo": logo{ "src": asset->url, alt, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height },
      seo{ title, description, noIndex, "ogImage": ogImage{ "src": asset->url, alt } }
    }`,
    fallbackContent.settings,
  );
  return {
    ...settings,
    email: "infoshorelinecleaning757@gmail.com",
    googleReviewButtonLabel: "CLICK HERE TO LEAVE A GOOGLE REVIEW!",
    googleReviewUrl:
      settings.googleReviewUrl && !settings.googleReviewUrl.startsWith("[")
        ? settings.googleReviewUrl
        : "https://www.google.com/search?q=Shoreline+Cleaning+LLC+Virginia+Beach+reviews",
  };
}

export async function getHome(): Promise<HomePageContent> {
  const home = fallbackContent.home;
  return {
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
  };
}

export async function getAbout(): Promise<AboutPage> {
  return fallbackContent.about;
}

export async function getServices(): Promise<Service[]> {
  return fallbackContent.services
    .map(publicService)
    .filter((s): s is Service => Boolean(s))
    .sort((a, b) => a.order - b.order);
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
      serviceType:
        review.serviceType === "Standard Residential Cleaning"
          ? "Deep Cleaning"
          : review.serviceType === "Move-In / Move-Out Cleaning"
            ? "Post Move-Out Cleaning"
            : review.serviceType === "Commercial / Office Cleaning"
              ? "Commercial/Office Cleaning"
              : review.serviceType,
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
  return [...fallbackContent.faqs]
    .map((faq) => ({ ...faq, ...overrides[faq.id] }))
    .sort((a, b) => a.order - b.order);
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
  return {
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
