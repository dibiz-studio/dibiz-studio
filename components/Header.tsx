"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav, siteConfig } from "@/lib/site-data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("/");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Keep the active link in sync with the actual route/hash
  useEffect(() => {
    if (pathname !== "/") {
      setActiveHref(pathname);
      return;
    }
    const hash = window.location.hash;
    setActiveHref(hash ? `/${hash}` : "/");
  }, [pathname]);

  const handleNavClick = (href: string) => {
    setActiveHref(href);
    setMobileOpen(false);
  };

  const isActive = (href: string) => activeHref === href;

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <div className="container-x header-inner">
        <Link href="/">
  <img src="/logoo.png" alt="Dibiz Studio" style={{ height: "2rem", width: "auto" }} />
</Link>
        <nav className="nav-pill">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : ""}
              onClick={() => handleNavClick(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a href={siteConfig.bookCallUrl} target="_blank" rel="noopener noreferrer" className="btn">
          Schedule a Call
        </a>
        <button className="menu-btn" aria-label="Toggle menu" onClick={() => setMobileOpen((v) => !v)}>
          ☰
        </button>
      </div>
      <div className={`container-x mobile-nav${mobileOpen ? " open" : ""}`}>
        {primaryNav.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => handleNavClick(item.href)}>
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}