import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaSection from "@/components/CtaSection";
import CareerHero from "@/components/career/CareerHero";
import CareerStats from "@/components/career/CareerStats";
import Culture from "@/components/career/Culture";
import Positions from "@/components/career/Positions";
import HiringProcess from "@/components/career/HiringProcess";
import FounderQuote from "@/components/career/FounderQuote";

export const metadata: Metadata = {
  title: "Careers: Marketing, Content & Design Jobs in Mumbai",
  description:
    "Join Dibiz Studio in Malad, Mumbai. Open roles in video editing, graphic design, social media, brand strategy, business development and web development.",
  alternates: { canonical: "/career" },
  openGraph: {
    url: "/career",
    title: "Careers at Dibiz Studio",
    description: "Open roles across content, design, strategy and growth at our Mumbai studio.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function CareerPage() {
  return (
    <>
      <div className="grain" />
      <Header />
      <CareerHero />
      <CareerStats />
      <Culture />
      <Positions />
      <HiringProcess />
      <FounderQuote />
      <CtaSection
        heading="Don't see a role that fits? Reach out anyway."
        buttonLabel="Email Your Resume"
        buttonHref="mailto:admin@dibizstudio.com?subject=General Application"
      />
      <Footer />
    </>
  );
}
