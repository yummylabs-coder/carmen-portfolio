"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const AUTO_ADVANCE_MS = 5000;

/* ─── Video embed helpers ─── */
function toEmbedUrl(raw: string): string | null {
  try {
    const url = new URL(raw);
    if (url.hostname.includes("youtube.com") || url.hostname.includes("youtu.be")) {
      const id = url.hostname.includes("youtu.be")
        ? url.pathname.slice(1)
        : url.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (url.hostname.includes("loom.com")) {
      const id = url.pathname.replace("/share/", "/embed/");
      return `https://www.loom.com${id}`;
    }
    if (url.hostname.includes("vimeo.com")) {
      const id = url.pathname.split("/").pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
    return null;
  } catch {
    return null;
  }
}

/* ─── Public types ─── */
export interface StorySlide {
  id: string;
  imageUrl?: string;
  /** Raw video URL (YouTube, Loom, Vimeo) — auto-converted to embed */
  videoUrl?: string;
  label: string;
  caption?: string;
}

export interface StoryViewerProps {
  slides: StorySlide[];
  startIndex?: number;
  onClose: () => void;
  /** Optional heading shown between progress bar and card */
  title?: string;
  subtitle?: string;
  tags?: string[];
  /** "portrait" (3:4) for photo galleries, "landscape" (16:10) for screenshots */
  aspect?: "portrait" | "landscape";
  /** Show progress bars and auto-advance (default: true). Set false for static modals. */
  autoAdvance?: boolean;
}

/* ─── iOS-safe body scroll lock ─── */
function lockBodyScroll() {
  const scrollY = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.overflow = "hidden";
  return scrollY;
}

function unlockBodyScroll(scrollY: number) {
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.overflow = "";
  window.scrollTo(0, scrollY);
}

/* ─── Component ─── */
export function StoryViewer({
  slides,
  startIndex = 0,
  onClose,
  title,
  subtitle,
  tags,
  aspect = "portrait",
  autoAdvance = true,
}: StoryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(Date.now());
  const canHover = useRef(false);
  const savedScrollY = useRef(0);

  const slide = slides[currentIndex];
  const embedUrl = slide?.videoUrl ? toEmbedUrl(slide.videoUrl) : null;
  const isVideo = !!embedUrl;

  /* ── Detect hover-capable device ── */
  useEffect(() => {
    canHover.current = window.matchMedia("(hover: hover)").matches;
  }, []);

  /* ── Navigation ── */
  const goNext = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      setDirection(1);
      setCurrentIndex((i) => i + 1);
      setProgress(0);
      startTimeRef.current = Date.now();
    } else {
      onClose();
    }
  }, [currentIndex, slides.length, onClose]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((i) => i - 1);
      setProgress(0);
      startTimeRef.current = Date.now();
    }
  }, [currentIndex]);

  /* ── Auto-advance timer (pauses for video and desktop hover) ── */
  useEffect(() => {
    if (!autoAdvance || isPaused || isVideo) return;

    startTimeRef.current = Date.now();
    setProgress(0);

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(elapsed / AUTO_ADVANCE_MS, 1);
      setProgress(pct);
      if (pct >= 1) {
        if (timerRef.current) clearInterval(timerRef.current);
        setDirection(1);
        setCurrentIndex((i) => {
          if (i < slides.length - 1) return i + 1;
          setTimeout(onClose, 300);
          return i;
        });
        setProgress(0);
        startTimeRef.current = Date.now();
      }
    }, 50);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoAdvance, currentIndex, isPaused, isVideo, slides.length, onClose]);

  /* ── Keyboard ── */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, goNext, goPrev]);

  /* ── Lock body scroll (iOS-safe) ── */
  useEffect(() => {
    savedScrollY.current = lockBodyScroll();
    return () => {
      unlockBodyScroll(savedScrollY.current);
    };
  }, []);

  /* ── Desktop-only hover pause ── */
  const handleMouseEnter = useCallback(() => {
    if (canHover.current) setIsPaused(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    if (canHover.current) setIsPaused(false);
  }, []);

  const aspectClass =
    aspect === "landscape" ? "aspect-[16/10]" : "aspect-[3/4]";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{
        WebkitBackfaceVisibility: "hidden",
        touchAction: "none",
        overscrollBehavior: "contain",
      }}
      onTouchMove={(e) => e.preventDefault()}
    >
      {/* Frosted glass backdrop — heavier + light blur on mobile, full blur on desktop */}
      <div className="absolute inset-0 bg-black/92 backdrop-blur-sm sm:bg-black/70 sm:backdrop-blur-3xl" />

      {/* Blurred ambient photo color — DESKTOP ONLY
          blur-[80px] on a full-viewport image kills mobile GPU memory */}
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block">
        <AnimatePresence mode="sync">
          <motion.div
            key={slide.id + "-bg"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {slide.imageUrl && (
              <Image
                src={slide.imageUrl}
                alt=""
                fill
                className="object-cover blur-[80px] saturate-150"
                sizes="100vw"
                quality={10}
                priority
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Close button — absolute top-right of viewport */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-4 top-5 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-colors active:bg-white/30 sm:right-6 sm:top-8 sm:h-9 sm:w-9 sm:bg-white/10 sm:backdrop-blur-sm sm:hover:bg-white/20"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M4 4L12 12M4 12L12 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Content container — image centered in viewport, metadata compact */}
      <div
        className="relative flex h-full w-full max-w-[480px] flex-col items-center px-4 py-6 sm:py-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Progress bars (auto-advance mode only) */}
        {autoAdvance && (
          <div className="mb-3 flex w-full shrink-0 gap-1 px-1">
            {slides.map((_, i) => (
              <div
                key={i}
                className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/20"
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-white/90"
                  style={{
                    width:
                      i < currentIndex
                        ? "100%"
                        : i === currentIndex
                          ? `${progress * 100}%`
                          : "0%",
                    transition:
                      i === currentIndex
                        ? "width 50ms linear"
                        : "width 300ms ease",
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Compact metadata — title + subtitle + horizontal scrollable tags */}
        {(title || (tags && tags.length > 0)) && (
          <div className="mb-2 w-full shrink-0 px-1 text-center">
            {title && (
              <h2 className="font-brand text-[16px] font-bold text-white drop-shadow-lg">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-0.5 line-clamp-2 text-12 leading-[1.4] text-white/60">
                {subtitle}
              </p>
            )}
            {tags && tags.length > 0 && (
              <div className="relative mt-1.5">
                <div className="no-scrollbar flex gap-1.5 overflow-x-auto px-1 pb-1">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="shrink-0 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white/70 backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Card area — flex-1 so image is centered in remaining space */}
        <div className="flex w-full flex-1 items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.id}
              custom={direction}
              initial={{
                opacity: 0,
                x: direction > 0 ? 40 : direction < 0 ? -40 : 0,
                scale: 0.96,
              }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{
                opacity: 0,
                x: direction > 0 ? -40 : 40,
                scale: 0.96,
              }}
              transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
              className="relative w-full overflow-hidden rounded-2xl bg-white"
              style={{
                boxShadow:
                  "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              {embedUrl ? (
                <div className={`relative ${aspectClass} w-full`}>
                  <iframe
                    src={embedUrl}
                    title={slide.label}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-0"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className={`relative ${aspectClass} w-full`}>
                  {slide.imageUrl ? (
                    <Image
                      src={slide.imageUrl}
                      alt={slide.label}
                      fill
                      sizes="(max-width: 640px) 100vw, 480px"
                      className="object-cover"
                      quality={85}
                      priority
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-sand-100">
                      <span className="text-sm font-medium uppercase tracking-wider text-neutral-400">
                        {slide.label}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Invisible tap zones — left = prev, right = next (multi-slide only) */}
              {!isVideo && slides.length > 1 && (
                <div className="absolute inset-0 z-10 flex">
                  <button
                    className="h-full w-1/3 focus:outline-none"
                    onClick={goPrev}
                    aria-label="Previous"
                  />
                  <button
                    className="h-full w-2/3 focus:outline-none"
                    onClick={goNext}
                    aria-label="Next"
                  />
                </div>
              )}

              {/* Preload next image */}
              {currentIndex < slides.length - 1 &&
                slides[currentIndex + 1].imageUrl && (
                  <Image
                    src={slides[currentIndex + 1].imageUrl!}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 480px"
                    className="pointer-events-none opacity-0"
                    quality={85}
                    aria-hidden="true"
                  />
                )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Caption — below the card, centered on the dark BG */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id + "-caption"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-3 w-full shrink-0 text-center"
          >
            <h3 className="font-brand text-[16px] font-bold text-white drop-shadow-lg">
              {slide.label}
            </h3>
            {slide.caption && (
              <p className="mt-1 text-13 leading-[1.5] text-white/70">
                {slide.caption}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Pagination — circle dots for non-auto-advance, counter for auto-advance */}
        <div className="mt-2 flex shrink-0 items-center justify-center">
          {!autoAdvance && slides.length > 1 ? (
            <div className="flex items-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "h-[6px] w-4 bg-white/80"
                      : "h-[6px] w-[6px] bg-white/25"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          ) : (
            <span className="text-12 font-medium text-white/50">
              {currentIndex + 1} / {slides.length}
            </span>
          )}
        </div>
      </div>

      {/* Navigation arrows (desktop only) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        className="absolute left-4 top-1/2 z-30 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/60 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white sm:flex"
        style={{ opacity: currentIndex > 0 ? 1 : 0.3 }}
      >
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
          <path
            d="M10 4L6 8L10 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        className="absolute right-4 top-1/2 z-30 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/60 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white sm:flex"
      >
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
          <path
            d="M6 4L10 8L6 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Utility style for hiding scrollbar on tag row */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </motion.div>
  );
}
