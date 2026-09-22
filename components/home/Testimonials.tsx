"use client";

import { useEffect, useState } from "react";
import RibbonMarquee from "@/components/RibbonMarquee";
import { testimonials, type Testimonial } from "@/lib/site-data";

export default function Testimonials() {
  const [active, setActive] = useState<Testimonial | null>(null);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="testimonials">
      <RibbonMarquee label="TESTIMONIALS" top="0.5rem" />
      <p className="testi-big font-display">
        Real Brands.
        <br />
        Real Growth.
        <br />
        Real Results.
      </p>
      <div className="container-x testi-cards">
        {testimonials.map((t) => (
          <div className="testi-card" key={t.name} onClick={() => setActive(t)}>
            <img className="testi-photo" loading="lazy" decoding="async" src={t.img} alt="" />
            <div className="testi-info">
              <p className="testi-hook">{t.hook}</p>
              <div className="testi-foot">
                <div>
                  <div className="name">{t.name}</div>
                  <div className="role">{t.role}</div>
                </div>
                <button className="testi-expand" aria-label="Read full testimonial">
                  →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`testi-modal${active ? " open" : ""}`} onClick={() => setActive(null)}>
        <div className="testi-modal-card" onClick={(e) => e.stopPropagation()}>
          <button className="testi-modal-close" aria-label="Close" onClick={() => setActive(null)}>
            ✕
          </button>
          <p className="testi-modal-quote">{active?.quote}</p>
          <div className="testi-modal-foot">
            <img src={active?.img} alt="" />
            <div>
              <div className="name">{active?.name}</div>
              <div className="role">{active?.role}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
