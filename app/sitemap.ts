import type { MetadataRoute } from "next";
import { getAllPosts, SITE } from "@/lib/blog";
import { servicePages } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const services = servicePages.map((p) => ({
    url: `${SITE.url}/services/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const posts = getAllPosts().map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.updated ?? p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: SITE.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ...services,
    { url: `${SITE.url}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/career`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ...posts,
  ];
}
