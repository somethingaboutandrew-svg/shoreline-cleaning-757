import { getServiceAreas, getServices, getSettings } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";
import { PUBLIC_EMAIL, PUBLIC_PHONE, SITE_URL } from "@/lib/site-config";

export async function GET() {
  const [settings, services, areas] = await Promise.all([
    getSettings(),
    getServices(),
    getServiceAreas(),
  ]);
  const cities = areas.areas.map((area) => area.name).filter(Boolean);
  const lines = [
    `# ${settings.businessName}`,
    "",
    `${settings.businessName} provides residential and commercial cleaning.`,
    `Website: ${SITE_URL.replace(/\/$/, "")}`,
    `Phone: ${PUBLIC_PHONE}`,
    `Email: ${PUBLIC_EMAIL}`,
    "",
    "## Services",
    ...services.map((service) => `- ${service.name}: ${absoluteUrl(`/services/${service.slug}`)}`),
    "",
    "## Service area",
    cities.length ? cities.join(", ") : settings.serviceAreaLine,
    "",
    "## Request a quote",
    `Send the intake form at ${absoluteUrl("/contact")}, or call or text ${PUBLIC_PHONE}. We follow up by call, text, or email.`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
