import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AboutPageContent } from "@/components/about/AboutPageContent";
import { getAboutPhotos, getTravelDestinations, getTracks } from "@/lib/notion";

export const metadata: Metadata = {
  title: "About",
  description:
    "Product designer & builder based in Berlin. 9+ years shipping digital products across EdTech, Health Tech, and more.",
};

export const revalidate = 3600; // 1 hr — Notion image URLs expire after ~1h

export default async function AboutPage() {
  const [photos, destinations, tracks] = await Promise.all([
    getAboutPhotos(),
    getTravelDestinations(),
    getTracks(),
  ]);

  return (
    <DashboardShell>
      <AboutPageContent photos={photos} destinations={destinations} tracks={tracks} />
    </DashboardShell>
  );
}
