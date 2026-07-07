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
    "Pilgrimz is a cultural travel app with GPS audio guides and early traction in France. Designing straight in Claude was racking up AI design debt with every screen, so we built the missing foundation and a Claude Design OS on top of it, then redesigned the core flows around trust, retention, and the business.",
  overview:
    "The brief was a design system. The real problem was trust, retention, and a small team designing straight in Claude with nothing but a few guidelines.\n\nPilgrimz had traction, around 1,000 early users in France and growing. But every screen built without a real foundation added AI design debt: small inconsistencies that users feel without being able to name. People cannot always say why something feels off, or why they do not come back, and very often the answer is inconsistency. It stays invisible until you fix it.\n\nAs a small team that cannot hire its way out, Pilgrimz needed great output from the first pass. So the system was never cosmetic. It was the way out of debt that compounds with every new feature, and the prerequisite for everything the founders wanted next, like gamification, social sharing, and better discovery.",
  challenge:
    "AI design debt compounds quietly.\n\nEvery new screen drifted a little further from the last, and users felt it as something being off. Take the brand red. The founders love it and wanted to keep it, but it was splashed across the whole UI, and in interface terms red reads as alert and error. I kept the brand identity intact and retuned the usage so the color signals action, not alarm. Airbnb is the reference here: a brand can stay recognizable for a color without coating the entire product in it.",
  roleDescription:
    "I led this work as Yummy Design, operating as a small team of one to two people. I built the product design system and its tokens, then took it further with an AI enablement layer that maps the system to code and into Claude. From there I redesigned the core flows and screens, and shaped the early direction for the social layer that comes next.",
  services: ["Design System", "AI Enablement", "Product Design", "UX Strategy"],
  platform: ["Mobile App"],
  industry: "Travel",
  projectType: "Design System",
  outcomes: [
    {
      metric: "Design debt stopped compounding",
      description:
        "Screens come out on-brand on the first pass, no cleanup rounds. New work stays inside the system instead of adding drift.",
    },
    {
      metric: "Design capacity, multiplied",
      description:
        "The team ships more, inside a system designers built, so quality never dilutes as they move faster.",
    },
    {
      metric: "They run it without us",
      description:
        "One workshop later, the whole team designs through the OS. Not just the designers.",
    },
    {
      metric: "Tokens saved, money saved",
      description:
        "No more twenty rounds of iteration and long prompts. Claude understands the system from the first pass.",
    },
  ],
};
