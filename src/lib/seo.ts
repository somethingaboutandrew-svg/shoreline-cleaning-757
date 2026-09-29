import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";
import type { CmsImage, SeoFields, SiteSettings } from "@/lib/content/types";
import { realValue } from "@/lib/placeholders";

export function absoluteUrl(path = "/") {
  const base = SITE_URL.replace(/\/$/, "");
  if (path.startsWith("http")) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
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

export function organizationJsonLd(settings: SiteSettings) {
  const phone = realValue(settings.phone);
  const email = realValue(settings.email);
  const address = realValue(settings.address);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.businessName,
    url: SITE_URL,
    email,
    telephone: phone,
    address: address
      ? { "@type": "PostalAddress", streetAddress: address }
      : undefined,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function localBusinessJsonLd(settings: SiteSettings) {
  const phone = realValue(settings.phone);
  const email = realValue(settings.email);
  const address = realValue(settings.address);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: settings.businessName,
    url: SITE_URL,
    areaServed: [
      { "@type": "City", name: "Virginia Beach" },
      { "@type": "City", name: "Norfolk" },
      { "@type": "City", name: "Chesapeake" },
      { "@type": "City", name: "Suffolk" },
      { "@type": "City", name: "Hampton" },
      { "@type": "City", name: "Newport News" },
      { "@type": "City", name: "Williamsburg" },
      "Hampton Roads",
    ],
    priceRange: "Quoted after intake",
  };
  if (phone) data.telephone = phone;
  if (email) data.email = email;
  if (address) {
    data.address = { "@type": "PostalAddress", streetAddress: address };
  }
  return data;
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
