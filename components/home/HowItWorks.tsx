import FadeUp from "@/components/FadeUp";
import StepTimeline from "@/components/StepTimeline";
import { howItWorksSteps, siteConfig } from "@/lib/site-data";

export default function HowItWorks() {
  return (
    <section className="how">
      <div className="container-x how-grid">
        <FadeUp className="how-sticky">
          <h2 className="font-display">How it Works</h2>
          <h3>OUR 6 STEP PROCESS</h3>
          <hr />
          <a href={siteConfig.bookCallUrl} target="_blank" rel="noopener noreferrer" className="btn">
            Schedule a Call
          </a>
        </FadeUp>
        <StepTimeline steps={howItWorksSteps} />
      </div>
    </section>
  );
}
