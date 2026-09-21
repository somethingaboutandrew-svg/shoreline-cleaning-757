import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "./container";

export function CtaBanner({
  heading,
  body,
  primaryLabel = "Request a Free Quote",
}: {
  heading: string;
  body: string;
  primaryLabel?: string;
}) {
  return (
    <SectionBand>
      <Container>
        <div className="rounded-[28px] bg-navy px-6 py-10 text-foam shadow-card sm:px-12 sm:py-14">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl text-foam sm:text-4xl">{heading}</h2>
            <p className="mt-4 text-base leading-relaxed text-sky">{body}</p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/contact">{primaryLabel}</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </SectionBand>
  );
}

function SectionBand({ children }: { children: React.ReactNode }) {
  return <section className="pb-16 sm:pb-20">{children}</section>;
}
