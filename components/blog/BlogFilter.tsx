"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { SERVICES } from "@/lib/blog-shared";
import type { PostMeta } from "@/lib/blog-shared";
import { PostCard } from "./PostCard";
import s from "@/app/blog/blog.module.css";

function ServiceIcon({ name }: { name: string }) {
  const p = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "content")
    return (
      <svg {...p}>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </svg>
    );
  if (name === "growth")
    return (
      <svg {...p}>
        <path d="M4 20V10M10 20V6M16 20v-8M20 4l-5 5-3-3-8 8" />
      </svg>
    );
  if (name === "web")
    return (
      <svg {...p}>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
      </svg>
    );
  return (
    <svg {...p}>
      <path d="M6 3h12v18l-6-4-6 4z" />
    </svg>
  );
}

export default function BlogFilter({ posts, featuredSlug }: { posts: PostMeta[]; featuredSlug?: string }) {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    posts.forEach((p) => (c[p.category] = (c[p.category] ?? 0) + 1));
    return c;
  }, [posts]);

  const q = query.trim().toLowerCase();
  const showFeatured = active === "All" && !q && featuredSlug;
  const featured = showFeatured ? posts.find((p) => p.slug === featuredSlug) : undefined;

  const visible = useMemo(
    () =>
      posts.filter(
        (p) =>
          (active === "All" || p.category === active) &&
          (!q || `${p.title} ${p.description} ${p.tags.join(" ")}`.toLowerCase().includes(q)) &&
          p.slug !== featured?.slug,
      ),
    [posts, active, q, featured?.slug],
  );

  function pick(name: string) {
    const next = active === name ? "All" : name;
    setActive(next);
    if (next !== "All") listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      {/* Service tabs */}
      <div className={s.services} role="tablist" aria-label="Browse by service">
        {SERVICES.map((sv) => {
          const on = active === sv.name;
          const n = counts[sv.name] ?? 0;
          return (
            <button
              key={sv.name}
              role="tab"
              aria-selected={on}
              className={on ? `${s.service} ${s.serviceActive}` : s.service}
              onClick={() => pick(sv.name)}
            >
              <Image src={sv.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw" className={s.serviceImg} />
              <span className={s.serviceShade} aria-hidden="true" />
              <span className={s.serviceContent}>
                <span className={s.serviceIcon}>
                  <ServiceIcon name={sv.icon} />
                </span>
                <span className={s.serviceName}>{sv.name}</span>
                <span className={s.serviceBlurb}>{sv.blurb}</span>
                <span className={s.serviceCount}>
                  {n ? `${n} article${n > 1 ? "s" : ""}` : "Coming soon"} <span aria-hidden="true">→</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {featured && (
        <div className={s.featured} aria-label="Featured article">
          <PostCard post={featured} large />
        </div>
      )}

      <div ref={listRef} className={s.section}>
        <div className={s.toolbar}>
          <h2 className={s.sectionTitle}>{active === "All" ? "Latest articles" : active}</h2>
          <div className={s.toolbarRight}>
            {active !== "All" && (
              <button className={s.chip} onClick={() => setActive("All")}>
                ← All articles
              </button>
            )}
            <input
              type="search"
              className={s.search}
              placeholder="Search articles…"
              aria-label="Search articles"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {visible.length ? (
          <div className={s.grid}>
            {visible.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        ) : (
          <p className={s.empty}>
            {q ? "No articles match that search yet." : "New articles for this service are on the way."}
          </p>
        )}
      </div>
    </>
  );
}
