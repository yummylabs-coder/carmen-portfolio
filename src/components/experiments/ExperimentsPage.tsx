"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Experiment, ExperimentPreviewMap } from "@/lib/types";
import { ImageWithShimmer } from "@/components/ui/ImageWithShimmer";
import { PageEntrance } from "@/components/ui/PageEntrance";
import { StoryViewer } from "@/components/ui/StoryViewer";
import type { StorySlide } from "@/components/ui/StoryViewer";
import { AmbientOSGallery } from "./AmbientOSGallery";

/* ─── Animated mini cover for Ambient OS experiment card ─── */
const MINI_ORBS = [
  { x: 22, y: 30, size: 13, color: "#FF6B8A", delay: 0, dur: 4 },
  { x: 73, y: 24, size: 11, color: "#A78BFA", delay: 0.5, dur: 4.5 },
  { x: 14, y: 66, size: 10, color: "#38BDF8", delay: 1.0, dur: 5 },
  { x: 50, y: 50, size: 15, color: "#34D399", delay: 1.5, dur: 4.2 },
  { x: 82, y: 60, size: 11, color: "#FB923C", delay: 2.0, dur: 4.8 },
  { x: 38, y: 16, size: 9, color: "#F472B6", delay: 0.3, dur: 5.2 },
  { x: 62, y: 78, size: 9, color: "#FBBF24", delay: 0.8, dur: 4.6 },
];

