"use client";

import { useEffect, useRef } from "react";
import { coverflowVideos } from "@/lib/site-data";

export default function ResultsCoverflow() {
  const coverflowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const indexRef = useRef(0);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const n = cards.length;

    function layout() {
      cards.forEach((card, i) => {
        let offset = i - indexRef.current;
        if (offset > n / 2) offset -= n;
        if (offset < -n / 2) offset += n;
        const abs = Math.abs(offset);
        card.style.transform = `translateX(${offset * 62}%) scale(${1 - abs * 0.18}) rotateY(${offset * -25}deg)`;
        card.style.zIndex = String(10 - abs);
        card.style.opacity = abs > 2 ? "0" : String(1 - abs * 0.25);
        card.style.filter = abs === 0 ? "none" : "brightness(0.6)";
      });
    }

    function syncVideos() {
      cards.forEach((card, i) => {
        let offset = i - indexRef.current;
        if (offset > n / 2) offset -= n;
        if (offset < -n / 2) offset += n;
        const video = card.querySelector("video") as HTMLVideoElement | null;
        if (!video) return;
        if (Math.abs(offset) <= 1) {
          const src = video.dataset.src;
          if (src) {
            video.src = src;
            delete video.dataset.src;
          }
          video.play().catch(() => {});
        } else if (!video.dataset.src) {
          video.pause();
        }
      });
    }

    let interval: ReturnType<typeof setInterval> | null = null;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            layout();
            syncVideos();
            sectionObserver.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    if (coverflowRef.current) sectionObserver.observe(coverflowRef.current);

    layout();
    interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % n;
      layout();
      syncVideos();
    }, 2600);

    return () => {
      sectionObserver.disconnect();
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <section className="results">
      <h2 className="font-display">
        <span className="o">Results</span> We&apos;ve Delivered
      </h2>
      <div className="coverflow" ref={coverflowRef}>
        {coverflowVideos.map((src, i) => (
          <div
            className="cf-card"
            key={src}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
          >
            <video muted loop playsInline preload="none" data-src={src} />
          </div>
        ))}
      </div>
    </section>
  );
}
