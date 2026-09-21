import type { MetadataRoute } from "next";
import { getPosts, getServices } from "@/lib/content";
import { SITE_URL } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, posts] = await Promise.all([getServices(), getPosts()]);
  const staticPaths = [
    "",
    "/services",
    "/gallery",
    "/about",
    "/reviews",
    "/service-areas",
    "/faq",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
  ];
  return [
    ...staticPaths.map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...services.map((service) => ({
      url: `${SITE_URL}/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
