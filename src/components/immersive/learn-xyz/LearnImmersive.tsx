"use client";

/**
 * LearnImmersive — the full immersive case study experience for Learn.xyz.
 *
 * Assembles all section rooms into a single vertical scroll journey.
 * Each section is a full-viewport colored "room."
 * Full-bleed images create dramatic visual pauses between rooms.
 */

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ImmersiveShell } from "../ImmersiveShell";
import { FullBleedImage } from "../FullBleedImage";
import { ImmersiveNextStudy } from "../ImmersiveNextStudy";
import { LearnHero } from "./LearnHero";
import { LearnJourney } from "./LearnJourney";
import { LearnProblem } from "./LearnProblem";
import { LearnBet } from "./LearnBet";
import { LearnRole } from "./LearnRole";
import { LearnDesignSystem } from "./LearnDesignSystem";
import { LearnMobileApp } from "./LearnMobileApp";
import { LearnPrototype } from "./LearnPrototype";
import { LearnDashboard } from "./LearnDashboard";
import { LearnWebsite } from "./LearnWebsite";
import { LearnOutcomes } from "./LearnOutcomes";
import { LearnCTA } from "./LearnCTA";
import { IMAGES } from "./LearnData";

interface LearnImmersiveProps {
  nextProject?: {
    title: string;
    slug: string;
    coverUrl: string;
    tags?: string[];
  } | null;
}

export function LearnImmersive({ nextProject }: LearnImmersiveProps) {
  const shouldReduce = useReducedMotion();

  return (
    <ImmersiveShell
      progressColor="#2216FF"
      backButtonBg="rgba(255,254,252,0.92)"
      isFeatured
    >
      {/* 1. Hero — The Gold Room */}
      <LearnHero />

      {/* 2. The Journey — Cream Room */}
      <LearnJourney />

      {/* 3. The Problem — Dark Violet Room */}
      <LearnProblem />

      {/* 3. The Bet — Gold Returns */}
      <LearnBet />

      {/* 4. My Role — Clean White Room */}
      <LearnRole />

      {/* — Full-bleed visual pause: team at work — */}
      <FullBleedImage
        src={IMAGES.teamWorking}
        alt="Team collaborating in the office"
        overlay="rgba(13,8,71,0.35)"
      />

      {/* 5. Design System — Deep Purple Room */}
      <LearnDesignSystem />

      {/* 6. Mobile App — Charcoal Room */}
      <LearnMobileApp />

      {/* 7. Interactive Prototype — Dark Violet Room */}
      <LearnPrototype />

      {/* — Full-bleed visual pause: office collaboration — */}
      <FullBleedImage
        src={IMAGES.officeCollab}
        alt="Team collaboration session"
        overlay="rgba(48,1,1,0.25)"
      >
        {/* Floating UI overlay cards */}
        <div className="relative h-full w-full max-w-[1200px] mx-auto">
          {/* Learning Path card — bottom-left */}
          <motion.div
            className="absolute bottom-[8%] left-[4%] w-[clamp(160px,20vw,260px)]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <motion.div
              className="drop-shadow-2xl"
              animate={
                shouldReduce
                  ? {}
                  : {
                      y: [-6, 6, -6],
                      rotate: [-1.5, 1.5, -1.5],
                    }
              }
              transition={{
                duration: 5.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src={IMAGES.overlayLearningPath}
                alt="You finished mastering your Learning Path!"
                width={566}
                height={800}
                className="h-auto w-full rounded-2xl"
                sizes="(min-width: 1024px) 260px, 20vw"
              />
            </motion.div>
          </motion.div>

          {/* Leaderboard card — top-right (hidden on small mobile) */}
          <motion.div
            className="absolute top-[10%] right-[4%] hidden w-[clamp(160px,20vw,240px)] sm:block"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          >
            <motion.div
              className="drop-shadow-2xl"
              animate={
                shouldReduce
                  ? {}
                  : {
                      y: [-5, 5, -5],
                      rotate: [1, -1, 1],
                    }
              }
              transition={{
                duration: 4.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            >
              <Image
                src={IMAGES.overlayLeaderboard}
                alt="January Leaderboard — You are learner #1"
                width={566}
                height={592}
                className="h-auto w-full rounded-2xl"
                sizes="(min-width: 1024px) 240px, 20vw"
              />
            </motion.div>
          </motion.div>
        </div>
      </FullBleedImage>

      {/* 8. Dashboard — Cream Room */}
      <LearnDashboard />

      {/* 9. Website — Gold Room */}
      <LearnWebsite />

      {/* 10. Outcomes — Brand Blue Room */}
      <LearnOutcomes />

      {/* 11. CTA — Book a Call */}
      <LearnCTA />

      {/* Next Case Study */}
      {nextProject && (
        <ImmersiveNextStudy
          title={nextProject.title}
          slug={nextProject.slug}
          coverUrl={nextProject.coverUrl}
          tags={nextProject.tags}
          bg="#FFFEFC"
          text="#300101"
        />
      )}
    </ImmersiveShell>
  );
}
