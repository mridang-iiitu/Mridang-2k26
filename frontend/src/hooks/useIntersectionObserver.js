import { useEffect, useState } from "react";

/**
 * useIntersectionObserver
 *
 * Observes a DOM element via the IntersectionObserver API and returns
 * a boolean indicating whether the element is currently visible in the viewport.
 *
 * Usage:
 *   const ref = useRef(null);
 *   const isVisible = useIntersectionObserver(ref);
 *   <div ref={ref} className={`reveal-up ${isVisible ? "is-visible" : ""}`} />
 *
 * @param {React.RefObject} ref        — ref attached to the target element
 * @param {number}          threshold  — 0.0–1.0 fraction visible to trigger (default: 0.15)
 * @param {boolean}         once       — if true, stops observing after first trigger (default: true)
 * @returns {boolean} isVisible
 */
export function useIntersectionObserver(ref, threshold = 0.15, once = true) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref?.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // By default, stop observing once revealed — avoids re-triggering
          if (once) observer.unobserve(node);
        } else if (!once) {
          // If repeat mode, reset visibility when element leaves viewport
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [ref, threshold, once]);

  return isVisible;
}
