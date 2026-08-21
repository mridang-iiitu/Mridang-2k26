import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/mr.webp";
import titleImg from "../assets/titles.svg";
import { Button } from "./ui/Button";

const NAV_LINKS = [
  { label: "Schedule", target: "schedule" },
  { label: "Events", target: "events", isRoute: true },
  { label: "Sponsors", target: "sponsors" },
  { label: "Merch", target: "merch" },
  { label: "Our Team", target: "teams" },
  { label: "About Us", target: "about" },
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
      className="fixed left-0 right-0 z-[100] flex justify-center px-4"
      style={{ top: "15px" }}
    >
      {/* Outer rectangle — Figma: 1301 x 72, top 15, opacity 1, sticky, centered.
          The spec's left:70 is the centering margin, not a hard offset:
          70 + 1301 + 70 = 1441, i.e. a 1440-wide frame. So it is centred rather
          than pinned left, which holds at any viewport width.

          Centring is done two ways on purpose, because this has broken twice:
            1. `flex justify-center` on the <nav> — does not depend on the child
               resolving a width, unlike mx-auto.
            2. maxWidth / height as INLINE STYLES, not Tailwind arbitrary values.
               An arbitrary value that fails to generate (bad syntax, or a class
               the JIT scanner misses) silently drops the constraint and the bar
               goes full-bleed or overflows. Inline styles always apply. */}
      {/* The bar itself stays fully transparent in every state — no fill, no
          backdrop blur. The scrolled treatment lives only on the centre pill
          (.scrolled-capsule), so the logos and Register button always sit
          directly on the page background. */}
      <div
        className="w-full flex items-center justify-between"
        style={{ maxWidth: "1301px", height: "72px" }}
      >
        {/* ── Left: Logos ──
            flex-1 here and on the Register group (rather than relying on
            justify-between) is what keeps the centre pill actually centred:
            equal side columns regardless of how wide the logos or the button
            render. Figma leaves 318 / 320 either side of it. */}
        <div className="flex-1 min-w-0 flex items-center gap-4 lg:gap-6">
            <Link
              to="/"
              className="transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <img
                src={logoImg}
                alt="Mridang"
                className="h-12 lg:h-14 w-auto object-contain"
                draggable="false"
              />
            </Link>
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
        <div
          className={`hidden lg:flex gradient-ring nav-menu-capsule ${isScrolled ? "scrolled-capsule" : ""}`}
        >
          {NAV_LINKS.map((link) => (
            link.isRoute ? (
              <Link
                key={link.target}
                to={`/${link.target}`}
                className="nav-menu-link"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.target}
                href={`#${link.target}`}
                onClick={(e) => scrollTo(e, link.target)}
                className="nav-menu-link"
              >
                {link.label}
              </a>
            )
          ))}
        </div>

        {/* ── Right: REGISTER button ── */}
        <div className="hidden lg:flex flex-1 min-w-0 justify-end">
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
