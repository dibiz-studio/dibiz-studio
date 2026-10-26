import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import { serviceHrefByTitle } from "@/lib/services";
import RibbonMarquee from "@/components/RibbonMarquee";
import { ServiceIcon } from "@/components/ServiceIcons";
import { services } from "@/lib/site-data";

export default function Services() {
  return (
    <section className="services" id="services">
      <RibbonMarquee label="SERVICES" />
      <FadeUp className="container-x services-head">
                       <span className="proven-btn">Our Services</span>
        <h2 className="font-display" style={{ fontSize: "clamp(2.2rem,5vw,3.4rem)" }}>
          What We <span style={{ color: "var(--accent)" }}>Fix</span> Before Scaling
        </h2>
      </FadeUp>
      <div className="container-x services-grid">
        {services.map((s) => (
          <FadeUp className="service-card" key={s.title}>
            <img loading="lazy" decoding="async" className="bg-img" src={s.img} alt="" />
            <ServiceIcon name={s.icon} className="service-icon" />
            <h3>
              <Link href={serviceHrefByTitle(s.title)}>{s.title}</Link>
            </h3>
            <p>{s.desc}</p>
            <Link href={serviceHrefByTitle(s.title)} className="service-more">
              Explore {s.title} →
            </Link>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
