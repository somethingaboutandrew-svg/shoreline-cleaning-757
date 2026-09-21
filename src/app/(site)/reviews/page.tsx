import type { Metadata } from "next";
import { Container, Section } from "@/components/site/container";
import { CtaBanner } from "@/components/site/cta-banner";
import { PageHero } from "@/components/site/page-hero";
import { ReviewCard } from "@/components/site/review-card";
import { getReviews, getSettings } from "@/lib/content";
import { httpHref } from "@/lib/placeholders";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return buildMetadata({
    seo: {
      title: "Reviews | Shoreline Cleaning LLC",
      description:
        "Customer reviews for Shoreline Cleaning LLC. Sample quotes are labeled until real reviews are added in Sanity.",
    },
    path: "/reviews",
    settings,
  });
}

export default async function ReviewsPage() {
  const [reviews, settings] = await Promise.all([getReviews(), getSettings()]);
  const google = httpHref(settings.googleReviewUrl);
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        heading="What customers say"
        body="These quotes live in Sanity. Sample reviews are clearly labeled and should be replaced with real customer feedback. This page does not display a Google star rating or review count."
      />
      <Section>
        <Container>
          {google ? (
            <a
              href={google}
              target="_blank"
              rel="noreferrer"
              className="mb-8 inline-flex min-h-12 items-center justify-center rounded-full bg-navy px-6 text-sm font-medium text-white"
            >
              {settings.googleReviewButtonLabel}
            </a>
          ) : (
            <p className="mb-8 rounded-[16px] bg-sky-soft px-4 py-3 text-sm text-navy">
              Google review button: add your Google Business Profile URL in Site Settings to enable “
              {settings.googleReviewButtonLabel}”.
            </p>
          )}
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
      <CtaBanner
        heading="Have a space that needs a reset?"
        body="Request a quote. We'll follow up by call, text, or email."
      />
    </>
  );
}
