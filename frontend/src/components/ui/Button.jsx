import React from "react";

/**
 * Button Component
 *
 * Three variants matching the Figma design spec.
 * All hover/active/focus animations are defined in index.css under
 * .btn-register, .btn-contact, .btn-cta — so Tailwind's JIT scanner
 * doesn't need to see the class names dynamically.
 *
 * Variants:
 *   "register" — Fixed 129x35 blush box, dark text. Fill lifts to white on hover.
 *   "contact"  — Transparent outlined pill. Coral glow + white fill on hover.
 *   "cta"      — Outlined pill for in-section actions. Fills white on hover.
 *
 * Props:
 *   variant   {string}   — "register" | "contact" | "cta"
 *   onClick   {function} — click handler
 *   children  {node}     — label content
 *   className {string}   — additional utility classes
 *   href      {string}   — renders as <a> if provided
 */
export function Button({
  variant = "register",
  onClick,
  children,
  className = "",
  href,
  ...rest
}) {
  const variantClass = {
    register: "btn-register",
    contact: "btn-contact",
    cta: "btn-cta",
  }[variant] ?? "btn-register";

  const classes = `btn-base ${variantClass} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} {...rest}>
      <span>{children}</span>
    </button>
  );
}
