import type { Metadata } from "next";
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
  title: "Careers — Dibiz Studio",
  description: "Join the team behind fast-growing brands. 8 open roles across content, design, strategy, and growth.",
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
