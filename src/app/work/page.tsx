import type { Metadata } from "next";
import { getAllProjects, getCaseStudyPreviews } from "@/lib/notion";
import { fallbackProjects } from "@/lib/fallback-projects";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { FeaturedHeroCard } from "@/components/dashboard/FeaturedHeroCard";
import { WorkGrid } from "@/components/dashboard/WorkGrid";
import { PageEntrance } from "@/components/ui/PageEntrance";
import { CurateToggle } from "@/components/share/CurateToggle";
import { FeaturedCurationWrapper } from "@/components/share/FeaturedCurationWrapper";

export const metadata: Metadata = {
  title: "My Work",
  description:
    "A selection of case studies from 9+ years of product design spanning EdTech, Health Tech, Food Tech, and more.",
  openGraph: {
    title: "My Work | Carmen Rincon",
    description:
      "A selection of case studies from 9+ years of product design.",
  },
};

export const revalidate = 3600; // 1 hr — Notion image URLs expire after ~1h

export default async function WorkPage() {
  const [rawProjects, previews] = await Promise.all([
    getAllProjects(),
    getCaseStudyPreviews(),
  ]);
  let projects = rawProjects;

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
      <PageEntrance>
        {/* Page header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="font-brand text-22 font-bold text-brand-ink">
                My work
              </h1>
              <p className="text-14 leading-[1.6] text-neutral-400">
                A selection of my most recent case studies
              </p>
            </div>
            {/* Desktop: inline with header */}
            <div className="hidden sm:block">
              <CurateToggle />
            </div>
          </div>
          {/* Mobile: below header, left-aligned */}
          <div className="sm:hidden">
            <CurateToggle />
          </div>
        </div>

        {/* Featured project */}
        {featured && (
          <section
            className="flex flex-col gap-4 overflow-hidden rounded-3xl border border-[#3D0A0A] p-5 md:p-6"
            style={{
              background:
                "linear-gradient(145deg, #300101 0%, #3D0A0A 50%, #2A0000 100%)",
            }}
          >
            <h2 className="font-brand text-17 font-semibold text-white">
              Featured &#x2B50;&#xFE0F;
            </h2>
            <FeaturedCurationWrapper slug={featured.slug}>
              <FeaturedHeroCard project={featured} />
            </FeaturedCurationWrapper>
          </section>
        )}

        {/* All projects grid */}
        {allForGrid.length > 0 && (
          <section className="flex flex-col gap-3">
            <h2 className="font-brand text-17 font-semibold text-brand-ink">
              All projects
            </h2>
            <WorkGrid projects={allForGrid} previews={previews} featuredProject={featured} />
          </section>
        )}
      </PageEntrance>
    </DashboardShell>
  );
}
