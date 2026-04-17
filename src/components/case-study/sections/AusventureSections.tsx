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
import { DesktopFrame } from "@/components/case-study/DesktopFrame";

/* ─── Image URLs ─── */
const IMAGES = {
  // Desktop screenshots
  desktop1: "/images/ausventure/desktop-1.png",
  desktop2: "/images/ausventure/desktop-2.png",
  desktop3: "/images/ausventure/desktop-3.png",
  desktop4: "/images/ausventure/desktop-4.png",
  desktop5: "/images/ausventure/desktop-5.png",
  // Phone screenshots
  phone1: "/images/ausventure/phone-1.png",
  phone2: "/images/ausventure/phone-2.png",
  phone3: "/images/ausventure/phone-3.png",
  phone4: "/images/ausventure/phone-4.png",
  phone5: "/images/ausventure/phone-5.png",
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
const fontsUrl = "https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=Figtree:wght@400;500;600;700&display=swap";

/* Display + Headings: Archivo */
const archivoSamples = [
  { label: "H1", text: "Experience Australia & New Zealand", fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: 42, lineHeight: 1.1 },
  { label: "H2", text: "Let the road be the experience", fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: 32, lineHeight: 1.14 },
  { label: "H3", text: "This is a title", fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: 26, lineHeight: 1.13 },
  { label: "H4", text: "This is a title", fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 22, lineHeight: 1.25 },
  { label: "H5", text: "This is a title", fontFamily: "'Archivo', sans-serif", fontWeight: 600, fontSize: 18, lineHeight: 1.25 },
  { label: "H6", text: "This is a title", fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 16, lineHeight: 1.4 },
];

/* Body: Figtree */
const figtreeSamples = [
  { label: "L/Regular", text: "Premium self-drive tours across Australia and New Zealand.", fontFamily: "'Figtree', sans-serif", fontWeight: 400, fontSize: 18, lineHeight: 1.33 },
  { label: "L/Bold", text: "Premium self-drive tours across Australia and New Zealand.", fontFamily: "'Figtree', sans-serif", fontWeight: 700, fontSize: 18, lineHeight: 1.33 },
  { label: "M/Regular", text: "Designed for travellers who want freedom with confidence.", fontFamily: "'Figtree', sans-serif", fontWeight: 400, fontSize: 16, lineHeight: 1.38 },
  { label: "M/Bold", text: "Designed for travellers who want freedom with confidence.", fontFamily: "'Figtree', sans-serif", fontWeight: 700, fontSize: 16, lineHeight: 1.38 },
  { label: "S/Regular", text: "This is your body", fontFamily: "'Figtree', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.43 },
  { label: "S/Bold", text: "This is your body", fontFamily: "'Figtree', sans-serif", fontWeight: 700, fontSize: 14, lineHeight: 1.43 },
  { label: "Caption", text: "This is your body", fontFamily: "'Figtree', sans-serif", fontWeight: 500, fontSize: 12, lineHeight: 1.33 },
  { label: "Button", text: "This is your body", fontFamily: "'Figtree', sans-serif", fontWeight: 600, fontSize: 16, lineHeight: 1.25 },
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
            Ausventure had premium travel inventory but a broken digital
            product. Users were dropping off due to poor information architecture,
            no filtering, and zero trust signals. I partnered with them to
            design a two-sided marketplace from scratch, turning an outdated
            experience into a product that converts curiosity into bookings.
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
        "Too many options with poor filtering left users overwhelmed and unable to choose. The product listed every tour with no way to narrow down by style, duration, or budget.",
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
          Ausventure had the inventory and the reputation, but the product
          experience wasn&apos;t keeping up. Users had to work hard just to
          find pricing or availability, and the lack of structure was costing
          them high-intent leads.
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
          unified, tokenized UI kit that feels warm, adventurous, and built
          for trust. Every component was designed to scale across Camper and
          Experience product lines.
        </p>
      </SectionReveal>

      {/* Color palette */}
      <div className="mt-10">
        <h3 className="mb-4 text-14 font-semibold text-brand-ink">Color Palette</h3>
        <ColorPalette colors={ausventureColors} />
      </div>

      {/* Typography — Archivo (Display/Headings) */}
      <div className="mt-10">
        <h3 className="mb-4 text-14 font-semibold text-brand-ink">Display &amp; Headings</h3>
        <TypeShowcase
          fontName="Archivo"
          fontCategory="Grotesque Sans-Serif"
          samples={archivoSamples}
          googleFontUrl={fontsUrl}
        />
      </div>

      {/* Typography — Figtree (Body) */}
      <div className="mt-10">
        <h3 className="mb-4 text-14 font-semibold text-brand-ink">Body &amp; UI Text</h3>
        <TypeShowcase
          fontName="Figtree"
          fontCategory="Geometric Sans-Serif"
          samples={figtreeSamples}
          googleFontUrl={fontsUrl}
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
    { src: IMAGES.desktop2, alt: "Ausventure desktop — experiences", caption: "Curated experiences with smart filtering" },
    { src: IMAGES.desktop3, alt: "Ausventure desktop — trip detail", caption: "Rich detail pages that educate before converting" },
    { src: IMAGES.desktop4, alt: "Ausventure desktop — booking flow", caption: "Streamlined booking with progressive disclosure" },
    { src: IMAGES.desktop5, alt: "Ausventure desktop — discovery", caption: "Discover by cities with contextual routing" },
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
          using progressive disclosure so users are guided through a
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
              campground booking, all in one guided flow.
            </p>
          </div>
          <div
            className="rounded-xl p-6"
            style={{ backgroundColor: `${accentColor}08` }}
          >
            <div className="text-24">🏄</div>
            <h4 className="mt-3 text-16 font-semibold text-brand-ink">Experience Journeys</h4>
            <p className="mt-2 text-14 leading-[1.6] text-neutral-600">
              Curated adventure packages like Great Barrier Reef dives, Blue Mountain
              treks, and wine tours, with contextual routing to inquiry forms.
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
   Section 5 — From Browsing to Booking
   Branded backdrop with floating device frames
   (Neotaste Invites pattern adapted for desktop + mobile)
   ═══════════════════════════════════ */

/* Placeholder images — replace with dedicated Figma exports when ready */
const BOOKING_PHONES_ROW1 = [
  { src: "/images/ausventure/booking-phone-1.png", alt: "Camper detail page on mobile" },
  { src: "/images/ausventure/booking-phone-2.png", alt: "Camper booking flow on mobile" },
  { src: "/images/ausventure/booking-phone-3.png", alt: "Camper inquiry form on mobile" },
];

const BOOKING_PHONES_ROW2 = [
  { src: "/images/ausventure/booking-phone-5.png", alt: "Experience confirm and pay on mobile" },
  { src: "/images/ausventure/booking-phone-4.png", alt: "Experience booking confirmation on mobile" },
];

const BOOKING_DESKTOPS = [
  { src: "/images/ausventure/booking-desktop-1.png", alt: "Camper detail page with vehicle specs and pricing" },
  { src: "/images/ausventure/booking-desktop-2.png", alt: "Experience detail page with activity info and gallery" },
];

const BOOKING_FLOAT_OFFSETS = [7, -5, 8, -6, 7, -5];

/** Floating phone with proper iPhone bezel matching Neotaste pattern */
function BookingPhone({
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
  const floatOffset = BOOKING_FLOAT_OFFSETS[index];
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={
        inView
          ? { opacity: 1, y: [floatOffset, -floatOffset, floatOffset] as number[] }
          : { opacity: 0, y: 40 }
      }
      transition={{
        opacity: { duration: 0.7, delay: index * 0.1, ease: "easeOut" },
        y: {
          delay: 0.5 + index * 0.15,
          duration: 6,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror" as const,
        },
      }}
      className="w-[140px] flex-shrink-0 sm:w-[160px] md:w-[180px] lg:w-[200px]"
    >
      <div
        className="overflow-hidden rounded-[28px] border-[6px] border-[#1d1d1f] bg-[#1d1d1f] sm:rounded-[32px] sm:border-[7px] md:rounded-[36px] md:border-[8px]"
        style={{
          filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.2)) drop-shadow(0 6px 12px rgba(0,0,0,0.12))",
        }}
      >
        <div className="relative overflow-hidden rounded-[22px] bg-black sm:rounded-[25px] md:rounded-[28px]">
          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-[8px] z-10 h-[16px] w-[56px] -translate-x-1/2 rounded-full bg-black sm:top-[9px] sm:h-[18px] sm:w-[64px] md:top-[10px] md:h-[20px] md:w-[72px]" />
          {/* Screen */}
          <div className="aspect-[9/19.5] w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} className="h-full w-full object-contain" loading="lazy" />
          </div>
          {/* Home indicator */}
          <div className="absolute bottom-[4px] left-1/2 z-10 h-[3px] w-[72px] -translate-x-1/2 rounded-full bg-white/30 sm:bottom-[5px] sm:h-[3.5px] sm:w-[84px] md:bottom-[6px] md:h-[4px] md:w-[92px]" />
        </div>
      </div>
    </motion.div>
  );
}

function BookingSection({ accentColor }: { accentColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="mx-auto w-full max-w-5xl">
      <SectionReveal>
        <SectionLabel label="Conversion" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          From browsing to booking
        </h2>
        <p className="mt-4 max-w-[760px] text-16 leading-[1.8] text-neutral-600">
          Discovery is only half the product. I designed the detail and booking
          flows to build confidence at every step, with rich imagery, social
          proof, and progressive forms that guide users from interest to
          commitment without friction.
        </p>
      </SectionReveal>

      {/* ── Desktop screens on branded backdrop ── */}
      <div
        ref={ref}
        className="relative mt-10 overflow-hidden rounded-2xl px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-14"
        style={{
          background: "linear-gradient(170deg, #12252B 0%, #19323A 50%, #2E5C6B 100%)",
        }}
      >
        {/* Subtle glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 500,
            height: 500,
            background: `radial-gradient(circle, ${accentColor}12 0%, transparent 70%)`,
            filter: "blur(60px)",
          }}
        />

        {/* Row 1: Camper — 1 iMac (capped smaller to balance with phones) */}
        <motion.div
          className="relative mx-auto max-w-[700px]"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <DesktopFrame src={BOOKING_DESKTOPS[0].src} alt={BOOKING_DESKTOPS[0].alt} />
        </motion.div>

        {/* Row 2: Camper — 3 floating phones */}
        <div className="relative mt-8 flex items-center justify-center gap-4 sm:gap-6 lg:gap-8">
          {BOOKING_PHONES_ROW1.map((phone, i) => (
            <BookingPhone key={phone.src} src={phone.src} alt={phone.alt} index={i} inView={isInView} />
          ))}
        </div>

        {/* Row 3: Experience — 1 iMac (capped smaller to balance with phones) */}
        <motion.div
          className="relative mx-auto mt-10 max-w-[700px]"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <DesktopFrame src={BOOKING_DESKTOPS[1].src} alt={BOOKING_DESKTOPS[1].alt} />
        </motion.div>

        {/* Row 4: Experience — 3 floating phones */}
        <div className="relative mt-8 flex items-center justify-center gap-4 sm:gap-6 lg:gap-8">
          {BOOKING_PHONES_ROW2.map((phone, i) => (
            <BookingPhone key={phone.src} src={phone.src} alt={phone.alt} index={i} inView={isInView} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 6 — Before & After
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
      after: "Clarified WhatsApp, forms, and email contact points, 40% better reachability",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" />
        </svg>
      ),
    },
    {
      title: "Discovery & Exploration",
      before: "Complex navigation limiting engagement and session depth",
      after: "Organic discovery through contextual cues, 2x more exploration",
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
          The new product delivered measurable improvements across every key
          metric, from form completion to brand perception. Here&apos;s
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
        quote="Your professionalism, creativity, and attention to detail throughout the entire project have been exceptional. I especially appreciated the clear communication. It made the whole process smooth and enjoyable from start to finish. It's been a real pleasure working with such a dedicated and talented team!"
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
    metric: "End-to-End Marketplace",
    description:
      "Designed a complete product flow from trip discovery to payment confirmation, replacing the legacy experience with a high-converting funnel.",
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
    metric: "Mobile-First Product",
    description:
      "Designed every screen mobile-first with responsive forms, touch-friendly navigation, and optimized media, closing the mobile friction gap completely.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    metric: "Trust-First Conversion",
    description:
      "Integrated social proof, testimonials, and press coverage at every decision point, transforming browsing into confident booking.",
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
              Over three months, I took Ausventure from a legacy experience to a
              fully designed, mobile-first marketplace complete with a
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
        This was just the beginning. Ausventure&apos;s new product
        foundation is designed to scale, from automated pricing and
        dynamic itinerary builders to AI-powered trip recommendations.
        The platform transforms a manual travel agency into a tech-enabled
        marketplace.
      </p>

      {/* Vision statement card */}
      <div
        className="mt-8 overflow-hidden rounded-xl p-8 text-center"
        style={{ backgroundColor: "#143B39" }}
      >
        <p className="font-brand text-22 font-bold text-white">
          From legacy product to scalable marketplace.
        </p>
        <p className="mt-3 text-14 text-white/65">
          Ausventure is now positioned as a premium digital-first travel
          marketplace, ready for the next chapter of growth.
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
      <BookingSection accentColor={accentColor} />
      <BeforeAfterSection accentColor={accentColor} />
      <TestimonialSection accentColor={accentColor} />
      <OutcomeSection accentColor={accentColor} />
      <VisionSection accentColor={accentColor} />
    </div>
  );
}
