import type { Metadata } from "next";
import Link from "next/link";
import { getAllProjects, getCaseStudyBySlug } from "@/lib/notion";
import { fallbackProjects } from "@/lib/fallback-projects";
import { SharePacketHeader } from "@/components/share/SharePacketHeader";
import { SharePacketCard } from "@/components/share/SharePacketCard";
import type { CaseStudy } from "@/lib/types";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slugs: string }>;
  searchParams: Promise<{ for?: string; note?: string }>;
}

/** Parse "water-day,learn-xyz" → ["water-day", "learn-xyz"] */
function parseSlugs(raw: string): string[] {
  return raw
    .split(",")
    .map((s) => decodeURIComponent(s.trim()))
    .filter(Boolean);
}

/**
 * Robust project fetcher with three tiers of fallback:
 * 1. getAllProjects() from Notion (best — returns live data with cover images)
 * 2. getCaseStudyBySlug() per-slug from Notion (if bulk fetch fails)
 * 3. fallbackProjects hardcoded data (if Notion is completely down)
 */
async function resolveProjects(slugs: string[]): Promise<CaseStudy[]> {
  // Tier 1: try getting all projects from Notion
  let allProjects: CaseStudy[] = [];
  try {
    allProjects = await getAllProjects();
  } catch (e) {
    console.error("[share] getAllProjects failed:", e);
  }

  if (allProjects.length > 0) {
    const matched = slugs
      .map((slug) => allProjects.find((p) => p.slug === slug))
      .filter(Boolean) as CaseStudy[];

    if (matched.length > 0) return matched;
  }

  // Tier 2: try fetching each slug individually from Notion
  console.warn("[share] Bulk fetch returned 0 projects, trying per-slug fetch...");
  const perSlugResults = await Promise.allSettled(
    slugs.map(async (slug): Promise<CaseStudy | null> => {
      try {
        const detail = await getCaseStudyBySlug(slug);
        if (!detail) return null;
        return {
          id: detail.id,
          title: detail.title,
          summary: detail.summary,
          coverUrl: detail.coverUrl,
          slug: detail.slug,
          tags: [...detail.services, ...detail.platform],
          isFeatured: detail.status === "Featured",
          isComingSoon: detail.status !== "Published" && detail.status !== "Featured",
          sortOrder: detail.order,
        };
      } catch {
        return null;
      }
    })
  );

  const fromSlugFetch = perSlugResults
    .filter((r): r is PromiseFulfilledResult<CaseStudy | null> => r.status === "fulfilled")
    .map((r) => r.value)
    .filter(Boolean) as CaseStudy[];

  if (fromSlugFetch.length > 0) return fromSlugFetch;

  // Tier 3: use hardcoded fallback
  console.warn("[share] Per-slug fetch returned 0 results, using fallback data");
  return slugs
    .map((slug) => fallbackProjects.find((p) => p.slug === slug))
    .filter(Boolean) as CaseStudy[];
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slugs: rawSlugs } = await params;
  const { for: companyName } = await searchParams;
  const slugs = parseSlugs(rawSlugs);
  const projects = await resolveProjects(slugs);
  const titles = projects.map((p) => p.title).join(", ");

  const title = companyName
    ? `Selected Work for ${companyName} | Carmen Rincon`
    : `Selected Work | Carmen Rincon`;

  const description = projects.length > 0
    ? `${projects.length} hand-picked case ${projects.length === 1 ? "study" : "studies"}: ${titles}`
    : "A curated selection of product design case studies by Carmen Rincon";

  return {
    title,
    description,
    openGraph: { title, description, type: "article" },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: false },
  };
}

export default async function SharePacketPage({ params, searchParams }: PageProps) {
  const { slugs: rawSlugs } = await params;
  const { for: companyName, note } = await searchParams;
  const slugs = parseSlugs(rawSlugs);
  const projects = await resolveProjects(slugs);

  return (
    <>
      <SharePacketHeader
        companyName={companyName}
        projectCount={projects.length}
        note={note}
      />

      <main className="mx-auto max-w-[1000px] px-5 py-8 sm:px-8 sm:py-10">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <p className="text-16 text-neutral-500">
              No matching case studies found.
            </p>
            <Link
              href="/work"
              className="rounded-lg bg-brand-ink px-5 py-2.5 text-14 font-semibold text-white transition-colors hover:bg-brand-ink/90"
            >
              View all work
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <SharePacketCard
                key={project.id}
                title={project.title}
                summary={project.summary}
                coverUrl={project.coverUrl}
                slug={project.slug}
                tags={project.tags}
              />
            ))}
          </div>
        )}

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-sand-200 pt-8">
          <p className="text-13 text-neutral-400">Want to see more?</p>
          <Link
            href="/work"
            className="flex items-center gap-1.5 rounded-lg border border-sand-300 bg-sand-50 px-4 py-2.5 text-13 font-medium text-neutral-500 transition-colors hover:bg-sand-100 hover:text-brand-ink"
          >
            Explore the full portfolio
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </main>
    </>
  );
}
