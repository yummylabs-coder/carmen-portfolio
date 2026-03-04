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
  { top: 477, left: 117, delay: 0.4 },
  { top: 52 + 508 * 0.2362, left: -56 + 507 * 0.2209, delay: 0.7 },
] as const;

/* Smooth spring-like easing */
const smooth = [0.25, 0.1, 0.25, 1] as const;

/**
 * Animated hero visual for the Neotaste case study.
 * Uses actual Figma design assets with smooth animation overlays.
 *
 * Layers (back → front):
 *  1. Soft breathing glow (slow, gentle)
 *  2. Rings — outer dark ellipse + inner green ellipse (Figma SVGs)
 *  3. Glowing center orb with Figma lightning bolt
 *  4. Frosted-glass recommendation chips (float in + gentle drift)
 *  5. Lightning-bolt sparkles (gentle twinkle)
 */
export function NeotasteHeroVisual() {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[395px] overflow-hidden rounded-[20px] bg-[#0a2817]"
      style={{ aspectRatio: "395/564" }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: smooth }}
    >
      {/* ── 1. Soft breathing glow (single, gentle) ── */}
      <motion.div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 280,
          height: 280,
          left: "calc(-56px + 253.5px - 140px)",
          top: "calc(52px + 254px - 140px)",
          background:
            "radial-gradient(circle, rgba(41, 247, 124, 0.08) 0%, rgba(41, 247, 124, 0.02) 60%, transparent 80%)",
        }}
        animate={{
          scale: [1, 1.6, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ── 2. Rings from Figma (outer dark + inner green ellipses) ── */}
      <motion.div
        className="pointer-events-none absolute"
        style={{ width: 507, height: 508, left: -56, top: 52 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: smooth }}
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
      </motion.div>

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
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{
          opacity: 1,
          scale: 1,
          boxShadow: [
            "0 0 27.3px #2a8150, inset -1px -6px 4.1px #82ffb4, inset 3px 6px 6.3px #27b560",
            "0 0 45px #2a8150, 0 0 70px #2a815040, inset -1px -6px 4.1px #82ffb4, inset 3px 6px 6.3px #27b560",
            "0 0 27.3px #2a8150, inset -1px -6px 4.1px #82ffb4, inset 3px 6px 6.3px #27b560",
          ],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.4, ease: "easeOut" },
          scale: { duration: 0.8, delay: 0.4, ease: smooth },
          boxShadow: { duration: 4, delay: 1.5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {/* Inline SVG — avoids blurry filter rasterisation via <img> on retina */}
        <svg width="118" height="120" viewBox="0 0 118 119.55" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <g filter="url(#neo_d)">
            <g filter="url(#neo_ii)">
              <path d="M63.9167 9.75L20.1262 61.8533C18.4112 63.8938 17.5537 64.9141 17.5406 65.7757C17.5292 66.5248 17.8658 67.2375 18.4535 67.7084C19.1295 68.25 20.469 68.25 23.1478 68.25H59L54.0833 107.25L97.8738 55.1467C99.5888 53.1062 100.446 52.0859 100.459 51.2243C100.471 50.4752 100.134 49.7625 99.5465 49.2916C98.8705 48.75 97.531 48.75 94.8522 48.75H59L63.9167 9.75Z" fill="#FFE645"/>
            </g>
            <path d="M63.9167 9.75L20.1262 61.8533C18.4112 63.8938 17.5537 64.9141 17.5406 65.7757C17.5292 66.5248 17.8658 67.2375 18.4535 67.7084C19.1295 68.25 20.469 68.25 23.1478 68.25H59L54.0833 107.25L97.8738 55.1467C99.5888 53.1062 100.446 52.0859 100.459 51.2243C100.471 50.4752 100.134 49.7625 99.5465 49.2916C98.8705 48.75 97.531 48.75 94.8522 48.75H59L63.9167 9.75Z" stroke="#0A2817" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <defs>
            <filter id="neo_d" x="-6.3" y="-2.3" width="130.6" height="129.6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="4"/>
              <feGaussianBlur stdDeviation="3.15"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.0369348 0 0 0 0 0.202148 0 0 0 0 0.103218 0 0 0 1 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
            <filter id="neo_ii" x="15.5403" y="7.74989" width="87.9194" height="106.5" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="7"/>
              <feGaussianBlur stdDeviation="2.5"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.792157 0 0 0 0 0.701961 0 0 0 0 0.109804 0 0 0 1 0"/>
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="1" dy="7"/>
              <feGaussianBlur stdDeviation="1.85"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.793194 0 0 0 0 0.701508 0 0 0 0 0.111051 0 0 0 1 0"/>
              <feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow"/>
            </filter>
          </defs>
        </svg>
      </motion.div>

      {/* ── 4. Floating recommendation chips (Figma positions) ── */}
      {CHIPS.map((chip, i) => (
        <motion.div
          key={chip.text}
          className="absolute"
          style={{ top: chip.top, left: chip.left }}
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 1.0 + i * 0.25,
            ease: smooth,
          }}
        >
          <motion.div
            className="flex items-center gap-[8px] rounded-full bg-white/60 px-[11px] py-[11px] backdrop-blur-[13px]"
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 3.5 + i * 0.5,
              delay: 2.0 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="text-[13.5px] leading-none">{chip.emoji}</span>
            <span className="whitespace-nowrap text-[12.4px] font-medium leading-none text-[#1c1d28]">
              {chip.text}
            </span>
          </motion.div>
        </motion.div>
      ))}

      {/* ── 5. Lightning sparkles (Figma positions) — gentle twinkle ── */}
      {SPARKLES.map((s, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute text-[24px]"
          style={{ top: s.top, left: s.left, rotate: "-1.99deg" }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 0.8, 0.4, 0.8, 0],
            scale: [0.5, 1, 0.95, 1, 0.5],
          }}
          transition={{
            duration: 4,
            delay: 1.8 + s.delay,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        >
          ⚡️
        </motion.span>
      ))}
    </motion.div>
  );
}
