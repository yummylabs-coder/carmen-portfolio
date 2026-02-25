import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ProcessPageContent } from "@/components/process/ProcessPageContent";
import { getProcessPhaseImages } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How I approach product design, from discovery and research through design sprints, iteration, and delivery.",
};

export default async function ProcessPage() {
  const phaseImages = await getProcessPhaseImages();

  return (
    <DashboardShell>
      <ProcessPageContent phaseImages={phaseImages} />
    </DashboardShell>
  );
}
