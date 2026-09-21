import Image from "next/image";
import type { Metadata } from "next";
import { Container, Section } from "@/components/site/container";
import { CtaBanner } from "@/components/site/cta-banner";
import { PageHero } from "@/components/site/page-hero";
import { getAbout, getSettings, getTeam } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [about, settings] = await Promise.all([getAbout(), getSettings()]);
  return buildMetadata({ seo: about.seo, path: "/about", settings });
}

export default async function AboutPage() {
  const [about, team] = await Promise.all([getAbout(), getTeam()]);
  return (
    <>
      <PageHero eyebrow="About" heading={about.heading} />
      <Section>
        <Container className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">{about.storyHeading}</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
              {about.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-card">
            <Image
              src="/images/hero-kitchen.jpg"
              alt="Bright professionally cleaned kitchen representing Shoreline Cleaning LLC work"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Container>
      </Section>
      <Section className="bg-white">
        <Container>
          <h2 className="text-3xl">{about.whyHeading}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {about.whyItems.map((item) => (
              <article key={item.title} className="rounded-[20px] bg-foam p-6 shadow-card">
                <h3 className="text-2xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <h2 className="text-3xl">{about.valuesHeading}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {about.values.map((item) => (
              <article key={item.title} className="rounded-[20px] bg-white p-6 shadow-card">
                <h3 className="text-2xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      {team.length > 0 ? (
        <Section className="bg-white">
          <Container>
            <h2 className="text-3xl">Team</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <li key={member.id} className="rounded-[20px] bg-foam p-6 shadow-card">
                  {member.photo ? (
                    <div className="relative mb-4 aspect-square overflow-hidden rounded-[16px]">
                      <Image src={member.photo.src} alt={member.photo.alt} fill className="object-cover" />
                    </div>
                  ) : null}
                  <h3 className="text-2xl">{member.name}</h3>
                  <p className="text-sm text-aqua">{member.role}</p>
                  <p className="mt-2 text-sm text-muted">{member.bio}</p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}
      <Section>
        <Container className="max-w-3xl">
          <h2 className="text-3xl">{about.communityHeading}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{about.community}</p>
        </Container>
      </Section>
      <CtaBanner
        heading="Work with a local 757 cleaning company"
        body="Request a quote. We'll follow up by call, text, or email after your intake."
      />
    </>
  );
}
