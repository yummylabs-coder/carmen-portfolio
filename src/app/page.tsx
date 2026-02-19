import { getFeaturedCaseStudies } from "@/lib/notion";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { GreetingSection } from "@/components/dashboard/GreetingSection";
import { FeaturedWorkSection } from "@/components/dashboard/FeaturedWorkSection";
import { MyNumbersWidget } from "@/components/dashboard/MyNumbersWidget";
import { RecentActivityWidget } from "@/components/dashboard/RecentActivityWidget";

export const revalidate = 3600;

const fallbackStudies = [
  {
    id: "1",
    title: "Water.day",
    summary:
      "A platform that teaches Gen Z better habits through daily stories, habits and facts.",
    coverUrl: "/cover-placeholder.svg",
    slug: "water-day",
  },
  {
    id: "2",
    title: "Yummy Labs",
    summary:
      "A food-tech platform connecting local chefs with hungry customers.",
    coverUrl: "/cover-placeholder.svg",
    slug: "yummy-labs",
  },
  {
    id: "3",
    title: "Design System v2",
    summary:
      "A comprehensive design system with tokens, components, and patterns.",
    coverUrl: "/cover-placeholder.svg",
    slug: "design-system",
  },
];

export default async function Home() {
  let caseStudies = await getFeaturedCaseStudies();

  if (caseStudies.length === 0) {
    caseStudies = fallbackStudies;
  }

  return (
    <DashboardShell>
      <GreetingSection />

      <FeaturedWorkSection caseStudies={caseStudies} />

      <div className="flex w-full flex-col gap-5 lg:flex-row">
        <MyNumbersWidget />
        <RecentActivityWidget />
      </div>
    </DashboardShell>
  );
}
