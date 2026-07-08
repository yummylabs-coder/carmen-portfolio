"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { SectionReveal } from "@/components/case-study/interactive";
import { SectionLabel } from "@/components/case-study/SectionLabel";
import { pilgrimzContent } from "./pilgrimzContent";

/* ── Pilgrimz brand ── */
const TEAL = "#0F888F";
const AMBER = "#E89B24";
const CORAL = "#E84C44";
const INK = "#1C1B19";
const DEEP = "#0E3538";

/* ════════════════════════════════════════
   Shared helpers
   ════════════════════════════════════════ */

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

/** Round carousel arrow */
function ArrowBtn({ dir, onClick }: { dir: "l" | "r"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "l" ? "Previous" : "Next"}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E8E6E1] bg-white text-[#33312D] shadow-sm transition-all hover:bg-[#FAF9F7] active:scale-95"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {dir === "l" ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );
}

/* ── Small real product artifacts (rebuilt UI furniture, not abstract boxes) ── */

/** The app's segmented control — coral active pill, fully interactive */
function SegmentedControl({ id = "map" }: { id?: string }) {
  const items = ["Tours", "Recs", "Favorites"];
  const [active, setActive] = useState(0);
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-[#EBE5D9] bg-white p-1 shadow-sm">
      {items.map((label, i) => (
        <button
          key={label}
          onClick={() => setActive(i)}
          className={`relative rounded-full px-4 py-1.5 text-[12px] font-semibold transition-colors ${
            active === i ? "text-white" : "text-[#807D76] hover:text-[#33312D]"
          }`}
        >
          {active === i && (
            <motion.span
              layoutId={`${id}-segment-pill`}
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: CORAL }}
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
            />
          )}
          <span className="relative">{label}</span>
        </button>
      ))}
    </div>
  );
}

/** POI chips — tap to switch the active state, like the product's filters */
function PoiChips() {
  const chips = [
    {
      label: "Hidden gem",
      idle: { backgroundColor: "#FDEBCC", color: "#8A5B10" },
      active: { backgroundColor: AMBER, color: "#FFFFFF" },
    },
    {
      label: "★ Featured",
      idle: { backgroundColor: "#FDEBCC", color: "#8A5B10" },
      active: { backgroundColor: AMBER, color: "#FFFFFF" },
    },
    {
      label: "Selected",
      idle: { backgroundColor: "#C2E5E7", color: "#0A5C61" },
      active: { backgroundColor: TEAL, color: "#FFFFFF" },
    },
  ];
  const [active, setActive] = useState(2);
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {chips.map((chip, i) => (
        <motion.button
          key={chip.label}
          onClick={() => setActive(i)}
          whileTap={{ scale: 0.93 }}
          className="rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors duration-200"
          style={active === i ? chip.active : chip.idle}
        >
          {chip.label}
        </motion.button>
      ))}
    </div>
  );
}

