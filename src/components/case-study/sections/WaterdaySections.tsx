"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  SectionReveal,
  ColorPalette,
  DeviceMockupCarousel,
} from "@/components/case-study/interactive";
import { SectionLabel } from "@/components/case-study/SectionLabel";

/* ─── Image URLs from Framer CDN ─── */
const IMAGES = {
  // Phone mockups
  phone1: "https://framerusercontent.com/images/HAbJrmoeuFjSZdx3axktwbcZaI.png",
  phone2: "https://framerusercontent.com/images/YkYdQXlEG7IYMnY3RUQBCekuut8.png",
  phone3: "https://framerusercontent.com/images/s67gqsDvs9yCYYs6BdBqFmht6f8.png",
  phone4: "https://framerusercontent.com/images/OMd38KEMHWZHpQKJZNn3SLiezJY.png",
  // Laptop / platform screenshots
  platformSvg: "https://framerusercontent.com/images/5WCmARshfc7bHhSTunjOZ37Rdy8.svg",
  // Design system card
  designCard: "https://framerusercontent.com/images/YcZkoa2dpHuJj60A4jwlKdVFSk.png",
  // Photography
  waterPhoto1: "https://framerusercontent.com/images/PzjsoZiRdTIMDIziOg1Ss21dEYg.jpg?scale-down-to=2048",
  waterPhoto2: "https://framerusercontent.com/images/eEgD92MpuLSAyNcuPCMeHlo1cE.jpg?scale-down-to=2048",
  waterPhoto3: "https://framerusercontent.com/images/hsf0f5Xu0NfKFkPPKPmI3HMcXn0.jpg?scale-down-to=2048",
  // Decorative SVGs
  waveSvg: "https://framerusercontent.com/images/V3sxYyXgkY4QcM9KMOwXI8se4Y.svg",
  dropSvg: "https://framerusercontent.com/images/YvQCKBxq3QjE28WTds7WmMuwOo.svg",
  // Illustrations
  illustGlass: "/images/water-day/illust-glass.png",
  illustLemon: "/images/water-day/illust-lemon.png",
  illustOrange: "/images/water-day/illust-orange.png",
  illustTurtle: "/images/water-day/illust-turtle.png",
  illustPear: "/images/water-day/illust-pear.png",
  // Platform screens (desktop)
  platform1: "/images/water-day/platform-1.png",
  platform2: "/images/water-day/platform-2.png",
  platform3: "/images/water-day/platform-3.png",
  platform4: "/images/water-day/platform-4.png",
  platform5: "/images/water-day/platform-5.png",
  // Articles long-scroll (desktop)
  platformArticles: "/images/water-day/platform-articles.png",
  platformSidebar: "/images/water-day/platform-sidebar.png",
  // Habits screens
  habits1: "/images/water-day/habits-1.png",
  habits2: "/images/water-day/habits-2.png",
  habits3: "/images/water-day/habits-3.png",
  habits4: "/images/water-day/habits-4.png",
  habits5: "/images/water-day/habits-5.png",
  // Personalization screens
  personaPreferences: "/images/water-day/persona-preferences.png",
  personaProfile: "/images/water-day/persona-profile.png",
  personaHome: "/images/water-day/persona-home.png",
};

/* ─── Illustration strip config ─── */
const illustrations = [
  { src: IMAGES.illustGlass, alt: "Glass of water with ice and orange", float: { y: 8, rotate: 3, duration: 4.2, delay: 0 } },
  { src: IMAGES.illustLemon, alt: "Lemon with leaf", float: { y: 6, rotate: -2, duration: 5.0, delay: 0.5 } },
  { src: IMAGES.illustOrange, alt: "Orange half", float: { y: 10, rotate: 4, duration: 3.8, delay: 1.0 } },
  { src: IMAGES.illustTurtle, alt: "Sea turtle", float: { y: 7, rotate: -3, duration: 4.6, delay: 0.3 } },
  { src: IMAGES.illustPear, alt: "Pear", float: { y: 9, rotate: 2.5, duration: 5.2, delay: 0.8 } },
];

