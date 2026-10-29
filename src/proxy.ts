import { NextResponse, type NextRequest } from "next/server";
import { isPublishedPostSlug, isPublishedServiceSlug } from "@/lib/content/published-slug";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const service = pathname.match(/^\/services\/([^/]+)$/);
  const post = pathname.match(/^\/blog\/([^/]+)$/);
  const slug = decodeURIComponent((service?.[1] ?? post?.[1] ?? "").trim());
  if (!slug) return NextResponse.next();

  const exists = service ? await isPublishedServiceSlug(slug) : await isPublishedPostSlug(slug);
  if (exists) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/__missing__";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/services/:slug", "/blog/:slug"],
};
