import Link from "next/link";
import { siteConfig } from "@/lib/site-data";

export default function Footer() {
  return (
    <footer className="footer" id="growth">
      <div className="container-x footer-grid">
        <div>
          <div className="contact-card">
            <span className="ic">✉</span> {siteConfig.email}
          </div>
          <div className="contact-card">
            <span className="ic">☎</span> <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
          </div>
          <div className="contact-card">
            <span className="ic">📍</span> {siteConfig.address}
          </div>
        </div>
        <div>
          <div className="footer-title">Menu</div>
          <ul className="footer-list">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/#about">About</Link></li>
            <li><Link href="/#services">Services</Link></li>
            <li><Link href="/#blog">Blog</Link></li>
            <li><Link href="/career">Career</Link></li>
            <li><Link href="/#growth">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="footer-title">Services</div>
          <ul className="footer-list">
            <li>Content Production</li>
            <li>Content Marketing</li>
            <li>UI/UX Design</li>
            <li>Social Media Marketing</li>
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
  <a href="https://x.com/DibizCreates" target="_blank" rel="noopener noreferrer">
    <img src="/twitter.png" alt="Twitter" />
  </a>
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