/** A tour list item, straight from the product — hover lift, save toggle */
function TourListItem() {
  const [saved, setSaved] = useState(false);
  return (
    <div className="mt-4 flex w-fit cursor-pointer items-center gap-3 rounded-2xl border border-[#EBE5D9] bg-white p-2.5 pr-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
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
      <motion.button
        onClick={() => setSaved(!saved)}
        whileTap={{ scale: 0.85 }}
        aria-label={saved ? "Remove from saved" : "Save tour"}
        className="ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FAF9F7]"
      >
        <motion.svg
          animate={saved ? { scale: [1, 1.35, 1] } : {}}
          transition={{ duration: 0.35 }}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={saved ? CORAL : "none"}
          stroke={saved ? CORAL : "#807D76"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </motion.svg>
      </motion.button>
    </div>
  );
}

/** Numbered phase header, so the layers read as a sequence */
function PhaseHeader({
  num,
  kicker,
  title,
  intro,
  badge,
}: {
  num: string;
  kicker: string;
  title: string;
  intro: string;
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
        {/* Neutral kicker pill — the coral number already carries the color */}
        <SectionLabel label={kicker} accentColor="#807D76" />
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

/** Photo bridge — a destination moment between phases, carrying the connective line */
function PhotoBridge({ src, alt, text }: { src: string; alt: string; text: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className="mx-auto w-full max-w-5xl">
      <motion.div
        className="relative h-[220px] overflow-hidden rounded-3xl lg:h-[260px]"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={inView ? { scale: 1 } : { scale: 1.08 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="h-full w-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
        <div className="absolute inset-0 flex items-center p-8 lg:p-12">
          <p className="max-w-[460px] font-brand text-[18px] font-bold leading-[1.4] text-white lg:text-[20px]">
            {text}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════
   Phase 1 — The AI-enabled foundation
   ════════════════════════════════════════ */
/* A token as Claude reads it: the real machine-readable format */
function TokenDocCard() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-[#0B4348]"
      style={{ background: "linear-gradient(160deg, #0C5157 0%, #083A3E 100%)" }}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-white/40">
          tokens.js: what Claude reads
        </span>
      </div>
      <div className="overflow-x-auto whitespace-pre p-4 font-mono text-[11px] leading-[1.75] text-white/75">
        {`"primary": {
  "500": {`}
        <div className="flex items-center gap-1.5">
          {`    "$value": "#E84C44",`}
          <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: CORAL }} />
        </div>
        {`    "$description": "Primary action. Play, book,
      save. Signals action, never alarm.",
    "$extensions": {
      "figma-console-mcp": {
        "collectionId": "VariableCollectionId:1:12",
        "lastSyncedAt": "2026-07-02T14:46:16Z",
        "lastSyncedValue": {
          "Light": { "literal": "#E84C44" },
          "Dark": { "literal": "#F26B62" }
        }
      },
      "usage": {
        "use": ["playButton", "primaryCta"],
        "avoid": ["backgrounds", "errorStates"],
        "note": "error/500 stays #DC2626"
      }
    }
  }
}`}
      </div>
    </div>
  );
}

/* Mini mock screens: the same tour screen on-system vs off-system */
function MiniMock({ good }: { good?: boolean }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-sand-200 bg-white">
        {/* Nav bar */}
        <div
          className="flex items-center gap-1.5 px-3 py-2"
          style={{ backgroundColor: good ? "#FAF9F7" : CORAL }}
        >
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={good ? "#33312D" : "#FFFFFF"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span
            className="text-[9.5px] font-semibold"
            style={{ color: good ? "#33312D" : "#FFFFFF" }}
          >
            Tours
          </span>
        </div>
        <div className="flex flex-1 flex-col p-3">
          {/* Image with chip — grows into available height */}
          <div className="relative min-h-[96px] flex-1 overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/pilgrimz/galerie-vivienne.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            {!good && (
              <div className="absolute inset-0" style={{ backgroundColor: "rgba(232,76,68,0.3)" }} />
            )}
            <span
              className="absolute left-2 top-2 rounded-full px-2 py-[3px] text-[8px] font-semibold"
              style={
                good
                  ? { backgroundColor: "#FDEBCC", color: "#8A5B10" }
                  : { backgroundColor: "#DC2626", color: "#FFFFFF" }
              }
            >
              Hidden gem
            </span>
          </div>
          {/* Title + meta */}
          <div className="mt-2 text-[10.5px] font-bold leading-tight text-[#1C1B19]">
            The covered passages
          </div>
          <div className="mt-0.5 text-[8.5px] text-[#807D76]">Tour · 5 stops · 40 min</div>
          {/* Tag chips */}
          <div className="mt-2 flex gap-1.5">
            <span
              className="rounded-full px-2 py-[3px] text-[8px] font-semibold"
              style={
                good
                  ? { backgroundColor: "#C2E5E7", color: "#0A5C61" }
                  : { backgroundColor: "#FDCFCC", color: "#9B2B25" }
              }
            >
              Selected
            </span>
            <span
              className="rounded-full px-2 py-[3px] text-[8px] font-semibold"
              style={
                good
                  ? { backgroundColor: "#FDEBCC", color: "#8A5B10" }
                  : { backgroundColor: "#E84C44", color: "#FFFFFF" }
              }
            >
              Featured
            </span>
          </div>
          {/* CTA */}
          <div
            className="mt-2 rounded-lg py-1.5 text-center text-[9.5px] font-bold text-white"
            style={{ backgroundColor: good ? CORAL : "#DC2626" }}
          >
            Book this tour
          </div>
        </div>
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
    <div className="flex h-full flex-col rounded-2xl border border-sand-300 bg-white p-5">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-brand text-[16px] font-bold text-brand-ink">
          Good vs bad, encoded
        </span>
        <span className="text-[12px] text-neutral-500">usage rules Claude can check</span>
      </div>
      <div className="flex flex-1 gap-4">
        <MiniMock good />
        <MiniMock />
      </div>
      <p className="mt-4 text-[12px] leading-relaxed text-neutral-500">
        Every token ships with do and don&rsquo;t examples, references, and the reasoning behind
        them, so output follows intent, not vibes.
      </p>
    </div>
  );
}

/* ── Sub-section header, so each block of phase 1 has room to breathe ── */
function SubHead({
  kicker,
  title,
  body,
  accentColor,
  first,
}: {
  kicker: string;
  title: string;
  body?: string;
  accentColor: string;
  /** First sub-section skips the divider line */
  first?: boolean;
}) {
  return (
    <SectionReveal>
      <div className={first ? "mt-20" : "mt-16 border-t border-[#EEEBE8] pt-14"}>
        <span className="text-[11px] font-bold uppercase tracking-[0.05em]" style={{ color: accentColor }}>
          {kicker}
        </span>
        <h3 className="mt-1.5 font-brand text-[20px] font-bold text-brand-ink">{title}</h3>
        {body && (
          <p className="mt-2 max-w-[620px] text-[14px] leading-relaxed text-neutral-600">{body}</p>
        )}
      </div>
    </SectionReveal>
  );
}

/* ── Interactive color palette ── */
const colorFamilies = [
  {
    name: "Coral",
    hex: "#E84C44",
    role: "Primary actions. Play, book, save. Signals action, never alarm.",
    ramp: ["#FDCFCC", "#F26B62", "#E84C44", "#C93A32"],
  },
  {
    name: "Teal",
    hex: "#0F888F",
    role: "Exploration, discovery, and selected states.",
    ramp: ["#C2E5E7", "#24A0A8", "#0F888F", "#0A5C61"],
  },
  {
    name: "Amber",
    hex: "#E89B24",
    role: "Featured and sponsored content, achievements.",
    ramp: ["#FDEBCC", "#F0AC3E", "#E89B24", "#B27516"],
  },
];

function FamilySwatch({ family }: { family: (typeof colorFamilies)[0] }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(family.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  return (
    <button
      onClick={copy}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#EBE5D9] bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div
        className="h-24 w-full shrink-0 transition-all duration-300 group-hover:h-[76px]"
        style={{ backgroundColor: family.hex }}
      />
      {/* Ramp expands on hover */}
      <div className="flex h-3 w-full shrink-0 transition-all duration-300 group-hover:h-8">
        {family.ramp.map((c) => (
          <span key={c} className="h-full flex-1" style={{ backgroundColor: c }} />
        ))}
      </div>
      <div className="flex-1 p-5">
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-brand text-[16px] font-bold text-brand-ink">{family.name}</span>
          <span className="font-mono text-[11px] text-neutral-500">
            {copied ? "Copied!" : family.hex}
          </span>
        </div>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-neutral-600">{family.role}</p>
      </div>
    </button>
  );
}

function PilgrimzPalette() {
  const neutrals = [
    { name: "Ink", hex: "#1C1B19" },
    { name: "Text", hex: "#33312D" },
    { name: "Muted", hex: "#807D76" },
    { name: "Border", hex: "#E8E6E1" },
    { name: "Surface", hex: "#FAF9F7" },
    { name: "White", hex: "#FFFFFF" },
  ];
  const semantic = [
    { name: "Success", hex: "#1E9E6A" },
    { name: "Warning", hex: "#E89B24" },
    { name: "Error", hex: "#DC2626" },
    { name: "Info", hex: "#2F6FE0" },
  ];
  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {colorFamilies.map((f) => (
          <FamilySwatch key={f.name} family={f} />
        ))}
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#EBE5D9] bg-white p-5">
          <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.05em] text-neutral-500">
            Warm neutrals, not cold grays
          </div>
          <div className="flex overflow-hidden rounded-xl border border-[#EBE5D9]">
            {neutrals.map((n) => (
              <div
                key={n.name}
                className="h-14 flex-1 transition-transform duration-200 hover:scale-y-110"
                style={{ backgroundColor: n.hex }}
                title={`${n.name} · ${n.hex}`}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] text-neutral-500">
            <span>ink #1C1B19</span>
            <span>white #FFFFFF</span>
          </div>
        </div>
        <div className="rounded-2xl border border-[#EBE5D9] bg-white p-5">
          <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.05em] text-neutral-500">
            Semantic, kept distinct from brand
          </div>
          <div className="flex gap-2.5">
            {semantic.map((s) => (
              <div key={s.name} className="flex-1" title={s.hex}>
                <div
                  className="h-14 rounded-xl transition-transform duration-200 hover:-translate-y-0.5"
                  style={{ backgroundColor: s.hex }}
                />
                <div className="mt-1.5 text-center text-[11px] font-semibold text-neutral-600">
                  {s.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 text-[12px] text-neutral-500">
        The error red stays deliberately distinct from the coral primary, so an action never looks
        like a failure. Click a family to copy its hex.
      </p>
    </div>
  );
}

/* ── Detailed type system ── */
interface TypeRow {
  label: string;
  size: number;
  lh: number;
  weight: number;
  ls?: string;
  sample: string;
}

const jakartaScale: TypeRow[] = [
  { label: "Display", size: 36, lh: 44, weight: 700, ls: "-0.02em", sample: "Know the story" },
  { label: "Heading 1", size: 28, lh: 36, weight: 700, sample: "Roman and Moorish Málaga" },
  { label: "Heading 2", size: 22, lh: 30, weight: 600, sample: "Worth the detour" },
  { label: "Heading 3", size: 18, lh: 26, weight: 600, sample: "Explore all 32 tours" },
];

const dmScale: TypeRow[] = [
  {
    label: "Body large",
    size: 18,
    lh: 29,
    weight: 400,
    sample: "GPS triggered audio guides bring the story to where you stand.",
  },
  {
    label: "Body",
    size: 16,
    lh: 24,
    weight: 400,
    sample: "Pride in knowing, and the joy of passing it on.",
  },
  { label: "Label", size: 14, lh: 20, weight: 500, sample: "view in map · Download" },
  { label: "Caption", size: 12, lh: 16, weight: 500, sample: "Tour · 4 stops · 45 min" },
];

function TypeScaleCard({
  font,
  role,
  family,
  scale,
}: {
  font: string;
  role: string;
  family: string;
  scale: TypeRow[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#EBE5D9] bg-white">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#F0EDE8] px-6 py-4">
        <span className="font-brand text-[17px] font-bold text-brand-ink">{font}</span>
        <span className="text-[12px] text-neutral-500">{role}</span>
      </div>
      <div
        className="overflow-hidden whitespace-nowrap border-b border-[#F0EDE8] px-6 py-3 text-[13px] text-neutral-400"
        style={{ fontFamily: family }}
      >
        Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0123456789
      </div>
      <div className="divide-y divide-[#F0EDE8]">
        {scale.map((row) => (
          <div
            key={row.label}
            className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:gap-8"
          >
            <div className="w-[140px] shrink-0">
              <div className="text-[12px] font-semibold text-neutral-600">{row.label}</div>
              <div className="mt-0.5 font-mono text-[10.5px] text-neutral-400">
                {row.size}px / {row.lh}px · {row.weight}
              </div>
            </div>
            <div
              className="min-w-0 overflow-hidden text-brand-ink"
              style={{
                fontFamily: family,
                fontSize: row.size,
                lineHeight: `${row.lh}px`,
                fontWeight: row.weight,
                letterSpacing: row.ls,
              }}
            >
              {row.sample}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypeSystem() {
  return (
    <div className="mt-8 flex flex-col gap-5">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=DM+Sans:wght@400;500;700&display=swap"
      />
      <TypeScaleCard
        font="Plus Jakarta Sans"
        role="Headings & display"
        family="'Plus Jakarta Sans', sans-serif"
        scale={jakartaScale}
      />
      <TypeScaleCard font="DM Sans" role="Body & UI" family="'DM Sans', sans-serif" scale={dmScale} />
    </div>
  );
}

/* ── Core components, rebuilt in code and interactive ── */
function DemoCard({
  title,
  tokens,
  children,
}: {
  title: string;
  tokens: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-[#EBE5D9] bg-white">
      <div className="relative flex min-h-[180px] flex-1 items-center justify-center p-6">
        {/* Grid paper, fading out toward the edges */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 31px, #F7F3EC 31px, #F7F3EC 32px), repeating-linear-gradient(90deg, transparent, transparent 31px, #F7F3EC 31px, #F7F3EC 32px)",
            maskImage:
              "radial-gradient(ellipse 70% 70% at 50% 50%, black 25%, transparent 95%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 70% at 50% 50%, black 25%, transparent 95%)",
          }}
        />
        <div className="relative flex w-full items-center justify-center">{children}</div>
      </div>
      <div className="border-t border-[#F0EDE8] px-5 py-3.5">
        <div className="text-[13px] font-bold text-brand-ink">{title}</div>
        <div className="mt-0.5 font-mono text-[10.5px] text-neutral-400">{tokens}</div>
      </div>
    </div>
  );
}

/* Mini audio player, rebuilt to the component spec:
   frosted glass container (neutral/50 @85%, blur 16, radius/lg, p-12px, gap-8px),
   drag handle 36x4, thumbnail 52x52 radius/md, DM Sans type, karaoke transcript,
   4px teal-gradient progress (secondary/500 to 600, never coral), 44px coral
   play/pause with focus ring + 2s pulse while playing, 150ms icon crossfade. */
const TRANSCRIPT_SENTENCES = [
  "…the lovely orange trees lining the plaza…",
  "…built over the remains of the Moorish medina…",
  "…where locals still gather at golden hour…",
];

function AudioPlayerDemo() {
  const [playing, setPlaying] = useState(false);
  const [sentence, setSentence] = useState(0);
  const reduce = useReducedMotion() ?? false;
  const dm = "'DM Sans', sans-serif";

  /* Karaoke mode: the live sentence advances while playing */
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(
      () => setSentence((s) => (s + 1) % TRANSCRIPT_SENTENCES.length),
      3500,
    );
    return () => clearInterval(t);
  }, [playing]);

  return (
    <div
      className="w-full max-w-[300px] rounded-xl border border-[#E8E6E1] p-3 shadow-sm"
      style={{
        backgroundColor: "rgba(250, 249, 247, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      {/* Drag handle — swipe-up affordance, 36x4 */}
      <div className="mx-auto mb-2 h-1 w-9 rounded-full bg-[#D8D5CF]" />

      <div className="flex items-center gap-2">
        {/* Thumbnail — POI image, 52x52, radius/md */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/pilgrimz/galerie-vivienne.jpg"
          alt=""
          className="h-[52px] w-[52px] shrink-0 rounded-lg object-cover"
        />

        <div className="min-w-0 flex-1">
          {/* Title — DM Sans SemiBold 14, neutral/900 */}
          <div
            className="truncate text-[14px] font-semibold text-[#1C1B19]"
            style={{ fontFamily: dm }}
          >
            Plaza de los Naranjos
          </div>
          {/* Transcript preview — italic 12, neutral/500, live sentence */}
          <div className="h-[17px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={playing ? sentence : "frozen"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="truncate text-[12px] italic text-[#807D76]"
                style={{ fontFamily: dm }}
              >
                {TRANSCRIPT_SENTENCES[sentence]}
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Progress — 4px, neutral/200 track, secondary/500 to 600 gradient fill */}
          <div className="mt-1.5 flex items-center gap-2">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#E8E6E1]">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #0F888F 0%, #0C6E74 100%)" }}
                initial={{ width: "22%" }}
                animate={playing && !reduce ? { width: ["22%", "100%"] } : {}}
                transition={
                  playing && !reduce
                    ? { duration: 10, ease: "linear", repeat: Infinity }
                    : undefined
                }
              />
            </div>
            {/* Time remaining — DM Sans Regular 11, neutral/500 */}
            <span className="shrink-0 text-[11px] text-[#807D76]" style={{ fontFamily: dm }}>
              −1:08
            </span>
          </div>
        </div>

        {/* Play / pause — 44px coral, 20px white icon, focus ring + pulse while playing */}
        <div className="relative shrink-0">
          {playing && (
            <>
              {/* Focus ring — primary/500 @15%, static */}
              <span
                className="absolute -inset-[5px] rounded-full"
                style={{ backgroundColor: "rgba(232, 76, 68, 0.15)" }}
              />
              {/* Pulse ring — 2s ease-out loop (disabled for reduced motion) */}
              {!reduce && (
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: "#FDCFCC" }}
                  animate={{ scale: [1, 1.3], opacity: [0.8, 0] }}
                  transition={{ duration: 2, ease: "easeOut", repeat: Infinity }}
                />
              )}
            </>
          )}
          <button
            onClick={() => setPlaying(!playing)}
            aria-label={playing ? "Pause audio guide" : "Play audio guide"}
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-white shadow-md transition-transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: CORAL }}
          >
            {/* Icon crossfade, 150ms */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={playing ? "pause" : "play"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center"
              >
                {playing ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <polygon points="8,5 20,12 8,19" />
                  </svg>
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── The card family, rebuilt to spec: Tour, Rec, Event, Hub ── */

function ShareBtn() {
  return (
    <motion.span
      whileTap={{ scale: 0.85 }}
      className="absolute right-2.5 top-2.5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow-sm"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#807D76" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
      </svg>
    </motion.span>
  );
}

function CardImg({ src, className = "h-[180px]" }: { src: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" className={`w-full object-cover ${className}`} />
  );
}

/* Tour (featured): hidden gem chip, meta row, description, avatars footer */
function TourCardV() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-[#E8E6E1] bg-white"
      style={{ boxShadow: "0 0 1px rgba(28,27,25,0.04), 0 4px 20px rgba(28,27,25,0.05)" }}
    >
      <div className="relative overflow-hidden rounded-2xl">
        <CardImg src="/images/pilgrimz/galerie-vivienne.jpg" />
        <span
          className="absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
          style={{ backgroundColor: "#FDEBCC", color: "#8A5B10" }}
        >
          Hidden gem
        </span>
        <ShareBtn />
      </div>
      <div className="p-4">
        <div className="font-brand text-[15px] font-bold leading-snug text-[#1C1B19]">
          The covered passages of Paris
        </div>
        <div className="mt-0.5 text-[11.5px] font-semibold text-[#807D76]">
          Tour · 5 stops · 40 min
        </div>
        <p className="mt-1.5 text-[12px] leading-relaxed text-[#52504A]">
          Slip through the glass-roofed arcades of the 1800s, from Passage des Panoramas to Galerie
          Vivienne.
        </p>
        <div className="mt-3 flex items-center gap-2.5 border-t border-[#F0EDE8] pt-3">
          <div className="flex">
            {[
              { initial: "C", bg: "#C2E5E7", color: "#0A5C61" },
              { initial: "J", bg: "#FDCFCC", color: "#9B2B25" },
              { initial: "M", bg: "#FDEBCC", color: "#8A5B10" },
            ].map((a, i) => (
              <span
                key={a.initial}
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold ${
                  i > 0 ? "-ml-1.5" : ""
                }`}
                style={{ backgroundColor: a.bg, color: a.color }}
              >
                {a.initial}
              </span>
            ))}
          </div>
          <span className="text-[11px] text-[#807D76]">34 pilgrims walked this</span>
        </div>
      </div>
    </div>
  );
}

/* Point of interest: rating and community micro-feedback tags */
function PoiCardV() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-[#E8E6E1] bg-white"
      style={{ boxShadow: "0 0 1px rgba(28,27,25,0.04), 0 4px 20px rgba(28,27,25,0.05)" }}
    >
      <div className="relative overflow-hidden rounded-2xl">
        <CardImg src="/images/pilgrimz/atmospheric.jpg" />
        <ShareBtn />
      </div>
      <div className="p-4">
        <div className="font-brand text-[15px] font-bold leading-snug text-[#1C1B19]">
          Pont Alexandre III
        </div>
        <div className="mt-0.5 text-[11.5px] font-semibold text-[#807D76]">
          Point of interest · Paris
        </div>
        <p className="mt-1.5 text-[12px] leading-relaxed text-[#52504A]">
          Crowned lamps and gilded statues over the Seine, best at dusk.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[#F0EDE8] pt-3">
          <span className="flex items-center gap-1">
            <PhStar size={13} fill="#FDEBCC" outline="#B27516" />
            <span className="text-[12px] font-bold text-[#1C1B19]">4.5</span>
          </span>
          <span
            className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
            style={{ backgroundColor: "#C2E5E7", color: "#0A5C61" }}
          >
            32 tagged family-friendly
          </span>
        </div>
      </div>
    </div>
  );
}

/* Event: date tag over the image, time pill + view details footer */
function EventCardV() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-[#E8E6E1] bg-white"
      style={{ boxShadow: "0 0 1px rgba(28,27,25,0.04), 0 4px 20px rgba(28,27,25,0.05)" }}
    >
      <div className="relative overflow-hidden rounded-2xl">
        <CardImg src="/images/pilgrimz/barcelona.jpg" />
        <span className="absolute left-2.5 top-2.5 flex items-baseline gap-1 rounded-full bg-[#33312D]/90 px-2.5 py-1 text-white">
          <span className="text-[13px] font-bold leading-none">19</span>
          <span className="text-[9px] font-semibold uppercase tracking-[0.05em]">Jun</span>
        </span>
        <ShareBtn />
      </div>
      <div className="p-4">
        <div className="font-brand text-[15px] font-bold leading-snug text-[#1C1B19]">
          Festa major de Gràcia
        </div>
        <p className="mt-1.5 text-[12px] leading-relaxed text-[#52504A]">
          Streets dressed by their neighbors compete for the summer&rsquo;s best decorations.
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5 rounded-full bg-[#F0EDE8] px-2.5 py-1 text-[11px] font-semibold text-[#33312D]">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            18:30 – 20:00
          </span>
          <span className="cursor-pointer text-[12px] font-semibold" style={{ color: TEAL }}>
            View details
          </span>
        </div>
      </div>
    </div>
  );
}

/* Hub: overlapping logo, centered content, stat tiles, explore CTA */
function HubCardV() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-[#E8E6E1] bg-white p-3"
      style={{ boxShadow: "0 0 1px rgba(28,27,25,0.04), 0 4px 20px rgba(28,27,25,0.05)" }}
    >
      <div className="relative">
        <CardImg src="/images/pilgrimz/istanbul.jpg" className="h-[250px] rounded-2xl" />
        <span
          className="absolute -bottom-4 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-xl text-[8px] font-bold text-white shadow-md"
          style={{ backgroundColor: "#E8562E" }}
        >
          IST
        </span>
      </div>
      <div className="px-1 pb-1 pt-6 text-center">
        <div className="font-brand text-[15px] font-bold text-[#1C1B19]">
          Istanbul Modern
        </div>
        <div className="mt-0.5 flex items-center justify-center gap-1 text-[11px] text-[#807D76]">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Karaköy, Istanbul
        </div>
        <p className="mt-2 text-[12px] leading-relaxed text-[#52504A]">
          Explore the city through the eyes of its finest cultural institution.
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { n: "5", label: "Tours" },
            { n: "3", label: "Points of Interest" },
            { n: "5", label: "Events" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg bg-[#F5F3EF] px-1 py-2">
              <div className="text-[14px] font-bold text-[#1C1B19]">{s.n}</div>
              <div className="text-[9.5px] leading-tight text-[#807D76]">{s.label}</div>
            </div>
          ))}
        </div>
        <button
          className="mt-3 w-full rounded-xl py-2.5 text-[13px] font-semibold text-white transition-all hover:brightness-95 active:scale-[0.98]"
          style={{ backgroundColor: CORAL }}
        >
          Explore hub
        </button>
      </div>
    </div>
  );
}

const CARD_VARIANTS = ["Tour", "POI", "Event", "Hub"] as const;

function CardsDemo() {
  const [idx, setIdx] = useState(0);
  const go = (d: number) => setIdx((i) => (i + d + CARD_VARIANTS.length) % CARD_VARIANTS.length);
  const cards = [<TourCardV key="t" />, <PoiCardV key="p" />, <EventCardV key="e" />, <HubCardV key="h" />];
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex w-full items-center justify-center gap-4">
        <ArrowBtn dir="l" onClick={() => go(-1)} />
        <div className="w-[264px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              {cards[idx]}
            </motion.div>
          </AnimatePresence>
        </div>
        <ArrowBtn dir="r" onClick={() => go(1)} />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-[34px] text-right text-[11px] font-semibold uppercase tracking-[0.05em] text-neutral-500">
          {CARD_VARIANTS[idx]}
        </span>
        <div className="flex gap-1.5">
          {CARD_VARIANTS.map((v, i) => (
            <button
              key={v}
              onClick={() => setIdx(i)}
              aria-label={`Show ${v} card`}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: idx === i ? 18 : 6,
                backgroundColor: idx === i ? CORAL : "#D8D5CF",
              }}
            />
          ))}
        </div>
        <span className="w-[34px]" />
      </div>
    </div>
  );
}

/* ── Map markers (POI): interactive mini-map, rebuilt from the marker spec ──
   User location dot with halo, 44px photo tour markers (teal ring + ground
   shadow when selected), teardrop category pins with 16px icons, the sponsored
   amber star badge, and a cluster that splits on tap. */

/* Phosphor duotone icons (castle-turret, fork-knife, bed), as used in the product */
const DUOTONE_PATHS: Record<string, [string, string]> = {
  cultural: [
    "M208,48V92.69a8,8,0,0,1-2.34,5.65L192,112V224H152V168a24,24,0,0,0-48,0v56H64V112L50.34,98.34A8,8,0,0,1,48,92.69V48a8,8,0,0,1,8-8H80V72h32V40h32V72h32V40h24A8,8,0,0,1,208,48Z",
    "M216,216H200V115.31L211.31,104A15.86,15.86,0,0,0,216,92.69V48a16,16,0,0,0-16-16H176a8,8,0,0,0-8,8V64H152V40a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8V64H88V40a8,8,0,0,0-8-8H56A16,16,0,0,0,40,48V92.69A15.86,15.86,0,0,0,44.69,104L56,115.31V216H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM69.66,106.34,56,92.69V48H72V72a8,8,0,0,0,8,8h32a8,8,0,0,0,8-8V48h16V72a8,8,0,0,0,8,8h32a8,8,0,0,0,8-8V48h16V92.69l-13.66,13.65A8,8,0,0,0,184,112V216H160V168a32,32,0,0,0-64,0v48H72V112A8,8,0,0,0,69.66,106.34ZM144,216H112V168a16,16,0,0,1,32,0Z",
  ],
  restaurant: [
    "M208,40V168H152S152,64,208,40Z",
    "M72,88V40a8,8,0,0,1,16,0V88a8,8,0,0,1-16,0ZM216,40V224a8,8,0,0,1-16,0V176H152a8,8,0,0,1-8-8,268.75,268.75,0,0,1,7.22-56.88c9.78-40.49,28.32-67.63,53.63-78.47A8,8,0,0,1,216,40ZM200,53.9c-32.17,24.57-38.47,84.42-39.7,106.1H200ZM119.89,38.69a8,8,0,1,0-15.78,2.63L112,88.63a32,32,0,0,1-64,0l7.88-47.31a8,8,0,1,0-15.78-2.63l-8,48A8.17,8.17,0,0,0,32,88a48.07,48.07,0,0,0,40,47.32V224a8,8,0,0,0,16,0V135.32A48.07,48.07,0,0,0,128,88a8.17,8.17,0,0,0-.11-1.31Z",
  ],
  hotel: [
    "M248,112v56H112V80H216A32,32,0,0,1,248,112Z",
    "M216,72H32V48a8,8,0,0,0-16,0V208a8,8,0,0,0,16,0V176H240v32a8,8,0,0,0,16,0V112A40,40,0,0,0,216,72ZM32,88h72v72H32Zm88,72V88h96a24,24,0,0,1,24,24v48Z",
  ],
};

function MarkerIcon({ kind }: { kind: string }) {
  const paths = DUOTONE_PATHS[kind] ?? DUOTONE_PATHS.cultural;
  return (
    <svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor">
      <path d={paths[0]} opacity="0.2" />
      <path d={paths[1]} />
    </svg>
  );
}

/* Phosphor duotone star, colorable per layer */
function PhStar({ size, fill, outline }: { size: number; fill: string; outline: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256">
      <path
        d="M229.06,108.79l-48.7,42,14.88,62.79a8.4,8.4,0,0,1-12.52,9.17L128,189.09,73.28,222.74a8.4,8.4,0,0,1-12.52-9.17l14.88-62.79-48.7-42A8.46,8.46,0,0,1,31.73,94L95.64,88.8l24.62-59.6a8.36,8.36,0,0,1,15.48,0l24.62,59.6L224.27,94A8.46,8.46,0,0,1,229.06,108.79Z"
        fill={fill}
      />
      <path
        d="M239.18,97.26A16.38,16.38,0,0,0,224.92,86l-59-4.76L143.14,26.15a16.36,16.36,0,0,0-30.27,0L90.11,81.23,31.08,86a16.46,16.46,0,0,0-9.37,28.86l45,38.83L53,211.75a16.38,16.38,0,0,0,24.5,17.82L128,198.49l50.53,31.08A16.4,16.4,0,0,0,203,211.75l-13.76-58.07,45-38.83A16.43,16.43,0,0,0,239.18,97.26Zm-15.34,5.47-48.7,42a8,8,0,0,0-2.56,7.91l14.88,62.8a.37.37,0,0,1-.17.48c-.18.14-.23.11-.38,0l-54.72-33.65a8,8,0,0,0-8.38,0L69.09,215.94c-.15.09-.19.12-.38,0a.37.37,0,0,1-.17-.48l14.88-62.8a8,8,0,0,0-2.56-7.91l-48.7-42c-.12-.1-.23-.19-.13-.5s.18-.27.33-.29l63.92-5.16A8,8,0,0,0,103,91.86l24.62-59.61c.08-.17.11-.25.35-.25s.27.08.35.25L153,91.86a8,8,0,0,0,6.75,4.92l63.92,5.16c.15,0,.24,0,.33.29S224,102.63,223.84,102.73Z"
        fill={outline}
      />
    </svg>
  );
}

function GroundShadow() {
  return (
    <span className="absolute -bottom-1.5 left-1/2 h-2 w-7 -translate-x-1/2 rounded-full bg-black/10 blur-[3px]" />
  );
}

/** Teardrop category pin */
function CategoryPin({
  kind,
  selected,
  onClick,
  label,
}: {
  kind: string;
  selected: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      animate={{ scale: selected ? 1.05 : 1 }}
      aria-label={label}
      className="relative"
    >
      {selected && <GroundShadow />}
      <svg
        width="36"
        height="44"
        viewBox="0 0 36 44"
        style={{ filter: "drop-shadow(0 3px 6px rgba(28, 27, 25, 0.14))" }}
      >
        <path
          d="M18 1C8.6 1 1 8.6 1 18c0 10.8 14.6 22.9 16.1 24.1a1.4 1.4 0 0 0 1.8 0C20.4 40.9 35 28.8 35 18 35 8.6 27.4 1 18 1z"
          fill={selected ? TEAL : "#FFFFFF"}
        />
        {/* Inner circle behind the icon, per the POI marker design */}
        <circle
          cx="18"
          cy="18"
          r="14"
          fill={selected ? "rgba(255, 255, 255, 0.16)" : "#E8E6E1"}
        />
      </svg>
      <span
        className="absolute left-1/2 top-[11px] -translate-x-1/2"
        style={{ color: selected ? "#FFFFFF" : "#33312D" }}
      >
        <MarkerIcon kind={kind} />
      </span>
    </motion.button>
  );
}

/* Photo tour marker, to spec: default = 44px, 2px neutral/400 ring, elevation/xl.
   Selected = thick brand ring with an integrated teardrop tail and a soft
   ellipse beneath. Sponsored uses the amber ring and star badge. */
function PhotoMarker({
  img,
  sponsored,
  selected,
  onClick,
  label,
}: {
  img: string;
  sponsored?: boolean;
  selected: boolean;
  onClick: () => void;
  label: string;
}) {
  const ring = sponsored ? AMBER : TEAL;
  const ellipse = sponsored ? "#F8E4BF" : "#BFE2E7";
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      animate={{ scale: selected ? 1.05 : 1, y: selected ? -2 : 0 }}
      aria-label={label}
      className="relative"
    >
      {/* Soft landing ellipse under the tail (positioning wrapper stays static
          so framer's scale never cancels the translate centering) */}
      <AnimatePresence>
        {selected && (
          <span className="absolute -bottom-[12px] left-1/2 -translate-x-1/2">
            <motion.span
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 0.7, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="block h-2 w-7 rounded-full blur-[3px]"
              style={{ backgroundColor: ellipse }}
            />
          </span>
        )}
      </AnimatePresence>

      <span className="relative block">
        {/* Teardrop tail with a softly rounded point, selected only */}
        {selected && (
          <svg
            className="absolute -bottom-[9px] left-1/2 -translate-x-1/2"
            width="18"
            height="12"
            viewBox="0 0 18 12"
          >
            <path
              d="M0 0 H18 C14.5 5 11.5 7.5 10 10.6 A1.5 1.5 0 0 1 8 10.6 C6.5 7.5 3.5 5 0 0 Z"
              fill={ring}
            />
          </svg>
        )}
        {/* Ring: 2px default (neutral/400, amber for sponsored), thicker brand ring selected */}
        <span
          className="relative block rounded-full transition-all duration-200"
          style={{
            padding: selected ? 4 : 2,
            backgroundColor: selected ? ring : sponsored ? AMBER : "#B7B4AC",
            boxShadow: "0 4px 12px rgba(28, 27, 25, 0.12)",
          }}
        >
          <span className="block h-9 w-9 overflow-hidden rounded-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} alt="" className="h-full w-full object-cover" />
          </span>
        </span>
        {/* Sponsored star badge */}
        {sponsored && (
          <span
            className="absolute -right-1.5 -top-1 flex h-5 w-5 items-center justify-center rounded-full shadow-sm"
            style={{ backgroundColor: AMBER }}
          >
            <PhStar size={12} fill="#FDEBCC" outline="#523206" />
          </span>
        )}
      </span>
    </motion.button>
  );
}

function MapMarkersDemo() {
  const [selected, setSelected] = useState("tour");
  const reduce = useReducedMotion() ?? false;

  const notes: Record<string, string> = {
    tour: "Tour · photo marker, brand ring and tail when selected",
    sponsored: "Sponsored · amber ring and star mark paid visibility",
    cultural: "Cultural site · category pin",
    hotel: "Hotel · category pin",
    restaurant: "Restaurant · category pin",
  };

  return (
    <div className="flex w-full flex-col items-center gap-3">
      {/* Mini map stage — the product's real map underneath */}
      <div className="relative h-[190px] w-full max-w-[420px] overflow-hidden rounded-xl border border-[#E3DED6]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/pilgrimz/map-bg.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[50%_20%]"
        />

        {/* User location — pulsing halo (born invisible, fades while expanding, no restart pop) */}
        <div className="absolute left-[50%] top-[42%] -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-4 w-4">
            {!reduce && (
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: TEAL }}
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: [1, 2.4], opacity: [0, 0.35, 0] }}
                transition={{
                  scale: { duration: 2.4, repeat: Infinity, ease: "easeOut" },
                  opacity: { duration: 2.4, times: [0, 0.3, 1], repeat: Infinity, ease: "easeOut" },
                }}
              />
            )}
            <span
              className="absolute inset-0 rounded-full border-[2.5px] border-white shadow-md"
              style={{ backgroundColor: TEAL }}
            />
          </div>
        </div>

        {/* Markers */}
        <div className="absolute left-[20%] top-[26%] -translate-x-1/2 -translate-y-1/2">
          <PhotoMarker
            img="/images/pilgrimz/galerie-vivienne.jpg"
            selected={selected === "tour"}
            onClick={() => setSelected("tour")}
            label="Tour marker"
          />
        </div>
        <div className="absolute left-[80%] top-[24%] -translate-x-1/2 -translate-y-1/2">
          <PhotoMarker
            img="/images/pilgrimz/barcelona.jpg"
            sponsored
            selected={selected === "sponsored"}
            onClick={() => setSelected("sponsored")}
            label="Sponsored marker"
          />
        </div>
        <div className="absolute left-[35%] top-[64%] -translate-x-1/2 -translate-y-1/2">
          <CategoryPin
            kind="cultural"
            selected={selected === "cultural"}
            onClick={() => setSelected("cultural")}
            label="Cultural site pin"
          />
        </div>
        <div className="absolute left-[70%] top-[60%] -translate-x-1/2 -translate-y-1/2">
          <CategoryPin
            kind="hotel"
            selected={selected === "hotel"}
            onClick={() => setSelected("hotel")}
            label="Hotel pin"
          />
        </div>

        {/* Restaurant pin */}
        <div className="absolute left-[52%] top-[76%] -translate-x-1/2 -translate-y-1/2">
          <CategoryPin
            kind="restaurant"
            selected={selected === "restaurant"}
            onClick={() => setSelected("restaurant")}
            label="Restaurant pin"
          />
        </div>
      </div>

      {/* Caption follows selection */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="text-[11.5px] font-semibold text-neutral-500"
        >
          {notes[selected]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function CoreComponents() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
      <DemoCard
        title="Mini audio player"
        tokens="neutral/50 @85% + backdrop/md · secondary/500→600 · primary/500 · radius/lg"
      >
        <AudioPlayerDemo />
      </DemoCard>
      <DemoCard
        title="Map markers (POI)"
        tokens="neutral/400 · secondary/500 · accent/500 · elevation/xl"
      >
        <MapMarkersDemo />
      </DemoCard>
      <div className="sm:col-span-2">
        <DemoCard
          title="Cards: tour, POI, event, hub"
          tokens="surface · accent/100 · primary/500 · radius/2xl"
        >
          <CardsDemo />
        </DemoCard>
      </div>
    </div>
  );
}

function FoundationBlock({ accentColor }: { accentColor: string }) {
  return (
    <div>
      <SubHead
        first
        accentColor={accentColor}
        kicker="Color"
        title="Color with psychology and accessibility applied"
        body="The base red was retuned into a coral primary reserved for action. Teal carries exploration, amber marks featured and sponsored, and warm neutrals replace cold grays. Contrast was a constraint throughout, not an afterthought."
      />
      <PilgrimzPalette />

      <SubHead
        accentColor={accentColor}
        kicker="Typography"
        title="A voice that reads as a knowledgeable guide"
        body="Plus Jakarta Sans for headings and display, DM Sans for body and UI. The full scale, weights, line heights, and letter spacing are defined as tokens."
      />
      <TypeSystem />

      <SubHead
        accentColor={accentColor}
        kicker="Core components"
        title="Components connected back to tokens"
        body="The pieces travelers touch every day: play an audio guide, tap a map marker, browse tours, events, and hubs. Every component draws its color, type, and radius from the tokens, so the product holds together as it grows. They are live, try them."
      />
      <CoreComponents />

      <SubHead
        accentColor={accentColor}
        kicker="Readable by AI"
        title="Docs Claude can act on"
        body="Tokens map cleanly to code, and every one ships with a description, references, and good vs bad usage. Claude knows when to use a token, not just what it is."
      />
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <TokenDocCard />
        <GoodVsBad />
      </div>

      <SubHead
        accentColor={accentColor}
        kicker="The system in use"
        title="Decisions made on real screens, not swatches"
        body="I showed color and type living on primary screens with usage guidance, so the founders could judge the system where it matters, on the product."
      />
      <div className="mt-8">
        <WarmPanel>
          <div className="mx-auto grid w-full max-w-[560px] grid-cols-2 gap-6 lg:gap-10">
            {[
              { src: "/images/pilgrimz/system-before.png", label: "Before tokens" },
              { src: "/images/pilgrimz/system-after.png", label: "On system" },
            ].map((s) => (
              <figure key={s.label} className="flex flex-col items-center gap-3">
                <div
                  className="w-full overflow-hidden rounded-[24px] border border-[#E3DCD0] shadow-[0_12px_32px_rgba(28,27,25,0.10)]"
                  style={{ aspectRatio: "393 / 852" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.src} alt={s.label} className="h-full w-full object-cover" />
                </div>
                <figcaption className="text-[11px] font-semibold uppercase tracking-[0.06em] text-neutral-500">
                  {s.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </WarmPanel>
      </div>

      <div className="mt-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/pilgrimz/storybook.png"
          alt="The Pilgrimz Storybook, the system's shared home for tokens and usage"
          className="w-full rounded-2xl border border-[#E3DCD0] shadow-[0_12px_32px_rgba(28,27,25,0.08)]"
        />
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
      img: "/images/pilgrimz/os-ai-readable.png",
    },
    {
      title: "Infrastructure inside Claude and VS Code",
      body: "Skills, agents, and files wired into the tools the team already builds in.",
      img: "/images/pilgrimz/os-infrastructure.png",
    },
    {
      title: "Trained on their craft, not generic data",
      body: "The OS carries Pilgrimz's own craft rules, so output looks like Pilgrimz, not like generic UI.",
      img: "/images/pilgrimz/os-craft.png",
    },
    {
      title: "Evaluation loops",
      body: "Quality checks built in, so the team can trust what ships without manual policing.",
      img: "/images/pilgrimz/os-evals.png",
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
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
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
              <div
                className="overflow-hidden rounded-xl"
                style={{ aspectRatio: "4 / 3", backgroundColor: "#10484D" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt={c.title} className="h-full w-full object-cover" />
              </div>
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
      />
      <FoundationBlock accentColor={accentColor} />
      <ClaudeInfraBlock accentColor={accentColor} />
    </section>
  );
}

/* ════════════════════════════════════════
   Phase 2 — The design work
   ════════════════════════════════════════ */

/** Map & discovery — copy + interactive furniture left, one big screen at a time right */
const MAP_SCREENS = [
  { src: "/images/pilgrimz/flow-city-switcher.png", label: "City picker" },
  { src: "/images/pilgrimz/flow-map.png", label: "The map" },
  { src: "/images/pilgrimz/flow-city-page.png", label: "City page" },
];

function MapShowcase({ accentColor }: { accentColor: string }) {
  const [idx, setIdx] = useState(0);
  const go = (d: number) => setIdx((i) => (i + d + MAP_SCREENS.length) % MAP_SCREENS.length);
  return (
    <div className="mt-10">
      <WarmPanel>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
          <div className="min-w-0 flex-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.05em]" style={{ color: accentColor }}>
              Navigation, discovery & the map
            </span>
            <h3 className="mt-2 font-brand text-[20px] font-bold leading-tight text-brand-ink">
              The map as a primary surface, not a backdrop
            </h3>
            <p className="mt-2 max-w-[440px] text-[13px] leading-relaxed text-neutral-600">
              Users struggled to move between cities without zooming the map, reaching for a search
              they could not find. The redesign made moving between destinations obvious,
              differentiated point of interest types, and surfaced sponsored places clearly, which
              ties straight to how Pilgrimz makes money.
            </p>
            <div className="mt-5">
              <SegmentedControl />
            </div>
            <PoiChips />
            <TourListItem />
          </div>

          {/* One screen at a time */}
          <div className="flex w-full flex-col items-center gap-4 lg:w-[380px]">
            <div className="flex w-full items-center justify-center gap-3 sm:gap-5">
              <ArrowBtn dir="l" onClick={() => go(-1)} />
              <div className="w-full max-w-[260px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  >
                    <div
                      className="w-full overflow-hidden rounded-[24px] border border-[#E3DCD0] shadow-[0_12px_32px_rgba(28,27,25,0.10)]"
                      style={{ aspectRatio: "393 / 845" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={MAP_SCREENS[idx].src}
                        alt={MAP_SCREENS[idx].label}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <ArrowBtn dir="r" onClick={() => go(1)} />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-neutral-500">
                {MAP_SCREENS[idx].label}
              </span>
              <div className="flex items-center gap-1.5">
                {MAP_SCREENS.map((s, i) => (
                  <button
                    key={s.label}
                    onClick={() => setIdx(i)}
                    aria-label={`Show ${s.label}`}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: idx === i ? 18 : 6,
                      backgroundColor: idx === i ? CORAL : "#D8D5CF",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </WarmPanel>
    </div>
  );
}

/** The Hub — sticky phone left swaps with the active step, scrolling story right */
const HUB_STEPS = [
  {
    img: "/images/pilgrimz/hub-tours.png",
    title: "A branded home, not a listing",
    body: "The institution leads: hero, logo, and its own story. The Malaga Cultural Center opens with the Buenavista Palace and the 285 works donated by Picasso's family, with More info and its social channels right there. Below, the Tours tab puts routes worth the detour up front and the full catalog, all 32 tours, one scroll away.",
  },
  {
    img: "/images/pilgrimz/hub-agenda.png",
    title: "An agenda that earns bookings",
    body: "Events carry their own logic: single dates, ranges like 19 to 22 June, and recurring runs like all Saturdays, each with times and details one tap away. This is the surface institutions pay to fill, so it reads like a program, not a feed.",
  },
  {
    img: "/images/pilgrimz/hub-directory.png",
    title: "A directory that sells each partner",
    body: "The Hubs tab pitches every institution with its numbers, five tours, three points of interest, five events, and one clear action: explore the hub.",
  },
  {
    img: "/images/pilgrimz/hub-empty.png",
    title: "No dead ends",
    body: "Areas without hubs get a coming soon state that points travelers to the tours nearby instead of an empty screen. Even the gap sells the product.",
  },
];

function HubPhoneFrame({ src, alt, maxW = 260 }: { src: string; alt: string; maxW?: number }) {
  return (
    <div
      className="mx-auto w-full overflow-hidden rounded-[24px] border border-[#E3DCD0] shadow-[0_12px_32px_rgba(28,27,25,0.10)]"
      style={{ aspectRatio: "393 / 845", maxWidth: maxW }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover object-top" />
    </div>
  );
}

function HubStickyShowcase({ accentColor }: { accentColor: string }) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* The sticky phone follows whichever step is crossing the middle of the viewport */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && setActive(i)),
        { rootMargin: "-45% 0px -45% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

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
          Hubs are curated spaces from museums, tourism boards, and cultural organizations, the
          business to business product Pilgrimz sells. I redesigned them as branded homes each
          institution can be proud of, from the first impression to the empty state.
        </p>
      </SectionReveal>

      {/* Mobile: each step with its own screen */}
      <div className="mt-8 flex flex-col gap-10 lg:hidden">
        {HUB_STEPS.map((s, i) => (
          <SectionReveal key={s.title} delay={0.05}>
            <HubPhoneFrame src={s.img} alt={s.title} maxW={240} />
            <div className="mt-4 rounded-2xl border border-sand-300 bg-white p-5">
              <div className="flex items-center gap-2.5">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-brand text-[11px] font-bold text-white"
                  style={{ backgroundColor: CORAL }}
                >
                  {i + 1}
                </span>
                <div className="font-body text-[14px] font-bold text-brand-ink">{s.title}</div>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-neutral-600">{s.body}</p>
            </div>
          </SectionReveal>
        ))}
      </div>

      {/* Desktop: sticky phone crossfades per step */}
      <div className="mt-8 hidden gap-10 lg:grid lg:grid-cols-2">
        <div className="relative">
          <div className="sticky top-24">
            <WarmPanel>
              <div className="relative mx-auto w-full max-w-[260px]">
                <div
                  className="overflow-hidden rounded-[24px] border border-[#E3DCD0] shadow-[0_12px_32px_rgba(28,27,25,0.10)]"
                  style={{ aspectRatio: "393 / 845" }}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={active}
                      src={HUB_STEPS[active].img}
                      alt={HUB_STEPS[active].title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="h-full w-full object-cover object-top"
                    />
                  </AnimatePresence>
                </div>
              </div>
            </WarmPanel>
          </div>
        </div>
        <div className="flex flex-col">
          {HUB_STEPS.map((s, i) => (
            <div
              key={s.title}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className="flex min-h-[45vh] items-center"
            >
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
const BREADTH_SCREENS = [
  { img: "/images/pilgrimz/breadth-map.png", label: "Tour discovery" },
  { img: "/images/pilgrimz/breadth-tour.png", label: "Tour page" },
  { img: "/images/pilgrimz/breadth-poi.png", label: "POI page" },
  { img: "/images/pilgrimz/breadth-audio-expanded.png", label: "Audio guide picker" },
  { img: "/images/pilgrimz/breadth-gallery.png", label: "Player, gallery mode" },
  { img: "/images/pilgrimz/breadth-transcript.png", label: "Player, read mode" },
];

function FloatingBreadth({ accentColor }: { accentColor: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  return (
    <div ref={ref} className="mt-16">
      <SectionReveal>
        <span className="text-[11px] font-bold uppercase tracking-[0.05em]" style={{ color: accentColor }}>
          One system, every screen
        </span>
        <h3 className="mt-1.5 font-brand text-[20px] font-bold text-brand-ink">
          Consistent from the map to the audio guide
        </h3>
        <p className="mt-2 max-w-[560px] text-[14px] leading-relaxed text-neutral-600">
          The same journey, screen after screen: browse tours in an area, open one, walk its stops,
          and let each point of interest talk to you. Every screen is built from the system, so it
          all reads as one product.
        </p>
      </SectionReveal>
      <div className="mt-6">
        <WarmPanel>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:gap-8">
            {BREADTH_SCREENS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: "easeOut" }}
              >
                <motion.div
                  animate={
                    reduceMotion ? undefined : { y: i % 2 === 0 ? [-5, 5, -5] : [5, -5, 5] }
                  }
                  transition={{ duration: 5 + (i % 3), repeat: Infinity, ease: "easeInOut" }}
                >
                  <div
                    className="overflow-hidden rounded-[20px] border bg-white"
                    style={{
                      borderColor: "#E3DCD0",
                      boxShadow: "0 0 1px rgba(28,27,25,0.06), 0 10px 30px rgba(28,27,25,0.10)",
                      aspectRatio: "393 / 820",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.img}
                      alt={`Pilgrimz ${s.label} screen`}
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
                <p className="mt-3 text-center text-[12px] font-semibold uppercase tracking-[0.05em] text-neutral-500">
                  {s.label}
                </p>
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
        intro="The redesign was downstream of the OS. I designed these flows myself, with Claude working alongside as another member of the team, so core screens were reworked quickly and stayed consistent. Every choice served trust, retention, and the business."
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

/** Post-walk rating vignette — rating in, social proof out */
const RATING_AVATARS = [
  "/images/pilgrimz/avatar-1.png",
  "/images/pilgrimz/avatar-2.png",
  "/images/pilgrimz/avatar-3.png",
];
const YOU_AVATAR = "/images/pilgrimz/avatar-4.png";
const MARTA_AVATAR = "/images/pilgrimz/avatar-5.png";

function DemoStar({ filled, onPick, label }: { filled: boolean; onPick: () => void; label: string }) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onPick}
      className="cursor-pointer"
      animate={{ scale: filled ? [1, 1.3, 1] : 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill={filled ? AMBER : "none"}
        stroke={filled ? AMBER : "#D8D4CC"}
        strokeWidth="1.6"
        strokeLinejoin="round"
      >
        <polygon points="12 2.5 15 8.8 22 9.6 17 14.4 18.2 21.3 12 18 5.8 21.3 7 14.4 2 9.6 9 8.8" />
      </svg>
    </motion.button>
  );
}

function RatingDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-40px" });
  const reduce = useReducedMotion() ?? false;
  const [stars, setStars] = useState(0);
  const [joined, setJoined] = useState(false);
  const [locked, setLocked] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!inView || locked) return;
    if (reduce) {
      setStars(5);
      setJoined(true);
      return;
    }
    const t: ReturnType<typeof setTimeout>[] = [];
    setStars(0);
    setJoined(false);
    for (let s = 1; s <= 5; s++) t.push(setTimeout(() => setStars(s), 700 + s * 240));
    t.push(setTimeout(() => setJoined(true), 2700));
    t.push(setTimeout(() => setRun((r) => r + 1), 8200));
    return () => t.forEach(clearTimeout);
  }, [inView, reduce, locked, run]);

  const pick = (n: number) => {
    setLocked(true);
    setJoined(false);
    setStars(n);
    window.setTimeout(() => setJoined(true), 450);
  };

  return (
    <div
      ref={ref}
      className="rounded-2xl border bg-white p-5"
      style={{
        borderColor: "#E8E6E1",
        boxShadow: "0 0 1px rgba(28,27,25,0.06), 0 14px 40px rgba(28,27,25,0.12)",
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="flex h-5 items-center rounded-full px-2 text-[10px] font-bold uppercase tracking-[0.05em]"
          style={{ backgroundColor: "#D9F0EC", color: DEEP }}
        >
          Walk complete
        </span>
      </div>
      <div className="mt-3 font-brand text-[15px] font-bold text-brand-ink">
        Roman and Moorish Málaga
      </div>
      <div className="mt-0.5 text-[12px] text-neutral-500">Tour · 4 stops · 45 min</div>
      <div className="mt-3 flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <DemoStar key={n} filled={stars >= n} onPick={() => pick(n)} label={`Rate ${n} stars`} />
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3 border-t pt-4" style={{ borderColor: "#EEEBE8" }}>
        <div className="flex items-center">
          {RATING_AVATARS.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt="Pilgrim avatar"
              className={`h-7 w-7 rounded-full border-2 border-white object-cover ${i > 0 ? "-ml-2" : ""}`}
            />
          ))}
          <AnimatePresence>
            {joined && (
              <motion.img
                src={YOU_AVATAR}
                alt="Your avatar joining the stack"
                initial={{ scale: 0, x: -8, opacity: 0 }}
                animate={{ scale: 1, x: 0, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
                className="-ml-2 h-7 w-7 rounded-full border-2 object-cover"
                style={{ borderColor: CORAL }}
              />
            )}
          </AnimatePresence>
        </div>
        <div className="text-[12px] leading-tight text-neutral-600">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={joined ? "after" : "before"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <span className="font-semibold text-brand-ink">
                {joined ? "48" : "47"} pilgrims walked this
              </span>
              {joined && <div className="text-neutral-500">including you</div>}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/** Friend invite vignette — the tour card as a live plan, not a dead link */
function TypingDots() {
  const reduce = useReducedMotion() ?? false;
  return (
    <div
      className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-md px-3 py-2.5"
      style={{ backgroundColor: "#F5F1E9" }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-neutral-400"
          animate={reduce ? undefined : { y: [0, -3, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function InviteDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-40px" });
  const reduce = useReducedMotion() ?? false;
  const [step, setStep] = useState(0);
  const [locked, setLocked] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!inView || locked) return;
    if (reduce) {
      setStep(5);
      return;
    }
    const t: ReturnType<typeof setTimeout>[] = [];
    setStep(0);
    const beats: Array<[number, number]> = [
      [1, 500],
      [2, 1300],
      [3, 2300],
      [4, 3500],
      [5, 4400],
    ];
    beats.forEach(([s, ms]) => t.push(setTimeout(() => setStep(s), ms)));
    t.push(setTimeout(() => setRun((r) => r + 1), 9800));
    return () => t.forEach(clearTimeout);
  }, [inView, reduce, locked, run]);

  const appear = {
    initial: { opacity: 0, y: 10, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.3, ease: "easeOut" as const },
  };

  return (
    <div
      ref={ref}
      className="rounded-2xl border bg-white p-5"
      style={{
        borderColor: "#E8E6E1",
        boxShadow: "0 0 1px rgba(28,27,25,0.06), 0 14px 40px rgba(28,27,25,0.12)",
      }}
    >
      <div className="flex items-center gap-2.5 border-b pb-3" style={{ borderColor: "#EEEBE8" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={MARTA_AVATAR}
          alt="Marta's avatar"
          className="h-8 w-8 rounded-full object-cover"
        />
        <div>
          <div className="text-[13px] font-bold text-brand-ink">Marta</div>
          <div className="text-[11px] text-neutral-400">Planning together</div>
        </div>
      </div>
      <div className="mt-4 flex min-h-[220px] flex-col gap-2.5">
        {step >= 1 && (
          <motion.div
            {...appear}
            className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md px-3.5 py-2.5 text-[13px] text-white"
            style={{ backgroundColor: DEEP }}
          >
            saturday morning walk?
          </motion.div>
        )}
        {step >= 2 && (
          <motion.div
            {...appear}
            className="ml-auto w-[85%] overflow-hidden rounded-2xl rounded-br-md border"
            style={{ borderColor: "#E8E6E1" }}
          >
            <div className="flex items-center gap-3 p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/pilgrimz/barcelona.jpg"
                alt="Gothic quarter tour thumbnail"
                className="h-11 w-11 rounded-xl object-cover"
              />
              <div className="min-w-0">
                <div className="truncate text-[13px] font-bold text-brand-ink">
                  Gothic quarter at dusk
                </div>
                <div className="text-[11px] text-neutral-500">Tour · 4 stops · 1.5 hrs</div>
              </div>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              {step >= 5 ? (
                <motion.div
                  key="going"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-2 px-3 py-2.5"
                  style={{ backgroundColor: "#D9F0EC" }}
                >
                  <span className="flex items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={YOU_AVATAR}
                      alt="Your avatar"
                      className="h-6 w-6 rounded-full border-2 border-white object-cover"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={MARTA_AVATAR}
                      alt="Marta's avatar"
                      className="-ml-1.5 h-6 w-6 rounded-full border-2 border-white object-cover"
                    />
                  </span>
                  <span className="text-[12px] font-semibold" style={{ color: DEEP }}>
                    You&apos;re both going · Saturday
                  </span>
                </motion.div>
              ) : (
                <motion.button
                  key="join"
                  type="button"
                  onClick={() => {
                    setLocked(true);
                    setStep(5);
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block w-full cursor-pointer py-2.5 text-center text-[13px] font-bold text-white"
                  style={{ backgroundColor: CORAL }}
                >
                  Join
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div {...appear}>
            <TypingDots />
          </motion.div>
        )}
        {step >= 4 && (
          <motion.div
            {...appear}
            className="w-fit max-w-[85%] rounded-2xl rounded-bl-md px-3.5 py-2.5 text-[13px] text-brand-ink"
            style={{ backgroundColor: "#F5F1E9" }}
          >
            I&apos;m in 🙌
          </motion.div>
        )}
      </div>
    </div>
  );
}

/** Ambient floating icon chip */
function SocialChip({
  className = "",
  delay = 0,
  pulse,
  children,
}: {
  className?: string;
  delay?: number;
  pulse?: boolean;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.span
      className={`absolute z-10 flex h-14 w-14 items-center justify-center rounded-full ${className}`}
      style={{
        backgroundColor: "#DCEBE9",
        color: DEEP,
        boxShadow: "0 0 1px rgba(28,27,25,0.06), 0 8px 24px rgba(28,27,25,0.10)",
      }}
      animate={
        reduce
          ? undefined
          : { y: [-6, 6, -6], scale: pulse ? [1, 1.08, 1] : 1 }
      }
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.span>
  );
}

/* Phosphor duotone icons (256 viewBox, fill = currentColor, 20% tint layer) */
function PhChatDuo() {
  return (
    <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
      <path
        d="M224,128A96,96,0,0,1,79.93,211.11h0L42.54,223.58a8,8,0,0,1-10.12-10.12l12.47-37.39h0A96,96,0,1,1,224,128Z"
        opacity="0.2"
      />
      <path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,214,50.48,182.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Zm12-88a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,128Zm-88,0a12,12,0,1,1-12-12A12,12,0,0,1,96,128Z" />
    </svg>
  );
}

function PhHeartDuo() {
  return (
    <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
      <path
        d="M232,94c0,66-104,122-104,122S24,160,24,94A54,54,0,0,1,78,40c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32A54,54,0,0,1,232,94Z"
        opacity="0.2"
      />
      <path d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z" />
    </svg>
  );
}

function PhThumbsUpDuo() {
  return (
    <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
      <path d="M80,104v96H32a8,8,0,0,1-8-8V112a8,8,0,0,1,8-8Z" opacity="0.2" />
      <path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z" />
    </svg>
  );
}

function Phase3() {
  const concepts = [
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
        intro="This is the chapter underway now. The old feed showed strangers' activity with no reason to care, so social is being reframed around destinations. The useful unit is many travelers found this place great for solo travelers, not this user took a Tuesday walk. Two of the interactions in design right now: rating as the door into a tour's community, and invites that carry the plan instead of a dead link."
        badge="In progress"
      />

      {/* Desktop composition — photo center, live vignettes floating beside it */}
      <div className="relative mt-14 hidden min-h-[600px] lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/pilgrimz/social-photo.png"
          alt="Three travelers resting together on a mountain viewpoint"
          className="absolute left-1/2 top-1/2 w-[56%] -translate-x-1/2 -translate-y-1/2 rounded-3xl object-cover"
          style={{ aspectRatio: "3 / 2" }}
          loading="lazy"
        />
        <SocialChip className="left-[17%] top-[10%]" delay={0.4}>
          <PhChatDuo />
        </SocialChip>
        <SocialChip className="left-[36%] -top-2" delay={1.2} pulse>
          <PhHeartDuo />
        </SocialChip>
        <SocialChip className="bottom-[8%] right-[18%]" delay={2}>
          <PhThumbsUpDuo />
        </SocialChip>
        <div className="absolute left-0 top-[36%] z-10 w-[300px]">
          <SectionReveal>
            <RatingDemo />
          </SectionReveal>
        </div>
        <div className="absolute right-0 top-[6%] z-10 w-[320px]">
          <SectionReveal delay={0.15}>
            <InviteDemo />
          </SectionReveal>
        </div>
      </div>

      {/* Mobile — stacked, icons overlaid on the photo */}
      <div className="mt-8 flex flex-col gap-5 lg:hidden">
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/pilgrimz/social-photo.png"
            alt="Three travelers resting together on a mountain viewpoint"
            className="w-full rounded-2xl object-cover"
            style={{ aspectRatio: "3 / 2" }}
            loading="lazy"
          />
          <SocialChip className="-left-2 top-[14%]" delay={0.4}>
            <PhChatDuo />
          </SocialChip>
          <SocialChip className="-top-4 right-[12%]" delay={1.2} pulse>
            <PhHeartDuo />
          </SocialChip>
          <SocialChip className="-bottom-4 right-[6%]" delay={2}>
            <PhThumbsUpDuo />
          </SocialChip>
        </div>
        <RatingDemo />
        <InviteDemo />
      </div>

      {/* Where the social layer goes next */}
      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {concepts.map((c) => (
          <SectionReveal key={c.title}>
            <span className="block h-1.5 w-8 rounded-full" style={{ backgroundColor: TEAL }} />
            <div className="mt-3 font-body text-[14px] font-bold text-brand-ink">{c.title}</div>
            <p className="mt-1 text-[13px] leading-relaxed text-neutral-600">{c.body}</p>
          </SectionReveal>
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/pilgrimz/outcomes-bg.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 to-transparent" />

        <div className="relative flex flex-col gap-8 p-7 lg:flex-row lg:gap-12 lg:p-12">
          {/* Headline, pinned to the top of the panel */}
          <div className="lg:w-[38%]">
            <div>
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
      <PhotoBridge
        src="/images/pilgrimz/barcelona.jpg"
        alt="Barcelona rooftops in warm light"
        text="With the debt paid down and the OS in place, the work shifted from cleanup to real product strategy."
      />
      <Phase2 accentColor={accentColor} />
      <PhotoBridge
        src="/images/pilgrimz/istanbul.jpg"
        alt="Istanbul skyline with mosque domes and minarets"
        text="Consistent, trusted screens are the groundwork for the part the founders most want next."
      />
      <Phase3 />
      <OutcomesOnPhoto accentColor={accentColor} />
    </div>
  );
}
