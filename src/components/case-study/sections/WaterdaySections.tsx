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
};

/* ─── Color palette (ocean-inspired) ─── */
const waterdayColors = [
  { name: "Deep Ocean", hex: "#002B35" },
  { name: "Reef Teal", hex: "#0A3A3F" },
  { name: "Cyan", hex: "#00B3C7" },
  { name: "Aqua", hex: "#0DD3E8" },
  { name: "Lagoon", hex: "#6CE5F0" },
  { name: "Mist", hex: "#B6D7DB" },
  { name: "Foam", hex: "#E6F6F8" },
  { name: "Wave Blue", hex: "#1A6F7A" },
  { name: "Sand", hex: "#F5F0E8" },
  { name: "White", hex: "#FFFFFF" },
];

/* ─── Typography ─── */
const fontUrl = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap";
const typeSamples = [
  {
    label: "Display",
    text: "Welcome to your very own personal water space.",
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 700,
    fontSize: 42,
    letterSpacing: "-0.02em",
  },
  {
    label: "Heading",
    text: "Bold. Personal. Action-driven. Reflective.",
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 600,
    fontSize: 26,
    letterSpacing: "-0.01em",
  },
  {
    label: "Body",
    text: "A platform that teaches you better habits through daily stories, habits, and facts. Designed for Gen Z, built for everyone who cares about water.",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 1.7,
  },
];

/* ═══════════════════════════════════
   Section 1 — Our Role
   ═══════════════════════════════════ */
function RoleSection({ accentColor }: { accentColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const activities = [
    "Led the product strategy, UX, and full visual direction from concept to MVP",
    "Defined the platform structure and core user flows",
    "Designed habit-based interactions and daily story mechanics",
    "Built the entire design system from scratch",
    "Established typography, color logic, components, and interaction principles",
  ];

  return (
    <div ref={ref} className="mx-auto max-w-3xl">
      <SectionReveal>
        <SectionLabel label="Our Role" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          From concept to MVP
        </h2>
        <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
          We led the product strategy, UX, and full visual direction for
          Water.day &mdash; from defining the platform structure to designing
          the core user flows and building the entire design system from
          scratch.
        </p>
      </SectionReveal>

      <div className="mt-6 space-y-2">
        {activities.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.35, delay: 0.2 + i * 0.07, ease: "easeOut" }}
            className="flex items-start gap-3 rounded-lg border border-sand-200 bg-white px-4 py-3"
          >
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-11 font-bold text-white"
              style={{ backgroundColor: accentColor }}
            >
              {i + 1}
            </span>
            <p className="text-14 leading-relaxed text-neutral-600">{a}</p>
          </motion.div>
        ))}
      </div>

      {/* Hero stat */}
      <SectionReveal delay={0.4} className="mt-8 text-center">
        <div className="rounded-xl bg-[#002B35] p-8">
          <div className="font-brand text-48 font-bold text-[#00B3C7]">70%</div>
          <p className="mt-1 text-14 text-[#B6D7DB]">of your body is water</p>
        </div>
      </SectionReveal>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 2 — Design System
   ═══════════════════════════════════ */
