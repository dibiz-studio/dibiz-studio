import FadeUp from "@/components/FadeUp";
import { brandLogos } from "@/lib/site-data";

export default function LogoMarquee() {
  const half = Math.ceil(brandLogos.length / 2);
  const row1 = [...brandLogos.slice(0, half), ...brandLogos.slice(0, half)];
  const row2 = [...brandLogos.slice(half), ...brandLogos.slice(half)];

  return (
    <section className="logos-section">
      <div className="container-x">
        <FadeUp>
          <span className="pill-label">BRANDS COLLABORAATIONS</span>
          <h2 className="font-display" style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", margin: 0 }}>
            Brands that trust us
          </h2>
        </FadeUp>
        <div className="logos-marquee">
          <div className="logos-row r1">
            {row1.map((src, i) => (
              <img key={i} loading="lazy" decoding="async" src={src} alt="" />
            ))}
          </div>
          <div className="logos-row r2">
            {row2.map((src, i) => (
              <img key={i} loading="lazy" decoding="async" src={src} alt="" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
