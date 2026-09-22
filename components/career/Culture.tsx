import FadeUp from "@/components/FadeUp";
import { cultureCards } from "@/lib/site-data";

export default function Culture() {
  return (
    <section className="culture">
      <div className="container-x">
        <div className="services-head" style={{ textAlign: "center", marginTop: 0 }}>
          <span className="pill-label">WHY DIBIZ</span>
          <h2 className="font-display">Why People Choose to Grow Here</h2>
        </div>
        <div className="culture-grid">
          {cultureCards.map((c) => (
            <FadeUp className="culture-card" key={c.title}>
              <div className="culture-icon">{c.emoji}</div>
              <h4>{c.title}</h4>
              <p>{c.desc}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
