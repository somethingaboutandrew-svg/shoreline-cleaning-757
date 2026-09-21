import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-aqua">404</p>
      <h1 className="mt-3 text-4xl">Page not found</h1>
      <p className="mt-4 text-muted">
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
    </main>
  );
}
