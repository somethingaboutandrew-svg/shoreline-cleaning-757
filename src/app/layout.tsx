import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import { GoogleAnalytics } from "@/components/site/google-analytics";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s`,
  },
  description:
    "Shoreline Cleaning LLC provides residential and commercial cleaning for the 757 and surrounding Hampton Roads communities.",
  icons: {
    icon: "/favicon.svg",
  },
  verification: {
    other: {
      "msvalidate.01": "BA1F846E3F77BEB3D1F711D3E050C4E8",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${figtree.variable} ${fraunces.variable} antialiased`}>
      <body className="min-h-screen bg-foam font-sans text-ink">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
