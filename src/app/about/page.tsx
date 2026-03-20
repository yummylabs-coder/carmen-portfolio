import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AboutPageContent } from "@/components/about/AboutPageContent";
import { getTravelDestinations, getTracks } from "@/lib/notion";
import { aboutPhotos } from "@/lib/about-photos";

export const metadata: Metadata = {
  title: "About",
  description:
    "Product designer & builder based in Berlin. 9+ years shipping digital products across EdTech, Health Tech, and more.",
};

export const revalidate = 3600; // 1 hr — Notion image URLs expire after ~1h

export default async function AboutPage() {
  const [destinations, tracks] = await Promise.all([
    getTravelDestinations(),
    getTracks(),
  ]);
  const photos = aboutPhotos;

  return (
    <DashboardShell>
      <AboutPageContent photos={photos} destinations={destinations} tracks={tracks} />
    </DashboardShell>
  );
}
