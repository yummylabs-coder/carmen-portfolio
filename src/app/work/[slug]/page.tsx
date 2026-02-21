import { notFound } from "next/navigation";
import { getCaseStudyBySlug, getCaseStudySections, getNextCaseStudy } from "@/lib/notion";
import { getCaseStudyConfig } from "@/lib/case-study-config";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ProgressBar } from "@/components/case-study/ProgressBar";
import { Breadcrumb } from "@/components/case-study/Breadcrumb";
import { HeroSection } from "@/components/case-study/HeroSection";
import { MainHeroImage } from "@/components/case-study/MainHeroImage";
import { OurRole } from "@/components/case-study/OurRole";
import { ContentSection } from "@/components/case-study/ContentSection";
import { ProcessTimeline } from "@/components/case-study/ProcessTimeline";
import { StickyNotesBanner } from "@/components/case-study/StickyNotesBanner";
import { Outcomes } from "@/components/case-study/Outcomes";
import { NextCaseStudy } from "@/components/case-study/NextCaseStudy";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
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

  return (
    <DashboardShell>
      <ProgressBar
        progressBarColor={config.brand.progressBar}
        celebrationColors={config.brand.celebrationColors}
      />

      <div className="flex flex-col gap-14">
        {/* Breadcrumb */}
        <Breadcrumb caseName={study.title} />

        {/* Branded Hero Section (full-bleed bg) */}
        <HeroSection study={study} readTime={config.readTime} brand={config.brand} />

        {/* Full-bleed Main Hero Image */}
        {study.mainHeroImage && (
          <MainHeroImage src={study.mainHeroImage} alt={`${study.title} hero`} />
        )}

        {/* Our Role */}
        <OurRole description={study.roleDescription} />

        {/* Content Sections from Notion */}
        {sections.map((section) => (
          <ContentSection key={section.id} section={section} />
        ))}

        {/* Process Timeline (hardcoded per case study) */}
        {config.timelineSteps.length > 0 && (
          <ProcessTimeline
            duration={config.timelineDuration}
            steps={config.timelineSteps}
          />
        )}

        {/* Sticky Notes Banner */}
        <StickyNotesBanner />

        {/* Outcomes */}
        <Outcomes outcomes={study.outcomes} />

        {/* Next Case Study */}
        {nextProject && <NextCaseStudy project={nextProject} />}
      </div>
    </DashboardShell>
  );
}
