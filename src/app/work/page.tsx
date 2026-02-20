import { getAllProjects } from "@/lib/notion";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { FeaturedHeroCard } from "@/components/dashboard/FeaturedHeroCard";
import { WorkGrid } from "@/components/dashboard/WorkGrid";

export const revalidate = 3600;

const fallbackProjects = [
  {
    id: "1",
    title: "Water.day",
    summary:
      "A platform that teaches Gen Z better habits through daily stories, habits and facts.",
    coverUrl: "/cover-placeholder.svg",
    slug: "water-day",
    tags: ["Mobile App", "Health Tech"],
    isFeatured: true,
    sortOrder: 1,
  },
  {
    id: "2",
    title: "Yummy Labs",
    summary:
      "A food-tech platform connecting local chefs with hungry customers.",
    coverUrl: "/cover-placeholder.svg",
    slug: "yummy-labs",
    tags: ["Web App", "Food Tech"],
    isFeatured: false,
    sortOrder: 2,
  },
  {
    id: "3",
    title: "Learn.xyz",
    summary:
      "An e-learning platform that makes education accessible and engaging.",
    coverUrl: "/cover-placeholder.svg",
    slug: "learn-xyz",
    tags: ["Web App", "EdTech"],
    isFeatured: false,
    sortOrder: 3,
  },
  {
    id: "4",
    title: "Design System v2",
    summary:
      "A comprehensive design system with tokens, components, and patterns.",
    coverUrl: "/cover-placeholder.svg",
    slug: "design-system",
    tags: ["Design System", "Tooling"],
    isFeatured: false,
    sortOrder: 4,
  },
];

export default async function WorkPage() {
  let projects = await getAllProjects();

  if (projects.length === 0) {
    projects = fallbackProjects;
  }

  const featured = projects.find((p) => p.isFeatured);
  // All projects in the grid (exclude the featured hero), coming soon at the end
  const allForGrid = projects
    .filter((p) => p.id !== featured?.id)
    .sort((a, b) => {
      if (a.isComingSoon !== b.isComingSoon) return a.isComingSoon ? 1 : -1;
      return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
    });

  return (
    <DashboardShell>
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-brand text-22 font-bold text-brand-ink">
          My work
        </h1>
        <p className="text-14 leading-[1.6] text-neutral-400">
          A selection of my most recent case studies
        </p>
      </div>

      {/* Featured project */}
      {featured && (
        <section className="flex flex-col gap-3">
          <h2 className="font-brand text-17 font-semibold text-brand-ink">
            Featured &#x2B50;&#xFE0F;
          </h2>
          <FeaturedHeroCard project={featured} />
        </section>
      )}

      {/* All projects grid */}
      {allForGrid.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="font-brand text-17 font-semibold text-brand-ink">
            All projects
          </h2>
          <WorkGrid projects={allForGrid} />
        </section>
      )}
    </DashboardShell>
  );
}
