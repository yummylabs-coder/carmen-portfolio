"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import {
  SectionReveal,
  ColorPalette,
  TypeShowcase,
  DeviceMockupCarousel,
  TestimonialCard,
} from "@/components/case-study/interactive";
import { SectionLabel } from "@/components/case-study/SectionLabel";

/* ─── Image URLs (Framer CDN — will be replaced with local assets later) ─── */
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
  // Primary
  { name: "Brand Blue", hex: "#19323A" },
  { name: "Brand Orange", hex: "#F58639" },
  { name: "Brand White", hex: "#FFFCFA" },
  // Secondary
  { name: "Light Blue", hex: "#C3E1E1" },
  { name: "Green", hex: "#DBDD82" },
  // Tones
  { name: "Dark Blue 600", hex: "#12252B" },
  { name: "Dark Blue 500", hex: "#2E5C6B" },
  { name: "Light Blue 300", hex: "#559CAA" },
  { name: "Light Blue 200", hex: "#99CCCC" },
  { name: "Warm Orange 500", hex: "#F16C11" },
  // Neutrals
  { name: "Grey 500", hex: "#626C72" },
  { name: "Beige 400", hex: "#FCF4EA" },
  { name: "Copy Black", hex: "#0F1F24" },
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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <SectionReveal className="mx-auto max-w-5xl">
      <SectionLabel label="At a Glance" accentColor={accentColor} />
      <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
        A goldmine hidden behind friction
      </h2>

      <div ref={ref} className="mt-6 flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
        {/* Left — narrative */}
        <div className="flex-1">
          <p className="text-16 leading-[1.8] text-neutral-600">
            Ausventure was sitting on a goldmine of premium travel packages, but
            their digital experience was stuck in the past. Users were getting
            lost in static pages, and the path to purchase was confusing. I
            partnered with them to architect a 0-to-1 redesign, turning a
            brochure site into a high-performance booking engine that converts
            curiosity into revenue.
          </p>
        </div>

        {/* Right — key insight card */}
        <motion.div
          className="w-full shrink-0 md:w-[320px]"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <div
            className="rounded-xl border-l-4 p-5"
            style={{
              borderLeftColor: accentColor,
              backgroundColor: `${accentColor}08`,
            }}
          >
            <p className="text-13 font-semibold uppercase tracking-wider" style={{ color: accentColor }}>
              Key Insight
            </p>
            <p className="mt-2 text-14 font-medium leading-[1.6] text-brand-ink">
              In high-ticket travel, trust is the currency. &ldquo;Hard to
              use&rdquo; implied &ldquo;risky to buy.&rdquo;
            </p>
          </div>
        </motion.div>
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
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
          <circle cx="12" cy="12" r="10" /><path d="M16 16s-1.5-2-4-2-4 2-4 2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
      title: "Decision Paralysis",
      description:
        "Too many options with poor filtering left users overwhelmed and unable to choose. The existing site listed every tour with no way to narrow down by style, duration, or budget.",
      before: "Flat listing with 40+ tours and no filtering",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: "Trust Gaps",
      description:
        "Lack of social proof at critical decision points made high-value bookings feel risky. Users were expected to commit thousands of dollars without seeing testimonials or trust signals.",
      before: "No reviews, no trust badges, no social proof",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      ),
      title: "Mobile Friction",
      description:
        "A desktop-first experience that alienated the growing mobile audience. Forms were unusable on small screens and key actions required horizontal scrolling.",
      before: "Desktop-only layout breaking on mobile",
    },
  ];

  return (
    <div ref={ref} className="mx-auto max-w-5xl">
      <SectionReveal>
        <SectionLabel label="The Problem" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Three critical blockers
        </h2>
        <p className="mt-4 max-w-[760px] text-16 leading-[1.8] text-neutral-600">
          Ausventure had the inventory and the reputation, but lacked the digital
          infrastructure. Their existing site was static and difficult to navigate,
          forcing users to work hard just to find pricing or availability.
        </p>
      </SectionReveal>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {blockers.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease: "easeOut" }}
            className="flex flex-col rounded-xl border border-sand-200 bg-white p-6"
          >
            <div
              className="mb-4 flex size-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${accentColor}12`, color: accentColor }}
            >
              <div className="h-5 w-5">{b.icon}</div>
            </div>
            <h4 className="text-16 font-semibold text-brand-ink">{b.title}</h4>
            <p className="mt-2 flex-1 text-14 leading-[1.6] text-neutral-600">
              {b.description}
            </p>
            {/* "Before" tag */}
            <div className="mt-4 rounded-md bg-red-50 px-3 py-1.5">
              <p className="text-12 font-medium text-red-600/80">
                Before: {b.before}
              </p>
            </div>
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
    <div className="mx-auto max-w-5xl">
      <SectionReveal>
        <SectionLabel label="Design System" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Systemizing the adventure
        </h2>
        <p className="mt-4 max-w-[760px] text-16 leading-[1.8] text-neutral-600">
          To solve the friction, I started from scratch with a modular design
          system. I moved Ausventure away from inconsistent styles to a
          unified, tokenized UI kit &mdash; warm, adventurous, and built for
          trust. Every component was designed to scale across Camper and
          Experience product lines.
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

      {/* Component Library Examples */}
      <SectionReveal className="mt-10">
        <h3 className="mb-4 text-14 font-semibold text-brand-ink">Component Library Examples</h3>
        <div className="flex items-end gap-4 overflow-x-auto rounded-xl border border-sand-200 bg-sand-100/50 p-6 sm:gap-6 sm:p-8">
          {[
            { src: "/images/ausventure/featured-card.png", alt: "Featured experience card — Helicopter + Reef Combo", w: 239, h: 385 },
            { src: "/images/ausventure/camper-inquiry.png", alt: "Camper inquiry card — Start your camper inquiry", w: 336, h: 338 },
            { src: "/images/ausventure/hero-container.png", alt: "Hero container — Explore Australia & New Zealand", w: 358, h: 658 },
            { src: "/images/ausventure/camper-card.png", alt: "Camper card — Sleepervan with booking options", w: 292, h: 400 },
          ].map((comp) => (
            <div key={comp.src} className="shrink-0">
              <Image
                src={comp.src}
                alt={comp.alt}
                width={comp.w}
                height={comp.h}
                className="h-auto w-[160px] rounded-lg drop-shadow-md sm:w-[200px] lg:w-[220px]"
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 220px"
              />
            </div>
          ))}
        </div>
      </SectionReveal>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 4 — The Discovery Engine
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
    <div className="mx-auto max-w-5xl">
      <SectionReveal>
        <SectionLabel label="Discovery Engine" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Reducing cognitive load with smart filtering
        </h2>
        <p className="mt-4 max-w-[760px] text-16 leading-[1.8] text-neutral-600">
          Ausventure operates a two-sided marketplace: Campers and Experiences.
          Mixing them created confusion. I architected a split-path journey
          using progressive disclosure &mdash; users are guided through a
          decision tree that feels like a conversation, not a database query.
        </p>
      </SectionReveal>

      {/* Split-path explanation */}
      <SectionReveal className="mt-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div
            className="rounded-xl p-6"
            style={{ backgroundColor: `${accentColor}08` }}
          >
            <div className="text-24">🏕️</div>
            <h4 className="mt-3 text-16 font-semibold text-brand-ink">Camper Journeys</h4>
            <p className="mt-2 text-14 leading-[1.6] text-neutral-600">
              Self-drive itineraries with vehicle selection, route planning, and
              campground booking — all in one guided flow.
            </p>
          </div>
          <div
            className="rounded-xl p-6"
            style={{ backgroundColor: `${accentColor}08` }}
          >
            <div className="text-24">🏄</div>
            <h4 className="mt-3 text-16 font-semibold text-brand-ink">Experience Journeys</h4>
            <p className="mt-2 text-14 leading-[1.6] text-neutral-600">
              Curated adventure packages — Great Barrier Reef dives, Blue Mountain
              treks, wine tours — with contextual routing to inquiry forms.
            </p>
          </div>
        </div>
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
   Section 5 — Before & After
   ═══════════════════════════════════ */
