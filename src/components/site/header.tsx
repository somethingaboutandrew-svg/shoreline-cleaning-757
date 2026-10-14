"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, PRIMARY_CTA, PUBLIC_PHONE } from "@/lib/site-config";
import type { SiteSettings } from "@/lib/content/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

export function Header({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-foam/90 backdrop-blur-md">
      {settings.announcement?.enabled && settings.announcement.text ? (
        <div className="bg-navy px-4 py-2 text-center text-sm text-foam">
          {settings.announcement.href ? (
            <Link href={settings.announcement.href} className="underline-offset-2 hover:underline">
              {settings.announcement.text}
            </Link>
          ) : (
            settings.announcement.text
          )}
        </div>
      ) : null}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium text-navy/80 hover:bg-sky-soft hover:text-navy",
                pathname === link.href || pathname.startsWith(`${link.href}/`)
                  ? "bg-sky-soft text-navy"
                  : "",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${PUBLIC_PHONE.replace(/\D/g, "")}`}
            className="text-sm font-medium text-navy hover:text-aqua"
          >
            {PUBLIC_PHONE}
          </a>
          <Button asChild className="min-w-[13.5rem] px-6 text-center leading-tight">
            <Link href={PRIMARY_CTA.href} className="justify-center text-center">
              {PRIMARY_CTA.label}
            </Link>
          </Button>
        </div>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full text-navy hover:bg-sky-soft lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
      {open ? (
        <div id="mobile-nav" className="border-t border-border bg-foam px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center rounded-xl px-3 text-base font-medium text-navy hover:bg-sky-soft"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${PUBLIC_PHONE.replace(/\D/g, "")}`}
              className="mt-2 flex min-h-11 items-center justify-center rounded-full bg-white px-4 text-base font-medium text-navy shadow-card"
            >
              Call or text {PUBLIC_PHONE}
            </a>
            <Link
              href={PRIMARY_CTA.href}
              onClick={() => setOpen(false)}
              className="mt-2 flex min-h-12 items-center justify-center rounded-full bg-aqua px-4 text-center text-base font-medium text-white"
            >
              {PRIMARY_CTA.label}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
