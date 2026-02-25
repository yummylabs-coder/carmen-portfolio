"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CaseStudy } from "@/lib/types";
import { ImageWithShimmer } from "@/components/ui/ImageWithShimmer";

interface FeaturedHeroCardProps {
  project: CaseStudy;
}

export function FeaturedHeroCard({ project }: FeaturedHeroCardProps) {
  return (
    <Link href={`/work/${project.slug}`} className="block">
      <motion.article
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="group flex flex-col overflow-hidden rounded-3xl border border-sand-300 bg-sand-100 md:h-[338px] md:flex-row"
      >
        {/* Cover image — full width on mobile, left half on desktop */}
        <div className="relative h-[220px] w-full overflow-hidden md:h-full md:w-1/2 md:rounded-3xl">
          <ImageWithShimmer
            src={project.coverUrl}
            alt={`${project.title} cover`}
            fill
            priority
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Content — full width on mobile, right half on desktop */}
        <div className="flex w-full flex-col justify-between gap-4 p-5 md:w-1/2 md:p-6">
          <div className="flex flex-col gap-3">
            <h3 className="font-brand text-22 font-bold text-brand-ink">
              {project.title}
            </h3>
            <p className="line-clamp-3 text-14 leading-[1.6] text-text-secondary">
              {project.summary}
            </p>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-sand-200 px-[10px] py-1 text-11 font-medium text-text-tertiary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <button
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-action-primary px-[22px] py-3 text-14 font-semibold text-white transition-colors duration-150 group-hover:bg-action-primary-hover"
            tabIndex={-1}
          >
            Peek inside {project.title}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </motion.article>
    </Link>
  );
}
