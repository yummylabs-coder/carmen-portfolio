import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { YummyLabsPage } from "@/components/accelerator/YummyLabsPage";
import { getYummyAssets } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Accelerator",
  description:
    "Yummy Labs design accelerator. Mentoring the next generation of product designers through real-world sprints.",
};

export const revalidate = 3600; // 1 hr — Notion image URLs expire after ~1h

export default async function AcceleratorPage() {
  const assets = await getYummyAssets();

  return (
    <DashboardShell>
      <YummyLabsPage assets={assets} />
    </DashboardShell>
  );
}
