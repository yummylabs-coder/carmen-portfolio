"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { YummyAssetsMap } from "@/lib/types";
import { PageEntrance } from "@/components/ui/PageEntrance";
import {
  stats,
  roles,
  partners,
  tools,
  testimonials,
  labExperiments,
} from "./acceleratorData";

const YUMMY_URL = "https://yummy-labs.com";

interface YummyLabsPageProps {
  assets: YummyAssetsMap;
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
   Section 1 — Header
   ═══════════════════════════════════ */
function Header({ assets }: { assets: YummyAssetsMap }) {
  const logoUrl = assets.branding["logo"];
  const dogUrl = assets.branding["dog"];

  return (
    <header className="relative flex items-start gap-4">
      {/* Logo */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#7c3aed] bg-[#ede9fe] text-[18px]">
        {logoUrl ? (
          <Img src={logoUrl} alt="Yummy Labs" className="h-full w-full object-contain" />
        ) : (
          "\u{1F9EA}"
        )}
      </div>

      {/* Title + subtitle */}
      <div className="flex-1">
        <div className="mb-1 flex items-center gap-3">
          <h1 className="font-brand text-22 font-bold text-brand-ink">
            Yummy Labs
          </h1>
        </div>
        <p className="text-14 leading-[1.6] text-neutral-400">
          Design accelerator I co-founded to help designers grow through real
          startup sprints
        </p>
      </div>

      {/* Dog mascot - hidden on mobile, sits behind the next section */}
      {dogUrl && (
        <div className="pointer-events-none absolute bottom-0 right-0 z-0 hidden w-[112px] translate-y-[50%] lg:block">
          <Img src={dogUrl} alt="Yummy Labs Dog" className="block w-full" />
        </div>
      )}
    </header>
  );
}

/* ═══════════════════════════════════
   Section 2 — Problem + Role
   ═══════════════════════════════════ */
function ProblemAndRole() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative z-10 flex flex-col gap-5 lg:flex-row">
      {/* The Problem card */}
      <div className="flex-shrink-0 rounded-3xl bg-[#2216ff] p-6 text-white lg:w-[540px]">
        <span className="mb-[13px] inline-flex items-center rounded-md bg-white/90 px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-[#7c3aed]">
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
            mile away.
          </p>
          <p>
            I wanted to build something different: real products, real
            constraints, real shipped work.
          </p>
        </div>
        <a
          href={YUMMY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-body text-[14px] font-semibold text-[#2216ff] transition-colors hover:bg-white/90"
        >
          Visit yummy-labs.com
        </a>
      </div>

      {/* My Role card */}
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
              className="flex items-center gap-1.5 rounded-lg bg-sand-50 px-3 py-2"
            >
              <motion.span
                className="text-[14px]"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.07, type: "spring", stiffness: 200, damping: 12 }}
              >
                {role.icon}
              </motion.span>
              <span className="font-body text-[13px] font-medium text-neutral-700">
                {role.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 3 — Stats
   ═══════════════════════════════════ */
/* Stat icons — clean SVG icons replacing emojis */
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

function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
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
  );
}

/* ═══════════════════════════════════
   Section 4 — How It Works
   ═══════════════════════════════════ */
function HowItWorks() {
  return (
    <div className="rounded-3xl border border-sand-300 bg-white p-6">
      <span className="mb-[13px] inline-flex items-center rounded-md bg-sand-100 px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-sand-600">
        How it works
      </span>
      <h3 className="mb-4 font-brand text-[20px] font-bold leading-tight text-gray-800">
        2-week sprints. Real startups. Shipped products.
      </h3>

      <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-[35px]">
        {/* Week 1 */}
        <div className="relative w-full flex-1 rounded-2xl border border-[#7c3aed] bg-[#ede9fe] p-[17px]">
          <span className="mb-[10px] inline-block rounded-md bg-[#7c3aed] px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-white">
            Week 1
          </span>
          <div className="mb-[6px] font-brand text-[14px] font-bold text-[#5b21b6]">
            Discover & Frame
          </div>
          <div className="text-[12px] leading-relaxed text-gray-500">
            Access real startup data, understand constraints, frame the problem
            with AI tools
          </div>
          {/* Arrow */}
          <span className="absolute -right-[27px] top-1/2 hidden -translate-y-1/2 font-body text-[20px] font-bold text-[#7c3aed] lg:block">
            {"\u2192"}
          </span>
        </div>

        {/* Week 2 */}
        <div className="w-full flex-1 rounded-2xl border border-[#7c3aed] bg-[#ede9fe] p-[17px]">
          <span className="mb-[10px] inline-block rounded-md bg-[#7c3aed] px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-white">
            Week 2
          </span>
          <div className="mb-[6px] font-brand text-[14px] font-bold text-[#5b21b6]">
            Design & Ship
          </div>
          <div className="text-[12px] leading-relaxed text-gray-500">
            Design core flows, run user tests, ship a working prototype to
            production
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 5 — Partners
   ═══════════════════════════════════ */
function Partners({ assets }: { assets: YummyAssetsMap }) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      {/* Startup Partners */}
      <div className="flex-1 rounded-3xl border border-sand-300 bg-white p-6">
        <span className="mb-4 inline-flex items-center rounded-md bg-sand-100 px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-sand-600">
          Startup partners
        </span>
        <div className="flex flex-col gap-3 sm:flex-row">
          {partners.map((partner) => {
            const logoUrl = assets.partnerLogos[partner.slug];
            return (
              <div
                key={partner.name}
                className="flex-1 rounded-2xl border border-sand-300 bg-sand-100 p-4 text-center"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-neutral-50">
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
          Free tool access for every sprinter
        </h3>
        <div className="flex flex-col flex-wrap gap-3 sm:flex-row">
          {tools.map((tool) => {
            const logoUrl = assets.toolLogos[tool.slug];
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
   Section 6 — Testimonials
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
   Section 7 — Gallery
   ═══════════════════════════════════ */
const tiltClasses = [
  "-rotate-1",
  "rotate-[1.5deg]",
  "-rotate-[0.5deg]",
  "rotate-1",
  "-rotate-[1.5deg]",
  "rotate-[0.5deg]",
];

function Gallery({ assets }: { assets: YummyAssetsMap }) {
  // Render directly from Notion — no hardcoded list needed
  const items = assets.gallery.filter((g) => g.imageUrl);

  if (items.length === 0) return null;

  return (
    <div className="mt-2">
      <span className="mb-5 inline-flex items-center rounded-md bg-sand-100 px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-sand-600">
        Behind the scenes
      </span>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((item, idx) => (
          <div
            key={item.slug}
            className={`mb-4 overflow-hidden rounded-2xl border border-sand-300 bg-neutral-50 break-inside-avoid transition-all hover:scale-[1.02] hover:border-[#2216ff] hover:rotate-0 ${tiltClasses[idx % tiltClasses.length] || ""}`}
          >
            <Img src={item.imageUrl} alt={item.name} className="w-full rounded-2xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 8 — Lab Experiments
   ═══════════════════════════════════ */

function FloatingOrb({ delay, size, x, y, color }: { delay: number; size: number; x: string; y: string; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{ width: size, height: size, left: x, top: y, background: color, filter: "blur(1px)" }}
      animate={{
        y: [0, -8, 0, 6, 0],
        x: [0, 4, -3, 2, 0],
        opacity: [0.3, 0.6, 0.4, 0.55, 0.3],
      }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function LabExperiments() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const experiment = labExperiments[0];
  if (!experiment) return null;

  return (
    <div ref={ref} className="mt-2">
      <span className="mb-5 inline-flex items-center rounded-md bg-sand-100 px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-sand-600">
        Lab experiments
      </span>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl border border-sand-300"
        style={{
          background: "linear-gradient(145deg, #0D0B2E 0%, #1a1145 40%, #0f0a30 100%)",
        }}
      >
        {/* Floating ambient orbs — the visual metaphor */}
        <div className="pointer-events-none absolute inset-0">
          <FloatingOrb delay={0} size={60} x="8%" y="15%" color="rgba(124,92,255,0.25)" />
          <FloatingOrb delay={1.2} size={40} x="75%" y="20%" color="rgba(99,179,255,0.2)" />
          <FloatingOrb delay={0.6} size={50} x="60%" y="65%" color="rgba(168,130,255,0.2)" />
          <FloatingOrb delay={2} size={35} x="25%" y="75%" color="rgba(255,155,200,0.15)" />
          <FloatingOrb delay={0.8} size={28} x="85%" y="60%" color="rgba(130,220,255,0.18)" />
          <FloatingOrb delay={1.5} size={45} x="45%" y="10%" color="rgba(100,80,255,0.2)" />

          {/* Subtle grid lines — hint of spatial structure */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 p-7 lg:p-8">
          {/* Status badge */}
          <div className="mb-5 flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-amber-300 backdrop-blur-sm">
              <span className="relative flex h-[6px] w-[6px]">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
                <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-amber-400" />
              </span>
              In progress
            </span>
            <span className="text-[11px] text-white/30">{experiment.platform}</span>
          </div>

          {/* Title area */}
          <div className="mb-6 max-w-2xl">
            <motion.h3
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-2 font-brand text-[28px] font-extrabold leading-tight text-white"
            >
              {experiment.icon} {experiment.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-1 font-brand text-[16px] font-medium text-white/60"
            >
              {experiment.tagline}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-[14px] leading-relaxed text-white/45"
            >
              {experiment.description}
            </motion.p>
          </div>

          {/* Feature list — 2 columns */}
          <div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {experiment.features.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -8 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.07, duration: 0.4 }}
                className="flex items-start gap-2 rounded-xl bg-white/[0.05] px-3.5 py-2.5 backdrop-blur-sm"
              >
                <span className="mt-0.5 text-[10px] text-purple-400">●</span>
                <span className="text-[13px] leading-snug text-white/70">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {experiment.tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + i * 0.05, type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] font-medium text-white/50"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 9 — CTA
   ═══════════════════════════════════ */
function CtaSection() {
  return (
    <div className="mt-6 text-center">
      <a
        href={YUMMY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-[#2216ff] px-6 py-3 font-body text-[14px] font-semibold text-white shadow-[0_4px_16px_rgba(34,22,255,0.25)] transition-colors hover:bg-[#1a11cc]"
      >
        Visit yummy-labs.com
        <ExternalArrow />
      </a>
    </div>
  );
}

/* ═══════════════════════════════════
   Main Page
   ═══════════════════════════════════ */
export function YummyLabsPage({ assets }: YummyLabsPageProps) {
  return (
    <PageEntrance>
      <Header assets={assets} />
      <ProblemAndRole />
      <Stats />
      <HowItWorks />
      <Partners assets={assets} />
      <Testimonials assets={assets} />
      <Gallery assets={assets} />
      <LabExperiments />
      <CtaSection />
    </PageEntrance>
  );
}
