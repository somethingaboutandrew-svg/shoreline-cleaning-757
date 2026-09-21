"use client";

import { useState } from "react";
import Image from "next/image";
import type { BeforeAfterPair } from "@/lib/content/types";
import { cn } from "@/lib/utils";

export function BeforeAfter({ pair }: { pair: BeforeAfterPair }) {
  const [showAfter, setShowAfter] = useState(true);

  return (
    <figure className="overflow-hidden rounded-[28px] bg-white shadow-card">
      <div className="relative aspect-[4/3]">
        <Image
          src={showAfter ? pair.after.src : pair.before.src}
          alt={showAfter ? pair.after.alt : pair.before.alt}
          fill
          sizes="(max-width: 768px) 100vw, 640px"
          className="object-cover"
        />
        <span className="absolute left-4 top-4 rounded-full bg-navy/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-foam">
          {showAfter ? "After" : "Before"}
        </span>
      </div>
      <figcaption className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-xl text-navy">{pair.title}</p>
          {pair.caption ? <p className="mt-1 text-sm text-muted">{pair.caption}</p> : null}
        </div>
        <div className="inline-flex rounded-full bg-sky-soft p-1" role="group" aria-label="Toggle before and after">
          <button
            type="button"
            onClick={() => setShowAfter(false)}
            className={cn(
              "min-h-11 rounded-full px-4 text-sm font-medium",
              !showAfter ? "bg-navy text-white" : "text-navy",
            )}
            aria-pressed={!showAfter}
          >
            Before
          </button>
          <button
            type="button"
            onClick={() => setShowAfter(true)}
            className={cn(
              "min-h-11 rounded-full px-4 text-sm font-medium",
              showAfter ? "bg-navy text-white" : "text-navy",
            )}
            aria-pressed={showAfter}
          >
            After
          </button>
        </div>
      </figcaption>
    </figure>
  );
}

export function BeforeAfterSideBySide({ pair }: { pair: BeforeAfterPair }) {
  return (
    <figure className="overflow-hidden rounded-[28px] bg-white shadow-card">
      <div className="grid sm:grid-cols-2">
        <div className="relative aspect-[4/3]">
          <Image src={pair.before.src} alt={pair.before.alt} fill className="object-cover" sizes="50vw" />
          <span className="absolute left-3 top-3 rounded-full bg-navy/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-foam">
            Before
          </span>
        </div>
        <div className="relative aspect-[4/3]">
          <Image src={pair.after.src} alt={pair.after.alt} fill className="object-cover" sizes="50vw" />
          <span className="absolute left-3 top-3 rounded-full bg-aqua/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
            After
          </span>
        </div>
      </div>
      <figcaption className="p-5">
        <p className="font-display text-xl text-navy">{pair.title}</p>
        {pair.caption ? <p className="mt-1 text-sm text-muted">{pair.caption}</p> : null}
      </figcaption>
    </figure>
  );
}
