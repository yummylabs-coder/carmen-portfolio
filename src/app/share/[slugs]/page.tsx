import type { Metadata } from "next";
import { cache } from "react";
import Link from "next/link";
import { getAllProjects, getCaseStudyBySlug } from "@/lib/notion";
import { fallbackProjects, getStaticCover } from "@/lib/fallback-projects";
import { SharePacketHeader } from "@/components/share/SharePacketHeader";
import { SharePacketCard } from "@/components/share/SharePacketCard";
import type { CaseStudy } from "@/lib/types";

/**
 * Always render fresh — share links must reflect current data,
 * and we never want an empty result cached by ISR.
 */
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slugs: string }>;
  searchParams: Promise<{ for?: string; note?: string; d?: string }>;
}

/** Normalize slug so "learn.xyz", "learn-xyz", "Learn XYZ" all become "learn-xyz" */
function normalizeSlug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** Parse "water-day,learn-xyz" → ["water-day", "learn-xyz"] */
function parseSlugs(raw: string): string[] {
  return raw
    .split(",")
    .map((s) => decodeURIComponent(s.trim()))
    .filter(Boolean);
}

/**
 * Decode the inline project data from the `d` query param.
 * This is a base64-encoded JSON array created by ShareSheet
 * so the share page can render without any Notion API call.
 */
function decodeInlineData(d: string | undefined): CaseStudy[] | null {
  if (!d) return null;
  try {
    const json = Buffer.from(d, "base64").toString("utf-8");
    const arr = JSON.parse(json);
    if (!Array.isArray(arr) || arr.length === 0) return null;
    return arr.map(
      (item: { t?: string; s?: string; d?: string; k?: string[] }, i: number) => ({
        id: `inline-${i}`,
        title: item.t || "Untitled",
        slug: item.s || "",
        summary: item.d || "",
        coverUrl: getStaticCover(item.s || ""),
        tags: item.k || [],
      })
    );
  } catch {
    return null;
  }
}

/**
 * Robust project fetcher with four tiers:
 * 0. Inline data from URL (instant — no API call)
 * 1. getAllProjects() from Notion (best — live data with cover images)
 * 2. getCaseStudyBySlug() per-slug from Notion (if bulk fetch fails)
 * 3. fallbackProjects hardcoded data (if Notion is completely down)
 *
 * All comparisons use normalizeSlug() so "learn.xyz" matches "learn-xyz".
 */
async function resolveProjects(
  slugs: string[],
  inlineData: CaseStudy[] | null,
): Promise<CaseStudy[]> {
  if (slugs.length === 0) return [];

  const normalizedInput = slugs.map(normalizeSlug);

  // Tier 1: try getting all projects from Notion (has cover images)
  let allProjects: CaseStudy[] = [];
  try {
    allProjects = await getAllProjects();
    console.log(
      `[share] getAllProjects returned ${allProjects.length} projects`,
    );
  } catch (e) {
    console.error("[share] getAllProjects failed:", e);
  }

  if (allProjects.length > 0) {
    const matched = normalizedInput
      .map((ns) => allProjects.find((p) => normalizeSlug(p.slug) === ns))
      .filter(Boolean) as CaseStudy[];

    if (matched.length > 0) {
      console.log(
        `[share] Tier 1 matched ${matched.length}/${slugs.length}: ${matched.map((p) => p.title).join(", ")}`,
      );
      return matched;
    }
    console.warn(
      `[share] Tier 1: 0 matches. Project slugs in DB: ${allProjects.map((p) => p.slug).join(", ")}`,
    );
  }

  // Tier 2: try fetching each slug individually from Notion
  console.warn("[share] Trying per-slug fetch...");
  const perSlugResults = await Promise.allSettled(
    slugs.map(async (slug): Promise<CaseStudy | null> => {
      try {
        let detail = await getCaseStudyBySlug(slug);
        if (!detail) {
          const normalized = normalizeSlug(slug);
          if (normalized !== slug) {
            detail = await getCaseStudyBySlug(normalized);
          }
        }
        if (!detail) return null;
        return {
          id: detail.id,
          title: detail.title,
          summary: detail.summary,
          coverUrl: detail.coverUrl,
          slug: detail.slug,
          tags: [...detail.services, ...detail.platform],
          isFeatured: detail.status === "Featured",
          isComingSoon:
            detail.status !== "Published" && detail.status !== "Featured",
          sortOrder: detail.order,
        };
      } catch {
        return null;
      }
    }),
  );

  const fromSlugFetch = perSlugResults
    .filter(
      (r): r is PromiseFulfilledResult<CaseStudy | null> =>
        r.status === "fulfilled",
    )
    .map((r) => r.value)
    .filter(Boolean) as CaseStudy[];

  if (fromSlugFetch.length > 0) {
    console.log(
      `[share] Tier 2 matched ${fromSlugFetch.length}/${slugs.length}`,
    );
    return fromSlugFetch;
  }

  // Tier 3: use inline data from the URL (always available for new links)
  if (inlineData && inlineData.length > 0) {
    console.log(
      `[share] Tier 3: using inline data from URL (${inlineData.length} projects)`,
    );
    return inlineData;
  }

  // Tier 4: use hardcoded fallback (normalize both sides)
  console.warn(
    "[share] All Notion calls failed, using fallback data",
  );
  return normalizedInput
    .map((ns) => fallbackProjects.find((p) => normalizeSlug(p.slug) === ns))
    .filter(Boolean) as CaseStudy[];
}

/**
 * Deduplicate data fetching between generateMetadata + page component
 * so we make one Notion API attempt per request instead of two.
 */
const getShareData = cache(
  async (rawSlugs: string, dParam: string | undefined) => {
    const slugs = parseSlugs(rawSlugs);
    const inlineData = decodeInlineData(dParam);
    const projects = await resolveProjects(slugs, inlineData);
    return { slugs, projects };
  },
);

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { slugs: rawSlugs } = await params;
  const { for: companyName, d } = await searchParams;
  const { projects } = await getShareData(rawSlugs, d);
  const titles = projects.map((p) => p.title).join(", ");

  const title = companyName
    ? `Selected Work for ${companyName} | Carmen Rincon`
    : `Selected Work | Carmen Rincon`;

  const description =
    projects.length > 0
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

export default async function SharePacketPage({
  params,
  searchParams,
}: PageProps) {
  const { slugs: rawSlugs } = await params;
  const { for: companyName, note, d } = await searchParams;
  const { projects } = await getShareData(rawSlugs, d);

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
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </main>
    </>
  );
}
