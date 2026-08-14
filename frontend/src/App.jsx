import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";

// ── Placeholder components (replaced commit-by-commit) ──────────────────────
const AboutPlaceholder = () => (
  <section
    id="about"
    className="min-h-[80vh] flex items-center justify-center border-t border-white/10"
  >
    <p className="text-white/40 font-sans text-lg tracking-widest">
      About Us — Commit 6
    </p>
  </section>
);

const GalleryPlaceholder = () => (
  <section
    id="gallery"
    className="min-h-[80vh] flex items-center justify-center border-t border-white/10"
  >
    <p className="text-white/40 font-sans text-lg tracking-widest">
      Gallery — Commit 7
    </p>
  </section>
);

const MerchandisePlaceholder = () => (
  <section
    id="merch"
    className="min-h-[80vh] flex items-center justify-center border-t border-white/10"
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

const SchedulePlaceholder = () => (
  <section
    id="schedule"
    className="min-h-[80vh] flex items-center justify-center border-t border-white/10"
  >
    <p className="text-white/40 font-sans text-lg tracking-widest">
      Schedule (Coming Soon)
    </p>
  </section>
);

const SponsorsPlaceholder = () => (
  <section
    id="sponsors"
    className="min-h-[80vh] flex items-center justify-center border-t border-white/10"
  >
    <p className="text-white/40 font-sans text-lg tracking-widest">
      Sponsors (Coming Soon)
    </p>
  </section>
);

const TeamsPlaceholder = () => (
  <section
    id="teams"
    className="min-h-[80vh] flex items-center justify-center border-t border-white/10"
  >
    <p className="text-white/40 font-sans text-lg tracking-widest">
      Teams (Coming Soon)
    </p>
  </section>
);
// ─────────────────────────────────────────────────────────────────────────────

function App() {
  return (
    <div className="relative animate-page-in">
      {/* Real Navbar from Commit 3 */}
      <Navbar />

      {/* ── Scrollable content ── */}
      <main>
        <HeroSection />
        <SchedulePlaceholder />
        <SponsorsPlaceholder />
        <AboutPlaceholder />
        <TeamsPlaceholder />
        <GalleryPlaceholder />
        <MerchandisePlaceholder />
      </main>

      <FooterPlaceholder />
    </div>
  );
}

export default App;
