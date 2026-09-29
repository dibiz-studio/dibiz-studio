import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getRelatedPosts, formatDate, SITE } from "@/lib/blog";
import { Cover, PostCard } from "@/components/blog/PostCard";
import CtaBox from "@/components/blog/CtaBox";
import s from "../blog.module.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const url = `${SITE.url}/blog/${post.slug}`;
  const images = post.cover ? [{ url: post.cover, alt: post.coverAlt ?? post.title }] : undefined;
  return {
    title: `${post.title} | ${SITE.name}`,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      siteName: SITE.name,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      tags: post.tags,
      images,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${SITE.url}/blog/${post.slug}`;
  const related = getRelatedPosts(post);
  const share = encodeURIComponent(url);
  const shareText = encodeURIComponent(post.title);

  const jsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url,
      mainEntityOfPage: url,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      image: post.cover ? `${SITE.url}${post.cover}` : SITE.logo,
      author: { "@type": post.author === SITE.defaultAuthor ? "Organization" : "Person", name: post.author },
      publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: SITE.logo } },
      keywords: post.tags.join(", "),
      articleSection: post.category,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
  if (post.faqs.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return (
    <div className={s.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div role="navigation" aria-label="Breadcrumb" className={s.breadcrumb}>
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/blog">Blog</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{post.category}</span>
      </div>

      <div className={s.postHeader}>
        <span className={s.pill}>{post.category}</span>
        <h1 className={s.postTitle}>{post.title}</h1>
        <p className={s.postLead}>{post.description}</p>
        <div className={s.byline}>
          <span className={s.avatar} aria-hidden="true">
            {post.author.charAt(0)}
          </span>
          <div>
            <p className={s.authorName}>{post.author}</p>
            <p className={s.meta}>
              {post.authorRole && <span>{post.authorRole} · </span>}
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.updated && (
                <>
                  {" "}
                  · Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                </>
              )}{" "}
              · {post.readingTime} min read
            </p>
          </div>
        </div>
      </div>

      <div className={s.postCover}>
        <Cover post={post} priority />
      </div>

      <div className={s.postLayout}>
        <div className={s.sidebar}>
          <div className={s.sidebarInner}>
          {post.headings.length > 2 && (
            <div role="navigation" aria-label="Table of contents" className={s.toc}>
              <p className={s.tocTitle}>On this page</p>
              <ol>
                {post.headings.map((h) => (
                  <li key={h.id} className={h.level === 3 ? s.tocSub : undefined}>
                    <a href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
                {post.faqs.length > 0 && (
                  <li>
                    <a href="#faq">FAQs</a>
                  </li>
                )}
              </ol>
            </div>
          )}
          <div className={s.share}>
            <p className={s.tocTitle}>Share</p>
            <div className={s.shareRow}>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${share}`} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={`https://x.com/intent/tweet?url=${share}&text=${shareText}`} target="_blank" rel="noopener noreferrer">
                X
              </a>
              <a href={`https://wa.me/?text=${shareText}%20${share}`} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
          </div>
          </div>
        </div>

        <article className={s.prose}>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />

          {post.faqs.length > 0 && (
            <section id="faq" className={s.faq}>
              <h2>Frequently asked questions</h2>
              {post.faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </section>
          )}

          {post.tags.length > 0 && (
            <ul className={s.tags} aria-label="Tags">
              {post.tags.map((t) => (
                <li key={t}>#{t}</li>
              ))}
            </ul>
          )}

          <CtaBox context={`article "${post.title}"`} />
        </article>
      </div>

      {related.length > 0 && (
        <section className={s.section} aria-label="Related articles">
          <h2 className={s.sectionTitle}>Keep reading</h2>
          <div className={s.grid}>
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
