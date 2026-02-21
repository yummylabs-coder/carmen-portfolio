import type { TimelineStep } from "./types";

interface CaseStudyConfig {
  readTime: string;
  timelineDuration: string;
  timelineSteps: TimelineStep[];
}

/**
 * Hardcoded per-case-study content.
 * Key = slug from Notion.
 * Timeline steps and read time are provided separately per case study.
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
  },
};

const defaultConfig: CaseStudyConfig = {
  readTime: "~5 min read",
  timelineDuration: "",
  timelineSteps: [],
};

export function getCaseStudyConfig(slug: string): CaseStudyConfig {
  return configs[slug] ?? defaultConfig;
}
