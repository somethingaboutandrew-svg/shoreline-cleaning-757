import type { Service } from "@/lib/content/types";

/** Sibling offered services when a document has no relatedServices field. */
const RELATED_SERVICES: Record<string, readonly string[]> = {
  "house-cleaning-virginia-beach": [
    "recurring-cleaning",
    "deep-cleaning",
    "post-move-out-cleaning",
  ],
  "recurring-cleaning": [
    "house-cleaning-virginia-beach",
    "deep-cleaning",
    "post-move-out-cleaning",
  ],
  "deep-cleaning": [
    "house-cleaning-virginia-beach",
    "recurring-cleaning",
    "post-move-out-cleaning",
  ],
  "post-move-out-cleaning": [
    "deep-cleaning",
    "house-cleaning-virginia-beach",
    "recurring-cleaning",
  ],
  "small-business-cleaning-virginia-beach": [
    "commercial-office-cleaning",
    "deep-cleaning",
    "house-cleaning-virginia-beach",
  ],
  "commercial-office-cleaning": [
    "small-business-cleaning-virginia-beach",
    "deep-cleaning",
    "recurring-cleaning",
  ],
  "airbnb-turnover-cleaning": [
    "deep-cleaning",
    "house-cleaning-virginia-beach",
    "post-move-out-cleaning",
  ],
};

export function relatedServicesFor(slug: string, services: Service[]): Service[] {
  const offered = new Set(services.map((service) => service.slug));
  const preferred = (RELATED_SERVICES[slug] ?? []).filter(
    (item) => item !== slug && offered.has(item),
  );
  const extras = services
    .map((service) => service.slug)
    .filter((item) => item !== slug && !preferred.includes(item));
  return [...preferred, ...extras]
    .slice(0, 3)
    .map((item) => services.find((service) => service.slug === item))
    .filter((service): service is Service => Boolean(service));
}
