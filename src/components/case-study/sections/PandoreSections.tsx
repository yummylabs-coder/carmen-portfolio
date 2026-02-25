"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import {
  SectionReveal,
  ColorPalette,
  TypeShowcase,
  DeviceMockupCarousel,
} from "@/components/case-study/interactive";
import { SectionLabel } from "@/components/case-study/SectionLabel";

/* ─── Image URLs from Framer CDN ─── */
const IMAGES = {
  // Landing page screenshots (3405x1996 PNGs)
  landingPage1:
    "https://framerusercontent.com/images/75dHr9QnYRHv9zySkgj6ivCIsvg.png?scale-down-to=2048",
  landingPage2:
    "https://framerusercontent.com/images/M1wwY05eiVlMqTZeJvQyokkKx4E.png?scale-down-to=2048",
  landingPage3:
    "https://framerusercontent.com/images/bHBAdn4tplZqHIqkC6MY8nKAk.png?scale-down-to=2048",
  landingPage4:
    "https://framerusercontent.com/images/fpzJ6f8ATerGdzN1pDvtp1sZo.png?scale-down-to=2048",
  // Modular symbol / logo
  symbolLight:
    "https://framerusercontent.com/images/2N3bVoCnJWv4to1JsSbnzcdn8.svg",
  symbolDark:
    "https://framerusercontent.com/images/hGp11EcK0FAjkytECUslGilwh10.svg",
  // Brand patterns (wide SVGs)
  patternBanner1:
    "https://framerusercontent.com/images/YuRmBkEXVJkeWMOHgvrF6oib4yY.svg?scale-down-to=2048",
  patternBanner2:
    "https://framerusercontent.com/images/tL46yqONRrIRo21nM7TS8wmbI3A.svg?scale-down-to=2048",
  // Other visuals
  cubeIso:
    "https://framerusercontent.com/images/RiVHq8wJuiIKVboMbPI4dsRBkc.svg",
  graphVisual:
    "https://framerusercontent.com/images/hTHOUYCMnQvw5XayCE5rEgc31P4.svg",
};

/* ─── Color Palette Data ─── */
const pandoreColors = [
  { name: "Deep Navy", hex: "#0B1926" },
  { name: "Midnight Blue", hex: "#112D42" },
  { name: "Electric Blue", hex: "#3A4EFF" },
  { name: "Bright Blue", hex: "#5B6CFF" },
  { name: "Sky Blue", hex: "#8B9AFF" },
  { name: "Slate", hex: "#3A5068" },
  { name: "Cloud", hex: "#ADC1D3" },
  { name: "Ice", hex: "#D7E3EE" },
  { name: "Snow", hex: "#F9F8FD" },
  { name: "Growth Green", hex: "#34D399" },
];

/* ─── Type Showcase Data ─── */
const ralewayUrl =
  "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800&display=swap";

const ralewaySamples = [
  {
    label: "Display",
    text: "Make AI stick.",
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 800,
    fontSize: 48,
    letterSpacing: "-0.02em",
  },
  {
    label: "Heading",
    text: "Turning pilot projects into lasting progress.",
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 600,
    fontSize: 28,
    letterSpacing: "-0.01em",
  },
  {
    label: "Body",
    text: "We help teams move from AI theory to real-world traction. Using strategies built to stick, and tech people actually want to adopt.",
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 1.7,
  },
];

/* ═══════════════════════════════════
   Section 1 — The Challenge
   ═══════════════════════════════════ */
function ChallengeSection({ accentColor }: { accentColor: string }) {
  return (
    <SectionReveal className="mx-auto max-w-3xl">
      <SectionLabel label="The Challenge" accentColor={accentColor} />
      <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
        Building credibility from day one
      </h2>
      <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
        As they entered the market, Pandore needed a brand that looked credible
        from day one &mdash; sharp, future-facing, and human, without being
        overdesigned. They weren&apos;t looking for a full brand universe, just a
        strong, scalable foundation. Something they could launch quickly to build
        trust with partners, clients, and investors.
      </p>
      <p className="mt-3 text-16 leading-[1.8] text-neutral-600">
        Alongside it, a clear landing page to start attracting clients and
        establish a confident online presence.
      </p>
    </SectionReveal>
  );
}

/* ═══════════════════════════════════
   Section 2 — Defined the Voice
   ═══════════════════════════════════ */
