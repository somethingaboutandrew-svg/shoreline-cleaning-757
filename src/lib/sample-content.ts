import type { BlogPost } from "@/lib/content/types";

const SAMPLE_PATTERN =
  /sample\s*\/\s*placeholder|sample article|sample photo|placeholder article|replace (?:it|them|this|the copy|these)?\s*in sanity|this is a sample/i;

export function isSampleCopy(value?: string | null): boolean {
  if (!value) return false;
  return SAMPLE_PATTERN.test(value);
}

export function isPlaceholderPost(
  post: Pick<BlogPost, "isPlaceholder" | "title" | "excerpt" | "body" | "seo">,
): boolean {
  if (post.isPlaceholder) return true;
  const blob = [post.title, post.excerpt, post.seo?.description, ...(post.body ?? [])]
    .filter(Boolean)
    .join("\n");
  return isSampleCopy(blob);
}
