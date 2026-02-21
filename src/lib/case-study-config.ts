import type { TimelineStep } from "./types";

export interface BrandColors {
  /** Hero section background */
  bg: string;
  /** Headline text on branded bg */
  headlineText: string;
  /** Summary / body text on branded bg */
  bodyText: string;
  /** Partner label text */
  partnerText: string;
  /** Breadcrumb link text */
  breadcrumbLink: string;
  /** Breadcrumb separator text */
  breadcrumbSeparator: string;
  /** Breadcrumb active page text */
  breadcrumbActive: string;
  /** Platform badge background */
  badgeBg: string;
  /** Platform badge text */
  badgeText: string;
  /** Read time text */
  readTimeText: string;
  /** Service tag background */
  tagBg: string;
  /** Service tag border */
  tagBorder: string;
  /** Service tag text */
  tagText: string;
  /** CTA button background */
  ctaBg: string;
  /** CTA button text */
  ctaText: string;
  /** CTA border radius */
  ctaRadius: string;
  /** Progress bar fill color */
  progressBar: string;
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
      headlineText: "#300101",
      bodyText: "#503B00",
      partnerText: "#785900",
      breadcrumbLink: "#856200",
      breadcrumbSeparator: "#B28402",
      breadcrumbActive: "#300101",
      badgeBg: "#300101",
      badgeText: "#FFFEFC",
      readTimeText: "#5B4401",
      tagBg: "#F4B80F",
      tagBorder: "#CF9A00",
      tagText: "#826000",
      ctaBg: "#2216FF",
      ctaText: "#FFFFFF",
      ctaRadius: "8px",
      progressBar: "#2216FF",
    },
  },
};

const defaultBrand: BrandColors = {
  bg: "#EEEDFF",
  headlineText: "#300101",
  bodyText: "#64645F",
  partnerText: "#2216FF",
  breadcrumbLink: "#878784",
  breadcrumbSeparator: "#D0D0CB",
  breadcrumbActive: "#300101",
  badgeBg: "#300101",
  badgeText: "#FFFEFC",
  readTimeText: "#64645F",
  tagBg: "#F5F5F3",
  tagBorder: "#E0E0DC",
  tagText: "#64645F",
  ctaBg: "#2216FF",
  ctaText: "#FFFFFF",
  ctaRadius: "12px",
  progressBar: "#2216FF",
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
