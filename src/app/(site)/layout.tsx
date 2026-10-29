export const revalidate = 60;

import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { MobileCtaBar } from "@/components/site/mobile-cta-bar";
import { JsonLd } from "@/components/site/json-ld";
import { getPosts, getSettings } from "@/lib/content";
import { isPlaceholderPost } from "@/lib/sample-content";
import { localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { navLinks } from "@/lib/site-config";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, posts] = await Promise.all([getSettings(), getPosts()]);
  const links = navLinks({ includeBlog: posts.some((post) => !isPlaceholderPost(post)) });
  return (
    <>
      <JsonLd data={organizationJsonLd(settings)} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={localBusinessJsonLd(settings)} />
      <Header settings={settings} links={links} />
      <main className="pb-24 lg:pb-0">{children}</main>
      <Footer settings={settings} links={links} />
      <MobileCtaBar settings={settings} />
    </>
  );
}
