"use client";

import { useEffect, useRef } from "react";

export type Step = { num: string; title: string; desc: string };

export default function StepTimeline({ steps }: { steps: Step[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const stepEls = stepRefs.current.filter(Boolean) as HTMLDivElement[];
    const stepIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("active", entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );
    stepEls.forEach((el) => stepIo.observe(el));

    function updateTimeline() {
      const wrap = wrapRef.current;
      const progress = progressRef.current;
      const dot = dotRef.current;
      if (!wrap || !progress || !dot) return;
      const rect = wrap.getBoundingClientRect();
      const viewportCenter = window.innerHeight * 0.5;
      const total = rect.height;
      let progressPx = viewportCenter - rect.top;
      progressPx = Math.max(0, Math.min(total, progressPx));
      progress.style.height = progressPx + "px";
      dot.style.top = progressPx + "px";
    }

    window.addEventListener("scroll", updateTimeline, { passive: true });
    window.addEventListener("resize", updateTimeline);
    updateTimeline();

    return () => {
      stepIo.disconnect();
      window.removeEventListener("scroll", updateTimeline);
      window.removeEventListener("resize", updateTimeline);
    };
  }, []);

  return (
    <div className="steps" ref={wrapRef}>
      <div className="steps-progress" ref={progressRef} />
      <div className="steps-dot" ref={dotRef} />
      {steps.map((step, i) => (
        <div
          className="step"
          data-step
          key={step.num}
          ref={(el) => {
            stepRefs.current[i] = el;
          }}
        >
          <span className="step-num font-serif">{step.num}</span>
          <div className="step-card">
            <h4 className="font-display">{step.title}</h4>
            <p>{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
