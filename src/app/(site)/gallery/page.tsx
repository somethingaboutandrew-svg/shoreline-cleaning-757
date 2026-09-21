import type { Metadata } from "next";
import { BeforeAfterSideBySide } from "@/components/site/before-after";
import { Container, Section } from "@/components/site/container";
import { CtaBanner } from "@/components/site/cta-banner";
import { GalleryGrid } from "@/components/site/gallery-grid";
import { PageHero } from "@/components/site/page-hero";
import { getBeforeAfter, getGallery, getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return buildMetadata({
    seo: {
      title: "Gallery | Shoreline Cleaning LLC",
      description:
        "Cleaning gallery and before-and-after photos from Shoreline Cleaning LLC. Sample images until real job photos are added in Sanity.",
    },
    path: "/gallery",
    settings,
  });
}

export default async function GalleryPage() {
  const [items, pairs] = await Promise.all([getGallery(), getBeforeAfter()]);
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        heading="Work worth looking at"
        body="Sample interior photos you can replace in Sanity. Every image has alt text. Click a photo to view it larger."
      />
      <Section>
        <Container>
          {items.length === 0 ? (
            <p className="text-muted">No gallery photos published yet.</p>
          ) : (
            <GalleryGrid items={items} />
          )}
        </Container>
      </Section>
      <Section className="bg-white">
        <Container>
          <h2 className="text-3xl">Before & after</h2>
          <p className="mt-2 max-w-2xl text-muted">
            Side-by-side pairs with a simple before/after toggle on the homepage. Replace these samples with real jobs.
          </p>
          <div className="mt-8 grid gap-8">
            {pairs.map((pair) => (
              <BeforeAfterSideBySide key={pair.id} pair={pair} />
            ))}
          </div>
        </Container>
      </Section>
      <CtaBanner
        heading="Want this kind of reset in your space?"
        body="Request a quote. We'll follow up by call, text, or email — no prices listed online."
      />
    </>
  );
}
