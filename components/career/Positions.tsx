import FadeUp from "@/components/FadeUp";
import { positions } from "@/lib/site-data";

export default function Positions() {
  return (
    <section className="positions" id="openings">
      <div className="container-x">
        <div className="services-head" style={{ textAlign: "center", marginTop: 0 }}>
          <span className="pill-label">OPEN POSITIONS</span>
          <h2 className="font-display">Find Your Role</h2>
        </div>
        <div className="positions-grid">
          {positions.map((p) => (
            <FadeUp className="position-card" key={p.title}>
              <div className="position-icon">{p.icon}</div>
              <div className="position-top">
                <h3>{p.title}</h3>
                <span className="position-tag">{p.tag}</span>
              </div>
              <p>{p.desc}</p>
              <div className="position-foot">
                <span className="position-loc">📍 Malad, Mumbai</span>
                <a href={p.applyUrl} target="_blank" rel="noopener noreferrer" className="position-apply">
                  Apply →
                </a>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
