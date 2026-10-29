import type { Metadata } from "next";
import {
  GOOGLE_REVIEW_URL,
  PUBLIC_EMAIL,
  PUBLIC_PHONE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-config";
import type { CmsImage, SeoFields, Service, SiteSettings } from "@/lib/content/types";
import { httpHref, realValue } from "@/lib/placeholders";

const ORIGIN = SITE_URL.replace(/\/$/, "");

export const ORGANIZATION_ID = `${ORIGIN}/#organization`;
export const BUSINESS_ID = `${ORIGIN}/#business`;

const SERVICE_AREA_CITIES: readonly (readonly [string, string])[] = [
  ["Virginia Beach", "Virginia"],
  ["Norfolk", "Virginia"],
  ["Chesapeake", "Virginia"],
  ["Suffolk", "Virginia"],
  ["Hampton", "Virginia"],
  ["Newport News", "Virginia"],
  ["Williamsburg", "Virginia"],
  ["Elizabeth City", "North Carolina"],
  ["Moyock", "North Carolina"],
];

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
  seo,
  path,
  settings,
  fallbackImage,
}: {
  seo: SeoFields;
  path: string;
  settings: SiteSettings;
  fallbackImage?: CmsImage;
}): Metadata {
  const title = seo.title || settings.seo.title;
  const description = seo.description || settings.seo.description;
  const image = seo.ogImage ?? fallbackImage ?? settings.seo.ogImage;
  const url = absoluteUrl(path);
  const ogSrc = image?.src
    ? image.src.startsWith("http")
      ? image.src
      : absoluteUrl(image.src)
    : undefined;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    robots: seo.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: ogSrc
        ? [{ url: ogSrc, alt: image?.alt || title, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogSrc ? [ogSrc] : undefined,
    },
  };
}

export function areaServedJsonLd() {
  return [
    ...SERVICE_AREA_CITIES.map(([name, region]) => ({
      "@type": "City",
      name,
      containedInPlace: { "@type": "State", name: region },
    })),
    { "@type": "AdministrativeArea", name: "Hampton Roads" },
  ];
}

function sameAsLinks(settings: SiteSettings): string[] {
  const seen = new Set<string>();
  const links: string[] = [];
  for (const value of [
    settings.googleReviewUrl || GOOGLE_REVIEW_URL,
    settings.social.googleBusiness,
    settings.social.facebook,
    settings.social.instagram,
  ]) {
    const href = httpHref(value);
    if (!href || seen.has(href)) continue;
    seen.add(href);
    links.push(href);
  }
  if (!seen.has(GOOGLE_REVIEW_URL)) links.unshift(GOOGLE_REVIEW_URL);
  return links;
}

function businessImage(settings: SiteSettings) {
  const logo = settings.logo?.src ? absoluteUrl(settings.logo.src) : absoluteUrl("/favicon.svg");
  const image = settings.seo.ogImage?.src
    ? absoluteUrl(settings.seo.ogImage.src)
    : absoluteUrl("/og.jpg");
  return { logo, image };
}

export function organizationJsonLd(settings: SiteSettings) {
  const phone = realValue(settings.phone) || PUBLIC_PHONE;
  const email = realValue(settings.email) || PUBLIC_EMAIL;
  const { logo, image } = businessImage(settings);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: settings.businessName,
    url: ORIGIN,
    logo,
    image,
    email,
    telephone: phone,
    sameAs: sameAsLinks(settings),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${ORIGIN}/#website`,
    name: SITE_NAME,
    url: ORIGIN,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function localBusinessJsonLd(settings: SiteSettings) {
  const phone = realValue(settings.phone) || PUBLIC_PHONE;
  const email = realValue(settings.email) || PUBLIC_EMAIL;
  const { logo, image } = businessImage(settings);
  return {
    "@context": "https://schema.org",
    "@type": ["CleaningService", "LocalBusiness"],
    "@id": BUSINESS_ID,
    name: settings.businessName,
    url: ORIGIN,
    logo,
    image,
    telephone: phone,
    email,
    parentOrganization: { "@id": ORGANIZATION_ID },
    areaServed: areaServedJsonLd(),
    sameAs: sameAsLinks(settings),
    priceRange: "Quoted after intake",
  };
}

export function serviceJsonLd(service: Service) {
  const url = absoluteUrl(`/services/${service.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.name,
    serviceType: service.name,
    description: service.shortDescription || service.seo.description,
    url,
    provider: { "@id": BUSINESS_ID },
    areaServed: areaServedJsonLd(),
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
