# SME Summit (Mridang) - Implementation Plan & Design Document

## 1. Overview
This document outlines the design requirements and implementation strategy for the Mridang 2k26 landing page, based on the provided Figma specifications. The application will be built using React, Vite, and Tailwind CSS.

## 2. Design System & Typography
### Fonts
- **Primary Font (Main Headings/MRIDANG)**: `Dorsa` - A highly condensed, tall, and thin sans-serif typeface.
- **Clock Font**: `Imbue` - A high-contrast serif font providing a classical and elegant feel.
- **Header/UI Font**: `Google Sans Flex` - Clean, modern sans-serif for navigation and body elements.

### Color Palette & Effects
- **Text Gradient**: 
  ```css
  background: linear-gradient(180deg, #FFFFFF 19.71%, #FF9797 53.85%, #280001 97.12%);
  ```
  *Applied to the main "MRIDANG" heading, transitioning from bright white to soft coral-pink to deep burgundy.*
- **General Theme**: Dark, high-contrast, deep crimson-tinted aesthetic.

## 3. Asset Usage
- **`BG1.jpg` (Concert/Crowd Background)**: 
  - Functions as a full-bleed, continuous background fixed across all sections of the landing page.
- **`Radio.png` (Hand with Vintage Radio)**: 
  - Positioned in the upper-right quadrant of the Hero Section. 
  - Overlaps the letters of the main "MRIDANG" heading to blend classical Indian music heritage with modern event vibes.
- **`mandala.svg` (Golden Line-Art Mandala)**: 
  - **Hero Section**: Centered behind the countdown clock as a decorative halo.
  - **Other Sections**: Appears partially cropped in the bottom-left corners of the *About Us*, *Merchandise*, and *Footer* sections.

## 4. Section-by-Section Implementation Strategy

### 4.1. Header / Navigation
- **Navigation Bar**: Located at top-center.
  - Container: Pill-shaped, translucent/white outlined box.
  - Links: *Schedule, Sponsors, About Us, Teams, Contact Us*.
- **Action Buttons**:
  - **Left**: *Contact Us* (pill-outlined button).
  - **Right**: *Register* (solid white pill button with dark text).

### 4.2. Hero Section (Landing)
- **Main Heading**: "MRIDANG" rendered using `Dorsa` and the specified text gradient.
- **Floating Element**: `Radio.png` overlapping the top right of the heading.
- **Countdown Clock**: 
  - Container: Thin white rounded-corner rectangular box.
  - Values: e.g., `45 : 16 : 43 : 12` using `Imbue` font.
  - Labels: *days, hours, min, sec* placed underneath each respective number.
  - Background: `mandala.svg` centered directly behind the clock container.
- **Call to Action (CTA)**: "SCROLL TO EXPLORE" text below the countdown box.

### 4.3. Additional Sections (Scrollable)
- **About Us Section**: Content area with `mandala.svg` accent in the bottom left.
- **Gallery / Carousel Section**: Interactive image slider for event photos.
- **Merchandise Section**: E-commerce/preview layout with `mandala.svg` accent in bottom left.
- **Footer Section**: Contact details and links, with the final `mandala.svg` accent.

## 5. Technical Implementation Steps
1. **Font Loading**: Add `Dorsa` and `Imbue` via Google Fonts in `index.html`. Add `Google Sans Flex` via a suitable web font CDN or local asset.
2. **Global CSS (`index.css`)**:
   - Set up the fixed background `BG1.jpg`.
   - Define custom font families and utility classes for the text gradient.
3. **Component Structure**:
   - `<Navbar />`: Fixed/sticky header with translucent pill styling.
   - `<HeroSection />`: Flex/Grid layout containing the main heading, positioned `Radio.png`, and the countdown clock with the `mandala.svg` backdrop.
   - `<CountdownClock />`: Logic for timer and display formatting.
   - `<AboutUs />`, `<Gallery />`, `<Merchandise />`, `<Footer />`: Respective sections with consistent background and mandala accents.
4. **Tailwind Configuration**: Ensure custom fonts and gradient colors are extended appropriately.

---

## 6. Animation Specification (From Prototype Analysis)

This section documents all animations observed in the Figma prototype, organized by element and section. These must be faithfully replicated in the React implementation.

> **Implementation Note**: Use CSS `transition`, `@keyframes`, and the `IntersectionObserver` API for scroll-triggered animations. For complex orchestrated sequences, use a library such as `framer-motion` or `GSAP`.

---

### 6.1. Page-Level Entry Animation (Initial Load)

| Element | Animation | Duration | Easing | Trigger |
|---|---|---|---|---|
| Full page | Fade-in from black overlay | 800ms | `ease-out` | On mount |
| "MRIDANG" heading | Slides up from ~40px below + fade-in | 1000ms | `cubic-bezier(0.16, 1, 0.3, 1)` | 200ms after page load |
| `Radio.png` | Slides in from right (~60px) + fade-in | 900ms | `ease-out` | 400ms after page load |
| Navbar | Slides down from -100% + fade-in | 600ms | `ease-out` | On mount |
| Countdown clock container | Scales from 0.92 → 1.0 + fade-in | 800ms | `ease-out` | 600ms after page load |
| Mandala (behind clock) | Slow rotation spin-in (0° → 360°) + fade-in | 2000ms | `ease-in-out` | 500ms after page load |
| "SCROLL TO EXPLORE" CTA | Fade-in + gentle bounce (translateY: 0 → -6px → 0) | 700ms + looping bounce | `ease-in-out` | 800ms after page load |

