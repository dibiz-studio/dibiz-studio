import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/blog";
import { servicePages } from "@/lib/services";
import { DEFAULT_OG_IMAGE, JsonLd, orgRef } from "@/lib/seo";
import CtaBox from "@/components/blog/CtaBox";
import b from "../blog/blog.module.css";
import s from "./services.module.css";

const TITLE = "D2C Marketing Services: Content, Ads, Websites & Brand";
const DESCRIPTION =
  "End-to-end growth services for D2C and fashion brands in India: content production, Meta & Google performance marketing, Shopify and custom websites, and brand & community building.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: { type: "website", url: "/services", title: TITLE, description: DESCRIPTION, images: [DEFAULT_OG_IMAGE] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [DEFAULT_OG_IMAGE.url] },
};

export default function ServicesIndex() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dibiz Studio services",
    itemListElement: servicePages.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: p.category,
        url: `${SITE.url}/services/${p.slug}`,
        description: p.metaDescription,
        provider: orgRef(),
      },
    })),
  };

  return (
    <div className={b.page}>
      <JsonLd data={jsonLd} />

      <div className={b.hero}>
        <p className={b.eyebrow}>Our Services</p>
        <h1 className={b.heroTitle}>
          Growth services for <em>D2C brands</em>
        </h1>
        <p className={b.heroText}>
          Content, ads, websites and community, run as one system from our studio in Mumbai. We fix the foundation
          first, then scale what works.
        </p>
      </div>

      <div className={s.cards}>
        {servicePages.map((p) => (
          <Link key={p.slug} href={`/services/${p.slug}`} className={s.box} style={{ textDecoration: "none" }}>
            <Image
              src={p.img}
              alt={`${p.category} services`}
              width={800}
              height={600}
              sizes="(max-width: 640px) 100vw, 50vw"
              style={{ width: "100%", height: "auto", borderRadius: 12, marginBottom: 18 }}
            />
            <h2 style={{ margin: "0 0 8px", fontFamily: "var(--display)", fontSize: 22, fontWeight: 600 }}>
              {p.category}
            </h2>
            <p>{p.metaDescription}</p>
          </Link>
        ))}
      </div>

      <div className={b.section}>
        <CtaBox context="services page" />
      </div>
    </div>
  );
}
