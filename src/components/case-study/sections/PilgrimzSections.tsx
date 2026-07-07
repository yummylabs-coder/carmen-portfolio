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
          <p className="max-w-[460px] font-brand text-[18px] font-bold leading-relaxed text-white lg:text-[20px]">
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
/* A token as Claude reads it: value, description, references, use and avoid */
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

/* ── Sub-section header, so each block of phase 1 has room to breathe ── */
function SubHead({
  kicker,
  title,
  body,
  accentColor,
}: {
  kicker: string;
  title: string;
  body?: string;
  accentColor: string;
}) {
  return (
    <SectionReveal>
      <div className="mt-20">
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
      <div
        className="flex min-h-[180px] flex-1 items-center justify-center p-6"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 23px, #F5F1E9 23px, #F5F1E9 24px), repeating-linear-gradient(90deg, transparent, transparent 23px, #F5F1E9 23px, #F5F1E9 24px)",
        }}
      >
        {children}
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

function CardImg({ src, className = "h-[120px]" }: { src: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" className={`w-full object-cover ${className}`} />
  );
}

/* Tour (featured): hidden gem chip, meta row, description, avatars footer */
function TourCardV() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md">
      <div className="relative">
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

/* Rec (featured): stripped down, image + title + description */
function RecCardV() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md">
      <div className="relative">
        <CardImg src="/images/pilgrimz/atmospheric.jpg" />
        <ShareBtn />
      </div>
      <div className="p-4">
        <div className="font-brand text-[15px] font-bold leading-snug text-[#1C1B19]">
          Pont Alexandre III at dusk
        </div>
        <p className="mt-1.5 text-[12px] leading-relaxed text-[#52504A]">
          Cross the Seine on the city&rsquo;s most ornate bridge just as the lamps come on.
        </p>
      </div>
    </div>
  );
}

/* Event: date tag over the image, time pill + view details footer */
function EventCardV() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md">
      <div className="relative">
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
    <div className="overflow-hidden rounded-2xl bg-white p-3 shadow-md">
      <div className="relative">
        <CardImg src="/images/pilgrimz/istanbul.jpg" className="h-[110px] rounded-xl" />
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

const CARD_VARIANTS = ["Tour", "Rec", "Event", "Hub"] as const;

