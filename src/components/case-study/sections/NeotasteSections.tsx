"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  SectionReveal,
  DeviceMockupCarousel,
} from "@/components/case-study/interactive";
import { SectionLabel } from "@/components/case-study/SectionLabel";

/* ─── Neotaste brand palette ─── */
const BRAND = {
  dark: "#092B18",
  mid: "#0F3D24",
  accent: "#29F77C",
  accentMuted: "#1CB85E",
  lightTint: "rgba(41, 247, 124, 0.06)",
} as const;

/* ─── Activity icons (animated on scroll) ─── */
const iconProps = {
  width: 22, height: 22, viewBox: "0 0 24 24", fill: "none",
  stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  className: "text-emerald-700",
};

function SearchIcon({ animate }: { animate?: boolean }) {
  return (
    <motion.svg {...iconProps}
      initial={{ scale: 0.6, opacity: 0 }}
      animate={animate ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </motion.svg>
  );
}

function MapIcon({ animate }: { animate?: boolean }) {
  return (
    <motion.svg {...iconProps}
      initial={{ scale: 0.6, opacity: 0 }}
      animate={animate ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.05 }}
    >
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" x2="9" y1="3" y2="18" />
      <line x1="15" x2="15" y1="6" y2="21" />
    </motion.svg>
  );
}

function BeakerIcon({ animate }: { animate?: boolean }) {
  return (
    <motion.svg {...iconProps}
      initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
      animate={animate ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0.6, opacity: 0, rotate: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
    >
      <path d="M4.5 3h15" />
      <path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" />
      <path d="M6 14h12" />
    </motion.svg>
  );
}

function UsersIcon({ animate }: { animate?: boolean }) {
  return (
    <motion.svg {...iconProps}
      initial={{ scale: 0.6, opacity: 0 }}
      animate={animate ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.15 }}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </motion.svg>
  );
}

