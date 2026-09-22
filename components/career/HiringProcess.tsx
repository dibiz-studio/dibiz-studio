import FadeUp from "@/components/FadeUp";
import StepTimeline from "@/components/StepTimeline";
import { hiringProcessSteps } from "@/lib/site-data";

export default function HiringProcess() {
  return (
    <section className="process" id="process">
      <div className="container-x">
        <FadeUp className="process-head">
          <span className="pill-label">HOW IT WORKS</span>
          <h2 className="font-display">Our Hiring Process</h2>
          <p>A simple, AI-assisted process built to respect your time and get you an answer fast.</p>
        </FadeUp>
        <div className="process-grid">
          <StepTimeline steps={hiringProcessSteps} />
        </div>
      </div>
    </section>
  );
}
