import { waLink } from "@/lib/site-data";
import s from "@/app/blog/blog.module.css";

// Both buttons open WhatsApp; the pre-filled message says which page the lead came from.
export default function CtaBox({
  title = "Want this done for your brand?",
  text = "Get a free growth audit. We'll review your ads, content and website and show you exactly where revenue is leaking.",
  context = "blog",
}: {
  title?: string;
  text?: string;
  /** Where the box sits, e.g. `blog`, `article "Meta Ads for Fashion Brands"`, `Performance Marketing page`. */
  context?: string;
}) {
  const audit = waLink(`Hi Dibiz Studio, I read your ${context} and would like to book a free growth audit for my brand.`);
  const chat = waLink(`Hi Dibiz Studio, I read your ${context} and have a question.`);
  return (
    <div className={s.cta} role="complementary">
      <div>
        <p className={s.ctaTitle}>{title}</p>
        <p className={s.ctaText}>{text}</p>
      </div>
      <div className={s.ctaActions}>
        <a href={audit} target="_blank" rel="noopener noreferrer" className={s.btnPrimary}>
          Book a Free Audit ↗
        </a>
        <a href={chat} target="_blank" rel="noopener noreferrer" className={s.btnGhost}>
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
