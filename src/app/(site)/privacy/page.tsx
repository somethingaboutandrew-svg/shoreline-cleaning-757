import type { Metadata } from "next";
import { Container, Section } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { getLegal, getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getLegal("privacy"), getSettings()]);
  return buildMetadata({
    seo: page?.seo ?? { title: "Privacy Policy", description: "Privacy policy" },
    path: "/privacy",
    settings,
  });
}

export default async function PrivacyPage() {
  const page = await getLegal("privacy");
  if (!page) return null;
  return (
    <>
      <PageHero heading={page.title} body={`Last updated ${page.lastUpdated}`} />
      <Section>
        <Container className="max-w-3xl space-y-4 text-base leading-relaxed text-muted">
          {page.isTemplate ? (
            <p className="rounded-[16px] bg-sample-bg px-4 py-3 text-sm text-sample">
              Template — review with counsel before using this as your official privacy policy.
            </p>
          ) : null}
          {page.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Container>
      </Section>
    </>
  );
}
