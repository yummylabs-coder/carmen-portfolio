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
  /** Accent color for bold intro text, section labels, etc. */
  accentColor: string;
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
  /* ── Learn.xyz ── Gold / yellow hero ───────────────────────── */
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
      accentColor: "#2216FF",
    },
  },

  /* ── Pandore Associates ── Dark navy hero ──────────────────── */
  "pandore": {
    readTime: "~3 min read",
    timelineDuration: "~3 weeks",
    timelineSteps: [
      {
        label: "Discovery",
        title: "Brand Strategy",
        description: "Deep-dived into Pandore's AI consulting positioning, competitive landscape, and target audience",
      },
      {
        label: "Define",
        title: "Brand Identity",
        description: "Crafted a bold, futuristic brand identity that communicates trust and technical depth",
      },
      {
        label: "Design",
        title: "Landing Page",
        description: "Designed a dark-themed, conversion-focused landing page with strong visual hierarchy",
      },
      {
        label: "Deliver",
        title: "Pitch Materials",
        description: "Created investor-ready pitch decks and branded collateral for fundraising",
      },
    ],
    brand: {
      bg: "#0B1926",
      headlineText: "#F9F8FD",
      bodyText: "#ADC1D3",
      partnerText: "#D7E3EE",
      breadcrumbLink: "#ADC1D3",
      breadcrumbSeparator: "#3A5068",
      breadcrumbActive: "#F9F8FD",
      badgeBg: "#3A4EFF",
      badgeText: "#F9F8FD",
      readTimeText: "#ADC1D3",
      tagBg: "rgba(58, 78, 255, 0.12)",
      tagBorder: "#2D41FA",
      tagText: "#D7E3EE",
      ctaBg: "#3A4EFF",
      ctaText: "#FFFFFF",
      ctaRadius: "8px",
      progressBar: "#3A4EFF",
      accentColor: "#3A4EFF",
    },
  },

  /* ── Water.day ── Dark teal hero ───────────────────────────── */
  "water-day": {
    readTime: "~5 min read",
    timelineDuration: "~6 weeks",
    timelineSteps: [
      {
        label: "Discovery",
        title: "User Research",
        description: "Interviewed Gen Z users to understand daily habits, motivations, and barriers to healthy routines",
      },
      {
        label: "Define",
        title: "Product Strategy",
        description: "Defined the core loop \u2014 daily stories, habit tracking, and social accountability",
      },
      {
        label: "Design",
        title: "Design System",
        description: "Built a calming, nature-inspired design system with micro-interactions for delight",
      },
      {
        label: "Build",
        title: "Mobile App",
        description: "Designed the end-to-end mobile experience from onboarding to daily engagement",
      },
      {
        label: "Ship",
        title: "Beta Launch",
        description: "Launched beta with early adopters and iterated based on usage data",
      },
    ],
    brand: {
      bg: "#002B35",
      headlineText: "#E6F6F8",
      bodyText: "#B6D7DB",
      partnerText: "#00B3C7",
      breadcrumbLink: "#B6D7DB",
      breadcrumbSeparator: "#0A3A3F",
      breadcrumbActive: "#E6F6F8",
      badgeBg: "#00B3C7",
      badgeText: "#002B35",
      readTimeText: "#B6D7DB",
      tagBg: "rgba(0, 179, 199, 0.10)",
      tagBorder: "#0A3A3F",
      tagText: "#B6D7DB",
      ctaBg: "#00B3C7",
      ctaText: "#002B35",
      ctaRadius: "20px",
      progressBar: "#00B3C7",
      accentColor: "#00B3C7",
    },
  },

  /* ── Neotaste ── Dark charcoal hero ────────────────────────── */
  "neotaste": {
    readTime: "~4 min read",
    timelineDuration: "2 weeks",
    timelineSteps: [
      {
        label: "Day 1–2",
        title: "Understand",
        description: "Mapped the existing product, interviewed stakeholders, and identified key friction points",
      },
      {
        label: "Day 3–5",
        title: "Diverge",
        description: "Generated dozens of solutions through structured ideation and competitive analysis",
      },
      {
        label: "Day 6–8",
        title: "Converge",
        description: "Voted on the highest-impact concepts and storyboarded the target experience",
      },
      {
        label: "Day 9–11",
        title: "Prototype",
        description: "Built a high-fidelity interactive prototype of the redesigned discovery flow",
      },
      {
        label: "Day 12–14",
        title: "Test & Deliver",
        description: "Validated with real users and delivered a prioritized feature roadmap",
        isHighlight: true,
      },
    ],
    brand: {
      bg: "#1C1D28",
      headlineText: "#FFFFFF",
      bodyText: "#B8B8C0",
      partnerText: "#53F293",
      breadcrumbLink: "#B8B8C0",
      breadcrumbSeparator: "#3A3B4A",
      breadcrumbActive: "#FFFFFF",
      badgeBg: "#53F293",
      badgeText: "#1C1D28",
      readTimeText: "#B8B8C0",
      tagBg: "rgba(83, 242, 147, 0.10)",
      tagBorder: "#3A3B4A",
      tagText: "#B8B8C0",
      ctaBg: "#53F293",
      ctaText: "#1C1D28",
      ctaRadius: "8px",
      progressBar: "#53F293",
      accentColor: "#53F293",
    },
  },

  /* ── Ausventure Travel ── Warm teal hero ───────────────────── */
  "ausventure": {
    readTime: "~5 min read",
    timelineDuration: "~3 months",
    timelineSteps: [
      {
        label: "Discovery",
        title: "Audit & Research",
        description: "Audited the existing static site and researched how travellers book multi-day Australian tours",
      },
      {
        label: "Define",
        title: "Information Architecture",
        description: "Restructured the site around trip discovery, itinerary building, and seamless booking",
      },
      {
        label: "Design",
        title: "UI & Design System",
        description: "Designed a warm, adventurous visual language with an accessible, responsive component library",
      },
      {
        label: "Build",
        title: "Booking Engine",
        description: "Designed the end-to-end booking flow from trip selection to payment confirmation",
      },
      {
        label: "Ship",
        title: "Launch & Iterate",
        description: "Launched the new platform and optimised conversion funnels based on analytics",
      },
    ],
    brand: {
      bg: "#143B39",
      headlineText: "#FFFFFF",
      bodyText: "#C4D8D7",
      partnerText: "#8AB5B3",
      breadcrumbLink: "#C4D8D7",
      breadcrumbSeparator: "#2A5553",
      breadcrumbActive: "#FFFFFF",
      badgeBg: "#F2E9DA",
      badgeText: "#143B39",
      readTimeText: "#C4D8D7",
      tagBg: "rgba(242, 233, 218, 0.12)",
      tagBorder: "#2A5553",
      tagText: "#C4D8D7",
      ctaBg: "#F2E9DA",
      ctaText: "#143B39",
      ctaRadius: "8px",
      progressBar: "#11607D",
      accentColor: "#11607D",
    },
  },

  /* ── Klasse ── Coming soon / default brand ─────────────────── */
  "klasse": {
    readTime: "~3 min read",
    timelineDuration: "",
    timelineSteps: [],
    brand: {
      bg: "#2216FF",
      headlineText: "#FFFFFF",
      bodyText: "#D4D1FF",
      partnerText: "#AEA8FF",
      breadcrumbLink: "#D4D1FF",
      breadcrumbSeparator: "#5A4FFF",
      breadcrumbActive: "#FFFFFF",
      badgeBg: "#FFFFFF",
      badgeText: "#2216FF",
      readTimeText: "#D4D1FF",
      tagBg: "rgba(255, 255, 255, 0.12)",
      tagBorder: "#5A4FFF",
      tagText: "#D4D1FF",
      ctaBg: "#FFFFFF",
      ctaText: "#2216FF",
      ctaRadius: "8px",
      progressBar: "#2216FF",
      accentColor: "#2216FF",
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
  accentColor: "#2216FF",
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