function DesignSystemSection({ accentColor }: { accentColor: string }) {
  return (
    <div className="mx-auto max-w-3xl">
      <SectionReveal>
        <SectionLabel label="Design System" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          An ocean-inspired design language
        </h2>
        <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
          We built Water.day&apos;s design system from scratch to turn an
          abstract mission into a cohesive digital language. A deep,
          ocean-inspired palette, clean editorial typography, and generous
          spacing create a calm, reflective atmosphere.
        </p>
      </SectionReveal>

      <div className="mt-10">
        <h3 className="mb-4 text-14 font-semibold text-brand-ink">Color Palette</h3>
        <ColorPalette colors={waterdayColors} />
      </div>

      <div className="mt-10">
        <h3 className="mb-4 text-14 font-semibold text-brand-ink">Typography</h3>
        <TypeShowcase
          fontName="Outfit"
          fontCategory="Geometric Sans-Serif"
          samples={typeSamples}
          googleFontUrl={fontUrl}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 3 — The Water Platform
   ═══════════════════════════════════ */
function PlatformSection({ accentColor }: { accentColor: string }) {
  return (
    <div className="mx-auto max-w-4xl">
      <SectionReveal className="mx-auto max-w-3xl">
        <SectionLabel label="The Platform" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Move with the flow
        </h2>
        <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
          We designed Water.day as an editorial-first digital experience that
          blends storytelling, micro-learning, and daily reflection. The UX
          prioritizes calm exploration, clear hierarchy, and frictionless
          navigation.
        </p>
      </SectionReveal>

      {/* Platform screenshot in laptop frame */}
      <SectionReveal delay={0.2} className="mt-10">
        <div
          className="mx-auto w-full max-w-[800px]"
          style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15)) drop-shadow(0 8px 16px rgba(0,0,0,0.1))" }}
        >
          <div className="overflow-hidden rounded-t-[10px] border-[6px] border-b-[18px] border-[#1d1d1f] bg-[#1d1d1f]">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
              <Image
                src={IMAGES.waterPhoto1}
                alt="Water.day editorial platform"
                fill
                unoptimized
                className="object-cover object-top"
                sizes="(max-width: 800px) 100vw, 800px"
              />
            </div>
          </div>
          <div
            className="mx-auto h-[8px] rounded-b-md"
            style={{ width: "104%", marginLeft: "-2%", background: "linear-gradient(180deg, #3a3a3c 0%, #1d1d1f 100%)" }}
          />
        </div>
      </SectionReveal>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 4 — Daily Stories & Habits (NEW — Written by me)
   ═══════════════════════════════════ */
function StoriesSection({ accentColor }: { accentColor: string }) {
  const slides = [
    { src: IMAGES.phone1, alt: "Water.day — daily story feed", caption: "Bite-sized water stories delivered every morning" },
    { src: IMAGES.phone2, alt: "Water.day — habit tracker", caption: "Gentle habit tracking that celebrates consistency" },
    { src: IMAGES.phone3, alt: "Water.day — streak display", caption: "Streaks and milestones that keep users engaged" },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <SectionReveal>
        <SectionLabel label="Core Experience" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Daily stories &amp; habits
        </h2>
        <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
          At the heart of Water.day is a daily rhythm: each morning, users
          receive a short, beautifully designed story about water &mdash; from
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
              <p className="mt-1 text-12 text-neutral-400">{f.desc}</p>
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
    <div className="mx-auto max-w-3xl">
      <SectionReveal>
        <SectionLabel label="Personalization" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Making water personal
        </h2>
        <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
          Water is universal, but our relationship with it is deeply personal.
          The onboarding flow learns what matters to each user &mdash; are
          they drawn to ocean conservation? Curious about hydration science?
          Interested in water infrastructure? This shapes the content they
          see, making every session feel tailored rather than generic.
        </p>
      </SectionReveal>

      <SectionReveal delay={0.2} className="mt-8">
        {/* Single phone frame with onboarding */}
        <div
          className="mx-auto w-full max-w-[280px]"
          style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15)) drop-shadow(0 8px 16px rgba(0,0,0,0.1))" }}
        >
          <div className="overflow-hidden rounded-[40px] border-[8px] border-[#1d1d1f] bg-[#1d1d1f]">
            <div className="relative overflow-hidden rounded-[32px] bg-black">
              <div className="absolute left-1/2 top-[10px] z-20 h-[22px] w-[80px] -translate-x-1/2 rounded-full bg-black" />
              <div className="relative aspect-[9/19.5] w-full overflow-hidden bg-white">
                <Image
                  src={IMAGES.phone4}
                  alt="Water.day onboarding — preference selection"
                  fill
                  unoptimized
                  className="object-cover object-top"
                  sizes="280px"
                />
              </div>
              <div className="absolute bottom-[6px] left-1/2 z-20 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-white/30" />
            </div>
          </div>
        </div>
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
    <div ref={ref} className="mx-auto max-w-3xl">
      <SectionReveal>
        <SectionLabel label="Design Philosophy" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Calm by design
        </h2>
        <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
          Most wellness apps overwhelm. Water.day does the opposite. Every
          design decision &mdash; from spacing to animation speed to color
          temperature &mdash; serves a single purpose: create a space where
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
            <p className="mt-2 text-13 leading-relaxed text-neutral-500">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 7 — Where It's Heading (NEW)
   ═══════════════════════════════════ */
function VisionSection({ accentColor }: { accentColor: string }) {
  return (
    <SectionReveal className="mx-auto max-w-3xl">
      <SectionLabel label="Vision" accentColor={accentColor} />
      <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
        Where it&apos;s heading
      </h2>
      <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
        Water.day is more than an app &mdash; it&apos;s the start of a
        movement to make water literacy part of daily life. The platform is
        designed to grow: community features will let users share discoveries
        and challenge friends. Localized content will connect people to the
        water stories in their own neighborhoods. And partnerships with
        conservation organizations will turn awareness into real-world impact.
      </p>

      {/* Vision gradient card */}
      <div
        className="mt-8 overflow-hidden rounded-xl p-8 text-center"
        style={{
          background: `linear-gradient(135deg, #002B35 0%, ${accentColor} 100%)`,
        }}
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
      <div className="mt-6 grid grid-cols-3 gap-3">
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
            <div className="mt-1 text-12 text-neutral-400">{f.desc}</div>
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
    <div className="flex flex-col gap-20">
      <RoleSection accentColor={accentColor} />
      <DesignSystemSection accentColor={accentColor} />
      <PlatformSection accentColor={accentColor} />
      <StoriesSection accentColor={accentColor} />
      <PersonalizationSection accentColor={accentColor} />
      <CalmDesignSection accentColor={accentColor} />
      <VisionSection accentColor={accentColor} />
    </div>
  );
}
