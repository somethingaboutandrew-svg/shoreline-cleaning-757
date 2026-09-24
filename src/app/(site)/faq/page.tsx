import type { Metadata } from "next";
import { Container, Section } from "@/components/site/container";
import { CtaBanner } from "@/components/site/cta-banner";
import { FaqList } from "@/components/site/faq-list";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { getFaqs, getSettings } from "@/lib/content";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return buildMetadata({
    seo: {
      title: "FAQ | Shoreline Cleaning LLC",
      description:
        "Frequently asked questions about quotes, scheduling, and cleaning services from Shoreline Cleaning LLC in the 757.",
    },
    path: "/faq",
    settings,
  });
}

export default async function FaqPage() {
  const faqs = await getFaqs();
  return (
    <>
      {faqs.length > 0 ? <JsonLd data={faqJsonLd(faqs)} /> : null}
      <PageHero eyebrow="FAQ" heading="Questions, answered" />
      <Section>
        <Container className="max-w-3xl">
          {faqs.length === 0 ? <p className="text-muted">No FAQs published yet.</p> : <FaqList faqs={faqs} />}
        </Container>
      </Section>
      <CtaBanner
        heading="Still have a question?"
        body="Send an intake or a note on the quote form. We'll follow up by call, text, or email."
      />
    </>
  );
}
