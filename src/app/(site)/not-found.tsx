import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";

export const metadata: Metadata = {
  title: "Page not found | Shoreline Cleaning LLC",
  robots: { index: false, follow: false },
};

export default function SiteNotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-aqua">404</p>
      <h1 className="mt-3 text-4xl">Page not found</h1>
      <p className="mt-4 max-w-md text-muted">
        That page isn't on the Shoreline Cleaning LLC site. Head home or request a quote.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
        <Button asChild variant="navy">
          <Link href="/contact">Request a Free Quote</Link>
        </Button>
      </div>
    </Container>
  );
}
