"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  SectionReveal,
  DeviceMockupCarousel,
  FeatureGrid,
} from "@/components/case-study/interactive";
import { SectionLabel } from "@/components/case-study/SectionLabel";

/* ─── Image URLs from Framer CDN ─── */
const IMAGES = {
  // Phone mockups (780x1688 - standard phone ratio)
  phone1: "https://framerusercontent.com/images/6E5Kd7IRQGQtZuegXJ7XbCZOaE.png",
  phone2: "https://framerusercontent.com/images/80ZFCMknHFagTfuywLCdq5Pc.png",
  phone3: "https://framerusercontent.com/images/BWEj7compYHa56YeiiBNXIx7FA.png",
  phone4: "https://framerusercontent.com/images/BgunwMpy9rF4HH0nbcMXXzcFV0c.png",
  phone5: "https://framerusercontent.com/images/D0Uai4zw9LT66Cgi65yUDvAP1k.png",
  phone6: "https://framerusercontent.com/images/HH1Trokba3eNOV0W0F0f61Ws8.png",
  phone7: "https://framerusercontent.com/images/Iiovo3kqQqJzzXlYPkqmkRruA.png",
  phone8: "https://framerusercontent.com/images/OgfFvLuJTRgfse0XCWTnVx783vI.png",
  phone9: "https://framerusercontent.com/images/OudSlxUbOStq5mA0OPtaC8P62U.png",
  phone10: "https://framerusercontent.com/images/QrUl1vVHKoHdfiIqNWaqu8jiMPY.png",
  phone11: "https://framerusercontent.com/images/RJnEqgJ12IadGM42hHMfM5AT5CM.png",
  phone12: "https://framerusercontent.com/images/SvTNhzUKQfeMzFSiF7HsSjsCjw.png",
  phone13: "https://framerusercontent.com/images/aXvE3TJHK48jKRo8y68o61qbZE.png",
  phone14: "https://framerusercontent.com/images/oWDFNfMvTFTqRcScWWsECBIip2Q.png",
  phone15: "https://framerusercontent.com/images/q19ERLf8u6nvaxrJ8tY5X1p7KM.png",
  phone16: "https://framerusercontent.com/images/u25fOt45TfFui1NpsZXPVfhmvC0.png",
  // Discovery flow
  discovery1: "https://framerusercontent.com/images/CJqdhZHSYYLD4GSgBKIDLNPLMmM.png",
  discovery2: "https://framerusercontent.com/images/bPMOEEd7tGCQ8ylpafiXSZs5nB4.png",
  // Larger mockups
  mockupLarge: "https://framerusercontent.com/images/lIqxGPrXQthyy9xXnzmrFq66FQI.png",
  mockupWide: "https://framerusercontent.com/images/cNIjGjLfrZY8vKa4o8PCnWjP80.png",
  mockupTall: "https://framerusercontent.com/images/9kspGdyl9y9UJHBByctQoutCG1Y.png",
  // GIFs
  gif1: "https://framerusercontent.com/images/OL9Q7aHa9o2ncUtabT6sqjPNE.gif",
  gif2: "https://framerusercontent.com/images/i6Y4SvWqua5TpT0vAar5VCOO4.gif",
};

/* ─── Animated activity icons ─── */
function SearchIcon() {
  return (
    <motion.svg
      width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="text-emerald-700"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </motion.svg>
  );
}

function MapIcon() {
  return (
    <motion.svg
      width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.05 }}
      className="text-emerald-700"
    >
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" x2="9" y1="3" y2="18" />
      <line x1="15" x2="15" y1="6" y2="21" />
    </motion.svg>
  );
}

function BeakerIcon() {
  return (
    <motion.svg
      width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
      className="text-emerald-700"
    >
      <path d="M4.5 3h15" />
      <path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" />
      <path d="M6 14h12" />
    </motion.svg>
  );
}

function UsersIcon() {
  return (
    <motion.svg
      width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.15 }}
      className="text-emerald-700"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </motion.svg>
  );
}

