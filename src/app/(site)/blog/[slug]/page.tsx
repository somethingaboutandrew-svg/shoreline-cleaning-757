import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Container, Section } from "@/components/site/container";
import { CtaBanner } from "@/components/site/cta-banner";
import { getPost, getPosts, getSettings } from "@/lib/content";
import { isPlaceholderPost } from "@/lib/sample-content";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getPost(slug), getSettings()]);
  if (!post) notFound();
  return buildMetadata({
    seo: { ...post.seo, noIndex: post.seo.noIndex || isPlaceholderPost(post) },
    path: `/blog/${post.slug}`,
    settings,
    fallbackImage: post.featuredImage,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([getPost(slug), getPosts()]);
  if (!post) notFound();
  const related = posts.filter(
    (item) => post.relatedSlugs?.includes(item.slug) && !isPlaceholderPost(item),
  );

  return (
    <>
      <article>
        <header className="border-b border-border bg-white">
          <Container className="max-w-3xl py-12">
            <Breadcrumbs
              className="mb-4"
              items={[
                { name: "Home", href: "/" },
                { name: "Blog", href: "/blog" },
                { name: post.title, href: `/blog/${post.slug}` },
              ]}
            />
            {post.isPlaceholder ? (
              <p className="mb-3 inline-flex rounded-full bg-sample-bg px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-sample">
                Sample / placeholder article
              </p>
            ) : null}
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-aqua">
              Cleaning tips
            </p>
            <h1 className="mt-3 text-4xl sm:text-5xl">{post.title}</h1>
            <p className="mt-4 text-sm text-muted">
              {post.author} ·{" "}
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </Container>
        </header>
        <div className="relative mx-auto aspect-[16/8] max-w-5xl overflow-hidden sm:rounded-b-[28px]">
          <Image
            src={post.featuredImage.src}
            alt={post.featuredImage.alt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <Section>
          <Container className="max-w-3xl space-y-5 text-base leading-relaxed text-ink">
            {post.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Container>
        </Section>
      </article>
      {related.length ? (
        <Section className="bg-white">
          <Container>
            <h2 className="text-3xl">Related posts</h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="block rounded-[20px] bg-foam p-5 shadow-card"
                  >
                    <span className="font-display text-xl text-navy">{item.title}</span>
                    <span className="mt-2 block text-sm text-muted">{item.excerpt}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}
      <CtaBanner
        heading="Need the actual cleaning, not just the tips?"
        body="Request a quote. We'll follow up by call, text, or email."
      />
    </>
  );
}
