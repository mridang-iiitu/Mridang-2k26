import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import MandalaDecor from "../components/MandalaDecor";

export default function HomePage() {
  return (
    <div className="app relative animate-page-in">
      <Navbar />

      <main>
        <HeroSection />

        {/* ---- Mandala decorations between sections (scrubbed rotation) ---- */}
        <div style={{ position: "relative" }}>
          {/* Left mandala near About section */}
          <MandalaDecor
            size="clamp(200px, 28vw, 420px)"
            top="5%"
            left="-10%"
            rotateRange={[0, 120]}
            scaleRange={[0.8, 1.1]}
            opacity={0.05}
          />

          {/* Right mandala near Schedule */}
          <MandalaDecor
            size="clamp(180px, 22vw, 350px)"
            top="35%"
            right="-8%"
            rotateRange={[0, -90]}
            scaleRange={[0.9, 1.05]}
            opacity={0.04}
          />

          {/* Left mandala near Teams */}
          <MandalaDecor
            size="clamp(220px, 25vw, 380px)"
            top="65%"
            left="-12%"
            rotateRange={[0, 70]}
            scaleRange={[0.85, 1]}
            opacity={0.05}
          />

          {/* Right mandala near Contact */}
          <MandalaDecor
            size="clamp(160px, 20vw, 300px)"
            top="88%"
            right="-6%"
            rotateRange={[0, -60]}
            scaleRange={[0.9, 1.1]}
            opacity={0.04}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
