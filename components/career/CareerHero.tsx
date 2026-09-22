export default function CareerHero() {
  return (
    <section className="career-hero">
      <div className="container-x">
        <span className="hiring-badge">
          <span className="pulse-dot" /> Now Hiring · 8 Open Roles
        </span>
        <h1 className="font-display">
          Join the Team Behind <span style={{ color: "var(--accent)" }}>Fast-Growing Brands</span>
        </h1>
        <p>We&apos;re looking for creative and ambitious people who want to work on content, design, marketing, and client growth.</p>
        <div className="career-hero-ctas">
          <a href="#openings" className="btn">
            View Open Positions
          </a>
          <a href="#process" className="btn-ghost">
            See Hiring Process
          </a>
        </div>
      </div>
    </section>
  );
}
