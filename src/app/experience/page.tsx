import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";

export default function ExperiencePage() {
  return (
    <DashboardShell>
      <ExperienceTimeline />
    </DashboardShell>
  );
}
