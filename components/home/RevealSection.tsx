"use client";

import { useEffect, useRef } from "react";
import { revealAvatars } from "@/lib/site-data";

export default function RevealSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) el.classList.add("in-view");
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="reveal-section" ref={ref}>
      <div className="container-x">
        <p className="reveal-text font-display">
          <span style={{ color: "var(--accent)" }}>Most brands create content that looks good</span>
          <span className="muted-word"> then struggle with low website conversions, inconsistent content, and zero repeat customers.</span>
        </p>
        <div className="reveal-card">
          <h3>
            #1 DIGITAL MARKETING
            <br />
            AGENCY FASHION
            <br />
            BRANDS TRUST
          </h3>
          <div className="avatar-row">
            <div className="avatar-stack">
              {revealAvatars.map((src) => (
                <img key={src} loading="lazy" decoding="async" src={src} alt="" />
              ))}
            </div>
            <div>
              <div className="stars">★★★★★</div>
              <div className="review-sub">200+ 5 Star Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
