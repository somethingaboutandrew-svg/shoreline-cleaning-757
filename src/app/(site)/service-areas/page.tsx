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
          <figure className="mt-10 overflow-hidden rounded-[20px] bg-white shadow-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/service-area-map.svg"
              alt="Map of Hampton Roads and nearby North Carolina towns served by Shoreline Cleaning LLC, with pins on Virginia Beach, Norfolk, Chesapeake, Suffolk, Hampton, Newport News, Williamsburg, Elizabeth City, and Moyock"
              className="h-auto w-full"
            />
          </figure>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted">{page.outsideAreaNote}</p>
        </Container>
      </Section>
      <CtaBanner
        heading="Not sure if we reach you?"
        body="Simply fill out our intake form and when we discuss via call, text or email, we can determine if our company is a good fit for your needs!"
      />
    </>
  );
}
