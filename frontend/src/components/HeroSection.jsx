import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import radioImg from "../assets/Radio.webp";
import radioControl from "../assets/radio-control.webp";
import mandala from "../assets/mandala.svg";
import mrImg from "../assets/mr.webp";
import { Button } from "./ui/Button";

const COUNTDOWN_UNITS = [
  { value: "45", label: "days" },
  { value: "16", label: "hours" },
  { value: "43", label: "min" },
  { value: "12", label: "sec" },
];

const COLLAGE_IMAGES = [
  "https://images.unsplash.com/photo-1540039155732-6762e15bc9c4?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1470229722913-7c090be5c560?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1533174000259-01cb412144eb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80"
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const [isAbout, setIsAbout] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Trigger transition when scrolled past 15% of the sticky container
    if (latest > 0.15 && !isAbout) {
      setIsAbout(true);
    } else if (latest <= 0.15 && isAbout) {
      setIsAbout(false);
    }
  });

  const transitionConfig = { duration: 4, ease: [0.16, 1, 0.3, 1] };
  const fastTransition = { duration: 2, ease: "easeOut" };

  return (
    <section ref={containerRef} id="hero" className="relative w-full h-[150vh]">

      {/* ── STICKY CONTAINER ── */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">

        {/* ==============================================================
            HERO LAYER
            ============================================================== */}

        {/* ── MRIDANG Back Layer (Gradient Fill) ── */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10 px-[2%]"
          initial={false}
          animate={{ y: isAbout ? "-100vh" : "0vh", opacity: isAbout ? 0 : 1 }}
          transition={transitionConfig}
        >
          <div className={`w-full flex justify-center ${mounted ? "animate-slide-up" : "opacity-0"}`} style={{ animationFillMode: "both" }}>
            <h1 className="hero-title font-dorsa gradient-text select-none text-center w-full">MRIDANG</h1>
          </div>
        </motion.div>

        {/* ── MRIDANG Front Layer (Outline Style) ── */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-[25] px-[2%] pointer-events-none"
          initial={false}
          animate={{ y: isAbout ? "-100vh" : "0vh", opacity: isAbout ? 0 : 1 }}
          transition={transitionConfig}
        >
          <div className={`w-full flex justify-center ${mounted ? "animate-slide-up" : "opacity-0"}`} style={{ animationFillMode: "both" }}>
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
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fill="none" stroke="url(#outlineGrad)" strokeWidth="1" fontFamily="'Dorsa', sans-serif" fontSize="280">MRIDANG</text>
            </svg>
          </div>
        </motion.div>

        {/* ── Radio Image ── */}
        <div className={`absolute z-[20] top-[10vh] right-[-5%] w-[60vh] max-w-[540px] min-w-[320px] ${mounted ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: "400ms", animationFillMode: "both" }}>
          <motion.div
            initial={false}
            animate={{
              x: isAbout ? "50vw" : "0vw",
              y: isAbout ? "-100vh" : "0vh",
              rotate: isAbout ? -45 : 0
            }}
            transition={transitionConfig}
            className="w-full h-full"
          >
            <div className="animate-float">
              <img src={radioImg} alt="Vintage Radio" draggable="false" className="w-full select-none opacity-95" />
              <img src={radioControl} alt="Control" draggable="false" className="absolute select-none opacity-95 animate-rotate-cw" style={{ top: "67%", left: "45%", width: "16%", animationDuration: "11s" }} />
            </div>
          </motion.div>
        </div>

        {/* ── IIITU PRESENTS & INCOMING (Hero State) ── */}
        <motion.div
          className="absolute inset-0 z-30 pointer-events-none"
          initial={false}
          animate={{ opacity: isAbout ? 0 : 1 }}
          transition={fastTransition}
        >
          <motion.p
            className="absolute left-8 lg:left-12 bottom-8 lg:bottom-10 font-dorsa text-[6vh] lg:text-[6vh] tracking-[0.12em] text-white/80 py-1"
            style={{ transform: "scaleY(1.35)", transformOrigin: "bottom left" }}
            initial={false}
            animate={{ x: isAbout ? "-50vw" : "0vw" }}
            transition={transitionConfig}
          >
            IIITU PRESENTS
          </motion.p>
          <motion.p
            className="absolute right-8 lg:right-12 bottom-8 lg:bottom-10 font-dorsa text-[6vh] lg:text-[6vh] tracking-[0.12em] text-white/80 py-1"
            style={{ transform: "scaleY(1.35)", transformOrigin: "bottom right" }}
            initial={false}
            animate={{ x: isAbout ? "50vw" : "0vw" }}
            transition={transitionConfig}
          >
            INCOMING
          </motion.p>
        </motion.div>

        {/* ==============================================================
            SHARED / MOVING LAYER
            ============================================================== */}

        {/* ── Mandala Background ── */}
        <motion.div
          className="absolute z-[5] w-[54vw] max-w-[720px] min-w-[420px] pointer-events-none select-none"
          initial={false}
          animate={{
            left: isAbout ? "0%" : "50%",
            x: isAbout ? "-30%" : "-50%",
            bottom: "0vh",
            y: "50%"
          }}
          transition={transitionConfig}
        >
          <img src={mandala} alt="" aria-hidden="true" draggable="false" className="w-full h-auto opacity-30 animate-rotate-ccw" style={{ animationDuration: "35s" }} />
        </motion.div>

        {/* ── Countdown Clock + Scroll CTA ── */}
        <motion.div
          className="absolute z-[40]"
          initial={false}
          animate={{
            left: isAbout ? "10%" : "50%",
            x: isAbout ? "0%" : "-50%",
            bottom: "2vh"
          }}
          transition={transitionConfig}
        >
          <div className={`flex flex-col items-center ${mounted ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: "600ms", animationFillMode: "both" }}>
            <motion.div
              className="gradient-ring flex flex-col items-center p-[1vh] rounded-[2.04vh] bg-black/10 shadow-[0_0_8px_7px_rgba(0,0,0,0.5)] z-10 overflow-hidden"
              initial={false}
              animate={{
                height: isAbout ? "12.8vh" : "19.3vh",
                scale: isAbout ? 0.9 : 1
              }}
              style={{ width: "31.6vh", transformOrigin: "bottom left" }}
              transition={transitionConfig}
            >

              <div className="flex items-center justify-center w-full h-[10.8vh] border border-white/20 rounded-[1.53vh] bg-black/30 shadow-[0_4px_5px_0_rgba(0,0,0,0.5)] select-none shrink-0">
                <div className="flex items-baseline justify-center gap-x-[0.4vh]">
                  {COUNTDOWN_UNITS.map((unit, i) => (
                    <React.Fragment key={unit.label}>
                      <div className="flex flex-col items-center min-w-[4.9vh]">
                        <span className="font-imbue text-[6.6vh] leading-[1.1] text-white">{unit.value}</span>
                        <span className="font-imbue text-[2vh] leading-[1.2] text-white/70">{unit.label}</span>
                      </div>
                      {i < COUNTDOWN_UNITS.length - 1 && (
                        <span className="font-imbue text-[6.6vh] leading-[1.1] text-white/75 animate-colon-blink">:</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Scroll CTA inside clock box */}
              <motion.div
                initial={false}
                animate={{ opacity: isAbout ? 0 : 1 }}
                transition={fastTransition}
                className="w-full h-[6.5vh] shrink-0 flex items-center justify-center"
              >
                <span className="font-dorsa text-[3.5vh] tracking-[0.25em] text-white/70 uppercase">
                  Scroll to Explore
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>


        {/* ==============================================================
            ABOUT LAYER
            ============================================================== */}

        {/* ── About Left Text & Buttons ── */}
        <motion.div
          className="absolute top-[14vh] left-[10%] w-full max-w-xl z-30"
          initial={false}
          animate={{
            opacity: isAbout ? 1 : 0,
            x: isAbout ? "0px" : "-50px"
          }}
          transition={transitionConfig}
          style={{ pointerEvents: isAbout ? "auto" : "none" }}
        >
          <div className="flex items-end gap-2">
            <img src={mrImg} alt="Mridang" className="h-[80px] lg:h-[110px] w-auto object-contain" />
            <h2
              className="font-dorsa text-white text-[64px] lg:text-[100px] leading-[0.7] tracking-widest uppercase mb-[-8px] lg:mb-[-12px]"
              style={{ transform: "scaleY(1.35)", transformOrigin: "bottom left" }}
            >
              INCOMING
            </h2>
          </div>
          <p
            className="text-white/80 font-sans text-lg lg:text-[22px] leading-[1.8] max-w-lg text-justify font-medium"
            style={{ marginTop: "40px" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad
            minim veniam, quis nostrud exercitation laboris ut aliqui.
          </p>
          <div
            className="flex flex-wrap items-center gap-6"
            style={{ marginTop: "40px" }}
          >
            <Button variant="explore">EXPLORE</Button>
            <Button variant="register">REGISTER</Button>
          </div>
        </motion.div>

        {/* ── About Right Photos ── */}
        <motion.div
          className="absolute top-[15vh] right-[5%] w-[45%] h-[70vh] z-30 pointer-events-none"
          initial={false}
          animate={{
            x: isAbout ? "0vw" : "100vw",
            rotate: isAbout ? 0 : -20,
            opacity: isAbout ? 1 : 0
          }}
          transition={transitionConfig}
        >
          <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-3 lg:gap-4 pointer-events-auto">
            {COLLAGE_IMAGES.map((src, i) => {
              let spanClass = "";
              if (i === 0) spanClass = "col-span-2 row-span-2";
              else if (i === 1) spanClass = "col-span-1 row-span-2";
              else if (i === 2) spanClass = "col-span-1 row-span-1";
              else if (i === 3) spanClass = "col-span-1 row-span-1";
              else if (i === 4) spanClass = "col-span-1 row-span-2";
              else if (i === 5) spanClass = "col-span-1 row-span-2";
              else if (i === 6) spanClass = "col-span-2 row-span-1";
              else if (i === 7) spanClass = "col-span-2 row-span-1";

              return (
                <motion.div
                  key={i}
                  className={`${spanClass} relative overflow-hidden bg-black/50 shadow-2xl rounded-sm ${i === 7 ? 'border-[3px] border-[#0099ff]' : ''}`}
                  whileHover={{ filter: "grayscale(0%)", scale: 1.05, zIndex: 50 }}
                  style={{ filter: "grayscale(100%)", opacity: 0.7 }}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
