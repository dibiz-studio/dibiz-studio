import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/blog";
import { caseStudies } from "@/lib/case-studies";
import { servicePages } from "@/lib/services";
import { brandLogos, waLink } from "@/lib/site-data";
import { DEFAULT_OG_IMAGE, JsonLd, orgRef } from "@/lib/seo";
import CtaBox from "@/components/blog/CtaBox";
import b from "../blog/blog.module.css";
import s from "./case-studies.module.css";

const TITLE = "Case Studies: D2C Brands We've Helped Grow";
const DESCRIPTION =
  "How Dibiz Studio works with D2C brands like Mindwise, XYXX, Signature, Fuaark, Zouk and bloomastra on websites, ad creatives, Meta ads and brand building.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/case-studies" },
  openGraph: { type: "website", url: "/case-studies", title: TITLE, description: DESCRIPTION, images: [DEFAULT_OG_IMAGE] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [DEFAULT_OG_IMAGE.url] },
};

// Client logos from the homepage marquee, minus brands that already have a case study above
// and one duplicate upload. Matched by the image ID in the Framer URL.
const HIDDEN_LOGOS = [
  "/mindwise.png",
  "/zoukLogo.png",
  "/fuaarkLogo.png",
  "Tw1Q3rUISOWGx5PYiPbA9za0", // bloomastra (has its own case study)
  "eQMFC3BzVjQWLjudFIARb9ivDA8", // Aayush, second copy of the same logo
];
// White or very light logos that disappear on a white card get a dark card instead.
const LIGHT_LOGOS = [
  "PanybpCnMAXRTAjbssfFuVp358", // white logo
  "F0AMqzRJotPJXSpwXAUDohu1zQ", // SUYU, pale on white
  "dWuG7k1iQ35t2GZRRGRBgoT7JA", // logo with its own dark background
];
const matches = (src: string, ids: string[]) => ids.some((id) => src.includes(id));
const moreLogos = brandLogos.filter((src) => !matches(src, HIDDEN_LOGOS));
const half = Math.ceil(moreLogos.length / 2);
const logoRows = [moreLogos.slice(0, half), moreLogos.slice(half)];

const serviceHref = (name: string) => {
  const p = servicePages.find((sp) => sp.category === name);
  return p ? `/services/${p.slug}` : "/services";
};

export default function CaseStudiesPage() {
  const url = `${SITE.url}/case-studies`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: TITLE,
      description: DESCRIPTION,
      url,
      publisher: orgRef(),
      hasPart: caseStudies.map((c) => ({
        "@type": "CreativeWork",
        name: `${c.brand} case study`,
        url: `${url}#${c.slug}`,
        about: c.services,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Case Studies", item: url },
      ],
    },
  ];

  return (
    <div className={b.page}>
      <JsonLd data={jsonLd} />

      <div className={b.hero}>
        <p className={b.eyebrow}>Selected Work</p>
        <h1 className={b.heroTitle}>
          Brands we&apos;ve helped <em>grow</em>
        </h1>
        <p className={b.heroText}>
          A few of the D2C brands we&apos;ve built websites, ad creatives, Meta ads and brands for, and what they say about
          working with us.
        </p>
      </div>

      <nav aria-label="Jump to a case study" className={s.jump}>
        {caseStudies.map((c) => (
          <a key={c.slug} href={`#${c.slug}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.logo} alt="" />
            {c.brand}
          </a>
        ))}
      </nav>

      <div className={s.list}>
        {caseStudies.map((c, i) => (
          <article key={c.slug} id={c.slug} className={s.study} aria-labelledby={`${c.slug}-title`}>
            <div className={s.side}>
              <span className={s.num} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <div className={s.logo}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.logo} alt={`${c.brand} logo`} loading="lazy" decoding="async" />
              </div>
              <h2 id={`${c.slug}-title`} className={s.brand}>
                {c.brand}
              </h2>
              {c.duration && <p className={s.duration}>{c.duration} together</p>}
              <ul className={s.tags} aria-label="Services">
                {c.services.map((name) => (
                  <li key={name}>
                    <Link href={serviceHref(name)}>{name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.body}>
              <div>
                <p className={s.label}>The brief</p>
                <p className={s.brief}>{c.brief}</p>
              </div>

              <div>
                <p className={s.label}>What we did</p>
                <ul className={s.work}>
                  {c.work.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </div>

              {c.results.length > 0 && (
                <div>
                  <p className={s.label}>Results</p>
                  <div className={s.results}>
                    {c.results.map((r) => (
                      <div key={r.label} className={s.metric}>
                        <b>{r.value}</b>
                        <span>{r.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <blockquote className={s.quote}>
                <p>&ldquo;{c.quote}&rdquo;</p>
                <footer>— {c.quoteBy}</footer>
              </blockquote>

              <a
                className={s.studyCta}
                href={waLink(`Hi Dibiz Studio, I saw your ${c.brand} case study and would like similar results for my brand.`)}
                target="_blank"
                rel="noopener noreferrer"
                data-cta={`case-study-${c.slug}`}
              >
                Want this for your brand? Chat on WhatsApp →
              </a>
            </div>
          </article>
        ))}
      </div>

      <section className={`${b.section} ${s.wall}`} aria-labelledby="more-brands">
        <p className={s.wallEyebrow}>And many more</p>
        <h2 id="more-brands" className={s.moreTitle}>
          Brands that <em>trust us</em>
        </h2>
        <p className={s.moreText}>Content, ads and websites for D2C and fashion brands.</p>
        <div className={s.marquee}>
          {[logoRows[0], logoRows[1]].map((row, r) => (
            <div key={r} className={`${s.track} ${r === 1 ? s.reverse : ""}`}>
              {/* Each row is rendered twice for a seamless loop; the copy is hidden from screen readers. */}
              {[0, 1].map((copy) => (
                <ul key={copy} className={s.row} aria-hidden={copy === 1 || undefined}>
                  {row.map((src) => (
                    <li key={src} className={matches(src, LIGHT_LOGOS) ? s.darkCard : undefined}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt={copy === 1 ? "" : "Dibiz Studio client brand logo"} loading="lazy" decoding="async" />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          ))}
        </div>
      </section>

      <div className={b.section}>
        <CtaBox context="case studies" title="Your brand could be next" />
      </div>
    </div>
  );
}
