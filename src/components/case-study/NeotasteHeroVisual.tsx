"use client";

import { motion } from "framer-motion";

/* ─── Chip data ─── */
const CHIPS = [
  { emoji: "🤤", text: "Because you like cafes", top: "16%", left: "7.5%" },
  { emoji: "❤️", text: "Based on your saved places", top: "37%", left: "38%" },
  { emoji: "%", text: "Offer available to rebook", top: "69%", left: "10%" },
] as const;

/* ─── Sparkle positions ─── */
const SPARKLES = [
  { top: "22%", left: "67%", delay: 0 },
  { top: "85%", left: "30%", delay: 0.3 },
  { top: "9%", left: "42%", delay: 0.55 },
] as const;

/* ─── Static ring sizes (px) ─── */
const RING_SIZES = [190, 280, 380, 490];

/**
 * Animated hero visual for the Neotaste case study.
 *
 * Layers (back → front):
 *  1. Sonar ripple rings (expand & fade)
 *  2. Static concentric rings (subtle breathing)
 *  3. Glowing green orb with lightning bolt
 *  4. Frosted-glass recommendation chips (float in + drift)
 *  5. Lightning-bolt sparkles (twinkle)
 */
export function NeotasteHeroVisual() {
  return (
    <div
      className="relative mx-auto w-full max-w-[395px] overflow-hidden rounded-2xl bg-[#0a2817]"
      style={{ aspectRatio: "7/10" }}
    >
      {/* ── 1. Sonar ripple glow (soft fill, no border) ── */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`ripple-${i}`}
          className="pointer-events-none absolute left-[49%] top-[55%] size-[80px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
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

      {/* ── 2. Static concentric rings (structure only, no animation) ── */}
      {RING_SIZES.map((size, i) => (
        <div
          key={`ring-${i}`}
          className="pointer-events-none absolute left-[49%] top-[55%] rounded-full border"
          style={{
            width: size,
            height: size,
            marginLeft: -size / 2,
            marginTop: -size / 2,
            borderColor: `rgba(41, 247, 124, ${0.07 + i * 0.02})`,
          }}
        />
      ))}

      {/* ── 3. Glowing center orb ── */}
      <motion.div
        className="absolute left-[49%] top-[55%] flex size-[150px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(167deg, #1CF674 8%, #56FA98 87%)",
          border: "10px solid rgba(41, 247, 124, 0.91)",
          boxShadow:
            "0 0 27px #2a8150, 0 0 50px #2a815030, inset -1px -6px 4px #82ffb4, inset 3px 6px 6px #27b560",
        }}
        animate={{
          boxShadow: [
            "0 0 27px #2a8150, 0 0 50px #2a815030, inset -1px -6px 4px #82ffb4, inset 3px 6px 6px #27b560",
            "0 0 44px #2a8150, 0 0 90px #2a815050, inset -1px -6px 4px #82ffb4, inset 3px 6px 6px #27b560",
            "0 0 27px #2a8150, 0 0 50px #2a815030, inset -1px -6px 4px #82ffb4, inset 3px 6px 6px #27b560",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Lightning bolt */}
        <svg width="60" height="70" viewBox="0 0 60 70" fill="none">
          <path
            d="M35 2L7 40h20l-5 28 30-38H32L35 2z"
            fill="#FFD700"
            stroke="#E8A800"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* ── 4. Floating recommendation chips ── */}
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
            className="neo-float flex items-center gap-[6px] rounded-full bg-white/60 px-3 py-[9px] backdrop-blur-[13px]"
            style={{
              animationDelay: `${1.5 + i * 0.7}s`,
              animationDuration: `${3.5 + i * 0.5}s`,
            }}
          >
            <span className="text-[13px] leading-none">{chip.emoji}</span>
            <span className="whitespace-nowrap text-[11px] font-medium leading-none text-[#1c1d28]">
              {chip.text}
            </span>
          </div>
        </motion.div>
      ))}

      {/* ── 5. Lightning sparkles ── */}
      {SPARKLES.map((s, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute text-[20px]"
          style={{ top: s.top, left: s.left }}
          initial={{ opacity: 0, scale: 0.3, rotate: -15 }}
          animate={{
            opacity: [0, 1, 0.6, 1],
            scale: [0.3, 1.1, 0.9, 1],
            rotate: [-15, 5, -3, 0],
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
