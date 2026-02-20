"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences, type ExperienceEntry } from "./experienceData";

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

        {/* Product Image Placeholder */}
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
          <div className="flex h-[180px] items-center justify-center sm:h-[220px]">
            <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-300">
              Product screenshot coming soon
            </span>
          </div>
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
              <span className="text-[18px]">{entry.logoEmoji}</span>
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
export function ExperienceTimeline() {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="mx-auto w-full max-w-[800px]">
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="font-brand text-[24px] font-bold text-brand-ink">
          Experience
        </h1>
        <p className="mt-2 text-15 text-neutral-500">
          Where I&apos;ve been and what I&apos;ve learned along the way
        </p>
      </header>

      {/* Timeline */}
      <div className="relative">
        {experiences.map((entry, idx) => (
          <TimelineEntry
            key={entry.id}
            entry={entry}
            isOpen={openId === entry.id}
            onToggle={() => handleToggle(entry.id)}
            isLast={idx === experiences.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
