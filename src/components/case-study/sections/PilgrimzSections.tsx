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
  variant?: "wide" | "phone" | "square" | "pano" | "photo";
  className?: string;
  dark?: boolean;
}) {
  const aspect =
    variant === "phone"
      ? "9 / 19.5"
      : variant === "square"
        ? "1 / 1"
        : variant === "pano"
          ? "21 / 9"
          : variant === "photo"
            ? "4 / 3"
            : "16 / 10";
  const wrap = variant === "phone" ? "mx-auto w-full max-w-[210px]" : "w-full";
  const radius = variant === "phone" ? "rounded-[30px]" : "rounded-2xl";
  return (
    <div className={`${wrap} ${className}`}>
      <div
        className={`relative flex w-full items-center justify-center overflow-hidden ${radius} border border-dashed ${
          dark ? "border-white/25" : "border-[#E0D8C9]"
        }`}
        style={{
          aspectRatio: aspect,
          background: dark
            ? "linear-gradient(150deg, rgba(255,255,255,0.07) 0%, rgba(15,136,143,0.14) 100%)"
            : "linear-gradient(135deg, #FFFDFB 0%, rgba(232,76,68,0.05) 50%, rgba(232,155,36,0.08) 100%)",
        }}
      >
        <div className="flex flex-col items-center gap-2 px-4 text-center">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{
              backgroundColor: dark ? "rgba(255,255,255,0.12)" : "rgba(232,76,68,0.10)",
              color: dark ? "#9FDDE0" : CORAL,
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

/** Dark branded panel with a blurred radial glow — reserved for the Claude Design OS showpiece */
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

/** Warm paper panel — the product's own surface (Pilgrimz is warm and photo-forward, not dark) */
function WarmPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-[#EBE5D9] p-6 lg:p-10 ${className}`}
      style={{ background: "linear-gradient(165deg, #FBF8F3 0%, #F5F1E9 100%)" }}
    >
      {children}
    </div>
  );
}

/* ── Small real product artifacts (rebuilt UI furniture, not abstract boxes) ── */

/** The app's segmented control — coral active pill */
function SegmentedControl() {
  const items = ["Tours", "Recs", "Favorites"];
  return (
    <div className="mt-5 inline-flex items-center gap-1 rounded-full border border-[#EBE5D9] bg-white p-1 shadow-sm">
      {items.map((label, i) => (
        <span
          key={label}
          className={`rounded-full px-4 py-1.5 text-[12px] font-semibold ${
            i === 0 ? "text-white" : "text-[#807D76]"
          }`}
          style={i === 0 ? { backgroundColor: CORAL } : undefined}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

/** POI chips — how featured and sponsored places read in the product */
function PoiChips() {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <span
        className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
        style={{ backgroundColor: "#FDEBCC", color: "#8A5B10" }}
      >
        Hidden gem
      </span>
      <span
        className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
        style={{ backgroundColor: "#FDEBCC", color: "#8A5B10", boxShadow: `0 0 0 1.5px ${AMBER}66` }}
      >
        ★ Featured
      </span>
      <span
        className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
        style={{ backgroundColor: "#C2E5E7", color: "#0A5C61" }}
      >
        Selected
      </span>
    </div>
  );
}

/** A tour list item, straight from the product */
function TourListItem() {
  return (
    <div className="mt-4 flex w-fit items-center gap-3 rounded-2xl border border-[#EBE5D9] bg-white p-2.5 pr-5 shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/pilgrimz/galerie-vivienne.jpg"
        alt=""
        className="h-12 w-12 rounded-xl object-cover"
      />
      <div>
        <div className="text-[13px] font-bold leading-tight text-[#1C1B19]">
          The covered passages of Paris
        </div>
        <div className="mt-0.5 text-[11px] text-[#807D76]">Tour · 5 stops · 40 min</div>
      </div>
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
          style={{ backgroundColor: CORAL }}
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

/* ════════════════════════════════════════
   Phase 1 — The AI-enabled foundation
   ════════════════════════════════════════ */
/* A token as Claude reads it: value, description, references, use and avoid */
function TokenDocCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-sand-300 bg-[#1C1B19]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-white/40">
          color-primary.md — what Claude reads
        </span>
      </div>
      <div className="space-y-2 p-4 font-mono text-[12px] leading-relaxed">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span style={{ color: CORAL }}>color/primary/500</span>
          <span className="inline-flex items-center gap-1.5 text-white/60">
            <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: CORAL }} />
            #E84C44
          </span>
          <span className="text-white/30">→</span>
          <span className="text-white/60">theme.colors.primary</span>
        </div>
        <div>
          <span className="text-white/35">description:</span>{" "}
          <span className="text-white/75">
            reserved for primary actions. play, book, save. signals action, never alarm.
          </span>
        </div>
        <div>
          <span className="text-white/35">pairs-with:</span>{" "}
          <span className="text-white/75">text/inverse (AA contrast, checked)</span>
        </div>
        <div>
          <span className="text-[#53D68A]">use:</span>{" "}
          <span className="text-white/75">play button, main CTA, active booking</span>
        </div>
        <div>
          <span className="text-[#FF7B72]">avoid:</span>{" "}
          <span className="text-white/75">backgrounds, decorative fills, error states</span>
        </div>
        <div className="pt-1 text-white/40">
          # error stays #DC2626. an action never looks like a failure.
        </div>
      </div>
    </div>
  );
}

/* Mini mock screens: the same layout on-system vs off-system */
function MiniMock({ good }: { good?: boolean }) {
  const chip = (bg: string) => (
    <span className="h-2.5 w-8 rounded-full" style={{ backgroundColor: bg }} />
  );
  return (
    <div className="flex-1 rounded-xl border border-sand-200 bg-[#FAF9F7] p-3">
      <div className="flex flex-col gap-2">
        {/* Header bar */}
        <span
          className="h-2.5 w-1/2 rounded-full"
          style={{ backgroundColor: good ? "#33312D" : CORAL }}
        />
        {/* Image area */}
        <span
          className="h-14 w-full rounded-lg"
          style={{
            background: good
              ? "linear-gradient(135deg, rgba(15,136,143,0.25), rgba(232,155,36,0.2))"
              : "linear-gradient(135deg, rgba(232,76,68,0.4), rgba(220,38,38,0.3))",
          }}
        />
        {/* Tag chips */}
        <div className="flex gap-1.5">
          {good ? (
            <>
              {chip("#C2E5E7")}
              {chip("#FDEBCC")}
            </>
          ) : (
            <>
              {chip("#FDCFCC")}
              {chip("#E84C44")}
            </>
          )}
        </div>
        {/* CTA */}
        <span
          className="h-6 w-full rounded-md"
          style={{ backgroundColor: good ? CORAL : "#DC2626" }}
        />
      </div>
      <div className="mt-2.5 flex items-center gap-1.5">
        <span
          className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: good ? "#0C7075" : "#DC2626" }}
        >
          {good ? (
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </span>
        <span className="text-[11px] font-semibold text-neutral-600">
          {good ? "Coral only where you act" : "Red everywhere reads as alert"}
        </span>
      </div>
    </div>
  );
}

function GoodVsBad() {
  return (
    <div className="rounded-2xl border border-sand-300 bg-white p-5">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-brand text-[16px] font-bold text-brand-ink">
          Good vs bad, encoded
        </span>
        <span className="text-[12px] text-neutral-500">usage rules Claude can check</span>
      </div>
      <div className="flex gap-3">
        <MiniMock good />
        <MiniMock />
      </div>
      <p className="mt-3 text-[12px] leading-relaxed text-neutral-500">
        Every token ships with do and don&rsquo;t examples, references, and the reasoning behind
        them, so output follows intent, not vibes.
      </p>
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
        Tokens map cleanly to code, and every one ships with more than a value: a description,
        references, and good vs bad usage. Claude knows when to use a token, not just what it is.
      </p>
      <ColorPalette colors={pilgrimzColors} />
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TokenDocCard />
        <TypeNote />
      </div>
      <div className="mt-4">
        <GoodVsBad />
      </div>

      {/* The system living on real screens — warm product surface */}
      <div className="mt-5">
        <WarmPanel>
          <div className="flex flex-col items-center gap-8 lg:flex-row">
            <div className="lg:w-[300px]">
              <span
                className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.06em]"
                style={{ backgroundColor: "rgba(232,76,68,0.10)", color: "#C93A32" }}
              >
                The system in use
              </span>
              <h4 className="mt-3 font-brand text-[19px] font-bold leading-tight text-brand-ink">
                Decisions made on real screens, not swatches
              </h4>
              <p className="mt-2 text-[13px] leading-relaxed text-neutral-600">
                I showed color and type living on primary screens with usage guidance, so the
                founders could judge the system where it matters, on the product.
              </p>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-4">
              <Placeholder variant="phone" label="Screen — before tokens" />
              <Placeholder variant="phone" label="Screen — on system" />
            </div>
          </div>
        </WarmPanel>
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
      title: "AI-readable from day one",
      body: "Created so Claude can read it. Not just tokens and values, but the context and intent behind them.",
      image: "System docs Claude reads",
    },
    {
      title: "Infrastructure inside Claude and VS Code",
      body: "Skills, agents, and files wired into the tools the team already builds in.",
      image: "Skills & agents in the repo",
    },
    {
      title: "Trained on their craft, not generic data",
      body: "The OS carries Pilgrimz's own craft rules, so output looks like Pilgrimz, not like generic UI.",
      image: "Craft rules in the context library",
    },
    {
      title: "Evaluation loops",
      body: "Quality checks built in, so the team can trust what ships without manual policing.",
      image: "An eval run on real output",
    },
  ];
  const kit = [
    { name: "Design OS playbook", note: "every workflow, documented" },
    { name: "Context library", note: "craft rules, ready to use" },
    { name: "Eval suite", note: "quality checks built in" },
    { name: "Claude infrastructure", note: "skills, agents, files" },
    { name: "Live team workshop", note: "everyone onboarded" },
  ];
  return (
    <div ref={ref} className="mt-8">
      <ShowcasePanel glow={accentColor}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
          {/* Left: the story + what we built */}
          <div className="flex-1">
            <span
              className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.06em]"
              style={{ backgroundColor: `${accentColor}26`, color: "#7FD4D9" }}
            >
              The differentiator
            </span>
            <h3 className="mt-3 font-brand text-[22px] font-bold leading-tight text-white">
              The Claude Design OS
            </h3>
            <p className="mt-2 max-w-[520px] text-[14px] leading-relaxed text-white/65">
              I did not stop at tokens. I built Pilgrimz an operating system for designing with
              Claude, so great output is the default, not luck. The concrete promise to the
              founders: ask Claude to build and test a feature and get something on-system in about
              an hour.
            </p>
          </div>

          {/* Right: the handoff kit, the artifact the team keeps */}
          <div className="w-full lg:w-[300px]">
            <motion.div
              className="rounded-2xl border border-white/15 bg-white/[0.08] p-5 backdrop-blur-md"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between">
                <span className="font-brand text-[16px] font-bold text-white">Handoff kit</span>
                <span
                  className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.05em]"
                  style={{ backgroundColor: `${accentColor}33`, color: "#9FDDE0" }}
                >
                  Yours to run
                </span>
              </div>
              <div className="mt-4 flex flex-col divide-y divide-white/10">
                {kit.map((item, i) => (
                  <motion.div
                    key={item.name}
                    className="flex items-center gap-2.5 py-2.5"
                    initial={{ opacity: 0, x: 10 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.08, ease: "easeOut" }}
                  >
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: accentColor }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold leading-tight text-white">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-white/45">{item.note}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-white/50">
                The whole team, not just designers, left able to run the OS themselves.
              </p>
            </motion.div>
          </div>
        </div>

        {/* What we built — image cards, full panel width */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: "easeOut" }}
            >
              <Placeholder dark variant="photo" label={c.image} />
              <div className="mt-4 font-body text-[15px] font-bold text-white">{c.title}</div>
              <p className="mt-1 text-[13px] leading-relaxed text-white/55">{c.body}</p>
            </motion.div>
          ))}
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
        title="From AI design debt to a foundation Claude can build on"
        intro="Pilgrimz was designing straight in Claude with a few guidelines, and every screen added debt. Phase one built the missing foundation, and built it to be read by AI, so a tiny team gets great, on-system output from the first pass instead of racking up cleanup rounds."
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

/** Map & discovery — warm product surface with real UI furniture */
function MapShowcase({ accentColor }: { accentColor: string }) {
  return (
    <div className="mt-10">
      <WarmPanel>
        <div className="flex flex-col items-center gap-8 lg:flex-row">
          <div className="lg:w-[320px]">
            <span className="text-[11px] font-bold uppercase tracking-[0.05em]" style={{ color: accentColor }}>
              Navigation, discovery & the map
            </span>
            <h3 className="mt-2 font-brand text-[20px] font-bold leading-tight text-brand-ink">
              The map as a primary surface, not a backdrop
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-neutral-600">
              Users struggled to move between cities without zooming the map, reaching for a search
              they could not find. The redesign made moving between destinations obvious,
              differentiated point of interest types, and surfaced sponsored places clearly, which
              ties straight to how Pilgrimz makes money.
            </p>
            <SegmentedControl />
            <PoiChips />
            <TourListItem />
          </div>
          <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-3">
            <Placeholder variant="phone" label="City switcher" />
            <Placeholder variant="phone" label="Map & POI types" />
            <Placeholder variant="phone" label="Sponsored places" className="hidden sm:block" />
          </div>
        </div>
      </WarmPanel>
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
        <WarmPanel>
          <Placeholder variant="phone" label="Hub redesign" />
        </WarmPanel>
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
            <WarmPanel>
              <Placeholder variant="phone" label="Hub redesign — swaps per step" />
            </WarmPanel>
          </div>
        </div>
        <div className="flex flex-col">
          {steps.map((s, i) => (
            <div key={s.title} className="flex min-h-[45vh] items-center">
              <SectionReveal delay={0.05}>
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full font-brand text-[13px] font-bold text-white"
                  style={{ backgroundColor: CORAL }}
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
        <WarmPanel>
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
                  <Placeholder variant="phone" label={label} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </WarmPanel>
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
        intro="The redesign was downstream of the OS. Because the base existed, and Claude could build on it, core screens were reworked quickly and stayed consistent. Every choice served trust, retention, and the business, not taste."
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
        text="With the debt paid down and the OS in place, the work shifted from cleanup to real product strategy."
      />
      <Phase2 accentColor={accentColor} />
      <BrandedDivider
        accentColor={accentColor}
        text="Consistent, trusted screens are the groundwork for the part the founders most want next."
      />
      <Phase3 accentColor={accentColor} />
      <OutcomesOnPhoto accentColor={accentColor} />
    </div>
  );
}
