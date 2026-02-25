"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  /** Aspect ratio CSS value, e.g. "16/10". Default "16/10". */
  aspectRatio?: string;
  className?: string;
}

/**
 * Draggable before/after comparison slider.
 * Works on both mouse and touch devices.
 */
export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before",
  afterAlt = "After",
  aspectRatio = "16/10",
  className,
}: BeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(viewRef, { once: true, margin: "-60px" });
  const [position, setPosition] = useState(50); // percentage
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 2), 98);
    setPosition(percent);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      updatePosition(e.clientX);
    },
    [updatePosition],
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <motion.div
      ref={viewRef}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      <div
        ref={containerRef}
        className="relative select-none overflow-hidden rounded-xl border border-sand-200"
        style={{ aspectRatio, touchAction: "none" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* After image (full width, bottom layer) */}
        <div className="absolute inset-0">
          <Image
            src={afterSrc}
            alt={afterAlt}
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 900px) 100vw, 900px"
            draggable={false}
          />
        </div>

        {/* Before image (clipped by slider position) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 900px) 100vw, 900px"
            draggable={false}
            style={{ maxWidth: "none", width: containerRef.current?.offsetWidth ?? "100%" }}
          />
        </div>

        {/* Slider line */}
        <div
          className="absolute top-0 z-10 h-full w-[2px] bg-white"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          {/* Handle */}
          <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-white/90 shadow-lg backdrop-blur-sm">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1d1d1f"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8L22 12L18 16" />
              <path d="M6 8L2 12L6 16" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute left-3 top-3 z-10 rounded-md bg-black/60 px-2 py-1 text-11 font-semibold text-white backdrop-blur-sm">
          Before
        </div>
        <div className="absolute right-3 top-3 z-10 rounded-md bg-black/60 px-2 py-1 text-11 font-semibold text-white backdrop-blur-sm">
          After
        </div>
      </div>
    </motion.div>
  );
}
