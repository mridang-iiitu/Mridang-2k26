import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import radioImg from "../assets/Radio.webp";
import radioControl from "../assets/radio-control.webp";
import mandala from "../assets/mandala.svg";
import mrImg from "../assets/mr.webp";
import jacketImg from "../assets/jacket.png";
import jacket2Img from "../assets/jacket2.png";
import bandanaImg from "../assets/bandana.png";
import bandana2Img from "../assets/bandana2.png";
import iiituLogo from "../assets/iiitu-logo.png";
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

/* ── Star Night Carousel Images ── */
const STAR_NIGHT_IMAGES = [
  "https://picsum.photos/seed/sn1/800/500",
  "https://picsum.photos/seed/sn2/800/500",
  "https://picsum.photos/seed/sn3/800/500",
  "https://picsum.photos/seed/sn4/800/500",
  "https://picsum.photos/seed/sn5/800/500",
];

/* ── Merchandise Products ── */
const MERCH_PRODUCTS = [
  { src: jacketImg, label: "Jacket" },
  { src: jacket2Img, label: "Jacket 2" },
  { src: bandanaImg, label: "Bandana" },
  { src: bandana2Img, label: "Bandana 2" },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);

  // ── Scroll States ──
  const [isAbout, setIsAbout] = useState(false);
  const [isStarNight, setIsStarNight] = useState(false);
  const [isMerch, setIsMerch] = useState(false);
  const [isMerchVertical, setIsMerchVertical] = useState(false);

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [merchProductIndex, setMerchProductIndex] = useState(0);
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
    // Five-state system: Hero → About → Star Night → Merch Horizontal → Merch Vertical
    if (latest > 0.85) {
      if (!isMerchVertical) setIsMerchVertical(true);
      if (!isMerch) setIsMerch(true);
      if (!isStarNight) setIsStarNight(true);
      if (!isAbout) setIsAbout(true);
    } else if (latest > 0.72) {
      if (isMerchVertical) setIsMerchVertical(false);
      if (!isMerch) setIsMerch(true);
      if (!isStarNight) setIsStarNight(true);
      if (!isAbout) setIsAbout(true);
    } else if (latest > 0.42) {
      if (isMerchVertical) setIsMerchVertical(false);
      if (isMerch) setIsMerch(false);
      if (!isStarNight) setIsStarNight(true);
      if (!isAbout) setIsAbout(true);
    } else if (latest > 0.15) {
      if (isMerchVertical) setIsMerchVertical(false);
      if (isMerch) setIsMerch(false);
      if (isStarNight) setIsStarNight(false);
      if (!isAbout) setIsAbout(true);
    } else {
      if (isMerchVertical) setIsMerchVertical(false);
      if (isMerch) setIsMerch(false);
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

  /* Auto-advance carousel every 8s when Star Night is active */
  useEffect(() => {
    if (isStarNight && !isMerch) {
      autoPlayRef.current = setInterval(nextSlide, 8000);
    } else {
      clearInterval(autoPlayRef.current);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [isStarNight, isMerch, nextSlide]);

  const transitionConfig = { duration: 4, ease: [0.16, 1, 0.3, 1] };
  const fastTransition = { duration: 2, ease: "easeOut" };

  /* Helpers */
  const aboutOnly = isAbout && !isStarNight;
  const starNightOnly = isStarNight && !isMerch;

  return (
    <section ref={containerRef} id="hero" className="relative w-full h-[450vh]">

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
            className="absolute left-22 lg:left-28 bottom-8 lg:bottom-10 font-dorsa text-[6vh] lg:text-[6vh] tracking-[0.02em] text-white/80 py-1"
            style={{ transform: "scaleY(1.35)", transformOrigin: "bottom left" }}
            initial={false}
            animate={{ x: isAbout ? "-50vw" : "0vw" }}
            transition={transitionConfig}
          >
            IIITU PRESENTS
          </motion.p>
          <motion.p
            className="absolute right-10 lg:right-29 bottom-8 lg:bottom-10 font-dorsa text-[6vh] lg:text-[6vh] tracking-[0.02em] text-white/80 py-1"
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

        {/* ── Countdown Clock + Scroll CTA + Mridang In ── */}
        <motion.div
          className="absolute z-[40]"
          initial={false}
          animate={{
            left: isMerchVertical ? "75%" : (isMerch ? "50%" : (isAbout ? "10%" : "50%")),
            x: isMerchVertical ? "0%" : (isMerch ? "-50%" : (isAbout ? "0%" : "-50%")),
            bottom: isMerchVertical ? "3vh" : "2vh"
          }}
          transition={transitionConfig}
        >
          <div className={`flex flex-col items-center ${mounted ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: "600ms", animationFillMode: "both" }}>
            <motion.div
              className="gradient-ring flex flex-col items-center justify-center rounded-[2.04vh] bg-black/10 shadow-[0_0_8px_7px_rgba(0,0,0,0.5)] z-10 overflow-hidden relative"
              initial={false}
              animate={{
                height: isAbout ? "15.6vh" : "22.5vh",
                scale: isAbout ? 0.9 : 1
              }}
              style={{ width: "33vh", padding: "1.8vh", transformOrigin: "bottom right" }}
              transition={transitionConfig}
            >

              {/* ── "MRIDANG IN" Title (Fades in on vertical merch state with 2s delay) ── */}
              <motion.div
                initial={false}
                animate={{
                  opacity: isMerchVertical ? 1 : 0,
                  height: isMerchVertical ? "auto" : "0px",
                  marginBottom: isMerchVertical ? "1vh" : "0px"
                }}
                transition={{
                  duration: 0.8,
                  delay: isMerchVertical ? 2 : 0,
                  ease: "easeOut"
                }}
                className="w-full flex justify-center overflow-hidden"
              >
                <span className="font-serif text-white tracking-[0.4em] uppercase font-semibold" style={{ fontSize: "2.2vh" }}>
                  Mridang In
                </span>
              </motion.div>

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

              {/* Scroll CTA inside clock box (Hides when in Merch state) */}
              <motion.div
                initial={false}
                animate={{ opacity: (isAbout || isMerch) ? 0 : 1 }}
                transition={fastTransition}
                className="w-full h-[6.5vh] shrink-0 flex items-center justify-center absolute bottom-0"
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

        <motion.div
          className="absolute top-[14vh] left-[10%] w-full max-w-xl z-30"
          initial={false}
          animate={{
            opacity: aboutOnly ? 1 : 0,
            scale: isStarNight ? 0.6 : 1,
            x: aboutOnly ? "0px" : (isStarNight ? "0px" : "-50px"),
          }}
          transition={transitionConfig}
          style={{ pointerEvents: aboutOnly ? "auto" : "none", transformOrigin: "center center" }}
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
          <div className="flex flex-wrap items-center gap-6" style={{ marginTop: "40px" }}>
            <Button variant="explore">EXPLORE</Button>
            <Button variant="register">REGISTER</Button>
          </div>
        </motion.div>

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
            {/* ───────────── IMG 1 ───────────── */}
            <div className="absolute top-0 right-0 w-[24.3%] h-[12%] overflow-hidden">
              <img src={COLLAGE_IMAGES_COL1[0]} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
            </div>
            {/* ───────────── IMG 2 ───────────── */}
            <div className="absolute left-[14.9%] top-[20.6%] w-[39%] h-[15.7%] overflow-hidden">
              <img src={COLLAGE_IMAGES_COL1[1]} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
            </div>
            {/* ───────────── IMG 3 ───────────── */}
            <div className="absolute right-0 top-[13.8%] w-[42.5%] h-[22.5%] overflow-hidden">
              <img src={COLLAGE_IMAGES_COL2[0]} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
            </div>
            {/* ───────────── IMG 4 ───────────── */}
            <div className="absolute left-0 top-[38.4%] w-[42.3%] h-[25.9%] overflow-hidden">
              <img src={COLLAGE_IMAGES_COL1[2]} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
            </div>
            {/* ───────────── IMG 5 ───────────── */}
            <div className="absolute right-0 top-[38.4%] w-[53.7%] h-[25.9%] overflow-hidden">
              <img src={COLLAGE_IMAGES_COL2[1]} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
            </div>
            {/* ───────────── IMG 6 ───────────── */}
            <div className="absolute left-[11.2%] top-[66.3%] w-[49.2%] h-[17.5%] overflow-hidden">
              <img src={COLLAGE_IMAGES_COL1[3]} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
            </div>
            {/* ───────────── IMG 7 ───────────── */}
            <div className="absolute right-0 top-[66.3%] w-[37%] h-[33.7%] overflow-hidden">
              <img src={COLLAGE_IMAGES_COL2[2]} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
            </div>
            {/* ───────────── IMG 8 ───────────── */}
            <div className="absolute left-[35.1%] top-[86%] w-[25.3%] h-[14%] overflow-hidden">
              <img src={COLLAGE_IMAGES_COL2[3]} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
            </div>
          </div>
        </motion.div>


        {/* ==============================================================
            STAR NIGHT LAYER
            ============================================================== */}

        <motion.div
          className="absolute inset-0 z-[35] flex flex-col items-center justify-start pointer-events-none"
          initial={false}
          animate={{
            opacity: starNightOnly ? 1 : 0,
            scale: isStarNight ? 1 : 0.1,
            x: isMerch ? "-100vw" : "0vw",
          }}
          transition={transitionConfig}
          style={{ pointerEvents: starNightOnly ? "auto" : "none", transformOrigin: "center center" }}
        >
          {/* Carousel Container */}
          <div className="relative w-full flex flex-col items-center" style={{ marginTop: "24vh" }}>

            {/* ── Image Carousel ── */}
            <div className="relative w-[75vw] max-w-[900px]" style={{ height: "46vh" }}>
              <div className="gradient-ring absolute left-1/2 top-0 rounded-[16px] overflow-hidden"
                style={{ width: "42vw", maxWidth: "520px", height: "100%", transform: "translateX(-50%)", zIndex: 3, padding: "6px" }}
              >
                <div className="group w-full h-full rounded-[12px] overflow-hidden bg-black/20 relative cursor-pointer">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={carouselIndex}
                      src={STAR_NIGHT_IMAGES[carouselIndex]}
                      alt={`Star Night ${carouselIndex + 1}`}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:grayscale"
                      initial={{ opacity: 0, x: 60, scale: 0.3 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -60, scale: 0.3 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10">
                    <button className="view-event-btn">
                      <span>View Event</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Left peek image */}
              <motion.div
                className="absolute top-[8%] rounded-[12px] overflow-hidden"
                initial={false}
                animate={{ x: starNightOnly ? "0%" : "40%", opacity: starNightOnly ? 0.6 : 0 }}
                transition={{ ...transitionConfig, delay: starNightOnly ? 1.5 : 0 }}
                style={{ left: "0", width: "30vw", maxWidth: "360px", height: "80%", zIndex: 1 }}
              >
                <img src={STAR_NIGHT_IMAGES[(carouselIndex - 1 + STAR_NIGHT_IMAGES.length) % STAR_NIGHT_IMAGES.length]} alt="" className="w-full h-full object-cover" />
              </motion.div>

              {/* Right peek image */}
              <motion.div
                className="absolute top-[8%] rounded-[12px] overflow-hidden"
                initial={false}
                animate={{ x: starNightOnly ? "0%" : "-40%", opacity: starNightOnly ? 0.6 : 0 }}
                transition={{ ...transitionConfig, delay: starNightOnly ? 1.5 : 0 }}
                style={{ right: "0", width: "30vw", maxWidth: "360px", height: "80%", zIndex: 1 }}
              >
                <img src={STAR_NIGHT_IMAGES[(carouselIndex + 1) % STAR_NIGHT_IMAGES.length]} alt="" className="w-full h-full object-cover" />
              </motion.div>

              {/* Left Arrow */}
              <button onClick={prevSlide} className="carousel-arrow absolute left-[-4vw] top-1/2 -translate-y-1/2 z-10" aria-label="Previous slide">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              {/* Right Arrow */}
              <button onClick={nextSlide} className="carousel-arrow absolute right-[-4vw] top-1/2 -translate-y-1/2 z-10" aria-label="Next slide">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>

            {/* ── Title & Desc ── */}
            <h2
              className="font-dorsa text-white text-center uppercase tracking-[0.15em] select-none"
              style={{ fontSize: "clamp(40px, 7vh, 72px)", marginTop: "3vh", transform: "scaleY(1.3)", transformOrigin: "top center", letterSpacing: "0.08em" }}
            >
              STAR-NIGHT
            </h2>
            <p
              className="text-white/70 font-sans text-center max-w-lg leading-[1.7] font-medium"
              style={{ fontSize: "clamp(14px, 1.6vh, 18px)", marginTop: "1.5vh", padding: "0 20px" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <motion.div
            className="absolute bottom-[3vh] right-[5%] z-[40]"
            initial={false}
            animate={{ opacity: starNightOnly ? 1 : 0 }}
            transition={fastTransition}
          >
            <Button variant="explore">EXPLORE</Button>
          </motion.div>
        </motion.div>

        {/* ==============================================================
            FOOTER LAYER (Fades in on Merch Vertical State)
            ============================================================== */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[22vh] z-[38] bg-[#4a0808]/95 pointer-events-auto flex items-center justify-center pr-[25vw] overflow-hidden"
          initial={false}
          animate={{
            opacity: isMerchVertical ? 1 : 0,
            y: isMerchVertical ? "0vh" : "5vh"
          }}
          transition={transitionConfig}
        >
          {/* Left Side Content Wrapper */}
          <div className="flex items-center gap-[4vw] h-full">
            {/* 1. Logos */}
            <div className="shrink-0 flex items-center">
              {/* Mridang logo */}
              <img
                src={mrImg}
                alt="Mridang"
                className="h-[14vh] w-auto object-contain relative z-10"
              />
              {/* IIITU logo */}
              <img
                src={iiituLogo}
                alt="IIIT Una"
                className="h-[10vh] w-auto object-contain opacity-70 relative z-0"
                style={{ marginLeft: "-3vh" }}
              />
            </div>

            {/* 2. Delayed Elements (Slide in from Right) */}
            <motion.div
              className="flex items-start gap-[4vw]"
              initial={false}
              animate={{
                opacity: isMerchVertical ? 1 : 0,
                x: isMerchVertical ? 0 : 60
              }}
              transition={{
                duration: 0.8,
                delay: isMerchVertical ? 2 : 0, // 2-second delay
                ease: "easeOut"
              }}
            >
              {/* Column A: IIIT Una Info */}
              <div className="flex flex-col">
                <div className="flex flex-col text-white font-serif leading-[1.3]" style={{ fontSize: "1.7vh" }}>
                  <span className="font-bold">
                    Indian Institute of<br />
                    Information Technology Una<br />
                    Himachal Pradesh 177209
                  </span>
                  <span className="font-bold mt-[1.5vh]">Contacts</span>
                  <div className="flex flex-col text-white/80 font-sans font-light gap-[0.2vh]" style={{ fontSize: "1.5vh" }}>
                    <a href="mailto:mridang@iiitu.ac.in" className="hover:text-white transition-colors">mridang@iiitu.ac.in</a>
                    <a href="https://www.iiitu.ac.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">www.iiitu.ac.in</a>
                  </div>
                </div>
              </div>

              {/* Column B: Navigations */}
              <div className="flex flex-col gap-[0.8vh]">
                <span className="font-serif font-bold text-white mb-[0.2vh]" style={{ fontSize: "1.9vh" }}>Navigations</span>
                {[
                  { label: "Schedule", href: "#schedule" },
                  { label: "Sponsors", href: "#sponsors" },
                  { label: "About Us", href: "#hero" },
                  { label: "Teams", href: "#teams" },
                  { label: "Contact Us", href: "#contact" },
                ].map((link) => (
                  <a key={link.label} href={link.href} className="text-white/80 font-sans font-light hover:text-white transition-colors" style={{ fontSize: "1.5vh" }}>
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Column C: Socials */}
              <div className="flex flex-col gap-[0.8vh]">
                <span className="font-serif font-bold text-white mb-[0.2vh]" style={{ fontSize: "1.9vh" }}>Socials</span>
                <a href="https://www.instagram.com/mridang.iiitu" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/80 font-sans font-light hover:text-white transition-colors" style={{ fontSize: "1.5vh" }}>
                  <span className="w-4 h-4 border border-white/50 rounded flex items-center justify-center text-[10px]">IG</span> mridang.iiitu
                </a>
                <a href="https://mridang.iiitu.ac.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/80 font-sans font-light hover:text-white transition-colors" style={{ fontSize: "1.5vh" }}>
                  <span className="w-4 h-4 border border-white/50 rounded flex items-center justify-center text-[10px]">M</span> mridang.iiitu.ac.in
                </a>
                <a href="https://www.youtube.com/@MridangIIITU" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/80 font-sans font-light hover:text-white transition-colors" style={{ fontSize: "1.5vh" }}>
                  <span className="w-4 h-4 border border-white/50 rounded flex items-center justify-center text-[10px]">YT</span> Mridang IIITU
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ==============================================================
            MERCHANDISE LAYER
            ============================================================== */}

        <motion.div
          className="absolute inset-0 z-[36] flex items-center pointer-events-none"
          initial={false}
          animate={{
            x: isMerch ? "0vw" : "100vw",
            opacity: isMerch ? 1 : 0,
          }}
          transition={transitionConfig}
          style={{ pointerEvents: isMerch ? "auto" : "none" }}
        >
          <motion.div
            layout
            className="w-full flex items-center justify-center gap-[6vw] px-[8%]"
            style={{ marginTop: "-4vh" }}
          >
            {/* ── Left: Product Image + Thumbnails ── */}
            <motion.div
              layout
              className={`flex ${isMerchVertical ? "flex-row items-center gap-[2vw]" : "flex-col items-center"} shrink-0`}
            >
              {/* Main product image */}
              <motion.div layout className="relative" style={{ width: "clamp(260px, 30vw, 400px)", height: "clamp(280px, 38vh, 440px)" }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={merchProductIndex}
                    src={MERCH_PRODUCTS[merchProductIndex].src}
                    alt={MERCH_PRODUCTS[merchProductIndex].label}
                    className="w-full h-full object-contain select-none drop-shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                    draggable="false"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </AnimatePresence>
              </motion.div>

              {/* Thumbnails - Automatically animates layout changes */}
              <motion.div
                layout
                className={`flex ${isMerchVertical ? "flex-col" : "flex-row"} gap-3 ${isMerchVertical ? "mt-0" : "mt-4"}`}
                transition={transitionConfig}
              >
                {MERCH_PRODUCTS.map((product, i) => (
                  <motion.button
                    layout
                    key={product.label}
                    onClick={() => setMerchProductIndex(i)}
                    className={`merch-thumb w-[64px] h-[64px] rounded-md overflow-hidden transition-colors duration-300 ${i === merchProductIndex
                      ? "merch-thumb-active border-2 border-white/80"
                      : "border border-white/30 opacity-70 hover:opacity-100"
                      }`}
                  >
                    <img
                      src={product.src}
                      alt={product.label}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>

            {/* ── Right: Title + Description + CTA ── */}
            <motion.div layout className="flex flex-col max-w-lg">
              <div className="flex items-center gap-3 mb-6">
                <img src={mrImg} alt="Mridang" className="h-[50px] lg:h-[65px] w-auto object-contain" />
                <h2
                  className="font-dorsa text-white uppercase tracking-widest leading-[0.85]"
                  style={{ fontSize: "clamp(48px, 7vw, 90px)", transform: "scaleY(1.3)", transformOrigin: "bottom left" }}
                >
                  MERCHANDISE
                </h2>
              </div>
              <p
                className="text-white/80 font-sans text-justify leading-[1.8] font-medium"
                style={{ fontSize: "clamp(15px, 1.5vw, 20px)" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea
              </p>
              <div className="mt-8">
                <Button variant="explore">Shop Now</Button>
              </div>
            </motion.div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}