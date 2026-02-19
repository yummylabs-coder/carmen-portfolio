import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AboutPageContent } from "@/components/about/AboutPageContent";
import { getAboutPhotos, getCurrentFavorites } from "@/lib/notion";

export const revalidate = 3600;

export default async function AboutPage() {
  const [photos, favorites] = await Promise.all([
    getAboutPhotos(),
    getCurrentFavorites(),
  ]);

  return (
    <DashboardShell>
      <AboutPageContent photos={photos} favorites={favorites} />
    </DashboardShell>
  );
}
