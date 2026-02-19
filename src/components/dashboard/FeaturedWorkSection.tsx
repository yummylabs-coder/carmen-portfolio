"use client";

import type { CaseStudy } from "@/lib/types";
import { CaseStudyCard } from "@/components/ui";
import { ScrollReveal } from "./ScrollReveal";

interface FeaturedWorkSectionProps {
  caseStudies: CaseStudy[];
}

export function FeaturedWorkSection({ caseStudies }: FeaturedWorkSectionProps) {
  return (
    <ScrollReveal delay={0.1}>
      <section
        className="overflow-hidden rounded-3xl border border-neutral-200 p-6"
        style={{ background: "var(--bg-page)" }}
      >
        <h2 className="mb-6 max-w-[700px] font-brand text-17 font-semibold leading-[1.3] text-brand-ink">
          Featured work
        </h2>

        <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
          {caseStudies.map((study) => (
            <CaseStudyCard
              key={study.id}
              title={study.title}
              summary={study.summary}
              coverUrl={study.coverUrl}
              slug={study.slug}
              className="w-[320px] shrink-0"
            />
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}