**CSS Reference:**
```css
/* MRIDANG heading entry */
@keyframes slideUpFadeIn {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Scroll to Explore bounce loop */
@keyframes ctaBounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-6px); }
}
```

---

### 6.2. Navbar / Header Animations

| Element | Animation Type | Duration | Trigger |
|---|---|---|---|
| Nav container | Backdrop blur increases + border opacity increases on scroll | 300ms | Scroll past 80px |
| Nav links (hover) | Underline slides in from left (width: 0 → 100%) | 200ms | `hover` |
| Nav links (hover) | Text color transitions to white from rgba(255,255,255,0.7) | 200ms | `hover` |
| "Contact Us" button (hover) | Border glow: `box-shadow: 0 0 12px rgba(255,151,151,0.5)` | 200ms | `hover` |
| "Contact Us" button (hover) | Background fills with white at 10% opacity | 200ms | `hover` |
| "Register" button (hover) | Scale up: `transform: scale(1.04)` | 150ms | `hover` |
| "Register" button (hover) | Background changes from white to light coral `#FFE0E0` | 200ms | `hover` |
| "Register" button (click) | Scale down: `transform: scale(0.97)` ripple effect | 100ms | `active` |
| Nav links (click) | Smooth scroll to section with easing | 800ms | `click` |

---

### 6.3. Hero Section — "MRIDANG" Text

| Element | Animation Type | Duration | Trigger |
|---|---|---|---|
| Gradient text | Subtle animated gradient shift (background-position moves) | 6000ms loop | `auto` (ambient) |
| `Radio.png` | Subtle floating: translateY(0 → -12px → 0) | 4000ms loop | `auto` (ambient) |
| `Radio.png` (hover on heading) | Slight tilt: `rotate(-3deg)` + scale(1.02) | 300ms | `hover` |

**CSS Reference:**
```css
/* Ambient gradient shimmer on MRIDANG text */
@keyframes gradientShift {
  0%   { background-position: 50% 0%; }
  50%  { background-position: 50% 100%; }
  100% { background-position: 50% 0%; }
}
.mridang-title {
  background-size: 100% 200%;
  animation: gradientShift 6s ease-in-out infinite;
}

/* Radio floating */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-12px); }
}
```

---

### 6.4. Mandala SVG — Ambient Animations

The mandala appears in multiple places and has different animation intensities per context.

| Location | Animation | Speed | Trigger |
|---|---|---|---|
| Hero (behind clock) | Slow continuous rotation clockwise | 30s loop, linear | `auto` |
| Hero (behind clock) | Subtle pulsing opacity: 0.6 → 0.85 → 0.6 | 4s loop | `auto` |
| About Us (bottom-left corner) | Slow rotation counter-clockwise | 40s loop, linear | On section scroll into view |
| Merchandise (bottom-left corner) | Slow rotation clockwise | 35s loop, linear | On section scroll into view |
| Footer (bottom-left corner) | Static — no rotation, fade-in only | 500ms | On scroll into view |

**CSS Reference:**
```css
@keyframes rotateCW  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
@keyframes rotateCCW { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
@keyframes mandalaBreath {
  0%, 100% { opacity: 0.6; }
  50%       { opacity: 0.85; }
}
```

---

### 6.5. Countdown Clock Animations

| Element | Animation Type | Duration | Trigger |
|---|---|---|---|
| Number digits | Flip/roll down animation when value changes (like a mechanical flip clock) | 400ms | Every second (for seconds unit) |
| Seconds digit | CSS 3D flip: `rotateX(0deg → -90deg)` on old value, then new value enters `rotateX(90deg → 0deg)` | 400ms | Every 1000ms |
| Minutes digit | Same flip animation | 400ms | When seconds reach 00 |
| Hours digit | Same flip animation | 400ms | When minutes reach 00 |
| Days digit | Same flip animation | 400ms | When hours reach 00 |
| Separator colons (`:`) | Pulse blink: opacity 1 → 0.3 → 1 | 1000ms loop | `auto` |
| Clock container (hover) | Border glow: `box-shadow: 0 0 20px rgba(255,151,151,0.3)` | 300ms | `hover` |

**CSS Reference:**
```css
@keyframes flipOut {
  0%   { transform: rotateX(0deg);  opacity: 1; }
  100% { transform: rotateX(-90deg); opacity: 0; }
}
@keyframes flipIn {
  0%   { transform: rotateX(90deg);  opacity: 0; }
  100% { transform: rotateX(0deg);   opacity: 1; }
}
@keyframes colonBlink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}
```

---

### 6.6. Scroll-Triggered Section Reveal Animations

All sections below the hero use `IntersectionObserver` to trigger entry animations when they enter the viewport (threshold: 0.15).

