"use client";

import { useEffect, useRef } from "react";
import { revealAvatars } from "@/lib/site-data";

const LINE1 = "Most brands create content that looks good";
const LINE2 = "then struggle with low website conversions, inconsistent content, and zero repeat customers.";

const WORDS = [
  ...LINE1.split(" ").map((word) => ({ word, accent: true })),
  ...LINE2.split(" ").map((word) => ({ word, accent: false })),
];

export default function RevealSection() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const textEl = textRef.current;
    if (!textEl) return;

    function updateWords() {
      if (!textEl) return;
      const rect = textEl.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.9;
      const end = vh * 0.45;
      const total = rect.height + (start - end);
      const traveled = start - rect.top;
      let progress = traveled / total;
      progress = Math.max(0, Math.min(1, progress));

      const activeCount = Math.round(progress * WORDS.length);
      wordRefs.current.forEach((el, i) => {
        if (!el) return;
        el.classList.toggle("active", i < activeCount);
      });
    }

    window.addEventListener("scroll", updateWords, { passive: true });
    window.addEventListener("resize", updateWords);
    updateWords();

    return () => {
      window.removeEventListener("scroll", updateWords);
      window.removeEventListener("resize", updateWords);
    };
  }, []);

  return (
    <section className="reveal-section">
      <div className="container-x">
        <p className="reveal-text font-display" ref={textRef}>
          {WORDS.map((w, i) => (
            <span
              key={i}
              className={`rv-word${w.accent ? " rv-accent" : ""}`}
              ref={(el) => {
                wordRefs.current[i] = el;
              }}
            >
              {w.word}{" "}
            </span>
          ))}
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