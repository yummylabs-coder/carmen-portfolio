"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ImageWithShimmer } from "@/components/ui/ImageWithShimmer";
import { CheckIcon } from "@/components/icons/NavIcons";

interface CaseStudyCardProps {
  title: string;
  summary: string;
  coverUrl: string;
  slug: string;
  tags?: string[];
  isComingSoon?: boolean;
  hasPreview?: boolean;
  onOpenPreview?: () => void;
  priority?: boolean;
  className?: string;
  /** Selection mode props */
  selectable?: boolean;
  selected?: boolean;
  onSelect?: () => void;
}

function CardInner({
  title,
  summary,
  coverUrl,
  tags,
  isComingSoon,
  priority,
  selectable,
  selected,
}: Pick<CaseStudyCardProps, "title" | "summary" | "coverUrl" | "tags" | "isComingSoon" | "priority" | "selectable" | "selected">) {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  return (
    <motion.article
      whileHover={canHover && !selectable ? { y: -3 } : undefined}
      whileTap={!canHover && !selectable ? { scale: 0.98 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`group flex h-full w-full flex-col overflow-hidden rounded-3xl border bg-sand-100 transition-all ${
        selectable && selected
          ? "border-blue-400 ring-2 ring-blue-100"
          : "border-sand-300"
      }`}
    >
      {/* Cover image — scales subtly on hover */}
      <div className="relative h-[200px] w-full overflow-hidden rounded-[24px]">
        <ImageWithShimmer
          src={coverUrl}
          alt={`${title} cover`}
          fill
          priority={priority}
          quality={85}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {isComingSoon && !selectable && (
          <div className="absolute right-3 top-3 z-10">
            <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-brand-ink backdrop-blur-sm">
              Coming Soon
            </span>
          </div>
        )}
        {/* Selection checkbox overlay */}
        {selectable && (
          <div className="absolute right-3 top-3 z-10">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all ${
                selected
                  ? "border-blue-500 bg-blue-500 text-white"
                  : "border-white/80 bg-white/60 text-transparent backdrop-blur-sm"
              }`}
            >
              <CheckIcon size={14} />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 px-4 pb-5 pt-4">
        <div className="flex flex-1 flex-col gap-1">
          <h3 className="font-brand text-17 font-bold text-text-primary">
            {title}
          </h3>
          <p className="line-clamp-3 text-14 leading-snug text-text-secondary">
            {summary}
          </p>
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-sand-200 px-[10px] py-1 text-11 font-medium text-text-tertiary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA button — hidden during selection mode */}
        {!selectable && (
          <button
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-action-primary px-4 py-3 text-14 font-semibold text-text-on-dark transition-colors duration-150 group-hover:bg-action-primary-hover"
            tabIndex={-1}
          >
            {isComingSoon ? (
              <>
                View a preview
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </>
            ) : (
              <>
                Peek inside {title}
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
              </>
            )}
          </button>
        )}
      </div>
    </motion.article>
  );
}

function CaseStudyCard({
  title,
  summary,
  coverUrl,
  slug,
  tags,
  isComingSoon,
  hasPreview,
  onOpenPreview,
  priority,
  className = "",
  selectable,
  selected,
  onSelect,
}: CaseStudyCardProps) {
  // Selection mode — card click toggles selection
  if (selectable) {
    return (
      <div
        className={`block cursor-pointer ${className}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onSelect?.();
        }}
      >
        <CardInner title={title} summary={summary} coverUrl={coverUrl} tags={tags} isComingSoon={isComingSoon} priority={priority} selectable selected={selected} />
      </div>
    );
  }

  if (isComingSoon) {
    return (
      <div
        className={`block ${hasPreview ? "cursor-pointer" : ""} ${className}`}
        onClick={hasPreview && onOpenPreview ? onOpenPreview : undefined}
      >
        <CardInner title={title} summary={summary} coverUrl={coverUrl} tags={tags} isComingSoon priority={priority} />
      </div>
    );
  }

  return (
    <Link href={`/work/${slug}`} className={`block ${className}`}>
      <CardInner title={title} summary={summary} coverUrl={coverUrl} tags={tags} priority={priority} />
    </Link>
  );
}

CaseStudyCard.displayName = "CaseStudyCard";
export { CaseStudyCard };
export type { CaseStudyCardProps };
