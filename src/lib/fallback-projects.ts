import type { CaseStudy } from "./types";

/**
 * Map slug → static cover image in public/covers/.
 * Used by fallback data AND the inline-data decoder on the share page.
 */
export const staticCoverMap: Record<string, string> = {
  "water-day": "/covers/water-day.png",
  "pandore": "/covers/pandore.png",
  "neotaste": "/covers/neotaste.svg",
  "learn-xyz": "/covers/learn-xyz.png",
  "ausventure": "/covers/ausventure.svg",
  "klasse": "/covers/klasse.svg",
};

/** Get the static cover path for a slug, or a placeholder if unknown. */
export function getStaticCover(slug: string): string {
  return staticCoverMap[slug] ?? "/cover-placeholder.svg";
}

/**
 * Fallback project data used when the Notion API is unreachable.
 * Shared by /work page and /share/[slugs] page.
 *
 * IMPORTANT: Keep this in sync with every published project in Notion.
 * If a project exists in Notion with status "Published" or "Featured",
 * it MUST have an entry here so share packets work even when the API is down.
 */
export const fallbackProjects: CaseStudy[] = [
  {
    id: "1",
    title: "Water.day",
    summary:
      "A platform that teaches Gen Z better habits through daily stories, habits and facts.",
    coverUrl: "/covers/water-day.png",
    slug: "water-day",
    tags: ["Mobile App", "Health Tech"],
    isFeatured: true,
    sortOrder: 1,
  },
  {
    id: "2",
    title: "Pandore",
    summary:
      "Brand identity and landing page for an AI consulting firm positioning itself as a trusted partner for enterprise AI adoption.",
    coverUrl: "/covers/pandore.png",
    slug: "pandore",
    tags: ["Branding", "Web Design"],
    isFeatured: false,
    sortOrder: 2,
  },
  {
    id: "3",
    title: "Neotaste",
    summary:
      "A 2-week design sprint to reimagine restaurant discovery and help foodies find hidden gems.",
    coverUrl: "/covers/neotaste.svg",
    slug: "neotaste",
    tags: ["Mobile App", "Food Tech"],
    isFeatured: false,
    sortOrder: 3,
  },
  {
    id: "4",
    title: "Learn.xyz",
    summary:
      "An e-learning platform that makes workplace education accessible and engaging.",
    coverUrl: "/covers/learn-xyz.png",
    slug: "learn-xyz",
    tags: ["Web App", "EdTech"],
    isFeatured: false,
    sortOrder: 4,
  },
  {
    id: "5",
    title: "Ausventure Travel",
    summary:
      "Redesigning the end-to-end booking experience for a premium Australian travel company.",
    coverUrl: "/covers/ausventure.svg",
    slug: "ausventure",
    tags: ["Web App", "Travel"],
    isFeatured: false,
    sortOrder: 5,
  },
  {
    id: "6",
    title: "Klasse",
    summary:
      "Building a modern design consultancy brand from the ground up — identity, site, and tooling.",
    coverUrl: "/covers/klasse.svg",
    slug: "klasse",
    tags: ["Branding", "Web App"],
    isFeatured: false,
    isComingSoon: true,
    sortOrder: 6,
  },
  {
    id: "7",
    title: "Yummy Labs",
    summary:
      "A food-tech platform connecting local chefs with hungry customers.",
    coverUrl: "/cover-placeholder.svg",
    slug: "yummy-labs",
    tags: ["Web App", "Food Tech"],
    isFeatured: false,
    isComingSoon: true,
    sortOrder: 7,
  },
  {
    id: "8",
    title: "Design System v2",
    summary:
      "A comprehensive design system with tokens, components, and patterns.",
    coverUrl: "/cover-placeholder.svg",
    slug: "design-system",
    tags: ["Design System", "Tooling"],
    isFeatured: false,
    isComingSoon: true,
    sortOrder: 8,
  },
];
