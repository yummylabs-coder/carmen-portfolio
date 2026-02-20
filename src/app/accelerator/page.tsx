import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { YummyLabsPage } from "@/components/accelerator/YummyLabsPage";
import { getYummyAssets } from "@/lib/notion";

export const revalidate = 3600;

export default async function AcceleratorPage() {
  const assets = await getYummyAssets();

  return (
    <DashboardShell>
      <YummyLabsPage assets={assets} />
    </DashboardShell>
  );
}
