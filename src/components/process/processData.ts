// ─── Phase block definitions ───
export type PhaseType = "research" | "design" | "code" | "test" | "ship" | "system";

export interface PhaseBlock {
  name: string;
  type: PhaseType;
  weeks: number;
  when: string;
  skip: string;
}

export const blocks: Record<string, PhaseBlock> = {
  research: {
    name: "Research",
    type: "research",
    weeks: 2,
    when: "When entering a new domain or working with complex user problems. I talk to users, map the landscape, and find the real problem worth solving.",
    skip: "The problem space is already well understood, or we need to move fast and learn by shipping.",
  },
  discovery: {
    name: "Discovery",
    type: "research",
    weeks: 1,
    when: "Stakeholder interviews, competitive analysis, and understanding business constraints.",
    skip: "It\u2019s a personal project or the constraints are already crystal clear.",
  },
  flows: {
    name: "Flows & IA",
    type: "design",
    weeks: 1,
    when: "Complex products with multiple user paths. I map the full journey before touching UI.",
    skip: "Simple, single-purpose tools where the flow is obvious.",
  },
  wireframes: {
    name: "Wireframes",
    type: "design",
    weeks: 1.5,
    when: "When I need to test structure and layout before committing to visual design.",
    skip: "I\u2019m confident in the direction or working in code is faster.",
  },
  ui: {
    name: "UI Design",
    type: "design",
    weeks: 3,
    when: "Crafting the visual layer \u2014 components, interactions, polish.",
    skip: "Rapid prototypes where we\u2019re optimizing for learning, not polish.",
  },
  code: {
    name: "Build in Code",
    type: "code",
    weeks: 2,
    when: "When the fastest way to validate is to build it. Especially for interactions.",
    skip: "The problem is still fuzzy and we\u2019d be building the wrong thing.",
  },
  ai: {
    name: "AI-assisted",
    type: "code",
    weeks: 0.5,
    when: "Using AI to generate UI, write code, or explore variations faster.",
    skip: "The work requires deep craft or nuanced decision-making.",
  },
  tokens: {
    name: "Tokens & Systems",
    type: "system",
    weeks: 2,
    when: "Building semantic design tokens, component APIs, and documentation.",
    skip: "One-off projects that don\u2019t need systematic thinking.",
  },
  testing: {
    name: "User Testing",
    type: "test",
    weeks: 1,
    when: "Before major decisions or launches. Real users, real feedback.",
    skip: "We\u2019re shipping something small and can learn from analytics.",
  },
  iterate: {
    name: "Iterate",
    type: "test",
    weeks: 1.5,
    when: "After every round of feedback. Design is never done on the first try.",
    skip: "Never \u2014 iteration is non-negotiable.",
  },
  handoff: {
    name: "Dev Handoff",
    type: "ship",
    weeks: 1,
    when: "Specs, documentation, and working with engineers.",
    skip: "I\u2019m building it myself or pair-designing with devs.",
  },
  ship: {
    name: "Ship",
    type: "ship",
    weeks: 0.5,
    when: "Get it into users\u2019 hands. Watch what happens. Learn.",
    skip: "Never \u2014 shipping is how you learn.",
  },
};

// ─── Row item (a bar in the gantt) ───
export interface RowItem {
  id: string;
  start: number;
}

// ─── Mode configuration ───
export interface ModeConfig {
  duration: string;
  totalWeeks: number;
  nowWeek: number;
  rows: RowItem[][];
}

export type ModeId = "zero-to-one" | "rapid" | "system" | "redesign";

