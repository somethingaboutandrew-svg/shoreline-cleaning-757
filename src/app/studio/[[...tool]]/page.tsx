"use client";

import dynamic from "next/dynamic";
import { isSanityConfigured } from "@/sanity/env";

const Studio = dynamic(() => import("./studio"), { ssr: false });

export default function StudioPage() {
  if (!isSanityConfigured()) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-3xl">Sanity Studio is not connected yet</h1>
        <p className="mt-4 text-muted">
          Add NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and NEXT_PUBLIC_SANITY_API_VERSION on
          Vercel, then redeploy.
        </p>
      </main>
    );
  }

  return <Studio />;
}
