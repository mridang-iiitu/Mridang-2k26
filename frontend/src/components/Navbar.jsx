import React, { useState, useEffect } from "react";
import { Button } from "./ui";

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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-[90%] max-w-7xl px-3 py-2 rounded-full border transition-all duration-300 ${
        isScrolled
          ? "bg-black/40 backdrop-blur-lg border-white/30 shadow-lg shadow-black/20"
          : "bg-white/5 backdrop-blur-md border-white/20"
      }`}
    >
      {/* Left: Contact Button (Secondary CTA) */}
      <div className="hidden md:block">
        <Button
          variant="contact"
          onClick={(e) => handleNavClick(e, "contact")}
          className="text-xs px-5 py-2"
        >
          Contact Us
        </Button>
      </div>

      {/* Center: Navigation Links */}
      <ul className="flex items-center justify-center flex-1 gap-6 md:gap-10">
        {NAV_LINKS.map((link) => (
          <li key={link.target}>
            <a
              href={`#${link.target}`}
              onClick={(e) => handleNavClick(e, link.target)}
              className="relative text-sm font-sans font-medium text-white/70 hover:text-white transition-colors duration-200 group py-1"
            >
              {link.label}
              {/* Underline hover effect */}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
        ))}
      </ul>

      {/* Right: Register Button (Primary CTA) */}
      <div className="hidden md:block">
        <Button variant="register" className="text-xs px-5 py-2">
          Register
        </Button>
      </div>
    </nav>
  );
}