function CardsDemo() {
  const [idx, setIdx] = useState(0);
  const go = (d: number) => setIdx((i) => (i + d + CARD_VARIANTS.length) % CARD_VARIANTS.length);
  const cards = [<TourCardV key="t" />, <RecCardV key="r" />, <EventCardV key="e" />, <HubCardV key="h" />];
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex w-full items-center justify-center gap-4">
        <button
          onClick={() => go(-1)}
          aria-label="Previous card"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E8E6E1] bg-white text-[#33312D] shadow-sm transition-all hover:bg-[#FAF9F7] active:scale-95"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
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
        <button
          onClick={() => go(1)}
          aria-label="Next card"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E8E6E1] bg-white text-[#33312D] shadow-sm transition-all hover:bg-[#FAF9F7] active:scale-95"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
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

function MarkerIcon({ kind }: { kind: string }) {
  const common = {
    width: 14,
    height: 14,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (kind === "cultural")
    return (
      <svg {...common}>
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    );
  if (kind === "restaurant")
    return (
      <svg {...common}>
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
        <path d="M7 2v20" />
        <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
      </svg>
    );
  if (kind === "retail")
    return (
      <svg {...common}>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    );
  /* hotel */
  return (
    <svg {...common}>
      <path d="M2 4v16" />
      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
      <path d="M2 17h20" />
      <path d="M6 8v9" />
    </svg>
  );
}

function GroundShadow() {
  return (
    <span className="absolute -bottom-1 left-1/2 h-1.5 w-5 -translate-x-1/2 rounded-full bg-black/20 blur-[1px]" />
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
      whileTap={{ scale: 0.88 }}
      animate={{ scale: selected ? 1.15 : 1 }}
      aria-label={label}
      className="relative"
    >
      {selected && <GroundShadow />}
      <svg width="34" height="41" viewBox="0 0 36 44" className="drop-shadow-sm">
        <path
          d="M18 1C8.6 1 1 8.6 1 18c0 11.5 17 25 17 25s17-13.5 17-25C35 8.6 27.4 1 18 1z"
          fill={selected ? TEAL : "#FFFFFF"}
          stroke={selected ? "#0C6E74" : "#E3DED6"}
          strokeWidth="1.5"
        />
      </svg>
      <span
        className="absolute left-1/2 top-[9px] -translate-x-1/2"
        style={{ color: selected ? "#FFFFFF" : "#33312D" }}
      >
        <MarkerIcon kind={kind} />
      </span>
    </motion.button>
  );
}

/** Photo tour marker, optionally sponsored (amber star badge) */
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
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.88 }}
      animate={{ scale: selected ? 1.15 : 1 }}
      aria-label={label}
      className="relative"
    >
      {selected && <GroundShadow />}
      <span
        className="block h-11 w-11 overflow-hidden rounded-full shadow-md transition-all"
        style={{
          border: selected ? `2.5px solid ${TEAL}` : "2.5px solid #FFFFFF",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt="" className="h-full w-full object-cover" />
      </span>
      {sponsored && (
        <span
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full shadow-sm"
          style={{ backgroundColor: AMBER }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </span>
      )}
    </motion.button>
  );
}

function MapMarkersDemo() {
  const [selected, setSelected] = useState("tour");
  const [clusterOpen, setClusterOpen] = useState(false);
  const reduce = useReducedMotion() ?? false;

  const notes: Record<string, string> = {
    tour: "Tour · photo marker, teal ring when selected",
    sponsored: "Sponsored · the amber star marks paid visibility",
    cultural: "Cultural site · category pin",
    hotel: "Hotel · category pin",
    restaurant: "Restaurant · from the cluster",
    retail: "Shop · from the cluster",
  };

  return (
    <div className="flex w-full flex-col items-center gap-3">
      {/* Mini map stage */}
      <div
        className="relative h-[230px] w-full max-w-[440px] overflow-hidden rounded-xl border border-[#E3DED6]"
        style={{ backgroundColor: "#F4F1EA" }}
      >
        {/* Abstract streets */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 440 230" preserveAspectRatio="none">
          <rect x="290" y="10" width="140" height="80" rx="12" fill={`${TEAL}0D`} />
          <path d="M-10 190 C 90 165, 200 205, 450 175 L 450 240 L -10 240 Z" fill={`${TEAL}14`} />
          <g stroke="#E7E2D8" strokeWidth="7" strokeLinecap="round">
            <line x1="0" y1="70" x2="440" y2="95" />
            <line x1="0" y1="150" x2="440" y2="130" />
            <line x1="110" y1="0" x2="130" y2="230" />
            <line x1="300" y1="0" x2="320" y2="230" />
          </g>
        </svg>

        {/* User location — pulsing halo */}
        <div className="absolute left-[50%] top-[40%] -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-5 w-5">
            {!reduce && (
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: TEAL }}
                animate={{ scale: [1, 2.4], opacity: [0.35, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <span
              className="absolute inset-0 rounded-full border-[3px] border-white shadow-md"
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

        {/* Cluster — tap to split */}
        <div className="absolute left-[52%] top-[78%] -translate-x-1/2 -translate-y-1/2">
          <AnimatePresence mode="wait">
            {!clusterOpen ? (
              <motion.button
                key="cluster"
                onClick={() => setClusterOpen(true)}
                whileTap={{ scale: 0.88 }}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.18 }}
                aria-label="Expand cluster of 2 places"
                className="flex h-10 w-10 items-center justify-center rounded-full border-[2.5px] border-white bg-[#FAF9F7] text-[13px] font-bold text-[#33312D] shadow-md"
              >
                2
              </motion.button>
            ) : (
              <motion.div
                key="split"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-end gap-2"
              >
                {(["restaurant", "retail"] as const).map((k, i) => (
                  <motion.div
                    key={k}
                    initial={{ scale: 0.4, y: 6, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    transition={{ duration: 0.25, delay: i * 0.06, type: "spring", stiffness: 300, damping: 18 }}
                  >
                    <CategoryPin
                      kind={k}
                      selected={selected === k}
                      onClick={() => setSelected(k)}
                      label={`${k} pin`}
                    />
                  </motion.div>
                ))}
                <motion.button
                  onClick={() => setClusterOpen(false)}
                  aria-label="Collapse cluster"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#807D76] shadow-sm"
                >
                  ×
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
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
      <DemoCard title="Segmented control" tokens="primary/500 · border/subtle · radius/full">
        <SegmentedControl id="demo" />
      </DemoCard>
      <div className="sm:col-span-2">
        <DemoCard
          title="Map markers (POI)"
          tokens="secondary/500 · accent/500 · neutral/0 · photo markers vs category pins"
        >
          <MapMarkersDemo />
        </DemoCard>
      </div>
      <div className="sm:col-span-2">
        <DemoCard
          title="Cards — tour, rec, event, hub"
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
        body="Rebuilt here in code, on the system. Press play, save a tour, switch a tab. Everything below is drawn from the tokens above."
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
          <div className="mx-auto grid w-full max-w-[520px] grid-cols-2 gap-6">
            <Placeholder variant="phone" label="Screen — before tokens" />
            <Placeholder variant="phone" label="Screen — on system" />
          </div>
        </WarmPanel>
      </div>

      <div className="mt-8">
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
      <FoundationBlock accentColor={accentColor} />
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
            <div className="mt-5">
              <SegmentedControl />
            </div>
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
      <Phase3 accentColor={accentColor} />
      <OutcomesOnPhoto accentColor={accentColor} />
    </div>
  );
}
