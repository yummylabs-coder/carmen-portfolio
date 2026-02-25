"use client";

import Link from "next/link";
import Image from "next/image";
import type { CaseStudy } from "@/lib/types";
import { ScrollReveal } from "@/components/dashboard/ScrollReveal";

interface NextCaseStudyProps {
  project: CaseStudy;
}

export function NextCaseStudy({ project }: NextCaseStudyProps) {
  return (
    <ScrollReveal>
      <section className="flex flex-col gap-4">
        <span className="text-12 font-semibold uppercase tracking-[1px] text-neutral-500">
          Next Case Study
        </span>
        <Link
          href={`/work/${project.slug}`}
          className="group flex items-center gap-4 rounded-2xl border border-sand-300 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-sand-400 hover:shadow-[0_8px_24px_rgba(48,1,1,0.06)]"
        >
          {/* Thumbnail */}
          <div className="relative h-[60px] w-[80px] shrink-0 overflow-hidden rounded-lg">
            <Image
              src={project.coverUrl}
              alt={project.title}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>

          {/* Info */}
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <h3 className="font-brand text-16 font-bold text-brand-ink">
              {project.title}
            </h3>
            {project.tags && project.tags.length > 0 && (
              <p className="text-13 text-neutral-500">
                {project.tags[0]}
              </p>
            )}
          </div>

          {/* Arrow */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white transition-colors group-hover:bg-blue-600">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </section>
    </ScrollReveal>
  );
}
