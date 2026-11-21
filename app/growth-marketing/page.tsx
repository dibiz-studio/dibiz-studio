import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import Footer from "@/components/Footer";
import { landingHtml } from "./landing-html";
import LandingInit from "./LandingInit";
import "./landing.css";

const TITLE = "Growth Marketing Agency in Mumbai for D2C Brands";
const DESCRIPTION =
  "Meta ads, creative strategy and conversion work that scale D2C brands profitably. See real results like 9.11x ROAS for Smartveda and ₹2.4 Cr revenue for LST, watch our ads, then talk to us on WhatsApp.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/growth-marketing" },
  openGraph: { type: "website", url: "/growth-marketing", title: TITLE, description: DESCRIPTION, images: [DEFAULT_OG_IMAGE] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [DEFAULT_OG_IMAGE.url] },
};

/**
 * Growth Marketing landing page, built from the approved HTML preview so it looks exactly the same.
 * The markup is rendered on the server (good for SEO and speed); LandingInit adds the behaviour
 * (reel player, case study tabs, industries slider, lead form, WhatsApp links) in the browser.
 * All styles are scoped under .lpg so they never touch the rest of the site.
 * The footer is the shared site footer, so this page matches the others.
 */
export default function GrowthMarketingLanding() {
  return (
    <>
      <div className="lpg" dangerouslySetInnerHTML={{ __html: landingHtml }} />
      <Footer />
      <LandingInit />
    </>
  );
}