/* ─── Color palette (from Figma design system) ─── */
const waterdayColors = [
  // Brand Blue
  { name: "Brand Blue 700", hex: "#005761" },
  { name: "Brand Blue 600", hex: "#007C8A" },
  { name: "Brand Blue 500", hex: "#00B3C7" },
  { name: "Brand Blue 300", hex: "#61E2F2" },
  { name: "Brand Blue 200", hex: "#91E8F2" },
  { name: "Brand Blue 100", hex: "#C8F5FA" },
  // Warm Yellow
  { name: "Warm Yellow 700", hex: "#5E3F00" },
  { name: "Warm Yellow 600", hex: "#895E01" },
  { name: "Warm Yellow 500", hex: "#D59408" },
  { name: "Warm Yellow 300", hex: "#FFCE66" },
  { name: "Warm Yellow 200", hex: "#FFDE99" },
  { name: "Warm Yellow 100", hex: "#FFEFCC" },
  // Brand Orange
  { name: "Brand Orange 700", hex: "#592606" },
  { name: "Brand Orange 600", hex: "#752E00" },
  { name: "Brand Orange 500", hex: "#BF5817" },
  { name: "Brand Orange 300", hex: "#F29961" },
  { name: "Brand Orange 200", hex: "#F2B691" },
  { name: "Brand Orange 100", hex: "#FADBC8" },
  // Grey
  { name: "Grey 500", hex: "#596268" },
  { name: "Grey 400", hex: "#7B868F" },
  { name: "Grey 300", hex: "#99A8B2" },
  { name: "Grey 200", hex: "#C1CFD9" },
  { name: "Grey 100", hex: "#E1EAF0" },
];

/* ─── Typography (from Figma design system) ─── */
const fontUrl = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap";
/* ─── Type Scale (from Figma design system) ─── */
const HEADING_SCALE = [
  { level: "H1", size: 192, rem: "11.375rem", weight: 800, lineHeight: 210, displaySize: 44 },
  { level: "H2", size: 110, rem: "6.875rem", weight: 800, lineHeight: 130, displaySize: 36 },
  { level: "H3", size: 72, rem: "4.5rem", weight: 800, lineHeight: 90, displaySize: 30 },
  { level: "H4", size: 50, rem: "3.125rem", weight: 800, lineHeight: 62, displaySize: 26 },
  { level: "H5", size: 36, rem: "2.25rem", weight: 800, lineHeight: 50, displaySize: 22 },
  { level: "H6", size: 28, rem: "1.75rem", weight: 800, lineHeight: 36, displaySize: 20 },
];

const BODY_SCALE = [
  { level: "L / Regular", size: 20, rem: "1.25rem", weight: 400, lineHeight: 28 },
  { level: "L / Bold", size: 20, rem: "1.25rem", weight: 800, lineHeight: 28 },
  { level: "M / Regular", size: 16, rem: "1.00rem", weight: 400, lineHeight: 20 },
  { level: "M / Bold", size: 16, rem: "1.00rem", weight: 800, lineHeight: 20 },
  { level: "S / Regular", size: 14, rem: "0.875rem", weight: 400, lineHeight: 18 },
  { level: "S / Bold", size: 14, rem: "0.875rem", weight: 800, lineHeight: 18 },
];

/* ═══════════════════════════════════
   Section 1 — Our Role
   ═══════════════════════════════════ */
