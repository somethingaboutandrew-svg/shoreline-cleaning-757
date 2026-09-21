import Link from "next/link";
import { SITE_NAME } from "@/lib/site-config";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3 rounded-md text-navy no-underline"
      aria-label={`${SITE_NAME} home`}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-navy text-foam shadow-card" aria-hidden>
        <svg viewBox="0 0 32 32" className="size-6" fill="none">
          <rect x="5" y="6" width="22" height="20" rx="4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M5 18.5h22" stroke="#2F8F86" strokeWidth="1.8" />
          <path d="M8 14.5c2.2-2 4.6-2 6.8 0s4.6 2 6.8 0" stroke="#C9DCE8" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="font-display text-[1.05rem] font-semibold tracking-tight sm:text-lg">
          Shoreline Cleaning
        </span>
        {!compact ? (
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted">LLC · 757</span>
        ) : null}
      </span>
    </Link>
  );
}
