import FadeUp from "@/components/FadeUp";
import RibbonMarquee from "@/components/RibbonMarquee";
import { ServiceIcon } from "@/components/ServiceIcons";
import { services } from "@/lib/site-data";

export default function Services() {
  return (
    <section className="services" id="services">
      <RibbonMarquee label="SERVICES" />
      <FadeUp className="container-x services-head">
        <span className="pill-label">SERVICES</span>
        <h2 className="font-display">What We Fix Before Scaling</h2>
      </FadeUp>
      <div className="container-x services-grid">
        {services.map((s) => (
          <FadeUp className="service-card" key={s.title}>
            <img loading="lazy" decoding="async" className="bg-img" src={s.img} alt="" />
            <ServiceIcon name={s.icon} className="service-icon" />
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
