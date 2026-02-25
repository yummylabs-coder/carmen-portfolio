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

/* ═══════════════════════════════════
   Section 1 — Our Role
   ═══════════════════════════════════ */
function RoleSection({ accentColor }: { accentColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const activities = [
    { icon: "🔍", text: "User research deep dive to uncover pain points in discovery and booking flows" },
    { icon: "🗺️", text: "Mapped opportunities across the product to spot the highest-leverage wins" },
    { icon: "🧪", text: "Prototyped two competing concepts to address engagement and retention" },
    { icon: "👥", text: "Tested with real users to see which approach resonated and reduced friction" },
    { icon: "📋", text: "Delivered clear next steps so the team knew exactly what to prioritize building" },
  ];

  return (
    <div ref={ref} className="mx-auto max-w-3xl">
      <SectionReveal>
        <SectionLabel label="Our Role" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Bringing uncertainty to clarity in 2 weeks
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
            <span className="text-20">{a.icon}</span>
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
            Instead of sinking time and money into features with uncertain
            impact, the sprint gave Neotaste evidence-backed clarity on what
            would truly move the needle &mdash; and a prototype their team
            could confidently build from.
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
      description: "People faced cognitive overload and struggled to find places that matched their interests.",
      mockupSrc: IMAGES.discovery1,
    },
    {
      title: "Invites weren't working",
      description: "Users defaulted to Google Maps to coordinate with friends, breaking the growth loop and keeping sharing outside the app.",
      mockupSrc: IMAGES.discovery2,
    },
  ];

  return (
    <div ref={ref} className="mx-auto max-w-3xl">
      <SectionReveal>
        <SectionLabel label="Research" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Uncovering friction
        </h2>
        <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
          Through early user interviews, we discovered two blockers hurting
          Neotaste&apos;s growth. These weren&apos;t just UX issues &mdash; they
          were business problems directly impacting retention and engagement.
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
          Users wanted more control and less generic suggestions. We tested a
          progressive taste profile and smarter saved places to make discovery
          feel personal &mdash; and worth returning to.
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
    { number: 2, title: "Share button visibility", description: "Made sharing prominent and accessible throughout the app.", mockupSrc: IMAGES.phone6 },
    { number: 3, title: "Invites at booking", description: "Involve friends right at booking, when excitement peaks.", mockupSrc: IMAGES.phone7 },
    { number: 4, title: "Better map experience", description: "Show distance, travel time, and precise addresses for fast decisions.", mockupSrc: IMAGES.phone8 },
    { number: 5, title: "Actionable reviews", description: "Badges that show what makes a place special beyond star ratings.", mockupSrc: IMAGES.phone9 },
    { number: 6, title: "Photos in reviews", description: "Let users add images to set better expectations for visitors.", mockupSrc: IMAGES.phone10 },
    { number: 7, title: "User-generated tags", description: "Custom tags make reviews more scannable and discovery more personal.", mockupSrc: IMAGES.phone11 },
    { number: 8, title: "Emotion-driven sharing", description: "Sharing through contextual sections like 'catch up' makes invites feel natural.", mockupSrc: IMAGES.phone12 },
    { number: 9, title: "Richer share previews", description: "Shared links with deal details and saved lists give friends more context.", mockupSrc: IMAGES.phone13 },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <SectionReveal className="mx-auto max-w-3xl">
        <SectionLabel label="Invites" accentColor={accentColor} />
        <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
          Reimagining invites
        </h2>
        <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
          Invites were key to growth, but felt out of place. Users wanted
          easier sharing, clearer entry points, and the option to involve
          friends right at booking. We tested quick wins and deeper updates to
          make sharing natural and visible.
        </p>
      </SectionReveal>

      <div className="mt-10">
        <FeatureGrid features={features} columns={3} accentColor={accentColor} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 5 — Sprint Outcomes
   ═══════════════════════════════════ */
function OutcomeSection({ accentColor }: { accentColor: string }) {
  return (
    <SectionReveal className="mx-auto max-w-3xl">
      <SectionLabel label="Outcomes" accentColor={accentColor} />
      <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">
        Sprint outcomes
      </h2>
      <p className="mt-4 text-16 leading-[1.8] text-neutral-600">
        The 14-day sprint gave Neotaste evidence-backed clarity on which
        features would truly move the needle. We tested two competing concepts
        and delivered a validated product roadmap, saving months of unproven
        development.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-sand-200 bg-white p-5">
          <div className="mb-2 text-24 font-bold" style={{ color: accentColor }}>
            14 days
          </div>
          <p className="text-13 text-neutral-500">
            From kickoff to validated product roadmap
          </p>
        </div>
        <div className="rounded-xl border border-sand-200 bg-white p-5">
          <div className="mb-2 text-24 font-bold" style={{ color: accentColor }}>
            2 concepts
          </div>
          <p className="text-13 text-neutral-500">
            Prototyped, tested, and validated with real users
          </p>
        </div>
        <div className="rounded-xl border border-sand-200 bg-white p-5">
          <div className="mb-2 text-24 font-bold" style={{ color: accentColor }}>
            9 features
          </div>
          <p className="text-13 text-neutral-500">
            Prioritized for maximum engagement and retention impact
          </p>
        </div>
        <div className="rounded-xl border border-sand-200 bg-white p-5">
          <div className="mb-2 text-24 font-bold" style={{ color: accentColor }}>
            Months saved
          </div>
          <p className="text-13 text-neutral-500">
            Of building unproven features with uncertain ROI
          </p>
        </div>
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
