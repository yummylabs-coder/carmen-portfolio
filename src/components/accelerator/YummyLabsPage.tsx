"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import type { YummyAssetsMap, SprintDay } from "@/lib/types";
import { PageEntrance } from "@/components/ui/PageEntrance";
import {
  stats,
  roles,
  partners,
  tools,
  testimonials,
} from "./acceleratorData";

const YUMMY_URL = "https://yummy-labs.com";
const RESERVE_URL = "https://www.yummy-labs.com/reserve-your-seat";

interface YummyLabsPageProps {
  assets: YummyAssetsMap;
  sprintDays?: SprintDay[];
}

/* ─── Helpers ─── */
function Img({ src, alt, className }: { src: string; alt: string; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} />;
}

function ExternalArrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
      <path
        d="M4 12L12 4M12 4H6M12 4V10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ═══════════════════════════════════
   The two doors - Yummy Design Studio / Yummy Labs
   Design specs from Figma: door cards #FAF7F5, border #F1E9E4, radius 20;
   glow = 722px blurred radial #FFF9F4->#FAF7F5; tap circle 264px #FAF7F5
   with #EADED7 stroke and a soft spread halo.
   ═══════════════════════════════════ */
type Side = "studio" | "labs";

const BRANDS: Record<
  Side,
  {
    name: string;
    desc: string;
    logo: string;
    site: string;
    siteLabel: string;
    siteIcon: "globe" | "calendar";
  }
> = {
  studio: {
    name: "Yummy Design Studio",
    desc: "A product design and AI enablement studio I co-founded, where we focus on speed without design debt",
    logo: "/images/logos/yummy-design.png",
    site: "https://cal.com/yummy-labs-ps5kau/secret",
    siteLabel: "Book a chat",
    siteIcon: "calendar",
  },
  labs: {
    name: "Yummy Labs",
    desc: "An AI design accelerator I co-founded, where designers upskill on real product work, not concept projects",
    logo: "/images/logos/yummy-labs.png",
    site: YUMMY_URL,
    siteLabel: "Visit website",
    siteIcon: "globe",
  },
};

function DoorGlow() {
  return (
    <div
      className="pointer-events-none absolute -left-[260px] top-[349px] h-[722px] w-[722px] rounded-full blur-[50px]"
      style={{ background: "radial-gradient(circle, #FFF9F4 0%, #FAF7F5 100%)" }}
    />
  );
}

function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function VisitPill({
  href,
  label,
  icon = "globe",
  stacked,
}: {
  href: string;
  label: string;
  icon?: "globe" | "calendar";
  stacked?: boolean;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={(e) => e.stopPropagation()}
      className={`z-20 flex h-[50px] w-fit items-center gap-1.5 rounded-full bg-[#FFFEFC] px-4 text-[13px] font-bold text-black shadow-[0_1px_4px_rgba(48,1,1,0.06)] transition-transform hover:scale-[1.03] ${
        stacked ? "relative lg:absolute lg:right-6 lg:top-6" : "absolute right-6 top-6"
      }`}
    >
      {label}
      {icon === "calendar" ? <CalendarIcon /> : <GlobeIcon />}
    </a>
  );
}