/* ─── Role grid items with animated SVG icons ─── */
const ROLE_ITEMS = [
  {
    title: "Product Strategy",
    desc: "Led vision, positioning, and roadmap from day one",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    title: "UX & Interaction",
    desc: "Defined core user flows and interaction patterns",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    title: "Visual Direction",
    desc: "Crafted the entire look, feel, and brand expression",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </svg>
    ),
  },
  {
    title: "Design System",
    desc: "Built tokens, components, and principles from scratch",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    title: "Habit Mechanics",
    desc: "Designed daily stories, streaks, and engagement loops",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "Platform Architecture",
    desc: "Structured the editorial content model and navigation",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

function RoleSection({ accentColor }: { accentColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="mx-auto w-full max-w-5xl">
      <SectionReveal>
        <SectionLabel label="My Role" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          From concept to MVP
        </h2>
        <p className="mt-4 max-w-[760px] text-16 leading-[1.8] text-neutral-600">
          I led the product strategy, UX, and full visual direction for
          Water.day, from defining the platform structure to designing
          the core user flows and building the entire design system from
          scratch.
        </p>
      </SectionReveal>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {ROLE_ITEMS.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.07, ease: "easeOut" }}
            className="group rounded-xl border border-sand-200 bg-white p-4"
          >
            <motion.div
              className="mb-3 flex size-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${accentColor}12`, color: accentColor }}
              whileHover={{ scale: 1.1, rotate: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {item.icon}
            </motion.div>
            <h4 className="text-14 font-semibold text-brand-ink">{item.title}</h4>
            <p className="mt-1 text-14 leading-[1.45] text-neutral-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 2 — Design System
   ═══════════════════════════════════ */
function DesignSystemSection({ accentColor }: { accentColor: string }) {
  const shouldReduce = useReducedMotion();
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduce ? ["0%", "0%"] : ["30%", "-60%"],
  );

  return (
    <>
    <div className="mx-auto w-full max-w-5xl overflow-hidden">
      <SectionReveal>
        <SectionLabel label="Design System" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          An ocean-inspired design language
        </h2>
        <p className="mt-4 max-w-[760px] text-16 leading-[1.8] text-neutral-600">
          I built Water.day&apos;s design system from scratch to turn an
          abstract mission into a cohesive digital language. A deep,
          ocean-inspired palette, clean editorial typography, and generous
          spacing create a calm, reflective atmosphere.
        </p>
      </SectionReveal>

      <div className="mt-10">
        <h3 className="mb-4 text-14 font-semibold text-brand-ink">Color Palette</h3>
        <ColorPalette colors={waterdayColors} />
      </div>

      {/* Typography */}
      <div className="mt-10">
        {/* Section header with meta badges */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <h3 className="text-14 font-semibold text-brand-ink">Typography</h3>
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-sand-200 bg-sand-50 px-2 py-0.5 font-mono text-[10px] text-neutral-500">
              Base: 16
            </span>
            <span className="rounded-md border border-sand-200 bg-sand-50 px-2 py-0.5 font-mono text-[10px] text-neutral-500">
              Scale: 1.5
            </span>
          </div>
        </div>

        {/* Load display fonts */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href={fontUrl} />

        {/* Outfit — Headings */}
        <div className="overflow-hidden rounded-xl border border-sand-200 bg-white">
          <div className="flex items-center justify-between border-b border-sand-200 px-3 py-3 sm:px-5">
            <div className="flex items-center gap-2">
              <span
                className="text-14 font-semibold text-brand-ink"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Outfit
              </span>
              <span className="text-12 text-neutral-600">Headings</span>
            </div>
            <span className="hidden rounded bg-sand-100 px-2 py-0.5 font-mono text-[10px] text-neutral-600 sm:inline">
              ExtraBold 800
            </span>
          </div>
          <div className="divide-y divide-sand-100">
            {HEADING_SCALE.map((h) => (
              <div key={h.level} className="flex items-center gap-3 px-3 py-3 sm:gap-4 sm:px-5">
                <span
                  className="w-7 shrink-0 font-mono text-[11px] font-medium sm:w-8"
                  style={{ color: accentColor }}
                >
                  {h.level}
                </span>
                <span
                  className="min-w-0 flex-1 truncate text-brand-ink"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: h.weight,
                    fontSize: h.displaySize,
                    lineHeight: 1.15,
                  }}
                >
                  Aa
                </span>
                <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px]">
                  <span className="text-neutral-500">{h.size}px</span>
                  <span className="hidden text-neutral-300 sm:inline">
                    {h.rem}
                  </span>
                  <span className="hidden text-neutral-300 sm:inline">↕ {h.lineHeight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manrope — Body */}
        <div className="mt-3 overflow-hidden rounded-xl border border-sand-200 bg-white">
          <div className="flex items-center justify-between border-b border-sand-200 px-3 py-3 sm:px-5">
            <div className="flex items-center gap-2">
              <span
                className="text-14 font-semibold text-brand-ink"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Manrope
              </span>
              <span className="text-12 text-neutral-600">Body</span>
            </div>
            <span className="hidden rounded bg-sand-100 px-2 py-0.5 font-mono text-[10px] text-neutral-600 sm:inline">
              Regular 400 · Bold 800
            </span>
          </div>
          <div className="divide-y divide-sand-100">
            {BODY_SCALE.map((b) => (
              <div key={b.level} className="flex items-center gap-3 px-3 py-3 sm:gap-4 sm:px-5">
                <span
                  className="w-16 shrink-0 font-mono text-[10px] font-medium sm:w-20 sm:text-[11px]"
                  style={{ color: accentColor }}
                >
                  {b.level}
                </span>
                <span
                  className="min-w-0 flex-1 truncate text-brand-ink"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: b.weight,
                    fontSize: b.size,
                    lineHeight: `${b.lineHeight}px`,
                  }}
                >
                  The quick brown fox jumps over
                </span>
                <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px]">
                  <span className="text-neutral-500">{b.size}px</span>
                  <span className="hidden text-neutral-300 sm:inline">
                    {b.rem}
                  </span>
                  <span className="hidden text-neutral-300 sm:inline">↕ {b.lineHeight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Component Examples */}
      <div className="mt-10">
        <h3 className="mb-4 text-14 font-semibold text-brand-ink">
          Component Examples
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { src: "/images/water-day/components/comp-hydration.png", alt: "Stay Hydrated card with tip and CTA" },
            { src: "/images/water-day/components/comp-intake.png", alt: "Daily water intake recommendation card" },
            { src: "/images/water-day/components/comp-profile.png", alt: "User profile card with avatar picker" },
            { src: "/images/water-day/components/comp-streak.png", alt: "Habit streak celebration card" },
          ].map((comp) => (
            <div
              key={comp.src}
              className="overflow-hidden rounded-xl border border-sand-200 bg-sand-50"
            >
              <Image
                src={comp.src}
                alt={comp.alt}
                width={360}
                height={300}
                className="h-auto w-full"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              />
            </div>
          ))}
        </div>
      </div>

    </div>

    {/* Full-bleed illustration strip — OUTSIDE overflow-hidden container */}
    <div
      ref={rowRef}
      className="mt-16 w-full overflow-hidden"
    >
      <motion.div
        className="flex items-center justify-center gap-8 sm:gap-12 md:gap-16"
        style={{ x }}
      >
        {illustrations.map((ill, i) => (
          <motion.div
            key={i}
            className="w-[clamp(120px,22vw,300px)] shrink-0"
            animate={
              shouldReduce
                ? {}
                : {
                    y: [-ill.float.y, ill.float.y, -ill.float.y],
                    rotate: [
                      -ill.float.rotate,
                      ill.float.rotate,
                      -ill.float.rotate,
                    ],
                  }
            }
            transition={{
              duration: ill.float.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: ill.float.delay,
            }}
          >
            <Image
              src={ill.src}
              alt={ill.alt}
              width={600}
              height={600}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 300px, 22vw"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
    </>
  );
}

/* ── Scrolling Laptop — auto-scrolls a tall screenshot inside a Mac frame ── */
function ScrollingLaptop({
  src,
  alt,
  sidebarSrc,
  inView,
  shouldReduce,
}: {
  src: string;
  alt: string;
  /** Optional sidebar image pinned to left while content scrolls */
  sidebarSrc?: string;
  inView: boolean;
  shouldReduce: boolean;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  const measure = useCallback(() => {
    if (contentRef.current && viewportRef.current) {
      const contentH = contentRef.current.scrollHeight;
      const viewportH = viewportRef.current.clientHeight;
      setScrollDistance(Math.max(0, contentH - viewportH));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(measure, 600);
    return () => clearTimeout(timer);
  }, [measure]);

  /* Sidebar is 272 / 1440 = 18.89% of the screen width */
  const sidebarWidthPct = "18.89%";

  return (
    <div
      className="mx-auto w-full max-w-[800px]"
      style={{
        filter:
          "drop-shadow(0 20px 40px rgba(0,0,0,0.15)) drop-shadow(0 8px 16px rgba(0,0,0,0.1))",
      }}
    >
      {/* Laptop lid */}
      <div className="overflow-hidden rounded-t-[10px] border-[6px] border-b-[18px] border-[#1d1d1f] bg-[#1d1d1f]">
        {/* Screen viewport — fixed 16:10 aspect, content scrolls inside */}
        <div
          ref={viewportRef}
          className="relative aspect-[16/10] w-full overflow-hidden bg-white"
        >
          {/* Scrolling full-page content */}
          <motion.div
            ref={contentRef}
            className="absolute inset-x-0 top-0 will-change-transform"
            animate={
              inView && !shouldReduce && scrollDistance > 0
                ? { y: [0, -scrollDistance, -scrollDistance, 0] }
                : { y: 0 }
            }
            transition={{
              duration: 22,
              ease: "easeInOut",
              repeat: Infinity,
              times: [0, 0.4, 0.6, 1],
              delay: 1.5,
            }}
          >
            <Image
              src={src}
              alt={alt}
              width={1440}
              height={3681}
              className="h-auto w-full"
              sizes="(max-width: 800px) 100vw, 800px"
              onLoad={measure}
            />
          </motion.div>

          {/* Pinned sidebar overlay — stays fixed while content scrolls */}
          {sidebarSrc && (
            <div
              className="absolute left-0 top-0 z-10 h-full"
              style={{ width: sidebarWidthPct }}
            >
              <Image
                src={sidebarSrc}
                alt=""
                width={272}
                height={900}
                className="h-full w-full object-cover object-top"
                sizes="160px"
                aria-hidden
              />
            </div>
          )}
        </div>
      </div>
      {/* Laptop base */}
      <div
        className="mx-auto h-[8px] rounded-b-md"
        style={{
          width: "104%",
          marginLeft: "-2%",
          background: "linear-gradient(180deg, #3a3a3c 0%, #1d1d1f 100%)",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════
   Section 3 — The Water Platform
   ═══════════════════════════════════ */
function PlatformSection({ accentColor }: { accentColor: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollInView = useInView(scrollRef, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-5xl">
      <SectionReveal>
        <SectionLabel label="The Platform" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Move with the flow
        </h2>
        <p className="mt-4 max-w-[760px] text-16 leading-[1.8] text-neutral-600">
          I designed Water.day as an editorial-first digital experience that
          blends storytelling, micro-learning, and daily reflection. The UX
          prioritizes calm exploration, clear hierarchy, and frictionless
          navigation.
        </p>
      </SectionReveal>

      {/* Platform screenshots in laptop carousel */}
      <SectionReveal delay={0.2} className="mt-10">
        <DeviceMockupCarousel
          slides={[
            { src: IMAGES.platform1, alt: "Water.day landing — Pause, Notice, Reflect", caption: "The landing experience" },
            { src: IMAGES.platform2, alt: "Water.day discover page", caption: "Curated editorial content" },
            { src: IMAGES.platform3, alt: "Water.day article view", caption: "Immersive reading experience" },
            { src: IMAGES.platform4, alt: "Water.day habits dashboard", caption: "Daily habit tracking" },
            { src: IMAGES.platform5, alt: "Water.day community wall", caption: "Community & connection" },
          ]}
          device="laptop"
          autoPlay={5000}
        />
      </SectionReveal>

      {/* Scrolling articles deep-dive */}
      <div ref={scrollRef} className="mt-14">
        <SectionReveal delay={0.1}>
          <p className="mb-6 text-center text-13 font-medium uppercase tracking-[1.5px] text-neutral-600">
            The article experience
          </p>
          <ScrollingLaptop
            src={IMAGES.platformArticles}
            alt="Water.day article reading experience — full editorial layout"
            sidebarSrc={IMAGES.platformSidebar}
            inView={scrollInView}
            shouldReduce={!!shouldReduce}
          />
        </SectionReveal>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 4 — Daily Stories & Habits (NEW — Written by me)
   ═══════════════════════════════════ */
function StoriesSection({ accentColor }: { accentColor: string }) {
  const slides = [
    { src: IMAGES.habits1, alt: "Water.day — start your habit journey", caption: "Starting your water habit journey" },
    { src: IMAGES.habits2, alt: "Water.day — habit setup", caption: "Setting daily hydration goals" },
    { src: IMAGES.habits3, alt: "Water.day — habit tracking", caption: "Gentle tracking that celebrates consistency" },
    { src: IMAGES.habits4, alt: "Water.day — habit streaks", caption: "Streaks and milestones keep users engaged" },
    { src: IMAGES.habits5, alt: "Water.day — habit completed celebration", caption: "Celebrating daily wins" },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl">
      <SectionReveal>
        <SectionLabel label="Core Experience" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Daily stories &amp; habits
        </h2>
        <p className="mt-4 max-w-[760px] text-16 leading-[1.8] text-neutral-600">
          At the heart of Water.day is a daily rhythm: each morning, users
          receive a short, beautifully designed story about water, from
          ocean ecosystems to hydration science. The habit tracker turns
          awareness into action, celebrating streaks and small wins without
          guilt or pressure. It&apos;s learning that fits into the rhythm of
          your day, not against it.
        </p>
      </SectionReveal>

      <div className="mt-10">
        <DeviceMockupCarousel slides={slides} device="phone" autoPlay={4500} />
      </div>

      {/* Feature highlights */}
      <SectionReveal delay={0.3} className="mt-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { title: "Morning stories", desc: "1-min reads delivered daily" },
            { title: "Habit streaks", desc: "Track progress without pressure" },
            { title: "Water facts", desc: "Surprising truths that stick" },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-sand-200 bg-white p-4 text-center">
              <h4 className="text-14 font-semibold text-brand-ink">{f.title}</h4>
              <p className="mt-1 text-12 text-neutral-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </SectionReveal>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 5 — Making Water Personal (NEW)
   ═══════════════════════════════════ */
function PersonalizationSection({ accentColor }: { accentColor: string }) {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <SectionReveal>
        <SectionLabel label="Personalization" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Making water personal
        </h2>
        <p className="mt-4 max-w-[760px] text-16 leading-[1.8] text-neutral-600">
          Water is universal, but our relationship with it is deeply personal.
          The onboarding flow learns what matters to each user, are
          they drawn to ocean conservation? Curious about hydration science?
          Interested in water infrastructure? This shapes the content they
          see, making every session feel tailored rather than generic.
        </p>
      </SectionReveal>

      <SectionReveal delay={0.2} className="mt-8">
        <DeviceMockupCarousel
          slides={[
            { src: IMAGES.personaPreferences, alt: "Preference selection — what feels true for you", caption: "Choosing what resonates" },
            { src: IMAGES.personaProfile, alt: "Community profile — pick a water-inspired icon", caption: "Building a personal identity" },
            { src: IMAGES.personaHome, alt: "Personalized home — daily water habit", caption: "A home screen shaped by you" },
          ]}
          device="phone"
          autoPlay={4500}
        />
      </SectionReveal>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 6 — Calm by Design (NEW)
   ═══════════════════════════════════ */
function CalmDesignSection({ accentColor }: { accentColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const principles = [
    { title: "Generous whitespace", desc: "Every element breathes. Dense interfaces create anxiety; Water.day creates calm." },
    { title: "Muted micro-interactions", desc: "Subtle wave animations and gentle transitions echo the feeling of water itself." },
    { title: "Intentional color", desc: "Ocean-inspired tones shift from deep teal to soft cyan, guiding focus without distraction." },
    { title: "Progressive complexity", desc: "Simple on the surface, rich underneath. Users discover depth at their own pace." },
  ];

  return (
    <div ref={ref} className="mx-auto w-full max-w-5xl">
      <SectionReveal>
        <SectionLabel label="Design Philosophy" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Calm by design
        </h2>
        <p className="mt-4 max-w-[760px] text-16 leading-[1.8] text-neutral-600">
          Most wellness apps overwhelm. Water.day does the opposite. Every
          design decision, from spacing to animation speed to color
          temperature, serves a single purpose: create a space where
          learning about water feels as refreshing as water itself.
        </p>
      </SectionReveal>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {principles.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: "easeOut" }}
            className="rounded-xl border border-sand-200 bg-white p-5"
          >
            <h4 className="text-14 font-semibold text-brand-ink">{p.title}</h4>
            <p className="mt-2 text-14 leading-[1.45] text-neutral-500">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 7 — Outcomes
   Photo bg + headline left + glass cards right (like Neotaste)
   ═══════════════════════════════════ */
const WD_OUTCOMES = [
  {
    metric: "Full Design System",
    description:
      "Built a complete, scalable design system from scratch: tokens, components, and interaction principles ready for development.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    metric: "MVP-Ready Product",
    description:
      "Delivered a fully designed MVP with onboarding, daily stories, habit tracking, and personalized content flows.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" />
      </svg>
    ),
  },
  {
    metric: "Gen Z Engagement Model",
    description:
      "Designed habit-based mechanics and bite-sized content that resonate with how Gen Z actually learns and engages.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    metric: "Validated Direction",
    description:
      "Tested the editorial-first approach with target users and confirmed that calm, story-driven UX drives real engagement.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

function OutcomeSection({ accentColor }: { accentColor: string }) {
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
          src="/images/water-day/outcomes-bg.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
        {/* Dark overlay for legibility */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Gradient fade at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Content — split layout on desktop, stacked on mobile */}
      <div className="relative z-10 flex flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:gap-12 md:px-10 md:py-16">
        {/* Left — headline + intro */}
        <div className="flex flex-col md:w-[42%] md:sticky md:top-8 md:flex-shrink-0">
          <SectionReveal>
            <SectionLabel label="Outcomes" accentColor={accentColor} />
            <h2 className="mt-4 font-brand text-36 font-bold leading-[1.15] text-white mobile:text-28">
              What we delivered
            </h2>
            <p className="mt-4 max-w-[440px] text-17 leading-[1.55] text-white/80">
              In six weeks we went from blank canvas to a complete, validated
              product: design system, MVP screens, and a content model
              built for the way Gen&nbsp;Z actually learns.
            </p>
          </SectionReveal>
        </div>

        {/* Right — 2×2 outcome cards */}
        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
          {WD_OUTCOMES.map((o, i) => (
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
              style={{ backgroundColor: `${accentColor}12` }}
            >
              <div
                className="flex size-9 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
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
   Section 8 — Where It's Heading
   ═══════════════════════════════════ */
function VisionSection({ accentColor }: { accentColor: string }) {
  return (
    <SectionReveal className="mx-auto w-full max-w-5xl">
      <SectionLabel label="Vision" accentColor={accentColor} />
      <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
        Where it&apos;s heading
      </h2>
      <p className="mt-4 max-w-[760px] text-16 leading-[1.8] text-neutral-600">
        Water.day is more than an app &mdash; it&apos;s the start of a
        movement to make water literacy part of daily life. The platform is
        designed to grow: community features will let users share discoveries
        and challenge friends. Localized content will connect people to the
        water stories in their own neighborhoods. And partnerships with
        conservation organizations will turn awareness into real-world impact.
      </p>

      {/* Vision statement card */}
      <div
        className="mt-8 overflow-hidden rounded-xl p-8 text-center"
        style={{ backgroundColor: "#0C3640" }}
      >
        <p className="font-brand text-22 font-bold text-white">
          From passive consumption to conscious engagement.
        </p>
        <p className="mt-3 text-14 text-white/70">
          Water.day transforms how a generation thinks about the most essential
          resource on Earth.
        </p>
      </div>

      {/* Future features */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { label: "Community", desc: "Share & challenge" },
          { label: "Localized", desc: "Your water story" },
          { label: "Impact", desc: "Real-world action" },
        ].map((f) => (
          <div
            key={f.label}
            className="rounded-lg p-4 text-center"
            style={{ backgroundColor: `${accentColor}10` }}
          >
            <div className="text-14 font-semibold" style={{ color: accentColor }}>
              {f.label}
            </div>
            <div className="mt-1 text-12 text-neutral-600">{f.desc}</div>
          </div>
        ))}
      </div>
    </SectionReveal>
  );
}

/* ═══════════════════════════════════
   Main Export
   ═══════════════════════════════════ */
interface WaterdaySectionsProps {
  accentColor: string;
}

export function WaterdaySections({ accentColor }: WaterdaySectionsProps) {
  return (
    <div className="flex w-full flex-col gap-20">
      <RoleSection accentColor={accentColor} />
      <DesignSystemSection accentColor={accentColor} />
      <PlatformSection accentColor={accentColor} />
      <PersonalizationSection accentColor={accentColor} />
      <StoriesSection accentColor={accentColor} />
      <CalmDesignSection accentColor={accentColor} />
      <OutcomeSection accentColor={accentColor} />
      <VisionSection accentColor={accentColor} />
    </div>
  );
}
