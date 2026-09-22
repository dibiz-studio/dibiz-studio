import FadeUp from "@/components/FadeUp";
import { StatIcon } from "@/components/career/StatIcon";
import { careerStats } from "@/lib/site-data";

export default function CareerStats() {
  return (
    <section className="career-stats-section">
      <div className="container-x career-stats">
        {careerStats.map((s) => (
          <FadeUp className="career-stat" key={s.label}>
            <StatIcon name={s.icon} />
            <div className="num">{s.num}</div>
            <div className="lbl">{s.label}</div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
