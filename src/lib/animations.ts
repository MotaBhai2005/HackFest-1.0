import type { Variants } from 'framer-motion';

/* ═══════════════════════════════════════════
   FRAMER MOTION VARIANTS
═══════════════════════════════════════════ */

/** Staggered section entrance — brutalist snap */
export const brutalistEntrance: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.12,
      ease: [0.25, 0, 0.75, 1],
    },
  }),
};

/** Card bolt-on reveal — slides from offset into place */
export const boltOnReveal: Variants = {
  hidden: { opacity: 0, x: -8, y: 8 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.1,
      ease: [0, 0, 0.2, 1],
    },
  }),
};

/** Glitch hover for text and buttons */
export const glitchHover: Variants = {
  rest: {
    x: 0,
    textShadow: 'none',
    transition: { duration: 0.05 },
  },
  hover: {
    x: [0, 2, -2, 2, 0],
    textShadow: [
      'none',
      '2px 0 #ba1a1a, -2px 0 #00ffff',
      '-2px 0 #ba1a1a, 2px 0 #00ffff',
      '2px 0 #ba1a1a, -2px 0 #00ffff',
      'none',
    ],
    transition: {
      duration: 0.25,
      times: [0, 0.25, 0.5, 0.75, 1],
    },
  },
};

/** Button glitch + scale on hover */
export const buttonGlitch: Variants = {
  rest: {
    scale: 1,
    x: 0,
    boxShadow: '12px 12px 0px 0px #000000',
    transition: { duration: 0.04 },
  },
  hover: {
    scale: 1.02,
    x: [0, 2, -1, 2, 0],
    boxShadow: '10px 10px 0px 0px #000000',
    transition: {
      scale: { duration: 0.04 },
      x: { duration: 0.2, times: [0, 0.25, 0.5, 0.75, 1] },
    },
  },
  tap: {
    scale: 0.98,
    boxShadow: '4px 4px 0px 0px #000000',
    transition: { duration: 0.04 },
  },
};

/** Fade-in from left */
export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.15, ease: [0, 0, 0.2, 1] },
  },
};

/** Fade-in from right */
export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.15, ease: [0, 0, 0.2, 1] },
  },
};

/** FAQ accordion expand/collapse — snap, not smooth */
export const faqExpand: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.03 },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.05 },
  },
};

/* ═══════════════════════════════════════════
   GSAP DEFAULTS
═══════════════════════════════════════════ */

export const gsapDefaults = {
  ease: 'steps(4)',   // Step-based — not smooth
  duration: 0.08,
};

export const gsapCountUp = {
  ease: 'power2.out',
  duration: 1.5,
};

export const gsapTicker = {
  ease: 'none',
  duration: 20,
  repeat: -1,
};