function AmbientOSCoverMini() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, #0f172a 0%, #030712 70%, #000 100%)",
      }}
    >
      {/* Subtle zone ring */}
      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        width="200"
        height="160"
        viewBox="-100 -80 200 160"
      >
        <ellipse
          cx={0}
          cy={0}
          rx={80}
          ry={60}
          fill="none"
          stroke="rgba(255,255,255,1)"
          strokeWidth={0.5}
          strokeDasharray="3 10"
          opacity={0.06}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="30s"
            repeatCount="indefinite"
          />
        </ellipse>
      </svg>

      {/* Mini floating orbs */}
      {MINI_ORBS.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full ambient-float"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.25), ${orb.color}70 60%, ${orb.color}20)`,
            boxShadow: `0 0 ${orb.size * 1.2}px ${orb.color}20`,
            border: "1px solid rgba(255,255,255,0.08)",
            animationDuration: `${orb.dur}s`,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}

      {/* Central ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

/* ─── Tab type ─── */
type TabKey = "experiments" | "toolkit";

/* ─── Stats Row — consolidated across both tabs ─── */
function StatsRow({ experiments }: { experiments: Experiment[] }) {
  const finishedCount = experiments.filter((e) => e.status === "live").length;
  const progressCount = experiments.filter(
    (e) => e.status === "progress",
  ).length;
  const totalCount = experiments.length;

  const stats = [
    {
      value: String(finishedCount),
      label: "Finished",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-white"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
    {
      value: String(progressCount),
      label: "In Progress",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-white"
        >
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
      value: String(totalCount),
      label: "Total",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-white"
        >
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
    },
  ];

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

/* ─── Tab Bar ─── */
const tabDefs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  {
    key: "experiments",
    label: "Experiments",
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2V5.5L3 12C2.7 12.6 3.1 13.5 3.8 13.5H12.2C12.9 13.5 13.3 12.6 13 12L10 5.5V2" />
        <path d="M5 2H11" />
      </svg>
    ),
  },
  {
    key: "toolkit",
    label: "Toolkit",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
];

function TabBar({
  active,
  onChange,
  experimentCount,
  toolkitCount,
}: {
  active: TabKey;
  onChange: (key: TabKey) => void;
  experimentCount: number;
  toolkitCount: number;
}) {
  return (
    <div className="flex gap-1 rounded-xl border border-sand-300 bg-sand-100 p-1">
      {tabDefs.map((tab) => {
        const isActive = active === tab.key;
        const count =
          tab.key === "experiments" ? experimentCount : toolkitCount;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`relative flex items-center gap-1.5 rounded-lg px-4 py-2 text-13 font-medium transition-all ${
              isActive
                ? "bg-white text-brand-ink shadow-sm"
                : "text-neutral-400 hover:text-neutral-600"
            }`}
          >
            <span className={isActive ? "text-[#2216ff]" : ""}>{tab.icon}</span>
            {tab.label}
            <span
              className={`ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-semibold ${
                isActive
                  ? "bg-[#2216ff]/10 text-[#2216ff]"
                  : "bg-neutral-200/60 text-neutral-400"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Convert Experiment → StorySlide[] ─── */
function toStorySlides(experiment: Experiment): StorySlide[] {
  const slides: StorySlide[] = [];
  const captions = experiment.galleryCaptions ?? [];

  // Video first
  if (experiment.videoUrl) {
    slides.push({
      id: `${experiment.id}-video`,
      videoUrl: experiment.videoUrl,
      label: experiment.name,
      caption: "Video walkthrough",
    });
  }

  // Gallery images
  const images =
    experiment.galleryUrls ?? (experiment.coverUrl ? [experiment.coverUrl] : []);
  images.forEach((url, i) => {
    slides.push({
      id: `${experiment.id}-img-${i}`,
      imageUrl: url,
      label: captions[i] || experiment.name,
      caption: captions[i] ? experiment.name : undefined,
    });
  });

  return slides;
}

/* ─── Shared preview-card logic ─── */
function usePreviewCardState(experiment: Experiment) {
  const hasLink = !!experiment.url;
  const hasVideo = !!experiment.videoUrl;
  const hasGallery =
    (experiment.galleryUrls && experiment.galleryUrls.length > 0) ||
    experiment.coverUrl ||
    hasVideo;
  const isComingSoon = !hasLink && !hasGallery;
  const isClickable = hasLink || hasGallery;

  const Wrapper = hasLink ? ("a" as const) : ("div" as const);
  const wrapperProps = hasLink
    ? {
        href: experiment.url,
        target: "_blank" as const,
        rel: "noopener noreferrer",
      }
    : {};

  return { hasLink, hasVideo, hasGallery, isComingSoon, isClickable, Wrapper, wrapperProps };
}

/* ─── Preview Card — dark folder/sheet style ─── */
function PreviewCard({
  experiment,
  onOpenGallery,
}: {
  experiment: Experiment;
  onOpenGallery: (exp: Experiment) => void;
}) {
  const { hasLink, hasVideo, hasGallery, isComingSoon, isClickable, Wrapper, wrapperProps } =
    usePreviewCardState(experiment);

  return (
    <Wrapper
      {...wrapperProps}
      onClick={!hasLink && isClickable ? () => onOpenGallery(experiment) : undefined}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-sand-300 bg-brand-ink transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(194,176,156,0.3)] ${
        isClickable ? "cursor-pointer" : ""
      }`}
    >
      {/* ── Image hero ── */}
      <div className="relative h-[200px] overflow-hidden">
        {experiment.name.toLowerCase() === "ambient os" ? (
          <AmbientOSCoverMini />
        ) : experiment.coverUrl ? (
          <ImageWithShimmer
            src={experiment.coverUrl}
            alt={experiment.name}
            fill
            sizes="(max-width: 640px) 100vw, 340px"
            className="object-cover"
            style={{ objectPosition: experiment.coverFocusPoint || "top" }}
          />
        ) : (
          <div
            className="flex h-full items-center justify-center"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 70%)",
            }}
          >
            <span className="font-brand text-[18px] font-bold text-white/25">
              {experiment.name}
            </span>
          </div>
        )}

        {/* Gallery badge */}
        {!hasLink && experiment.galleryUrls && experiment.galleryUrls.length > 0 && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-black/40 px-2 py-1 text-[10px] font-medium text-white/80 backdrop-blur-sm">
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="12" height="12" rx="1.5" />
              <path d="M2 11L5.5 7.5L8 10L10 8L14 12" />
            </svg>
            {experiment.galleryUrls.length}{hasVideo ? " + video" : ""}
          </div>
        )}

        {/* Video play icon */}
        {!hasLink && hasVideo && !experiment.galleryUrls?.length && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5 3L13 8L5 13V3Z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* ── Folder tab + sheet ── */}
      <div className="relative z-10 -mt-12 flex flex-1 flex-col">
        {/* Tab row */}
        <div className="flex items-end">
          <div className="flex items-center rounded-t-[16px] bg-brand-ink px-3 pb-0 pt-2">
            <span className="inline-flex items-center rounded-md bg-white/[0.1] px-2.5 py-[3px] text-[10px] font-semibold uppercase tracking-[0.05em] text-[#F7F2EE]">
              {experiment.type}
            </span>
          </div>
          {/* Right inverted corner */}
          <div
            className="h-[16px] w-[16px] shrink-0"
            style={{
              background:
                "radial-gradient(circle at 100% 0, transparent 15px, var(--brand-ink) 16.5px)",
            }}
          />
          <div className="flex-1" />
        </div>

        {/* Sheet body */}
        <div className="flex flex-1 flex-col rounded-tr-[16px] bg-brand-ink pb-5 pl-4 pr-4 pt-6">
          <h3 className="mb-1 font-brand text-[16px] font-bold leading-[1.3] text-white">
            {experiment.name}
          </h3>
          <p className="line-clamp-2 text-13 leading-[1.5] text-white/[0.45]">
            {experiment.description}
          </p>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between border-t border-white/[0.06] pt-4">
            <div className="flex items-center gap-1.5 text-12 text-white/40">
              <span
                className={`inline-block h-[6px] w-[6px] rounded-full ${
                  experiment.status === "live" ? "bg-green-500" : "bg-yellow-500"
                }`}
              />
              {experiment.statusLabel}
            </div>
            {hasLink ? (
              <span className="flex items-center gap-1 text-12 font-medium text-white/70 transition-colors group-hover:text-white">
                {experiment.category === "toolkit" ? "Open" : "View"}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            ) : hasGallery ? (
              <span className="flex items-center gap-1 text-12 font-medium text-white/70 transition-colors group-hover:text-white">
                Gallery
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="12" height="12" rx="1.5" />
                  <path d="M2 11L5.5 7.5L8 10L10 8L14 12" />
                </svg>
              </span>
            ) : isComingSoon ? (
              <span className="text-11 text-white/25">Coming soon</span>
            ) : null}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

/* ─── Preview Card — light/sandy folder style ─── */
function PreviewCardLight({
  experiment,
  onOpenGallery,
}: {
  experiment: Experiment;
  onOpenGallery: (exp: Experiment) => void;
}) {
  const { hasLink, hasVideo, hasGallery, isComingSoon, isClickable, Wrapper, wrapperProps } =
    usePreviewCardState(experiment);

  return (
    <Wrapper
      {...wrapperProps}
      onClick={!hasLink && isClickable ? () => onOpenGallery(experiment) : undefined}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-sand-300 bg-sand-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(194,176,156,0.25)] ${
        isClickable ? "cursor-pointer" : ""
      }`}
    >
      {/* ── Image hero ── */}
      <div className="relative h-[200px] overflow-hidden">
        {experiment.coverUrl ? (
          <ImageWithShimmer
            src={experiment.coverUrl}
            alt={experiment.name}
            fill
            sizes="(max-width: 640px) 100vw, 340px"
            className="object-cover"
            style={{ objectPosition: experiment.coverFocusPoint || "top" }}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-sand-200">
            <span className="font-brand text-[18px] font-bold text-sand-500">
              {experiment.name}
            </span>
          </div>
        )}

        {/* Gallery badge */}
        {!hasLink && experiment.galleryUrls && experiment.galleryUrls.length > 0 && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-black/40 px-2 py-1 text-[10px] font-medium text-white/80 backdrop-blur-sm">
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="12" height="12" rx="1.5" />
              <path d="M2 11L5.5 7.5L8 10L10 8L14 12" />
            </svg>
            {experiment.galleryUrls.length}{hasVideo ? " + video" : ""}
          </div>
        )}

        {/* Video play icon */}
        {!hasLink && hasVideo && !experiment.galleryUrls?.length && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5 3L13 8L5 13V3Z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* ── Folder tab + sheet ── */}
      <div className="relative z-10 -mt-12 flex flex-1 flex-col">
        {/* Tab row */}
        <div className="flex items-end">
          <div className="flex items-center rounded-t-[16px] bg-sand-100 px-3 pb-0 pt-2">
            <span className="inline-flex items-center rounded-md bg-sand-200 px-2.5 py-[3px] text-[10px] font-semibold uppercase tracking-[0.05em] text-sand-700">
              {experiment.type}
            </span>
          </div>
          {/* Right inverted corner */}
          <div
            className="h-[16px] w-[16px] shrink-0"
            style={{
              background:
                "radial-gradient(circle at 100% 0, transparent 15px, var(--sand-100) 16.5px)",
            }}
          />
          <div className="flex-1" />
        </div>

        {/* Sheet body */}
        <div className="flex flex-1 flex-col rounded-tr-[16px] bg-sand-100 pb-5 pl-4 pr-4 pt-6">
          <h3 className="mb-1 font-brand text-[16px] font-bold leading-[1.3] text-brand-ink">
            {experiment.name}
          </h3>
          <p className="line-clamp-2 text-13 leading-[1.5] text-neutral-500">
            {experiment.description}
          </p>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between border-t border-sand-200 pt-4">
            <div className="flex items-center gap-1.5 text-12 text-neutral-500">
              <span
                className={`inline-block h-[6px] w-[6px] rounded-full ${
                  experiment.status === "live" ? "bg-green-500" : "bg-yellow-500"
                }`}
              />
              {experiment.statusLabel}
            </div>
            {hasLink ? (
              <span className="flex items-center gap-1 text-12 font-medium text-[#2216ff] transition-colors">
                {experiment.category === "toolkit" ? "Open" : "View"}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            ) : hasGallery ? (
              <span className="flex items-center gap-1 text-12 font-medium text-[#2216ff] transition-colors">
                Gallery
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="12" height="12" rx="1.5" />
                  <path d="M2 11L5.5 7.5L8 10L10 8L14 12" />
                </svg>
              </span>
            ) : isComingSoon ? (
              <span className="text-11 text-neutral-400">Coming soon</span>
            ) : null}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

/* ─── Empty State ─── */
function EmptyState({ tab }: { tab: TabKey }) {
  const isToolkit = tab === "toolkit";
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-sand-300 bg-neutral-50/50 py-16 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#2216ff]">
        {isToolkit ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2V5.5L3 12C2.7 12.6 3.1 13.5 3.8 13.5H12.2C12.9 13.5 13.3 12.6 13 12L10 5.5V2" />
            <path d="M5 2H11" />
          </svg>
        )}
      </div>
      <p className="font-brand text-15 font-semibold text-brand-ink">
        {isToolkit ? "Toolkit items coming soon" : "No experiments yet"}
      </p>
      <p className="mt-1 max-w-[280px] text-13 text-neutral-400">
        {isToolkit
          ? "Resources, templates, and tools I've built for designers will show up here."
          : "Side projects and prototypes will appear here as I build them."}
      </p>
    </div>
  );
}

/* ─── Terminal Card (typewriter animation) ─── */

type Segment =
  | { kind: "type"; text: string; className: string; charMs: number }
  | { kind: "pause"; ms: number }
  | { kind: "newline" };

const terminalScript: Segment[] = [
  // prompt is always visible; we type the command
  { kind: "type", text: "--next", className: "text-orange-500", charMs: 70 },
  { kind: "pause", ms: 500 },
  { kind: "newline" },
  // output: project name
  { kind: "type", text: '"admin-panels-claude.code"', className: "text-[14px] font-medium text-white", charMs: 30 },
  { kind: "pause", ms: 300 },
  { kind: "newline" },
  // description (appears faster — it's "printed" output)
  { kind: "type", text: "A toolkit for generating beautiful admin panels with Claude. Includes pre-built components, auth flows, and dashboard layouts.", className: "text-white/60", charMs: 12 },
  { kind: "pause", ms: 500 },
  { kind: "newline" },
  // comment
  { kind: "type", text: "// coming soon", className: "text-white/35", charMs: 40 },
  { kind: "newline" },
  // code
  { kind: "type", text: "import { AdminPanel } from 'claude-ui';", className: "text-blue-100", charMs: 28 },
  { kind: "newline" },
  { kind: "newline" },
  { kind: "type", text: "const dashboard = new AdminPanel({", className: "text-blue-100", charMs: 28 },
  { kind: "newline" },
  { kind: "type", text: "  theme: 'minimal',", className: "text-blue-100", charMs: 35 },
  { kind: "newline" },
  { kind: "type", text: "  auth: true,", className: "text-blue-100", charMs: 35 },
  { kind: "newline" },
  { kind: "type", text: "  charts: ['bar', 'line']", className: "text-blue-100", charMs: 30 },
  { kind: "newline" },
  { kind: "type", text: "});", className: "text-blue-100", charMs: 50 },
];

function useTypewriter(script: Segment[]) {
  const [lines, setLines] = useState<{ text: string; className: string }[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // Blinking cursor
    const cursorTimer = setInterval(() => {
      if (!cancelled) setCursorVisible((v) => !v);
    }, 530);

    async function run() {
      const built: { text: string; className: string }[] = [];
      let currentLine = { text: "", className: "" };

      for (const seg of script) {
        if (cancelled) return;

        if (seg.kind === "newline") {
          built.push({ ...currentLine });
          currentLine = { text: "", className: "" };
          setLines([...built, currentLine]);
          continue;
        }

        if (seg.kind === "pause") {
          await new Promise((r) => setTimeout(r, seg.ms));
          continue;
        }

        // type segment character by character
        currentLine.className = seg.className;
        for (let i = 0; i < seg.text.length; i++) {
          if (cancelled) return;
          currentLine = { ...currentLine, text: currentLine.text + seg.text[i] };
          setLines([...built, currentLine]);
          await new Promise((r) => setTimeout(r, seg.charMs));
        }
      }

      // Push last line
      built.push({ ...currentLine });
      setLines(built);
      setDone(true);
    }

    // Small initial delay so the card paints first
    const startTimer = setTimeout(run, 600);

    return () => {
      cancelled = true;
      clearTimeout(startTimer);
      clearInterval(cursorTimer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { lines, cursorVisible, done };
}

function TerminalCard() {
  const { lines, cursorVisible, done } = useTypewriter(terminalScript);

  return (
    <div className="flex min-h-[400px] flex-col rounded-2xl bg-brand-ink p-5">
      {/* Traffic lights + status badge */}
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

      {/* Terminal body */}
      <div className="flex-1 font-mono text-13 leading-[1.7]">
        {/* Static prompt */}
        <span className="text-white/50">~/the-lab $</span>{" "}

        {/* Typed content */}
        {lines.map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            <span className={line.className}>{line.text}</span>
            {/* Cursor appears on the last line while still typing */}
            {i === lines.length - 1 && !done && (
              <span
                className={`ml-[1px] inline-block h-[14px] w-[7px] translate-y-[2px] bg-white/80 ${
                  cursorVisible ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Card grid with animation ─── */
function CardGrid({
  items,
  tab,
  onOpenGallery,
}: {
  items: Experiment[];
  tab: TabKey;
  onOpenGallery: (exp: Experiment) => void;
}) {
  if (items.length === 0) {
    return <EmptyState tab={tab} />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {items.map((exp, index) => (
          <motion.div
            key={exp.id}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{
              duration: 0.3,
              delay: index * 0.06,
              ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
            }}
            className="h-full"
          >
            {tab === "experiments" ? (
              <PreviewCard
                experiment={exp}
                onOpenGallery={onOpenGallery}
              />
            ) : (
              <PreviewCardLight
                experiment={exp}
                onOpenGallery={onOpenGallery}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Page ─── */
interface ExperimentsPageProps {
  experiments: Experiment[];
  previews?: ExperimentPreviewMap;
}

export function ExperimentsPage({ experiments, previews = {} }: ExperimentsPageProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("experiments");
  const [galleryExperiment, setGalleryExperiment] = useState<Experiment | null>(null);

  // When opening the modal, merge preview data into the experiment so
  // buildSlides() picks it up automatically via galleryUrls / videoUrl
  const openGallery = useCallback((exp: Experiment) => {
    const preview = previews[exp.name.toLowerCase()];
    if (preview && !exp.galleryUrls?.length && !exp.videoUrl) {
      // Enrich the experiment with preview data for the modal
      setGalleryExperiment({
        ...exp,
        galleryUrls: preview.imageUrls.length > 0 ? preview.imageUrls : undefined,
        galleryCaptions: preview.captions.length > 0 ? preview.captions : undefined,
        videoUrl: preview.videoUrl,
      });
    } else {
      setGalleryExperiment(exp);
    }
  }, [previews]);

  const closeGallery = useCallback(() => {
    setGalleryExperiment(null);
  }, []);

  const experimentItems = experiments.filter(
    (e) => e.category === "experiment",
  );
  const toolkitItems = experiments.filter((e) => e.category === "toolkit");
  const visibleItems =
    activeTab === "experiments" ? experimentItems : toolkitItems;

  return (
    <PageEntrance>
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-brand text-22 font-bold text-brand-ink">
          The Lab
        </h1>
        <p className="text-14 leading-[1.6] text-neutral-400">
          Side projects, tools, and resources I&apos;ve built for designers and
          for my own curiosity.
        </p>
      </div>

      {/* 2-Column Layout: left content + right terminal */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Left Column */}
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <StatsRow experiments={experiments} />

          <TabBar
            active={activeTab}
            onChange={setActiveTab}
            experimentCount={experimentItems.length}
            toolkitCount={toolkitItems.length}
          />

          <CardGrid
            items={visibleItems}
            tab={activeTab}
            onOpenGallery={openGallery}
          />
        </div>

        {/* Right Column — Terminal */}
        <div className="w-full shrink-0 lg:w-[280px]">
          <TerminalCard />
        </div>
      </div>

      {/* Gallery Modal — unified StoryViewer / Ambient OS custom gallery */}
      <AnimatePresence>
        {galleryExperiment &&
          (galleryExperiment.name.toLowerCase() === "ambient os" ? (
            <AmbientOSGallery
              experiment={galleryExperiment}
              onClose={closeGallery}
            />
          ) : (
            <StoryViewer
              slides={toStorySlides(galleryExperiment)}
              onClose={closeGallery}
              aspect="landscape"
              fit={galleryExperiment.galleryFit || "cover"}
              autoAdvance={false}
            />
          ))}
      </AnimatePresence>
    </PageEntrance>
  );
}
