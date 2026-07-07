"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionReveal, ColorPalette } from "@/components/case-study/interactive";
import { SectionLabel } from "@/components/case-study/SectionLabel";
import { pilgrimzContent } from "./pilgrimzContent";

/* ── Pilgrimz brand ── */
const TEAL = "#0F888F";
const AMBER = "#E89B24";
const CORAL = "#E84C44";
const INK = "#1C1B19";
const DEEP = "#0E3538";

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
   Shared helpers
   ════════════════════════════════════════ */

/** Visual placeholder — swap for real screens / prototypes later */
function Placeholder({
  label,
  variant = "wide",
  className = "",
  dark,
}: {
  label: string;
  variant?: "wide" | "phone" | "square" | "pano";
  className?: string;
  dark?: boolean;
}) {
  const aspect =
    variant === "phone" ? "9 / 19.5" : variant === "square" ? "1 / 1" : variant === "pano" ? "21 / 9" : "16 / 10";
  const wrap = variant === "phone" ? "mx-auto w-full max-w-[210px]" : "w-full";
  const radius = variant === "phone" ? "rounded-[30px]" : "rounded-2xl";
  return (
    <div className={`${wrap} ${className}`}>
      <div
        className={`relative flex w-full items-center justify-center overflow-hidden ${radius} border border-dashed ${
          dark ? "border-white/25" : "border-sand-400"
        }`}
        style={{
          aspectRatio: aspect,
          background: dark
            ? "linear-gradient(150deg, rgba(255,255,255,0.07) 0%, rgba(15,136,143,0.14) 100%)"
            : "linear-gradient(135deg, #FAF9F7 0%, rgba(15,136,143,0.07) 55%, rgba(232,155,36,0.06) 100%)",
        }}
      >
        <div className="flex flex-col items-center gap-2 px-4 text-center">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{
              backgroundColor: dark ? "rgba(255,255,255,0.12)" : "rgba(15,136,143,0.12)",
              color: dark ? "#9FDDE0" : TEAL,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.8" />
              <path d="m21 15-4.586-4.586a2 2 0 0 0-2.828 0L5 19" />
            </svg>
          </span>
          <span
            className={`text-[11px] font-semibold uppercase tracking-[0.06em] ${
              dark ? "text-white/50" : "text-neutral-500"
            }`}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

/** Dark branded panel with a blurred radial glow — the product showcase backdrop */
function ShowcasePanel({
  children,
  glow = TEAL,
  className = "",
}: {
  children: React.ReactNode;
  glow?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-6 lg:p-10 ${className}`}
      style={{ background: `linear-gradient(165deg, ${DEEP} 0%, ${INK} 100%)` }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px]"
        style={{ backgroundColor: `${glow}30` }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/** Numbered phase header, so the layers read as a sequence */
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

/** Branded divider — gradient hairlines flanking a glyph chip */
function BrandedDivider({ accentColor, text }: { accentColor: string; text?: string }) {
  return (
    <SectionReveal>
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 py-2">
        <div className="flex w-full items-center gap-4">
          <span
            className="h-px flex-1"
            style={{ background: `linear-gradient(to right, transparent, ${accentColor}55)` }}
          />
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: `${accentColor}12`, color: accentColor }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
          </span>
          <span
            className="h-px flex-1"
            style={{ background: `linear-gradient(to left, transparent, ${accentColor}55)` }}
          />
        </div>
        {text && (
          <p className="max-w-[560px] text-center text-[14px] font-medium leading-relaxed text-neutral-500">
            {text}
          </p>
        )}
      </div>
    </SectionReveal>
  );
}

/** Solid statement card — one bold line on a deep brand block */
function StatementCard({ text }: { text: string }) {
  return (
    <SectionReveal>
      <div
        className="mx-auto w-full max-w-4xl rounded-3xl px-8 py-10 text-center lg:px-14"
        style={{ background: `linear-gradient(160deg, ${DEEP} 0%, ${INK} 100%)` }}
      >
        <p className="font-brand text-[20px] font-bold leading-relaxed text-white lg:text-[22px]">
          {text}
        </p>
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
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700&family=DM+Sans:wght@400;500&display=swap"
      />
      <div className="mb-4 flex items-baseline justify-between">
        <span className="font-brand text-[16px] font-bold text-brand-ink">Type as a guide</span>
        <span className="text-[12px] text-neutral-500">Plus Jakarta Sans · DM Sans</span>
      </div>
      <div
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        className="text-[30px] font-bold leading-tight text-brand-ink"
      >
        Know the story
      </div>
      <div
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        className="mt-2 text-[15px] leading-relaxed text-neutral-600"
      >
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

      {/* The system living on real screens — showcase treatment */}
      <div className="mt-5">
        <ShowcasePanel glow={TEAL}>
          <div className="flex flex-col items-center gap-8 lg:flex-row">
            <div className="lg:w-[300px]">
              <span
                className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.06em]"
                style={{ backgroundColor: `${TEAL}26`, color: "#7FD4D9" }}
              >
                The system in use
              </span>
              <h4 className="mt-3 font-brand text-[19px] font-bold leading-tight text-white">
                Decisions made on real screens, not swatches
              </h4>
              <p className="mt-2 text-[13px] leading-relaxed text-white/60">
                I showed color and type living on primary screens with usage guidance, so the
                founders could judge the system where it matters, on the product.
              </p>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-4">
              <Placeholder dark variant="phone" label="Screen — before tokens" />
              <Placeholder dark variant="phone" label="Screen — on system" />
            </div>
          </div>
        </ShowcasePanel>
      </div>

      <div className="mt-5">
        <Placeholder variant="pano" label="Storybook — the system's shared home" />
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
    <div ref={ref} className="mt-8">
      <ShowcasePanel glow={accentColor}>
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
              I did not stop at tokens. I set Claude up to build with the system. The concrete
              promise to the founders: Jesús can ask Claude to build and test a feature and get
              something on-system in about an hour.
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
              <Placeholder dark variant="phone" label="On-system screen" />
              <span
                className="absolute -right-1 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold"
                style={{ backgroundColor: AMBER, color: "#3A2606" }}
              >
                ~1 hr
              </span>
            </div>
          </div>
        </div>
      </ShowcasePanel>
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

/** Map & discovery — device showcase on gradient backdrop */
function MapShowcase({ accentColor }: { accentColor: string }) {
  return (
    <div className="mt-10">
      <ShowcasePanel glow={accentColor}>
        <div className="flex flex-col items-center gap-8 lg:flex-row">
          <div className="lg:w-[320px]">
            <span className="text-[11px] font-bold uppercase tracking-[0.05em]" style={{ color: "#7FD4D9" }}>
              Navigation, discovery & the map
            </span>
            <h3 className="mt-2 font-brand text-[20px] font-bold leading-tight text-white">
              The map as a primary surface, not a backdrop
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-white/60">
              Users struggled to move between cities without zooming the map, reaching for a search
              they could not find. The redesign made moving between destinations obvious,
              differentiated point of interest types, and surfaced sponsored places clearly, which
              ties straight to how Pilgrimz makes money.
            </p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-3">
            <Placeholder dark variant="phone" label="City switcher" />
            <Placeholder dark variant="phone" label="Map & POI types" />
            <Placeholder dark variant="phone" label="Sponsored places" className="hidden sm:block" />
          </div>
        </div>
      </ShowcasePanel>
    </div>
  );
}

/** The Hub — sticky phone left, scrolling story steps right */
function HubStickyShowcase({ accentColor }: { accentColor: string }) {
  const steps = [
    {
      title: "Continuous scroll replaces tabs",
      body: "Hubs used to split content across tabs that hid what organizations were paying to show. One continuous, curated scroll gives the space an editorial, premium feel.",
    },
    {
      title: "One Experiences section",
      body: "What used to be separate tabs is consolidated into a single Experiences section, so visitors see the full offer at a glance.",
    },
    {
      title: "A sticky call to action",
      body: "Book this experience stays with you as you scroll. Clarity here directly serves the museums and tourism boards paying Pilgrimz.",
    },
    {
      title: "Audio sources on demand",
      body: "Audio guide sources collapse by default and expand when you want them, cutting clutter without hiding depth.",
    },
  ];
  return (
    <div className="mt-16">
      <SectionReveal>
        <span className="text-[11px] font-bold uppercase tracking-[0.05em]" style={{ color: accentColor }}>
          The Hub
        </span>
        <h3 className="mt-1.5 font-brand text-[20px] font-bold text-brand-ink">
          The B2B revenue surface, made premium
        </h3>
        <p className="mt-2 max-w-[620px] text-[14px] leading-relaxed text-neutral-600">
          Hubs are curated experiences from museums, tourism boards, and cultural organizations, the
          business to business product Pilgrimz sells. I moved it toward a cleaner Airbnb and Strava
          feel.
        </p>
      </SectionReveal>

      {/* Mobile: panel once, then steps */}
      <div className="mt-8 lg:hidden">
        <ShowcasePanel glow={accentColor}>
          <Placeholder dark variant="phone" label="Hub redesign" />
        </ShowcasePanel>
        <div className="mt-6 flex flex-col gap-4">
          {steps.map((s, i) => (
            <SectionReveal key={s.title} delay={i * 0.06}>
              <div className="rounded-2xl border border-sand-300 bg-white p-5">
                <div className="font-body text-[14px] font-bold text-brand-ink">{s.title}</div>
                <p className="mt-1 text-[13px] leading-relaxed text-neutral-600">{s.body}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>

      {/* Desktop: sticky showcase */}
      <div className="mt-8 hidden gap-10 lg:grid lg:grid-cols-2">
        <div className="relative">
          <div className="sticky top-24">
            <ShowcasePanel glow={accentColor}>
              <Placeholder dark variant="phone" label="Hub redesign — swaps per step" />
            </ShowcasePanel>
          </div>
        </div>
        <div className="flex flex-col">
          {steps.map((s, i) => (
            <div key={s.title} className="flex min-h-[45vh] items-center">
              <SectionReveal delay={0.05}>
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full font-brand text-[13px] font-bold text-white"
                  style={{ backgroundColor: accentColor }}
                >
                  {i + 1}
                </span>
                <h4 className="mt-3 font-brand text-[18px] font-bold text-brand-ink">{s.title}</h4>
                <p className="mt-2 max-w-[420px] text-[14px] leading-relaxed text-neutral-600">
                  {s.body}
                </p>
              </SectionReveal>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Breadth — floating phones in a wave on a gradient backdrop */
function FloatingBreadth({ accentColor }: { accentColor: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const labels = ["Tours", "Discovery", "Map", "Hub", "Audio guide", "Profile"];
  return (
    <div ref={ref} className="mt-16">
      <SectionReveal>
        <span className="text-[11px] font-bold uppercase tracking-[0.05em]" style={{ color: accentColor }}>
          One system, every screen
        </span>
        <h3 className="mt-1.5 font-brand text-[20px] font-bold text-brand-ink">
          Consistent from the map to the audio guide
        </h3>
      </SectionReveal>
      <div className="mt-6">
        <ShowcasePanel glow={accentColor}>
          <div className="grid grid-cols-3 gap-4 lg:grid-cols-6">
            {labels.map((label, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: "easeOut" }}
              >
                <motion.div
                  animate={{ y: i % 2 === 0 ? [-5, 5, -5] : [5, -5, 5] }}
                  transition={{ duration: 5 + (i % 3), repeat: Infinity, ease: "easeInOut" }}
                >
                  <Placeholder dark variant="phone" label={label} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </ShowcasePanel>
      </div>
    </div>
  );
}

function Phase2({ accentColor }: { accentColor: string }) {
  return (
    <section className="mx-auto w-full max-w-5xl">
      <PhaseHeader
        num="02"
        kicker="The design work"
        title="Core flows, restructured around trust and the business"
        intro="The redesign was downstream of the system. Because the base existed, and Claude could build on it, core screens were reworked quickly and stayed consistent. Every choice served trust, retention, and the business, not taste."
        accentColor={accentColor}
      />
      <MapShowcase accentColor={accentColor} />
      <HubStickyShowcase accentColor={accentColor} />
      <FloatingBreadth accentColor={accentColor} />
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
    </section>
  );
}

/* ════════════════════════════════════════
   Outcomes — glass cards on full-bleed photo (split layout)
   ════════════════════════════════════════ */
function OutcomeIcon({ i }: { i: number }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const icons = [
    <svg key="0" {...common}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>,
    <svg key="1" {...common}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>,
    <svg key="2" {...common}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M12 8l1.2 2.8L16 12l-2.8 1.2L12 16l-1.2-2.8L8 12l2.8-1.2z" />
    </svg>,
    <svg key="3" {...common}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>,
  ];
  return icons[i % icons.length];
}

function OutcomesOnPhoto({ accentColor }: { accentColor: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const outcomes = pilgrimzContent.outcomes;
  return (
    <section ref={ref} className="mx-auto w-full max-w-5xl">
      <div className="relative min-h-[520px] overflow-hidden rounded-3xl">
        {/* Photo background — swap for a real destination photo later */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/pilgrimz/outcomes-bg-placeholder.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 to-transparent" />

        <div className="relative flex flex-col gap-8 p-7 lg:flex-row lg:gap-12 lg:p-12">
          {/* Sticky headline */}
          <div className="lg:w-[38%]">
            <div className="lg:sticky lg:top-24">
              <span
                className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-white"
                style={{ backgroundColor: accentColor }}
              >
                Outcomes
              </span>
              <h2 className="mt-4 font-brand text-28 font-bold leading-tight text-white">
                What Pilgrimz walked away with
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-white/70">
                No invented numbers. The value is trust, consistency, speed, and infrastructure the
                team builds on every day.
              </p>
            </div>
          </div>

          {/* Glass cards */}
          <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
            {outcomes.map((o, i) => (
              <motion.div
                key={o.metric}
                className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: "easeOut" }}
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: `${accentColor}66` }}
                >
                  <OutcomeIcon i={i} />
                </span>
                <div className="mt-3 font-brand text-[16px] font-bold text-white">{o.metric}</div>
                <p className="mt-1 text-[13px] leading-relaxed text-white/70">{o.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
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
      <BrandedDivider
        accentColor={accentColor}
        text="With that foundation in place, and Claude building on it, the team could move fast and stay consistent. That is what made the redesign possible."
      />
      <Phase2 accentColor={accentColor} />
      <BrandedDivider
        accentColor={accentColor}
        text="Consistent, trusted screens are the groundwork for the part the founders most want next."
      />
      <Phase3 accentColor={accentColor} />
      <StatementCard text="Organic contribution and inspiration beat asking early users to perform for an audience. Ownership and memory come before gamification." />
      <OutcomesOnPhoto accentColor={accentColor} />
    </div>
  );
}
