import { SITE } from "@/lib/blog-shared";
import s from "@/app/blog/blog.module.css";

export default function CtaBox({
  title = "Want this done for your brand?",
  text = "Get a free growth audit. We'll review your ads, content and website and show you exactly where revenue is leaking.",
  context = "blog",
}: {
  title?: string;
  text?: string;
  context?: string;
}) {
  const wa = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    `Hi Dibiz Studio, I read your ${context} and would like a free growth audit.`,
  )}`;
  return (
    <div className={s.cta} role="complementary">
      <div>
        <p className={s.ctaTitle}>{title}</p>
        <p className={s.ctaText}>{text}</p>
      </div>
      <div className={s.ctaActions}>
        <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className={s.btnPrimary}>
          Book a Free Audit ↗
        </a>
        <a href={wa} target="_blank" rel="noopener noreferrer" className={s.btnGhost}>
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
