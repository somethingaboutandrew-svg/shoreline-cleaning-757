"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { GalleryCategory, GalleryItem } from "@/lib/content/types";
import { cn } from "@/lib/utils";

const CATEGORIES: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "kitchens", label: "Kitchens" },
  { id: "bathrooms", label: "Bathrooms" },
  { id: "homes", label: "Homes" },
  { id: "commercial", label: "Commercial" },
  { id: "move-out", label: "Move-out" },
];

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [category, setCategory] = useState<GalleryCategory | "all">("all");
  const [active, setActive] = useState<GalleryItem | null>(null);
  const filtered = useMemo(
    () => (category === "all" ? items : items.filter((item) => item.category === category)),
    [category, items],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Gallery categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setCategory(cat.id)}
            className={cn(
              "min-h-11 rounded-full px-4 text-sm font-medium",
              category === cat.id ? "bg-navy text-white" : "bg-white text-navy shadow-card",
            )}
            aria-pressed={category === cat.id}
          >
            {cat.label}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="mt-8 text-muted">No photos in this category yet.</p>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setActive(item)}
                className="group block w-full overflow-hidden rounded-[20px] bg-white text-left shadow-card"
              >
                <span className="relative block aspect-[4/3]">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </span>
                {item.caption ? (
                  <span className="block p-4 text-sm text-muted">{item.caption}</span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      )}
      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.image.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/80 p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[20px] bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute right-3 top-3 z-10 inline-flex size-11 items-center justify-center rounded-full bg-white text-navy shadow-card"
            >
              <X className="size-5" />
              <span className="sr-only">Close</span>
            </button>
            <div className="relative aspect-[4/3] w-full">
              <Image src={active.image.src} alt={active.image.alt} fill className="object-contain bg-navy-deep" />
            </div>
            {active.caption ? <p className="p-4 text-sm text-muted">{active.caption}</p> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
