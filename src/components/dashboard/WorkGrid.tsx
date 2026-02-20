"use client";

import type { CaseStudy } from "@/lib/types";
import { CaseStudyCard } from "@/components/ui";
import { ScrollReveal } from "./ScrollReveal";

interface WorkGridProps {
  projects: CaseStudy[];
}

export function WorkGrid({ projects }: WorkGridProps) {
  return (
    <ScrollReveal delay={0.15}>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <CaseStudyCard
            key={project.id}
            title={project.title}
            summary={project.summary}
            coverUrl={project.coverUrl}
            slug={project.slug}
            tags={project.tags}
            isComingSoon={project.isComingSoon}
          />
        ))}
      </div>
    </ScrollReveal>
  );
}
