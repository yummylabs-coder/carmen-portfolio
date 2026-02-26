"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { ExperienceEntry } from "@/lib/types";
import { PageEntrance } from "@/components/ui/PageEntrance";
import { ResumeContent } from "./ResumeContent";
import {
  CopyIcon,
  CheckIcon,
  LinkedInIcon,
  XIcon,
  ContactIcon,
} from "@/components/icons/NavIcons";

interface ResumePageContentProps {
  entries: ExperienceEntry[];
}

const shareTitle = "Carmen Rincon — Resume";

export function ResumePageContent({ entries }: ResumePageContentProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    setResumeUrl(`${window.location.origin}/resume`);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    const url = resumeUrl || `${window.location.origin}/resume`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2500);
  }, [resumeUrl]);

  const handleDownload = useCallback(() => {
    window.print();
  }, []);

  const emailUrl = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(resumeUrl)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(resumeUrl)}`;
  const xUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(resumeUrl)}&text=${encodeURIComponent(shareTitle)}`;

  return (
    <PageEntrance>
      {/* ── Sticky Action Bar ── */}
      <div className="no-print flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-brand text-22 font-bold text-brand-ink">
            Resume
          </h1>
          <p className="mt-0.5 text-14 text-neutral-400">
            Carmen Rincon, Product Designer &amp; Strategist
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Download PDF */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-xl border border-sand-300 bg-sand-100 px-4 py-2.5 text-13 font-medium text-brand-ink transition-colors hover:bg-sand-200"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-neutral-400"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Download PDF
          </button>

          {/* Copy link */}
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-13 font-medium transition-all ${
              copied
                ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                : "border-sand-300 bg-sand-100 text-brand-ink hover:bg-sand-200"
            }`}
          >
            {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
            {copied ? "Copied!" : "Copy link"}
          </button>
        </div>
      </div>

      {/* ── Resume Card ── */}
      <div className="resume-print rounded-2xl border border-sand-300 bg-white p-6 sm:p-8">
        <ResumeContent entries={entries} />
      </div>

      {/* ── Share Footer ── */}
      <div className="no-print">
        <p className="mb-2 text-11 font-medium uppercase tracking-wide text-neutral-300">
          Share this resume
        </p>
        <div className="grid grid-cols-3 gap-2 sm:max-w-[320px]">
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
    </PageEntrance>
  );
}
