"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Changelog entries (GitHub commit style) ─── */
const CHANGES = [
  {
    hash: "a3f8d2e",
    message: "Improving case studies",
    date: "Mar 2026",
    status: "in-progress" as const,
  },
  {
    hash: "7c1b4f0",
    message: "Adding new case studies",
    date: "Mar 2026",
    status: "in-progress" as const,
  },
  {
    hash: "e9d6a12",
    message: "Improving mobile experience",
    date: "Feb 2026",
    status: "in-progress" as const,
  },
];

interface VersionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VersionDetailsModal({ isOpen, onClose }: VersionDetailsModalProps) {
  const savedScrollY = useRef(0);

  useEffect(() => {
    if (isOpen) {
      savedScrollY.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${savedScrollY.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else if (document.body.style.position === "fixed") {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, savedScrollY.current);
    }
    return () => {
      if (document.body.style.position === "fixed") {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        window.scrollTo(0, savedScrollY.current);
      }
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-brand-ink/50 backdrop-blur-[6px]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-[420px] rounded-2xl border border-sand-300 bg-[#fcfaf8] shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Terminal header */}
            <div className="flex items-center justify-between border-b border-sand-300 px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <button
                    onClick={onClose}
                    className="h-3 w-3 rounded-full bg-[#ff5f57] transition-opacity hover:opacity-80"
                    aria-label="Close"
                  />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="font-mono text-[11px] text-neutral-400">
                  ~/portfolio
                </span>
              </div>
              <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.5px] text-yellow-600">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-600" />
                building v15
              </span>
            </div>

            {/* Commit log */}
            <div className="px-5 py-4">
              <div className="mb-3 font-mono text-[11px] text-neutral-400">
                $ git log --oneline
              </div>

              <div className="flex flex-col gap-2.5">
                {CHANGES.map((c) => (
                  <div key={c.hash} className="flex items-start gap-3">
                    {/* Commit dot + line */}
                    <div className="flex flex-col items-center pt-[5px]">
                      <span className="h-2 w-2 rounded-full bg-yellow-500" />
                      <span className="mt-1 h-4 w-px bg-sand-300" />
                    </div>

                    <div className="flex flex-1 flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-yellow-600">
                          {c.hash}
                        </span>
                        <span className="rounded bg-yellow-100 px-1.5 py-0.5 font-mono text-[9px] font-medium text-yellow-700">
                          in progress
                        </span>
                      </div>
                      <span className="mt-0.5 text-[13px] font-medium text-brand-ink/80">
                        {c.message}
                      </span>
                      <span className="mt-0.5 font-mono text-[10px] text-neutral-400">
                        {c.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bug report */}
            <div className="border-t border-sand-300 px-5 py-4">
              <a
                href="mailto:carmenrincon92@gmail.com?subject=Bug Report — carmen-elena.space&body=Hi Carmen,%0A%0AI found a bug on your portfolio:%0A%0A[Describe the bug here]%0A%0APage: %0ABrowser: %0ADevice: "
                className="flex items-center gap-2 rounded-lg bg-sand-100 px-3.5 py-2.5 text-[13px] font-medium text-brand-ink/60 transition-colors hover:bg-sand-200 hover:text-brand-ink/80"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
                Find a bug? Report it
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
