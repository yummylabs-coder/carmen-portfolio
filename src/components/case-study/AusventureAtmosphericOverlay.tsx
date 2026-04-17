"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const TYPEWRITER_TEXT = "3,500+ Experiences & Campers in New Zealand and Australia";

/**
 * Atmospheric overlay for Ausventure — two elements:
 *  1. Bottom-left: typewriter stat text
 *  2. Top-right: pulsing location circle with coordinates + place name
 */
export function AusventureAtmosphericOverlay() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduce = useReducedMotion();
  const [displayedChars, setDisplayedChars] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Typewriter effect
  useEffect(() => {
    if (!isInView) return;
    if (shouldReduce) {
      setDisplayedChars(TYPEWRITER_TEXT.length);
      return;
    }
    if (displayedChars >= TYPEWRITER_TEXT.length) {
      const blinkTimer = setTimeout(() => setShowCursor(false), 2000);
      return () => clearTimeout(blinkTimer);
    }
    const speed = displayedChars === 0 ? 400 : 35 + Math.random() * 25;
    const timer = setTimeout(() => {
      setDisplayedChars((prev) => prev + 1);
    }, speed);
    return () => clearTimeout(timer);
  }, [isInView, displayedChars, shouldReduce]);

  // Cursor blink
  useEffect(() => {
    if (!isInView || !showCursor) return;
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, [isInView, showCursor]);

  return (
    <div ref={ref} className="relative mx-auto h-full w-full max-w-[1200px]">
      {/* ── Top-right: pulsing location marker ── */}
      <motion.div
        className="absolute right-[4%] top-[6%] sm:right-[6%] sm:top-[8%]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
      >
        {/* Container with white fill at 20% opacity */}
        <div className="flex items-center gap-3 rounded-full bg-white/20 py-2.5 pl-3 pr-5 backdrop-blur-sm">
          {/* Pulsing circles */}
          <div className="relative flex size-10 items-center justify-center sm:size-12">
            {/* Outer pulse ring */}
            <motion.div
              className="absolute size-10 rounded-full border border-[#F58639]/30 sm:size-12"
              animate={
                shouldReduce
                  ? {}
                  : {
                      scale: [1, 1.6, 1],
                      opacity: [0.5, 0, 0.5],
                    }
              }
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            {/* Middle pulse ring */}
            <motion.div
              className="absolute size-7 rounded-full bg-[#F58639]/15 sm:size-8"
              animate={
                shouldReduce
                  ? {}
                  : {
                      scale: [1, 1.4, 1],
                      opacity: [0.4, 0.1, 0.4],
                    }
              }
              transition={{
                duration: 2.5,
                delay: 0.3,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            {/* Center dot — Ausventure orange */}
            <div className="relative size-3.5 rounded-full bg-[#F58639] shadow-[0_0_14px_rgba(245,134,57,0.6)] sm:size-4" />
          </div>

          {/* Location label */}
          <motion.div
            className="flex flex-col gap-0.5"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <span className="text-[13px] font-semibold leading-tight text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)] sm:text-[14px]">
              Lake Pukaki, New Zealand
            </span>
            <span className="font-mono text-[11px] leading-tight text-white/60 sm:text-[12px]">
              44.1750° S, 170.1800° E
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Bottom-left: typewriter text ── */}
      <motion.div
        className="absolute bottom-[8%] left-[4%] max-w-[500px] sm:bottom-[10%] sm:left-[5%]"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p className="font-brand text-[24px] font-bold leading-[1.3] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] sm:text-[32px]">
          {TYPEWRITER_TEXT.slice(0, displayedChars)}
          {showCursor && (
            <span className="ml-[1px] inline-block h-[1em] w-[2px] translate-y-[2px] bg-white" />
          )}
        </p>
      </motion.div>
    </div>
  );
}
