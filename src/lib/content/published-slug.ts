import { fallbackContent } from "@/lib/content/fallback";
import { OFFERED_SLUGS } from "@/lib/content/offered-slugs";

function sanityProjectId() {
  const id = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!id || id === "placeholder") return null;
  return id;
}

function fallbackServiceSlugs() {
  const slugs = new Set<string>();
  for (const service of fallbackContent.services) {
    if (!service.published) continue;
    const slug =
      service.slug === "move-in-move-out-cleaning" ? "post-move-out-cleaning" : service.slug;
    if (OFFERED_SLUGS.has(slug)) slugs.add(slug);
  }
  return slugs;
}

function fallbackPostSlugs() {
  return new Set(fallbackContent.posts.filter((post) => post.published).map((post) => post.slug));
}

/** null when Sanity is not configured or the request failed. */
async function publishedInSanity(type: "service" | "blogPost", slug: string): Promise<boolean | null> {
  const projectId = sanityProjectId();
  if (!projectId) return null;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const query = `*[_type == "${type}" && published == true && slug.current == $slug][0]{"ok": true}`;
  const url = new URL(`https://${projectId}.api.sanity.io/v2026-09-01/data/query/${dataset}`);
  url.searchParams.set("query", query);
  url.searchParams.set("$slug", JSON.stringify(slug));
  try {
    const response = await fetch(url, { next: { revalidate: 60 } });
    if (!response.ok) return null;
    const json = (await response.json()) as { result?: unknown };
    return Boolean(json.result);
  } catch {
    return null;
  }
}

export async function isPublishedServiceSlug(slug: string): Promise<boolean> {
  if (!OFFERED_SLUGS.has(slug)) return false;
  const remote = await publishedInSanity("service", slug);
  if (remote === null) return fallbackServiceSlugs().has(slug);
  return remote;
}

export async function isPublishedPostSlug(slug: string): Promise<boolean> {
  const remote = await publishedInSanity("blogPost", slug);
  if (remote === null) return fallbackPostSlugs().has(slug);
  return remote;
}
