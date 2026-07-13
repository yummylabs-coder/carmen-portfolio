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
  headline: "From AI design debt to a system the whole team runs",
  summary:
    "A cultural travel app growing fast across Europe, held back by invisible AI design debt. We built the system underneath it, then redesigned the flows that turn first-time users into returning ones.",
  websiteUrl: "https://apps.apple.com/us/app/pilgrimz-social-audio-guide/id6739208380",
  overview:
    "We joined Pilgrimz as their full stack design partner: product strategy, the design system, and the AI enablement behind both. The real problem was trust, retention, and a small team designing straight in Claude with nothing but a few guidelines.\n\nPilgrimz had traction, with early users across Europe and growing. But every screen built without a real foundation added AI design debt: small inconsistencies that users feel without being able to name. People cannot always say why something feels off, or why they do not come back, and very often the answer is inconsistency. It stays invisible until you fix it.\n\nAs a small team that cannot hire its way out, Pilgrimz needed great output from the first pass. So the system was never cosmetic. It was the way out of debt that compounds with every new feature, and the prerequisite for everything the founders wanted next, like gamification, social sharing, and better discovery.",
  challenge:
    "AI made them fast. Speed was quietly working against them.\n\nClaude let a small team ship like a much bigger one. But every screen generated without a real foundation drifted a little further from the last, and that drift compounds. Users rarely complain about inconsistency. They just stop trusting the app without knowing why, and then they stop coming back. The challenge was never to slow Pilgrimz down. It was to make their speed safe.",
  roleDescription:
    "I led this work through my design studio, Yummy Design & Labs. I built their entire design system on a really strong base, designed so the team could build reliably with Claude after. Then I took it further with an AI enablement layer that maps the system to code and into Claude, and set up their internal Claude infrastructure through our Claude Design OS sprint. From there I redesigned the core flows and screens, and shaped the early direction for the social layer that comes next.",
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
      metric: "Core flows rebuilt around trust",
      description:
        "The map, tour pages, and discovery were restructured so travelers always know where they are, what a tour offers, and why it's worth paying for.",
    },
    {
      metric: "Hubs partners are proud of",
      description:
        "Museums and tourism boards get a branded home instead of a listing, from the first impression to the empty state. A stronger pitch for the business side of Pilgrimz.",
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

/** Role bullets shown beside the Overview (2-col layout) */
export const pilgrimzRoleBullets = [
  "Led the work through Yummy Design & Labs",
  "Product strategy and UX across the core flows",
  "The full design system, built AI-readable",
  "Claude Design OS: skills, agents, evals, and the team workshop",
  "Redesign of the map, discovery, and the Hub",
  "Early direction for the social layer",
];
