"use client";

import { useCallback, useEffect, useState } from "react";
import { testimonials } from "@/lib/site-data";

/* ---------- Icons ---------- */
const QuoteIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 24" fill="currentColor" aria-hidden="true">
    <path d="M0 24V14.4C0 6.4 4.2 1.6 12.6 0l1.4 3.4C9.6 4.6 7.4 7.2 7 11.2h6.2V24H0Zm18 0V14.4C18 6.4 22.2 1.6 30.6 0L32 3.4c-4.4 1.2-6.6 3.8-7 7.8h6.2V24H18Z" />
  </svg>
);

const VerifiedIcon = () => (
  <svg className="testi-verified" viewBox="0 0 24 24" aria-label="Verified">
    <path
      fill="currentColor"
      d="M12 1.5l2.6 1.9 3.2-.2 1 3.1 2.6 1.9-1 3.1 1 3.1-2.6 1.9-1 3.1-3.2-.2L12 22.5l-2.6-1.9-3.2.2-1-3.1-2.6-1.9 1-3.1-1-3.1 2.6-1.9 1-3.1 3.2.2L12 1.5z"
    />
    <path d="M7.5 12.2l3 3 6-6" fill="none" stroke="#0a0a0a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Arrow = ({ dir = "right" }: { dir?: "left" | "right" }) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transform: dir === "left" ? "rotate(180deg)" : undefined }}
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

/* ---------- Helpers ---------- */
// data me pehle se quotes / tick hain, unhe hata ke clean text dikhate hain
const stripQuotes = (s = "") => s.replace(/^["“”'‘’\s]+|["“”'‘’\s]+$/g, "");
const cleanName = (s = "") => s.replace(/[✓✔☑]/g, "").trim();

/* ---------- Component ---------- */
export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const total = testimonials.length;
  const active = activeIndex !== null ? testimonials[activeIndex] : null;

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % total)),
    [total]
  );
  const prev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + total) % total)),
    [total]
  );

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (activeIndex === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activeIndex, close, next, prev]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="testimonials" id="testimonials">
      <div className="testi-glow testi-glow--left" aria-hidden="true" />
      <div className="testi-glow testi-glow--right" aria-hidden="true" />

      <div className="container-x">
        {/* Header */}
        <header className="testi-header">
          <p className="testi-eyebrow">
            <span className="line" />
            CLIENT TESTIMONIALS
            <span className="line" />
          </p>
          <h2 className="testi-title font-display">
            Real Growth. <span className="accent">Real Results.</span>
          </h2>
          <p className="testi-sub">
            From ambitious startups to established brands, we help businesses build, scale and
            create a stronger digital presence. Here&apos;s what our clients have to say.
          </p>
        </header>

        {/* Cards */}
        <div className="testi-grid">
          {testimonials.map((t, i) => (
            <article
              className="testi-card"
              key={t.name}
              onClick={() => setActiveIndex(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveIndex(i)}
            >
              <div className="testi-card-top">
                <div className="testi-avatar">
                  <img src={t.img} alt={t.name} loading="lazy" decoding="async" />
                </div>
                <div className="testi-card-body">
                  <QuoteIcon className="testi-quote-icon" />
                  <h3 className="testi-hook">&ldquo;{stripQuotes(t.hook)}&rdquo;</h3>
                  <p className="testi-excerpt">{t.quote}</p>
                </div>
              </div>

              <div className="testi-card-foot">
                <div>
                  <div className="testi-name">
                    {cleanName(t.name)} <VerifiedIcon />
                  </div>
                  <div className="testi-role">{t.role}</div>
                </div>
                <button
                  className="testi-arrow-btn"
                  aria-label={`Read full testimonial from ${t.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(i);
                  }}
                >
                  <Arrow />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal */}
      <div
        className={`testi-modal${active ? " open" : ""}`}
        onClick={close}
        aria-hidden={!active}
      >
        <div
          className="testi-modal-card"
          role="dialog"
          aria-modal="true"
          aria-label={active ? `Testimonial from ${active.name}` : undefined}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="testi-modal-close" aria-label="Close" onClick={close}>
            <CloseIcon />
          </button>

          {active && (
            <div className="testi-modal-content" key={activeIndex}>
              <div className="testi-modal-head">
                <div className="testi-avatar testi-avatar--lg">
                  <img src={active.img} alt={active.name} />
                </div>
                <div>
                  <div className="testi-name testi-name--lg">
                    {cleanName(active.name)} <VerifiedIcon />
                  </div>
                  <div className="testi-role testi-role--lg">{active.role}</div>
                </div>
              </div>

              <h3 className="testi-modal-hook">&ldquo;{stripQuotes(active.hook)}&rdquo;</h3>
              <p className="testi-modal-quote">{active.quote}</p>

              <div className="testi-modal-foot">
                <QuoteIcon className="testi-modal-quote-icon" />
                <div className="testi-modal-nav">
                  <span className="testi-counter">
                    {pad((activeIndex ?? 0) + 1)} / {pad(total)}
                  </span>
                  <button className="testi-nav-btn testi-nav-btn--ghost" aria-label="Previous" onClick={prev}>
                    <Arrow dir="left" />
                  </button>
                  <button className="testi-nav-btn" aria-label="Next" onClick={next}>
                    <Arrow />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
