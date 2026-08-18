import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import mandalaSvg from "../assets/mandala.svg";

/**
 * MandalaDecor — A floating mandala that rotates & scales tied to scroll.
 *
 * Props:
 *   size        — CSS width (e.g., "300px", "25vw")
 *   top/left/right/bottom — CSS positioning
 *   rotateRange — [start, end] rotation in degrees
 *   scaleRange  — [start, end] scale values
 *   opacity     — base opacity (default 0.06)
 */
export default function MandalaDecor({
  size = "300px",
  top,
  left,
  right,
  bottom,
  rotateRange = [0, 90],
  scaleRange = [0.85, 1.05],
  opacity = 0.06,
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], rotateRange);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [
    scaleRange[0],
    scaleRange[1],
    scaleRange[0],
  ]);

  const positionStyle = { top, left, right, bottom, width: size };

  return (
    <motion.div
      ref={ref}
      className="mandala-float"
      style={{ ...positionStyle, rotate, scale }}
    >
      <img
        src={mandalaSvg}
        alt=""
        className="mandala-float__img"
        style={{ opacity }}
      />
    </motion.div>
  );
}
