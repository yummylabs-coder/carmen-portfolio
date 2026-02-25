"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import {
  SectionReveal,
  ColorPalette,
  TypeShowcase,
  DeviceMockupCarousel,
  AnimatedStats,
} from "@/components/case-study/interactive";
import { SectionLabel } from "@/components/case-study/SectionLabel";

/* ─── Image URLs from Framer CDN ─── */
const IMAGES = {
  // Website screenshots (desktop ratio)
  website1: "https://framerusercontent.com/images/GdDgVHSXV0oh656wOd1NtBiFE.png?scale-down-to=2048",
  website2: "https://framerusercontent.com/images/gI1TZl2l19xIFAEezG9DgZAJVg.png?scale-down-to=2048",
  website3: "https://framerusercontent.com/images/QiCSr8neFCjs9bTGySyufxoqcM.png?scale-down-to=2048",
  website4: "https://framerusercontent.com/images/kkm2Nu0rO5N0INFaOHj9disT1M8.png?scale-down-to=2048",
  // Dashboard screenshots
  dashboard1: "https://framerusercontent.com/images/59lK3G7cJD6LhsN1EC7gl58kMGI.png?scale-down-to=2048",
  dashboard2: "https://framerusercontent.com/images/9jHKHgfX7yymeEKLibg1pCooNRE.png?scale-down-to=2048",
  dashboard3: "https://framerusercontent.com/images/iKxYD9ukWMBik1l5odtyUSEM0s.png?scale-down-to=2048",
  dashboard4: "https://framerusercontent.com/images/S7l72gaE0w9zrdpHDnhHfrQXMsc.png?scale-down-to=2048",
  dashboard5: "https://framerusercontent.com/images/QChRUGxI6u4aZJuoeaSwPJeEL0.png?scale-down-to=2048",
  // Mobile app screenshots (phone ratio)
  mobile1: "https://framerusercontent.com/images/506sCItIdxPCESD0t1lT4ypGCw.png",
  mobile2: "https://framerusercontent.com/images/YsVHQhnAJuc6oafRZZiXJTIhVXg.png",
  mobile3: "https://framerusercontent.com/images/jM2XiVD5lnLHPjHctfw7i0o24hk.png",
  mobile4: "https://framerusercontent.com/images/n31zkjjthOvMULkDOx149bIY.png",
  mobile5: "https://framerusercontent.com/images/DIDgTV02xWHwuzFGpMMo4jgRQwE.png",
  mobile6: "https://framerusercontent.com/images/Qy59qIwsL6e8JvT4fJBdxT3bZg.png",
  mobile7: "https://framerusercontent.com/images/4p8AfMPUtwk2IQwf4E8TyR2m7VA.png",
  mobile8: "https://framerusercontent.com/images/uDDcpt25HucKKsf4dR0Z9QMvYw.png",
  mobile9: "https://framerusercontent.com/images/wmTxvgq0hORqYrbEUbZc8lwpkKY.png",
  mobile10: "https://framerusercontent.com/images/H0EVVyHj9WwS2L9yaALnhC6egA.png",
  // GIF animations
  gifWebsite: "https://framerusercontent.com/images/AFgP2BmwlxTJejXcSrsNlKNejg.gif",
  gifDashboard: "https://framerusercontent.com/images/lDgcXBkMYX8ZJDfbn13eVfqPFoc.gif",
  gifMobile: "https://framerusercontent.com/images/xyqfUYzZWFzLAmgtEvxCbUJ05XA.gif",
  gifBrand: "https://framerusercontent.com/images/FO9oIbKwj8ekX5pJz5VZJ9LuQ.gif",
  // Other visuals
  brandVisual: "https://framerusercontent.com/images/2wLHP9DH3eOiOkcb5gYAylPY5Yw.png?scale-down-to=2048",
  illustration: "https://framerusercontent.com/images/b9IF98zv72HRCES2eVslnuXkO2w.png",
  groupMockup: "https://framerusercontent.com/images/wQqt8qGcCbvA3l0RolTY2TnMuI.png?scale-down-to=2048",
  hero: "https://framerusercontent.com/images/OGBPVHHjaibVV9slNIVu5otm6o.png?scale-down-to=2048",
};

/* ─── Color palette ─── */
const learnColors = [
  { name: "Learn Gold", hex: "#FECB3A" },
  { name: "Warm Brown", hex: "#300101" },
  { name: "Cocoa", hex: "#503B00" },
  { name: "Brand Blue", hex: "#2216FF" },
  { name: "Electric Violet", hex: "#5B4FFF" },
  { name: "Coral", hex: "#FF6B6B" },
  { name: "Mint", hex: "#00D4AA" },
  { name: "Cream", hex: "#FFF8E1" },
  { name: "Off White", hex: "#FFFEFC" },
  { name: "Charcoal", hex: "#2C2C2C" },
];

