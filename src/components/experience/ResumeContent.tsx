"use client";

import type { ExperienceEntry } from "@/lib/types";
import {
  resumeProfile,
  resumeSkills,
  resumeEducation,
} from "@/lib/resume-data";

interface ResumeContentProps {
  entries: ExperienceEntry[];
  isPrintMode?: boolean;
}

/* ─── Section heading — strong left border accent ─── */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="resume-section-heading mb-3 border-l-2 border-brand-ink pl-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-ink">
      {children}
    </h2>
  );
}

/* ─── Thin separator ─── */
function Divider() {
  return <hr className="resume-divider my-4 border-sand-200 print:my-2" />;
}

/* ─── Resume Content ─── */
export function ResumeContent({ entries, isPrintMode }: ResumeContentProps) {
  return (
    <div
      className={`resume-print space-y-4 ${isPrintMode ? "px-0 py-0" : ""}`}
    >
      {/* ── Header ── */}
      <div className="resume-section">
        <h1 className="font-brand text-[24px] font-bold leading-tight text-brand-ink sm:text-[28px]">
          {resumeProfile.name}
        </h1>
        <p className="mt-1 text-[15px] font-medium text-neutral-500">
          {resumeProfile.title}
        </p>

        {/* Contact row — compact, inline pills */}
        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] text-neutral-500">
          <ContactLink
            href={`mailto:${resumeProfile.email}`}
            icon={
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            }
            label={resumeProfile.email}
          />
          <span className="text-neutral-300">·</span>
          <ContactLink
            href={`https://${resumeProfile.portfolio}`}
            icon={
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            }
            label="Portfolio"
          />
          <span className="text-neutral-300">·</span>
          <ContactLink
            href={`https://${resumeProfile.linkedin}`}
            icon={
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            }
            label="LinkedIn"
          />
          <span className="text-neutral-300">·</span>
          <ContactLink
            href={`https://${resumeProfile.accelerator}`}
            icon={
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
            }
            label="YummyLabs.com"
          />
        </div>
      </div>

      <Divider />

      {/* ── About ── */}
      <div className="resume-section">
        <SectionHeading>About</SectionHeading>
        <p className="text-[12.5px] leading-[1.6] text-neutral-600">
          {resumeProfile.summary}
        </p>
      </div>

      <Divider />

      {/* ── Experience ── */}
      <div className="resume-section">
        <SectionHeading>Experience</SectionHeading>
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="resume-entry">
              {/* Company + date row */}
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-brand text-[14px] font-bold text-brand-ink">
                  {entry.company}
                </h3>
                <span className="shrink-0 whitespace-nowrap text-[11px] font-medium text-neutral-400">
                  {entry.dateRange}
                </span>
              </div>

              {/* Role summary */}
              <p className="mt-0.5 text-[12px] font-medium text-neutral-500">
                {entry.roleSummary}
              </p>

              {/* Roles list (only if multiple) */}
              {entry.roles.length > 1 && (
                <div className="mt-1.5 space-y-0.5 border-l border-sand-200 pl-2.5">
                  {entry.roles.map((role, idx) => (
                    <div
                      key={idx}
                      className="flex items-baseline justify-between text-[11px]"
                    >
                      <span className="text-neutral-500">{role.title}</span>
                      <span className="text-neutral-400">
                        {role.start} - {role.end}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* What I learned — condensed */}
              {entry.whatILearned && (
                <p className="mt-1.5 text-[11.5px] leading-[1.55] text-neutral-500">
                  {entry.whatILearned}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── Skills — compact inline layout ── */}
      <div className="resume-section">
        <SectionHeading>Skills & Tools</SectionHeading>
        <div className="space-y-2">
          {resumeSkills.map((group) => (
            <div key={group.category} className="flex flex-wrap items-baseline gap-x-1.5">
              <span className="text-[11px] font-bold text-brand-ink">
                {group.category}:
              </span>
              <span className="text-[11px] leading-relaxed text-neutral-500">
                {group.items.join(" · ")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Education ── */}
      {resumeEducation.length > 0 &&
        resumeEducation[0].institution !== "TBD" && (
          <>
            <Divider />
            <div className="resume-section">
              <SectionHeading>Education</SectionHeading>
              <div className="space-y-1.5">
                {resumeEducation.map((edu, idx) => (
                  <div
                    key={idx}
                    className="flex items-baseline justify-between gap-3"
                  >
                    <div>
                      <p className="text-[13px] font-semibold text-brand-ink">
                        {edu.institution}
                      </p>
                      <p className="text-[11.5px] text-neutral-500">{edu.degree}</p>
                    </div>
                    <span className="shrink-0 text-[11px] font-medium text-neutral-400">
                      {edu.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
    </div>
  );
}

/* ─── Contact Link (compact inline style) ─── */
function ContactLink({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-neutral-500 transition-colors hover:text-brand-ink"
    >
      <span className="text-neutral-400">{icon}</span>
      {label}
    </a>
  );
}
