import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { getExperience } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "9+ years of product design experience across startups and scale-ups. Roles, learnings, and highlights.",
};

export const revalidate = 3600; // 1 hr — Notion image URLs expire after ~1h

export default async function ExperiencePage() {
  const entries = await getExperience();

  return (
    <DashboardShell>
      <ExperienceTimeline entries={entries} />
    </DashboardShell>
  );
}
