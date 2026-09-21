import type { Metadata } from "next";
import { Container, Section } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { getLegal, getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getLegal("terms"), getSettings()]);
  return buildMetadata({
    seo: page?.seo ?? { title: "Terms of Use", description: "Terms of use" },
    path: "/terms",
    settings,
  });
}

export default async function TermsPage() {
  const page = await getLegal("terms");
  if (!page) return null;
  return (
    <>
      <PageHero heading={page.title} body={`Last updated ${page.lastUpdated}`} />
      <Section>
        <Container className="max-w-3xl space-y-4 text-base leading-relaxed text-muted">
          {page.isTemplate ? (
            <p className="rounded-[16px] bg-sample-bg px-4 py-3 text-sm text-sample">
              Template — review with counsel before using this as your official terms of use.
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