function VoiceSection({ accentColor }: { accentColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const quotes = [
    "We help teams move from AI theory to real-world traction. Using strategies built to stick, and tech people actually want to adopt.",
    "AI is only as powerful as the people ready to use it. We help organizations get there \u2014 one practical step at a time.",
  ];

  return (
    <div ref={ref} className="mx-auto max-w-3xl">
      <SectionReveal>
        <SectionLabel label="Brand Voice" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Defined the voice
        </h2>
        <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
          Pandore needed to sound like what they are: experts in AI with a
          deeply human approach. We created a brand voice that balances
          authority with warmth &mdash; confident, clear, and relatable to both
          startups and established firms.
        </p>
      </SectionReveal>

      <div className="mt-8 space-y-4">
        {quotes.map((quote, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            animate={
              isInView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: i % 2 === 0 ? -30 : 30 }
            }
            transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease: "easeOut" }}
            className="relative rounded-xl border-l-4 bg-[#0B1926] p-5"
            style={{ borderLeftColor: accentColor }}
          >
            <p className="text-15 leading-[1.7] text-[#D7E3EE] italic">
              &ldquo;{quote}&rdquo;
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 3 — Color System
   ═══════════════════════════════════ */
function ColorSystemSection({ accentColor }: { accentColor: string }) {
  return (
    <div className="mx-auto max-w-3xl">
      <SectionReveal>
        <SectionLabel label="Color System" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Curated the color system
        </h2>
        <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
          We designed a palette that reflects Pandore&apos;s dual nature:
          forward-looking and deeply human. Deep blue signals trust and
          expertise. A vibrant electric blue adds energy and modernity. Soft
          neutrals and a grounded green bring warmth, growth, and balance.
        </p>
      </SectionReveal>

      <div className="mt-8">
        <ColorPalette colors={pandoreColors} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 4 — Type System
   ═══════════════════════════════════ */
function TypeSystemSection({ accentColor }: { accentColor: string }) {
  return (
    <div className="mx-auto max-w-3xl">
      <SectionReveal>
        <SectionLabel label="Typography" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Curated a type system
        </h2>
        <p className="mt-4 mb-8 text-16 leading-[1.8] text-neutral-600">
          Selected a typeface that feels modern and intelligent, but still warm.
          The rounded geometry and open shapes of Raleway strike a balance
          between precision and approachability &mdash; perfect for a brand
          rooted in both tech and trust.
        </p>
      </SectionReveal>

      <TypeShowcase
        fontName="Raleway"
        fontCategory="Geometric Sans-Serif"
        samples={ralewaySamples}
        googleFontUrl={ralewayUrl}
      />
    </div>
  );
}

/* ═══════════════════════════════════
   Section 5 — Modular Symbol
   ═══════════════════════════════════ */
function SymbolSection({ accentColor }: { accentColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="mx-auto max-w-3xl">
      <SectionReveal>
        <SectionLabel label="Brand Mark" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Created a modular symbol
        </h2>
        <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
          We designed a mark that&apos;s simple, smart, and full of meaning: an
          isometric cube that subtly hides a &ldquo;P.&rdquo; It evokes
          building blocks, systems thinking, and scalable ideas &mdash; core to
          Pandore&apos;s work in AI strategy.
        </p>
      </SectionReveal>

      {/* Logo display */}
      <div className="mt-10 flex items-center justify-center gap-10">
        {/* Light version (on dark) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1, rotateY: 0 }
              : { opacity: 0, scale: 0.8, rotateY: -20 }
          }
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="flex h-[200px] w-[200px] items-center justify-center rounded-2xl bg-[#0B1926]"
        >
          <div className="relative h-[120px] w-[120px]">
            <Image
              src={IMAGES.symbolDark}
              alt="Pandore symbol on dark"
              fill
              className="object-contain"
              sizes="120px"
            />
          </div>
        </motion.div>

        {/* Dark version (on light) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1, rotateY: 0 }
              : { opacity: 0, scale: 0.8, rotateY: 20 }
          }
          transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
          className="flex h-[200px] w-[200px] items-center justify-center rounded-2xl border border-sand-200 bg-white"
        >
          <div className="relative h-[120px] w-[120px]">
            <Image
              src={IMAGES.symbolLight}
              alt="Pandore symbol on light"
              fill
              className="object-contain"
              sizes="120px"
            />
          </div>
        </motion.div>
      </div>

      <p className="mt-6 text-center text-13 text-neutral-400">
        The emblem works in static and dynamic formats, creating flexible brand
        patterns across media.
      </p>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 6 — Brand Patterns
   ═══════════════════════════════════ */
function PatternsSection({ accentColor }: { accentColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const patterns = [
    { label: "Transform", description: "From early implementation to structured adoption" },
    { label: "Adapt", description: "Flexible strategies that fit each organization" },
    { label: "Scale", description: "Systems designed for long-term scalability" },
  ];

  return (
    <div ref={ref} className="mx-auto max-w-3xl">
      <SectionReveal>
        <SectionLabel label="Brand Patterns" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Built brand patterns around core values
        </h2>
        <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
          We extended the emblem into a modular system of patterns that mirror
          how Pandore helps clients grow: transform, adapt, and scale. Each
          pattern visually reflects a key principle of AI adoption.
        </p>
      </SectionReveal>

      {/* Pattern banners */}
      <div className="mt-8 overflow-hidden rounded-xl border border-sand-200 bg-[#0B1926]">
        <div className="relative aspect-[12/1] w-full">
          <Image
            src={IMAGES.patternBanner1}
            alt="Pandore brand patterns"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      </div>

      {/* Pattern cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {patterns.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.1, ease: "easeOut" }}
            className="rounded-xl border border-sand-200 bg-white p-5 text-center"
          >
            <div
              className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg text-white"
              style={{ backgroundColor: accentColor }}
            >
              <span className="text-16 font-bold">{i + 1}</span>
            </div>
            <h4 className="text-15 font-semibold text-brand-ink">{p.label}</h4>
            <p className="mt-1 text-13 text-neutral-500">{p.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 7 — Outcome
   ═══════════════════════════════════ */
function OutcomeSection({ accentColor }: { accentColor: string }) {
  return (
    <SectionReveal className="mx-auto max-w-3xl">
      <SectionLabel label="Outcome" accentColor={accentColor} />
      <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
        A fast, future-ready brand
      </h2>
      <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
        Pandore launched with a brand that made them instantly credible to
        clients, partners, and investors &mdash; all in just three weeks.
      </p>

      {/* Highlight card */}
      <div
        className="mt-6 rounded-xl p-6 text-center"
        style={{ backgroundColor: `${accentColor}12` }}
      >
        <div className="font-brand text-40 font-bold" style={{ color: accentColor }}>
          3 weeks
        </div>
        <p className="mt-1 text-14 text-neutral-500">
          From kickoff to a fully launched brand identity, landing page, and
          pitch materials
        </p>
      </div>
    </SectionReveal>
  );
}

/* ═══════════════════════════════════
   Section 8 — The Landing Page
   ═══════════════════════════════════ */
function LandingPageSection({ accentColor }: { accentColor: string }) {
  const slides = [
    { src: IMAGES.landingPage1, alt: "Pandore landing page — hero section", caption: "Hero section with clear value proposition" },
    { src: IMAGES.landingPage2, alt: "Pandore landing page — AI landscape", caption: "Data-driven visualization of the AI adoption gap" },
    { src: IMAGES.landingPage3, alt: "Pandore landing page — solutions", caption: "Three-pillar solution framework" },
    { src: IMAGES.landingPage4, alt: "Pandore landing page — team", caption: "Team credibility and partner CTA" },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <SectionReveal className="mx-auto max-w-3xl">
        <SectionLabel label="The Landing Page" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Designed for instant trust
        </h2>
        <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
          We created a high-impact landing page that made Pandore&apos;s
          expertise visible from the first scroll. It wasn&apos;t about
          buzzwords &mdash; it was about making their sharp thinking and
          human-first approach feel tangible, fast.
        </p>
      </SectionReveal>

      <div className="mt-10">
        <DeviceMockupCarousel
          slides={slides}
          device="desktop"
          autoPlay={5000}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Main Export — PandoreSections
   ═══════════════════════════════════ */
interface PandoreSectionsProps {
  accentColor: string;
}

export function PandoreSections({ accentColor }: PandoreSectionsProps) {
  return (
    <div className="flex flex-col gap-20">
      <ChallengeSection accentColor={accentColor} />
      <VoiceSection accentColor={accentColor} />
      <ColorSystemSection accentColor={accentColor} />
      <TypeSystemSection accentColor={accentColor} />
      <SymbolSection accentColor={accentColor} />
      <PatternsSection accentColor={accentColor} />
      <OutcomeSection accentColor={accentColor} />
      <LandingPageSection accentColor={accentColor} />
    </div>
  );
}