/* ─── Typography ─── */
const fontUrl = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
const typeSamples = [
  {
    label: "Display",
    text: "Learning that actually sticks.",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: 44,
    letterSpacing: "-0.03em",
  },
  {
    label: "Heading",
    text: "Gamified. Social. AI-powered.",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: 28,
    letterSpacing: "-0.01em",
  },
  {
    label: "Body",
    text: "Lessons are short, engaging, and designed for busy teams. No more boring corporate training that nobody finishes.",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
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

  const areas = [
    { icon: "💻", label: "Web admin & dashboard", desc: "Makes content creation intuitive and efficient" },
    { icon: "📱", label: "Mobile learning app", desc: "Feels like 'TikTok for your brain'" },
    { icon: "🌐", label: "Marketing website", desc: "Tells the story with energy and clarity" },
  ];

  return (
    <div ref={ref} className="mx-auto max-w-3xl">
      <SectionReveal>
        <SectionLabel label="Our Role" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          From MVP to seed round
        </h2>
        <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
          We served as the dedicated design arm for Learn.xyz from day zero
          through their pre-seed and seed rounds &mdash; leading UX strategy,
          product design, and research across their entire ecosystem.
        </p>
      </SectionReveal>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {areas.map((a, i) => (
          <motion.div
            key={a.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease: "easeOut" }}
            className="rounded-xl border border-sand-200 bg-white p-5 text-center"
          >
            <div className="mb-2 text-28">{a.icon}</div>
            <h4 className="text-14 font-semibold text-brand-ink">{a.label}</h4>
            <p className="mt-1 text-12 text-neutral-400">{a.desc}</p>
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
  return (
    <div className="mx-auto max-w-3xl">
      <SectionReveal>
        <SectionLabel label="Design System" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Bold, joyful, unmistakable
        </h2>
        <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
          We created a brand system that sets Learn.xyz apart from the sea of
          dull, corporate learning tools. Playful yet professional &mdash;
          designed to spark curiosity and make learning feel exciting.
        </p>
      </SectionReveal>

      <div className="mt-10">
        <h3 className="mb-4 text-14 font-semibold text-brand-ink">Color Palette</h3>
        <ColorPalette colors={learnColors} />
      </div>

      <div className="mt-10">
        <h3 className="mb-4 text-14 font-semibold text-brand-ink">Typography</h3>
        <TypeShowcase
          fontName="Plus Jakarta Sans"
          fontCategory="Geometric Sans-Serif"
          samples={typeSamples}
          googleFontUrl={fontUrl}
        />
      </div>

      {/* Brand visual / GIF */}
      <SectionReveal delay={0.3} className="mt-10">
        <div className="overflow-hidden rounded-xl border border-sand-200">
          <div className="relative aspect-square w-full max-w-[400px] mx-auto">
            <Image
              src={IMAGES.gifBrand}
              alt="Learn.xyz brand animation"
              fill
              className="object-contain"
              sizes="400px"
              unoptimized
            />
          </div>
        </div>
      </SectionReveal>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 3 — The Website
   ═══════════════════════════════════ */
function WebsiteSection({ accentColor }: { accentColor: string }) {
  const slides = [
    { src: IMAGES.website1, alt: "Learn.xyz homepage", caption: "Playful homepage that makes the product feel exciting" },
    { src: IMAGES.website2, alt: "Learn.xyz features", caption: "Bold visuals and micro-interactions throughout" },
    { src: IMAGES.website3, alt: "Learn.xyz product page", caption: "Clear product storytelling with energy and clarity" },
    { src: IMAGES.website4, alt: "Learn.xyz team", caption: "Conversion-focused design with social proof" },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <SectionReveal className="mx-auto max-w-3xl">
        <SectionLabel label="Website" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Playful and conversion-focused
        </h2>
        <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
          We designed a website that made it instantly clear: this isn&apos;t
          your average workplace training tool. Bold visuals,
          micro-interactions, and joyful copy emphasize Learn.xyz&apos;s fresh
          approach to learning.
        </p>
      </SectionReveal>

      <div className="mt-10">
        <DeviceMockupCarousel slides={slides} device="desktop" autoPlay={5000} />
      </div>

      {/* Interactive GIF preview */}
      <SectionReveal delay={0.3} className="mt-8 mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-xl border border-sand-200">
          <div className="relative aspect-[1200/769] w-full">
            <Image
              src={IMAGES.gifWebsite}
              alt="Learn.xyz website interaction demo"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              unoptimized
            />
          </div>
        </div>
        <p className="mt-2 text-center text-12 text-neutral-400">
          Interactive website prototype
        </p>
      </SectionReveal>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 4 — Web Admin Dashboard
   ═══════════════════════════════════ */
function DashboardSection({ accentColor }: { accentColor: string }) {
  const slides = [
    { src: IMAGES.dashboard1, alt: "Learn.xyz dashboard — lesson creation", caption: "AI-powered lesson creation in minutes" },
    { src: IMAGES.dashboard2, alt: "Learn.xyz dashboard — content library", caption: "Organize lessons by team or topic" },
    { src: IMAGES.dashboard3, alt: "Learn.xyz dashboard — analytics", caption: "Engagement insights at a glance" },
    { src: IMAGES.dashboard4, alt: "Learn.xyz dashboard — publish flow", caption: "Preview and publish to the learner app in one click" },
    { src: IMAGES.dashboard5, alt: "Learn.xyz dashboard — overview", caption: "Smart defaults for fast content creation" },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <SectionReveal className="mx-auto max-w-3xl">
        <SectionLabel label="Dashboard" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Web admin dashboard
        </h2>
        <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
          We designed a dashboard that lets admins create AI-powered lessons,
          organize them by team or topic, and publish in one click. Built for
          speed and clarity &mdash; with smart defaults, preview tools, and
          engagement insights.
        </p>
      </SectionReveal>

      <div className="mt-10">
        <DeviceMockupCarousel slides={slides} device="laptop" autoPlay={5000} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 5 — Learner Mobile App
   ═══════════════════════════════════ */
function MobileAppSection({ accentColor }: { accentColor: string }) {
  const slides = [
    { src: IMAGES.mobile1, alt: "Learn.xyz app — social feed", caption: "A social feed that makes learning feel communal" },
    { src: IMAGES.mobile2, alt: "Learn.xyz app — lesson card", caption: "Snackable, swipeable lesson cards" },
    { src: IMAGES.mobile3, alt: "Learn.xyz app — gamification", caption: "Gamification that drives real engagement" },
    { src: IMAGES.mobile4, alt: "Learn.xyz app — team progress", caption: "Team-based progress tracking" },
    { src: IMAGES.mobile5, alt: "Learn.xyz app — learning path", caption: "Personalized learning paths" },
    { src: IMAGES.mobile6, alt: "Learn.xyz app — achievements", caption: "Achievements and streaks" },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <SectionReveal>
        <SectionLabel label="Mobile App" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Learner mobile app
        </h2>
        <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
          The learner app feels more like a social feed than a training tool
          &mdash; fast, visual, and made for on-the-go learning. Lessons are
          snackable, swipeable, and packed with motion. Gamification and
          team-based progress tracking make learning collaborative and
          community-driven.
        </p>
      </SectionReveal>

      <div className="mt-10">
        <DeviceMockupCarousel slides={slides} device="phone" autoPlay={3500} />
      </div>

      {/* GIF preview */}
      <SectionReveal delay={0.3} className="mt-8">
        <div className="overflow-hidden rounded-xl border border-sand-200">
          <div className="relative aspect-[1200/825] w-full">
            <Image
              src={IMAGES.gifMobile}
              alt="Learn.xyz mobile app interaction demo"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              unoptimized
            />
          </div>
        </div>
        <p className="mt-2 text-center text-12 text-neutral-400">
          Interactive prototype demo
        </p>
      </SectionReveal>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 6 — Outcomes
   ═══════════════════════════════════ */
function OutcomeSection({ accentColor }: { accentColor: string }) {
  const stats = [
    {
      value: 20,
      suffix: "+",
      label: "Global Pilot Clients",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
          <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
    {
      value: 80,
      suffix: "%",
      label: "Lesson Completion",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
    {
      value: 10,
      suffix: "/week",
      label: "Avg Lessons per Learner",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      value: 1000,
      suffix: "+",
      label: "Lessons Created (Week 1)",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <SectionReveal>
        <SectionLabel label="Outcomes" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Real results, real fast
        </h2>
        <p className="mt-4 mb-8 text-16 leading-[1.8] text-neutral-600">
          Learn.xyz launched, grew, and raised $4M in seed funding &mdash;
          with the CEO of Udemy showing interest. Here are the numbers that
          got investors excited.
        </p>
      </SectionReveal>

      <AnimatedStats stats={stats} columns={2} />
    </div>
  );
}

/* ═══════════════════════════════════
   Main Export
   ═══════════════════════════════════ */
interface LearnXyzSectionsProps {
  accentColor: string;
}

export function LearnXyzSections({ accentColor }: LearnXyzSectionsProps) {
  return (
    <div className="flex flex-col gap-20">
      <RoleSection accentColor={accentColor} />
      <DesignSystemSection accentColor={accentColor} />
      <WebsiteSection accentColor={accentColor} />
      <DashboardSection accentColor={accentColor} />
      <MobileAppSection accentColor={accentColor} />
      <OutcomeSection accentColor={accentColor} />
    </div>
  );
}
