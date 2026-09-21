export const SITE_NAME = "Shoreline Cleaning LLC";
export const SITE_DOMAIN = "www.shorelinecleaning757.com";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.shorelinecleaning757.com";
export const SERVICE_AREA_LINE =
  "Serving the 757 and surrounding Hampton Roads communities";

export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Cleaning Tips" },
  { href: "/contact", label: "Contact" },
] as const;

export const PRIMARY_CTA = {
  href: "/contact",
  label: "Request a Free Quote",
} as const;
