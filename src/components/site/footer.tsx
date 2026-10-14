import Link from "next/link";
import { NAV_LINKS, PUBLIC_EMAIL, PUBLIC_PHONE } from "@/lib/site-config";
import type { SiteSettings } from "@/lib/content/types";
import { httpHref } from "@/lib/placeholders";
import { Container } from "./container";
import { Logo } from "./logo";

export function Footer({ settings }: { settings: SiteSettings }) {
  const social = [
    { label: "Google", href: httpHref(settings.social.googleBusiness) },
    { label: "Facebook", href: httpHref(settings.social.facebook) },
    { label: "Instagram", href: httpHref(settings.social.instagram) },
  ].filter((item) => item.href);
  const email = PUBLIC_EMAIL;

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
            <p>
              Call or text:{" "}
              <a className="text-aqua hover:underline" href={`tel:${PUBLIC_PHONE.replace(/\D/g, "")}`}>
                {PUBLIC_PHONE}
              </a>
            </p>
            <p>
              Email:{" "}
              <a className="text-aqua hover:underline" href={`mailto:${email}`}>
                {email}
              </a>
            </p>
          </div>
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
          <p>
            © {new Date().getFullYear()} {settings.businessName}. All rights reserved.
          </p>
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
