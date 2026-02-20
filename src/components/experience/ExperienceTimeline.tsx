"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ExperienceEntry } from "@/lib/types";

/* ─── Fallback data (used when Notion returns empty) ─── */
const fallbackExperiences: ExperienceEntry[] = [
  {
    id: "yummy",
    slug: "yummy",
    company: "Yummy Design Labs",
    logoUrl: "",
    productImageUrl: "",
    roleSummary: "Co-Founder & Product Sprint Leader",
    dateRange: "2025 - Now",
    isCurrent: true,
    roles: [
      { title: "Product Sprint Leader", start: "Sep 2025", end: "Present" },
      { title: "Co-Founder, Product Lead", start: "Mar 2025", end: "Present" },
    ],
    whatILearned:
      "Running my own design studio, working with startups through focused sprints. Also built Yummy Labs - an accelerator helping junior-mid level designers get hands-on experience with tech and AI startups.",
    order: 1,
  },
  {
    id: "learnxyz",
    slug: "learnxyz",
    company: "Learn.xyz",
    logoUrl: "",
    productImageUrl: "",
    roleSummary: "Director, Product Design - Senior Product Designer",
    dateRange: "2022 - 2025",
    isCurrent: false,
    roles: [
      { title: "Director, Product Design", start: "Jul 2023", end: "Mar 2025" },
      { title: "Senior Product Designer", start: "Jan 2022", end: "Jul 2023" },
    ],
    whatILearned:
      "Founding designer of an AI learning startup (B2C + B2B). Built everything from the ground up - product vision, design system, user research, and shipped features across web and mobile.",
    order: 2,
  },
  {
    id: "cleanchoice",
    slug: "cleanchoice",
    company: "CleanChoice Energy",
    logoUrl: "",
    productImageUrl: "",
    roleSummary: "Product Designer",
    dateRange: "2019 - 2022",
    isCurrent: false,
    roles: [
      { title: "Product Designer", start: "Dec 2019", end: "Jan 2022" },
    ],
    whatILearned:
      "Worked with a large product and tech team, navigating the complexities of environmental regulations and clean energy policy. Learned to design for compliance while keeping the user experience simple.",
    order: 3,
  },
  {
    id: "vox",
    slug: "vox",
    company: "VOX Global",
    logoUrl: "",
    productImageUrl: "",
    roleSummary: "UX Designer - Graphic Designer - Intern",
    dateRange: "2017 - 2019",
    isCurrent: false,
    roles: [
      { title: "User Experience Designer", start: "Jul 2019", end: "Nov 2019" },
      { title: "Graphic Designer", start: "Jun 2018", end: "Apr 2019" },
      { title: "Associate Designer", start: "Aug 2017", end: "Jun 2018" },
      { title: "Digital Fellow & Intern", start: "Jan 2017", end: "Jul 2017" },
    ],
    whatILearned:
      "Where it all started. Grew from intern to UX designer over 2+ years. By the end, I was leading major UX projects for clients like AT&T and Nissan.",
    order: 4,
  },
];

/* ─── Logo emojis fallback (when no logo image uploaded) ─── */
const slugEmoji: Record<string, string> = {
  yummy: "\u{1F9EA}",
  learnxyz: "\u{1F4DA}",
  cleanchoice: "\u26A1",
  vox: "\u{1F310}",
};

interface ExperienceTimelineProps {
  entries: ExperienceEntry[];
}

/* ─── Expand / Collapse Icon ─── */
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="shrink-0 text-neutral-400"
    >
      <path
        d="M5 8l5 5 5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

/* ─── Timeline Dot ─── */
function TimelineDot({ isCurrent, isOpen }: { isCurrent: boolean; isOpen: boolean }) {
  return (
    <div
      className={`relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
        isCurrent || isOpen
          ? "border-blue-600 bg-blue-600"
          : "border-neutral-300 bg-white hover:border-blue-400"
      }`}
    >
      {(isCurrent || isOpen) && (
        <div className="h-2 w-2 rounded-full bg-white" />
      )}
    </div>
  );
}

/* ─── Company Logo ─── */
function CompanyLogo({ entry }: { entry: ExperienceEntry }) {
  if (entry.logoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={entry.logoUrl}
        alt={`${entry.company} logo`}
        className="h-7 w-7 rounded-md object-contain"
      />
    );
  }
  return (
    <span className="text-[18px]">
      {slugEmoji[entry.slug] || "\u{1F3E2}"}
    </span>
  );
}

/* ─── Expanded Card Content ─── */
function CardExpanded({ entry }: { entry: ExperienceEntry }) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className="pb-6 pt-4">
        {/* Roles Timeline */}
        <div className="mb-5">
          <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
            Roles
          </h4>
          <div className="space-y-2">
            {entry.roles.map((role, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg bg-neutral-50 px-3 py-2.5"
              >
                <span className="text-13 font-medium text-brand-ink">
                  {role.title}
                </span>
                <span className="text-[12px] text-neutral-400">
                  {role.start} - {role.end}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* What I Learned */}
        <div className="mb-5">
          <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
            What I Learned
          </h4>
          <p className="text-13 leading-relaxed text-neutral-600">
            {entry.whatILearned}
          </p>
        </div>

        {/* Product Image */}
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
          {entry.productImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={entry.productImageUrl}
              alt={`${entry.company} product`}
              className="w-full object-cover"
            />
          ) : (
            <div className="flex h-[180px] items-center justify-center sm:h-[220px]">
              <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-300">
                Product screenshot coming soon
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Single Timeline Entry ─── */
function TimelineEntry({
  entry,
  isOpen,
  onToggle,
  isLast,
}: {
  entry: ExperienceEntry;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
}) {
  return (
    <div className="relative flex gap-4 sm:gap-6">
      {/* Timeline Rail (vertical line) */}
      <div className="flex flex-col items-center">
        <TimelineDot isCurrent={entry.isCurrent} isOpen={isOpen} />
        {!isLast && (
          <div className="w-px flex-1 bg-gradient-to-b from-neutral-200 to-neutral-100" />
        )}
      </div>

      {/* Card */}
      <div className="mb-8 min-w-0 flex-1 pb-2">
        {/* Clickable Header */}
        <button
          onClick={onToggle}
          className="group flex w-full items-start justify-between rounded-2xl border border-neutral-200 bg-white px-5 py-4 text-left transition-all hover:border-neutral-300 hover:shadow-sm"
        >
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <CompanyLogo entry={entry} />
              <h3 className="font-brand text-[16px] font-semibold text-brand-ink">
                {entry.company}
              </h3>
              {entry.isCurrent && (
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600">
                  Current
                </span>
              )}
            </div>
            <p className="text-13 text-neutral-500">{entry.roleSummary}</p>
            <p className="mt-1 text-[12px] text-neutral-400">
              {entry.dateRange}
            </p>
          </div>
          <ChevronIcon open={isOpen} />
        </button>

        {/* Expandable Content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <div className="mt-3 rounded-2xl border border-neutral-200 bg-white px-5">
              <CardExpanded entry={entry} />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Main Timeline ─── */
export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  const items = entries.length > 0 ? entries : fallbackExperiences;
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-brand text-22 font-bold text-brand-ink">
          Experience
        </h1>
        <p className="text-14 leading-[1.6] text-neutral-400">
          Where I&apos;ve been and what I&apos;ve learned along the way
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {items.map((entry, idx) => (
          <TimelineEntry
            key={entry.id}
            entry={entry}
            isOpen={openId === entry.id}
            onToggle={() => handleToggle(entry.id)}
            isLast={idx === items.length - 1}
          />
        ))}
      </div>
    </>
  );
}
