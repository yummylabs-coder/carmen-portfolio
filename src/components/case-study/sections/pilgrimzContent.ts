/**
 * Pilgrimz shared-section content.
 *
 * Pilgrimz is built preview-first: it has no Notion row yet, so the shared
 * sections (Overview, Challenge, Our Role, Outcomes) read their copy from here.
 * The page fallback in app/work/[slug]/page.tsx merges this in when Notion
 * returns nothing for the "pilgrimz" slug. At launch this can move to Notion.
 *
 * Voice: casual, direct, sentence case, no em dashes, affirmative, no invented metrics.
 */

export const pilgrimzContent = {
  title: "Pilgrimz",
  partner: "Pilgrimz",
  headline: "Rebuilding Pilgrimz from the foundation up",
  summary:
    "Pilgrimz is a cultural travel app with GPS audio guides and early traction in France. Quiet inconsistency was eroding trust, so we built the design system and the AI infrastructure behind it, then redesigned the core flows around trust, retention, and the business.",
  overview:
    "The brief was a design system. The real problem was trust and retention.\n\nPilgrimz had traction, around 1,000 early users in France and growing, but small inconsistencies across the experience were quietly eroding confidence. People cannot always say why something feels off, or why they do not come back, and very often the answer is inconsistency. It is easy to undervalue because it stays invisible until you fix it.\n\nSo the system was never cosmetic. It was the prerequisite for everything the founders wanted next, like gamification, social sharing, and better discovery. Without a consistent base, every new feature would add more drift.",
  challenge:
    "Consistency was the real product problem.\n\nTake the brand red. The founders love it and wanted to keep it, but it was splashed across the whole UI, and in interface terms red reads as alert and error. I kept the brand identity intact and retuned the usage so the color signals action, not alarm. Airbnb is the reference here: a brand can stay recognizable for a color without coating the entire product in it.",
  roleDescription:
    "I led this work as Yummy Design, operating as a small team of one to two people. I built the product design system and its tokens, then took it further with an AI enablement layer that maps the system to code and into Claude. From there I redesigned the core flows and screens, and shaped the early direction for the social layer that comes next.",
  services: ["Design System", "AI Enablement", "Product Design", "UX Strategy"],
  platform: ["Mobile App"],
  industry: "Travel",
  projectType: "Design System",
  outcomes: [
    {
      metric: "A consistent base",
      description:
        "One source of truth for color, type, and components, so new work stays inside the system instead of adding drift.",
    },
    {
      metric: "Design to code that holds",
      description:
        "Tokens named to map cleanly to code, with a Figma to code bridge and a Storybook home, so changes flow instead of being re-typed.",
    },
    {
      metric: "On-system AI output",
      description:
        "Claude builds with the system as context, so the team gets output that respects the tokens and the design intent, fast.",
    },
    {
      metric: "A premium feel",
      description:
        "Warm neutrals, retuned color, and a guide-like type voice that match a knowledgeable cultural traveler, not a children's app.",
    },
  ],
};
