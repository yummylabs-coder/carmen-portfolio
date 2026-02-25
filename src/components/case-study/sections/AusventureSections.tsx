"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  SectionReveal,
  ColorPalette,
  TypeShowcase,
  DeviceMockupCarousel,
  AnimatedStats,
  TestimonialCard,
} from "@/components/case-study/interactive";
import { SectionLabel } from "@/components/case-study/SectionLabel";

/* ─── Image URLs from Framer CDN ─── */
const IMAGES = {
  // Desktop screenshots
  desktop1: "https://framerusercontent.com/images/7PUCQNNzpSomKepDiTpefov2c.png?scale-down-to=2048",
  desktop2: "https://framerusercontent.com/images/xb8aKY2fcNf5To3Y9B9iGwooKnk.png?scale-down-to=2048",
  desktop3: "https://framerusercontent.com/images/BFPrQfg0mmLLMVyRIbVhV3Nwfc.png?scale-down-to=2048",
  // Phone screenshots
  phone1: "https://framerusercontent.com/images/5OSCLiXSCRPxjFOtX3OttuY5rbw.png?scale-down-to=1024",
  phone2: "https://framerusercontent.com/images/MgtTzpkh0MsFK0WdEK0rROhOs.png?scale-down-to=1024",
  phone3: "https://framerusercontent.com/images/jAyrpM1EUnUCtPybBlfh2SJXnr4.png?scale-down-to=1024",
  phone4: "https://framerusercontent.com/images/cJ5UI1z1lbCKTi2fC9waAWM58Go.png",
  phone5: "https://framerusercontent.com/images/gMrqss2z0hNStKDHAaxAUj6v8.png",
  // Design system banner
  componentBanner: "https://framerusercontent.com/images/sjejdcnoLD6YTmDOI3xBqDuczCA.png?scale-down-to=2048",
  // Anne's avatar
  anneAvatar: "https://framerusercontent.com/images/VEHF5xbpe0gZ7mEbyOuSr90YYMo.svg",
};

