"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { YummyAssetsMap, SprintDay } from "@/lib/types";
import { PageEntrance } from "@/components/ui/PageEntrance";
import {
  stats,
  roles,
  partners,
  tools,
  testimonials,
} from "./acceleratorData";

const YUMMY_URL = "https://yummy-labs.com";
const RESERVE_URL = "https://www.yummy-labs.com/reserve-your-seat";

interface YummyLabsPageProps {
  assets: YummyAssetsMap;
  sprintDays?: SprintDay[];
}

/* ─── Helpers ─── */
function Img({ src, alt, className }: { src: string; alt: string; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} />;
}

function ExternalArrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
      <path
        d="M4 12L12 4M12 4H6M12 4V10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ═══════════════════════════════════
   Section 1 — Header
   ═══════════════════════════════════ */
function Header({ assets }: { assets: YummyAssetsMap }) {
  const logoUrl = assets.branding["logo"];
  const dogUrl = assets.branding["dog"];

  return (
    <header className="relative flex items-start gap-4">
      {/* Logo */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#7c3aed] bg-[#ede9fe] text-[18px]">
        {logoUrl ? (
          <Img src={logoUrl} alt="Yummy Labs" className="h-full w-full object-contain" />
        ) : (
          "\u{1F9EA}"
        )}
      </div>

      {/* Title + subtitle */}
      <div className="flex-1">
        <div className="mb-1 flex items-center gap-3">
          <h1 className="font-brand text-22 font-bold text-brand-ink">
            Yummy Labs
          </h1>
        </div>
        <p className="text-14 leading-[1.6] text-neutral-400">
          Design accelerator I co-founded to help designers grow through real
          startup sprints
        </p>
      </div>

      {/* Dog mascot - hidden on mobile, sits behind the next section */}
      {dogUrl && (
        <div className="pointer-events-none absolute bottom-0 right-0 z-0 hidden w-[112px] translate-y-[50%] lg:block">
          <Img src={dogUrl} alt="Yummy Labs Dog" className="block w-full" />
        </div>
      )}
    </header>
  );
}

/* ═══════════════════════════════════
   Glassmorphism Video Frame
   ═══════════════════════════════════ */
/* ── Fullscreen Video Lightbox ── */
function VideoLightbox({
  videoUrl,
  open,
  onClose,
}: {
  videoUrl: string;
  open: boolean;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  /* Auto-play when opening */
  useEffect(() => {
    if (open) videoRef.current?.play();
  }, [open]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Video container */}
          <motion.div
            className="relative z-10 w-[94vw] max-w-6xl"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -right-2 -top-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Video */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full"
                controls
                playsInline
                loop
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function GlassmorphismVideoFrame({ videoUrl }: { videoUrl?: string }) {
  const [hasVideo, setHasVideo] = useState(!!videoUrl);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const openLightbox = useCallback(() => {
    if (!hasVideo) return;
    // Pause the inline video when opening lightbox
    videoRef.current?.pause();
    setLightboxOpen(true);
  }, [hasVideo]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
    } else {
      v.pause();
    }
  };

  return (
    <div className="relative">
      {/* Ambient glow behind the frame */}
      <div className="absolute -inset-3 rounded-3xl bg-white/[0.06] blur-2xl" />

      {/* Glassmorphism border frame */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.15] bg-white/[0.07] p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl">
        {/* Inner video area */}
        <div className="relative aspect-video overflow-hidden rounded-[16px] bg-black/30">
          {hasVideo ? (
            <>
              <video
                ref={videoRef}
                src={videoUrl}
                className="h-full w-full object-cover"
                onError={() => setHasVideo(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                playsInline
                loop
                muted
              />
              {/* Play/pause overlay */}
              <button
                onClick={togglePlay}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  isPlaying
                    ? "bg-transparent opacity-0 hover:opacity-100 hover:bg-black/10"
                    : "bg-black/10"
                }`}
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/15 shadow-[0_4px_24px_rgba(0,0,0,0.15)] backdrop-blur-md transition-transform hover:scale-110">
                  {isPlaying ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <rect x="6" y="5" width="4" height="14" rx="1" />
                      <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <polygon points="8,5 20,12 8,19" />
                    </svg>
                  )}
                </div>
              </button>

              {/* Expand button — bottom-right corner */}
              <button
                onClick={openLightbox}
                className="absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-black/40 text-white/70 backdrop-blur-md transition-all hover:bg-black/60 hover:text-white"
                aria-label="Expand video"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              </button>
            </>
          ) : (
            /* Placeholder — no video uploaded yet */
            <div className="relative flex h-full items-center justify-center overflow-hidden">
              {/* Animated gradient mesh */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a11cc]/80 via-[#2216ff]/40 to-[#7c3aed]/60" />
              <div className="absolute -left-8 -top-8 h-32 w-32 animate-pulse rounded-full bg-[#7c3aed]/30 blur-3xl" />
              <div className="absolute -bottom-8 -right-8 h-32 w-32 animate-pulse rounded-full bg-white/10 blur-3xl [animation-delay:1s]" />

              <div className="relative text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="8,5 20,12 8,19" />
                  </svg>
                </div>
                <p className="text-[12px] font-medium text-white/40">Demo coming soon</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen lightbox */}
      {hasVideo && videoUrl && (
        <VideoLightbox
          videoUrl={videoUrl}
          open={lightboxOpen}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════
   Section 2 — Problem Hero (full-width blue)
   ═══════════════════════════════════ */
function ProblemHero({ assets }: { assets: YummyAssetsMap }) {
  return (
    <div className="relative z-10 overflow-hidden rounded-3xl bg-[#2216ff] p-6 lg:p-8">
      {/* Subtle radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.25),transparent_60%)]" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
        {/* Left — Copy */}
        <div className="flex-1 text-white">
          <span className="mb-[13px] inline-flex items-center rounded-md bg-white/90 px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-[#7c3aed]">
            The problem I saw
          </span>
          <h3 className="mb-3 font-brand text-[20px] font-extrabold leading-tight">
            Bootcamps weren&apos;t cutting it anymore.
          </h3>
          <div className="space-y-4 text-[14px] leading-relaxed text-white/85">
            <p>
              Designers were paying thousands for courses teaching outdated methods
              on fake projects. They&apos;d graduate with polished case studies
              that hiring managers could spot as &quot;concept work&quot; from a
              mile away.
            </p>
            <p>
              I wanted to build something different: real products, real
              constraints, real shipped work.
            </p>
          </div>
          <a
            href={YUMMY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#1a0ed4] px-6 py-3 font-body text-[14px] font-semibold text-sand-100 transition-colors hover:bg-[#150bba]"
          >
            Visit yummy-labs.com
          </a>
        </div>

        {/* Right — Glassmorphism Video */}
        <div className="flex-1">
          <GlassmorphismVideoFrame videoUrl={assets.videos["demo-video"]} />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 3 — Role + Stats (side by side)
   ═══════════════════════════════════ */
/* Stat icons — clean SVG icons replacing emojis */
const statIcons: Record<string, React.ReactNode> = {
  "Sprints Run": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  "Designers Trained": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  "Startup Partners": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l4 6-10 13L2 9z" />
      <path d="M11 3l1 6h-8" />
      <path d="M13 3l-1 6h8" />
      <path d="M8 9l4 13 4-13" />
    </svg>
  ),
  "Weeks per Sprint": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
    </svg>
  ),
};

/* Role icons — clean SVG icons replacing emojis */
const roleIcons: Record<string, React.ReactNode> = {
  "Curriculum design": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  "Lead mentorship": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  "Startup partnerships": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
    </svg>
  ),
  "Product vision": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  "UX Lead": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

function RoleAndStats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="flex flex-col gap-5 lg:flex-row">
      {/* My Role card — left */}
      <div className="flex-1 rounded-3xl border border-sand-300 bg-white p-6">
        <span className="mb-[13px] inline-flex items-center rounded-md bg-sand-100 px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-sand-600">
          My role
        </span>
        <h3 className="mb-4 font-brand text-[20px] font-bold leading-tight text-gray-800">
          Co-Founder & Sprint Leader
        </h3>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2">
          {roles.map((role, i) => (
            <motion.div
              key={role.text}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.07, ease: "easeOut" }}
              className="flex items-center gap-2.5 rounded-lg bg-sand-50 px-3 py-2.5"
            >
              <motion.span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-sand-200/60 text-neutral-500"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.07, type: "spring", stiffness: 200, damping: 12 }}
              >
                {roleIcons[role.text] ?? role.icon}
              </motion.span>
              <span className="font-body text-[13px] font-medium text-neutral-700">
                {role.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats — right, 2×2 grid */}
      <div className="grid flex-1 grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            className="rounded-2xl border border-sand-300 bg-sand-100 px-[17px] py-5 text-center transition-transform duration-300 ease-out hover:-rotate-2 hover:scale-[1.04]"
          >
            <motion.div
              className="mb-2 flex justify-center text-[#300101]"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, type: "spring", stiffness: 200, damping: 12 }}
            >
              {statIcons[stat.label] ?? stat.icon}
            </motion.div>
            <div
              className="font-brand text-[32px] font-extrabold leading-relaxed"
              style={{
                background: "linear-gradient(135deg, #2216ff 0%, #2216ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {stat.number}
            </div>
            <div className="font-body text-[12px] font-semibold uppercase tracking-[0.03em] text-gray-500">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 4 — Sprint Calendar (interactive)
   ═══════════════════════════════════ */
const DAY_LETTERS = ["M", "T", "W", "T", "F", "S", "S"];

function SprintCalendar({ days }: { days: SprintDay[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Split into weeks of 7
  const week1 = days.slice(0, 7);
  const week2 = days.slice(7, 14);
  const [activeWeek, setActiveWeek] = useState(0); // 0 = week 1, 1 = week 2
  const [selectedIdx, setSelectedIdx] = useState(0); // index within current week

  const currentWeek = activeWeek === 0 ? week1 : week2;
  const selectedDay = currentWeek[selectedIdx] ?? currentWeek[0];

  // Derive month name from first day's date
  const firstDate = new Date(week1[0]?.date + "T12:00:00");
  const monthName = firstDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  // Week range labels
  const weekRanges = [week1, week2].map((w) => {
    if (w.length === 0) return "";
    const start = new Date(w[0].date + "T12:00:00");
    const end = new Date(w[w.length - 1].date + "T12:00:00");
    const s = start.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const e = end.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return `${s}–${e}`;
  });

  const switchWeek = (newWeek: number) => {
    setActiveWeek(newWeek);
    setSelectedIdx(0);
  };

  if (days.length === 0) return null;

  return (
    <motion.div
      ref={ref}
      className="rounded-3xl border border-sand-300 bg-white p-6 lg:p-8"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <span className="mb-3 inline-flex items-center rounded-md bg-sand-100 px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-sand-600">
        How it works
      </span>
      <h3 className="mb-1 font-brand text-[20px] font-bold leading-tight text-gray-800">
        2-week sprints. Real startups. Shipped products.
      </h3>
      <p className="mb-5 text-[13px] leading-relaxed text-neutral-400">
        Tap a day to see what you&rsquo;d be working on.
      </p>

      {/* Calendar widget */}
      <div className="overflow-hidden rounded-2xl border border-sand-200 bg-sand-50">
        {/* Month + week nav */}
        <div className="flex items-center justify-between border-b border-sand-200 px-4 py-3 sm:px-5">
          <div>
            <div className="font-brand text-[15px] font-semibold text-brand-ink">{monthName}</div>
            <div className="text-[11px] font-medium text-neutral-400">
              Week {activeWeek + 1} · {weekRanges[activeWeek]}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => switchWeek(0)}
              disabled={activeWeek === 0}
              className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors disabled:opacity-30 enabled:hover:bg-sand-200"
              aria-label="Previous week"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => switchWeek(1)}
              disabled={activeWeek === 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors disabled:opacity-30 enabled:hover:bg-sand-200"
              aria-label="Next week"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Day grid */}
        <div className="px-2 pb-2 pt-3 sm:px-4">
          {/* Day letters */}
          <div className="mb-1 grid grid-cols-7 text-center">
            {DAY_LETTERS.map((letter, i) => (
              <span
                key={i}
                className={`text-[11px] font-semibold ${
                  i >= 5 ? "text-neutral-300" : "text-neutral-400"
                }`}
              >
                {letter}
              </span>
            ))}
          </div>

          {/* Day numbers — large tap targets */}
          <div className="grid grid-cols-7">
            <AnimatePresence mode="wait">
              {currentWeek.map((day, i) => {
                const d = new Date(day.date + "T12:00:00");
                const dayNum = d.getDate();
                const isSelected = i === selectedIdx;
                const isRest = day.isRestDay;

                return (
                  <motion.button
                    key={`${activeWeek}-${i}`}
                    onClick={() => setSelectedIdx(i)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                    className="group flex flex-col items-center gap-1 py-2"
                    aria-label={`${day.name} — ${day.description}`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-[15px] font-semibold transition-all sm:h-11 sm:w-11 ${
                        isSelected
                          ? "bg-[#7c3aed] text-white shadow-md shadow-[#7c3aed]/25"
                          : isRest
                            ? "text-neutral-300 group-hover:bg-sand-200"
                            : "text-brand-ink group-hover:bg-sand-200"
                      }`}
                    >
                      {dayNum}
                    </div>
                    {/* Dot indicator */}
                    <div
                      className={`h-1 w-1 rounded-full transition-colors ${
                        isSelected
                          ? "bg-[#7c3aed]"
                          : day.moduleNumber
                            ? "bg-[#7c3aed]/30"
                            : "bg-transparent"
                      }`}
                    />
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Selected day detail card */}
        <div className="border-t border-sand-200 px-4 py-4 sm:px-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeWeek}-${selectedIdx}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className={`rounded-xl p-4 ${
                selectedDay?.isRestDay
                  ? "bg-sand-100"
                  : "bg-gradient-to-br from-[#f5f3ff] to-[#ede9fe]"
              }`}
            >
              <div className="mb-2 flex items-center gap-2.5">
                {selectedDay?.moduleNumber ? (
                  <span className="inline-flex items-center rounded-md bg-[#7c3aed] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.05em] text-white">
                    Module {selectedDay.moduleNumber}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-md bg-sand-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.05em] text-neutral-400">
                    {selectedDay?.isRestDay ? "Rest day" : "Day off"}
                  </span>
                )}
                <span className="text-[11px] text-neutral-400">
                  {selectedDay
                    ? new Date(selectedDay.date + "T12:00:00").toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })
                    : ""}
                </span>
              </div>
              <h4 className={`mb-1 font-brand text-[16px] font-bold ${
                selectedDay?.isRestDay ? "text-neutral-500" : "text-[#5b21b6]"
              }`}>
                {selectedDay?.name}
              </h4>
              <p className="text-[13px] leading-relaxed text-neutral-400">
                {selectedDay?.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* CTA */}
      <a
        href={RESERVE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#7c3aed] px-5 py-3 font-body text-[14px] font-semibold text-white transition-colors hover:bg-[#6d28d9]"
      >
        I&rsquo;m ready to sprint
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </a>
    </motion.div>
  );
}

/* ═══════════════════════════════════
   Section 5 — Partners
   ═══════════════════════════════════ */
function Partners({ assets }: { assets: YummyAssetsMap }) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      {/* Startup Partners */}
      <div className="flex-1 rounded-3xl border border-sand-300 bg-white p-6">
        <span className="mb-4 inline-flex items-center rounded-md bg-sand-100 px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-sand-600">
          Startup partners
        </span>
        <div className="flex flex-col gap-3 sm:flex-row">
          {partners.map((partner) => {
            const logoUrl = assets.partnerLogos[partner.slug];
            return (
              <div
                key={partner.name}
                className="flex-1 rounded-2xl border border-sand-300 bg-sand-100 p-4 text-center"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-neutral-50">
                  {logoUrl ? (
                    <Img src={logoUrl} alt={partner.name} className="h-8 w-8 object-contain" />
                  ) : (
                    <span className="font-body text-[14px] font-bold text-gray-500">
                      {partner.logoText}
                    </span>
                  )}
                </div>
                <div className="mb-1 font-body text-[14px] font-bold text-[#300101]">
                  {partner.name}
                </div>
                <div className="whitespace-pre-line text-[11px] leading-relaxed text-gray-500">
                  {partner.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tool Partners */}
      <div className="flex-1 rounded-3xl border border-sand-300 bg-white p-6">
        <span className="mb-[13px] inline-flex items-center rounded-md bg-sand-100 px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-sand-600">
          Tool partners
        </span>
        <h3 className="mb-4 font-brand text-[20px] font-bold leading-tight text-gray-800">
          Free tool access for every sprinter
        </h3>
        <div className="flex flex-col flex-wrap gap-3 sm:flex-row">
          {tools.map((tool) => {
            const logoUrl = assets.toolLogos[tool.slug];
            return (
              <div
                key={tool.name}
                className="flex items-center gap-2 rounded-full border border-sand-300 bg-sand-100 px-[17px] py-[11px]"
              >
                <div className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-[4px] bg-[#ede9fe]">
                  {logoUrl ? (
                    <Img src={logoUrl} alt={tool.name} className="h-4 w-4 object-contain" />
                  ) : (
                    <span className="font-body text-[10px] font-bold text-[#7c3aed]">
                      {tool.logoText}
                    </span>
                  )}
                </div>
                <span className="font-body text-[13px] font-semibold text-gray-800">
                  {tool.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 6 — Testimonials
   ═══════════════════════════════════ */
function TestimonialCard({
  t,
  avatarUrl,
  featured,
}: {
  t: (typeof testimonials)[0];
  avatarUrl?: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-[18px] border border-[rgba(255,244,235,0.41)] bg-[#4b1b1b] p-[21px] ${
        featured ? "w-full" : "flex-1"
      }`}
    >
      <p className="mb-[15px] text-[14px] leading-relaxed text-neutral-50">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-[10px]">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#7c3aed] to-[#f472b6] font-body text-[14px] font-bold text-white">
          {avatarUrl ? (
            <Img src={avatarUrl} alt={t.name} className="h-full w-full object-cover" />
          ) : (
            t.initial
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-body text-[13px] font-bold text-neutral-50">
            {t.name}
          </div>
          <div className="text-[11px] text-neutral-50">
            {t.title}, {t.location} {t.flag}
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center rounded-md bg-[#d1fae5] px-[10px] py-1 font-body text-[11px] font-bold text-[#059669]">
          {t.badge}
        </span>
      </div>
    </div>
  );
}

function Testimonials({ assets }: { assets: YummyAssetsMap }) {
  const featured = testimonials.find((t) => t.featured);
  const rest = testimonials.filter((t) => !t.featured);

  return (
    <div className="rounded-3xl border border-sand-300 bg-[#300101] p-[26px]">
      <span className="mb-[13px] inline-flex items-center rounded-md bg-sand-100 px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-sand-600">
        Designer testimonials
      </span>

      <div className="mt-8 flex flex-col gap-4">
        {/* Featured */}
        {featured && (
          <TestimonialCard
            t={featured}
            avatarUrl={assets.avatars[featured.avatarSlug] || undefined}
            featured
          />
        )}

        {/* Rows of 2 */}
        {[0, 2, 4].map((startIdx) => {
          const pair = rest.slice(startIdx, startIdx + 2);
          if (pair.length === 0) return null;
          return (
            <div key={startIdx} className="flex flex-col gap-4 md:flex-row">
              {pair.map((t) => (
                <TestimonialCard
                  key={t.name}
                  t={t}
                  avatarUrl={assets.avatars[t.avatarSlug] || undefined}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 7 — Gallery
   ═══════════════════════════════════ */
const tiltClasses = [
  "-rotate-1",
  "rotate-[1.5deg]",
  "-rotate-[0.5deg]",
  "rotate-1",
  "-rotate-[1.5deg]",
  "rotate-[0.5deg]",
];

function Gallery({ assets }: { assets: YummyAssetsMap }) {
  // Render directly from Notion — no hardcoded list needed
  const items = assets.gallery.filter((g) => g.imageUrl);

  if (items.length === 0) return null;

  return (
    <div className="mt-2">
      <span className="mb-5 inline-flex items-center rounded-md bg-sand-100 px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-sand-600">
        Behind the scenes
      </span>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((item, idx) => (
          <div
            key={item.slug}
            className={`mb-4 overflow-hidden rounded-2xl border border-sand-300 bg-neutral-50 break-inside-avoid transition-all hover:scale-[1.02] hover:border-[#2216ff] hover:rotate-0 ${tiltClasses[idx % tiltClasses.length] || ""}`}
          >
            <Img src={item.imageUrl} alt={item.name} className="w-full rounded-2xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 8 — CTA
   ═══════════════════════════════════ */
function CtaSection() {
  return (
    <div className="mt-6 text-center">
      <a
        href={YUMMY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-[#2216ff] px-6 py-3 font-body text-[14px] font-semibold text-white shadow-[0_4px_16px_rgba(34,22,255,0.25)] transition-colors hover:bg-[#1a11cc]"
      >
        Visit yummy-labs.com
        <ExternalArrow />
      </a>
    </div>
  );
}

/* ═══════════════════════════════════
   Main Page
   ═══════════════════════════════════ */
export function YummyLabsPage({ assets, sprintDays }: YummyLabsPageProps) {
  return (
    <PageEntrance>
      <Header assets={assets} />
      <ProblemHero assets={assets} />
      <RoleAndStats />
      <SprintCalendar days={sprintDays ?? []} />
      <Partners assets={assets} />
      <Testimonials assets={assets} />
      <Gallery assets={assets} />
      <CtaSection />
    </PageEntrance>
  );
}
