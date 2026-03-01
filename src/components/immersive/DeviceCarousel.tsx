"use client";

/**
 * DeviceCarousel — image carousel with realistic device frame chrome.
 *
 * Supports phone (iPhone), laptop (MacBook), and desktop (iMac) frames.
 * Autoplay with pause on hover. Arrow navigation on desktop, swipe on mobile.
 */

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef, useId } from "react";
import { ease, spring } from "@/lib/motion";

interface Slide {
  src: string;
  alt: string;
  caption?: string;
}

interface DeviceCarouselProps {
  slides: Slide[];
  device: "phone" | "laptop" | "desktop";
  /** Autoplay interval in seconds. 0 = no autoplay. */
  autoplay?: number;
  className?: string;
}

/* ── Arrow button ─────────────────────────────────────────────────── */

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="hidden lg:flex absolute top-1/2 z-30 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-all hover:bg-black/60 hover:scale-110 active:scale-95"
      style={{
        width: 40,
        height: 40,
        [direction === "prev" ? "left" : "right"]: -56,
      }}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        className="text-white"
      >
        <path
          d={direction === "prev" ? "M11 14L6 9L11 4" : "M7 4L12 9L7 14"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/* ── Main component ───────────────────────────────────────────────── */

export function DeviceCarousel({
  slides,
  device,
  autoplay = 4,
  className = "",
}: DeviceCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const shouldReduce = useReducedMotion();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const carouselId = useId();

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Autoplay
  useEffect(() => {
    if (autoplay <= 0 || paused || shouldReduce) return;
    timerRef.current = setInterval(next, autoplay * 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoplay, paused, next, shouldReduce]);

  // Swipe handler via Framer Motion drag
  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
      // Trigger on offset OR velocity (quick flick)
      const swipe = info.offset.x;
      const velocity = info.velocity.x;
      if (swipe > 50 || velocity > 300) prev();
      else if (swipe < -50 || velocity < -300) next();
    },
    [next, prev],
  );

  const frameClasses = {
    phone: "mx-auto w-[220px] sm:w-[260px]",
    laptop: "mx-auto w-full max-w-[720px] lg:max-w-[960px]",
    desktop: "mx-auto w-full max-w-[840px] lg:max-w-[1080px]",
  };

  const imageSizes = {
    phone: "260px",
    laptop: "(min-width: 1024px) 960px, 720px",
    desktop: "(min-width: 1024px) 1080px, 840px",
  };

  /* ── Render: Screen content (shared by all frames) ────────────── */
  const screenContent = (
    <AnimatePresence mode="wait">
      <motion.div
        key={current}
        className="absolute inset-0"
        initial={shouldReduce ? { opacity: 0.5 } : { opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: shouldReduce ? 0.15 : 0.5,
          ease: ease.smooth,
        }}
      >
        <Image
          src={slides[current].src}
          alt={slides[current].alt}
          fill
          className="object-cover object-top"
          sizes={imageSizes[device]}
        />
      </motion.div>
    </AnimatePresence>
  );

  /* ── Render: Device frame ─────────────────────────────────────── */
  function renderFrame() {
    if (device === "phone") {
      return (
        <div
          className={frameClasses.phone}
          style={{
            filter:
              "drop-shadow(0 20px 40px rgba(0,0,0,0.15)) drop-shadow(0 8px 16px rgba(0,0,0,0.1))",
          }}
        >
          <div className="overflow-hidden rounded-[40px] border-[8px] border-[#1d1d1f] bg-[#1d1d1f]">
            <div className="relative overflow-hidden rounded-[32px] bg-black">
              {/* Dynamic Island */}
              <div className="absolute left-1/2 top-[10px] z-20 h-[22px] w-[80px] -translate-x-1/2 rounded-full bg-black" />
              {/* Screen */}
              <div className="relative aspect-[9/19.5] w-full overflow-hidden bg-white">
                {screenContent}
              </div>
              {/* Home indicator */}
              <div className="absolute bottom-[6px] left-1/2 z-20 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-white/30" />
            </div>
          </div>
        </div>
      );
    }

    if (device === "laptop") {
      return (
        <div
          className={frameClasses.laptop}
          style={{
            filter:
              "drop-shadow(0 20px 40px rgba(0,0,0,0.15)) drop-shadow(0 8px 16px rgba(0,0,0,0.1))",
          }}
        >
          {/* Screen */}
          <div className="overflow-hidden rounded-t-[10px] border-[6px] border-b-[18px] border-[#1d1d1f] bg-[#1d1d1f]">
            <div className="relative aspect-[1440/932] w-full overflow-hidden bg-white">
              {screenContent}
            </div>
          </div>
          {/* Base / hinge */}
          <div
            className="mx-auto h-[8px] rounded-b-md"
            style={{
              width: "104%",
              marginLeft: "-2%",
              background:
                "linear-gradient(180deg, #3a3a3c 0%, #1d1d1f 100%)",
            }}
          />
        </div>
      );
    }

    // desktop (iMac)
    return (
      <div
        className={frameClasses.desktop}
        style={{
          filter:
            "drop-shadow(0 20px 40px rgba(0,0,0,0.12)) drop-shadow(0 8px 16px rgba(0,0,0,0.08))",
        }}
      >
        {/* Monitor */}
        <div className="overflow-hidden rounded-t-[10px] border-[6px] border-b-0 border-[#1d1d1f] bg-[#1d1d1f]">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
            {screenContent}
          </div>
        </div>
        {/* Chin */}
        <div className="flex items-center justify-center rounded-b-[10px] bg-gradient-to-b from-[#e4e4e7] to-[#d4d4d8] py-[8px]">
          <div className="h-[4px] w-[4px] rounded-full bg-[#a1a1aa]" />
        </div>
        {/* Stand */}
        <div className="flex justify-center">
          <div
            className="h-[40px] w-[60px] bg-gradient-to-b from-[#d4d4d8] to-[#c4c4c8]"
            style={{
              clipPath: "polygon(15% 0%, 85% 0%, 95% 100%, 5% 100%)",
            }}
          />
        </div>
        <div className="flex justify-center">
          <div className="h-[4px] w-[120px] rounded-[2px] bg-gradient-to-b from-[#c4c4c8] to-[#b4b4b8]" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Frame + arrows wrapper — draggable for swipe */}
      <motion.div
        className="relative"
        style={{ touchAction: "pan-y" }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={handleDragEnd}
      >
        {/* Arrows (desktop only) */}
        {slides.length > 1 && (
          <>
            <ArrowButton direction="prev" onClick={prev} />
            <ArrowButton direction="next" onClick={next} />
          </>
        )}

        {renderFrame()}
      </motion.div>

      {/* Caption */}
      <AnimatePresence mode="wait">
        <motion.p
          key={current}
          className="mt-4 text-center text-[13px] italic opacity-40"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 0.4, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {slides[current].caption}
        </motion.p>
      </AnimatePresence>

      {/* Dots */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "w-6"
                : "w-2 hover:opacity-50"
            }`}
            style={{
              backgroundColor: "currentColor",
              opacity: i === current ? 1 : 0.25,
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
