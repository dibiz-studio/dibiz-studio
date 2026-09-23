"use client";

import { useEffect, useRef } from "react";
import FadeUp from "@/components/FadeUp";
import { showcaseVideos } from "@/lib/site-data";

export default function VideoShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const filmstripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const filmstrip = filmstripRef.current;
    if (!track || !filmstrip) return;

    const filmObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            if (!video.src && video.dataset.src) {
              video.src = video.dataset.src;
              video.load();
            }
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { root: filmstrip, rootMargin: "200px", threshold: 0.1 }
    );

    track.querySelectorAll("video").forEach((v) => filmObserver.observe(v));
    return () => filmObserver.disconnect();
  }, []);

  const doubled = [...showcaseVideos, ...showcaseVideos];

  return (
    <section className="showcase" id="work">
      <FadeUp className="container-x showcase-head">
        <span className="proven-btn">Our Proven Process</span>
       <h2 className="font-display">
  <span style={{ color: "var(--accent)" }}>Brands</span> That Didn&apos;t Just Launch They Took Off
</h2>
        <p>High-converting video creatives shot for fast-growing D2C brands. Real results. Real scale.</p>
      </FadeUp>
      <div className="filmstrip" ref={filmstripRef}>
        <div className="filmstrip-track" ref={trackRef}>
          {doubled.map((src, i) => (
            <div className="film-card" key={i}>
              <video muted loop playsInline preload="none" data-src={src} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
