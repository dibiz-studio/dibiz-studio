import Link from "next/link";
import { siteConfig } from "@/lib/site-data";
import { servicePages } from "@/lib/services";

export default function Footer() {
  return (
    <footer className="footer" id="growth">
      <div className="container-x footer-grid">
        <div>
          <div className="contact-card">
            <span className="ic">✉</span> <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </div>
          <div className="contact-card">
            <span className="ic">☎</span> <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
          </div>
          <div className="contact-card">
            <span className="ic">📍</span>{" "}
            <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer">
              {siteConfig.address}
            </a>
          </div>
        </div>
        <div>
          <div className="footer-title">Menu</div>
          <ul className="footer-list">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/#about">About</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/career">Career</Link></li>
            <li><Link href="/#growth">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="footer-title">Services</div>
          <ul className="footer-list">
            {servicePages.map((p) => (
              <li key={p.slug}>
                <Link href={`/services/${p.slug}`}>{p.navLabel}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="newsletter">
            <input placeholder="name@email.com" />
            <a href="#" className="btn" style={{ whiteSpace: "nowrap" }}>
              Subscribe
            </a>
          </div>
          <div className="social-box">
            <p>Follow us:</p>
            <div className="social-icons">
  
  <a href="https://in.linkedin.com/company/dibiz-studio" target="_blank" rel="noopener noreferrer">
    <img src="/linkedin.png" alt="LinkedIn" />
  </a>
  <a href="https://www.instagram.com/dibizstudio" target="_blank" rel="noopener noreferrer">
    <img src="/instagram.png" alt="Instagram" />
  </a>
  <a href="https://www.facebook.com/Dibizsolution" target="_blank" rel="noopener noreferrer">
    <img src="/facebook.png" alt="Facebook" />
  </a>
</div>
          </div>
        </div>
      </div>
      <div className="footer-giant">DIBIZ STUDIO</div>
    </footer>
  );
}
