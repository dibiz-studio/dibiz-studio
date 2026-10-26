import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SEO, siteJsonLd, JsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-data";
import LeadTracking from "@/components/LeadTracking";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

// Only the live site reports to Google Analytics, so Vercel previews and local builds don't skew the numbers.
const analyticsEnabled = process.env.VERCEL_ENV === "production" || process.env.NEXT_PUBLIC_FORCE_ANALYTICS === "1";

export const metadata: Metadata = {
  metadataBase: new URL(SEO.url),
  title: {
    default: `${SEO.defaultTitle} | ${SEO.name}`,
    template: `%s | ${SEO.name}`,
  },
  description: SEO.description,
  keywords: SEO.keywords,
  applicationName: SEO.name,
  authors: [{ name: SEO.name, url: SEO.url }],
  creator: SEO.name,
  publisher: SEO.name,
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    type: "website",
    siteName: SEO.name,
    locale: SEO.locale,
    url: "/",
    title: SEO.defaultTitle,
    description: SEO.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.defaultTitle,
    description: SEO.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Paste the code from Google Search Console (HTML tag method) into this env var to verify the site.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
  href="https://fonts.googleapis.com/css2?family=Unbounded:wght@600;700;800;900&family=Playfair+Display:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
        <JsonLd data={siteJsonLd()} />
      </head>
      <body>
        {children}
        <FloatingWhatsApp />
        {analyticsEnabled && <LeadTracking />}
      </body>
      {analyticsEnabled && <GoogleAnalytics gaId={siteConfig.gaId} />}
    </html>
  );
}
