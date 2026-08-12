import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Countdown from "./Countdown";

export default function Hero() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Background moves SLOW (parallax: subtle)
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Title moves at MEDIUM speed
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Radio/foreground moves FAST + opposite direction
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fgRotate = useTransform(scrollYProgress, [0, 1], [-5, 10]);

  // Mandala scrubbed rotation
  const mandalaRotateCW = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const mandalaRotateCCW = useTransform(scrollYProgress, [0, 1], [0, -35]);

  return (
    <section className="hero" ref={sectionRef} id="hero">
      {/* ---- Layer 1: Background (slowest) ---- */}
      <motion.div className="hero__bg" style={{ y: bgY }}>
        <img
          src="/assets/hero-bg.jpg"
          alt="Concert crowd at cultural fest"
          className="hero__bg-image"
        />
        <div className="hero__bg-overlay" />
      </motion.div>

      {/* ---- Mandala decorations (scrubbed rotation) ---- */}
      <motion.img
        src="/assets/mandala.png"
        alt=""
        className="hero__mandala hero__mandala--bottom-left"
        style={{ rotate: mandalaRotateCW }}
      />
      <motion.img
        src="/assets/mandala.png"
        alt=""
        className="hero__mandala hero__mandala--bottom-right"
        style={{ rotate: mandalaRotateCCW }}
      />
      <motion.img
        src="/assets/mandala.png"
        alt=""
        className="hero__mandala hero__mandala--bottom-center"
        style={{ x: "-50%", rotate: mandalaRotateCW }}
      />

      {/* ---- Layer 2: Title Image (medium speed) ---- */}
      <motion.div
        className="hero__title-layer"
        style={{ y: titleY, opacity: titleOpacity }}
      >
        <motion.img
          src="/assets/mridang-title.png"
          alt="MRIDANG"
          className="hero__title-image"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        />
      </motion.div>

      {/* ---- Layer 3: Radio Foreground (fastest, opposite) ---- */}
      <motion.div
        className="hero__fg-layer"
        style={{ y: fgY, rotate: fgRotate }}
      >
        <motion.img
          src="/assets/radio-hand.png"
          alt="Vintage radio held by henna-decorated hand"
          className="hero__radio-image"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.6 }}
        />
      </motion.div>

      {/* ---- Bottom Info Bar ---- */}
      <motion.div
        className="hero__bottom"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="hero__bottom-left">
          <img
            src="/assets/iiitu-presents.png"
            alt="IIITU Presents"
            className="hero__presents-image"
          />
        </div>

        <div className="hero__bottom-center">
          <Countdown />
          <span className="hero__scroll-label">Scroll to Explore</span>
        </div>

        <span className="hero__bottom-label hero__bottom-label--incoming">
          INCOMING
        </span>
      </motion.div>
    </section>
  );
}
