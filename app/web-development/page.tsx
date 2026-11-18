import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import { landingHtml } from "./landing-html";
import LandingInit from "./LandingInit";
import "./landing.css";

const TITLE = "Website & App Development Company in Mumbai";
const DESCRIPTION =
  "Dibiz builds Shopify stores, custom React/Next.js websites and mobile apps for D2C brands. See live sites we've built for Signature, Mindwise, bloomastra, Munchilicious and Drovika, then talk to us on WhatsApp.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/web-development" },
  openGraph: { type: "website", url: "/web-development", title: TITLE, description: DESCRIPTION, images: [DEFAULT_OG_IMAGE] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [DEFAULT_OG_IMAGE.url] },
};

/**
 * Web & App landing page, built from the approved HTML preview so it looks exactly the same.
 * The markup is rendered on the server (good for SEO and speed); LandingInit adds the behaviour
 * (WhatsApp links, quote wizard, scrolling site recordings) in the browser.
 * All styles are scoped under .lpw so they never touch the rest of the site.
 */
export default function WebDevelopmentLanding() {
  return (
    <>
      <div className="lpw" dangerouslySetInnerHTML={{ __html: landingHtml }} />
      <LandingInit />
    </>
  );
}
