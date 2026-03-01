"use client";

/**
 * LearnImmersive — the full immersive case study experience for Learn.xyz.
 *
 * Assembles all section rooms into a single vertical scroll journey.
 * Each section is a full-viewport colored "room."
 * Full-bleed images create dramatic visual pauses between rooms.
 */

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
      />

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
