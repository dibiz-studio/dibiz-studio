import FadeUp from "@/components/FadeUp";
import { brandLogos } from "@/lib/site-data";

// Alt text for logos whose brand we know from the file name; the rest get a generic label.
const LOGO_NAMES: Record<string, string> = {
  "/mindwise.png": "Mindwise",
  "/zoukLogo.png": "Zouk",
  "/fuaarkLogo.png": "Fuaark",
};
const logoAlt = (src: string) =>
  LOGO_NAMES[src] ? `${LOGO_NAMES[src]} logo, a Dibiz Studio client` : "Dibiz Studio client brand logo";

export default function LogoMarquee() {
  const half = Math.ceil(brandLogos.length / 2);
  const row1Base = brandLogos.slice(0, half);
  const row2Base = brandLogos.slice(half);
  const row1 = [...row1Base, ...row1Base];
  const row2 = [...row2Base, ...row2Base];

  return (
    <section className="logos-section">
      <div className="container-x">
        <FadeUp>
          <span className="pill-label">BRAND COLLABORATIONS</span>
          <h2 className="font-display" style={{ fontSize: "clamp(2.2rem,5vw,3.4rem)", margin: 0 }}>
  <span style={{ color: "var(--accent)" }}>Brands</span> that trust us
</h2>
        </FadeUp>
        <div className="logos-marquee">
          <div className="logos-row r1">
            {/* The second copy only exists for the seamless loop, so screen readers and crawlers skip it */}
            {row1.map((src, i) => {
              const dup = i >= row1Base.length;
              return <img key={i} loading="lazy" decoding="async" src={src} alt={dup ? "" : logoAlt(src)} aria-hidden={dup || undefined} />;
            })}
          </div>
          <div className="logos-row r2">
            {row2.map((src, i) => {
              const dup = i >= row2Base.length;
              return <img key={i} loading="lazy" decoding="async" src={src} alt={dup ? "" : logoAlt(src)} aria-hidden={dup || undefined} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
