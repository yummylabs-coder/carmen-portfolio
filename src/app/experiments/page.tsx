import type { Metadata } from "next";
import { getExperiments, getExperimentPreviews } from "@/lib/notion";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ExperimentsPage } from "@/components/experiments/ExperimentsPage";

export const metadata: Metadata = {
  title: "The Lab",
  description:
    "Experiments, side projects, and designer toolkit resources by Carmen Rincon.",
};

export const revalidate = 3600; // 1 hr — Notion image URLs expire after ~1h

const fallbackExperiments = [
  {
    id: "1",
    name: "Figma Token Sync",
    type: "Chrome Extension",
    category: "experiment" as const,
    description:
      "A Chrome extension that syncs design tokens between Figma and your codebase in real-time.",
    status: "live" as const,
    statusLabel: "Live",
    order: 1,
  },
  {
    id: "2",
    name: "Palette Generator",
    type: "Web App",
    category: "experiment" as const,
    description:
      "Generate accessible color palettes from a single brand color with WCAG contrast checking.",
    status: "live" as const,
    statusLabel: "Live",
    order: 2,
  },
  {
    id: "3",
    name: "Component Doc Gen",
    type: "Figma Plugin",
    category: "experiment" as const,
    description:
      "Auto-generate component documentation from your Figma components.",
    status: "progress" as const,
    statusLabel: "In Progress",
    order: 3,
  },
];

export default async function ExperimentsRoute() {
  const [experimentsRaw, previews] = await Promise.all([
    getExperiments(),
    getExperimentPreviews(),
  ]);

  const experiments = experimentsRaw.length > 0 ? experimentsRaw : fallbackExperiments;

  return (
    <DashboardShell>
      <ExperimentsPage experiments={experiments} previews={previews} />
    </DashboardShell>
  );
}
