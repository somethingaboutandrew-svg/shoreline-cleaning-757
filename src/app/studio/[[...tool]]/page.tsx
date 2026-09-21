"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export default function StudioPage() {
  if (!isSanityConfigured()) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-3xl">Sanity Studio is not connected yet</h1>
        <p className="mt-4 text-muted">
          Create a free Sanity project, then add these environment variables and restart the app:
        </p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-navy">
          <li>NEXT_PUBLIC_SANITY_PROJECT_ID</li>
          <li>NEXT_PUBLIC_SANITY_DATASET (usually production)</li>
          <li>SANITY_API_READ_TOKEN (for drafts, optional)</li>
        </ul>
        <p className="mt-4 text-sm text-muted">
          The public website already runs on placeholder content that matches these schemas. See the README for the
          exact setup steps.
        </p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
