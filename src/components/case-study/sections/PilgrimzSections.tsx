"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionReveal, ColorPalette } from "@/components/case-study/interactive";
import { SectionLabel } from "@/components/case-study/SectionLabel";

/* ── Pilgrimz brand ── */
const TEAL = "#0F888F";
const AMBER = "#E89B24";
const CORAL = "#E84C44";

/* Real tokens from the Pilgrimz Figma design system */
const pilgrimzColors = [
  { name: "Coral / Primary", hex: "#E84C44" },
  { name: "Teal / Secondary", hex: "#0F888F" },
  { name: "Amber / Accent", hex: "#E89B24" },
  { name: "Ink", hex: "#1C1B19" },
  { name: "Text", hex: "#33312D" },
  { name: "Muted", hex: "#807D76" },
  { name: "Surface", hex: "#FAF9F7" },
  { name: "Error", hex: "#DC2626" },
];

/* ════════════════════════════════════════
   Reusable: visual placeholder (swap for real screens/prototypes later)
   ════════════════════════════════════════ */
function Placeholder({
  label,
  variant = "wide",
  className = "",
}: {
  label: string;
  variant?: "wide" | "phone" | "square" | "pano";
  className?: string;
}) {
  const aspect =
    variant === "phone" ? "9 / 19.5" : variant === "square" ? "1 / 1" : variant === "pano" ? "21 / 9" : "16 / 10";
  const wrap = variant === "phone" ? "mx-auto w-full max-w-[210px]" : "w-full";
  const radius = variant === "phone" ? "rounded-[30px]" : "rounded-2xl";
  return (
    <div className={`${wrap} ${className}`}>
      <div
        className={`relative flex w-full items-center justify-center overflow-hidden ${radius} border border-dashed border-sand-400`}
        style={{
          aspectRatio: aspect,
          background:
            "linear-gradient(135deg, #FAF9F7 0%, rgba(15,136,143,0.07) 55%, rgba(232,155,36,0.06) 100%)",
        }}
      >
        <div className="flex flex-col items-center gap-2 px-4 text-center">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{ backgroundColor: "rgba(15,136,143,0.12)", color: TEAL }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.8" />
              <path d="m21 15-4.586-4.586a2 2 0 0 0-2.828 0L5 19" />
            </svg>
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-neutral-500">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   Reusable: phase header (numbered, so the layers read as a sequence)
   ════════════════════════════════════════ */
function PhaseHeader({
  num,
  kicker,
  title,
  intro,
  accentColor,
  badge,
}: {
  num: string;
  kicker: string;
  title: string;
  intro: string;
  accentColor: string;
  badge?: string;
}) {
  return (
    <SectionReveal>
      <div className="flex flex-wrap items-center gap-3">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full font-brand text-[14px] font-bold text-white"
          style={{ backgroundColor: accentColor }}
        >
          {num}
        </span>
        <SectionLabel label={kicker} accentColor={accentColor} />
        {badge && (
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.05em]"
            style={{ backgroundColor: `${AMBER}1F`, color: "#996310" }}
          >
            {badge}
          </span>
        )}
      </div>
      <h2 className="mt-4 font-brand text-28 font-bold leading-tight text-brand-ink">{title}</h2>
      <p className="mt-3 max-w-[760px] text-16 leading-[1.8] text-neutral-600">{intro}</p>
    </SectionReveal>
  );
}

/* Connective tissue between phases */
function Bridge({ text }: { text: string }) {
  return (
    <SectionReveal>
      <div className="mx-auto flex max-w-[620px] flex-col items-center gap-3 py-2 text-center">
        <span className="h-7 w-px bg-sand-400" />
        <p className="text-[14px] font-medium leading-relaxed text-neutral-500">{text}</p>
        <span className="h-7 w-px bg-sand-400" />
      </div>
    </SectionReveal>
  );
}

/* ════════════════════════════════════════
   Phase 1 — The AI-enabled foundation
   ════════════════════════════════════════ */
function TokenMapCard() {
  const rows = [
    { token: "primary/500", code: "theme.colors.primary", value: "#E84C44", color: CORAL },
    { token: "secondary/500", code: "theme.colors.secondary", value: "#0F888F", color: TEAL },
    { token: "accent/500", code: "theme.colors.accent", value: "#E89B24", color: AMBER },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-sand-300 bg-[#1C1B19]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-white/40">tokens → theme</span>
      </div>
      <div className="space-y-2 p-4 font-mono text-[12px] leading-relaxed">
        {rows.map((r) => (
          <div key={r.token} className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span style={{ color: r.color }}>{r.token}</span>
            <span className="text-white/30">→</span>
            <span className="text-white/70">{r.code}</span>
            <span className="text-white/30">→</span>
            <span className="inline-flex items-center gap-1.5 text-white/50">
              <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: r.color }} />
              {r.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypeNote() {
  return (
    <div className="rounded-2xl border border-sand-300 bg-white p-6">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700&family=DM+Sans:wght@400;500&display=swap" />
      <div className="mb-4 flex items-baseline justify-between">
        <span className="font-brand text-[16px] font-bold text-brand-ink">Type as a guide</span>
        <span className="text-[12px] text-neutral-500">Plus Jakarta Sans · DM Sans</span>
      </div>
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="text-[30px] font-bold leading-tight text-brand-ink">
        Know the story
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="mt-2 text-[15px] leading-relaxed text-neutral-600">
        GPS triggered audio guides bring the story to where you stand. A voice that reads as a
        knowledgeable guide, not a children&rsquo;s app.
      </div>
    </div>
  );
}

function FoundationBlock() {
  return (
    <div className="mt-10">
      <h3 className="mb-1 font-brand text-[18px] font-bold text-brand-ink">
        A system named for code, not just for Figma
      </h3>
      <p className="mb-6 max-w-[760px] text-[14px] leading-relaxed text-neutral-600">
        Tokens were named with intent so they map cleanly to the codebase, toward the Gluestack theme
        and portable if the team moves off it. Color carries meaning: coral for primary actions, teal
        for exploration, amber for featured and sponsored. Name things right now, and the design to
        code sync becomes trivial later instead of a permanent translation tax.
      </p>
      <ColorPalette colors={pilgrimzColors} />
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TokenMapCard />
        <TypeNote />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Placeholder variant="wide" label="Storybook — the system's shared home" />
        <Placeholder variant="wide" label="Color & type living on a real screen" />
      </div>
    </div>
  );
}

function ClaudeInfraBlock({ accentColor }: { accentColor: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const cards = [
    {
      title: "Custom Skills",
      body: "Skills that teach Claude the system, so it reaches for the right tokens, components, and patterns by default.",
    },
    {
      title: "Dedicated agents",
      body: "Purpose-built agents for the design-to-build loop, so the team gets focused, on-system output instead of generic UI.",
    },
    {
      title: "System as context",
      body: "The design system travels with the work as context, so intent and accessibility come along for the ride.",
    },
  ];
  return (
    <div
      ref={ref}
      className="mt-8 overflow-hidden rounded-3xl border border-sand-300 p-6 lg:p-8"
      style={{ background: "linear-gradient(160deg, #1C1B19 0%, #2A2724 100%)" }}
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
        {/* Left: the story + cards */}
        <div className="flex-1">
          <span
            className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.06em]"
            style={{ backgroundColor: `${accentColor}26`, color: "#7FD4D9" }}
          >
            The differentiator
          </span>
          <h3 className="mt-3 font-brand text-[22px] font-bold leading-tight text-white">
            The infrastructure inside Claude
          </h3>
          <p className="mt-2 max-w-[520px] text-[14px] leading-relaxed text-white/65">
            I did not stop at tokens. I set Claude up to build with the system. The concrete promise
            to the founders: Jesús can ask Claude to build and test a feature and get something
            on-system in about an hour.
          </p>
          <div className="mt-5 flex flex-col gap-3">
            {cards.map((c, i) => (
              <motion.div
                key={c.title}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.1, ease: "easeOut" }}
              >
                <div className="font-body text-[14px] font-bold text-white">{c.title}</div>
                <p className="mt-1 text-[13px] leading-relaxed text-white/55">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: foundation → Claude → on-system output */}
        <div className="flex w-full flex-col items-center gap-3 lg:w-[260px]">
          <span className="rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-center text-[12px] font-medium text-white/70">
            Design system + Skills + agents
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7FD4D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
          <span
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-semibold text-white"
            style={{ backgroundColor: accentColor }}
          >
            Claude builds it
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7FD4D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
          <div className="relative w-full">
            <Placeholder variant="phone" label="On-system screen" />
            <span
              className="absolute -right-1 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold"
              style={{ backgroundColor: AMBER, color: "#3A2606" }}
            >
              ~1 hr
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Phase1({ accentColor }: { accentColor: string }) {
  return (
    <section className="mx-auto w-full max-w-5xl">
      <PhaseHeader
        num="01"
        kicker="The AI-enabled foundation"
        title="A foundation strong enough for AI to build on"
        intro="Pilgrimz wanted gamification, social, and better discovery next. None of that holds without a consistent base, so phase one was a design system. The twist: I built it to be read by AI, so a tiny team could design and ship on a strong foundation, with Claude building on top of it."
        accentColor={accentColor}
      />
      <FoundationBlock />
      <ClaudeInfraBlock accentColor={accentColor} />
    </section>
  );
}

/* ════════════════════════════════════════
   Phase 2 — The design work
   ════════════════════════════════════════ */
function FlowRow({
  tag,
  title,
  body,
  reverse,
  accentColor,
  i,
}: {
  tag: string;
  title: string;
  body: string;
  reverse?: boolean;
  accentColor: string;
  i: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div
      ref={ref}
      className={`flex flex-col items-center gap-6 lg:gap-10 ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"}`}
    >
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: reverse ? 24 : -24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.05em]" style={{ color: accentColor }}>
          {tag}
        </span>
        <h3 className="mt-1.5 font-brand text-[20px] font-bold text-brand-ink">{title}</h3>
        <p className="mt-2 max-w-[460px] text-[14px] leading-relaxed text-neutral-600">{body}</p>
      </motion.div>
      <motion.div
        className="w-full lg:w-[280px]"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      >
        <Placeholder variant="phone" label={`Screen ${i}`} />
      </motion.div>
    </div>
  );
}

function Phase2({ accentColor }: { accentColor: string }) {
  const rows = [
    {
      tag: "Navigation & discovery",
      title: "Moving between cities without a fight",
      body: "Users, especially older ones, struggled to move between cities without zooming the map. I treated this as an experience problem, not an icon problem, and rebuilt the path to feel obvious.",
    },
    {
      tag: "The map",
      title: "A primary surface, not a backdrop",
      body: "People lean on the map to sense what is around them. The redesign differentiates point of interest types and surfaces sponsored or premium places clearly, which ties straight to how Pilgrimz makes money.",
    },
    {
      tag: "The Hub",
      title: "The B2B revenue surface, made premium",
      body: "Hubs are curated experiences sold to museums and tourism boards. I moved it toward a cleaner Airbnb and Strava feel: continuous scroll, a consolidated Experiences section, a sticky book this experience button, and collapsible audio sources.",
    },
  ];
  return (
    <section className="mx-auto w-full max-w-5xl">
      <PhaseHeader
        num="02"
        kicker="The design work"
        title="Core flows, restructured around trust and the business"
        intro="The redesign was downstream of the system. Because the base existed, and Claude could build on it, core screens were reworked quickly and stayed consistent. Every choice served trust, retention, and the business, not taste."
        accentColor={accentColor}
      />
      <div className="mt-10 flex flex-col gap-12">
        {rows.map((r, idx) => (
          <FlowRow key={r.tag} {...r} reverse={idx % 2 === 1} accentColor={accentColor} i={idx + 1} />
        ))}
      </div>
      <div className="mt-10">
        <Placeholder variant="pano" label="Tours & city imagery — discovery across destinations" />
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   Phase 3 — Social discovery (in progress)
   ════════════════════════════════════════ */
function Phase3({ accentColor }: { accentColor: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const cards = [
    {
      title: "A feed built around places",
      body: "Discovery rethought around places, inspiration, and saving destinations for later, not a social network of strangers.",
    },
    {
      title: "Light micro-feedback",
      body: "Quick tags after a tour, like good for solo travelers or great coffee, that improve the product without asking users to perform.",
    },
    {
      title: "Shareable trip cards",
      body: "Cards built for outbound sharing to Instagram and WhatsApp, designed to inspire the person who receives it to go do the same.",
    },
  ];
  return (
    <section className="mx-auto w-full max-w-5xl">
      <PhaseHeader
        num="03"
        kicker="Social discovery"
        title="A social layer built around places, not strangers"
        intro="This is the chapter underway now. The old feed showed strangers' activity with no reason to care, so social is being reframed around destinations. The useful unit is many travelers found this place great for solo travelers, not this user took a Tuesday walk."
        accentColor={accentColor}
        badge="In progress"
      />
      <div ref={ref} className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: "easeOut" }}
          >
            <Placeholder variant="phone" label={`Concept ${i + 1}`} />
            <div>
              <div className="font-body text-[14px] font-bold text-brand-ink">{c.title}</div>
              <p className="mt-1 text-[13px] leading-relaxed text-neutral-600">{c.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <SectionReveal delay={0.1}>
        <div className="mt-8 rounded-2xl p-6" style={{ backgroundColor: `${accentColor}0F` }}>
          <p className="text-[15px] font-medium leading-relaxed text-brand-ink">
            Organic contribution and inspiration beat asking early users to perform for an audience.
            Ownership and memory come before gamification.
          </p>
        </div>
      </SectionReveal>
    </section>
  );
}

/* ════════════════════════════════════════
   Main — three layers, each building into the next
   ════════════════════════════════════════ */
export function PilgrimzSections({ accentColor }: { accentColor: string }) {
  return (
    <div className="flex w-full flex-col gap-16">
      <Phase1 accentColor={accentColor} />
      <Bridge text="With that foundation in place, and Claude building on it, the team could move fast and stay consistent. That is what made the redesign possible." />
      <Phase2 accentColor={accentColor} />
      <Bridge text="Consistent, trusted screens are the groundwork for the part the founders most want next." />
      <Phase3 accentColor={accentColor} />
    </div>
  );
}
