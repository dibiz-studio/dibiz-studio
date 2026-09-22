import { siteConfig } from "@/lib/site-data";

export default function CtaSection({
  heading,
  buttonLabel = "Schedule a Call",
  buttonHref = siteConfig.bookCallUrl,
}: {
  heading: string;
  buttonLabel?: string;
  buttonHref?: string;
}) {
  const isExternal = buttonHref.startsWith("http") || buttonHref.startsWith("mailto:");
  return (
    <section className="section">
      <div className="container-x">
        <div className="cta-box">
          <h2 className="font-display" style={{ fontSize: "clamp(1.5rem,3.5vw,2.2rem)", margin: 0, maxWidth: "30rem" }}>
            {heading}
          </h2>
          <a href={buttonHref} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined} className="btn">
            {buttonLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
