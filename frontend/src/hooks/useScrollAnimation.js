import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

/**
 * Reusable hook for scroll-linked animations (parallax & scrubbed).
 *
 * @param {Object} options
 * @param {[string,string]} options.offset - useScroll offset tuple
 * @param {Object} options.transforms - map of { propName: { input: [], output: [] } }
 *
 * @returns {{ ref, scrollYProgress, values }}
 *
 * Usage:
 *   const { ref, values } = useScrollAnimation({
 *     transforms: {
 *       y:      { input: [0, 1], output: ["-10%", "10%"] },
 *       rotate: { input: [0, 1], output: [0, 90] },
 *     },
 *   });
 *   <motion.div ref={ref} style={{ y: values.y, rotate: values.rotate }} />
 */
export function useScrollAnimation({
  offset = ["start end", "end start"],
  transforms = {},
} = {}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const values = {};
  for (const [prop, config] of Object.entries(transforms)) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    values[prop] = useTransform(scrollYProgress, config.input, config.output);
  }

  return { ref, scrollYProgress, values };
}
