import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ExperimentsPage } from "@/components/experiments/ExperimentsPage";

export default function ExperimentsRoute() {
  return (
    <DashboardShell>
      <ExperimentsPage />
    </DashboardShell>
  );
}
