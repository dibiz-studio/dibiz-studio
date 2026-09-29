import type { Metadata } from "next";
import { getAllPosts, SITE } from "@/lib/blog";
import BlogFilter from "@/components/blog/BlogFilter";
import CtaBox from "@/components/blog/CtaBox";
import s from "./blog.module.css";

const TITLE = "D2C Growth Blog: Content, Ads, Websites & Brand Building";
const DESCRIPTION =
  "Practical guides on content production, Meta ads, website development and brand building for D2C and fashion brands in India, from the team at Dibiz Studio, Mumbai.";

export const metadata: Metadata = {
  title: `${TITLE} | ${SITE.name}`,
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: `${SITE.url}/blog`,
    title: TITLE,
    description: DESCRIPTION,
    siteName: SITE.name,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE.name} Blog`,
    url: `${SITE.url}/blog`,
    description: DESCRIPTION,
    publisher: { "@type": "Organization", name: SITE.name, logo: SITE.logo },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE.url}/blog/${p.slug}`,
      datePublished: p.date,
    })),
  };

  return (
    <div className={s.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className={s.hero}>
        <p className={s.eyebrow}>The Dibiz Journal</p>
        <h1 className={s.heroTitle}>
          Growth playbooks for <em>D2C brands</em>
        </h1>
        <p className={s.heroText}>
          What we learn producing content, running ads, building websites and growing communities for D2C brands.
          Pick a service to explore.
        </p>
      </div>

      <BlogFilter posts={posts} featuredSlug={featured?.slug} />

      <CtaBox context="blog" />
    </div>
  );
}
