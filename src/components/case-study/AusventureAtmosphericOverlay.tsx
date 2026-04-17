"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const TYPEWRITER_TEXT = "3,500+ Experiences & Campers in New Zealand and Australia";

/**
 * Atmospheric overlay for Ausventure — a typewriter effect
 * in the bottom-left that types out the key stat.
 */
export function AusventureAtmosphericOverlay() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduce = useReducedMotion();
  const [displayedChars, setDisplayedChars] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Typewriter effect — type one character at a time
  useEffect(() => {
    if (!isInView) return;

    if (shouldReduce) {
      // Show full text immediately for reduced motion
      setDisplayedChars(TYPEWRITER_TEXT.length);
      return;
    }

    if (displayedChars >= TYPEWRITER_TEXT.length) {
      // Done typing — blink cursor a few times then hide
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
      {/* Bottom-left typewriter text */}
      <motion.div
        className="absolute bottom-[8%] left-[4%] max-w-[500px] sm:bottom-[10%] sm:left-[5%]"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p
          className="font-brand text-[24px] font-bold leading-[1.3] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] sm:text-[32px]"
        >
          {TYPEWRITER_TEXT.slice(0, displayedChars)}
          {displayedChars < TYPEWRITER_TEXT.length && showCursor && (
            <span className="ml-[1px] inline-block h-[1em] w-[2px] translate-y-[2px] bg-white" />
          )}
          {displayedChars >= TYPEWRITER_TEXT.length && showCursor && (
            <span className="ml-[1px] inline-block h-[1em] w-[2px] translate-y-[2px] bg-white" />
          )}
        </p>
      </motion.div>
    </div>
  );
}
