"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface CaseStudyCardProps {
  title: string;
  summary: string;
  coverUrl: string;
  slug: string;
  className?: string;
}

function CaseStudyCard({
  title,
  summary,
  coverUrl,
  slug,
  className = "",
}: CaseStudyCardProps) {
  return (
    <Link href={`/work/${slug}`} className={`block ${className}`}>
      <motion.article
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border-default bg-bg-surface"
        style={{
          borderWidth: "0.68px",
          boxShadow:
            "0 8px 10px -6px rgba(48, 1, 1, 0.04), 0 20px 25px -5px rgba(48, 1, 1, 0.08)",
        }}
      >
        {/* Cover image */}
        <div className="relative h-[200px] w-full overflow-hidden">
          <Image
            src={coverUrl}
            alt={`${title} cover`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 320px"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 px-4 pb-5 pt-4">
          <div className="flex flex-1 flex-col gap-1">
            <h3 className="font-brand text-17 font-bold text-text-primary">
              {title}
            </h3>
            <p className="text-14 leading-snug text-text-secondary">
              {summary}
            </p>
          </div>

          {/* CTA button */}
          <button
            className="w-full rounded-lg bg-action-primary px-4 py-3 text-14 font-semibold text-text-on-dark transition-colors duration-150 group-hover:bg-action-primary-hover"
            tabIndex={-1}
          >
            View Case Study
          </button>
        </div>
      </motion.article>
    </Link>
  );
}

CaseStudyCard.displayName = "CaseStudyCard";
export { CaseStudyCard };
export type { CaseStudyCardProps };
