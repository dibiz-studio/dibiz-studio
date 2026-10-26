"use client";

import { usePathname } from "next/navigation";
import { waLink } from "@/lib/site-data";
import { servicePages } from "@/lib/services";

/** The pre-filled message changes with the page, so the team knows what the visitor was looking at. */
function messageFor(path: string) {
  const service = servicePages.find((s) => path === `/services/${s.slug}`);
  if (service) return `Hi Dibiz Studio, I'm looking at your ${service.category} services and would like to talk.`;
  if (path.startsWith("/blog/")) return "Hi Dibiz Studio, I was reading your blog and would like to talk about growing my brand.";
  if (path.startsWith("/blog")) return "Hi Dibiz Studio, I came from your blog and would like to talk about growing my brand.";
  return "Hi Dibiz Studio, I'm on your website and would like to talk about growing my brand.";
}

export default function FloatingWhatsApp() {
  const path = usePathname() ?? "/";
  // Career page visitors are job seekers, not clients.
  if (path.startsWith("/career")) return null;

  return (
    <a
      href={waLink(messageFor(path))}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float"
      data-cta="floating-whatsapp"
      aria-label="Chat with Dibiz Studio on WhatsApp"
    >
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 3C6.98 3 3 6.73 3 11.4c0 2.33 1 4.43 2.62 5.94L5 21l3.86-1.73c.99.3 2.04.46 3.14.46 5.02 0 9-3.73 9-8.33S17.02 3 12 3zm-4 7.4a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4zm4 0a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4zm4 0a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
        />
      </svg>
      <span className="wa-float-label">Chat on WhatsApp</span>
    </a>
  );
}
