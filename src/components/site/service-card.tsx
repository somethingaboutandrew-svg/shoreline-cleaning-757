import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/content/types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-card transition-[box-shadow] duration-200 hover:shadow-card-hover">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl text-navy">{service.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.shortDescription}</p>
        <Link
          href={`/services/${service.slug}`}
          className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-navy hover:text-aqua"
        >
          View service
          <span aria-hidden className="ml-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
