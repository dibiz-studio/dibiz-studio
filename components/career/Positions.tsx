"use client";

import { useMemo, useState } from "react";
import FadeUp from "@/components/FadeUp";
import { positions } from "@/lib/site-data";

export default function Positions() {
  const tags = useMemo(
    () => Array.from(new Set(positions.map((p) => p.tag))),
    []
  );
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);

  const filtered = activeTag
    ? positions.filter((p) => p.tag === activeTag)
    : positions;

  const visible = filtered.slice(0, visibleCount);

  function selectAll() {
    setActiveTag(null);
    setVisibleCount(4);
    setMenuOpen(false);
  }

  function selectTag(tag: string) {
    setActiveTag(tag);
    setVisibleCount(4);
    setMenuOpen(false);
  }

  return (
    <section className="positions" id="openings">
      <div className="container-x">
        <div className="services-head" style={{ textAlign: "center", marginTop: 0 }}>
          <span className="pill-label">OPEN POSITIONS</span>
          <h2 className="font-display">Find Your Role</h2>
        </div>

        <div className="positions-tabs">
          <button
            type="button"
            className={`positions-tab ${activeTag === null ? "is-active" : ""}`}
            onClick={selectAll}
          >
            All Open Positions
          </button>

          <div className="positions-filter">
            <button
              type="button"
              className={`positions-tab positions-filter-btn ${activeTag ? "is-active" : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {activeTag ?? "Select a Role"}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {menuOpen && (
              <div className="positions-filter-menu">
                {tags.map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    className={`positions-filter-item ${activeTag === tag ? "is-active" : ""}`}
                    onClick={() => selectTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="positions-grid">
          {visible.map((p) => (
            <FadeUp className="position-card" key={p.title}>
              <div className="position-icon">{p.icon}</div>
              <div className="position-top">
                <h3>{p.title}</h3>
                <span className="position-tag">{p.tag}</span>
              </div>
              <p>{p.desc}</p>
              <div className="position-foot">
                <span className="position-loc">📍 Malad, Mumbai</span>
                <a href={p.applyUrl} target="_blank" rel="noopener noreferrer" className="position-apply">
                  Apply →
                </a>
              </div>
            </FadeUp>
          ))}
        </div>

        {visibleCount < filtered.length && (
          <div className="positions-more">
            <button type="button" className="btn-view-more" onClick={() => setVisibleCount((c) => c + 4)}>
              View More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}