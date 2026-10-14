"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageSquare } from "lucide-react";
import type { SiteSettings } from "@/lib/content/types";
import { smsHref, telHref } from "@/lib/placeholders";

export function MobileCtaBar({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  if (pathname === "/contact" || pathname.startsWith("/studio")) return null;
  const call = telHref(settings.phone);
  const text = smsHref(settings.textNumber || settings.phone);

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-foam/95 p-3 backdrop-blur-md lg:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-6xl gap-2">
        {call ? (
          <a
            href={call}
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-white text-sm font-medium text-navy shadow-card"
          >
            <Phone className="size-4" aria-hidden />
            Call
          </a>
        ) : null}
        {text ? (
          <a
            href={text}
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-white text-sm font-medium text-navy shadow-card"
          >
            <MessageSquare className="size-4" aria-hidden />
            Text
          </a>
        ) : null}
        <Link
          href="/contact"
          className="inline-flex min-h-12 flex-[2] items-center justify-center rounded-full bg-aqua text-sm font-medium text-white"
        >
          Request a Free Quote
        </Link>
      </div>
    </div>
  );
}