function ClipboardIcon({ animate }: { animate?: boolean }) {
  return (
    <motion.svg {...iconProps}
      initial={{ scale: 0.6, opacity: 0 }}
      animate={animate ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </motion.svg>
  );
}

/* ═══════════════════════════════════
   Section 1 — The Sprint
   ═══════════════════════════════════ */
function RoleSection({ accentColor }: { accentColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const activities = [
    { icon: (a: boolean) => <SearchIcon animate={a} />, title: "User Research", text: "Deep-dived into user behavior to surface the real pain points in discovery and booking" },
    { icon: (a: boolean) => <MapIcon animate={a} />, title: "Opportunity Mapping", text: "Mapped the product landscape to identify highest-leverage opportunities" },
    { icon: (a: boolean) => <BeakerIcon animate={a} />, title: "Concept Testing", text: "Prototyped two competing concepts to test engagement and retention" },
    { icon: (a: boolean) => <UsersIcon animate={a} />, title: "User Validation", text: "Validated with real users to learn which approach resonated" },
    { icon: (a: boolean) => <ClipboardIcon animate={a} />, title: "Prioritized Roadmap", text: "Delivered a prioritized roadmap so the team knew exactly what to build next" },
  ];

  return (
    <div ref={ref} className="mx-auto w-full max-w-5xl">
      {/* Centered intro */}
      <SectionReveal>
        <div className="text-center">
          <SectionLabel label="The Sprint" accentColor={accentColor} centered />
          <h2 className="mx-auto mt-4 max-w-[600px] font-brand text-36 font-bold leading-[1.15] text-brand-ink mobile:text-28">
            From assumptions to answers in 14&nbsp;days
          </h2>
          <p className="mx-auto mt-5 max-w-[540px] text-17 leading-[1.7] text-neutral-600">
            Neotaste wanted to boost engagement but had competing ideas about
            what to improve. I ran a focused design sprint, conducting user
            interviews, mapping friction points, and testing concepts to find
            what would actually move the needle.
          </p>
        </div>
      </SectionReveal>

      {/* Activity items — elevated cards with icon tint backgrounds */}
      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {activities.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.08, ease: "easeOut" }}
            className={`flex items-start gap-3.5 rounded-xl border border-sand-200 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]${i === activities.length - 1 ? " sm:col-span-2" : ""}`}
          >
            <span
              className="mt-0.5 flex size-9 flex-shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${accentColor}12` }}
            >
              {a.icon(isInView)}
            </span>
            <div>
              <p className="text-14 font-semibold leading-snug text-brand-ink">{a.title}</p>
              <p className="mt-0.5 text-13 leading-relaxed text-neutral-500">{a.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <SectionReveal delay={0.4} className="mt-8">
        <div
          className="rounded-xl p-5 text-center"
          style={{ backgroundColor: `${accentColor}10` }}
        >
          <p className="mx-auto max-w-[560px] text-14 leading-relaxed text-neutral-600">
            Instead of sinking months into features with uncertain impact, the
            sprint gave Neotaste evidence-backed clarity on what would truly
            move the needle, plus a prototype their team could confidently
            build from.
          </p>
        </div>
      </SectionReveal>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 2 — Uncovering Friction
   ═══════════════════════════════════ */
/* Inline SVG visuals for friction cards */
function DeclineTrendSVG() {
  return (
    <svg viewBox="0 0 200 100" fill="none" className="h-full w-full">
      {/* Y-axis labels */}
      <text x="8" y="18" fill="white" fontSize="7" opacity="0.25" fontFamily="system-ui">High</text>
      <text x="8" y="92" fill="white" fontSize="7" opacity="0.25" fontFamily="system-ui">Low</text>
      {/* Subtle grid */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="30" y1={15 + i * 18} x2="190" y2={15 + i * 18} stroke="white" strokeOpacity="0.04" strokeWidth="0.5" />
      ))}
      {/* Area fill */}
      <path
        d="M 35 22 C 55 20, 70 28, 90 42 S 130 62, 155 72 S 175 82, 188 88 L 188 95 L 35 95 Z"
        fill="url(#decline-area)"
      />
      {/* Main trend line */}
      <path
        d="M 35 22 C 55 20, 70 28, 90 42 S 130 62, 155 72 S 175 82, 188 88"
        stroke={BRAND.accent}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Data points with pulse rings */}
      <circle cx="35" cy="22" r="4" fill={BRAND.dark} stroke={BRAND.accent} strokeWidth="1.5" />
      <circle cx="70" cy="30" r="3" fill={BRAND.dark} stroke={BRAND.accent} strokeWidth="1.5" opacity="0.8" />
      <circle cx="115" cy="55" r="3" fill={BRAND.dark} stroke={BRAND.accent} strokeWidth="1.5" opacity="0.6" />
      <circle cx="155" cy="72" r="3" fill={BRAND.dark} stroke={BRAND.accent} strokeWidth="1.5" opacity="0.4" />
      <circle cx="188" cy="88" r="4" fill="#ef4444" stroke="#ef4444" strokeWidth="0" opacity="0.8" />
      {/* Red danger zone */}
      <rect x="165" y="75" width="28" height="20" rx="3" fill="#ef4444" fillOpacity="0.08" />
      <text x="170" y="88" fill="#ef4444" fontSize="7" fontWeight="600" opacity="0.7" fontFamily="system-ui">-47%</text>
      <defs>
        <linearGradient id="decline-area" x1="100" y1="20" x2="100" y2="95">
          <stop offset="0%" stopColor={BRAND.accent} stopOpacity="0.15" />
          <stop offset="100%" stopColor={BRAND.accent} stopOpacity="0.01" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function BrokenLoopSVG() {
  return (
    <svg viewBox="0 0 260 130" fill="none" className="h-full w-full">
      {/* Left node — "User" */}
      <circle cx="55" cy="58" r="26" fill={`${BRAND.accent}10`} stroke={BRAND.accent} strokeWidth="1.5" />
      <text x="55" y="55" fill="white" fontSize="11" fontWeight="600" textAnchor="middle" opacity="0.8" fontFamily="system-ui">User</text>
      <text x="55" y="69" fill="white" fontSize="9" textAnchor="middle" opacity="0.35" fontFamily="system-ui">invites</text>
      {/* Right node — "Friend" */}
      <circle cx="205" cy="58" r="26" fill={`${BRAND.accent}10`} stroke={BRAND.accent} strokeWidth="1.5" />
      <text x="205" y="55" fill="white" fontSize="11" fontWeight="600" textAnchor="middle" opacity="0.8" fontFamily="system-ui">Friend</text>
      <text x="205" y="69" fill="white" fontSize="9" textAnchor="middle" opacity="0.35" fontFamily="system-ui">joins</text>
      {/* Top arrow — invite path (broken) */}
      <path d="M 83 42 C 105 14, 155 14, 177 42" stroke={BRAND.accent} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M 173 37 L 178 43 L 171 45" stroke={BRAND.accent} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5" />
      {/* Bottom arrow — share-back path (broken) */}
      <path d="M 177 74 C 155 102, 105 102, 83 74" stroke={BRAND.accent} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M 87 79 L 82 73 L 89 71" stroke={BRAND.accent} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5" />
      {/* Break X in center */}
      <circle cx="130" cy="58" r="16" fill="#ef444415" />
      <line x1="122" y1="50" x2="138" y2="66" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      <line x1="138" y1="50" x2="122" y2="66" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      {/* Dashed break lines */}
      <line x1="95" y1="28" x2="112" y2="42" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />
      <line x1="148" y1="42" x2="165" y2="28" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />
      <line x1="95" y1="88" x2="112" y2="74" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />
      <line x1="148" y1="74" x2="165" y2="88" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />
      {/* Label */}
      <text x="130" y="122" fill="#ef4444" fontSize="10" fontWeight="500" textAnchor="middle" opacity="0.5" fontFamily="system-ui">Loop broken</text>
    </svg>
  );
}

function FrictionSection({ accentColor }: { accentColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const problems = [
    {
      title: "Discovery felt overwhelming",
      signal: "Engagement declining",
      description: "Users faced cognitive overload and couldn't find places that matched their taste. Generic recommendations drove people away instead of pulling them in.",
      Visual: DeclineTrendSVG,
    },
    {
      title: "Invites weren't working",
      signal: "Growth loop broken",
      description: "Users defaulted to Google Maps to coordinate with friends, breaking the growth loop and keeping sharing outside the app entirely.",
      Visual: BrokenLoopSVG,
    },
  ];

  return (
    <div ref={ref} className="mx-auto w-full max-w-5xl">
      <SectionReveal>
        <SectionLabel label="Research" accentColor={accentColor} />
        <h2 className="mt-4 max-w-[640px] font-brand text-36 font-bold leading-[1.15] text-brand-ink mobile:text-28">
          Two blockers killing growth
        </h2>
        <p className="mt-4 max-w-[600px] text-17 leading-[1.7] text-neutral-600">
          Through early user interviews, I discovered two critical blockers
          hurting Neotaste&apos;s growth. These weren&apos;t just UX issues.
          They were business problems directly impacting retention and viral
          loops.
        </p>
      </SectionReveal>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {problems.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-2xl"
            style={{
              background: `linear-gradient(160deg, ${BRAND.dark} 0%, ${BRAND.mid} 100%)`,
            }}
          >
            {/* Accent top border */}
            <div
              className="absolute inset-x-0 top-0 h-[2px]"
              style={{ background: `linear-gradient(90deg, ${BRAND.accent}60, ${BRAND.accent}20, transparent)` }}
            />

            <div className="flex flex-col">
              {/* Visual on top */}
              <div className="flex items-center justify-center px-6 pt-6 pb-2">
                <div className="h-[130px] w-full max-w-[260px]">
                  <p.Visual />
                </div>
              </div>

              {/* Text content below */}
              <div className="p-5 pt-3">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex rounded-md px-2 py-0.5 text-11 font-semibold"
                    style={{ backgroundColor: `${BRAND.accent}15`, color: BRAND.accent }}
                  >
                    Blocker {i + 1}
                  </span>
                  <span className="text-11 text-white/30">{p.signal}</span>
                </div>
                <h4 className="mt-2.5 text-[18px] font-semibold leading-tight text-white">
                  {p.title}
                </h4>
                <p className="mt-2 text-14 leading-relaxed text-white/50">
                  {p.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 3 — Smarter Discovery
   (Phone carousel on branded backdrop)
   ═══════════════════════════════════ */
function DiscoverySection({ accentColor }: { accentColor: string }) {
  const slides = [
    { src: "/images/neotaste/discovery-1.png", alt: "Smarter discovery 1", caption: "Progressive taste profile for personalized discovery" },
    { src: "/images/neotaste/discovery-2.png", alt: "Smarter discovery 2", caption: "Smarter saved places that learn from patterns" },
    { src: "/images/neotaste/discovery-3.png", alt: "Smarter discovery 3", caption: "Tailored suggestions right from day one" },
    { src: "/images/neotaste/discovery-4.png", alt: "Smarter discovery 4", caption: "Rich detail pages with actionable reviews" },
    { src: "/images/neotaste/discovery-5.png", alt: "Smarter discovery 5", caption: "Refined experience end to end" },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl">
      <SectionReveal>
        <SectionLabel label="Discovery" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-36 font-bold leading-[1.15] text-brand-ink mobile:text-28">
          Smarter discovery
        </h2>
        <p className="mt-4 max-w-[760px] text-17 leading-[1.7] text-neutral-600">
          Users wanted more control and less noise. I tested a progressive
          taste profile and smarter saved places to make discovery feel
          personal, and worth coming back to.
        </p>
      </SectionReveal>

      {/* Branded mockup backdrop */}
      <div
        className="relative mt-10 overflow-hidden rounded-2xl px-6 py-10"
        style={{
          background: `linear-gradient(170deg, ${BRAND.dark} 0%, ${BRAND.mid} 100%)`,
        }}
      >
        {/* Subtle radial glow behind phone */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 400,
            height: 400,
            background: `radial-gradient(circle, ${BRAND.accent}18 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
        />
        <div className="relative">
          <DeviceMockupCarousel slides={slides} device="phone" autoPlay={4000} />
        </div>
      </div>

      {/* ── Beyond the Feed — sticky scroll sub-section ── */}
      <div className="mt-24">
        <SectionReveal>
          <h2 className="font-brand text-36 font-bold leading-[1.15] text-brand-ink mobile:text-28">
            Beyond the feed
          </h2>
          <p className="mt-4 max-w-[760px] text-17 leading-[1.7] text-neutral-600">
            Great discovery doesn&apos;t stop at the home screen. I designed
            proactive touchpoints that bring users back at the right moment —
            weekly picks, map exploration, and smart notifications.
          </p>
        </SectionReveal>

        <div className="mt-12">
          <StickyPhoneShowcase accentColor={accentColor} />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Visual pause — full-width branded divider
   ═══════════════════════════════════ */
function BrandedDivider() {
  return (
    <SectionReveal>
      <div className="mx-auto flex w-full max-w-5xl items-center gap-4">
        <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${BRAND.accent}30, transparent)` }} />
        <div
          className="flex size-10 items-center justify-center rounded-full text-lg"
          style={{ backgroundColor: `${BRAND.accent}10` }}
        >
          ⚡
        </div>
        <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${BRAND.accent}30, transparent)` }} />
      </div>
    </SectionReveal>
  );
}

/* ═══════════════════════════════════
   Section 4 — Reimagining Invites
   (Floating phone grid — 2 rows × 3 phones)
   ═══════════════════════════════════ */
const INVITE_PHONES = [
  { src: "/images/neotaste/invite-1.png", alt: "Invite flow 1" },
  { src: "/images/neotaste/invite-2.png", alt: "Invite flow 2" },
  { src: "/images/neotaste/invite-3.png", alt: "Invite flow 3" },
  { src: "/images/neotaste/invite-4.png", alt: "Invite flow 4" },
  { src: "/images/neotaste/invite-5.png", alt: "Invite flow 5" },
  { src: "/images/neotaste/invite-6.png", alt: "Invite flow 6" },
];

/* Alternating float offsets for organic wave motion */
const INVITE_FLOAT_OFFSETS = [8, -6, 10, -7, 9, -8];

function FloatingPhone({
  src,
  alt,
  index,
  inView,
}: {
  src: string;
  alt: string;
  index: number;
  inView: boolean;
}) {
  const floatOffset = INVITE_FLOAT_OFFSETS[index];
  const delay = 0.5 + index * 0.15;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={
        inView
          ? {
              opacity: 1,
              y: [floatOffset, -floatOffset, floatOffset],
            }
          : { opacity: 0, y: 40 }
      }
      transition={{
        opacity: { duration: 0.7, delay: index * 0.08, ease: "easeOut" },
        y: {
          delay,
          duration: 6,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror" as const,
        },
      }}
      className="w-[160px] flex-shrink-0 sm:w-[180px] md:w-[200px] lg:w-[220px]"
    >
      <div
        className="overflow-hidden rounded-[28px] border-[6px] border-[#1d1d1f] bg-[#1d1d1f] sm:rounded-[32px] sm:border-[7px] md:rounded-[36px] md:border-[8px]"
        style={{
          filter:
            "drop-shadow(0 16px 32px rgba(0,0,0,0.2)) drop-shadow(0 6px 12px rgba(0,0,0,0.12))",
        }}
      >
        <div className="relative overflow-hidden rounded-[22px] bg-black sm:rounded-[25px] md:rounded-[28px]">
          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-[8px] z-10 h-[16px] w-[56px] -translate-x-1/2 rounded-full bg-black sm:top-[9px] sm:h-[18px] sm:w-[64px] md:top-[10px] md:h-[20px] md:w-[72px]" />
          {/* Screen */}
          <div className="aspect-[9/19.5] w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          {/* Home indicator */}
          <div className="absolute bottom-[4px] left-1/2 z-10 h-[3px] w-[72px] -translate-x-1/2 rounded-full bg-white/30 sm:bottom-[5px] sm:h-[3.5px] sm:w-[84px] md:bottom-[6px] md:h-[4px] md:w-[92px]" />
        </div>
      </div>
    </motion.div>
  );
}

function InvitesSection({ accentColor }: { accentColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="mx-auto w-full max-w-5xl">
      <SectionReveal>
        <SectionLabel label="Invites" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-36 font-bold leading-[1.15] text-brand-ink mobile:text-28">
          Reimagining invites
        </h2>
        <p className="mt-4 max-w-[760px] text-17 leading-[1.7] text-neutral-600">
          Invites were key to growth, but felt buried. Users wanted easier
          sharing, clearer entry points, and the option to involve friends at
          the moment of booking. I tested quick wins alongside deeper
          structural changes.
        </p>
      </SectionReveal>

      {/* Branded backdrop with floating phones */}
      <div
        ref={ref}
        className="relative mt-10 overflow-hidden rounded-2xl px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-14"
        style={{
          background: `linear-gradient(170deg, ${BRAND.dark} 0%, ${BRAND.mid} 100%)`,
        }}
      >
        {/* Subtle glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 500,
            height: 500,
            background: `radial-gradient(circle, ${BRAND.accent}12 0%, transparent 70%)`,
            filter: "blur(60px)",
          }}
        />

        {/* Desktop: 2 rows × 3 phones */}
        <div className="relative hidden md:flex md:flex-col md:items-center md:gap-8">
          {[0, 1].map((row) => (
            <div key={row} className="flex items-center justify-center gap-6 lg:gap-8">
              {INVITE_PHONES.slice(row * 3, row * 3 + 3).map((phone, i) => (
                <FloatingPhone
                  key={phone.src}
                  src={phone.src}
                  alt={phone.alt}
                  index={row * 3 + i}
                  inView={inView}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Mobile: 2 columns × 3 rows */}
        <div className="relative grid grid-cols-2 gap-4 sm:gap-5 md:hidden">
          {INVITE_PHONES.map((phone, i) => (
            <div key={phone.src} className="flex justify-center">
              <FloatingPhone
                src={phone.src}
                alt={phone.alt}
                index={i}
                inView={inView}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 5 — Beyond the Feed
   (Sticky scroll showcase + iOS Lock Screen notification)
   Now lives inside DiscoverySection as a sub-section.
   ═══════════════════════════════════ */

/* Steps for the sticky scroll showcase (last step uses custom component) */
const BEYOND_STEPS = [
  {
    src: "/images/neotaste/weekly-recs-1.png",
    alt: "Weekly recommendations",
    title: "Curated weekly picks",
    description:
      "Personalized restaurant recommendations delivered every week, surfacing places that match your actual taste — not just popularity.",
    custom: false,
  },
  {
    src: "/images/neotaste/weekly-recs-2.png",
    alt: "Weekly recommendations detail",
    title: "Reasons you'll love it",
    description:
      "Each pick comes with a personalized reason — not just a star rating, but why this specific place fits your preferences.",
    custom: false,
  },
  {
    src: "/images/neotaste/map-view.png",
    alt: "Map-based discovery",
    title: "Discovery on the map",
    description:
      "See curated spots around you with distance, vibe, and availability — so you can make decisions on the go.",
    custom: false,
  },
  {
    src: "",
    alt: "iOS lock screen notification",
    title: "Smart proximity alerts",
    description:
      "When you walk near a recommended spot, Neotaste surfaces a live notification with distance and details — no searching needed.",
    custom: true,
  },
] as const;

/**
 * Interactive iOS Lock Screen with Neotaste Live Activity notification.
 * Renders inside the PhoneShell-style frame.
 * Features: wallpaper, status bar, time, widgets, interactive notification
 * with inline map, animated distance counter, and Neotaste branding.
 */
function IOSLockScreen({ isActive }: { isActive: boolean }) {
  const [distance, setDistance] = useState(5);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setDistance((d) => (d <= 1 ? 5 : d - 1));
    }, 2200);
    return () => clearInterval(interval);
  }, [isActive]);

  const progress = ((6 - distance) / 5) * 100;

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Wallpaper — warm gradient similar to iOS default */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #fbc2a5 0%, #e8a0b4 20%, #c4a0d4 40%, #8bb8d0 60%, #5ba8a0 80%, #2d6e5e 100%)",
        }}
      />

      {/* Status bar */}
      <div className="relative flex items-center justify-between px-6 pt-3">
        <span className="text-[11px] font-semibold text-white drop-shadow-sm">
          9:41
        </span>
        <div className="flex items-center gap-1">
          <svg width="13" height="10" viewBox="0 0 16 12" fill="white" className="drop-shadow-sm">
            <rect x="0" y="6" width="3" height="6" rx="0.5" opacity="0.4" />
            <rect x="4.5" y="4" width="3" height="8" rx="0.5" opacity="0.6" />
            <rect x="9" y="2" width="3" height="10" rx="0.5" opacity="0.8" />
            <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" />
          </svg>
          <svg width="12" height="9" viewBox="0 0 15 11" fill="white" className="drop-shadow-sm">
            <path d="M7.5 3.5C9.4 3.5 11.1 4.3 12.3 5.5L13.7 4.1C12.1 2.5 9.9 1.5 7.5 1.5S2.9 2.5 1.3 4.1L2.7 5.5C3.9 4.3 5.6 3.5 7.5 3.5Z" opacity="0.5" />
            <path d="M7.5 6.5C8.6 6.5 9.6 6.9 10.4 7.6L11.8 6.2C10.6 5.1 9.1 4.5 7.5 4.5S4.4 5.1 3.2 6.2L4.6 7.6C5.4 6.9 6.4 6.5 7.5 6.5Z" />
            <circle cx="7.5" cy="10" r="1.5" />
          </svg>
          <svg width="18" height="9" viewBox="0 0 22 11" fill="white" className="drop-shadow-sm">
            <rect x="0" y="0.5" width="19" height="10" rx="2" stroke="white" strokeWidth="1" fill="none" opacity="0.35" />
            <rect x="1" y="1.5" width="15" height="8" rx="1" fill="white" />
            <rect x="20" y="3.5" width="2" height="4" rx="0.5" opacity="0.4" />
          </svg>
        </div>
      </div>

      {/* Date & Time */}
      <div className="relative mt-3 text-center">
        <p className="text-[10px] font-medium tracking-wide text-white/80 drop-shadow-sm">
          Monday, March 10
        </p>
        <p className="mt-0.5 text-[48px] font-bold leading-none tracking-tight text-white drop-shadow-md">
          9:41
        </p>
      </div>

      {/* Notification — iOS glass style */}
      <div className="relative mx-2.5 mt-5">
        <div
          className="overflow-hidden rounded-[20px] border border-white/[0.18] p-3.5"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)",
            backdropFilter: "blur(40px) saturate(180%)",
            WebkitBackdropFilter: "blur(40px) saturate(180%)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          {/* Header row with Neotaste icon */}
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logos/neotaste-symbol.svg"
              alt=""
              className="size-7 rounded-[6px]"
              style={{ backgroundColor: BRAND.dark, padding: 3 }}
            />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold leading-tight text-white">
                You&apos;re near a recommended spot
              </p>
              <p className="mt-0.5 text-[9px] text-white/50">
                Neotaste &middot; now
              </p>
            </div>
          </div>

          {/* Live content card */}
          <div
            className="mt-2.5 rounded-[12px] border border-white/[0.08] p-2.5"
            style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
          >
            <div className="flex gap-2.5">
              {/* Left — restaurant info + progress */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[12px] font-semibold text-white">
                      Jino&apos;s Ramen
                    </p>
                    <p className="text-[9px] text-white/50">
                      From your weekly picks
                    </p>
                  </div>
                  <div className="text-right">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={distance}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.3 }}
                        className="text-[18px] font-bold leading-none"
                        style={{ color: BRAND.accent }}
                      >
                        {distance}
                      </motion.p>
                    </AnimatePresence>
                    <p className="text-[8px] text-white/50">min away</p>
                  </div>
                </div>

                {/* Proximity progress bar */}
                <div className="mt-2 flex items-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 opacity-50">
                    <circle cx="12" cy="7" r="3" stroke="white" strokeWidth="2" />
                    <path d="M12 10v8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M8 22h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <div className="h-[4px] flex-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: BRAND.accent }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                  <div className="relative flex-shrink-0" style={{ width: 14, height: 14 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" style={{ fill: BRAND.accent }}>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right — inline map snippet */}
              <div
                className="relative flex-shrink-0 overflow-hidden rounded-lg"
                style={{ width: 64, height: 64 }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(135deg, #1a2332 0%, #243447 50%, #1a2332 100%)",
                  }}
                >
                  {/* Streets */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute left-0 right-0 top-[30%] h-px bg-white/40" />
                    <div className="absolute bottom-0 left-[40%] top-0 w-px bg-white/40" />
                    <div
                      className="absolute left-0 right-0 top-[60%] h-px bg-white/30"
                      style={{ transform: "rotate(-15deg)" }}
                    />
                    <div className="absolute bottom-0 left-[70%] top-0 w-px bg-white/25" />
                  </div>
                  {/* Pin marker */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div
                      className="flex size-5 items-center justify-center rounded-full shadow-lg"
                      style={{ backgroundColor: BRAND.accent }}
                    >
                      <div className="size-1.5 rounded-full bg-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom — camera & flashlight buttons */}
      <div className="absolute bottom-5 left-0 right-0 flex items-center justify-between px-6">
        <div className="flex size-8 items-center justify-center rounded-full bg-black/20 backdrop-blur-md">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
        </div>
        <div className="flex size-8 items-center justify-center rounded-full bg-black/20 backdrop-blur-md">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
            <path d="M18 2h-4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1v4H9V8h1a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1v4.17A3 3 0 0 0 5 15v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5a3 3 0 0 0-2-2.83V8h1a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/**
 * Reusable phone shell — same visual as DeviceMockupCarousel's PhoneShell
 * but accepts any children (not just images).
 */
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mx-auto w-full max-w-[280px]"
      style={{
        filter:
          "drop-shadow(0 20px 40px rgba(0,0,0,0.15)) drop-shadow(0 8px 16px rgba(0,0,0,0.1))",
      }}
    >
      <div className="overflow-hidden rounded-[40px] border-[8px] border-[#1d1d1f] bg-[#1d1d1f]">
        <div className="relative overflow-hidden rounded-[32px] bg-black">
          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-[10px] z-20 h-[22px] w-[80px] -translate-x-1/2 rounded-full bg-black" />
          {/* Screen */}
          <div className="relative aspect-[9/19.5] w-full overflow-hidden bg-black">
            {children}
          </div>
          {/* Home indicator */}
          <div className="absolute bottom-[6px] left-1/2 z-20 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-white/30" />
        </div>
      </div>
    </div>
  );
}

/**
 * Sticky scroll showcase — phone stays fixed on the left,
 * text steps scroll on the right, phone crossfades to match.
 * Step 4 renders an interactive iOS lock screen notification.
 */
function StickyPhoneShowcase({ accentColor }: { accentColor: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  /* Track which text step is in the viewport center */
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = stepRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveStep(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const currentStep = BEYOND_STEPS[activeStep];
  const isNotificationStep = currentStep.custom;

  return (
    <div ref={containerRef} className="relative">
      {/* Desktop: two-column sticky layout */}
      <div className="hidden md:grid md:grid-cols-[1fr_1fr] md:gap-12">
        {/* Left — sticky phone, vertically centered */}
        <div className="relative">
          <div className="sticky top-[max(2rem,calc(50vh-260px))]">
            <div
              className="relative mx-auto overflow-hidden rounded-2xl px-6 py-8"
              style={{
                background: `linear-gradient(170deg, ${BRAND.dark} 0%, ${BRAND.mid} 100%)`,
              }}
            >
              {/* Glow */}
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: 300,
                  height: 300,
                  background: `radial-gradient(circle, ${BRAND.accent}15 0%, transparent 70%)`,
                  filter: "blur(40px)",
                }}
              />
              <div className="relative">
                {isNotificationStep ? (
                  <PhoneFrame>
                    <IOSLockScreen isActive={activeStep === 3} />
                  </PhoneFrame>
                ) : (
                  <DeviceMockupCarousel
                    slides={[{
                      src: currentStep.src,
                      alt: currentStep.alt,
                    }]}
                    device="phone"
                    autoPlay={0}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right — scrolling text steps */}
        <div className="flex flex-col">
          {BEYOND_STEPS.map((step, i) => (
            <div
              key={i}
              ref={(el) => { stepRefs.current[i] = el; }}
              className="flex min-h-[60vh] items-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <span
                  className="inline-flex rounded-md px-2 py-0.5 text-11 font-semibold"
                  style={{ backgroundColor: `${accentColor}12`, color: accentColor }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="mt-3 font-brand text-[22px] font-bold leading-tight text-brand-ink">
                  {step.title}
                </h4>
                <p className="mt-2 max-w-[340px] text-16 leading-[1.7] text-neutral-500">
                  {step.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: stacked cards */}
      <div className="flex flex-col gap-16 md:hidden">
        {BEYOND_STEPS.map((step, i) => (
          <SectionReveal key={i} delay={i * 0.1}>
            <div>
              <span
                className="inline-flex rounded-md px-2 py-0.5 text-11 font-semibold"
                style={{ backgroundColor: `${accentColor}12`, color: accentColor }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-3 font-brand text-[22px] font-bold leading-tight text-brand-ink">
                {step.title}
              </h4>
              <p className="mt-2 text-16 leading-[1.7] text-neutral-500">
                {step.description}
              </p>
            </div>
            <div
              className="mt-6 overflow-hidden rounded-2xl px-4 py-6"
              style={{
                background: `linear-gradient(170deg, ${BRAND.dark} 0%, ${BRAND.mid} 100%)`,
              }}
            >
              {step.custom ? (
                <PhoneFrame>
                  <IOSLockScreen isActive />
                </PhoneFrame>
              ) : (
                <DeviceMockupCarousel
                  slides={[{ src: step.src, alt: step.alt }]}
                  device="phone"
                  autoPlay={0}
                />
              )}
            </div>
          </SectionReveal>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 6 — Sprint Outcomes
   Full-bleed photo background + glass cards
   ═══════════════════════════════════ */

const OUTCOMES = [
  {
    metric: "Unblocked Roadmap",
    description:
      "Replaced guesswork with a validated, prioritized feature plan the team could build with confidence",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h4l3-9 4 18 3-9h4" />
      </svg>
    ),
  },
  {
    metric: "Problem Discovery",
    description:
      "Identified the two core blockers killing retention and growth through structured user research",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
  {
    metric: "Validated Direction",
    description:
      "Tested two competing concepts with real users and pinpointed the winning approach",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="m9 11 3 3L22 4" />
      </svg>
    ),
  },
  {
    metric: "De-risked Investment",
    description:
      "Saved months of building unproven features by validating assumptions before any code was written",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

function OutcomeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl"
      style={{ minHeight: 520 }}
    >
      {/* Photo background */}
      <div className="absolute inset-0">
        <Image
          src="/images/neotaste/outcomes-bg.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
        {/* Dark overlay for legibility */}
        <div className="absolute inset-0 bg-black/65" />
        {/* Gradient fade at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Content — split layout on desktop, stacked on mobile */}
      <div className="relative z-10 flex flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:gap-12 md:px-10 md:py-16">
        {/* Left — headline + intro */}
        <div className="flex flex-col md:w-[42%] md:sticky md:top-8 md:flex-shrink-0">
          <SectionReveal>
            <span
              className="inline-flex rounded-md border px-[10px] py-1 text-11 font-semibold uppercase tracking-[0.05em]"
              style={{
                backgroundColor: `${BRAND.accent}15`,
                borderColor: `${BRAND.accent}30`,
                color: BRAND.accent,
              }}
            >
              Outcomes
            </span>
            <h2 className="mt-4 font-brand text-36 font-bold leading-[1.15] text-white mobile:text-28">
              What the sprint delivered
            </h2>
            <p className="mt-4 max-w-[440px] text-17 leading-[1.55] text-white/80">
              In 14 days, I went from open questions to a validated product
              strategy. The team walked away with clear priorities, tested
              prototypes, and the confidence to ship.
            </p>
          </SectionReveal>
        </div>

        {/* Right — 2×2 outcome cards */}
        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
          {OUTCOMES.map((o, i) => (
            <motion.div
              key={o.metric}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{
                duration: 0.5,
                delay: 0.15 + i * 0.1,
                ease: "easeOut",
              }}
              className="rounded-xl border border-white/10 p-5 backdrop-blur-md"
              style={{ backgroundColor: `${BRAND.accent}08` }}
            >
              <div
                className="flex size-9 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${BRAND.accent}18`, color: BRAND.accent }}
              >
                {o.icon}
              </div>
              <div className="mt-3 text-16 font-bold text-white">
                {o.metric}
              </div>
              <p className="mt-1.5 text-13 leading-[1.5] text-white/60">
                {o.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Other concepts tested — clean section with 4 phone mockups
   ═══════════════════════════════════ */
const OTHER_CONCEPTS = [
  { src: "/images/neotaste/concept-1.png", alt: "Concept 1" },
  { src: "/images/neotaste/concept-2.png", alt: "Concept 2" },
  { src: "/images/neotaste/concept-3.png", alt: "Concept 3" },
  { src: "/images/neotaste/concept-4.png", alt: "Concept 4" },
];

function OtherConceptsSection({ accentColor }: { accentColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="mx-auto w-full max-w-5xl">
      <SectionReveal>
        <SectionLabel label="Exploration" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-36 font-bold leading-[1.15] text-brand-ink mobile:text-28">
          Other concepts tested
        </h2>
        <p className="mt-4 max-w-[620px] text-17 leading-[1.7] text-neutral-600">
          Before converging on a direction, I explored several competing
          concepts to stress-test different engagement models and validate
          which patterns resonated most with users.
        </p>
      </SectionReveal>

      {/* 4 phone mockups in a row */}
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
        {OTHER_CONCEPTS.map((concept, i) => (
          <motion.div
            key={concept.src}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* Phone frame */}
            <div
              className="relative w-full overflow-hidden rounded-[20px] border border-neutral-200 bg-white shadow-sm"
              style={{ aspectRatio: "398 / 862" }}
            >
              <Image
                src={concept.src}
                alt={concept.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 45vw, 220px"
                quality={85}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Main Export
   ═══════════════════════════════════ */
interface NeotasteSectionsProps {
  accentColor: string;
}

export function NeotasteSections({ accentColor }: NeotasteSectionsProps) {
  return (
    <div className="flex w-full flex-col gap-28">
      <RoleSection accentColor={accentColor} />
      <FrictionSection accentColor={accentColor} />
      <DiscoverySection accentColor={accentColor} />
      <BrandedDivider />
      <InvitesSection accentColor={accentColor} />
      <OtherConceptsSection accentColor={accentColor} />
      <OutcomeSection />
    </div>
  );
}
