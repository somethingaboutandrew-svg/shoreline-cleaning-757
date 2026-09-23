export const revalidate = 60;

import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { MobileCtaBar } from "@/components/site/mobile-cta-bar";
import { JsonLd } from "@/components/site/json-ld";
import { getSettings } from "@/lib/content";
import { localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <JsonLd data={organizationJsonLd(settings)} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={localBusinessJsonLd(settings)} />
      <Header settings={settings} />
      <main className="pb-24 lg:pb-0">{children}</main>
      <Footer settings={settings} />
      <MobileCtaBar settings={settings} />
    </>
  );
}
