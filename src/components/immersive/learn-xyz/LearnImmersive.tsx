"use client";

/**
 * LearnImmersive — the full immersive case study experience for Learn.xyz.
 *
 * Assembles all section rooms into a single vertical scroll journey.
 * Each section is a full-viewport colored "room."
 */

import { ImmersiveShell } from "../ImmersiveShell";
import { LearnHero } from "./LearnHero";
import { LearnProblem } from "./LearnProblem";
import { LearnBet } from "./LearnBet";
import { LearnRole } from "./LearnRole";
import { LearnDesignSystem } from "./LearnDesignSystem";
import { LearnMobileApp } from "./LearnMobileApp";
import { LearnDashboard } from "./LearnDashboard";
import { LearnWebsite } from "./LearnWebsite";
import { LearnOutcomes } from "./LearnOutcomes";

export function LearnImmersive() {
  return (
    <ImmersiveShell
      progressColor="#2216FF"
      backButtonBg="rgba(255,254,252,0.92)"
    >
      {/* 1. Hero — The Gold Room */}
      <LearnHero />

      {/* 2. The Problem — The Dark Room */}
      <LearnProblem />

      {/* 3. The Bet — Gold Returns */}
      <LearnBet />

      {/* 4. My Role — Clean White Room */}
      <LearnRole />

      {/* 5. Design System — Deep Purple Room */}
      <LearnDesignSystem />

      {/* 6. Mobile App — Charcoal Room */}
      <LearnMobileApp />

      {/* 7. Dashboard — Cream Room */}
      <LearnDashboard />

      {/* 8. Website — Gold Room */}
      <LearnWebsite />

      {/* 9. Outcomes — Brand Blue Room */}
      <LearnOutcomes />
    </ImmersiveShell>
  );
}
