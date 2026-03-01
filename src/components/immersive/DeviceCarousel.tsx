"use client";

/**
 * DeviceCarousel — image carousel with device frame chrome.
 * Supports phone, laptop, and desktop frames.
 * Autoplay with pause on hover. Smooth crossfade transitions.
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

  // Autoplay
  useEffect(() => {
    if (autoplay <= 0 || paused || shouldReduce) return;
    timerRef.current = setInterval(next, autoplay * 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoplay, paused, next, shouldReduce]);

  const frameClasses = {
    phone: "mx-auto w-[220px] sm:w-[260px]",
    laptop: "mx-auto w-full max-w-[720px]",
    desktop: "mx-auto w-full max-w-[840px]",
  };

  const aspectClasses = {
    phone: "aspect-[9/19]",
    laptop: "aspect-[16/10]",
    desktop: "aspect-[16/10]",
  };

  const radiusClasses = {
    phone: "rounded-[24px]",
    laptop: "rounded-xl",
    desktop: "rounded-xl",
  };

  return (
    <div
      className={className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Device frame */}
      <div className={frameClasses[device]}>
        <div
          className={`relative overflow-hidden bg-black/5 ${radiusClasses[device]} ${aspectClasses[device]}`}
          style={{
            boxShadow:
              device === "phone"
                ? "0 8px 40px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)"
                : "0 12px 60px rgba(0,0,0,0.12), 0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
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
                className="object-cover"
                sizes={
                  device === "phone"
                    ? "260px"
                    : device === "laptop"
                    ? "720px"
                    : "840px"
                }
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Device chin (phone only) */}
        {device === "phone" && (
          <div className="mx-auto mt-1 h-1 w-1/3 rounded-full bg-white/10" />
        )}
      </div>

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
      <div className="mt-4 flex justify-center gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="relative h-2 w-2 rounded-full transition-all duration-200"
            style={{
              backgroundColor: "currentColor",
              opacity: i === current ? 1 : 0.25,
            }}
            aria-label={`Go to slide ${i + 1}`}
          >
            {i === current && (
              <motion.div
                className="absolute inset-[-1px] rounded-full"
                style={{ backgroundColor: "currentColor" }}
                layoutId={`dot-${carouselId}`}
                transition={spring.snappy}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
