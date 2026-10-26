import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaSection from "@/components/CtaSection";
import Hero from "@/components/home/Hero";
import RevealSection from "@/components/home/RevealSection";
import Solution from "@/components/home/Solution";
import Services from "@/components/home/Services";
import VideoShowcase from "@/components/home/VideoShowcase";
import LogoMarquee from "@/components/home/LogoMarquee";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import ResultsCoverflow from "@/components/home/ResultsCoverflow";

// Title and description come from the root layout defaults; this pins the canonical URL.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <div className="grain" />
      <Header />
      <Hero />
      <RevealSection />
      <Solution />
      <Services />
      <VideoShowcase />
      <LogoMarquee />
      <HowItWorks />
      <Testimonials />
      <ResultsCoverflow />
      <CtaSection heading="Ready to fix the leaks and scale with confidence?" />
      <Footer />
    </>
  );
}
