"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";

/* ─── Types ─── */
export interface MockupSlide {
  src: string;
  alt: string;
  /** Optional caption below the device */
  caption?: string;
}

type DeviceType = "phone" | "laptop" | "desktop";

interface DeviceMockupCarouselProps {
  slides: MockupSlide[];
  device?: DeviceType;
  /** Auto-advance interval in ms. 0 = disabled. Default 4000. */
  autoPlay?: number;
  className?: string;
}

/* ─── Inline Device Frames ─── */
function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mx-auto w-full max-w-[280px]"
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
            {children}
          </div>
          {/* Home indicator */}
          <div className="absolute bottom-[6px] left-1/2 z-20 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-white/30" />
        </div>
      </div>
    </div>
  );
}

function LaptopShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mx-auto w-full max-w-[800px]"
      style={{
        filter:
          "drop-shadow(0 20px 40px rgba(0,0,0,0.15)) drop-shadow(0 8px 16px rgba(0,0,0,0.1))",
      }}
    >
      <div className="overflow-hidden rounded-t-[10px] border-[6px] border-b-[18px] border-[#1d1d1f] bg-[#1d1d1f]">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
          {children}
        </div>
      </div>
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

function DesktopShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mx-auto w-full max-w-[900px]"
      style={{
        filter:
          "drop-shadow(0 20px 40px rgba(0,0,0,0.12)) drop-shadow(0 8px 16px rgba(0,0,0,0.08))",
      }}
    >
      <div className="overflow-hidden rounded-[10px] border-[6px] border-b-0 border-[#1d1d1f] bg-[#1d1d1f]">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
          {children}
        </div>
      </div>
      <div className="flex items-center justify-center rounded-b-[10px] bg-gradient-to-b from-[#e4e4e7] to-[#d4d4d8] py-[8px]">
        <div className="h-[4px] w-[4px] rounded-full bg-[#a1a1aa]" />
      </div>
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

const shells: Record<DeviceType, React.FC<{ children: React.ReactNode }>> = {
  phone: PhoneShell,
  laptop: LaptopShell,
  desktop: DesktopShell,
};

const sizes: Record<DeviceType, string> = {
  phone: "280px",
  laptop: "(max-width: 800px) 100vw, 800px",
  desktop: "(max-width: 900px) 100vw, 900px",
};

/**
 * Swipeable device mockup carousel with auto-advance.
 * Supports phone, laptop, and desktop frames.
 * Pauses on hover. Touch-friendly.
 */
export function DeviceMockupCarousel({
  slides,
  device = "phone",
  autoPlay = 4000,
  className,
}: DeviceMockupCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const touchStartX = useRef(0);

  const total = slides.length;
  const Shell = shells[device];

  const goTo = useCallback(
    (idx: number) => {
      setDirection(idx > current ? 1 : -1);
      setCurrent(idx);
    },
    [current],
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  // Auto-advance
  useEffect(() => {
    if (autoPlay <= 0 || isPaused || !isInView || total <= 1) return;
    const timer = setInterval(next, autoPlay);
    return () => clearInterval(timer);
  }, [autoPlay, isPaused, isInView, next, total]);

  // Touch handlers
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left → next
        setDirection(1);
        setCurrent((prev) => (prev + 1) % total);
      } else {
        // Swipe right → prev
        setDirection(-1);
        setCurrent((prev) => (prev - 1 + total) % total);
      }
    }
  }

  if (total === 0) return null;

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Shell>
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slides[current].src}
              alt={slides[current].alt}
              fill
              className="object-cover object-top"
              sizes={sizes[device]}
            />
          </motion.div>
        </AnimatePresence>
      </Shell>

      {/* Caption */}
      {slides[current].caption && (
        <p className="mt-3 text-center text-13 text-neutral-400">
          {slides[current].caption}
        </p>
      )}

      {/* Dot indicators */}
      {total > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 bg-brand-ink"
                  : "w-2 bg-neutral-300 hover:bg-neutral-400"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
