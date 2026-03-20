import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AboutPageContent } from "@/components/about/AboutPageContent";
import { getTracks } from "@/lib/notion";
import { aboutPhotos } from "@/lib/about-photos";
import { travelDestinations } from "@/lib/travel-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Product designer & builder based in Berlin. 9+ years shipping digital products across EdTech, Health Tech, and more.",
};

export const revalidate = 3600; // 1 hr — Notion image URLs expire after ~1h

export default async function AboutPage() {
  const tracks = await getTracks();
  const photos = aboutPhotos;
  const destinations = travelDestinations;

  return (
    <DashboardShell>
      <AboutPageContent photos={photos} destinations={destinations} tracks={tracks} />
    </DashboardShell>
  );
}
