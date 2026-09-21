import { Phone, MessageSquare, Mail } from "lucide-react";
import type { SiteSettings } from "@/lib/content/types";
import { mailtoHref, smsHref, telHref } from "@/lib/placeholders";
import { cn } from "@/lib/utils";

export function ContactLinks({
  settings,
  className,
  compact = false,
}: {
  settings: SiteSettings;
  className?: string;
  compact?: boolean;
}) {
  const call = telHref(settings.phone);
  const text = smsHref(settings.textNumber || settings.phone);
  const email = mailtoHref(settings.email);
  const links = [
    call ? { href: call, label: compact ? "Call" : "Call us", icon: Phone } : null,
    text ? { href: text, label: compact ? "Text" : "Text us", icon: MessageSquare } : null,
    email ? { href: email, label: compact ? "Email" : "Email us", icon: Mail } : null,
  ].filter(Boolean) as { href: string; label: string; icon: typeof Phone }[];

  if (links.length === 0) {
    return (
      <p className={cn("text-sm text-muted", className)}>
        Call and text numbers will appear here once they are added in Site Settings.
      </p>
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-medium text-navy shadow-card hover:shadow-card-hover"
        >
          <link.icon className="size-4" aria-hidden />
          {link.label}
        </a>
      ))}
    </div>
  );
}
