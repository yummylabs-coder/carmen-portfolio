import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug, getCaseStudySections, getNextCaseStudy, getAllProjects } from "@/lib/notion";
import { getCaseStudyConfig } from "@/lib/case-study-config";
import { AtmosphericImage } from "@/components/case-study/AtmosphericImage";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ProgressBar } from "@/components/case-study/ProgressBar";
import { HeroSection } from "@/components/case-study/HeroSection";
import { MainHeroImage } from "@/components/case-study/MainHeroImage";
import { Overview } from "@/components/case-study/Overview";
import { Challenge } from "@/components/case-study/Challenge";
import { OurRole } from "@/components/case-study/OurRole";
import { ContentSection } from "@/components/case-study/ContentSection";
import { ProcessTimeline } from "@/components/case-study/ProcessTimeline";
import { StickyNotesBanner } from "@/components/case-study/StickyNotesBanner";
import { Outcomes } from "@/components/case-study/Outcomes";
import { NextCaseStudy } from "@/components/case-study/NextCaseStudy";

/* ─── Immersive case studies (full-screen, no sidebar) ─── */
import { LearnImmersive } from "@/components/immersive/learn-xyz/LearnImmersive";

/** Slugs that use the immersive full-screen experience instead of DashboardShell */
const immersiveSlugs = new Set(["learn-xyz"]);

/* ─── Custom interactive sections per case study ─── */
import { PandoreSections } from "@/components/case-study/sections/PandoreSections";
import { AusventureSections } from "@/components/case-study/sections/AusventureSections";
import { NeotasteSections } from "@/components/case-study/sections/NeotasteSections";
import { WaterdaySections } from "@/components/case-study/sections/WaterdaySections";
import { LearnXyzSections } from "@/components/case-study/sections/LearnXyzSections";

const customSectionMap: Record<string, React.ComponentType<{ accentColor: string }>> = {
  pandore: PandoreSections,
  ausventure: AusventureSections,
  neotaste: NeotasteSections,
  "water-day": WaterdaySections,
  "learn-xyz": LearnXyzSections,
};

/* When custom sections already include their own Role / Outcomes,
   skip the shared Notion-sourced ones to avoid duplicates. */
const skipSharedSections: Record<string, { role?: boolean; outcomes?: boolean }> = {
  "learn-xyz": { role: true, outcomes: true },
};

export const revalidate = 3600; // 1 hr — Notion image URLs expire after ~1h

/** Pre-build all case study pages at deploy time */
export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) return {};

  const title = `${study.title} | Case Study`;
  const description =
    study.summary || `${study.title} case study by Carmen Rincon`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      ...(study.coverUrl && !study.coverUrl.includes("placeholder")
        ? { images: [{ url: study.coverUrl, width: 1200, height: 630 }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(study.coverUrl && !study.coverUrl.includes("placeholder")
        ? { images: [study.coverUrl] }
        : {}),
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;

  const study = await getCaseStudyBySlug(slug);
  if (!study) notFound();

  const [sections, nextProject] = await Promise.all([
    getCaseStudySections(study.id),
    getNextCaseStudy(study.order),
  ]);

  const config = getCaseStudyConfig(slug);

  /* Apply config overrides to study data */
  const studyWithOverrides = config.summaryOverride
    ? { ...study, summary: config.summaryOverride }
    : study;

  /* ── Immersive full-screen experience for select case studies ── */
  if (immersiveSlugs.has(slug)) {
    return (
      <LearnImmersive
        nextProject={
          nextProject
            ? {
                title: nextProject.title,
                slug: nextProject.slug,
                coverUrl: nextProject.coverUrl,
                tags: nextProject.tags,
              }
            : null
        }
      />
    );
  }

  return (
    <DashboardShell>
      <ProgressBar
        progressBarColor={config.brand.progressBar}
        nextProject={nextProject ? { title: nextProject.title, slug: nextProject.slug, coverUrl: nextProject.coverUrl, tags: nextProject.tags } : null}
      />

      <div className="flex flex-col gap-14">
        {/* Branded Hero (includes breadcrumb, full-bleed bg) */}
        <HeroSection study={studyWithOverrides} readTime={config.readTime} brand={config.brand} heroVisual={config.heroVisual} />

        {/* Full-bleed atmospheric image (right after hero, no gap) */}
        {config.atmosphericImage && (
          <AtmosphericImage
            src={config.atmosphericImage.src}
            alt={config.atmosphericImage.alt}
            brandBg={config.brand.bg}
          />
        )}

        {/* Full-bleed Main Hero Image */}
        {study.mainHeroImage && (
          <MainHeroImage src={study.mainHeroImage} alt={`${study.title} hero`} />
        )}

        {/* Overview */}
        <Overview text={study.overview} />

        {/* The Challenge */}
        <Challenge text={study.challenge} />

        {/* Our Role — skip if custom sections handle it */}
        {!skipSharedSections[slug]?.role && (
          <OurRole description={study.roleDescription} />
        )}

        {/* Content Sections — custom interactive or Notion fallback */}
        {customSectionMap[slug] ? (
          (() => {
            const CustomSections = customSectionMap[slug];
            return <CustomSections accentColor={config.brand.accentColor} />;
          })()
        ) : (
          sections.map((section) => (
            <ContentSection key={section.id} section={section} accentColor={config.brand.accentColor} />
          ))
        )}

        {/* Process Timeline (hardcoded per case study) */}
        {config.timelineSteps.length > 0 && (
          <ProcessTimeline
            duration={config.timelineDuration}
            steps={config.timelineSteps}
          />
        )}

        {/* Sticky Notes Banner */}
        <StickyNotesBanner />

        {/* Outcomes — skip if custom sections handle it */}
        {!skipSharedSections[slug]?.outcomes && (
          <Outcomes outcomes={study.outcomes} />
        )}

        {/* Next Case Study */}
        {nextProject && <NextCaseStudy project={nextProject} />}
      </div>
    </DashboardShell>
  );
}
