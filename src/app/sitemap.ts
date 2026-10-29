import type { MetadataRoute } from "next";
import { getPageUpdatedAt, getPosts, getServices } from "@/lib/content";
import { isPlaceholderPost } from "@/lib/sample-content";
import { SITE_URL } from "@/lib/site-config";

export const revalidate = 60;

function latest(stamps: (string | undefined)[]) {
  const times = stamps
    .filter((stamp): stamp is string => Boolean(stamp))
    .map((stamp) => new Date(stamp).getTime())
    .filter((time) => !Number.isNaN(time));
  if (!times.length) return undefined;
  return new Date(Math.max(...times)).toISOString();
}

function entry(
  path: string,
  priority: number,
  changeFrequency: "weekly" | "monthly",
  lastModified?: string,
): MetadataRoute.Sitemap[number] {
  const url = `${SITE_URL}${path}`;
  if (!lastModified) return { url, changeFrequency, priority };
  const date = new Date(lastModified);
  if (Number.isNaN(date.getTime())) return { url, changeFrequency, priority };
  return { url, changeFrequency, priority, lastModified: date };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, posts, updated] = await Promise.all([
    getServices(),
    getPosts(),
    getPageUpdatedAt(),
  ]);
  const indexablePosts = posts.filter((post) => !isPlaceholderPost(post));
  const serviceStamp = latest(services.map((service) => service.updatedAt));
  const postStamp = latest(indexablePosts.map((post) => post.updatedAt));

  const staticPages: MetadataRoute.Sitemap = [
    entry("", 1, "weekly", updated["/"]),
    entry("/services", 0.7, "weekly", serviceStamp),
    entry("/about", 0.7, "weekly", updated["/about"]),
    entry("/reviews", 0.7, "weekly"),
    entry("/service-areas", 0.7, "weekly", updated["/service-areas"]),
    entry("/faq", 0.7, "weekly", updated["/faq"]),
    ...(indexablePosts.length ? [entry("/blog", 0.7, "weekly", postStamp)] : []),
    entry("/contact", 0.7, "weekly"),
    entry("/privacy", 0.7, "weekly"),
    entry("/terms", 0.7, "weekly"),
  ];

  return [
    ...staticPages,
    ...services.map((service) =>
      entry(`/services/${service.slug}`, 0.6, "monthly", service.updatedAt),
    ),
    ...indexablePosts.map((post) => entry(`/blog/${post.slug}`, 0.5, "monthly", post.updatedAt)),
  ];
}
