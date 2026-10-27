"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { siteConfig } from "@/lib/site-data";

/**
 * Sends a Google Analytics event whenever someone clicks a contact link anywhere on the site:
 * - WhatsApp chats with Dibiz  -> "generate_lead" (method: whatsapp)
 * - Phone (tel:) / email (mailto:) -> "generate_lead" (method: phone / email)
 * Each event carries the button text, the page, and where on the page it was clicked,
 * so GA shows which buttons actually bring leads.
 * Article "share on WhatsApp" links (no Dibiz number) are not counted.
 */
/** Where on the page a link sits: an explicit data-cta label, else header/footer, else its section. */
function ctaLocation(link: HTMLAnchorElement): string {
  if (link.dataset.cta) return link.dataset.cta;
  if (link.closest("header")) return "header";
  if (link.closest("footer")) return "footer";
  const section = link.closest("section");
  if (section?.id) return section.id;
  // Skip hashed CSS-module class names (e.g. "services-module__abc__top"); they mean nothing in reports.
  const cls = section?.className.split(" ")[0];
  return cls && !cls.includes("__") ? cls : "page";
}

export default function LeadTracking() {
  useEffect(() => {
    const ourWhatsApp = `https://wa.me/${siteConfig.whatsappNumber}`;

    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href") ?? "";

      let method: "whatsapp" | "phone" | "email" | null = null;
      if (href.startsWith(ourWhatsApp)) method = "whatsapp";
      else if (href.startsWith("tel:")) method = "phone";
      // Job applications (career page resume email) are not client leads.
      else if (href.startsWith("mailto:") && !/subject=General(%20| )Application/.test(href)) method = "email";
      if (!method) return;

      sendGAEvent("event", "generate_lead", {
        method,
        // Icon-only buttons (floating WhatsApp) have no text, so fall back to their aria-label.
        cta_text: ((link.textContent ?? "").replace(/\s+/g, " ").trim() || link.getAttribute("aria-label") || "").slice(0, 80),
        cta_location: ctaLocation(link),
        page_path: window.location.pathname,
      });
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
