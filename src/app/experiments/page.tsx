import { getExperiments } from "@/lib/notion";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ExperimentsPage } from "@/components/experiments/ExperimentsPage";

export const revalidate = 3600;

const fallbackExperiments = [
  {
    id: "1",
    name: "Figma Token Sync",
    type: "Chrome Extension",
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
    description:
      "Auto-generate component documentation from your Figma components.",
    status: "progress" as const,
    statusLabel: "In Progress",
    order: 3,
  },
];

export default async function ExperimentsRoute() {
  let experiments = await getExperiments();

  if (experiments.length === 0) {
    experiments = fallbackExperiments;
  }

  return (
    <DashboardShell>
      <ExperimentsPage experiments={experiments} />
    </DashboardShell>
  );
}
