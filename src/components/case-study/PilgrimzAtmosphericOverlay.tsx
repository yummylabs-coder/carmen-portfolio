"use client";

import { motion, useReducedMotion } from "framer-motion";

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

      {/* Tour card — top right, hidden on small screens. Matches the real Pilgrimz tour card. */}
      <motion.div
        className="absolute right-[4%] top-[10%] hidden w-[264px] sm:block"
        initial={reduce ? false : { opacity: 0, y: -30, rotate: 3 }}
        whileInView={{ opacity: 1, y: 0, rotate: 2.5 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [5, -5, 5] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          className="overflow-hidden rounded-3xl bg-[#FFFDFB] shadow-2xl"
        >
          {/* Image: Galerie Vivienne, one of the covered passages */}
          <div className="relative h-[136px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/pilgrimz/galerie-vivienne.jpg"
              alt="Inside Galerie Vivienne, a glass-roofed covered passage in Paris"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span
              className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold"
              style={{ backgroundColor: "#FDEBCC", color: "#8A5B10" }}
            >
              Hidden gem
            </span>
            <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#807D76" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </span>
          </div>
          <div className="p-4">
            <div className="font-brand text-[16px] font-bold leading-snug text-[#1C1B19]">
              The covered passages of Paris
            </div>
            <div className="mt-0.5 text-[12px] font-semibold text-[#807D76]">
              Tour · 5 stops · 40 min
            </div>
            <p className="mt-2 text-[12px] leading-relaxed text-[#52504A]">
              Slip through the glass-roofed arcades of the 1800s, from Passage des Panoramas to
              Galerie Vivienne.
            </p>
            <div className="mt-3 flex items-center gap-2.5 border-t border-[#F0EDE8] pt-3">
              <div className="flex">
                {[
                  { initial: "C", bg: "#C2E5E7", color: "#0A5C61" },
                  { initial: "J", bg: "#FDCFCC", color: "#9B2B25" },
                  { initial: "M", bg: "#FDEBCC", color: "#8A5B10" },
                ].map((a, i) => (
                  <span
                    key={a.initial}
                    className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#FFFDFB] text-[10px] font-bold ${
                      i > 0 ? "-ml-1.5" : ""
                    }`}
                    style={{ backgroundColor: a.bg, color: a.color }}
                  >
                    {a.initial}
                  </span>
                ))}
              </div>
              <span className="text-[11px] text-[#807D76]">34 pilgrims walked this</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
