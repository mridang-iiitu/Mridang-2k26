import React from "react";

/**
 * App.jsx — Single-page, vertically-scrolling layout.
 *
 * Section order (matches Figma prototype):
 *  1. HeroSection   — full-viewport landing with MRIDANG title + clock
 *  2. AboutUs       — event / organiser information
 *  3. Gallery       — scrollable photo carousel
 *  4. Merchandise   — merch product grid
 *  5. Footer        — contact & social links
 *
 * Each section component will be imported and wired in subsequent commits.
 * Placeholders are used here so the base shell builds without errors.
 */

// ── Placeholder components (replaced commit-by-commit) ──────────────────────
const NavbarPlaceholder = () => (
  <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-8 py-3 rounded-full border border-white/30 bg-white/5 backdrop-blur-md text-white/70 text-sm font-sans tracking-widest">
    MRIDANG 2K26 — Navbar coming in Commit 3
  </div>
);

const HeroPlaceholder = () => (
  <section
    id="hero"
    className="min-h-screen flex items-center justify-center text-center"
  >
    <p className="text-white/40 font-sans text-lg tracking-widest">
      Hero Section — Commit 4 &amp; 5
    </p>
  </section>
);

const AboutPlaceholder = () => (
  <section
    id="about"
    className="min-h-screen flex items-center justify-center"
  >
    <p className="text-white/40 font-sans text-lg tracking-widest">
      About Us — Commit 6
    </p>
  </section>
);

const GalleryPlaceholder = () => (
  <section
    id="gallery"
    className="min-h-[80vh] flex items-center justify-center"
  >
    <p className="text-white/40 font-sans text-lg tracking-widest">
      Gallery — Commit 7
    </p>
  </section>
);

const MerchandisePlaceholder = () => (
  <section
    id="merch"
    className="min-h-screen flex items-center justify-center"
  >
    <p className="text-white/40 font-sans text-lg tracking-widest">
      Merchandise — Commit 8
    </p>
  </section>
);

const FooterPlaceholder = () => (
  <footer
    id="contact"
    className="py-20 flex items-center justify-center border-t border-white/10"
  >
    <p className="text-white/40 font-sans text-sm tracking-widest">
      Footer — Commit 8
    </p>
  </footer>
);
// ─────────────────────────────────────────────────────────────────────────────

function App() {
  return (
    /*
     * animate-page-in: fades the whole page in from black on first load (800ms).
     * relative: establishes stacking context for fixed Navbar and absolute
     *           decorative elements (mandala, radio image) within sections.
     */
    <div className="relative animate-page-in">
      {/* Fixed navigation — always on top */}
      <NavbarPlaceholder />

      {/* ── Scrollable content ── */}
      <main>
        <HeroPlaceholder />
        <AboutPlaceholder />
        <GalleryPlaceholder />
        <MerchandisePlaceholder />
      </main>

      <FooterPlaceholder />
    </div>
  );
}

export default App;
