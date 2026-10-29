import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container, Section } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { getFallbackContent, getPosts, getSettings } from "@/lib/content";
import { isPlaceholderPost } from "@/lib/sample-content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, posts] = await Promise.all([getSettings(), getPosts()]);
  const hasRealPosts = posts.some((post) => !isPlaceholderPost(post));
  return buildMetadata({
    seo: {
      title: "Cleaning Tips | Shoreline Cleaning LLC",
      description: hasRealPosts
        ? "Cleaning notes from Shoreline Cleaning LLC for homes and businesses in Virginia Beach and Hampton Roads."
        : "Cleaning notes from Shoreline Cleaning LLC.",
      noIndex: !hasRealPosts,
    },
    path: "/blog",
    settings,
  });
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [posts, content] = await Promise.all([getPosts(), Promise.resolve(getFallbackContent())]);
  const categories = content.blogCategories;
  const indexable = posts.filter((post) => !isPlaceholderPost(post));
  const visible = indexable.length ? indexable : posts;
  const filtered = category ? visible.filter((post) => post.category === category) : visible;

  return (
    <>
      <PageHero
        eyebrow="Cleaning tips"
        heading="Notes for a cleaner home"
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
        body={
          indexable.length
            ? "Notes on keeping a home or workplace clean, from Shoreline Cleaning LLC."
            : "Draft notes live here until a full article is published."
        }
      />
      <Section>
        <Container>
          <div className="flex flex-wrap gap-2">
            <FilterLink href="/blog" active={!category} label="All" />
            {categories.map((cat) => (
              <FilterLink
                key={cat.slug}
                href={`/blog?category=${cat.slug}`}
                active={category === cat.slug}
                label={cat.title}
              />
            ))}
          </div>
          {filtered.length === 0 ? (
            <p className="mt-8 text-muted">No posts in this category yet.</p>
          ) : (
            <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-card hover:shadow-card-hover"
                  >
                    <span className="relative block aspect-[16/10]">
                      <Image
                        src={post.featuredImage.src}
                        alt={post.featuredImage.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </span>
                    <span className="flex flex-1 flex-col p-5">
                      {post.isPlaceholder ? (
                        <span className="mb-2 inline-flex w-fit rounded-full bg-sample-bg px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-sample">
                          Sample article
                        </span>
                      ) : null}
                      <span className="font-display text-2xl text-navy group-hover:text-aqua">
                        {post.title}
                      </span>
                      <span className="mt-2 text-sm leading-relaxed text-muted">
                        {post.excerpt}
                      </span>
                      <span className="mt-4 text-xs text-muted">
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </Section>
    </>
  );
}

function FilterLink({ href, active, label }: { href: string; active: boolean; label: string }) {
  return (
    <Link
      href={href}
      className={
        active
          ? "inline-flex min-h-11 items-center rounded-full bg-navy px-4 text-sm font-medium text-white"
          : "inline-flex min-h-11 items-center rounded-full bg-white px-4 text-sm font-medium text-navy shadow-card"
      }
    >
      {label}
    </Link>
  );
}
