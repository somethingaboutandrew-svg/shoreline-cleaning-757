import type { Metadata } from "next";
import { Container, Section } from "@/components/site/container";
import { CtaBanner } from "@/components/site/cta-banner";
import { PageHero } from "@/components/site/page-hero";
import { ReviewCard } from "@/components/site/review-card";
import { TestimonialForm } from "@/components/site/testimonial-form";
import { GOOGLE_REVIEW_URL } from "@/lib/site-config";
import { getReviews, getSettings } from "@/lib/content";
import { httpHref } from "@/lib/placeholders";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return buildMetadata({
    seo: {
      title: "Reviews | Shoreline Cleaning LLC",
      description:
        "Customer reviews for Shoreline Cleaning LLC. Sample quotes are labeled until real reviews are added.",
    },
    path: "/reviews",
    settings,
  });
}

export default async function ReviewsPage() {
  const [reviews, settings] = await Promise.all([getReviews(), getSettings()]);
  const google = httpHref(settings.googleReviewUrl) || GOOGLE_REVIEW_URL;
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        heading="What customers say"
        body="Sample reviews are clearly labeled. When a client submits a new testimonial, we review it before it appears here."
      />
      <Section>
        <Container className="space-y-10">
          <a
            href={google}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-navy px-6 text-center text-sm font-semibold uppercase tracking-wide text-white"
          >
            CLICK HERE TO LEAVE A GOOGLE REVIEW!
          </a>
          <TestimonialForm />
          {reviews.length === 0 ? (
            <p className="text-muted">No reviews published yet.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </Container>
      </Section>
      <CtaBanner heading="Have a space that needs a reset?" body="Request a quote. We'll follow up by call, text, or email." />
    </>
  );
}
