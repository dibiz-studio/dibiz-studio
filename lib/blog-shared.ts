/* Browser-safe helpers and types (no Node APIs). Used by both server and client components. */

export const SITE = {
  name: "Dibiz Studio",
  url: "https://www.dibizstudio.in",
  logo: "https://www.dibizstudio.in/logoo.png",
  calendly: "https://calendly.com/snigdhasingh-dibizsolution/discovery-call",
  whatsapp: "918928186991", // country code + number, no "+"
  defaultAuthor: "Dibiz Studio Team",
};

/**
 * Your 4 services. These show as the big tabs at the top of /blog.
 * A post appears under a service when its `category` matches `name` exactly.
 * `image` paths point to images already in your /public folder.
 */
export const SERVICES = [
  {
    name: "Content Production",
    image: "/content-production.png",
    icon: "content",
    blurb: "Hooks, UGC and ad creatives that actually persuade.",
  },
  {
    name: "Performance Marketing",
    image: "/performance-marketing.png",
    icon: "growth",
    blurb: "Meta & Google ads that scale proven winners.",
  },
  {
    name: "Website & App Development",
    image: "/website-app.png",
    icon: "web",
    blurb: "Fast, conversion-first stores and web apps.",
  },
  {
    name: "Brand & Community",
    image: "/brand-community.png",
    icon: "brand",
    blurb: "Positioning and communities that make people care.",
  },
] as const;

export type FAQ = { q: string; a: string };

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  updated?: string;
  author: string;
  authorRole?: string;
  category: string;
  tags: string[];
  cover?: string; // e.g. /blog/my-cover.jpg — a styled placeholder shows if missing
  coverAlt?: string;
  readingTime: number; // minutes
  featured?: boolean;
};

export type Heading = { id: string; text: string; level: 2 | 3 };

export type Post = PostMeta & { html: string; headings: Heading[]; faqs: FAQ[] };

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function formatDate(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
