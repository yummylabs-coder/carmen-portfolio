"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CaseStudy } from "@/lib/types";

interface FeaturedHeroCardProps {
  project: CaseStudy;
}

export function FeaturedHeroCard({ project }: FeaturedHeroCardProps) {
  return (
    <Link href={`/work/${project.slug}`} className="block">
      <motion.article
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="group flex h-[338px] overflow-hidden rounded-3xl border border-neutral-50 bg-bg-surface"
        style={{
          borderWidth: "0.68px",
          boxShadow:
            "0 20px 25px -5px rgba(48,1,1,0.08), 0 8px 10px -6px rgba(48,1,1,0.04)",
        }}
      >
        {/* Cover image — left half */}
        <div className="relative h-full w-1/2 overflow-hidden rounded-3xl">
          <Image
            src={project.coverUrl}
            alt={`${project.title} cover`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Content — right half */}
        <div className="flex w-1/2 flex-col justify-between gap-4 p-6">
          <div className="flex flex-col gap-3">
            <h3 className="font-brand text-22 font-bold text-brand-ink">
              {project.title}
            </h3>
            <p className="text-14 leading-[1.6] text-text-secondary">
              {project.summary}
            </p>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-neutral-50 px-[10px] py-1 text-11 font-medium text-text-tertiary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <button
            className="w-full rounded-lg bg-action-primary px-[22px] py-3 text-14 font-semibold text-white transition-colors duration-150 group-hover:bg-action-primary-hover"
            tabIndex={-1}
          >
            View Case Study
          </button>
        </div>
      </motion.article>
    </Link>
  );
}
