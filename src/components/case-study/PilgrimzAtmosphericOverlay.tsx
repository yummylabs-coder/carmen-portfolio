"use client";

import { motion, useReducedMotion } from "framer-motion";

const AMBER = "#E89B24";

/*
 * Floating Pilgrimz components over the atmospheric image.
 * Card 1: the real mini audio player exported from the design system.
 * Card 2: a tour card (placeholder image area, swaps for a real tour photo later).
 */
export function PilgrimzAtmosphericOverlay() {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="relative h-full w-full max-w-5xl">
      {/* Audio guide player — bottom left */}
      <motion.div
        className="absolute bottom-[16%] left-[4%] w-[300px] max-w-[78vw] sm:w-[340px]"
        initial={reduce ? false : { opacity: 0, y: 40, rotate: -3 }}
        whileInView={{ opacity: 1, y: 0, rotate: -2 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [-5, 5, -5] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="drop-shadow-2xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/pilgrimz/hero-audio.png"
            alt="Pilgrimz cultural audio guide player"
            className="w-full rounded-2xl"
          />
        </motion.div>
      </motion.div>

      {/* Tour card — top right, hidden on small screens */}
      <motion.div
        className="absolute right-[4%] top-[12%] hidden w-[240px] sm:block"
        initial={reduce ? false : { opacity: 0, y: -30, rotate: 3 }}
        whileInView={{ opacity: 1, y: 0, rotate: 2.5 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [5, -5, 5] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          className="overflow-hidden rounded-2xl bg-white/95 shadow-2xl backdrop-blur-sm"
        >
          {/* Image area — swap for a real tour photo later */}
          <div
            className="relative flex h-[120px] items-end justify-between p-3"
            style={{
              background:
                "linear-gradient(140deg, rgba(15,136,143,0.5) 0%, rgba(232,155,36,0.35) 100%), linear-gradient(#807D76, #52504A)",
            }}
          >
            <span
              className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.05em] text-white"
              style={{ backgroundColor: AMBER }}
            >
              Featured
            </span>
            <span className="rounded-full bg-black/35 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
              12 stops
            </span>
          </div>
          <div className="p-3.5">
            <div className="font-brand text-[14px] font-bold leading-snug text-[#1C1B19]">
              Roman and Moorish Malaga
            </div>
            <div className="mt-1 text-[11px] leading-relaxed text-[#807D76]">
              Walk through 2,000 years of history, from the Roman theatre to the Alcazaba.
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
