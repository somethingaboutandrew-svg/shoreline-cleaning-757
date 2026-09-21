import { Container } from "./container";

export function PageHero({
  eyebrow,
  heading,
  body,
}: {
  eyebrow?: string;
  heading: string;
  body?: string;
}) {
  return (
    <section className="border-b border-border bg-white">
      <Container className="py-12 sm:py-16">
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-aqua">{eyebrow}</p>
        ) : null}
        <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl">{heading}</h1>
        {body ? <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{body}</p> : null}
      </Container>
    </section>
  );
}