| Section | Element | Animation | Duration | Delay |
|---|---|---|---|---|
| **About Us** | Section heading | Slide up 30px + fade-in | 700ms | 0ms |
| **About Us** | Body text paragraphs | Slide up 20px + fade-in | 600ms | 150ms stagger |
| **About Us** | Team/image cards | Scale from 0.95 + fade-in | 700ms | 200ms stagger per card |
| **About Us** | Mandala | Rotate in + fade-in | 1200ms | 0ms |
| **Gallery** | Section title | Slide up + fade-in | 700ms | 0ms |
| **Gallery** | Carousel track | Slide in from right (20px) + fade-in | 800ms | 100ms |
| **Gallery** | Carousel items | Staggered fade-in, left to right | 500ms each | 100ms stagger |
| **Merchandise** | Product cards | Slide up 25px + fade-in | 650ms | 100ms stagger per card |
| **Footer** | All elements | Fade-in as a single block | 600ms | 0ms |

**CSS Reference:**
```css
/* Base state before intersection */
.reveal-up {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease-out, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

### 6.7. Gallery / Carousel Interactions

| Element | Animation Type | Duration | Trigger |
|---|---|---|---|
| Slide change (click arrow) | Horizontal slide: current exits left, next enters right | 500ms | `click` |
| Slide change (swipe) | Follow-finger drag, then snap to nearest | Instant drag + 300ms snap | `touchmove` / `mousedown` |
| Arrow buttons (hover) | Scale: 1.0 → 1.1, background opacity increases | 200ms | `hover` |
| Arrow buttons (click) | Scale: 1.1 → 0.95, then back to 1.0 | 150ms | `active` |
| Dot indicators | Active dot: width expands (8px → 24px), color fills | 300ms | On slide change |
| Inactive dots (hover) | Scale slightly: 1.0 → 1.2 | 150ms | `hover` |
| Image (hover on card) | Scale: 1.0 → 1.05, overflow hidden reveals zoom | 400ms | `hover` |

---

### 6.8. Page-to-Page / Section Navigation Transitions

The prototype uses a **vertical scroll-snap** paradigm between sections.

| Transition Type | Animation | Duration | Easing |
|---|---|---|---|
| Nav link click → section | Smooth scroll `scrollIntoView({ behavior: 'smooth' })` | ~800ms | Browser default smooth |
| "SCROLL TO EXPLORE" click | Same smooth scroll to next section | ~800ms | `ease-in-out` |
| Between prototype frames (Figma) | Smart Animate — elements morph/slide between states | ~500ms | `ease-in-out` |

---

### 6.9. Button States — Full Matrix

All buttons follow this consistent state machine:

```
Default → Hover → Active (pressed) → Default
```

| Button | Default Style | Hover | Active | Focus |
|---|---|---|---|---|
| **Register** | White fill, dark text, pill shape | `scale(1.04)`, coral bg tint | `scale(0.97)` | White ring `outline: 2px solid white` |
| **Contact Us** | Transparent, white border | White bg at 10% opacity, border glow | `scale(0.97)` | White ring |
| **Nav links** | rgba(255,255,255,0.7) | White + underline slide-in | Slight scale(0.97) | Underline stays |
| **Carousel arrows** | Semi-transparent circle | scale(1.1), brighter | scale(0.92) | White ring |
| **Merch CTA / Buy** | Outlined pill | Fill with white, dark text | scale(0.96) | White ring |
| **Footer links** | rgba(255,255,255,0.6) | White, underline from center | — | Underline stays |

---

### 6.10. Micro-Interactions & Ambient Details

| Element | Animation | Notes |
|---|---|---|
| Cursor entering viewport | Custom cursor: grows from 8px to 16px circle | Optional enhancement |
| Background `BG1.jpg` | Very subtle parallax: moves at 0.3x scroll speed | Creates depth illusion |
| "SCROLL TO EXPLORE" arrow/icon | Continuous bob: translateY(0 → 8px → 0) | 1.5s loop, `ease-in-out` |
| Section dividers / lines | Width expands from 0 → 100% on scroll-into-view | 600ms, `ease-out` |
| Footer social icons (hover) | translateY(-4px) + icon color change to coral | 200ms |
| Page unload / navigation away | Fast fade-out: opacity 1 → 0 | 300ms |

---

### 6.11. Performance & Implementation Guidelines

- **Prefer GPU-accelerated properties**: Only animate `transform` and `opacity`. Avoid animating `width`, `height`, `top`, `left`, or `margin`.
- **`will-change` hint**: Apply `will-change: transform, opacity` only to actively animating elements; remove after animation completes.
- **Reduced Motion**: Respect `prefers-reduced-motion` media query — disable all decorative animations (parallax, floating, rotation) but keep functional transitions (scroll navigation).
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
- **`IntersectionObserver` threshold**: Use `threshold: 0.15` for section reveals so animation triggers before the full element is in view.
- **Stagger orchestration**: Use CSS `animation-delay` with incrementing values for list/card items. Alternatively, use `framer-motion`'s `staggerChildren` via `variants`.
- **Clock flip performance**: Use `perspective: 600px` on the clock container for smooth 3D flip digit transitions.