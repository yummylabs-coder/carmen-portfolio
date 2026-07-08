"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/*
 * One line, the whole challenge: it starts straight and fast,
 * then turns on itself. Draws in on scroll.
 */
export function PilgrimzTangledLine() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion() ?? false;

  const d =
    "M 4 44 L 280 44 C 310 44, 322 38, 344 44 C 362 49, 372 36, 388 40 C 416 47, 428 14, 402 16 C 380 18, 392 52, 424 47 C 448 43, 456 18, 434 21 C 416 24, 428 50, 452 45 C 466 42, 470 30, 458 32 C 449 33.5, 456 44, 468 41";

  return (
    <div ref={ref} className="max-w-[520px]" aria-hidden>
      <svg viewBox="0 0 560 64" fill="none" className="w-full">
        <defs>
          <linearGradient id="tangle-grad" x1="0" y1="0" x2="560" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
            <stop offset="0.55" stopColor="#FFFFFF" stopOpacity="0.55" />
            <stop offset="0.82" stopColor="#FDA29B" stopOpacity="0.8" />
            <stop offset="1" stopColor="#F87171" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <motion.path
          d={d}
          transform="translate(0 -6)"
          stroke="url(#tangle-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
