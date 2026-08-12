import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Schedule", href: "#schedule" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "About Us", href: "#about" },
  { label: "Teams", href: "#teams" },
  { label: "Contact Us", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      id="navbar"
    >
      {/* Brand / Logo */}
      <div className="navbar__brand">
        <img
          src="/assets/logo.png"
          alt="Mridang Logo"
          className="navbar__logo-img"
        />
        <div className="navbar__sponsor">
          <span>Sponsored by</span>
          <span className="navbar__sponsor-name">86 PURE</span>
        </div>
      </div>

      {/* Nav Links */}
      <div className="navbar__links">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="navbar__link"
            id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <a href="#register" className="navbar__cta" id="nav-register">
        REGISTER
      </a>

      {/* Mobile Toggle */}
      <button className="navbar__mobile-toggle" aria-label="Open menu" id="nav-mobile-toggle">
        <span />
        <span />
        <span />
      </button>
    </motion.nav>
  );
}