/* ─── Color palette ─── */
const ausventureColors = [
  { name: "Deep Teal", hex: "#143B39" },
  { name: "Ocean Teal", hex: "#11607D" },
  { name: "Forest", hex: "#2A5553" },
  { name: "Sea Foam", hex: "#8AB5B3" },
  { name: "Mist", hex: "#C4D8D7" },
  { name: "Warm Cream", hex: "#F2E9DA" },
  { name: "Sand", hex: "#E8DCC8" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Charcoal", hex: "#2C2C2C" },
  { name: "Bark", hex: "#5A4A3A" },
];

/* ─── Typography ─── */
const archivoUrl = "https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=Figtree:wght@400;500;600&display=swap";
const typeSamples = [
  {
    label: "Display",
    text: "Experience Australia & New Zealand. Like never before.",
    fontFamily: "'Archivo', sans-serif",
    fontWeight: 800,
    fontSize: 42,
    letterSpacing: "-0.02em",
  },
  {
    label: "Heading",
    text: "Let the road be the experience of a lifetime.",
    fontFamily: "'Archivo', sans-serif",
    fontWeight: 600,
    fontSize: 26,
    letterSpacing: "-0.01em",
  },
  {
    label: "Body",
    text: "Premium self-drive tours across Australia and New Zealand, designed for travellers who want freedom with confidence.",
    fontFamily: "'Figtree', sans-serif",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 1.7,
  },
];

/* ═══════════════════════════════════
   Section 1 — At a Glance
   ═══════════════════════════════════ */
function AtAGlance({ accentColor }: { accentColor: string }) {
  return (
    <SectionReveal className="mx-auto max-w-3xl">
      <SectionLabel label="At a Glance" accentColor={accentColor} />
      <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
        A goldmine hidden behind friction
      </h2>
      <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
        Ausventure was sitting on a goldmine of premium travel packages, but
        their digital experience was stuck in the past. Users were getting lost
        in static pages, and the path to purchase was confusing. We partnered
        with them to architect a 0-to-1 redesign, turning a brochure site into
        a high-performance booking engine that converts curiosity into revenue.
      </p>
      {/* Key insight */}
      <div
        className="mt-6 rounded-xl border-l-4 p-5"
        style={{
          borderLeftColor: accentColor,
          backgroundColor: `${accentColor}08`,
        }}
      >
        <p className="text-14 font-medium text-brand-ink">
          In high-ticket travel, trust is the currency. &ldquo;Hard to
          use&rdquo; implied &ldquo;risky to buy.&rdquo;
        </p>
      </div>
    </SectionReveal>
  );
}

/* ═══════════════════════════════════
   Section 2 — The Friction Problem
   ═══════════════════════════════════ */
function FrictionSection({ accentColor }: { accentColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const blockers = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
          <circle cx="12" cy="12" r="10" /><path d="M16 16s-1.5-2-4-2-4 2-4 2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
      title: "Decision Paralysis",
      description: "Too many options with poor filtering left users overwhelmed and unable to choose.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: "Trust Gaps",
      description: "Lack of social proof at critical decision points made high-value bookings feel risky.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      ),
      title: "Mobile Friction",
      description: "A desktop-first experience that alienated the growing mobile audience.",
    },
  ];

  return (
    <div ref={ref} className="mx-auto max-w-3xl">
      <SectionReveal>
        <SectionLabel label="The Problem" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Three critical blockers
        </h2>
        <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
          Ausventure had the inventory, but lacked the digital infrastructure.
          Their existing site was static and difficult to navigate, forcing
          users to work hard just to find pricing or availability.
        </p>
      </SectionReveal>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {blockers.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.45, delay: 0.2 + i * 0.1, ease: "easeOut" }}
            className="rounded-xl border border-sand-200 bg-white p-5 text-center"
          >
            <div className="mx-auto mb-3 h-8 w-8 text-neutral-400">
              {b.icon}
            </div>
            <h4 className="text-15 font-semibold text-brand-ink">{b.title}</h4>
            <p className="mt-2 text-13 leading-relaxed text-neutral-500">
              {b.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 3 — Design Language
   ═══════════════════════════════════ */
function DesignLanguageSection({ accentColor }: { accentColor: string }) {
  return (
    <div className="mx-auto max-w-3xl">
      <SectionReveal>
        <SectionLabel label="Design System" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Systemizing the adventure
        </h2>
        <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
          To solve the friction, we started from scratch with a strong design
          system. We moved Ausventure away from inconsistent styles to a
          unified, tokenized UI kit &mdash; warm, adventurous, and built for
          trust.
        </p>
      </SectionReveal>

      {/* Color palette */}
      <div className="mt-10">
        <h3 className="mb-4 text-14 font-semibold text-brand-ink">Color Palette</h3>
        <ColorPalette colors={ausventureColors} />
      </div>

      {/* Typography */}
      <div className="mt-10">
        <h3 className="mb-4 text-14 font-semibold text-brand-ink">Typography</h3>
        <TypeShowcase
          fontName="Archivo"
          fontCategory="Grotesque Sans-Serif"
          samples={typeSamples}
          googleFontUrl={archivoUrl}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 4 — Client Testimonial
   ═══════════════════════════════════ */
function TestimonialSection({ accentColor }: { accentColor: string }) {
  return (
    <div className="mx-auto max-w-2xl">
      <TestimonialCard
        quote="Your professionalism, creativity, and attention to detail throughout the entire project have been exceptional. I especially appreciated the clear communication &mdash; it made the whole process smooth and enjoyable from start to finish. It's been a real pleasure working with such a dedicated and talented team!"
        name="Anne Dressel"
        role="Founder, Ausventure Travel"
        avatarSrc={IMAGES.anneAvatar}
        accentColor={accentColor}
      />
    </div>
  );
}

/* ═══════════════════════════════════
   Section 5 — The Discovery Engine
   ═══════════════════════════════════ */
function DiscoverySection({ accentColor }: { accentColor: string }) {
  const phoneSlides = [
    { src: IMAGES.phone1, alt: "Ausventure mobile — trip discovery", caption: "Progressive disclosure guides users through decisions" },
    { src: IMAGES.phone2, alt: "Ausventure mobile — itinerary builder", caption: "Split-path navigation separates Campers from Experiences" },
    { src: IMAGES.phone3, alt: "Ausventure mobile — booking flow", caption: "High-intent inquiry form after guided decision tree" },
    { src: IMAGES.phone4, alt: "Ausventure mobile — trip details", caption: "Rich trip detail pages with social proof" },
    { src: IMAGES.phone5, alt: "Ausventure mobile — explore", caption: "Contextual routing for higher quality leads" },
  ];

  const desktopSlides = [
    { src: IMAGES.desktop1, alt: "Ausventure desktop — homepage", caption: "Homepage with split-path user journey" },
    { src: IMAGES.desktop2, alt: "Ausventure desktop — trip listing", caption: "Smart inventory filtering reduces cognitive load" },
    { src: IMAGES.desktop3, alt: "Ausventure desktop — trip detail", caption: "Rich detail pages that educate before converting" },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <SectionReveal className="mx-auto max-w-3xl">
        <SectionLabel label="Discovery Engine" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Reducing cognitive load with smart filtering
        </h2>
        <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
          Ausventure operates a two-sided marketplace: Campers and Experiences.
          Mixing them created confusion. We architected a split-path journey
          using progressive disclosure &mdash; users are guided through a
          decision tree that feels like a conversation, not a database query.
        </p>
      </SectionReveal>

      {/* Desktop carousel */}
      <div className="mt-10">
        <DeviceMockupCarousel slides={desktopSlides} device="desktop" autoPlay={5000} />
      </div>

      {/* Phone carousel */}
      <div className="mt-12">
        <DeviceMockupCarousel slides={phoneSlides} device="phone" autoPlay={4000} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 6 — Measuring Impact
   ═══════════════════════════════════ */
function KPISection({ accentColor }: { accentColor: string }) {
  const kpis = [
    {
      value: 85,
      suffix: "%",
      label: "Higher Form Completion",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
    {
      value: 60,
      suffix: "%",
      label: "Fewer Abandoned Sessions",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      value: 3,
      suffix: "x",
      label: "Stronger Social Proof",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
    {
      value: 40,
      suffix: "%",
      label: "Better Reachability",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" />
        </svg>
      ),
    },
    {
      value: 2,
      suffix: "x",
      label: "More Discovery & Exploration",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
    {
      value: 90,
      suffix: "%",
      label: "Stronger Brand Authority",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <SectionReveal>
        <SectionLabel label="Impact" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Measuring the impact
        </h2>
        <p className="mt-4 mb-8 text-16 leading-[1.8] text-neutral-600">
          The redesign delivered measurable improvements across every key metric
          &mdash; from form completion to brand perception.
        </p>
      </SectionReveal>

      <AnimatedStats stats={kpis} columns={3} />
    </div>
  );
}

/* ═══════════════════════════════════
   Main Export
   ═══════════════════════════════════ */
interface AusventureSectionsProps {
  accentColor: string;
}

export function AusventureSections({ accentColor }: AusventureSectionsProps) {
  return (
    <div className="flex flex-col gap-20">
      <AtAGlance accentColor={accentColor} />
      <FrictionSection accentColor={accentColor} />
      <DesignLanguageSection accentColor={accentColor} />
      <TestimonialSection accentColor={accentColor} />
      <DiscoverySection accentColor={accentColor} />
      <KPISection accentColor={accentColor} />
    </div>
  );
}
