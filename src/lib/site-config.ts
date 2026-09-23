export const SITE_NAME = "Shoreline Cleaning LLC";
export const SITE_DOMAIN = "www.shorelinecleaning757.com";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.shorelinecleaning757.com";
export const SERVICE_AREA_LINE =
  "Serving the 757 and surrounding Hampton Roads communities";
export const PUBLIC_EMAIL = "infoshorelinecleaning757@gmail.com";
export const GOOGLE_REVIEW_URL =
  "https://www.google.com/search?q=Shoreline+Cleaning+LLC+Virginia+Beach+reviews";

export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/reviews", label: "Reviews" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export const PRIMARY_CTA = {
  href: "/contact",
  label: "Request a Free Quote",
} as const;

export const OFFERED_SERVICES = [
  "Deep Cleaning",
  "Post Move-Out Cleaning",
  "Recurring Cleaning (Weekly/Monthly)",
  "Commercial/Office Cleaning",
  "Airbnb/Short-Term Rental Turnover Cleaning",
] as const;
