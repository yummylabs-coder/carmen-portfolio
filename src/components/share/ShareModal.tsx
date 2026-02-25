"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CopyIcon, CheckIcon, LinkedInIcon, XIcon, ContactIcon } from "@/components/icons/NavIcons";
import { AnimatedLogoMark } from "@/components/icons/AnimatedLogoMark";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  url?: string;
  title?: string;
}

export function ShareModal({ open, onClose, url, title }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [shareTitle, setShareTitle] = useState("");
  const [linkedInToast, setLinkedInToast] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const liTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (open) {
      setShareUrl(url ?? window.location.href);
      setShareTitle(title ?? document.title);
      setCopied(false);
      setLinkedInToast(false);
    }
  }, [open, url, title]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (liTimerRef.current) clearTimeout(liTimerRef.current);
    };
  }, []);

  // Copy ONLY the URL
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = shareUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2500);
  }, [shareUrl]);

  // LinkedIn: copy URL to clipboard, then let the <a> open LinkedIn
  const handleLinkedInClick = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = shareUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setLinkedInToast(true);
    if (liTimerRef.current) clearTimeout(liTimerRef.current);
    liTimerRef.current = setTimeout(() => setLinkedInToast(false), 4000);
  }, [shareUrl]);

  const emailUrl = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const xUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;

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
          <motion.div
            className="absolute inset-0 bg-brand-ink/60 backdrop-blur-[3px] sm:bg-brand-ink/15 sm:backdrop-blur-[2px]"
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 w-full max-w-[420px] overflow-hidden rounded-t-2xl border border-sand-300 bg-white shadow-xl sm:mx-4 sm:rounded-2xl"
            initial={{ y: 40, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-sand-200 px-5 py-3.5">
              <h3 className="font-brand text-15 font-bold text-brand-ink">Share</h3>
              <button
                onClick={onClose}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-sand-100 text-neutral-400 transition-colors hover:bg-sand-200 hover:text-neutral-600"
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4L12 12M4 12L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Preview card */}
            <div className="px-5 pt-4">
              <div className="overflow-hidden rounded-xl border border-sand-200">
                {/* Gradient header */}
                <div
                  className="flex items-center gap-3 px-4 py-3"
                  style={{
                    background: "linear-gradient(135deg, #F8F7FF 0%, #FFF8F0 50%, #F0FAFA 100%)",
                  }}
                >
                  <AnimatedLogoMark size={36} />
                  <div className="flex min-w-0 flex-col">
                    <span className="font-brand text-14 font-bold text-brand-ink">
                      Carmen Rincon
                    </span>
                    <span className="text-11 text-neutral-400">
                      Product Design &amp; Strategy
                    </span>
                  </div>
                </div>
                {/* URL */}
                <div className="border-t border-sand-200 bg-sand-50 px-4 py-2">
                  <span className="block truncate text-12 text-neutral-400">
                    {shareUrl}
                  </span>
                </div>
              </div>
            </div>

            {/* Primary CTA — Copy link */}
            <div className="px-5 pt-4 pb-2">
              <button
                onClick={handleCopy}
                className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-14 font-semibold transition-all ${
                  copied
                    ? "border border-emerald-200 bg-emerald-50 text-emerald-600"
                    : "bg-brand-ink text-white hover:bg-brand-ink/90"
                }`}
              >
                {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
                {copied ? "Link copied!" : "Copy share link"}
              </button>
            </div>

            {/* Secondary share options */}
            <div className="px-5 pb-5 pt-2">
              <p className="mb-2 text-11 font-medium uppercase tracking-wide text-neutral-300">
                Or share directly via
              </p>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={emailUrl}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-sand-200 bg-sand-50 py-3 text-11 font-medium text-neutral-500 transition-colors hover:bg-sand-100"
                >
                  <ContactIcon size={18} />
                  Email
                </a>
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkedInClick}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-sand-200 bg-sand-50 py-3 text-11 font-medium text-neutral-500 transition-colors hover:bg-sand-100"
                >
                  <LinkedInIcon size={18} />
                  LinkedIn
                </a>
                <a
                  href={xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-sand-200 bg-sand-50 py-3 text-11 font-medium text-neutral-500 transition-colors hover:bg-sand-100"
                >
                  <XIcon size={18} />
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
                <span className="font-medium">Link copied</span> — paste it in your LinkedIn post
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
