/**
 * Centralized motion design tokens for the portfolio.
 * Every animation in the project should reference these values
 * instead of hardcoding easing curves and durations.
 */

/* ------------------------------------------------------------------ */
/*  Easing curves                                                      */
/* ------------------------------------------------------------------ */

export const ease = {
  /** Hero reveals, display headlines — fast launch, elegant settle */
  expo: [0.16, 1, 0.3, 1] as const,
  /** General UI, body text, standard entrances */
  standard: [0.25, 0.4, 0.25, 1] as const,
  /** Color transitions, symmetric movements */
  smooth: [0.4, 0, 0.2, 1] as const,
  /** Playful overshoot accents */
  bounce: [0.34, 1.56, 0.64, 1] as const,
  /** Splash bloom, cinematic sweeps */
  bloom: [0.45, 0, 0.15, 1] as const,
  /** Section background color morphs */
  inOutCubic: [0.65, 0, 0.35, 1] as const,
};

/* ------------------------------------------------------------------ */
/*  Durations (seconds)                                                */
/* ------------------------------------------------------------------ */

export const duration = {
  /** Micro-feedback: hovers, toggles */
  instant: 0.15,
  /** Small state changes */
  fast: 0.25,
  /** Standard entrances, body text */
  normal: 0.45,
  /** Hero elements, section content reveals */
  slow: 0.6,
  /** Color morphs, complex choreography */
  slower: 0.8,
  /** Display headline line-mask reveals */
  headline: 0.7,
  /** Page transition: card expansion */
  pageTransition: 0.5,
  /** Counter animations */
  counter: 1.5,
};

/* ------------------------------------------------------------------ */
/*  Spring presets                                                     */
/* ------------------------------------------------------------------ */

export const spring = {
  /** Cards, interactive elements */
  snappy: { type: "spring" as const, stiffness: 400, damping: 25 },
  /** Modals, panels, expanding cards */
  gentle: { type: "spring" as const, stiffness: 200, damping: 20 },
  /** Playful accents, badges, dots */
  bouncy: { type: "spring" as const, stiffness: 500, damping: 14 },
  /** Animated counters — overshoots then settles */
  counter: { type: "spring" as const, stiffness: 100, damping: 30 },
  /** Section label entrance */
  label: { type: "spring" as const, stiffness: 300, damping: 24 },
};

/* ------------------------------------------------------------------ */
/*  Stagger delays (seconds)                                           */
/* ------------------------------------------------------------------ */

export const stagger = {
  /** Text characters (typewriter) */
  char: 0.02,
  /** Text lines (headline reveals) */
  line: 0.12,
  /** Cards, grid items */
  card: 0.1,
  /** Hero cascade elements */
  hero: 0.08,
  /** Section content: label → headline → body → visual */
  section: 0.15,
  /** Fast stagger for lists */
  fast: 0.05,
};

/* ------------------------------------------------------------------ */
/*  Reusable variants                                                  */
/* ------------------------------------------------------------------ */

export const variants = {
  /** Standard fade + rise — the workhorse */
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration.normal, ease: ease.standard },
    },
  },

  /** Larger fade + rise for hero/section content */
  fadeUpSlow: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration.slow, ease: ease.expo },
    },
  },

  /** Line-mask text reveal (apply to the INNER text element) */
  lineMask: {
    hidden: { y: "110%" },
    visible: {
      y: "0%",
      transition: { duration: duration.headline, ease: ease.expo },
    },
  },

  /** Section label slide-in from left */
  slideFromLeft: {
    hidden: { opacity: 0, x: -12 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: duration.fast, ease: ease.standard },
    },
  },

  /** Scale entrance for visual content (images, carousels) */
  scaleIn: {
    hidden: { opacity: 0, scale: 0.97 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: duration.slow, ease: ease.expo },
    },
  },

  /** Staggered container (wrap children that use child variants) */
  staggerContainer: {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger.card },
    },
  },

  /** Hero content cascade container */
  heroContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger.hero,
        delayChildren: 0.1,
      },
    },
  },

  /** Section content cascade: label → headline → body → visual */
  sectionContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger.section,
      },
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Viewport trigger config                                            */
/* ------------------------------------------------------------------ */

export const viewport = {
  /** Standard content reveal trigger */
  standard: { once: true, margin: "-80px" as const },
  /** Earlier trigger for background color morphs */
  early: { once: true, margin: "-20%" as const },
  /** Tight trigger for elements near viewport edge */
  tight: { once: true, margin: "-120px" as const },
};

/* ------------------------------------------------------------------ */
/*  Learn.xyz brand color rooms                                        */
/* ------------------------------------------------------------------ */

export const learnRooms = {
  hero:         { bg: "#FECB3A", text: "#300101", accent: "#2216FF" },
  journey:      { bg: "#FFFEFC", text: "#300101", accent: "#2216FF" },
  problem:      { bg: "#1F004A", text: "#FFFFFF", accent: "#FECB3A" },
  bet:          { bg: "#FECB3A", text: "#300101", accent: "#2216FF" },
  role:         { bg: "#FFFEFC", text: "#300101", accent: "#2216FF" },
  designSystem: { bg: "#0D0847", text: "#FFFFFF", accent: "#FECB3A" },
  mobileApp:    { bg: "#FEF9F6", text: "#300101", accent: "#2216FF" },
  dashboard:    { bg: "#FEF9F6", text: "#300101", accent: "#2216FF" },
  website:      { bg: "#FECB3A", text: "#300101", accent: "#2216FF" },
  outcomes:     { bg: "#2216FF", text: "#FFFFFF", accent: "#FECB3A" },
  prototype:    { bg: "#1F004A", text: "#FFFFFF", accent: "#FECB3A" },
  cta:          { bg: "#300101", text: "#FFFFFF", accent: "#FECB3A" },
} as const;

export type RoomKey = keyof typeof learnRooms;
export type RoomColors = (typeof learnRooms)[RoomKey];