function ClipboardIcon() {
  return (
    <motion.svg
      width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
      className="text-emerald-700"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </motion.svg>
  );
}

/* ═══════════════════════════════════
   Section 1 — Our Role
   ═══════════════════════════════════ */
function RoleSection({ accentColor }: { accentColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const activities = [
    { icon: <SearchIcon />, text: "Deep-dived into user behavior to surface the real pain points in discovery and booking" },
    { icon: <MapIcon />, text: "Mapped the product landscape to identify highest-leverage opportunities" },
    { icon: <BeakerIcon />, text: "Prototyped two competing concepts to test engagement and retention" },
    { icon: <UsersIcon />, text: "Validated with real users to learn which approach resonated" },
    { icon: <ClipboardIcon />, text: "Delivered a prioritized roadmap so the team knew exactly what to build next" },
  ];

  return (
    <div ref={ref} className="mx-auto max-w-3xl">
      <SectionReveal>
        <SectionLabel label="Our Role" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          From assumptions to answers in 14 days
        </h2>
      </SectionReveal>

      <div className="mt-8 space-y-3">
        {activities.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.08, ease: "easeOut" }}
            className="flex items-start gap-3 rounded-lg border border-sand-200 bg-white p-4"
          >
            <span className="mt-0.5 flex-shrink-0">{a.icon}</span>
            <p className="text-14 leading-relaxed text-neutral-600">{a.text}</p>
          </motion.div>
        ))}
      </div>

      <SectionReveal delay={0.4} className="mt-6">
        <div
          className="rounded-xl p-5"
          style={{ backgroundColor: `${accentColor}10` }}
        >
          <p className="text-14 leading-relaxed text-neutral-600">
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
function FrictionSection({ accentColor }: { accentColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const problems = [
    {
      title: "Discovery felt overwhelming",
      description: "Users faced cognitive overload and couldn't find places that matched their taste. Generic recommendations drove people away instead of pulling them in.",
      mockupSrc: IMAGES.discovery1,
    },
    {
      title: "Invites weren't working",
      description: "Users defaulted to Google Maps to coordinate with friends, breaking the growth loop and keeping sharing outside the app entirely.",
      mockupSrc: IMAGES.discovery2,
    },
  ];

  return (
    <div ref={ref} className="mx-auto max-w-3xl">
      <SectionReveal>
        <SectionLabel label="Research" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Two blockers killing growth
        </h2>
        <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
          Through early user interviews, we discovered two critical blockers
          hurting Neotaste&apos;s growth. These weren&apos;t just UX issues.
          They were business problems directly impacting retention and viral
          loops.
        </p>
      </SectionReveal>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {problems.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease: "easeOut" }}
            className="overflow-hidden rounded-xl border border-sand-200 bg-white"
          >
            <div className="p-5">
              <div
                className="mb-2 inline-flex rounded-md px-2 py-0.5 text-11 font-semibold"
                style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
              >
                Blocker {i + 1}
              </div>
              <h4 className="text-15 font-semibold text-brand-ink">{p.title}</h4>
              <p className="mt-1 text-13 leading-relaxed text-neutral-500">{p.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 3 — Smarter Discovery
   ═══════════════════════════════════ */
function DiscoverySection({ accentColor }: { accentColor: string }) {
  const slides = [
    { src: IMAGES.phone1, alt: "Taste profile setup", caption: "Progressive taste profile for personalized discovery" },
    { src: IMAGES.phone2, alt: "Saved places", caption: "Smarter saved places that learn from patterns" },
    { src: IMAGES.phone3, alt: "Recommendations", caption: "Tailored suggestions right from day one" },
    { src: IMAGES.phone4, alt: "Restaurant details", caption: "Rich detail pages with actionable reviews" },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <SectionReveal>
        <SectionLabel label="Discovery" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Smarter discovery
        </h2>
        <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
          Users wanted more control and less noise. We tested a progressive
          taste profile and smarter saved places to make discovery feel
          personal, and worth coming back to.
        </p>
      </SectionReveal>

      <div className="mt-10">
        <DeviceMockupCarousel slides={slides} device="phone" autoPlay={4000} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 4 — Reimagining Invites
   ═══════════════════════════════════ */
function InvitesSection({ accentColor }: { accentColor: string }) {
  const features = [
    { number: 1, title: "Direct restaurant access", description: "Quick link to restaurant websites for easy reference.", mockupSrc: IMAGES.phone5 },
    { number: 2, title: "Share button visibility", description: "Sharing made prominent and accessible throughout the app.", mockupSrc: IMAGES.phone6 },
    { number: 3, title: "Invites at booking", description: "Involve friends right at booking, when excitement peaks.", mockupSrc: IMAGES.phone7 },
    { number: 4, title: "Better map experience", description: "Distance, travel time, and precise addresses for fast decisions.", mockupSrc: IMAGES.phone8 },
    { number: 5, title: "Actionable reviews", description: "Badges that surface what makes a place special beyond star ratings.", mockupSrc: IMAGES.phone9 },
    { number: 6, title: "Photos in reviews", description: "User images that set better expectations for visitors.", mockupSrc: IMAGES.phone10 },
    { number: 7, title: "User-generated tags", description: "Custom tags that make reviews scannable and discovery personal.", mockupSrc: IMAGES.phone11 },
    { number: 8, title: "Emotion-driven sharing", description: "Contextual prompts like \"catch up\" make invites feel natural.", mockupSrc: IMAGES.phone12 },
    { number: 9, title: "Richer share previews", description: "Shared links with deal details give friends real context to act on.", mockupSrc: IMAGES.phone13 },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <SectionReveal>
        <SectionLabel label="Invites" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Reimagining invites
        </h2>
        <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
          Invites were key to growth, but felt buried. Users wanted easier
          sharing, clearer entry points, and the option to involve friends at
          the moment of booking. We tested quick wins alongside deeper
          structural changes.
        </p>
      </SectionReveal>

      <div className="mt-10">
        <FeatureGrid features={features} columns={3} accentColor={accentColor} showMockups />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 5 — Sprint Outcomes
   ═══════════════════════════════════ */
function OutcomeSection({ accentColor }: { accentColor: string }) {
  const outcomes = [
    {
      metric: "Unblocked Roadmap",
      description: "Replaced guesswork with a validated, prioritized feature plan the team could build with confidence",
    },
    {
      metric: "Problem Discovery",
      description: "Identified the two core blockers killing retention and growth through structured user research",
    },
    {
      metric: "Validated Direction",
      description: "Tested two competing concepts with real users and pinpointed the winning approach",
    },
    {
      metric: "De-risked Investment",
      description: "Saved months of building unproven features by validating assumptions before any code was written",
    },
  ];

  return (
    <SectionReveal className="mx-auto max-w-3xl">
      <SectionLabel label="Outcomes" accentColor={accentColor} />
      <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
        What the sprint delivered
      </h2>
      <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
        In 14 days, we went from open questions to a validated product
        strategy. The team walked away with clear priorities, tested
        prototypes, and the confidence to ship.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {outcomes.map((o) => (
          <div key={o.metric} className="rounded-xl border border-sand-200 bg-white p-5">
            <div className="mb-2 text-20 font-bold text-brand-ink">
              {o.metric}
            </div>
            <p className="text-13 leading-relaxed text-neutral-500">
              {o.description}
            </p>
          </div>
        ))}
      </div>
    </SectionReveal>
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
    <div className="flex flex-col gap-20">
      <RoleSection accentColor={accentColor} />
      <FrictionSection accentColor={accentColor} />
      <DiscoverySection accentColor={accentColor} />
      <InvitesSection accentColor={accentColor} />
      <OutcomeSection accentColor={accentColor} />
    </div>
  );
}