export const modes: Record<ModeId, ModeConfig> = {
  "zero-to-one": {
    duration: "~10 weeks",
    totalWeeks: 12,
    nowWeek: 3,
    rows: [
      [{ id: "research", start: 0 }, { id: "discovery", start: 2 }],
      [{ id: "flows", start: 2 }, { id: "wireframes", start: 3 }],
      [{ id: "ui", start: 4.5 }],
      [{ id: "testing", start: 5 }, { id: "iterate", start: 6 }],
      [{ id: "handoff", start: 7.5 }, { id: "ship", start: 9 }],
    ],
  },
  rapid: {
    duration: "~2 weeks",
    totalWeeks: 4,
    nowWeek: 0.5,
    rows: [
      [{ id: "discovery", start: 0 }],
      [{ id: "ai", start: 0.5 }, { id: "code", start: 1 }],
      [{ id: "testing", start: 1.5 }, { id: "iterate", start: 2.5 }],
      [{ id: "ship", start: 3 }],
    ],
  },
  system: {
    duration: "~6 weeks",
    totalWeeks: 8,
    nowWeek: 2,
    rows: [
      [{ id: "discovery", start: 0 }, { id: "research", start: 1 }],
      [{ id: "tokens", start: 2 }],
      [{ id: "ui", start: 3 }],
      [{ id: "testing", start: 4 }, { id: "iterate", start: 5 }],
      [{ id: "ship", start: 6.5 }],
    ],
  },
  redesign: {
    duration: "~8 weeks",
    totalWeeks: 10,
    nowWeek: 2,
    rows: [
      [{ id: "research", start: 0 }],
      [{ id: "flows", start: 1.5 }, { id: "wireframes", start: 2.5 }],
      [{ id: "ui", start: 3.5 }],
      [{ id: "testing", start: 4.5 }, { id: "iterate", start: 5.5 }],
      [{ id: "handoff", start: 7 }, { id: "ship", start: 8 }],
    ],
  },
};

export const modeButtons: { id: ModeId; emoji: string; label: string }[] = [
  { id: "zero-to-one", emoji: "\uD83D\uDE80", label: "0\u21921 Product" },
  { id: "rapid", emoji: "\u26A1", label: "Rapid Prototype" },
  { id: "system", emoji: "\uD83E\uDDF1", label: "Design System" },
  { id: "redesign", emoji: "\uD83D\uDD27", label: "Redesign" },
];

// ─── Color maps (dark-bg optimised) ───
export const barColors: Record<PhaseType, { bg: string; border: string; text: string }> = {
  research: { bg: "bg-white/[0.08]",  border: "border-white/[0.15]", text: "text-white/90" },
  design:   { bg: "bg-[#4f46e5]/20", border: "border-[#6d63ff]/40", text: "text-[#d4d1ff]" },
  code:     { bg: "bg-[#10b981]/15", border: "border-[#34d399]/30", text: "text-[#a7f3d0]" },
  test:     { bg: "bg-[#f59e0b]/15", border: "border-[#fbbf24]/30", text: "text-[#fde68a]" },
  ship:     { bg: "bg-[#22c55e]/15", border: "border-[#4ade80]/30", text: "text-[#86efac]" },
  system:   { bg: "bg-[#8b5cf6]/15", border: "border-[#a78bfa]/30", text: "text-[#e9d5ff]" },
};

export const badgeColors: Record<PhaseType, string> = {
  research: "bg-neutral-100 text-neutral-600",
  design:   "bg-blue-100 text-blue-700",
  code:     "bg-[#ccfbf1] text-[#0d9488]",
  test:     "bg-[#ffedd5] text-[#f97316]",
  ship:     "bg-[#dcfce7] text-[#22c55e]",
  system:   "bg-[#ede9fe] text-[#8b5cf6]",
};

export const legendItems: { type: PhaseType; label: string; color: string }[] = [
  { type: "research", label: "Research", color: "bg-white/40" },
  { type: "design", label: "Design", color: "bg-[#6d63ff]" },
  { type: "code", label: "Code", color: "bg-[#34d399]" },
  { type: "test", label: "Testing", color: "bg-[#fbbf24]" },
  { type: "system", label: "Systems", color: "bg-[#a78bfa]" },
  { type: "ship", label: "Ship", color: "bg-[#4ade80]" },
];
