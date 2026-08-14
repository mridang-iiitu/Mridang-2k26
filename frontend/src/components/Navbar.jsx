import React, { useState, useEffect } from "react";
import logoImg from "../assets/mr.webp";
import { Button } from "./ui/Button";

const NAV_LINKS = [
  { label: "Schedule", target: "schedule" },
  { label: "Sponsors", target: "sponsors" },
  { label: "About Us", target: "about" },
  { label: "Teams", target: "teams" },
  { label: "Contact Us", target: "contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`
        fixed top-4 left-0 right-0 z-[100]
        flex items-center justify-between
        px-8 lg:px-16
        transition-all duration-300
        ${isScrolled ? "py-5 bg-[#280001]/60 backdrop-blur-xl border-b border-white/5" : "pt-8 lg:pt-10 pb-8"}
      `}
    >
      {/* ── Left: Logo ── */}
      <a
        href="#hero"
        onClick={(e) => scrollTo(e, "hero")}
        className="shrink-0 transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <img
          src={logoImg}
          alt="Mridang"
          className="h-12 lg:h-14 w-auto object-contain"
          draggable="false"
        />
      </a>

      {/* ── Center: Nav links in bordered pill ── */}
      <div className="hidden lg:flex nav-menu-capsule">
        {NAV_LINKS.map((link) => (
          <a
            key={link.target}
            href={`#${link.target}`}
            onClick={(e) => scrollTo(e, link.target)}
            className="nav-menu-link"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* ── Right: REGISTER button ── */}
      <div className="hidden lg:block shrink-0">
        <Button
          variant="register"
          onClick={(e) => scrollTo(e, "register")}
        >
          Register
        </Button>
      </div>
    </nav>
  );
}