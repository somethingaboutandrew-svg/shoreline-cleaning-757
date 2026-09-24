import { Star } from "lucide-react";
import type { Review } from "@/lib/content/types";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col rounded-[20px] bg-white p-6 shadow-card">
      <div className="flex gap-1" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`size-4 ${i < review.rating ? "fill-aqua text-aqua" : "text-border"}`}
            aria-hidden
          />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-base leading-relaxed text-ink">“{review.text}”</blockquote>
      <figcaption className="mt-5 text-sm">
        <span className="font-semibold text-navy">{review.displayName}</span>
        {review.serviceType ? <span className="block text-muted">{review.serviceType}</span> : null}
      </figcaption>
    </figure>
  );
}
