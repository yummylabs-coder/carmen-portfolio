"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import type { CaseStudy, CaseStudyPreviewMap } from "@/lib/types";
import { CaseStudyCard } from "@/components/ui";
import { PreviewModal } from "@/components/ui/PreviewModal";
import type { PreviewModalData } from "@/components/ui/PreviewModal";
import { ScrollReveal } from "./ScrollReveal";
import { CurateBar } from "@/components/share/CurateBar";
import { ShareSheet } from "@/components/share/ShareSheet";

interface WorkGridProps {
  projects: CaseStudy[];
  previews?: CaseStudyPreviewMap;
  featuredProject?: CaseStudy;
}

export function WorkGrid({ projects, previews = {}, featuredProject }: WorkGridProps) {
  const [previewData, setPreviewData] = useState<PreviewModalData | null>(null);

  // Curation state
  const [isCurating, setIsCurating] = useState(false);
  const [selectedSlugs, setSelectedSlugs] = useState<Set<string>>(new Set());
  const [showShareSheet, setShowShareSheet] = useState(false);

  const openPreview = useCallback(
    (project: CaseStudy) => {
      const preview = previews[project.title.toLowerCase()];
      setPreviewData({
        title: project.title,
        summary: project.summary,
        coverUrl: project.coverUrl,
        imageUrls: preview?.imageUrls,
        captions: preview?.captions,
        videoUrl: preview?.videoUrl,
        tags: project.tags,
      });
    },
    [previews],
  );

  const closePreview = useCallback(() => {
    setPreviewData(null);
  }, []);

  const toggleSelect = useCallback((slug: string) => {
    setSelectedSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  }, []);

  const exitCuration = useCallback(() => {
    setIsCurating(false);
    setSelectedSlugs(new Set());
    setShowShareSheet(false);
    window.dispatchEvent(new Event("curate-end"));
  }, []);

  // Listen for curate-start / curate-cancel events from CurateToggle
  useEffect(() => {
    const handleStart = () => {
      setIsCurating(true);
      setSelectedSlugs(new Set());
    };
    const handleCancel = () => {
      setIsCurating(false);
      setSelectedSlugs(new Set());
      setShowShareSheet(false);
    };
    window.addEventListener("curate-start", handleStart);
    window.addEventListener("curate-cancel", handleCancel);
    return () => {
      window.removeEventListener("curate-start", handleStart);
      window.removeEventListener("curate-cancel", handleCancel);
    };
  }, []);

  // Listen for featured-select / featured-deselect from FeaturedCurationWrapper
  useEffect(() => {
    const handleFeaturedSelect = (e: Event) => {
      const slug = (e as CustomEvent).detail.slug;
      setSelectedSlugs((prev) => {
        const next = new Set(prev);
        next.add(slug);
        return next;
      });
    };
    const handleFeaturedDeselect = (e: Event) => {
      const slug = (e as CustomEvent).detail.slug;
      setSelectedSlugs((prev) => {
        const next = new Set(prev);
        next.delete(slug);
        return next;
      });
    };
    window.addEventListener("featured-select", handleFeaturedSelect);
    window.addEventListener("featured-deselect", handleFeaturedDeselect);
    return () => {
      window.removeEventListener("featured-select", handleFeaturedSelect);
      window.removeEventListener("featured-deselect", handleFeaturedDeselect);
    };
  }, []);

  // Build selectedProjects including featured if selected
  const selectedProjects = [
    ...(featuredProject && selectedSlugs.has(featuredProject.slug) ? [featuredProject] : []),
    ...projects.filter((p) => selectedSlugs.has(p.slug)),
  ];

  return (
    <>
      {/* Selection hint when curating */}
      {isCurating && (
        <div className="mb-1 flex items-center justify-end">
          <span className="text-12 font-medium text-blue-500">
            Tap projects to select them
          </span>
        </div>
      )}

      <ScrollReveal delay={0.15}>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, idx) => {
            const hasPreview =
              !!previews[project.title.toLowerCase()] || !!project.coverUrl;
            return (
              <CaseStudyCard
                key={project.id}
                title={project.title}
                summary={project.summary}
                coverUrl={project.coverUrl}
                slug={project.slug}
                tags={project.tags}
                isComingSoon={project.isComingSoon}
                hasPreview={hasPreview}
                onOpenPreview={() => openPreview(project)}
                priority={idx < 3}
                selectable={isCurating}
                selected={selectedSlugs.has(project.slug)}
                onSelect={() => toggleSelect(project.slug)}
              />
            );
          })}
        </div>
      </ScrollReveal>

      {/* Preview modal */}
      <AnimatePresence>
        {previewData && (
          <PreviewModal data={previewData} onClose={closePreview} />
        )}
      </AnimatePresence>

      {/* Curate bar */}
      <AnimatePresence>
        {isCurating && !showShareSheet && (
          <CurateBar
            selectedCount={selectedSlugs.size}
            onCreateLink={() => setShowShareSheet(true)}
            onCancel={exitCuration}
          />
        )}
      </AnimatePresence>

      {/* Share sheet */}
      <ShareSheet
        open={showShareSheet}
        onClose={exitCuration}
        selectedProjects={selectedProjects}
      />
    </>
  );
}
