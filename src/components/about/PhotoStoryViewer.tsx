"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { AboutPhoto } from "@/lib/types";

const AUTO_ADVANCE_MS = 5000;

interface PhotoStoryViewerProps {
  photos: AboutPhoto[];
  startIndex: number;
  onClose: () => void;
}

export function PhotoStoryViewer({
  photos,
  startIndex,
  onClose,
}: PhotoStoryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [direction, setDirection] = useState(0); // -1 = prev, 1 = next
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const photo = photos[currentIndex];

  /* ── Navigation ── */
  const goNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      setDirection(1);
      setCurrentIndex((i) => i + 1);
      setProgress(0);
      startTimeRef.current = Date.now();
    } else {
      onClose();
    }
  }, [currentIndex, photos.length, onClose]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((i) => i - 1);
      setProgress(0);
      startTimeRef.current = Date.now();
    }
  }, [currentIndex]);

  /* ── Auto-advance timer ── */
  useEffect(() => {
    if (isPaused) return;

    startTimeRef.current = Date.now();
    setProgress(0);

    // Progress ticker — updates every 50ms for smooth bar
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(elapsed / AUTO_ADVANCE_MS, 1);
      setProgress(pct);
      if (pct >= 1) {
        if (timerRef.current) clearInterval(timerRef.current);
        // Auto-advance
        setDirection(1);
        setCurrentIndex((i) => {
          if (i < photos.length - 1) return i + 1;
          // Last photo — close
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
  }, [currentIndex, isPaused, photos.length, onClose]);

  /* ── Keyboard navigation ── */
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

  /* ── Lock body scroll ── */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  /* ── Tap zones: left 1/3 = prev, right 2/3 = next ── */
  const handleTap = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const third = rect.width / 3;
      if (x < third) {
        goPrev();
      } else {
        goNext();
      }
    },
    [goPrev, goNext]
  );

  /* ── Swipe support ── */
  const touchStartX = useRef<number>(0);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(dx) > 50) {
        if (dx < 0) goNext();
        else goPrev();
      }
    },
    [goNext, goPrev]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ WebkitBackfaceVisibility: "hidden" }}
    >
      {/* Frosted glass backdrop — blurred version of current photo as BG color */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-3xl" />

      {/* Blurred ambient photo color behind content */}
      <AnimatePresence mode="sync">
        <motion.div
          key={photo.id + "-bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 overflow-hidden"
        >
          {photo.imageUrl && (
            <Image
              src={photo.imageUrl}
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

      {/* Content container */}
      <div
        className="relative flex h-full w-full max-w-[480px] flex-col items-center px-4 py-6 sm:py-10"
        onClick={handleTap}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Top bar: progress segments + close button on same row */}
        <div className="mb-4 flex w-full items-center gap-2 px-1">
          <div className="flex flex-1 gap-1">
            {photos.map((_, i) => (
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

          {/* Close button — inline with progress bars */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="z-30 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
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
        </div>

        {/* Photo card — centered with white border, rounded corners */}
        <div className="flex flex-1 items-center justify-center w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={photo.id}
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
              className="relative w-full overflow-hidden rounded-2xl bg-white shadow-2xl"
              style={{
                boxShadow:
                  "0 25px 80px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.2)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] w-full">
                {photo.imageUrl ? (
                  <Image
                    src={photo.imageUrl}
                    alt={photo.label}
                    fill
                    sizes="480px"
                    className="object-cover"
                    quality={70}
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-sand-100">
                    <span className="text-sm font-medium uppercase tracking-wider text-neutral-400">
                      {photo.label}
                    </span>
                  </div>
                )}

                {/* Preload next image for instant transitions */}
                {currentIndex < photos.length - 1 &&
                  photos[currentIndex + 1].imageUrl && (
                    <Image
                      src={photos[currentIndex + 1].imageUrl}
                      alt=""
                      fill
                      sizes="480px"
                      className="pointer-events-none opacity-0"
                      quality={70}
                      aria-hidden="true"
                    />
                  )}

                {/* Bottom gradient for text readability */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/3"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
                  }}
                />

                {/* Caption overlay */}
                <div className="absolute inset-x-0 bottom-0 px-5 pb-5">
                  <h3 className="font-brand text-[18px] font-bold text-white drop-shadow-lg">
                    {photo.label}
                  </h3>
                  {photo.caption && (
                    <p className="mt-1 text-13 leading-[1.5] text-white/80 drop-shadow-md">
                      {photo.caption}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Photo counter */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-12 font-medium text-white/50">
            {currentIndex + 1} / {photos.length}
          </span>
        </div>
      </div>

      {/* Navigation hint arrows (desktop only) */}
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
    </motion.div>
  );
}
