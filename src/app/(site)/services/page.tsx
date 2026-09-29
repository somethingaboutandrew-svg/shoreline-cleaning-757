import type { Metadata } from "next";
import { Container, Section } from "@/components/site/container";
import { CtaBanner } from "@/components/site/cta-banner";
import { PageHero } from "@/components/site/page-hero";
import { ServiceCard } from "@/components/site/service-card";
import { getServices, getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return buildMetadata({
    seo: {
      title: "Cleaning Services in Virginia Beach | Shoreline Cleaning LLC",
      description:
        "Deep cleaning, post move-out, recurring, commercial, and short-term rental turnover cleaning in Virginia Beach and the 757 from Shoreline Cleaning LLC.",
    },
    path: "/services",
    settings,
  });
}

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHero
        eyebrow="Services"
        heading="Cleaning services quoted for your space"
        body="These are the services we provide. There are no prices on this website — send an intake and we'll follow up by call, text, or email."
      />
      <Section>
        <Container>
          {services.length === 0 ? (
            <p className="text-muted">No published services yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          )}
        </Container>
      </Section>
      <CtaBanner
        heading="Not sure which service you need?"
        body="Tell us about the space on the intake form. We'll recommend a starting point when we quote."
      />
    </>
  );
}
