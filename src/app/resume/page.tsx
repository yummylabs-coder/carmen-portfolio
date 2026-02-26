import { Suspense } from "react";
import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ResumePageContent } from "@/components/experience/ResumePageContent";
import { ResumePrintTrigger } from "@/components/experience/ResumePrintTrigger";
import { getExperience } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Resume — Carmen Rincon",
  description:
    "Product Designer & Strategist with 9+ years of experience building end-to-end digital products across startups and scale-ups.",
};

export const revalidate = 3600;

export default async function ResumePage() {
  const entries = await getExperience();

  return (
    <DashboardShell>
      <Suspense>
        <ResumePrintTrigger />
      </Suspense>
      <ResumePageContent entries={entries} />
    </DashboardShell>
  );
}
