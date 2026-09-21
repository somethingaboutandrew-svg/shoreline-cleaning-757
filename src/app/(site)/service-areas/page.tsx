import type { Metadata } from "next";
import { Container, Section } from "@/components/site/container";
import { CtaBanner } from "@/components/site/cta-banner";
import { PageHero } from "@/components/site/page-hero";
import { getServiceAreas, getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getServiceAreas(), getSettings()]);
  return buildMetadata({ seo: page.seo, path: "/service-areas", settings });
}

export default async function ServiceAreasPage() {
  const page = await getServiceAreas();
  return (
    <>
      <PageHero eyebrow="Service areas" heading={page.heading} body={page.intro} />
      <Section>
        <Container>
          {page.areas.length === 0 ? (
            <div className="rounded-[20px] bg-white p-6 shadow-card">
              <p className="font-medium text-navy">No specific cities listed yet.</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Cities and communities will appear here after they are added in Sanity. Until then we use: serving the
                757 and surrounding Hampton Roads communities.
              </p>
            </div>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {page.areas.map((area) => (
                <li key={area.name} className="rounded-[20px] bg-white p-5 shadow-card">
                  <p className="font-display text-xl text-navy">{area.name}</p>
                  {area.note ? <p className="mt-1 text-sm text-muted">{area.note}</p> : null}
                </li>
              ))}
            </ul>
          )}
          {page.mapEmbedHtml ? (
            <div className="mt-10 overflow-hidden rounded-[20px] shadow-card" dangerouslySetInnerHTML={{ __html: page.mapEmbedHtml }} />
          ) : (
            <p className="mt-8 text-sm text-muted">Map embed is hidden until a map URL or embed is added in Sanity.</p>
          )}
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted">{page.outsideAreaNote}</p>
        </Container>
      </Section>
      <CtaBanner
        heading="Not sure if we reach you?"
        body="Request a quote with your city or ZIP. We'll tell you whether we can help."
      />
    </>
  );
}
