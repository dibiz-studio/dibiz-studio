"use client";

import { useEffect, useRef } from "react";
import { heroReelCol1Videos, heroReelCol2Videos, heroTrustAvatars, siteConfig } from "@/lib/site-data";

function ReelColumn({ videos, slow, colRef }: { videos: string[]; slow?: boolean; colRef: React.RefObject<HTMLDivElement | null> }) {
  const doubled = [...videos, ...videos];
  return (
    <div className="hero-video-col">
      <div className={`video-track${slow ? " slow" : ""}`} ref={colRef}>
        {doubled.map((src, i) => {
          const isEager = i < videos.length;
          return (
            <div className="reel-card" key={i}>
              <video
                muted
                loop
                playsInline
                autoPlay={isEager}
                preload={isEager ? "auto" : "none"}
                src={isEager ? src : undefined}
                data-src={isEager ? undefined : src}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Hero() {
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lazy-load the duplicated reel videos only once their column scrolls near them
    const reelObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          const src = video.dataset.src;
          if (entry.isIntersecting && src) {
            video.src = src;
            delete video.dataset.src;
            video.play().catch(() => {});
          }
        });
      },
      { rootMargin: "400px" }
    );

    [col1Ref.current, col2Ref.current].forEach((col) => {
      col?.querySelectorAll("video[data-src]").forEach((v) => reelObserver.observe(v));
    });

    return () => reelObserver.disconnect();
  }, []);

  return (
    <section className="hero">
      <div className="arches" />
      <div className="container-x hero-inner">
        <div className="hero-grid">
          <div className="hero-text-col">
            <span className="hero-eyebrow">
              <span className="pulse-dot" /> Social-First Growth Studio
            </span>
            <h1 className="hero-title font-display">
              Scaling <span className="brand-highlight">Brands<span className="mega">📣</span></span>
              <br />
              via Content
              <br />
              &amp; Tech.
            </h1>
            <div className="hero-trust">
              <div className="hero-trust-avatars">
                {heroTrustAvatars.map((src) => (
                  <img key={src} src={src} alt="" />
                ))}
              </div>
              <div className="hero-trust-divider" />
              <div>
                <div className="hero-trust-stars">★★★★★</div>
                <div className="hero-trust-sub">200+ 5-star reviews from D2C founders</div>
              </div>
            </div>
            <div className="hero-cta-row">
              <a href={siteConfig.bookCallUrl} target="_blank" rel="noopener noreferrer" className="btn">
                Schedule a Call ↗
              </a>
              <a href="#work" className="btn-ghost">
                See Our Work
              </a>
            </div>
          </div>
          <div className="hero-images">
            <ReelColumn videos={heroReelCol1Videos} colRef={col1Ref} />
            <ReelColumn videos={heroReelCol2Videos} slow colRef={col2Ref} />
          </div>
        </div>
      </div>
      <div className="capabilities-strip">
  <div className="capabilities-track">
    {[0, 1].map((rep) => (
      <div className="capabilities-inner" key={rep} aria-hidden={rep === 1}>
        <span>Content Production</span>
        <span>Website &amp; App Design</span>
        <span>Performance Marketing</span>
        <span>Brand and Community Building</span>
      </div>
    ))}
  </div>
</div>
      <div className="giant-logo">
        <span>DIBIZ</span>
      </div>
    </section>
  );
}