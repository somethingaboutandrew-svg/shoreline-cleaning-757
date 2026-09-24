import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { BeforeAfter } from "@/components/site/before-after";
import { Container, Section } from "@/components/site/container";
import { CtaBanner } from "@/components/site/cta-banner";
import { FaqList } from "@/components/site/faq-list";
import { ReviewCard } from "@/components/site/review-card";
import { ServiceCard } from "@/components/site/service-card";
import { Button } from "@/components/ui/button";
import { PUBLIC_EMAIL } from "@/lib/site-config";
import {
  getBeforeAfter,
  getFaqs,
  getHome,
  getReviews,
  getServices,
  getSettings,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [home, settings] = await Promise.all([getHome(), getSettings()]);
  return buildMetadata({ seo: home.seo, path: "/", settings, fallbackImage: home.heroImage });
}

export default async function HomePage() {
  const [home, settings, services, reviews, faqs, pairs] = await Promise.all([
    getHome(),
    getSettings(),
    getServices(),
    getReviews(),
    getFaqs(),
    getBeforeAfter(),
  ]);
  const featured = services.filter((s) => home.featuredServiceSlugs.includes(s.slug));
  const homeReviews = reviews.filter((r) => r.showOnHomepage);
  const homeFaqs = faqs.slice(0, 4);
  const pair = pairs.find((p) => p.id === home.featuredBeforeAfterId) ?? pairs[0];

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={home.heroImage.src}
            alt={home.heroImage.alt}
            fill
            priority
            loading="eager"
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/80 via-navy/70 to-navy/30" />
        </div>
        <Container className="relative grid min-h-[88vh] items-end py-16 sm:items-center sm:py-24">
          <div className="max-w-2xl text-foam">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky">{home.heroEyebrow}</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.1] text-foam sm:text-5xl lg:text-6xl">
              {home.heroHeadline}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-sky sm:text-lg">{home.heroSubheadline}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="min-w-[13.5rem] justify-center text-center">
                <Link href="/contact">{home.heroPrimaryCta}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section className="py-10 sm:py-12">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {home.highlights.map((item) => (
              <li key={item.title} className="rounded-[20px] bg-white p-5 shadow-card">
                <p className="font-display text-xl text-navy">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-aqua">Shoreline Cleaning LLC</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">{home.introHeading}</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">{home.introBody}</p>
            <div className="mt-6">
              <Button asChild variant="navy">
                <Link href="/about">About Us</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-card">
            <Image
              src="/images/living-room.jpg"
              alt="Professionally cleaned living room with white sofa, navy pillows, and daylight"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl">Featured services</h2>
              <p className="mt-2 max-w-xl text-muted">Every service is quoted after a short intake.</p>
            </div>
            <Link href="/services" className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-navy">
              All services <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="text-3xl sm:text-4xl">{home.howItWorksHeading}</h2>
          <p className="mt-3 max-w-2xl text-muted">{home.howItWorksIntro}</p>
          <ol className="mt-10 grid gap-6 lg:grid-cols-3">
            {home.howItWorksSteps.map((step, index) => (
              <li key={step.title} className="rounded-[20px] bg-white p-6 shadow-card">
                <span className="font-display text-4xl text-sky">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-2xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {pair ? (
        <Section className="bg-white">
          <Container className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl sm:text-4xl">{home.beforeAfterHeading}</h2>
              <p className="mt-3 text-muted">{home.beforeAfterIntro}</p>
            </div>
            <BeforeAfter pair={pair} />
          </Container>
        </Section>
      ) : null}

      <Section>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl">{home.reviewsHeading}</h2>
            <Link href="/reviews" className="text-sm font-semibold text-navy">
              All reviews →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {homeReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl sm:text-4xl">{home.serviceAreaHeading}</h2>
            <p className="mt-3 text-muted">{home.serviceAreaBody}</p>
            <Link href="/service-areas" className="mt-6 inline-flex min-h-11 items-center font-semibold text-navy">
              Service areas →
            </Link>
          </div>
          <div className="rounded-[20px] bg-sky-soft p-6">
            <p className="font-display text-2xl text-navy">{settings.serviceAreaLine}</p>
            <p className="mt-3 text-sm text-muted">
              Virginia Beach, Norfolk, Chesapeake, Suffolk, Hampton, Newport News, Williamsburg, Elizabeth City, and
              Moyock.
            </p>
            <p className="mt-4 text-sm text-navy">
              Email:{" "}
              <a className="text-aqua hover:underline" href={`mailto:${PUBLIC_EMAIL}`}>
                {PUBLIC_EMAIL}
              </a>
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-3xl sm:text-4xl">{home.faqHeading}</h2>
            <Link href="/faq" className="mt-4 inline-flex min-h-11 items-center font-semibold text-navy">
              All FAQs →
            </Link>
          </div>
          <FaqList faqs={homeFaqs} />
        </Container>
      </Section>

      <CtaBanner heading={home.closingHeading} body={home.closingBody} />
    </>
  );
}
