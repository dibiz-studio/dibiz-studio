import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Marked } from "marked";

import { SITE, slugify } from "./blog-shared";
import type { FAQ, Heading, Post, PostMeta } from "./blog-shared";

export * from "./blog-shared";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

function decodeEntities(t: string) {
  return t
    .replace(/&#39;|&#x27;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

function toMeta(slug: string, data: Record<string, unknown>, content: string): PostMeta {
  return {
    slug,
    title: String(data.title),
    description: String(data.description ?? ""),
    date: String(data.date),
    updated: data.updated ? String(data.updated) : undefined,
    author: String(data.author ?? SITE.defaultAuthor),
    authorRole: data.authorRole ? String(data.authorRole) : undefined,
    category: String(data.category ?? "Growth"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover: data.cover ? String(data.cover) : undefined,
    coverAlt: data.coverAlt ? String(data.coverAlt) : undefined,
    readingTime: readingTime(content),
    featured: Boolean(data.featured),
  };
}

function postFiles() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => /\.mdx?$/.test(f));
}

/** All published posts, newest first. Posts with `draft: true` or a future date are hidden. */
export function getAllPosts(): PostMeta[] {
  const today = new Date().toISOString().slice(0, 10);
  return postFiles()
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data, content } = matter(raw);
      if (data.draft || String(data.date) > today) return null;
      return toMeta(file.replace(/\.mdx?$/, ""), data, content);
    })
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getCategories(): string[] {
  return Array.from(new Set(getAllPosts().map((p) => p.category)));
}

export function getPostBySlug(slug: string): Post | null {
  const file = postFiles().find((f) => f.replace(/\.mdx?$/, "") === slug);
  if (!file) return null;
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  if (data.draft) return null;

  const headings: Heading[] = [];
  const used = new Map<string, number>();
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        const plain = decodeEntities(text.replace(/<[^>]+>/g, ""));
        let id = slugify(plain);
        const n = used.get(id) ?? 0;
        used.set(id, n + 1);
        if (n) id = `${id}-${n}`;
        if (depth === 2 || depth === 3) headings.push({ id, text: plain, level: depth });
        return `<h${depth} id="${id}"><a href="#${id}" class="anchor" aria-hidden="true">#</a>${text}</h${depth}>`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href) && !href.startsWith(SITE.url);
        const t = title ? ` title="${title}"` : "";
        return external
          ? `<a href="${href}"${t} target="_blank" rel="noopener noreferrer">${text}</a>`
          : `<a href="${href}"${t}>${text}</a>`;
      },
      image({ href, title, text }) {
        const t = title ? `<figcaption>${title}</figcaption>` : "";
        return `<figure><img src="${href}" alt="${text}" loading="lazy" decoding="async" />${t}</figure>`;
      },
    },
  });

  const html = marked.parse(content, { async: false }) as string;
  const faqs: FAQ[] = Array.isArray(data.faqs)
    ? data.faqs.map((f: { q: string; a: string }) => ({ q: String(f.q), a: String(f.a) }))
    : [];

  return { ...toMeta(slug, data, content), html, headings, faqs };
}

/** Related posts: same category first, then shared tags, then newest. */
export function getRelatedPosts(post: PostMeta, limit = 3): PostMeta[] {
  return getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      p,
      score: (p.category === post.category ? 3 : 0) + p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score || (a.p.date < b.p.date ? 1 : -1))
    .slice(0, limit)
    .map((x) => x.p);
}
