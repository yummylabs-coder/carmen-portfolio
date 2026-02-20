"use client";

/* ─── Data ─── */
const stats = [
  {
    value: "5",
    label: "Finished",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    value: "2",
    label: "In Progress",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white">
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="m4.93 4.93 2.83 2.83" />
        <path d="m16.24 16.24 2.83 2.83" />
        <path d="M2 12h4" />
        <path d="M18 12h4" />
        <path d="m4.93 19.07 2.83-2.83" />
        <path d="m16.24 7.76 2.83-2.83" />
      </svg>
    ),
  },
  {
    value: "3",
    label: "Tinkering",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
];

interface Experiment {
  name: string;
  type: string;
  description: string;
  status: "live" | "progress";
  statusLabel: string;
  link?: string;
}

const experiments: Experiment[] = [
  {
    name: "Figma Token Sync",
    type: "Chrome Extension",
    description:
      "A Chrome extension that syncs design tokens between Figma and your codebase in real-time.",
    status: "live",
    statusLabel: "Live",
  },
  {
    name: "Palette Generator",
    type: "Web App",
    description:
      "Generate accessible color palettes from a single brand color with WCAG contrast checking.",
    status: "live",
    statusLabel: "Live",
  },
  {
    name: "Component Doc Gen",
    type: "Figma Plugin",
    description:
      "Auto-generate component documentation from your Figma components.",
    status: "progress",
    statusLabel: "In Progress",
  },
];

/* ─── Stats Row ─── */
function StatsRow() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-3.5 rounded-xl bg-[#2216ff] px-5 py-4"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15">
            {stat.icon}
          </div>
          <div>
            <div className="font-brand text-[24px] font-bold leading-none text-white">
              {stat.value}
            </div>
            <div className="text-12 text-white/70">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Experiment Card ─── */
function ExperimentCard({ experiment }: { experiment: Experiment }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-[0_8px_24px_rgba(48,1,1,0.08)]">
      {/* Cover */}
      <div className="flex h-[140px] items-center justify-center bg-blue-50">
        <span className="font-brand text-[18px] font-bold text-[#2216ff]">
          {experiment.name}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <span className="mb-2.5 inline-flex w-fit items-center rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.5px] text-[#2216ff]">
          {experiment.type}
        </span>
        <h3 className="mb-1.5 font-brand text-[16px] font-bold text-brand-ink">
          {experiment.name}
        </h3>
        <p className="text-13 leading-[1.5] text-neutral-500">
          {experiment.description}
        </p>

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3">
          <div className="flex items-center gap-1.5 text-12 text-neutral-500">
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                experiment.status === "live" ? "bg-green-500" : "bg-yellow-500"
              }`}
            />
            {experiment.statusLabel}
          </div>
          {experiment.link ? (
            <a
              href={experiment.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-12 font-medium text-[#2216ff] hover:underline"
            >
              View more
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          ) : (
            <span className="flex items-center gap-1 text-12 font-medium text-[#2216ff]">
              View more
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Terminal Card ─── */
function TerminalCard() {
  return (
    <div className="flex min-h-[400px] flex-col rounded-2xl bg-brand-ink p-5">
      {/* Header dots */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.5px] text-yellow-500">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-500" />
          building
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 font-mono text-13 leading-[1.7]">
        <div className="mb-3">
          <span className="text-white/50">~/experiments $</span>{" "}
          <span className="text-orange-500">--next</span>
        </div>
        <span className="mb-5 block text-[14px] font-medium text-white">
          &quot;admin-panels-claude.code&quot;
        </span>

        <p className="text-13 leading-[1.7] text-white/60">
          A toolkit for generating beautiful admin panels with Claude. Includes
          pre-built components, auth flows, and dashboard layouts.
        </p>

        <span className="mt-4 block text-blue-100">
          <span className="text-white/35">{"// coming soon"}</span>
          <br />
          {"import { AdminPanel } from 'claude-ui';"}
          <br />
          <br />
          {"const dashboard = new AdminPanel({"}
          <br />
          {"  theme: 'minimal',"}
          <br />
          {"  auth: true,"}
          <br />
          {"  charts: ['bar', 'line']"}
          <br />
          {"});"}
        </span>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export function ExperimentsPage() {
  return (
    <>
      {/* Page Header — consistent pattern */}
      <div className="flex flex-col gap-1">
        <h1 className="font-brand text-22 font-bold text-brand-ink">
          My Experiments
        </h1>
        <p className="text-14 leading-[1.6] text-neutral-400">
          Side projects, tools, and things I&apos;ve built to scratch my own
          itch or learn something new.
        </p>
      </div>

      {/* 2-Column Layout: left content + right terminal */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Left Column */}
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <StatsRow />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {experiments.map((exp) => (
              <ExperimentCard key={exp.name} experiment={exp} />
            ))}
          </div>
        </div>

        {/* Right Column — Terminal */}
        <div className="w-full shrink-0 lg:w-[280px]">
          <TerminalCard />
        </div>
      </div>
    </>
  );
}