/** The clickable seal - soft halo begs for the tap, ring text slowly rotates */
function TapCircle({ side, onEnter }: { side: Side; onEnter: () => void }) {
  const b = BRANDS[side];
  return (
    <motion.button
      type="button"
      onClick={onEnter}
      aria-label={`Enter ${b.name}`}
      className="relative flex h-[212px] w-[216px] cursor-pointer items-center justify-center rounded-full border bg-[#FAF7F5]"
      style={{
        borderColor: "#EADED7",
        boxShadow: "0 -1px 44px 21px rgba(238,234,232,0.74)",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="pointer-events-none absolute inset-0 animate-[spin_18s_linear_infinite] motion-reduce:animate-none">
        <svg viewBox="0 0 216 212" className="h-full w-full">
          <defs>
            <path id={`tap-arc-${side}`} d="M 26 106 A 82 82 0 0 1 190 106" fill="none" />
          </defs>
          <text
            style={{ fontSize: 12, letterSpacing: "0.2em", fontWeight: 600 }}
            className="fill-neutral-400 uppercase"
          >
            <textPath href={`#tap-arc-${side}`} startOffset="50%" textAnchor="middle">
              Tap to enter
            </textPath>
          </text>
        </svg>
      </div>
      <Img src={b.logo} alt={`${b.name} logo`} className="h-[130px] w-[130px] object-contain" />
    </motion.button>
  );
}

/** Collapsed edge rail content - sticky so name and logo stay in view */
function RailInner({ side, onEnter }: { side: Side; onEnter: () => void }) {
  const b = BRANDS[side];
  return (
    <button
      type="button"
      onClick={onEnter}
      aria-label={`Switch to ${b.name}`}
      className="sticky top-6 flex h-[calc(100vh-96px)] w-full cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-[20px] border bg-[#FAF7F5] transition-colors hover:bg-[#F4EEE8]"
      style={{ borderColor: "#F1E9E4" }}
    >
      <DoorGlow />
      <span className="relative rotate-180 whitespace-nowrap font-brand text-[15px] font-bold text-brand-ink [writing-mode:vertical-rl]">
        {b.name}
      </span>
      <Img src={b.logo} alt="" className="relative h-[27px] w-[27px] object-contain" />
    </button>
  );
}

/* The dog doorman: patrols between the doors, delivers a line per door on hover */
const DOG_LINES: Record<Side, string> = {
  studio: "We'd love to collaborate, and make a difference",
  labs: "If you want to use AI for design, start here kay?",
};

const DOG_SRC = "/images/labs-studio/dog-avatar.svg";

function DogDoorman({ hovered }: { hovered: Side | null }) {
  const reduce = useReducedMotion() ?? false;
  const [patrol, setPatrol] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const [cycled, setCycled] = useState<Side | null>(null);
  const lastX = useRef(10);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* Mobile has no hover, so the dog delivers his lines on his own */
  useEffect(() => {
    if (isDesktop) {
      setCycled(null);
      return;
    }
    let flip = 0;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const speak = () => {
      setCycled(flip % 2 === 0 ? "studio" : "labs");
      flip += 1;
      timeouts.push(setTimeout(() => setCycled(null), 4200));
    };
    timeouts.push(setTimeout(speak, 1500));
    const loop = setInterval(speak, 8000);
    return () => {
      clearInterval(loop);
      timeouts.forEach(clearTimeout);
    };
  }, [isDesktop]);

  const bubble = isDesktop ? hovered : cycled;
  const targetX = !isDesktop
    ? 6
    : reduce
      ? 44
      : hovered === "studio"
        ? 17
        : hovered === "labs"
          ? 64
          : patrol
            ? 68
            : 10;
  const facingRight = targetX > lastX.current;
  useEffect(() => {
    lastX.current = targetX;
  }, [targetX]);

  return (
    <motion.div
      className="pointer-events-none absolute -bottom-[72px] z-20 w-[140px] lg:-bottom-[88px] lg:w-[190px]"
      initial={false}
      animate={{ left: `${targetX}%` }}
      transition={
        hovered || reduce || !isDesktop
          ? { duration: 0.9, ease: "easeOut" }
          : { duration: 10, ease: "linear" }
      }
      onAnimationComplete={() => {
        if (isDesktop && !hovered && !reduce) setPatrol((p) => 1 - p);
      }}
    >
      <AnimatePresence>
        {bubble && (
          <motion.div
            key={bubble}
            initial={{ opacity: 0, y: 10, x: "-50%", scale: 0.92 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: 6, x: "-50%", scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="absolute -top-[76px] left-1/2 w-max max-w-[250px] rounded-2xl rounded-bl-md border bg-[#FFFEFC] px-4 py-3 text-[13px] font-semibold leading-snug text-brand-ink"
            style={{
              borderColor: "#EADED7",
              boxShadow: "0 1px 1px rgba(48,1,1,0.04), 0 12px 32px rgba(48,1,1,0.10)",
            }}
          >
            {DOG_LINES[bubble]}
            <span
              className="absolute -bottom-[7px] left-6 h-3.5 w-3.5 rotate-45 border-b border-r bg-[#FFFEFC]"
              style={{ borderColor: "#EADED7" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Direction change = a real 3D turn around his vertical axis */}
      <div style={{ perspective: 700 }}>
        <motion.img
          src={DOG_SRC}
          alt="Yummy dog mascot on a skateboard"
          className="w-full"
          animate={{ rotateY: facingRight ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.34, 1.4, 0.64, 1] }}
          style={{ transformStyle: "preserve-3d", backfaceVisibility: "visible" }}
        />
      </div>
    </motion.div>
  );
}

/** Header inside an opened door */
function OpenHeader({ side }: { side: Side }) {
  const b = BRANDS[side];
  return (
    <div className="flex items-center gap-4">
      <Img src={b.logo} alt={`${b.name} logo`} className="h-[82px] w-[82px] rounded-2xl object-contain" />
      <div>
        <h2 className="font-brand text-22 font-bold text-brand-ink">{b.name}</h2>
        <p className="mt-1 text-14 text-neutral-600">{b.desc}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   The studio - opened door content (bento)
   ═══════════════════════════════════ */
const HOW_WE_WORK = [
  {
    title: "Understand",
    body: "We start where good design always starts: your goals, your users, your constraints. Then we load all of it into an AI workspace, so the tooling knows your product as well as we do.",
  },
  {
    title: "Week 1: strategy you can click",
    body: "Judgment calls come from experience. AI just lets us show you proof faster: working prototypes to react to while the strategy is still forming, not slideware.",
  },
  {
    title: "Week 2: high fidelity, system-backed",
    body: "We design the screens; the system keeps them consistent. Tokens AI can read mean iteration is cheap and drift is impossible.",
  },
  {
    title: "Handoff that compounds",
    body: "The system, the skills, and the workflow stay with your team. That's the enablement part: you keep our speed without keeping us on retainer.",
  },
];

const WHAT_WE_FIX = [
  "Users land on your product and get it in seconds",
  "You ship every sprint and the UX gets sharper, not messier",
  "Product judgment in the room from day one, not after a quarter of onboarding",
  "Studio craft at startup pace, without the agency overhead",
];

const OS_SERVICES = [
  "Workshops",
  "Iterative sprints",
  "Design system setup",
  "MCP integration",
  "AI audits",
];

const STAGE_CLIENTS = [
  {
    slug: "neotaste",
    name: "NeoTaste",
    logo: "/images/logos/neotaste-symbol.svg",
    shots: [
      "/images/neotaste/discovery-1.png",
      "/images/neotaste/discovery-2.png",
      "/images/neotaste/discovery-3.png",
    ],
  },
  {
    slug: "water-day",
    name: "Water.day",
    logo: "/images/logos/water-day-symbol.svg",
    shots: [
      "/images/water-day/habits-1.png",
      "/images/water-day/habits-2.png",
      "/images/water-day/habits-3.png",
    ],
  },
  {
    slug: "ausventure",
    name: "Ausventure",
    logo: "/images/logos/ausventure-symbol.svg",
    shots: [
      "/images/ausventure/booking-phone-1.png",
      "/images/ausventure/booking-phone-2.png",
      "/images/ausventure/booking-phone-3.png",
    ],
  },
  {
    slug: "pandore",
    name: "Pandore",
    logo: "/images/logos/pandore-symbol.svg",
    shots: ["/covers/pandore.png"],
  },
  {
    slug: "pilgrimz",
    name: "Pilgrimz",
    logo: "/images/pilgrimz/logo.png",
    shots: [
      "/images/pilgrimz/breadth-map.png",
      "/images/pilgrimz/breadth-tour.png",
      "/images/pilgrimz/breadth-gallery.png",
    ],
  },
];

const STUDIO_URL = "https://www.yummy-labs.com/studio";

/* Parked: the interactive sprint scrubber. Set true to show it again. */
const SHOW_SPRINT_SCRUBBER = false;

/* Scrubbable sprint: drag through the two weeks, see what exists when */
const SPRINT_STOPS = [
  {
    from: 1,
    to: 2,
    label: "Days 1 to 2",
    title: "Understand",
    body: "We start where good design always starts: your goals, your users, your constraints. Then we load all of it into an AI workspace, so the tooling knows your product as well as we do.",
    exists: "What exists already: an AI workspace that knows your product.",
  },
  {
    from: 3,
    to: 7,
    label: "Week 1",
    title: "Strategy you can click",
    body: "Judgment calls come from experience. AI just lets us show you proof faster: working prototypes to react to while the strategy is still forming, not slideware.",
    exists: "What exists already: a working prototype you can react to.",
  },
  {
    from: 8,
    to: 13,
    label: "Week 2",
    title: "High fidelity, system-backed",
    body: "We design the screens; the system keeps them consistent. Tokens AI can read mean iteration is cheap and drift is impossible.",
    exists: "What exists already: hi-fi screens built from tokens AI can read.",
  },
  {
    from: 14,
    to: 14,
    label: "Day 14",
    title: "Handoff that compounds",
    body: "The system, the skills, and the workflow stay with your team. That's the enablement part: you keep our speed without keeping us on retainer.",
    exists: "What exists already: your team, running the whole workflow without us.",
  },
];

function SprintScrubber() {
  const [day, setDay] = useState(1);
  const stopIdx = SPRINT_STOPS.findIndex((s) => day >= s.from && day <= s.to);
  const stop = SPRINT_STOPS[stopIdx];
  const pct = ((day - 1) / 13) * 100;

  return (
    <div className="rounded-2xl border border-[#F1E9E4] bg-white p-6 lg:p-7">
      <span className="mb-1 inline-flex items-center rounded-md bg-[#FAF7F5] px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-sand-600">
        How we work
      </span>
      <p className="mb-5 text-[13px] leading-relaxed text-neutral-600">
        Drag through a sprint. Day by day, there is always something real to react to.
      </p>

      {/* Stage */}
      <div className="min-h-[172px] rounded-xl bg-[#FAF7F5] p-5 sm:min-h-[150px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={stopIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <span className="inline-flex items-center rounded-full bg-brand-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.05em] text-sand-100">
              {stop.label}
            </span>
            <div className="mt-2.5 font-brand text-[17px] font-bold text-brand-ink">
              {stop.title}
            </div>
            <p className="mt-1.5 max-w-[640px] text-[13px] leading-relaxed text-neutral-600">
              {stop.body}
            </p>
            <p className="mt-2 text-[13px] font-semibold text-brand-ink">{stop.exists}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Scrubber */}
      <div className="mt-5">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="font-brand text-[14px] font-bold text-brand-ink">Day {day}</span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.05em] text-neutral-400">
            of 14
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={14}
          step={1}
          value={day}
          onChange={(e) => setDay(Number(e.target.value))}
          aria-label="Sprint day"
          className="h-[6px] w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-brand-ink [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-brand-ink [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(48,1,1,0.3)]"
          style={{
            background: `linear-gradient(to right, #300101 ${pct}%, #F1E9E4 ${pct}%)`,
          }}
        />
        <div className="mt-2 flex justify-between text-[11px] font-semibold text-neutral-400">
          <span>Day 1</span>
          <span>Week 1</span>
          <span>Week 2</span>
          <span>Handoff</span>
        </div>
      </div>
    </div>
  );
}

function TastingButton({ onBlue }: { onBlue?: boolean }) {
  return (
    <a
      href={STUDIO_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-body text-[14px] font-semibold text-sand-100 transition-colors ${
        onBlue ? "bg-[#1a0ed4] hover:bg-[#150bba]" : "bg-brand-ink hover:opacity-90"
      }`}
    >
      Book a free tasting
      <ExternalArrow />
    </a>
  );
}

/** Interactive client stage - pick a logo, the real work fans out */
function ClientStage() {
  const [active, setActive] = useState(0);
  const c = STAGE_CLIENTS[active];
  return (
    <div className="rounded-2xl border border-[#F1E9E4] bg-white p-6 lg:p-7">
      <span className="mb-3 inline-flex items-center rounded-md bg-[#FAF7F5] px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-sand-600">
        The proof lives on this site
      </span>
      <h3 className="mb-1 font-brand text-[20px] font-bold leading-tight text-gray-800">
        Every client has a full case study here
      </h3>
      <p className="mb-5 text-[13px] leading-relaxed text-neutral-600">
        Pick a team, peek at the work, click through to the whole story.
      </p>
      <div className="mb-5 flex flex-wrap gap-2">
        {STAGE_CLIENTS.map((client, i) => (
          <button
            key={client.slug}
            type="button"
            onClick={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
            className={`flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 font-body text-[13px] font-semibold transition-colors ${
              i === active
                ? "border-brand-ink bg-brand-ink text-sand-100"
                : "border-[#F1E9E4] bg-[#FAF7F5] text-gray-800 hover:bg-[#F4EEE8]"
            }`}
          >
            <span className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-white">
              <Img src={client.logo} alt="" className="h-3.5 w-3.5 object-contain" />
            </span>
            {client.name}
          </button>
        ))}
      </div>
      <div className="relative block h-[280px] overflow-hidden rounded-xl border border-[#F1E9E4] bg-[#FAF7F5] sm:h-[320px]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={c.slug}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {c.shots.map((src, i) => {
              const mid = (c.shots.length - 1) / 2;
              return (
                <motion.img
                  key={src}
                  src={src}
                  alt={`${c.name} design work`}
                  initial={{ opacity: 0, y: 60, rotate: 0, x: (i - mid) * 40, scale: 0.85 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    x: (i - mid) * 120,
                    rotate: (i - mid) * 7,
                    scale: 1,
                  }}
                  transition={{ type: "spring", stiffness: 240, damping: 22, delay: i * 0.07 }}
                  className="absolute h-[72%] w-auto max-w-[46%] rounded-xl border border-[#EADED7] bg-white object-cover shadow-[0_1px_1px_rgba(48,1,1,0.04),0_16px_40px_rgba(48,1,1,0.12)]"
                  style={{ zIndex: i === Math.round(mid) ? 2 : 1 }}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function StudioContent() {
  return (
    <div className="flex flex-col gap-6">
      {/* Statement - brand blue, like the Labs hero */}
      <div className="relative overflow-hidden rounded-2xl bg-[#2216ff] p-6 lg:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.25),transparent_60%)]" />
        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="flex-1">
            <h3 className="max-w-[560px] font-brand text-[24px] font-extrabold leading-tight text-white">
              Ship products users actually crave. Fast.
            </h3>
            <p className="mt-3 max-w-[620px] text-[14px] leading-relaxed text-white/85">
              We bring the craft: a decade of strategy, UX, and shipped
              products. AI brings the speed. You get work that&apos;s proven
              quicker, tested quicker, and a team enabled to keep moving
              without us.
            </p>
            <div className="mt-5">
              <TastingButton onBlue />
            </div>
          </div>
          <motion.img
            src="/images/labs-studio/hero-studio-blackbox.svg"
            alt=""
            aria-hidden="true"
            className="mx-auto w-[150px] shrink-0 motion-reduce:!transform-none sm:mx-0 sm:w-[180px]"
            animate={{ rotate: 360 }}
            transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>

      {/* How we work */}
      <div className="rounded-2xl border border-[#F1E9E4] bg-white p-6 lg:p-7">
        <span className="mb-4 inline-flex items-center rounded-md bg-[#FAF7F5] px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-sand-600">
          How we work
        </span>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_WE_WORK.map((step, i) => (
            <div key={step.title} className="rounded-xl bg-[#FAF7F5] p-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-ink font-brand text-[12px] font-bold text-sand-100">
                {i + 1}
              </span>
              <div className="mt-3 font-body text-[14px] font-bold leading-snug text-brand-ink">
                {step.title}
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-600">{step.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[13px] leading-relaxed text-neutral-500">
          No two sprints look the same. The rhythm stays, but the focus shifts
          with what your client and your product actually need.
        </p>
      </div>

      {/* Sprint scrubber parked for now - flip to true to iterate on it */}
      {SHOW_SPRINT_SCRUBBER && <SprintScrubber />}

      {/* What we fix */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {WHAT_WE_FIX.map((line) => (
          <div
            key={line}
            className="rounded-2xl border border-[#F1E9E4] bg-white p-5 lg:p-6"
          >
            <p className="font-brand text-[16px] font-bold leading-snug text-brand-ink">
              {line}
            </p>
          </div>
        ))}
      </div>

      {/* Claude Design OS - the machinery, the one dark card */}
      <div className="relative overflow-hidden rounded-2xl bg-brand-ink p-6 lg:p-8">
        <motion.img
          src="/images/labs-studio/designos-claudeavatar.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-1 right-8 hidden w-[96px] motion-reduce:!transform-none sm:block"
          animate={{ x: [-10, 10, -10] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <span
          className="mb-3 inline-flex items-center rounded-md px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-sand-100"
          style={{ backgroundColor: "#210000" }}
        >
          Claude Design OS
        </span>
        <h3 className="max-w-[520px] font-brand text-[20px] font-bold leading-tight text-sand-100">
          The machinery behind the speed
        </h3>
        <p className="mt-2 max-w-[560px] text-[15px] font-semibold leading-snug text-[#FFFEFC]">
          Your team has ideas. They just can&apos;t build them like your
          product yet. The OS fixes that.
        </p>
        <p className="mt-2 max-w-[620px] text-[14px] leading-relaxed" style={{ color: "rgba(255,254,252,0.72)" }}>
          Design systems structured so AI can read them, plus the skills,
          agents, and evals that make speed safe instead of a source of design
          debt. Teams run it themselves after one workshop.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {OS_SERVICES.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/15 bg-white/[0.08] px-[14px] py-[9px] font-body text-[13px] font-semibold text-sand-100"
            >
              {s}
            </span>
          ))}
        </div>
        <a
          href="https://www.yummy-labs.com/workshops"
          target="_blank"
          rel="noopener noreferrer"
          className="relative mt-6 inline-flex items-center gap-2 rounded-lg bg-sand-100 px-5 py-2.5 font-body text-[14px] font-semibold text-brand-ink transition-opacity hover:opacity-90"
        >
          Explore the workshops
          <ExternalArrow />
        </a>
      </div>

      <ClientStage />

      {/* Closer */}
      <div className="py-6 text-center">
        <p className="mx-auto max-w-[480px] font-brand text-[20px] font-bold leading-snug text-brand-ink">
          Great UX isn&apos;t just a detail. It&apos;s a business strategy.
        </p>
        <div className="mt-5 flex justify-center">
          <TastingButton />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Glassmorphism Video Frame
   ═══════════════════════════════════ */
/* ── Fullscreen Video Lightbox ── */
function VideoLightbox({
  videoUrl,
  open,
  onClose,
}: {
  videoUrl: string;
  open: boolean;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  /* Auto-play when opening */
  useEffect(() => {
    if (open) videoRef.current?.play();
  }, [open]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Video container */}
          <motion.div
            className="relative z-10 w-[94vw] max-w-6xl"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -right-2 -top-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Video */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full"
                controls
                playsInline
                loop
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function GlassmorphismVideoFrame({ videoUrl }: { videoUrl?: string }) {
  const [hasVideo, setHasVideo] = useState(!!videoUrl);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const openLightbox = useCallback(() => {
    if (!hasVideo) return;
    // Pause the inline video when opening lightbox
    videoRef.current?.pause();
    setLightboxOpen(true);
  }, [hasVideo]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
    } else {
      v.pause();
    }
  };

  return (
    <div className="relative">
      {/* Ambient glow behind the frame */}
      <div className="absolute -inset-3 rounded-3xl bg-white/[0.06] blur-2xl" />

      {/* Glassmorphism border frame */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.15] bg-white/[0.07] p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl">
        {/* Inner video area */}
        <div className="relative aspect-video overflow-hidden rounded-[16px] bg-black/30">
          {hasVideo ? (
            <>
              <video
                ref={videoRef}
                src={videoUrl}
                className="h-full w-full object-cover"
                onError={() => setHasVideo(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                playsInline
                loop
                muted
              />
              {/* Play/pause overlay */}
              <button
                onClick={togglePlay}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  isPlaying
                    ? "bg-transparent opacity-0 hover:opacity-100 hover:bg-black/10"
                    : "bg-black/10"
                }`}
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/15 shadow-[0_4px_24px_rgba(0,0,0,0.15)] backdrop-blur-md transition-transform hover:scale-110">
                  {isPlaying ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <rect x="6" y="5" width="4" height="14" rx="1" />
                      <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <polygon points="8,5 20,12 8,19" />
                    </svg>
                  )}
                </div>
              </button>

              {/* Expand button - bottom-right corner */}
              <button
                onClick={openLightbox}
                className="absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-black/40 text-white/70 backdrop-blur-md transition-all hover:bg-black/60 hover:text-white"
                aria-label="Expand video"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              </button>
            </>
          ) : (
            /* Placeholder - no video uploaded yet */
            <div className="relative flex h-full items-center justify-center overflow-hidden">
              {/* Animated gradient mesh */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a11cc]/80 via-[#2216ff]/40 to-[#7c3aed]/60" />
              <div className="absolute -left-8 -top-8 h-32 w-32 animate-pulse rounded-full bg-[#7c3aed]/30 blur-3xl" />
              <div className="absolute -bottom-8 -right-8 h-32 w-32 animate-pulse rounded-full bg-white/10 blur-3xl [animation-delay:1s]" />

              <div className="relative text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="8,5 20,12 8,19" />
                  </svg>
                </div>
                <p className="text-[12px] font-medium text-white/40">Demo coming soon</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen lightbox */}
      {hasVideo && videoUrl && (
        <VideoLightbox
          videoUrl={videoUrl}
          open={lightboxOpen}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════
   Section 2 - Problem Hero (full-width blue)
   ═══════════════════════════════════ */
function ProblemHero() {
  return (
    <div className="relative z-10 overflow-hidden rounded-3xl bg-[#2216ff] p-6 lg:p-8">
      {/* Subtle radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.25),transparent_60%)]" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
        {/* Left - Copy */}
        <div className="flex-1 text-white">
          <span className="mb-[13px] inline-flex items-center rounded-md bg-[#1a0ed4] px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-white">
            The problem I saw
          </span>
          <h3 className="mb-3 font-brand text-[20px] font-extrabold leading-tight">
            Bootcamps weren&apos;t cutting it anymore.
          </h3>
          <div className="space-y-4 text-[14px] leading-relaxed text-white/85">
            <p>
              Designers were paying thousands for courses teaching outdated methods
              on fake projects. They&apos;d graduate with polished case studies
              that hiring managers could spot as &quot;concept work&quot; from a
              mile away. None of them taught the AI workflows teams now hire
              for.
            </p>
            <p>
              I wanted to build something different: real products, real
              constraints, real shipped work. Sprinters use Claude to
              pressure-test concepts, synthesize research, and build working
              prototypes in hours, doing the work of a full design team on
              their own.
            </p>
          </div>
        </div>

        {/* Right - Glassmorphism Video */}
        <div className="flex-1">
          <GlassmorphismVideoFrame videoUrl="/videos/carmenvideo.mp4" />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 3 - Role + Stats (side by side)
   ═══════════════════════════════════ */
/* Stat icons - clean SVG icons replacing emojis */
const statIcons: Record<string, React.ReactNode> = {
  "Sprints Run": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  "Designers Trained": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  "Startup Partners": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l4 6-10 13L2 9z" />
      <path d="M11 3l1 6h-8" />
      <path d="M13 3l-1 6h8" />
      <path d="M8 9l4 13 4-13" />
    </svg>
  ),
  "Weeks per Sprint": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
    </svg>
  ),
};

/* Role icons - clean SVG icons replacing emojis */
const roleIcons: Record<string, React.ReactNode> = {
  "Curriculum design": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  "Lead mentorship": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  "Startup partnerships": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
    </svg>
  ),
  "Product vision": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  "UX Lead": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

function RoleAndStats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="flex flex-col gap-5 lg:flex-row">
      {/* My Role card - left */}
      <div className="flex-1 rounded-3xl border border-sand-300 bg-white p-6">
        <span className="mb-[13px] inline-flex items-center rounded-md bg-sand-100 px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-sand-600">
          My role
        </span>
        <h3 className="mb-4 font-brand text-[20px] font-bold leading-tight text-gray-800">
          Co-Founder & Sprint Leader
        </h3>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2">
          {roles.map((role, i) => (
            <motion.div
              key={role.text}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.07, ease: "easeOut" }}
              className="flex items-center gap-2.5 rounded-lg bg-sand-50 px-3 py-2.5"
            >
              <motion.span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-sand-200/60 text-neutral-500"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.07, type: "spring", stiffness: 200, damping: 12 }}
              >
                {roleIcons[role.text] ?? role.icon}
              </motion.span>
              <span className="font-body text-[13px] font-medium text-neutral-700">
                {role.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats - right, 2×2 grid */}
      <div className="grid flex-1 grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            className="rounded-2xl border border-sand-300 bg-sand-100 px-[17px] py-5 text-center transition-transform duration-300 ease-out hover:-rotate-2 hover:scale-[1.04]"
          >
            <motion.div
              className="mb-2 flex justify-center text-[#300101]"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, type: "spring", stiffness: 200, damping: 12 }}
            >
              {statIcons[stat.label] ?? stat.icon}
            </motion.div>
            <div
              className="font-brand text-[32px] font-extrabold leading-relaxed"
              style={{
                background: "linear-gradient(135deg, #2216ff 0%, #2216ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {stat.number}
            </div>
            <div className="font-body text-[12px] font-semibold uppercase tracking-[0.03em] text-gray-500">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 4 - Sprint Calendar (interactive)
   ═══════════════════════════════════ */
const DAY_LETTERS = ["M", "T", "W", "T", "F", "S", "S"];

function SprintCalendar({ days }: { days: SprintDay[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Split into weeks of 7
  const week1 = days.slice(0, 7);
  const week2 = days.slice(7, 14);
  const [activeWeek, setActiveWeek] = useState(0); // 0 = week 1, 1 = week 2
  const [selectedIdx, setSelectedIdx] = useState(0); // index within current week

  const currentWeek = activeWeek === 0 ? week1 : week2;
  const selectedDay = currentWeek[selectedIdx] ?? currentWeek[0];

  // Derive month name from first day's date
  const firstDate = new Date(week1[0]?.date + "T12:00:00");
  const monthName = firstDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  // Week range labels
  const weekRanges = [week1, week2].map((w) => {
    if (w.length === 0) return "";
    const start = new Date(w[0].date + "T12:00:00");
    const end = new Date(w[w.length - 1].date + "T12:00:00");
    const s = start.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const e = end.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return `${s}–${e}`;
  });

  const switchWeek = (newWeek: number) => {
    setActiveWeek(newWeek);
    setSelectedIdx(0);
  };

  if (days.length === 0) return null;

  return (
    <motion.div
      ref={ref}
      className="rounded-3xl border border-sand-300 bg-white p-6 lg:p-8"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <span className="mb-3 inline-flex items-center rounded-md bg-sand-100 px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-sand-600">
        How it works
      </span>
      <h3 className="mb-1 font-brand text-[20px] font-bold leading-tight text-gray-800">
        2-week sprints. Real startups. Shipped products.
      </h3>
      <p className="mb-5 text-[13px] leading-relaxed text-neutral-600">
        Tap a day to see what you&rsquo;d be working on.
      </p>

      {/* Calendar widget */}
      <div className="overflow-hidden rounded-2xl border border-sand-200 bg-sand-50">
        {/* Month + week nav */}
        <div className="flex items-center justify-between border-b border-sand-200 px-4 py-3 sm:px-5">
          <div>
            <div className="font-brand text-[15px] font-semibold text-brand-ink">{monthName}</div>
            <div className="text-[11px] font-medium text-neutral-600">
              Week {activeWeek + 1} · {weekRanges[activeWeek]}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => switchWeek(0)}
              disabled={activeWeek === 0}
              className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors disabled:opacity-30 enabled:hover:bg-sand-200"
              aria-label="Previous week"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => switchWeek(1)}
              disabled={activeWeek === 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors disabled:opacity-30 enabled:hover:bg-sand-200"
              aria-label="Next week"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Day grid */}
        <div className="px-2 pb-2 pt-3 sm:px-4">
          {/* Day letters */}
          <div className="mb-1 grid grid-cols-7 text-center">
            {DAY_LETTERS.map((letter, i) => (
              <span
                key={i}
                className={`text-[11px] font-semibold ${
                  i >= 5 ? "text-neutral-400" : "text-neutral-600"
                }`}
              >
                {letter}
              </span>
            ))}
          </div>

          {/* Day numbers - large tap targets */}
          <div className="grid grid-cols-7">
            <AnimatePresence mode="wait">
              {currentWeek.map((day, i) => {
                const d = new Date(day.date + "T12:00:00");
                const dayNum = d.getDate();
                const isSelected = i === selectedIdx;
                const isRest = day.isRestDay;

                return (
                  <motion.button
                    key={`${activeWeek}-${i}`}
                    onClick={() => setSelectedIdx(i)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                    className="group flex flex-col items-center gap-1 py-2"
                    aria-label={`${day.name} - ${day.description}`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-[15px] font-semibold transition-all sm:h-11 sm:w-11 ${
                        isSelected
                          ? "bg-[#2216ff] text-white shadow-md shadow-[#2216ff]/25"
                          : isRest
                            ? "text-neutral-300 group-hover:bg-sand-200"
                            : "text-brand-ink group-hover:bg-sand-200"
                      }`}
                    >
                      {dayNum}
                    </div>
                    {/* Dot indicator */}
                    <div
                      className={`h-1 w-1 rounded-full transition-colors ${
                        isSelected
                          ? "bg-[#2216ff]"
                          : day.moduleNumber
                            ? "bg-[#2216ff]/30"
                            : "bg-transparent"
                      }`}
                    />
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Selected day detail card */}
        <div className="border-t border-sand-200 px-4 py-4 sm:px-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeWeek}-${selectedIdx}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className={`relative overflow-hidden rounded-xl p-4 ${
                selectedDay?.isRestDay
                  ? "bg-sand-100"
                  : "bg-brand-ink"
              }`}
            >
              {/* Soft blurred gradient overlay for module days */}
              {!selectedDay?.isRestDay && (
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(215,201,183,0.12),transparent_60%)]" />
              )}
              <div className="relative">
                <div className="mb-2 flex items-center gap-2.5">
                  {selectedDay?.moduleNumber ? (
                    <span className="inline-flex items-center rounded-md bg-sand-100/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.05em] text-sand-100">
                      Module {selectedDay.moduleNumber}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-md bg-sand-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.05em] text-neutral-600">
                      {selectedDay?.isRestDay ? "Rest day" : "Day off"}
                    </span>
                  )}
                  <span className={`text-[11px] ${selectedDay?.isRestDay ? "text-neutral-600" : "text-sand-500"}`}>
                    {selectedDay
                      ? new Date(selectedDay.date + "T12:00:00").toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "short",
                          day: "numeric",
                        })
                      : ""}
                  </span>
                </div>
                <h4 className={`mb-1 font-brand text-[16px] font-bold ${
                  selectedDay?.isRestDay ? "text-neutral-500" : "text-sand-100"
                }`}>
                  {selectedDay?.name}
                </h4>
                <p className={`text-[13px] leading-relaxed ${
                  selectedDay?.isRestDay ? "text-neutral-600" : "text-sand-500"
                }`}>
                  {selectedDay?.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-5 flex justify-center">
        <a
          href={RESERVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2216ff] px-6 py-3 font-body text-[14px] font-semibold text-white transition-colors hover:bg-[#1a11cc] sm:w-auto"
        >
          I&rsquo;m ready to sprint
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════
   Section 5 - Partners
   ═══════════════════════════════════ */
function Partners({ assets }: { assets: YummyAssetsMap }) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      {/* Startup Partners */}
      <div className="flex-1 overflow-hidden rounded-3xl border border-sand-300 bg-white p-6">
        <span className="mb-4 inline-flex items-center rounded-md bg-sand-100 px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-sand-600">
          Startup partners
        </span>
        {/* Horizontal scroll - a partial card stays clipped on the right to signal more */}
        <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {partners.map((partner) => {
            const logoUrl = partner.logo ?? assets.partnerLogos[partner.slug];
            return (
              <div
                key={partner.name}
                className="flex w-[140px] shrink-0 snap-start flex-col rounded-2xl border border-sand-300 bg-sand-100 p-4 text-center"
              >
                <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-neutral-50${partner.stealth ? " blur-[6px]" : ""}`}>
                  {logoUrl ? (
                    <Img src={logoUrl} alt={partner.name} className="h-8 w-8 object-contain" />
                  ) : (
                    <span className="font-body text-[14px] font-bold text-gray-500">
                      {partner.logoText}
                    </span>
                  )}
                </div>
                <div className="mb-1 font-body text-[14px] font-bold text-[#300101]">
                  {partner.name}
                </div>
                <div className="whitespace-pre-line text-[11px] leading-relaxed text-gray-500">
                  {partner.description}
                </div>
                {partner.upcoming && (
                  <div className="mt-auto flex justify-center pt-3">
                    <span className="inline-flex items-center rounded-full bg-sand-200 px-2 py-[3px] text-[9px] font-semibold uppercase tracking-[0.04em] text-neutral-500">
                      Upcoming
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tool Partners */}
      <div className="flex-1 rounded-3xl border border-sand-300 bg-white p-6">
        <span className="mb-[13px] inline-flex items-center rounded-md bg-sand-100 px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-sand-600">
          Tool partners
        </span>
        <h3 className="mb-4 font-brand text-[20px] font-bold leading-tight text-gray-800">
          The AI-design stack every sprinter learns
        </h3>
        <div className="flex flex-col flex-wrap gap-3 sm:flex-row">
          {tools.map((tool) => {
            const logoUrl = tool.logo ?? assets.toolLogos[tool.slug];
            return (
              <div
                key={tool.name}
                className="flex items-center gap-2 rounded-full border border-sand-300 bg-sand-100 px-[17px] py-[11px]"
              >
                <div className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-[4px] bg-[#ede9fe]">
                  {logoUrl ? (
                    <Img src={logoUrl} alt={tool.name} className="h-4 w-4 object-contain" />
                  ) : (
                    <span className="font-body text-[10px] font-bold text-[#7c3aed]">
                      {tool.logoText}
                    </span>
                  )}
                </div>
                <span className="font-body text-[13px] font-semibold text-gray-800">
                  {tool.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 6 - Testimonials
   ═══════════════════════════════════ */
function TestimonialCard({
  t,
  avatarUrl,
  featured,
}: {
  t: (typeof testimonials)[0];
  avatarUrl?: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-[18px] border border-[rgba(255,244,235,0.41)] bg-[#4b1b1b] p-[21px] ${
        featured ? "w-full" : "flex-1"
      }`}
    >
      <p className="mb-[15px] text-[14px] leading-relaxed text-neutral-50">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-[10px]">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#7c3aed] to-[#f472b6] font-body text-[14px] font-bold text-white">
          {avatarUrl ? (
            <Img src={avatarUrl} alt={t.name} className="h-full w-full object-cover" />
          ) : (
            t.initial
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-body text-[13px] font-bold text-neutral-50">
            {t.name}
          </div>
          <div className="text-[11px] text-neutral-50">
            {t.title}, {t.location} {t.flag}
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center rounded-md bg-[#d1fae5] px-[10px] py-1 font-body text-[11px] font-bold text-[#059669]">
          {t.badge}
        </span>
      </div>
    </div>
  );
}

function Testimonials({ assets }: { assets: YummyAssetsMap }) {
  const featured = testimonials.find((t) => t.featured);
  const rest = testimonials.filter((t) => !t.featured);

  return (
    <div className="rounded-3xl border border-sand-300 bg-[#300101] p-[26px]">
      <span className="mb-[13px] inline-flex items-center rounded-md bg-sand-100 px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-sand-600">
        Designer testimonials
      </span>

      <div className="mt-8 flex flex-col gap-4">
        {/* Featured */}
        {featured && (
          <TestimonialCard
            t={featured}
            avatarUrl={assets.avatars[featured.avatarSlug] || undefined}
            featured
          />
        )}

        {/* Rows of 2 */}
        {[0, 2, 4].map((startIdx) => {
          const pair = rest.slice(startIdx, startIdx + 2);
          if (pair.length === 0) return null;
          return (
            <div key={startIdx} className="flex flex-col gap-4 md:flex-row">
              {pair.map((t) => (
                <TestimonialCard
                  key={t.name}
                  t={t}
                  avatarUrl={assets.avatars[t.avatarSlug] || undefined}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 7 - Featured work
   ═══════════════════════════════════ */

function FeaturedArrow({
  dir,
  onClick,
  className = "",
}: {
  dir: 1 | -1;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === -1 ? "Previous student" : "Next student"}
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sand-300 bg-white text-brand-ink transition-colors hover:bg-sand-100 ${className}`}
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {dir === -1 ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );
}

function FeaturedWork({ assets }: { assets: YummyAssetsMap }) {
  const items = assets.featuredWork.filter((w) => w.imageUrls.length > 0);
  const [active, setActive] = useState(0);

  if (items.length === 0) return null;

  const w = items[Math.min(active, items.length - 1)];
  const many = items.length > 1;
  const go = (dir: 1 | -1) => setActive((a) => (a + dir + items.length) % items.length);
  const subtitle = [w.industry ? `${w.industry} Sprint` : "", w.startup]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="mt-2">
      <div className="mb-5">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-sand-100 px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-sand-600">
          Featured work
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#E89B24" aria-hidden="true">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </span>
      </div>

      <div className="flex items-stretch gap-3">
        {many && <FeaturedArrow dir={-1} onClick={() => go(-1)} className="hidden self-center sm:flex" />}

        <div className="min-w-0 flex-1 rounded-2xl border border-[#E7DECF] bg-[#F1E9E4] p-5 lg:p-6">
          {/* Student header */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {w.avatarUrl && (
              <span
                className="flex shrink-0 rounded-full border-2 bg-white p-[2px]"
                style={{ borderColor: "#FBBF24" }}
              >
                <Img src={w.avatarUrl} alt={w.name} className="h-10 w-10 rounded-full object-cover" />
              </span>
            )}
            <div className="min-w-0">
              <div className="font-body text-[15px] font-bold text-brand-ink">{w.name}</div>
              {subtitle && <div className="text-[13px] text-neutral-500">{subtitle}</div>}
            </div>
            {w.tag &&
              (w.link ? (
                <a
                  href={w.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto flex h-[50px] w-fit shrink-0 items-center gap-1.5 rounded-full bg-[#FFFEFC] px-4 text-[13px] font-bold text-black shadow-[0_1px_4px_rgba(48,1,1,0.06)] transition-transform hover:scale-[1.03]"
                >
                  {w.tag}
                  <GlobeIcon />
                </a>
              ) : (
                <span className="ml-auto flex h-[50px] w-fit shrink-0 items-center rounded-full bg-[#FFFEFC] px-4 text-[13px] font-bold text-black shadow-[0_1px_4px_rgba(48,1,1,0.06)]">
                  {w.tag}
                </span>
              ))}
          </div>

          {/* Work screens — fill the container on desktop, swipe on mobile */}
          <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1 sm:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {w.imageUrls.map((src, i) => (
              <div
                key={i}
                className="w-[58%] shrink-0 overflow-hidden rounded-xl border border-sand-300 bg-neutral-900 sm:w-auto sm:flex-1 sm:shrink"
                style={{ aspectRatio: "9 / 19" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${w.name}'s work, screen ${i + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {many && <FeaturedArrow dir={1} onClick={() => go(1)} className="hidden self-center sm:flex" />}
      </div>

      {/* Mobile controls + dots */}
      {many && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <FeaturedArrow dir={-1} onClick={() => go(-1)} className="sm:hidden" />
          <div className="flex items-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Go to student ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === active ? "w-5 bg-brand-ink" : "w-2 bg-sand-300 hover:bg-sand-400"
                }`}
              />
            ))}
          </div>
          <FeaturedArrow dir={1} onClick={() => go(1)} className="sm:hidden" />
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════
   Section 8 - CTA
   ═══════════════════════════════════ */
function CtaSection() {
  return (
    <a
      href={YUMMY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative mt-2 flex items-center gap-4 overflow-hidden rounded-2xl bg-[#2216ff] px-6 py-5 transition-colors hover:bg-[#1a11cc] sm:px-8 sm:py-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.3),transparent_60%)]" />
      <div className="relative flex-1">
        <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-white/60">
          Applications open
        </div>
        <div className="mt-1 font-brand text-[18px] font-extrabold leading-tight text-white sm:text-[22px]">
          Apply for the AI Design Sprint in September
        </div>
      </div>
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#2216ff] transition-transform group-hover:translate-x-0.5">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </a>
  );
}

/* ═══════════════════════════════════
   Main Page
   ═══════════════════════════════════ */
function LabsContent({ assets, sprintDays }: YummyLabsPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <ProblemHero />
      <RoleAndStats />
      <SprintCalendar days={sprintDays ?? []} />
      <Partners assets={assets} />
      <Testimonials assets={assets} />
      <FeaturedWork assets={assets} />
      <CtaSection />
    </div>
  );
}

export function YummyLabsPage({ assets, sprintDays }: YummyLabsPageProps) {
  const [side, setSide] = useState<Side | null>(null);
  const [veil, setVeil] = useState(false);
  const [hovered, setHovered] = useState<Side | null>(null);
  const other: Side | null = side === "studio" ? "labs" : side === "labs" ? "studio" : null;

  /* Switching between expanded sides: hide ALL panel content first, slide the
     empty containers, then reveal - so nothing reflows visibly mid-slide. */
  const switchTo = (s: Side) => {
    if (side === s) return;
    if (side === null) {
      setSide(s);
      return;
    }
    setVeil(true);
    window.setTimeout(() => {
      setSide(s);
      window.setTimeout(() => setVeil(false), 560);
    }, 200);
  };

  const enter = (s: Side) => {
    setHovered(null);
    switchTo(s);
  };

  return (
    <PageEntrance>
      <div className="relative flex flex-col gap-4 lg:min-h-[calc(100vh-140px)] lg:flex-row lg:items-stretch">
        {side === null && <DogDoorman hovered={hovered} />}
        {(["studio", "labs"] as const).map((s) => {
          const b = BRANDS[s];
          const state = side === null ? "door" : side === s ? "open" : "rail";

          return (
            <div
              key={s}
              onMouseEnter={() => state === "door" && setHovered(s)}
              onMouseLeave={() => state === "door" && setHovered(null)}
              className={`relative min-w-0 transition-all duration-500 ease-in-out ${
                state === "rail"
                  ? "hidden lg:block"
                  : "overflow-hidden rounded-[20px] border bg-[#FAF7F5]"
              }`}
              style={{
                flexGrow: state === "rail" ? 0 : 1,
                flexBasis: state === "rail" ? "51px" : "0%",
                flexShrink: 0,
                ...(state === "rail" ? {} : { borderColor: "#F1E9E4" }),
              }}
            >
              <div
                className={`h-full transition-opacity duration-200 ${
                  veil ? "opacity-0" : "opacity-100"
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {state === "rail" ? (
                    <motion.div
                      key="rail"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                      className="h-full"
                    >
                      <RailInner side={s} onEnter={() => enter(s)} />
                    </motion.div>
                  ) : state === "door" ? (
                    <motion.div
                      key="door"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="relative flex min-h-[68vh] flex-col items-center justify-center gap-12 px-8 py-11 lg:min-h-full"
                    >
                      <DoorGlow />
                      <VisitPill href={b.site} label={b.siteLabel} icon={b.siteIcon} />
                      <div className="relative text-center">
                        <h2 className="font-brand text-22 font-bold text-brand-ink">{b.name}</h2>
                        <p className="mx-auto mt-2 max-w-[420px] text-[16px] text-neutral-600">{b.desc}</p>
                      </div>
                      <TapCircle side={s} onEnter={() => enter(s)} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="open"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.25, ease: "easeOut" }}
                      className="relative flex flex-col gap-6 px-5 py-7 sm:px-8 lg:gap-8 lg:px-10 lg:py-9"
                    >
                      <OpenHeader side={s} />
                      <VisitPill href={b.site} label={b.siteLabel} icon={b.siteIcon} stacked />
                      {s === "studio" ? (
                        <StudioContent />
                      ) : (
                        <LabsContent assets={assets} sprintDays={sprintDays} />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile - the other brand becomes a sticky bottom chip */}
      <AnimatePresence>
        {side && other && (
          <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center lg:hidden">
            <motion.button
              type="button"
              onClick={() => enter(other)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-[#EADED7] bg-[#FFFEFC] py-2.5 pl-3 pr-5 text-[13px] font-bold text-brand-ink shadow-[0_8px_28px_rgba(48,1,1,0.16)]"
            >
              <Img
                src={BRANDS[other].logo}
                alt=""
                className="h-6 w-6 rounded-full object-contain"
              />
              Switch to {BRANDS[other].name}
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </PageEntrance>
  );
}
