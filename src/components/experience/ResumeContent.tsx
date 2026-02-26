"use client";

import type { ExperienceEntry } from "@/lib/types";
import {
  resumeProfile,
  resumeSkills,
  resumeEducation,
} from "@/lib/resume-data";
import { AnimatedLogoMark } from "@/components/icons/AnimatedLogoMark";

interface ResumeContentProps {
  entries: ExperienceEntry[];
  isPrintMode?: boolean;
}

/* ─── Section heading — consistent across all sections ─── */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
      {children}
    </h2>
  );
}

/* ─── Divider ─── */
function Divider() {
  return <hr className="border-sand-200" />;
}

/* ─── Resume Content ─── */
export function ResumeContent({ entries, isPrintMode }: ResumeContentProps) {
  return (
    <div
      className={`resume-print space-y-6 ${isPrintMode ? "px-0 py-0" : ""}`}
    >
      {/* ── Header ── */}
      <div className="resume-section">
        <div className="flex items-start gap-3">
          {!isPrintMode && (
            <div className="mt-0.5 shrink-0">
              <AnimatedLogoMark size={36} />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h1 className="font-brand text-[22px] font-bold leading-tight text-brand-ink">
              {resumeProfile.name}
            </h1>
            <p className="mt-0.5 text-14 text-neutral-500">
              {resumeProfile.title}
            </p>
          </div>
        </div>

        {/* Contact row */}
        <div className="mt-3 flex flex-wrap gap-2">
          <ContactPill
            icon={
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            }
            label={resumeProfile.location}
          />
          <ContactPill
            icon={
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            }
            label={resumeProfile.email}
            href={`mailto:${resumeProfile.email}`}
          />
          <ContactPill
            icon={
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            }
            label={resumeProfile.portfolio}
            href={`https://${resumeProfile.portfolio}`}
          />
          <ContactPill
            icon={
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            }
            label="LinkedIn"
            href={`https://${resumeProfile.linkedin}`}
          />
        </div>
      </div>

      <Divider />

      {/* ── About ── */}
      <div className="resume-section">
        <SectionHeading>About</SectionHeading>
        <p className="text-13 leading-relaxed text-neutral-600">
          {resumeProfile.summary}
        </p>
      </div>

      <Divider />

      {/* ── Experience ── */}
      <div className="resume-section">
        <SectionHeading>Experience</SectionHeading>
        <div className="space-y-5">
          {entries.map((entry) => (
            <div key={entry.id}>
              {/* Company + date row */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-brand text-[15px] font-semibold text-brand-ink">
                    {entry.company}
                  </h3>
                  <p className="mt-0.5 text-13 text-neutral-500">
                    {entry.roleSummary}
                  </p>
                </div>
                <span className="shrink-0 whitespace-nowrap text-12 text-neutral-400">
                  {entry.dateRange}
                </span>
              </div>

              {/* Roles list */}
              {entry.roles.length > 1 && (
                <div className="mt-2 space-y-1">
                  {entry.roles.map((role, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-12"
                    >
                      <span className="text-neutral-500">{role.title}</span>
                      <span className="text-neutral-400">
                        {role.start} - {role.end}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* What I learned */}
              {entry.whatILearned && (
                <p className="mt-2 text-12 leading-relaxed text-neutral-500">
                  {entry.whatILearned}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── Skills ── */}
      <div className="resume-section">
        <SectionHeading>Skills</SectionHeading>
        <div className="space-y-3">
          {resumeSkills.map((group) => (
            <div key={group.category}>
              <span className="mb-1.5 block text-12 font-medium text-brand-ink">
                {group.category}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-sand-100 px-2.5 py-1 text-[11px] font-medium text-neutral-500"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Education (only show if filled in) ── */}
      {resumeEducation.length > 0 &&
        resumeEducation[0].institution !== "TBD" && (
          <>
            <Divider />
            <div className="resume-section">
              <SectionHeading>Education</SectionHeading>
              <div className="space-y-2">
                {resumeEducation.map((edu, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between gap-3"
                  >
                    <div>
                      <p className="text-13 font-medium text-brand-ink">
                        {edu.institution}
                      </p>
                      <p className="text-12 text-neutral-500">{edu.degree}</p>
                    </div>
                    <span className="shrink-0 text-12 text-neutral-400">
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

/* ─── Contact Pill ─── */
function ContactPill({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
}) {
  const classes =
    "inline-flex items-center gap-1.5 rounded-lg bg-sand-100 px-2.5 py-1.5 text-[11px] font-medium text-neutral-500 transition-colors hover:bg-sand-200";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {icon}
        {label}
      </a>
    );
  }

  return (
    <span className={classes}>
      {icon}
      {label}
    </span>
  );
}
