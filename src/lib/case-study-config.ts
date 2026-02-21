import type { TimelineStep } from "./types";

export interface BrandColors {
  /** Hero section background */
  bg: string;
  /** Primary text on branded bg */
  text: string;
  /** Secondary / muted text on branded bg */
  textMuted: string;
  /** Accent color (partner label, CTA button) */
  accent: string;
  /** Platform badge background */
  badgeBg: string;
  /** Platform badge text */
  badgeText: string;
  /** Service tag border */
  tagBorder: string;
  /** Service tag background */
  tagBg: string;
  /** Service tag text */
  tagText: string;
  /** Progress bar fill color */
  progressBar: string;
  /** CTA button background */
  ctaBg: string;
  /** CTA button text */
  ctaText: string;
  /** Celebration shape colors (geometric shapes on 100%) */
  celebrationColors: string[];
}

interface CaseStudyConfig {
  readTime: string;
  timelineDuration: string;
  timelineSteps: TimelineStep[];
  brand: BrandColors;
}

/**
 * Hardcoded per-case-study content.
 * Key = slug from Notion.
 */
const configs: Record<string, CaseStudyConfig> = {
  "learn-xyz": {
    readTime: "~4 min read (or 2 if you skim, I won't judge)",
    timelineDuration: "~2 months",
    timelineSteps: [
      {
        label: "Discovery",
        title: "User Interviews",
        description: "Spoke with consumers and L&D team leaders to understand pain points in workplace learning",
      },
      {
        label: "Define",
        title: "MVP Scope",
        description: "Designed the core product experience \u2014 mobile app, admin dashboard, and marketing site",
      },
      {
        label: "Build",
        title: "Design System",
        description: "Created a joyful, scalable design system that could grow with the product",
      },
      {
        label: "Validate",
        title: "Prototype Testing",
        description: "Tested interactive prototypes with real users to refine the experience",
      },
      {
        label: "Ship",
        title: "MVP Launch",
        description: "Launched the product and onboarded first wave of pilot clients",
      },
      {
        label: "Scale",
        title: "Raised $4M",
        description: "Helped secure seed funding \u2014 even got the CEO of Udemy interested",
        isHighlight: true,
      },
    ],
    brand: {
      bg: "#FECB3A",
      text: "#503B00",
      textMuted: "#785900",
      accent: "#856200",
      badgeBg: "#503B00",
      badgeText: "#FECB3A",
      tagBorder: "#D4A000",
      tagBg: "rgba(212, 160, 0, 0.15)",
      tagText: "#5B4401",
      progressBar: "#F4B80F",
      ctaBg: "#503B00",
      ctaText: "#FECB3A",
      celebrationColors: ["#FECB3A", "#F4B80F", "#FFE066", "#D4A000", "#503B00", "#FFEB99"],
    },
  },
};

const defaultBrand: BrandColors = {
  bg: "#EEEDFF",
  text: "#300101",
  textMuted: "#64645F",
  accent: "#2216FF",
  badgeBg: "#300101",
  badgeText: "#FFFFFF",
  tagBorder: "#E0E0DC",
  tagBg: "#F5F5F3",
  tagText: "#64645F",
  progressBar: "#2216FF",
  ctaBg: "#2216FF",
  ctaText: "#FFFFFF",
  celebrationColors: ["#2216FF", "#D4D1FF", "#EEEDFF", "#300101", "#FFE066", "#22c55e"],
};

const defaultConfig: CaseStudyConfig = {
  readTime: "~5 min read",
  timelineDuration: "",
  timelineSteps: [],
  brand: defaultBrand,
};

export function getCaseStudyConfig(slug: string): CaseStudyConfig {
  return configs[slug] ?? defaultConfig;
}
