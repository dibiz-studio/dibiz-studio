import { siteConfig, solutionTags } from "@/lib/site-data";

export default function Solution() {
  return (
    <section className="solution" id="about">
      <div className="container-x">
        <h2 className="solution-title">The Solution</h2>
        <div className="solution-grid">
          <div className="tag-orbit">
            <img
              loading="lazy"
              decoding="async"
              className="bg"
              src="https://framerusercontent.com/images/QHwiFG8CdFS1wdIHWtWHvAuzLAM.jpg?scale-down-to=1024&width=3000&height=4500"
              alt=""
            />
            <div className="tag-cloud">
              {solutionTags.map((tag, i) => (
                <span key={tag} style={{ animationDelay: `${i * 0.3}s` }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="solution-copy">
            <p>
              We partner with D2C brands to design end-to-end growth — high-performing content, optimized websites, retention funnels, and spend on ads only when the foundation is ready.
            </p>
            <p>Growth Isn&apos;t Magic. It&apos;s Strategy, Content &amp; Systems working together to drive profitability.</p>
          </div>
        </div>
        <div className="solution-cta">
          <a href={siteConfig.bookCallUrl} target="_blank" rel="noopener noreferrer" className="btn">
            Schedule a Call
          </a>
        </div>
      </div>
    </section>
  );
}
