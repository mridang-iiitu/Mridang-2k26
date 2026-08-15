import React, { useEffect, useState } from "react";
import radioImg from "../assets/Radio.webp";
import radioControl from "../assets/radio-control.webp";
import mandala from "../assets/mandala.svg";

// Placeholder values — matches the Figma frame. Swap for <Countdown /> to go live.
const COUNTDOWN_UNITS = [
  { value: "45", label: "days" },
  { value: "16", label: "hours" },
  { value: "43", label: "min" },
  { value: "12", label: "sec" },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* ── MRIDANG Back Layer (Gradient Fill) — below the radio ── */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-[2%]">
        <div
          className={`
            w-full flex justify-center
            ${mounted ? "animate-slide-up" : "opacity-0"}
          `}
          style={{ animationFillMode: "both" }}
        >
          <h1 className="hero-title font-dorsa gradient-text select-none text-center w-full">
            MRIDANG
          </h1>
        </div>
      </div>

      {/* ────────────────────────────────────
          Radio Image — top right, below outline layer but above register button
          ──────────────────────────────────── */}
      <div
        className={`
          absolute z-[20]
          top-[10vh] right-[-5%]
          w-[60vh] max-w-[540px] min-w-[320px]
          animate-float
          ${mounted ? "animate-slide-up" : "opacity-0"}
        `}
        style={{ animationDelay: "400ms", animationFillMode: "both" }}
      >
        <img
          src={radioImg}
          alt="Vintage Radio"
          draggable="false"
          className="w-full select-none opacity-95"
        />
        
        {/* Radio Control Knob — positioned on radio button, rotating */}
        <img
          src={radioControl}
          alt="Radio Control"
          draggable="false"
          className="absolute select-none opacity-95 animate-rotate-cw"
          style={{ 
            top: "67%",
            left: "45%",
            width: "16%",
            animationDuration: "11s"
          }}
        />
      </div>

      {/* ── MRIDANG Front Layer (Outline Style) — above the radio ── */}
      <div className="absolute inset-0 flex items-center justify-center z-[25] px-[2%] pointer-events-none">
        <div
          className={`
            w-full flex justify-center
            ${mounted ? "animate-slide-up" : "opacity-0"}
          `}
          style={{ animationFillMode: "both" }}
        >
          <svg
            className="hero-title select-none"
            style={{ height: "72vh", width: "auto", transform: "scaleY(1.5) scaleX(1.7) scale(1)", transformOrigin: "center center" }}
            viewBox="0 0 600 280"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="outlineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="05%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#FFB6B6" />
                <stop offset="85%" stopColor="#320708" />
              </linearGradient>
            </defs>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="central"
              fill="none"
              stroke="url(#outlineGrad)"
              strokeWidth="1"
              fontFamily="'Dorsa', sans-serif"
              fontSize="280"
              letterSpacing="0em"
            >
              MRIDANG
            </text>
          </svg>
        </div>
      </div>

      {/* ────────────────────────────────────
          Mandala — halo behind clock (half visible, rotating)
          ──────────────────────────────────── */}
      <div
        className="absolute z-[5] bottom-0 left-1/2 w-[54vw] max-w-[720px] min-w-[420px] pointer-events-none select-none"
        style={{ transform: "translate(-50%, 50%)" }}
      >
        <img
          src={mandala}
          alt=""
          aria-hidden="true"
          draggable="false"
          className="w-full h-auto opacity-30 animate-rotate-ccw pointer-events-none select-none"
          style={{ animationDuration: "35s" }}
        />
      </div>

      {/* ────────────────────────────────────
          Bottom bar: IIITU PRESENTS | Clock | INCOMING
          ──────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-30 px-8 lg:px-12 pb-8 lg:pb-10 flex items-end justify-center">

        {/* Left — IIITU PRESENTS */}
        <p
          className={`
            absolute left-8 lg:left-12 bottom-8 lg:bottom-10
            font-dorsa text-[6vh] lg:text-[6vh] tracking-[0.12em] text-white/80
            py-1
            ${mounted ? "opacity-100" : "opacity-0"}
            transition-opacity duration-1000 delay-500
          `}
          style={{ transform: "scaleY(1.35)", transformOrigin: "bottom left" }}
        >
          IIITU PRESENTS
        </p>

        {/* Center — Countdown + Scroll CTA */}
        <div
          className={`
            flex flex-col items-center z-10
            ${mounted ? "animate-slide-up" : "opacity-0"}
          `}
          style={{ animationDelay: "600ms", animationFillMode: "both" }}
        >
          {/* Countdown — Figma "Rectangle 41" (outer) wrapping "Rectangle 42" (clock).
              Rectangle 41 contains BOTH the clock and the SCROLL TO EXPLORE CTA:
              its coords are top 810 / height 189, the clock is top 822 / height 106,
              which leaves 12px above the clock and 71px below it for the CTA.

                outer box ("Rectangle 41") 310 x 189 -> 31.6vh x 19.3vh
                  radius 20px            -> 2.04vh
                  fill   #000000 @ 10%   -> bg-black/10
                  border 1px gradient #FFFFFF -> #FF7C7C  (.gradient-ring in index.css)
                  shadow 0 / 0 / blur 8 / spread 7, #000000 @ 50%

              Sizes taken from the Figma frame (1489 x 980):
                inner box ("Rectangle 42") 290 x 106 -> 29.6vh x 10.8vh
                  radius 15px            -> 1.53vh
                  fill   #000000 @ 30%   -> bg-black/30
                  border 1px #FFFFFF 20% -> border-white/20 (inner alignment
                                            = border-box, already global)
                  shadow 0 / 4 / 5 / 0, #000000 @ 50%
                digits row 252 x 72    -> 6.6vh font on 1.1 leading
                labels     ~24 tall    -> 2vh font on 1.2 leading
                outer ring ~10px gap   -> 1vh padding
              Expressed in vh so the proportions hold as the viewport scales.
              Colons are the SAME font size as the digits — the colon glyph
              naturally sits low in the em box, which is what gives the design
              its alignment. Baseline alignment does the rest. */}
          <div className="gradient-ring flex flex-col items-center w-[31.6vh] h-[19.3vh] pt-[1.22vh] rounded-[2.04vh] bg-black/10 shadow-[0_0_8px_7px_rgba(0,0,0,0.5)] z-10">

            {/* Rectangle 42 — the clock box */}
            <div className="flex items-center justify-center w-[29.6vh] h-[10.8vh] border border-white/20 rounded-[1.53vh] bg-black/30 shadow-[0_4px_5px_0_rgba(0,0,0,0.5)] select-none">
              <div className="flex items-baseline justify-center gap-x-[0.4vh]">
                {COUNTDOWN_UNITS.map((unit, i) => (
                  <React.Fragment key={unit.label}>
                    <div className="flex flex-col items-center min-w-[4.9vh]">
                      <span className="font-imbue text-[6.6vh] leading-[1.1] text-white">
                        {unit.value}
                      </span>
                      <span className="font-imbue text-[2vh] leading-[1.2] text-white/70">
                        {unit.label}
                      </span>
                    </div>

                    {i < COUNTDOWN_UNITS.length - 1 && (
                      <span className="font-imbue text-[6.6vh] leading-[1.1] text-white/75 animate-colon-blink">
                        :
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Scroll CTA — lives inside Rectangle 41, in the 71px below the clock */}
            <a
              href="#about"
              onClick={(e) => scrollTo(e, "about")}
              className="
                font-dorsa text-[2.4vh] mt-[1.84vh]
                tracking-[0.25em] text-white/70
                hover:text-white transition-colors duration-300
                animate-cta-bounce uppercase
              "
            >
              Scroll to Explore
            </a>
          </div>
        </div>

        {/* Right — INCOMING */}
        <p
          className={`
            absolute right-8 lg:right-12 bottom-8 lg:bottom-10
            font-dorsa text-[6vh] lg:text-[6vh] tracking-[0.12em] text-white/80
            py-1
            ${mounted ? "opacity-100" : "opacity-0"}
            transition-opacity duration-1000 delay-500
          `}
          style={{ transform: "scaleY(1.35)", transformOrigin: "bottom right" }}
        >
          INCOMING
        </p>
      </div>
    </section>
  );
}
