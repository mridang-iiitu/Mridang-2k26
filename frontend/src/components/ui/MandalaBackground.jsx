import React from "react";
import mandala from "../../assets/mandala.svg";

/**
 * MandalaBackground Component
 *
 * Renders the golden line-art mandala SVG as a decorative background layer.
 * Used in multiple sections per the Figma design:
 *
 *   Section          Direction   Speed   Notes
 *   ─────────────────────────────────────────────────────────
 *   Hero (behind clock)   CW      30s     + pulsing opacity
 *   About Us (corner)     CCW     40s     triggered on scroll
 *   Merchandise (corner)  CW      35s     triggered on scroll
 *   Footer (corner)       none    —       static, fade-in only
 *
 * Props:
 *   direction  {"cw"|"ccw"|"none"}  — rotation direction (default: "cw")
 *   speed      {number}             — rotation duration in seconds (default: 30)
 *   opacity    {number}             — base CSS opacity 0–1 (default: 0.7)
 *   pulse      {boolean}            — enable breathing opacity animation (default: false)
 *   size       {string}             — Tailwind width/height class (default: "w-[600px] h-[600px]")
 *   className  {string}             — extra positioning / layout classes from the parent
 *
 * Positioning is always controlled by the *parent* via className.
 * This component is always rendered as a purely visual, non-interactive element
 * (pointer-events: none, aria-hidden).
 *
 * Performance note:
 *   Uses CSS animations (GPU-accelerated transform: rotate) for 60fps rotation.
 *   The `will-change-transform` Tailwind utility hints the browser to promote
 *   this element to its own compositing layer.
 */
export function MandalaBackground({
  direction = "cw",
  speed = 30,
  opacity = 0.7,
  pulse = false,
  size = "w-[600px] h-[600px]",
  className = "",
}) {
  // Build the inline animation style for rotation speed
  const rotationStyle =
    direction === "none"
      ? {}
      : {
          animationDuration: `${speed}s`,
        };

  // Choose the animation class based on direction
  const rotationClass =
    direction === "cw"
      ? "animate-rotate-cw"
      : direction === "ccw"
      ? "animate-rotate-ccw"
      : "";

  // Optional pulsing opacity (used in hero behind clock)
  const pulseClass = pulse ? "animate-mandala-breath" : "";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity }}
    >
      <img
        src={mandala}
        alt=""
        draggable="false"
        className={`${size} ${rotationClass} ${pulseClass} will-change-transform`}
        style={rotationStyle}
      />
    </div>
  );
}
