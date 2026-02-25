"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CopyIcon, CheckIcon, LinkedInIcon, XIcon, ContactIcon } from "@/components/icons/NavIcons";
import { AnimatedLogoMark } from "@/components/icons/AnimatedLogoMark";
import type { CaseStudy } from "@/lib/types";

interface ShareSheetProps {
  open: boolean;
  onClose: () => void;
  selectedProjects: CaseStudy[];
}

const siteUrl =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_SITE_URL ?? "https://carmen-portfolio-iota.vercel.app";

export function ShareSheet({ open, onClose, selectedProjects }: ShareSheetProps) {
  const [companyName, setCompanyName] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);
  const [linkedInToast, setLinkedInToast] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const liTimerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setCopied(false);
      setCompanyName("");
      setNote("");
      setLinkedInToast(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

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

  // Build the share URL — note is encoded as a query param so the recipient sees it
  const shareUrl = (() => {
    const slugs = selectedProjects.map((p) => p.slug).join(",");
    const base = `${siteUrl}/share/${slugs}`;
    const params = new URLSearchParams();
    if (companyName.trim()) params.set("for", companyName.trim());
    if (note.trim()) params.set("note", note.trim());
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  })();

  const shareTitle = companyName.trim()
    ? `Selected Work for ${companyName.trim()} — Carmen Rincon`
    : "Selected Work by Carmen Rincon";

  // For email body: include note + URL together
  const emailBody = note.trim()
    ? `${note.trim()}\n\n${shareUrl}`
    : shareUrl;

  // Copy ONLY the URL (note is embedded as ?note= param, so recipient sees it on the page)
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

  // LinkedIn: copy note+URL to clipboard first, then let the <a> open LinkedIn
  const handleLinkedInClick = useCallback(async () => {
    const textToCopy = note.trim()
      ? `${note.trim()}\n\n${shareUrl}`
      : shareUrl;
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setLinkedInToast(true);
    if (liTimerRef.current) clearTimeout(liTimerRef.current);
    liTimerRef.current = setTimeout(() => setLinkedInToast(false), 4000);
  }, [note, shareUrl]);

  const emailUrl = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(emailBody)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const xUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(note.trim() || shareTitle)}`;

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
          <motion.div className="absolute inset-0 bg-brand-ink/15 backdrop-blur-[3px]" onClick={onClose} />

          <motion.div
            className="relative z-10 w-full max-w-[460px] overflow-hidden rounded-t-2xl border border-sand-300 bg-white shadow-xl sm:mx-4 sm:max-w-[780px] sm:rounded-2xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {/* Header with close X */}
            <div className="flex items-center justify-between border-b border-sand-200 px-5 py-4">
              <div>
                <h3 className="font-brand text-16 font-bold text-brand-ink">
                  Share curated case studies
                </h3>
                <p className="mt-0.5 text-12 text-neutral-400">
                  Create a curated link anyone can open
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sand-100 text-neutral-400 transition-colors hover:bg-sand-200 hover:text-neutral-600"
                aria-label="Close"
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4L12 12M4 12L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* 2-column layout on desktop, stacked on mobile */}
            <div className="sm:flex">
              {/* LEFT COLUMN — form inputs */}
              <div className="flex-1 sm:border-r sm:border-sand-200">
                {/* Selected projects preview */}
                <div className="flex gap-2 overflow-x-auto px-5 py-4">
                  {selectedProjects.map((project) => (
                    <div key={project.id} className="flex shrink-0 items-center gap-2 rounded-lg border border-sand-200 bg-sand-50 px-2.5 py-1.5">
                      <div className="relative h-6 w-8 shrink-0 overflow-hidden rounded">
                        <Image src={project.coverUrl} alt={project.title} fill className="object-cover" sizes="32px" />
                      </div>
                      <span className="text-12 font-medium text-brand-ink">{project.title}</span>
                    </div>
                  ))}
                </div>

                {/* Curate for */}
                <div className="px-5 pb-3">
                  <label className="mb-1.5 block text-12 font-medium text-neutral-500">Curate for</label>
                  <input
                    ref={inputRef}
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Company name or person"
                    className="w-full rounded-xl border border-sand-300 bg-sand-50 px-3.5 py-2.5 text-14 text-brand-ink placeholder:text-neutral-300 outline-none transition-colors focus:border-blue-300 focus:ring-2 focus:ring-blue-50"
                  />
                </div>

                {/* Optional message */}
                <div className="px-5 pb-4">
                  <label className="mb-1.5 block text-12 font-medium text-neutral-500">
                    Add a note <span className="text-neutral-300">(optional)</span>
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="e.g. Hey! Here are the projects most relevant to your team..."
                    rows={2}
                    className="w-full resize-none rounded-xl border border-sand-300 bg-sand-50 px-3.5 py-2.5 text-14 text-brand-ink placeholder:text-neutral-300 outline-none transition-colors focus:border-blue-300 focus:ring-2 focus:ring-blue-50"
                  />
                </div>

                {/* Primary CTA — Copy share link */}
                <div className="border-t border-sand-200 px-5 pt-4 pb-2">
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
                <div className="px-5 pb-4 pt-2">
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
              </div>

              {/* RIGHT COLUMN — live preview (desktop only on side, mobile stacked above actions) */}
              <div className="border-t border-sand-200 px-5 py-4 sm:w-[300px] sm:shrink-0 sm:border-t-0 sm:py-5">
                <p className="mb-2.5 text-11 font-medium uppercase tracking-wide text-neutral-400">
                  What they&apos;ll see
                </p>
                <div className="overflow-hidden rounded-xl border border-sand-200 bg-sand-50">
                  {/* Mini header */}
                  <div
                    className="flex items-center gap-2.5 border-b border-sand-200 px-3.5 py-2.5"
                    style={{
                      background: "linear-gradient(135deg, #F8F7FF 0%, #FFF8F0 50%, #F0FAFA 100%)",
                    }}
                  >
                    <AnimatedLogoMark size={24} />
                    <div className="flex flex-col">
                      <span className="font-brand text-12 font-bold text-brand-ink">
                        Carmen Rincon
                      </span>
                      <span className="text-10 text-neutral-400">
                        Product Design &amp; Strategy
                      </span>
                    </div>
                  </div>

                  {/* Preview content */}
                  <div className="px-3.5 py-3">
                    <p className="font-brand text-13 font-bold text-brand-ink">
                      {companyName.trim()
                        ? `Curated for ${companyName.trim()}`
                        : "Selected Work"}
                    </p>
                    <p className="mt-0.5 text-11 text-neutral-400">
                      {selectedProjects.length} case {selectedProjects.length === 1 ? "study" : "studies"} from Carmen&apos;s portfolio
                    </p>

                    {note.trim() && (
                      <div className="mt-2 rounded-lg border border-sand-200 bg-white px-2.5 py-2 text-11 leading-relaxed text-neutral-500">
                        &ldquo;{note.trim()}&rdquo;
                      </div>
                    )}

                    {/* Mini thumbnails */}
                    <div className="mt-2.5 flex gap-1.5">
                      {selectedProjects.slice(0, 4).map((project) => (
                        <div
                          key={project.id}
                          className="relative h-10 w-14 overflow-hidden rounded-md border border-sand-200"
                        >
                          <Image
                            src={project.coverUrl}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>
                      ))}
                      {selectedProjects.length > 4 && (
                        <div className="flex h-10 w-14 items-center justify-center rounded-md border border-sand-200 bg-sand-100 text-11 font-medium text-neutral-400">
                          +{selectedProjects.length - 4}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
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
                <span className="font-medium">Message copied</span> — paste it in your LinkedIn post
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
