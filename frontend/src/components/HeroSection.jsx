import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
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


const COLLAGE_IMAGES_COL1 = [
  "https://picsum.photos/seed/c1a/450/300", // 3:2
  "https://picsum.photos/seed/c1b/450/450", // 1:1
  "https://picsum.photos/seed/c1c/450/270", // 5:3
  "https://picsum.photos/seed/c1d/315/315", // 1:1, narrower
];

const COLLAGE_IMAGES_COL2 = [
  "https://picsum.photos/seed/c2a/450/338", // 4:3, pulled up
  "https://picsum.photos/seed/c2b/450/375", // 6:5
  "https://picsum.photos/seed/c2c/450/338", // 4:3, largest
  "https://picsum.photos/seed/c2d/450/675", // 2:3, tallest portrait
];

/* ── Star Night Carousel Images ──
   Replace these placeholder URLs with real event photos.
   The first image is "star night.png" — swap when available. */
const STAR_NIGHT_IMAGES = [
  "https://picsum.photos/seed/sn1/800/500",
  "https://picsum.photos/seed/sn2/800/500",
  "https://picsum.photos/seed/sn3/800/500",
  "https://picsum.photos/seed/sn4/800/500",
  "https://picsum.photos/seed/sn5/800/500",
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const [isAbout, setIsAbout] = useState(false);
  const [isStarNight, setIsStarNight] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Three-state system: Hero → About → Star Night
    if (latest > 0.55) {
      if (!isStarNight) setIsStarNight(true);
      if (!isAbout) setIsAbout(true);
    } else if (latest > 0.15) {
      if (isStarNight) setIsStarNight(false);
      if (!isAbout) setIsAbout(true);
    } else {
      if (isStarNight) setIsStarNight(false);
      if (isAbout) setIsAbout(false);
    }
  });

  /* ── Carousel Navigation ── */
  const nextSlide = useCallback(() => {
    setCarouselIndex((prev) => (prev + 1) % STAR_NIGHT_IMAGES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCarouselIndex((prev) => (prev - 1 + STAR_NIGHT_IMAGES.length) % STAR_NIGHT_IMAGES.length);
  }, []);

  /* Auto-advance carousel every 4s when Star Night is active */
  useEffect(() => {
    if (isStarNight) {
      autoPlayRef.current = setInterval(nextSlide, 8000);
    } else {
      clearInterval(autoPlayRef.current);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [isStarNight, nextSlide]);

  const transitionConfig = { duration: 4, ease: [0.16, 1, 0.3, 1] };
  const fastTransition = { duration: 2, ease: "easeOut" };

  /* Helper: determine the About layer's animate state based on both flags */
  const aboutOnly = isAbout && !isStarNight;

  return (
    <section ref={containerRef} id="hero" className="relative w-full h-[250vh]">

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
              className="gradient-ring flex flex-col items-center rounded-[2.04vh] bg-black/10 shadow-[0_0_8px_7px_rgba(0,0,0,0.5)] z-10 overflow-hidden"
              initial={false}
              animate={{
                height: isAbout ? "15.6vh" : "22.5vh",
                scale: isAbout ? 0.9 : 1
              }}
              style={{ width: "33vh", padding: "1.8vh", transformOrigin: "bottom left" }}
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
            opacity: aboutOnly ? 1 : 0,
            scale: isStarNight ? 0.6 : 1,
            x: aboutOnly ? "0px" : (isStarNight ? "0px" : "-50px"),
          }}
          transition={transitionConfig}
          style={{
            pointerEvents: aboutOnly ? "auto" : "none",
            transformOrigin: "center center",
          }}
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
          className="absolute top-0 right-0 w-[42vw] h-screen z-30 pointer-events-none"
          initial={false}
          animate={{
            x: aboutOnly ? "0vw" : (isStarNight ? "0vw" : "100vw"),
            rotate: aboutOnly ? 0 : (isStarNight ? 0 : -20),
            opacity: aboutOnly ? 1 : 0,
            scale: isStarNight ? 0.6 : 1,
          }}
          transition={transitionConfig}
          style={{ transformOrigin: "center center" }}
        >
          <div className="relative w-full h-full overflow-hidden pointer-events-auto">

            {/* ───────────── IMG 1 (BACK LAYER - Right side) ───────────── */}
            <motion.div 
              className="absolute top-0 right-0 w-[24.3%] h-[12%] overflow-hidden"
              initial={{ opacity: 0, x: 100, y: 50 }}
              animate={{ 
                opacity: aboutOnly ? 1 : 0, 
                x: aboutOnly ? 0 : 100,
                y: aboutOnly ? 0 : 50
              }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: aboutOnly ? 0.3 : 0 }}
            >
              <img
                src={COLLAGE_IMAGES_COL1[0]}
                alt=""
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>

            {/* ───────────── IMG 3 (BACK LAYER - Right side) ───────────── */}
            <motion.div 
              className="absolute right-0 top-[13.8%] w-[42.5%] h-[22.5%] overflow-hidden"
              initial={{ opacity: 0, x: 100, y: 50 }}
              animate={{ 
                opacity: aboutOnly ? 1 : 0, 
                x: aboutOnly ? 0 : 100,
                y: aboutOnly ? 0 : 50
              }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: aboutOnly ? 0.4 : 0 }}
            >
              <img
                src={COLLAGE_IMAGES_COL2[0]}
                alt=""
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>

            {/* ───────────── IMG 5 (BACK LAYER - Right side) ───────────── */}
            <motion.div 
              className="absolute right-0 top-[38.4%] w-[53.7%] h-[25.9%] overflow-hidden"
              initial={{ opacity: 0, x: 100, y: 50 }}
              animate={{ 
                opacity: aboutOnly ? 1 : 0, 
                x: aboutOnly ? 0 : 100,
                y: aboutOnly ? 0 : 50
              }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: aboutOnly ? 0.5 : 0 }}
            >
              <img
                src={COLLAGE_IMAGES_COL2[1]}
                alt=""
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>

            {/* ───────────── IMG 7 (BACK LAYER - Right side) ───────────── */}
            <motion.div 
              className="absolute right-0 top-[66.3%] w-[37%] h-[33.7%] overflow-hidden"
              initial={{ opacity: 0, x: 100, y: 50 }}
              animate={{ 
                opacity: aboutOnly ? 1 : 0, 
                x: aboutOnly ? 0 : 100,
                y: aboutOnly ? 0 : 50
              }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: aboutOnly ? 0.6 : 0 }}
            >
              <img
                src={COLLAGE_IMAGES_COL2[2]}
                alt=""
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>

            {/* ───────────── IMG 2 (FRONT LAYER - Left side, overlaps) ───────────── */}
            <motion.div 
              className="absolute left-[14.9%] top-[20.6%] w-[39%] h-[15.7%] overflow-hidden"
              initial={{ opacity: 0, x: 100, y: 50 }}
              animate={{ 
                opacity: aboutOnly ? 1 : 0, 
                x: aboutOnly ? 0 : 100,
                y: aboutOnly ? 0 : 50
              }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: aboutOnly ? 0.9 : 0 }}
            >
              <img
                src={COLLAGE_IMAGES_COL1[1]}
                alt=""
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>

            {/* ───────────── IMG 4 (FRONT LAYER - Left side, overlaps) ───────────── */}
            <motion.div 
              className="absolute left-0 top-[38.4%] w-[42.3%] h-[25.9%] overflow-hidden"
              initial={{ opacity: 0, x: 100, y: 50 }}
              animate={{ 
                opacity: aboutOnly ? 1 : 0, 
                x: aboutOnly ? 0 : 100,
                y: aboutOnly ? 0 : 50
              }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: aboutOnly ? 1.0 : 0 }}
            >
              <img
                src={COLLAGE_IMAGES_COL1[2]}
                alt=""
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>

            {/* ───────────── IMG 6 (FRONT LAYER - Left side, overlaps) ───────────── */}
            <motion.div 
              className="absolute left-[11.2%] top-[66.3%] w-[49.2%] h-[17.5%] overflow-hidden"
              initial={{ opacity: 0, x: 100, y: 50 }}
              animate={{ 
                opacity: aboutOnly ? 1 : 0, 
                x: aboutOnly ? 0 : 100,
                y: aboutOnly ? 0 : 50
              }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: aboutOnly ? 1.1 : 0 }}
            >
              <img
                src={COLLAGE_IMAGES_COL1[3]}
                alt=""
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>

            {/* ───────────── IMG 8 (FRONT LAYER - Left side, overlaps) ───────────── */}
            <motion.div 
              className="absolute left-[35.1%] top-[86%] w-[25.3%] h-[14%] overflow-hidden"
              initial={{ opacity: 0, x: 100, y: 50 }}
              animate={{ 
                opacity: aboutOnly ? 1 : 0, 
                x: aboutOnly ? 0 : 100,
                y: aboutOnly ? 0 : 50
              }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: aboutOnly ? 1.2 : 0 }}
            >
              <img
                src={COLLAGE_IMAGES_COL2[3]}
                alt=""
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>

          </div>
        </motion.div>


        {/* ==============================================================
            STAR NIGHT LAYER
            ============================================================== */}

        <motion.div
          className="absolute inset-0 z-[35] flex flex-col items-center justify-start pointer-events-none"
          initial={false}
          animate={{
            opacity: isStarNight ? 1 : 0,
            scale: isStarNight ? 1 : 0.5,
          }}
          transition={transitionConfig}
          style={{
            pointerEvents: isStarNight ? "auto" : "none",
            transformOrigin: "center center",
          }}
        >
          {/* Carousel Container */}
          <div className="relative w-full flex flex-col items-center" style={{ marginTop: "24vh" }}>

            {/* ── Image Carousel ── */}
            <div className="relative w-[75vw] max-w-[900px]" style={{ height: "46vh" }}>

              {/* Gradient-ring wrapper for the active/centre image area */}
              <div className="gradient-ring absolute left-1/2 top-0 rounded-[16px] overflow-hidden"
                style={{
                  width: "42vw",
                  maxWidth: "520px",
                  height: "100%",
                  transform: "translateX(-50%)",
                  zIndex: 3,
                  padding: "6px",
                }}
              >
                <div className="group w-full h-full rounded-[12px] overflow-hidden bg-black/20 relative cursor-pointer">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={carouselIndex}
                      src={STAR_NIGHT_IMAGES[carouselIndex]}
                      alt={`Star Night ${carouselIndex + 1}`}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:grayscale"
                      initial={{ opacity: 0, x: 60 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -60 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </AnimatePresence>
                  {/* View Event overlay — appears on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10">
                    <button className="view-event-btn">
                      <span>View Event</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Left peek image */}
              <div
                className="absolute top-[8%] rounded-[12px] overflow-hidden"
                style={{
                  left: "0",
                  width: "30vw",
                  maxWidth: "360px",
                  height: "80%",
                  zIndex: 1,
                  opacity: 0.6,
                }}
              >
                <img
                  src={STAR_NIGHT_IMAGES[(carouselIndex - 1 + STAR_NIGHT_IMAGES.length) % STAR_NIGHT_IMAGES.length]}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right peek image */}
              <div
                className="absolute top-[8%] rounded-[12px] overflow-hidden"
                style={{
                  right: "0",
                  width: "30vw",
                  maxWidth: "360px",
                  height: "80%",
                  zIndex: 1,
                  opacity: 0.6,
                }}
              >
                <img
                  src={STAR_NIGHT_IMAGES[(carouselIndex + 1) % STAR_NIGHT_IMAGES.length]}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Left Arrow */}
              <button
                onClick={prevSlide}
                className="carousel-arrow absolute left-[-4vw] top-1/2 -translate-y-1/2 z-10"
                aria-label="Previous slide"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Right Arrow */}
              <button
                onClick={nextSlide}
                className="carousel-arrow absolute right-[-4vw] top-1/2 -translate-y-1/2 z-10"
                aria-label="Next slide"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* ── Title ── */}
            <h2
              className="font-dorsa text-white text-center uppercase tracking-[0.15em] select-none"
              style={{
                fontSize: "clamp(40px, 7vh, 72px)",
                marginTop: "3vh",
                transform: "scaleY(1.3)",
                transformOrigin: "top center",
                letterSpacing: "0.08em",
              }}
            >
              STAR-NIGHT
            </h2>

            {/* ── Description ── */}
            <p
              className="text-white/70 font-sans text-center max-w-lg leading-[1.7] font-medium"
              style={{
                fontSize: "clamp(14px, 1.6vh, 18px)",
                marginTop: "1.5vh",
                padding: "0 20px",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </p>
          </div>

          {/* ── EXPLORE Button (bottom-right) ── */}
          <motion.div
            className="absolute bottom-[3vh] right-[5%] z-[40]"
            initial={false}
            animate={{ opacity: isStarNight ? 1 : 0 }}
            transition={fastTransition}
          >
            <Button variant="explore">EXPLORE</Button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
