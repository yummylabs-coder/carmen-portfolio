"use client";

import { motion } from "framer-motion";

interface CurateBarProps {
  selectedCount: number;
  onCreateLink: () => void;
  onCancel: () => void;
}

export function CurateBar({ selectedCount, onCreateLink, onCancel }: CurateBarProps) {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-[60] lg:left-[240px]"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="border-t border-sand-300 bg-white/95 px-5 py-3 backdrop-blur-sm sm:px-8">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">
          {/* Left — count */}
          <div className="flex items-center gap-3">
            {selectedCount > 0 && (
              <span className="flex h-7 min-w-[28px] items-center justify-center rounded-full bg-blue-500 px-2 text-12 font-bold text-white">
                {selectedCount}
              </span>
            )}
            <span className="text-14 text-neutral-500">
              {selectedCount === 0
                ? "Select case studies to include"
                : `project${selectedCount === 1 ? "" : "s"} selected`}
            </span>
          </div>

          {/* Right — actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="text-13 font-medium text-neutral-400 transition-colors hover:text-neutral-600"
            >
              Cancel
            </button>
            <button
              onClick={onCreateLink}
              disabled={selectedCount === 0}
              className="rounded-lg bg-brand-ink px-4 py-2 text-13 font-semibold text-white transition-all hover:bg-brand-ink/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Create Link
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
