import React, { useState, useEffect } from "react";
import logoImg from "../assets/mr.webp";
import titleImg from "../assets/titles.svg";
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
        fixed left-0 right-0 z-[100]
        transition-all duration-300
        ${isScrolled ? "top-0 py-5 bg-[#280001]/60 backdrop-blur-xl border-b border-white/5" : "top-4 pt-8 lg:pt-10 pb-8"}
      `}
    >
      <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between px-8 lg:px-16 xl:px-24">
        {/* ── Left: Logos ── */}
        <div className="shrink-0 flex items-center gap-4 lg:gap-6">
            <a
              href="#hero"
              onClick={(e) => scrollTo(e, "hero")}
              className="transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <img
                src={logoImg}
                alt="Mridang"
                className="h-12 lg:h-14 w-auto object-contain"
                draggable="false"
              />
            </a>
            <a
              href="#"
              className="transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <img
                src={titleImg}
                alt="Titles"
                className="h-6 lg:h-8 w-auto object-contain mt-1 hidden sm:block"
                draggable="false"
              />
            </a>
        </div>

        {/* ── Center: Nav links in bordered pill ── */}
        <div className={`hidden lg:flex nav-menu-capsule ${isScrolled ? "scrolled-capsule" : ""}`}>
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
      </div>
    </nav>
  );
}
