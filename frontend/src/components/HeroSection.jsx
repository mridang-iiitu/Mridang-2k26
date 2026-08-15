import React, { useEffect, useState } from "react";
import radioImg from "../assets/Radio.webp";
import mandala from "../assets/mandala.svg";

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
      <div className="absolute inset-0 flex items-center justify-center z-30 px-[2%]">
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
      <img
        src={radioImg}
        alt="Vintage Radio"
        draggable="false"
        className={`
          absolute z-[40]
          top-[10vh] right-[-5%]
          w-[60vh] max-w-[540px] min-w-[320px]
          animate-float select-none opacity-95
          ${mounted ? "animate-slide-up" : "opacity-0"}
        `}
        style={{ animationDelay: "400ms", animationFillMode: "both" }}
      />

      {/* ── MRIDANG Front Layer (Outline Style) — above the radio ── */}
      <div className="absolute inset-0 flex items-center justify-center z-[50] px-[2%] pointer-events-none">
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
          {/* Double-border Countdown container */}
          <div className="border border-white/40 rounded-[24px] p-1.5 lg:p-2 bg-[#180203]/50 backdrop-blur-md mb-4 z-10">
            <div className="flex items-center justify-between w-[30vw] max-w-[460px] min-w-[300px] px-8 lg:px-10 py-5 lg:py-6 border border-white/50 rounded-[18px] bg-[#0d0102]/95">
              <div className="flex flex-col items-center select-none">
                <span className="font-imbue text-[5.5vh] lg:text-[6.5vh] text-white leading-[0.9] tracking-tight">45</span>
                <span className="font-imbue text-[2vh] lg:text-[2.4vh] text-white/70 tracking-wider mt-1">days</span>
              </div>
              <span className="font-imbue text-[3.5vh] lg:text-[4vh] text-white/50 animate-colon-blink self-center -translate-y-[0.6vh] select-none">:</span>
              <div className="flex flex-col items-center select-none">
                <span className="font-imbue text-[5.5vh] lg:text-[6.5vh] text-white leading-[0.9] tracking-tight">16</span>
                <span className="font-imbue text-[2vh] lg:text-[2.4vh] text-white/70 tracking-wider mt-1">hours</span>
              </div>
              <span className="font-imbue text-[3.5vh] lg:text-[4vh] text-white/50 animate-colon-blink self-center -translate-y-[0.6vh] select-none">:</span>
              <div className="flex flex-col items-center select-none">
                <span className="font-imbue text-[5.5vh] lg:text-[6.5vh] text-white leading-[0.9] tracking-tight">43</span>
                <span className="font-imbue text-[2vh] lg:text-[2.4vh] text-white/70 tracking-wider mt-1">min</span>
              </div>
              <span className="font-imbue text-[3.5vh] lg:text-[4vh] text-white/50 animate-colon-blink self-center -translate-y-[0.6vh] select-none">:</span>
              <div className="flex flex-col items-center select-none">
                <span className="font-imbue text-[5.5vh] lg:text-[6.5vh] text-white leading-[0.9] tracking-tight">12</span>
                <span className="font-imbue text-[2vh] lg:text-[2.4vh] text-white/70 tracking-wider mt-1">sec</span>
              </div>
            </div>
          </div>

          {/* Scroll CTA */}
          <a
            href="#about"
            onClick={(e) => scrollTo(e, "about")}
            className="
              font-dorsa text-[2vh] lg:text-[2.4vh]
              tracking-[0.25em] text-white/70
              hover:text-white transition-colors duration-300
              animate-cta-bounce uppercase
              py-1
            "
            style={{ transform: "scaleY(1.15)", transformOrigin: "center" }}
          >
            Scroll to Explore
          </a>
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
