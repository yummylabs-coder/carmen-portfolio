import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { getExperience } from "@/lib/notion";

export const revalidate = 3600;

export default async function ExperiencePage() {
  const entries = await getExperience();

  return (
    <DashboardShell>
      <ExperienceTimeline entries={entries} />
    </DashboardShell>
  );
}
