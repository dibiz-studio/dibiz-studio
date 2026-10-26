import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPosts, SITE } from "@/lib/blog";
import { getServicePage, servicePages } from "@/lib/services";
import { DEFAULT_OG_IMAGE, JsonLd, orgRef } from "@/lib/seo";
import { siteConfig } from "@/lib/site-data";
import { PostCard } from "@/components/blog/PostCard";
import CtaBox from "@/components/blog/CtaBox";
import b from "../../blog/blog.module.css";
import s from "../services.module.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};
  const path = `/services/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, title: page.metaTitle, description: page.metaDescription, images: [DEFAULT_OG_IMAGE] },
    twitter: { card: "summary_large_image", title: page.metaTitle, description: page.metaDescription, images: [DEFAULT_OG_IMAGE.url] },
  };
}

export default async function ServicePageRoute({ params }: Props) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  const url = `${SITE.url}/services/${page.slug}`;
  const posts = getAllPosts()
    .filter((p) => p.category === page.category)
    .slice(0, 3);
  const others = servicePages.filter((p) => p.slug !== page.slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.h1,
      serviceType: page.category,
      description: page.metaDescription,
      url,
      provider: orgRef(),
      areaServed: { "@type": "Country", name: "India" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: page.category,
        itemListElement: page.included.map((i) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: i.title, description: i.desc },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
        { "@type": "ListItem", position: 3, name: page.category, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <div className={b.page}>
      <JsonLd data={jsonLd} />

      <nav aria-label="Breadcrumb" className={b.breadcrumb}>
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/services">Services</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{page.category}</span>
      </nav>

      <section className={s.top}>
        <div>
          <span className={b.pill}>{page.eyebrow}</span>
          <h1 className={s.title}>{page.h1}</h1>
          {page.intro.map((p) => (
            <p key={p} className={s.lead}>
              {p}
            </p>
          ))}
          <div className={s.actions}>
            <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className={b.btnPrimary}>
              Book a Free Audit ↗
            </a>
            <a href={siteConfig.bookCallUrl} target="_blank" rel="noopener noreferrer" className={b.btnGhost}>
              Chat on WhatsApp
            </a>
          </div>
        </div>
        <div className={s.visual}>
          <Image
            src={page.img}
            alt={`${page.category} services by Dibiz Studio`}
            width={1200}
            height={900}
            sizes="(max-width: 960px) 100vw, 40vw"
            priority
          />
        </div>
      </section>

      <section className={b.section} aria-labelledby="included">
        <h2 id="included" className={b.sectionTitle}>
          What&apos;s included
        </h2>
        <div className={s.cards}>
          {page.included.map((i) => (
            <div key={i.title} className={s.box}>
              <h3>{i.title}</h3>
              <p>{i.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={b.section} aria-labelledby="approach">
        <h2 id="approach" className={b.sectionTitle}>
          How we work
        </h2>
        <div className={s.steps}>
          {page.approach.map((a) => (
            <div key={a.title} className={s.box}>
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${b.section} ${s.split}`}>
        <div>
          <h2 className={b.sectionTitle}>Who it&apos;s for</h2>
          <ul className={s.list}>
            {page.forWho.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
        {page.proof && (
          <div>
            <h2 className={b.sectionTitle}>What clients say</h2>
            <blockquote className={s.quote}>
              <p>&ldquo;{page.proof.quote}&rdquo;</p>
              <footer>— {page.proof.brand}</footer>
            </blockquote>
          </div>
        )}
      </section>

      <section className={`${b.section} ${s.faqWrap}`} aria-labelledby="faq">
        <div className={b.faq}>
          <h2 id="faq" className={b.sectionTitle}>
            Frequently asked questions
          </h2>
          {page.faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {posts.length > 0 && (
        <section className={b.section} aria-label={`${page.category} articles`}>
          <h2 className={b.sectionTitle}>Guides on {page.category.toLowerCase()}</h2>
          <div className={b.grid}>
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      <section className={b.section} aria-label="Other services">
        <h2 className={b.sectionTitle}>Other services</h2>
        <div className={s.others}>
          {others.map((o) => (
            <Link key={o.slug} href={`/services/${o.slug}`}>
              {o.navLabel}
            </Link>
          ))}
        </div>
      </section>

      <div className={b.section}>
        <CtaBox context={`${page.category} page`} />
      </div>
    </div>
  );
}
