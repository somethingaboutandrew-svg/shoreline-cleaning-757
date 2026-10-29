import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Container, Section } from "@/components/site/container";
import { CtaBanner } from "@/components/site/cta-banner";
import { FaqList } from "@/components/site/faq-list";
import { JsonLd } from "@/components/site/json-ld";
import { ServiceOverview } from "@/components/site/service-overview";
import { Button } from "@/components/ui/button";
import { getFaqs, getService, getServices, getSettings } from "@/lib/content";
import { relatedServicesFor } from "@/lib/content/related-services";
import { buildMetadata, serviceJsonLd } from "@/lib/seo";

// Unknown slugs are resolved on demand (see middleware) so a Sanity publish does not wait on a deploy.
export const dynamicParams = true;

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [service, settings] = await Promise.all([getService(slug), getSettings()]);
  if (!service) notFound();
  return buildMetadata({
    seo: service.seo,
    path: `/services/${service.slug}`,
    settings,
    fallbackImage: service.image,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [service, allFaqs, services] = await Promise.all([
    getService(slug),
    getFaqs(),
    getServices(),
  ]);
  if (!service) notFound();
  const related = allFaqs.filter((faq) => service.relatedFaqIds?.includes(faq.id));
  const relatedServices = relatedServicesFor(service.slug, services);

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <section className="border-b border-border bg-white">
        <Container className="grid gap-8 py-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Breadcrumbs
              className="mb-4"
              items={[
                { name: "Home", href: "/" },
                { name: "Services", href: "/services" },
                { name: service.name, href: `/services/${service.slug}` },
              ]}
            />
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-aqua">Service</p>
            <h1 className="mt-3 text-4xl sm:text-5xl">{service.name}</h1>
            <p className="mt-4 text-lg text-muted">{service.shortDescription}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Available in Virginia Beach and across the 757. See our{" "}
              <Link
                href="/service-areas"
                className="font-semibold text-navy underline decoration-aqua/40 underline-offset-4"
              >
                service areas
              </Link>
              .
            </p>
            <p className="mt-4 text-sm font-medium text-navy">{service.pricingNote}</p>
            <div className="mt-6">
              <Button asChild size="lg">
                <Link href="/contact">Request a Free Quote</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-card">
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </Container>
      </section>
      <Section>
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-3xl">Overview</h2>
            <ServiceOverview text={service.overview} />
            <h3 className="mt-10 text-2xl">What&apos;s included</h3>
            <ul className="mt-4 space-y-2 text-sm text-ink">
              {service.included.map((item) => (
                <li key={item} className="rounded-xl bg-white px-4 py-3 shadow-card">
                  {item}
                </li>
              ))}
            </ul>
            {service.notIncluded?.length ? (
              <>
                <h3 className="mt-10 text-2xl">Not included</h3>
                <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted">
                  {service.notIncluded.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
          <aside className="space-y-6">
            {service.idealFor?.length ? (
              <div className="rounded-[20px] bg-sky-soft p-6">
                <h2 className="text-2xl">Ideal for</h2>
                <ul className="mt-3 space-y-2 text-sm text-navy">
                  {service.idealFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="rounded-[20px] bg-navy p-6 text-foam">
              <h2 className="text-2xl text-foam">Get a quote</h2>
              <p className="mt-2 text-sm text-sky">
                Every quote is based on your space. Submit a short intake and we&apos;ll follow up.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-aqua px-5 text-sm font-medium text-white"
              >
                Request a Free Quote
              </Link>
            </div>
          </aside>
        </Container>
      </Section>
      {relatedServices.length ? (
        <Section className="bg-white">
          <Container>
            <h2 className="text-3xl">Related services</h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {relatedServices.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/services/${item.slug}`}
                    className="block h-full rounded-[20px] bg-foam p-5 shadow-card"
                  >
                    <span className="font-display text-xl text-navy">{item.name}</span>
                    <span className="mt-2 block text-sm leading-relaxed text-muted">
                      {item.shortDescription}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}
      {related.length ? (
        <Section className="bg-white">
          <Container>
            <h2 className="text-3xl">Related questions</h2>
            <div className="mt-6">
              <FaqList faqs={related} />
            </div>
          </Container>
        </Section>
      ) : null}
      <CtaBanner
        heading={`Ask about ${service.name}`}
        body="Tell us about the property and preferred timing. We'll quote after we understand the work."
      />
    </>
  );
}