function BeforeAfterSection({ accentColor }: { accentColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const comparisons = [
    {
      title: "Form Completion",
      before: "Confusing form with excessive fields and no progress indication",
      after: "Clear, stepped structure yielding 85% higher completion rates",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
    {
      title: "Session Retention",
      before: "Users exiting mid-process due to uncertainty and confusion",
      after: "Removed friction points, reducing abandoned sessions by 60%",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: "Social Proof",
      before: "Trust-building elements buried or entirely absent",
      after: "High-impact testimonials and press coverage at decision points",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
    {
      title: "Reachability",
      before: "Users unclear how to follow up after browsing",
      after: "Clarified WhatsApp, forms, and email — 40% better reachability",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" />
        </svg>
      ),
    },
    {
      title: "Discovery & Exploration",
      before: "Complex navigation limiting engagement and time on site",
      after: "Organic discovery through contextual cues — 2x more exploration",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
    {
      title: "Brand Authority",
      before: "Inconsistent or generic branding that undermined premium positioning",
      after: "Elevated design positioning Ausventure as a trusted travel partner",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
  ];

  return (
    <div ref={ref} className="mx-auto max-w-5xl">
      <SectionReveal>
        <SectionLabel label="Transformation" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Before &amp; after
        </h2>
        <p className="mt-4 mb-8 max-w-[760px] text-16 leading-[1.8] text-neutral-600">
          The redesign delivered measurable improvements across every key
          metric &mdash; from form completion to brand perception. Here&apos;s
          how each area transformed.
        </p>
      </SectionReveal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {comparisons.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: "easeOut" }}
            className="rounded-xl border border-sand-200 bg-white p-5"
          >
            <div
              className="mb-3 flex size-9 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${accentColor}12`, color: accentColor }}
            >
              {c.icon}
            </div>
            <h4 className="text-15 font-semibold text-brand-ink">{c.title}</h4>
            {/* Before */}
            <div className="mt-3 rounded-md bg-red-50/60 px-3 py-2">
              <p className="text-12 font-medium text-red-600/70">Before</p>
              <p className="mt-0.5 text-13 leading-[1.5] text-neutral-600">{c.before}</p>
            </div>
            {/* After */}
            <div className="mt-2 rounded-md px-3 py-2" style={{ backgroundColor: `${accentColor}08` }}>
              <p className="text-12 font-medium" style={{ color: accentColor }}>After</p>
              <p className="mt-0.5 text-13 leading-[1.5] text-neutral-600">{c.after}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 6 — Client Testimonial
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
   Section 7 — Outcomes
   ═══════════════════════════════════ */
const AUSVENTURE_OUTCOMES = [
  {
    metric: "End-to-End Booking Engine",
    description:
      "Designed a complete booking flow from trip discovery to payment confirmation, replacing the old static brochure site with a high-converting funnel.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" />
      </svg>
    ),
  },
  {
    metric: "Scalable Design System",
    description:
      "Built a modular, tokenized component library with Archivo + Figtree typography, a 10-color palette, and reusable patterns across both product lines.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    metric: "Mobile-First Redesign",
    description:
      "Rebuilt every screen mobile-first, with responsive forms, touch-friendly navigation, and optimized media — closing the mobile friction gap completely.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    metric: "Trust-First Conversion",
    description:
      "Integrated social proof, testimonials, and press coverage at every decision point — transforming browsing into confident booking.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function OutcomeSection({ accentColor }: { accentColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl"
      style={{ minHeight: 520, backgroundColor: "#143B39" }}
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#143B39] via-[#11607D]/30 to-[#143B39]" />

      {/* Content — split layout */}
      <div className="relative z-10 flex flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:gap-12 md:px-10 md:py-16">
        {/* Left — headline + intro */}
        <div className="flex flex-col md:w-[42%] md:sticky md:top-8 md:flex-shrink-0">
          <SectionReveal>
            <SectionLabel label="Outcomes" accentColor="#8AB5B3" />
            <h2 className="mt-4 font-brand text-36 font-bold leading-[1.15] text-white mobile:text-28">
              What I delivered
            </h2>
            <p className="mt-4 max-w-[440px] text-17 leading-[1.55] text-white/75">
              Over three months, I took Ausventure from a static brochure site to a
              fully designed, mobile-first booking platform &mdash; complete with a
              design system, smart filtering, and trust-driven conversion flows.
            </p>
          </SectionReveal>
        </div>

        {/* Right — 2x2 outcome cards */}
        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
          {AUSVENTURE_OUTCOMES.map((o, i) => (
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
              style={{ backgroundColor: "rgba(138, 181, 179, 0.08)" }}
            >
              <div
                className="flex size-9 items-center justify-center rounded-lg"
                style={{ backgroundColor: "rgba(138, 181, 179, 0.15)", color: "#8AB5B3" }}
              >
                {o.icon}
              </div>
              <div className="mt-3 text-16 font-bold text-white">
                {o.metric}
              </div>
              <p className="mt-1.5 text-13 leading-[1.5] text-white/55">
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
   Section 8 — Vision
   ═══════════════════════════════════ */
function VisionSection({ accentColor }: { accentColor: string }) {
  return (
    <SectionReveal className="mx-auto w-full max-w-5xl">
      <SectionLabel label="Vision" accentColor={accentColor} />
      <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
        Where it&apos;s heading
      </h2>
      <p className="mt-4 max-w-[760px] text-16 leading-[1.8] text-neutral-600">
        The redesign was just the beginning. Ausventure&apos;s new digital
        foundation is designed to scale &mdash; from automated pricing and
        dynamic itinerary builders to AI-powered trip recommendations.
        The platform turns a manual travel agency into a tech-enabled
        marketplace.
      </p>

      {/* Vision statement card */}
      <div
        className="mt-8 overflow-hidden rounded-xl p-8 text-center"
        style={{ backgroundColor: "#143B39" }}
      >
        <p className="font-brand text-22 font-bold text-white">
          From brochure site to booking engine.
        </p>
        <p className="mt-3 text-14 text-white/65">
          Ausventure is now positioned as a premium digital-first travel operator
          &mdash; ready for the next chapter of growth.
        </p>
      </div>

      {/* Future features */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { label: "Dynamic Pricing", desc: "Real-time availability" },
          { label: "AI Itineraries", desc: "Personalised trip planning" },
          { label: "Multi-Currency", desc: "Global market expansion" },
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
interface AusventureSectionsProps {
  accentColor: string;
}

export function AusventureSections({ accentColor }: AusventureSectionsProps) {
  return (
    <div className="flex w-full flex-col gap-20">
      <AtAGlance accentColor={accentColor} />
      <FrictionSection accentColor={accentColor} />
      <DesignLanguageSection accentColor={accentColor} />
      <DiscoverySection accentColor={accentColor} />
      <BeforeAfterSection accentColor={accentColor} />
      <TestimonialSection accentColor={accentColor} />
      <OutcomeSection accentColor={accentColor} />
      <VisionSection accentColor={accentColor} />
    </div>
  );
}
