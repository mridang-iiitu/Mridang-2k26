import React from "react";
import { Button } from "./components/ui/Button";
import { MandalaBackground } from "./components/ui/MandalaBackground";

function App() {
  return (
    <div className="relative animate-page-in">

      {/* ── UI PREVIEW (remove after review) ──────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center gap-16 px-8 py-20">

        {/* Button Showcase */}
        <div className="flex flex-col items-center gap-8">
          <p className="font-sans text-white/50 text-xs tracking-[0.3em] uppercase">
            Button Variants — Commit 2 Preview
          </p>

          {/* All three variants side by side */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="register">Register Now</Button>
            <Button variant="contact">Contact Us</Button>
            <Button variant="cta">Buy Now</Button>
          </div>

          {/* Larger / with icon example */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="register" className="px-10 py-3 text-base">
              Register ↗
            </Button>
            <Button variant="contact" className="px-10 py-3 text-base">
              Contact Us
            </Button>
          </div>
        </div>

        {/* Mandala Showcase */}
        <div className="flex flex-col items-center gap-4">
          <p className="font-sans text-white/50 text-xs tracking-[0.3em] uppercase">
            Mandala — Commit 2 Preview
          </p>
          <div className="relative flex items-center justify-center w-64 h-64">
            <MandalaBackground
              direction="cw"
              speed={30}
              opacity={0.7}
              pulse={true}
              size="w-64 h-64"
            />
          </div>
        </div>

      </section>
      {/* ── END PREVIEW ───────────────────────────────────────────────────── */}

    </div>
  );
}

export default App;
