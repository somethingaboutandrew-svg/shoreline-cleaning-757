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
  return fetchOrFallback(
    `*[_type == "siteSettings"][0]{
      businessName, tagline, phone, textNumber, email, address, hours, hoursSummary,
      serviceAreaLine, social, announcement, footerNote, analytics, cookieBannerEnabled,
      googleReviewUrl, googleReviewButtonLabel,
      "logo": logo{ "src": asset->url, alt, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height },
      seo{ title, description, noIndex, "ogImage": ogImage{ "src": asset->url, alt } }
    }`,
    fallbackContent.settings,
  );
}

export async function getHome(): Promise<HomePageContent> {
  return fallbackContent.home;
}

export async function getAbout(): Promise<AboutPage> {
  return fallbackContent.about;
}

export async function getServices(): Promise<Service[]> {
  return fallbackContent.services
    .filter((s) => s.published)
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
  return [...fallbackContent.reviews].sort((a, b) => a.order - b.order);
}

export async function getFaqs(): Promise<Faq[]> {
  return [...fallbackContent.faqs].sort((a, b) => a.order - b.order);
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
  return fallbackContent.serviceAreas;
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
