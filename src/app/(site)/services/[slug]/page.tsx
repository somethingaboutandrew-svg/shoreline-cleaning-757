import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container, Section } from "@/components/site/container";
import { CtaBanner } from "@/components/site/cta-banner";
import { FaqList } from "@/components/site/faq-list";
import { Button } from "@/components/ui/button";
import { getFaqs, getService, getServices, getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [service, settings] = await Promise.all([getService(slug), getSettings()]);
  if (!service) return {};
  return buildMetadata({
    seo: service.seo,
    path: `/services/${service.slug}`,
    settings,
    fallbackImage: service.image,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [service, allFaqs] = await Promise.all([getService(slug), getFaqs()]);
  if (!service) notFound();
  const related = allFaqs.filter((f) => service.relatedFaqIds?.includes(f.id));

  return (
    <>
      <section className="border-b border-border bg-white">
        <Container className="grid gap-8 py-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-aqua">Service</p>
            <h1 className="mt-3 text-4xl sm:text-5xl">{service.name}</h1>
            <p className="mt-4 text-lg text-muted">{service.shortDescription}</p>
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
            <p className="mt-4 text-base leading-relaxed text-muted">{service.overview}</p>
            <h3 className="mt-10 text-2xl">What's included</h3>
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
                No prices online. Submit a short intake and we'll follow up by call, text, or email.
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
