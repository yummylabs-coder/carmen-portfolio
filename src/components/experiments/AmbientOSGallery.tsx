"use client";

import {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Experiment } from "@/lib/types";
import { AmbientOSDemo } from "./AmbientOSDemo";

/* ─── Slide type ─── */
interface GallerySlide {
  type: "interactive" | "image";
  label: string;
  caption?: string;
  imageUrl?: string;
}

/* ─── Build slides: interactive first, then all gallery images ─── */
function buildSlides(experiment: Experiment): GallerySlide[] {
  const slides: GallerySlide[] = [
    {
      type: "interactive",
      label: "Ambient OS",
      caption: "Apps as Contextual Orbs — interactive spatial interface",
    },
  ];

  const images = experiment.galleryUrls ?? [];
  const captions = experiment.galleryCaptions ?? [];

  images.forEach((url, i) => {
    slides.push({
      type: "image",
      label: captions[i] || experiment.name,
      caption: captions[i],
      imageUrl: url,
    });
  });

  return slides;
}

/* ─── Body scroll lock (iOS-safe) ─── */
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

/* ─── Slide transition variants ─── */
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 240 : -240,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -240 : 240,
    opacity: 0,
    scale: 0.96,
  }),
};

/* ─── Gallery Component ─── */
export function AmbientOSGallery({
  experiment,
  onClose,
}: {
  experiment: Experiment;
  onClose: () => void;
}) {
  const slides = buildSlides(experiment);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const savedScrollY = useRef(0);

  const slide = slides[current];

  const goNext = useCallback(() => {
    if (current < slides.length - 1) {
      setDirection(1);
      setCurrent((i) => i + 1);
    }
  }, [current, slides.length]);

  const goPrev = useCallback(() => {
    if (current > 0) {
      setDirection(-1);
      setCurrent((i) => i - 1);
    }
  }, [current]);

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

  /* ── Lock body scroll ── */
  useLayoutEffect(() => {
    savedScrollY.current = lockBodyScroll();
    return () => unlockBodyScroll(savedScrollY.current);
  }, []);

  return createPortal(
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
      {/* ── Dark backdrop ── */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* ── Close button ── */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-4 top-5 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors active:bg-white/30 sm:right-6 sm:top-8 sm:h-9 sm:w-9 sm:hover:bg-white/20"
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

      {/* ── Navigation arrows ── */}
      {current > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="absolute left-3 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-5"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 3L5 8L10 13" />
          </svg>
        </button>
      )}
      {current < slides.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="absolute right-3 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-5"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 3L11 8L6 13" />
          </svg>
        </button>
      )}

      {/* ── Main content area ── */}
      <div className="relative z-10 flex w-full max-w-[820px] flex-col items-center px-12 sm:px-16">
        {/* Slide container */}
        <div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{ aspectRatio: "16 / 10" }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.35,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className="absolute inset-0"
            >
              {slide.type === "interactive" ? (
                <AmbientOSDemo className="h-full w-full rounded-2xl" />
              ) : slide.imageUrl ? (
                <div className="relative h-full w-full">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.label}
                    fill
                    className="rounded-2xl object-cover"
                    sizes="820px"
                    priority={current <= 1}
                  />
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Caption */}
        <AnimatePresence mode="wait">
          <motion.p
            key={current}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="mt-3 text-center text-13 font-medium text-white/70"
          >
            {slide.caption || slide.label}
          </motion.p>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="mt-3 flex gap-1.5">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              aria-label={`Go to slide ${i + 1}: ${s.label}`}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === current
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <p className="mt-2 text-[10px] text-white/25">
          {current + 1} / {slides.length}
        </p>
      </div>
    </motion.div>,
    document.body,
  );
}
