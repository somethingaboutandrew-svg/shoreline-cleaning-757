import Link from "next/link";
import { NAV_LINKS } from "@/lib/site-config";
import type { SiteSettings } from "@/lib/content/types";
import { httpHref, realValue } from "@/lib/placeholders";
import { Container } from "./container";
import { Logo } from "./logo";
import { ContactLinks } from "./contact-links";

export function Footer({ settings }: { settings: SiteSettings }) {
  const social = [
    { label: "Google", href: httpHref(settings.social.googleBusiness) },
    { label: "Facebook", href: httpHref(settings.social.facebook) },
    { label: "Instagram", href: httpHref(settings.social.instagram) },
  ].filter((item) => item.href);

  return (
    <footer className="border-t border-border bg-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{settings.footerNote}</p>
          <p className="mt-3 text-sm font-medium text-navy">{settings.serviceAreaLine}</p>
        </div>
        <div>
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-muted">Explore</h2>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-navy hover:text-aqua">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-muted">Contact</h2>
          <div className="mt-4 space-y-2 text-sm text-navy">
            {realValue(settings.phone) ? <p>Phone: {settings.phone}</p> : <p>Phone: add in Site Settings</p>}
            {realValue(settings.email) ? <p>Email: {settings.email}</p> : <p>Email: add in Site Settings</p>}
            {realValue(settings.hoursSummary) ? (
              <p>Hours: {settings.hoursSummary}</p>
            ) : (
              <p>Hours: add in Site Settings</p>
            )}
          </div>
          <ContactLinks settings={settings} className="mt-4" compact />
          {social.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-3">
              {social.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm text-aqua hover:underline" rel="noreferrer" target="_blank">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
      <div className="border-t border-border">
        <Container className="flex flex-col gap-3 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {settings.businessName}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-navy">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-navy">
              Terms
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
