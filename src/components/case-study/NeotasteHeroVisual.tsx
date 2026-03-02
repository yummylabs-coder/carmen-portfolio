"use client";

import { motion } from "framer-motion";

/* ─── Chip data (positions from Figma, converted to %) ─── */
/* Figma frame: 395 × 564 */
const CHIPS = [
  { emoji: "🤤", text: "Because you like cafes", top: 89, left: 30 },
  { emoji: "❤️", text: "Based on your saved places", top: 205, left: 152 },
  { emoji: "%", text: "Offer available to rebook", top: 385, left: 39 },
] as const;

/* ─── Lightning sparkle positions (from Figma) ─── */
const SPARKLES = [
  { top: 125, left: 264, delay: 0 },
  { top: 477, left: 117, delay: 0.3 },
  { top: 52 + 508 * 0.2362, left: -56 + 507 * 0.2209, delay: 0.55 }, // inside rings area
] as const;

/**
 * Animated hero visual for the Neotaste case study.
 * Uses actual Figma design assets with animation overlays.
 *
 * Layers (back → front):
 *  1. Sonar ripple glow (expand & fade)
 *  2. Rings — outer dark ellipse + inner green ellipse (Figma SVGs)
 *  3. Glowing center orb with Figma lightning bolt
 *  4. Frosted-glass recommendation chips (float in + drift)
 *  5. Lightning-bolt sparkles (twinkle)
 */
export function NeotasteHeroVisual() {
  return (
    <div
      className="relative mx-auto w-full max-w-[395px] overflow-hidden rounded-[20px] bg-[#0a2817]"
      style={{ aspectRatio: "395/564" }}
    >
      {/* ── 1. Sonar ripple glow ── */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`ripple-${i}`}
          className="pointer-events-none absolute size-[80px] rounded-full"
          style={{
            left: "calc(-56px + 253.5px)",
            top: "calc(52px + 254px)",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(41, 247, 124, 0.12) 0%, rgba(41, 247, 124, 0.04) 50%, transparent 70%)",
          }}
          animate={{ scale: [0.5, 6], opacity: [0.8, 0] }}
          transition={{
            duration: 5.5,
            delay: i * 1.8,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* ── 2. Rings from Figma (outer dark + inner green ellipses) ── */}
      <div
        className="pointer-events-none absolute"
        style={{ width: 507, height: 508, left: -56, top: 52 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/neotaste/rings-outer.svg"
          alt=""
          className="absolute inset-0 size-full"
        />
        {/* Inner green ellipse — positioned per Figma inset */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/neotaste/rings-inner.svg"
          alt=""
          className="absolute"
          style={{
            top: "21.28%",
            left: "20.59%",
            right: "22.35%",
            bottom: "21.66%",
          }}
        />
      </div>

      {/* ── 3. Glowing center orb (from Figma: 174px, positioned at left:107 top:219) ── */}
      <motion.div
        className="absolute flex items-center justify-center rounded-[100px]"
        style={{
          width: 174,
          height: 174,
          left: 107,
          top: 219,
          backgroundImage:
            "linear-gradient(-13.05deg, rgb(28, 246, 116) 8.28%, rgb(86, 250, 152) 87.32%)",
          border: "11px solid rgba(41, 247, 124, 0.91)",
          boxShadow:
            "0 0 27.3px #2a8150, inset -1px -6px 4.1px #82ffb4, inset 3px 6px 6.3px #27b560",
        }}
        animate={{
          boxShadow: [
            "0 0 27.3px #2a8150, inset -1px -6px 4.1px #82ffb4, inset 3px 6px 6.3px #27b560",
            "0 0 50px #2a8150, 0 0 80px #2a815050, inset -1px -6px 4.1px #82ffb4, inset 3px 6px 6.3px #27b560",
            "0 0 27.3px #2a8150, inset -1px -6px 4.1px #82ffb4, inset 3px 6px 6.3px #27b560",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Figma lightning bolt SVG */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/neotaste/lightning-bolt.svg"
          alt=""
          style={{ width: 118, height: 117 }}
        />
      </motion.div>

      {/* ── 4. Floating recommendation chips (Figma positions) ── */}
      {CHIPS.map((chip, i) => (
        <motion.div
          key={chip.text}
          className="absolute"
          style={{ top: chip.top, left: chip.left }}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.8 + i * 0.3,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          <div
            className="neo-float flex items-center gap-[8px] rounded-full bg-white/60 px-[11px] py-[11px] backdrop-blur-[13px]"
            style={{
              animationDelay: `${1.5 + i * 0.7}s`,
              animationDuration: `${3.5 + i * 0.5}s`,
            }}
          >
            <span className="text-[13.5px] leading-none">{chip.emoji}</span>
            <span className="whitespace-nowrap text-[12.4px] font-medium leading-none text-[#1c1d28]">
              {chip.text}
            </span>
          </div>
        </motion.div>
      ))}

      {/* ── 5. Lightning sparkles (Figma positions) ── */}
      {SPARKLES.map((s, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute text-[24px]"
          style={{ top: s.top, left: s.left, rotate: "-1.99deg" }}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{
            opacity: [0, 1, 0.6, 1],
            scale: [0.3, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 3,
            delay: 1.5 + s.delay,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
        >
          ⚡️
        </motion.span>
      ))}
    </div>
  );
}
