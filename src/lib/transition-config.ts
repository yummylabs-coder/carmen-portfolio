/**
 * Per-case-study transition configuration.
 *
 * Maps project slugs to the brand color used for the curtain transition.
 * Colors should match the hero/primary brand of each case study,
 * NOT the portfolio's internal brand colors.
 */

export interface TransitionConfig {
  /** The curtain fill color — typically the hero bg or primary brand color */
  color: string;
  /** Text/logo color visible on the curtain — for contrast */
  textColor: string;
  /** Optional logo image URL shown during the hold phase */
  logoUrl?: string;
}

const transitionConfigs: Record<string, TransitionConfig> = {
  /* Learn.xyz — Gold (their brand primary) */
  "learn-xyz": {
    color: "#FECB3A",
    textColor: "#1F004A",
    logoUrl: "/images/logos/learn-xyz-mascot.png",
  },

  /* Pandore — Dark navy */
  pandore: {
    color: "#0B1926",
    textColor: "#F9F8FD",
  },

  /* Water.day — Dark teal */
  "water-day": {
    color: "#002B35",
    textColor: "#E6F6F8",
  },

  /* Neotaste — Dark charcoal */
  neotaste: {
    color: "#1C1D28",
    textColor: "#FFFFFF",
  },

  /* Ausventure — Warm teal */
  ausventure: {
    color: "#143B39",
    textColor: "#FFFFFF",
  },

  /* Klasse — Blue */
  klasse: {
    color: "#2216FF",
    textColor: "#FFFFFF",
  },
};

/** Fallback for unknown slugs */
const defaultTransition: TransitionConfig = {
  color: "#EEEDFF",
  textColor: "#300101",
};

export function getTransitionConfig(slug: string): TransitionConfig {
  return transitionConfigs[slug] ?? defaultTransition;
}
