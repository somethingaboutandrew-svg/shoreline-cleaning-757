import type { Metadata } from "next";
import { Container, Section } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { QuoteForm } from "@/components/site/quote-form";
import { PUBLIC_EMAIL, PUBLIC_PHONE } from "@/lib/site-config";
import { getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return buildMetadata({
    seo: {
      title: "Request a Free Quote | Shoreline Cleaning LLC",
      description:
        "Request a free cleaning quote from Shoreline Cleaning LLC. Fill out a short intake — we'll follow up by call, text, or email. No prices listed online.",
    },
    path: "/contact",
    settings,
  });
}

export default async function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Quote request"
        heading="Tell us about the space. We'll quote it personally."
        body="There are no prices on this website. After you submit this intake, we'll call, text, or email — whichever you prefer — to discuss the work and give you a quote."
      />
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <QuoteForm />
          <aside className="space-y-6">
            <div className="rounded-[20px] bg-navy p-6 text-foam">
              <h2 className="text-2xl text-foam">What happens next</h2>
              <ol className="mt-4 space-y-3 text-sm text-sky">
                <li>1. You fill out and submit the intake form.</li>
                <li>2. We review your form and set up a time to call, text or email.</li>
                <li>3. We discuss your needs and provide you with a quote.</li>
              </ol>
            </div>
            <div className="rounded-[20px] bg-white p-6 shadow-card">
              <h2 className="text-2xl">Prefer to reach us directly?</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Feel free to call, text, or email if you have any questions. Call or text{" "}
                <a className="font-medium text-aqua hover:underline" href={`tel:${PUBLIC_PHONE.replace(/\D/g, "")}`}>
                  {PUBLIC_PHONE}
                </a>{" "}
                or email{" "}
                <a className="font-medium text-aqua hover:underline" href={`mailto:${PUBLIC_EMAIL}`}>
                  {PUBLIC_EMAIL}
                </a>
                .
              </p>
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}
