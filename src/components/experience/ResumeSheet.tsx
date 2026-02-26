"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { ExperienceEntry } from "@/lib/types";
import {
  CopyIcon,
  CheckIcon,
  LinkedInIcon,
  XIcon,
  ContactIcon,
} from "@/components/icons/NavIcons";
import { ResumeContent } from "./ResumeContent";

/* ─── Props ─── */
interface ResumeSheetProps {
  open: boolean;
  onClose: () => void;
  entries: ExperienceEntry[];
}

/* ─── Helpers ─── */
const siteUrl =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_SITE_URL ??
      "https://carmen-portfolio-iota.vercel.app";

const resumeUrl = `${siteUrl}/resume`;
const shareTitle = "Carmen Rincon — Resume";

/* ─── Resume Sheet ─── */
export function ResumeSheet({ open, onClose, entries }: ResumeSheetProps) {
  const [copied, setCopied] = useState(false);
  const [linkedInToast, setLinkedInToast] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const liTimerRef = useRef<NodeJS.Timeout | null>(null);

  /* Reset state when opened */
  useEffect(() => {
    if (open) {
      setCopied(false);
      setLinkedInToast(false);
    }
  }, [open]);

  /* Escape to close */
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  /* Lock body scroll when open */
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  /* Cleanup timers */
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (liTimerRef.current) clearTimeout(liTimerRef.current);
    };
  }, []);

  /* ── Actions ── */

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(resumeUrl);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = resumeUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2500);
  }, []);

  const handleLinkedInClick = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(resumeUrl);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = resumeUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setLinkedInToast(true);
    if (liTimerRef.current) clearTimeout(liTimerRef.current);
    liTimerRef.current = setTimeout(() => setLinkedInToast(false), 4000);
  }, []);

  const handleDownload = useCallback(() => {
    window.open(`${resumeUrl}?print=true`, "_blank");
  }, []);

  /* ── Share URLs ── */
  const emailUrl = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(resumeUrl)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(resumeUrl)}`;
  const xUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(resumeUrl)}&text=${encodeURIComponent(shareTitle)}`;

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-brand-ink/60 backdrop-blur-[3px] sm:bg-brand-ink/15 sm:backdrop-blur-[2px]"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            className="relative z-10 flex w-full max-w-[520px] flex-col overflow-hidden rounded-t-2xl border border-sand-300 bg-white shadow-xl sm:mx-4 sm:max-h-[85vh] sm:rounded-2xl"
            style={{ maxHeight: "95vh" }}
            initial={{ y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          >
            {/* ── Sticky Header ── */}
            <div className="flex shrink-0 items-center justify-between border-b border-sand-200 px-5 py-3.5">
              <div className="flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-neutral-400"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <h3 className="font-brand text-15 font-bold text-brand-ink">
                  Resume
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {/* Download PDF button */}
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 rounded-lg border border-sand-300 bg-sand-50 px-3 py-1.5 text-12 font-medium text-brand-ink transition-colors hover:bg-sand-100"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                  Download PDF
                </button>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-sand-100 text-neutral-400 transition-colors hover:bg-sand-200 hover:text-neutral-600"
                  aria-label="Close"
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 4L12 12M4 12L12 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* ── Scrollable Content ── */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <ResumeContent entries={entries} />
            </div>

            {/* ── Sticky Footer — Share Actions ── */}
            <div className="shrink-0 border-t border-sand-200 px-5 py-3.5">
              <div className="grid grid-cols-4 gap-2">
                {/* Copy link */}
                <button
                  onClick={handleCopy}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border py-2.5 text-[10px] font-medium transition-all ${
                    copied
                      ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                      : "border-sand-200 bg-sand-50 text-neutral-500 hover:bg-sand-100"
                  }`}
                >
                  {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
                  {copied ? "Copied!" : "Copy link"}
                </button>

                {/* Email */}
                <a
                  href={emailUrl}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-sand-200 bg-sand-50 py-2.5 text-[10px] font-medium text-neutral-500 transition-colors hover:bg-sand-100"
                >
                  <ContactIcon size={16} />
                  Email
                </a>

                {/* LinkedIn */}
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkedInClick}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-sand-200 bg-sand-50 py-2.5 text-[10px] font-medium text-neutral-500 transition-colors hover:bg-sand-100"
                >
                  <LinkedInIcon size={16} />
                  LinkedIn
                </a>

                {/* X */}
                <a
                  href={xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-sand-200 bg-sand-50 py-2.5 text-[10px] font-medium text-neutral-500 transition-colors hover:bg-sand-100"
                >
                  <XIcon size={16} />
                  X
                </a>
              </div>
            </div>
          </motion.div>

          {/* LinkedIn toast */}
          <AnimatePresence>
            {linkedInToast && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-6 left-1/2 z-[110] -translate-x-1/2 whitespace-nowrap rounded-xl border border-sand-200 bg-white px-4 py-3 text-13 text-brand-ink shadow-lg"
              >
                <span className="font-medium">Link copied</span> — paste it in
                your LinkedIn post
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
