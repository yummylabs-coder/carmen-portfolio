"use client";

import { motion, useReducedMotion } from "framer-motion";

const smooth = [0.25, 0.1, 0.25, 1] as const;

/**
 * Animated hero visual for the Ausventure case study.
 * A stylised compass with floating destination chips —
 * warm teal palette matching the Ausventure brand.
 *
 * Layers:
 *  1. Soft teal glow (breathing)
 *  2. Compass ring with cardinal directions
 *  3. Center compass needle (slow rotation)
 *  4. Floating destination chips (staggered entrance + gentle float)
 */

const CHIPS = [
  { text: "Great Barrier Reef", emoji: "🐠", top: 72, left: 18, delay: 0 },
  { text: "Blue Mountains", emoji: "🏔️", top: 195, left: 210, delay: 0.25 },
  { text: "Milford Sound", emoji: "🛶", top: 390, left: 32, delay: 0.5 },
] as const;

export function AusventureHeroVisual() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[340px]"
      style={{ aspectRatio: "340/480", perspective: "800px" }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: smooth }}
    >
      {/* ── 1. Soft breathing glow ── */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle, rgba(17,96,125,0.12) 0%, rgba(138,181,179,0.06) 50%, transparent 80%)",
        }}
        animate={
          shouldReduce
            ? {}
            : {
                scale: [1, 1.4, 1],
                opacity: [0.5, 0.9, 0.5],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ── 2. Compass ring ── */}
      <motion.div
        className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: smooth }}
      >
        <svg
          width="220"
          height="220"
          viewBox="0 0 220 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Outer ring */}
          <circle
            cx="110"
            cy="110"
            r="105"
            stroke="#8AB5B3"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            opacity="0.5"
          />
          {/* Inner ring */}
          <circle
            cx="110"
            cy="110"
            r="80"
            stroke="#11607D"
            strokeWidth="2"
            opacity="0.4"
          />
          {/* Cardinal directions */}
          <text x="110" y="22" textAnchor="middle" fill="#F2E9DA" fontSize="13" fontWeight="700" fontFamily="system-ui">N</text>
          <text x="110" y="210" textAnchor="middle" fill="#8AB5B3" fontSize="11" fontWeight="500" fontFamily="system-ui" opacity="0.7">S</text>
          <text x="12" y="114" textAnchor="middle" fill="#8AB5B3" fontSize="11" fontWeight="500" fontFamily="system-ui" opacity="0.7">W</text>
          <text x="208" y="114" textAnchor="middle" fill="#8AB5B3" fontSize="11" fontWeight="500" fontFamily="system-ui" opacity="0.7">E</text>
          {/* Tick marks */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 110 + 95 * Math.sin(rad);
            const y1 = 110 - 95 * Math.cos(rad);
            const x2 = 110 + 88 * Math.sin(rad);
            const y2 = 110 - 88 * Math.cos(rad);
            return (
              <line
                key={angle}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#8AB5B3"
                strokeWidth={angle % 90 === 0 ? 2 : 1}
                opacity={angle % 90 === 0 ? 0.7 : 0.4}
              />
            );
          })}
        </svg>
      </motion.div>

      {/* ── 3. Compass needle (slow rotation) ── */}
      <motion.div
        className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, rotate: -30 }}
        animate={
          shouldReduce
            ? { opacity: 1, rotate: 15 }
            : { opacity: 1, rotate: [15, 25, 15] }
        }
        transition={
          shouldReduce
            ? { duration: 0.8, delay: 0.5, ease: "easeOut" }
            : {
                opacity: { duration: 0.6, delay: 0.5, ease: "easeOut" },
                rotate: {
                  duration: 8,
                  delay: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }
        }
      >
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* North (teal) */}
          <polygon points="30,4 24,30 36,30" fill="#11607D" />
          {/* South (sand) */}
          <polygon points="30,56 24,30 36,30" fill="#E8DCC8" opacity="0.7" />
          {/* Center dot */}
          <circle cx="30" cy="30" r="4" fill="#F2E9DA" stroke="#143B39" strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* ── 4. Floating destination chips ── */}
      {CHIPS.map((chip, i) => (
        <motion.div
          key={chip.text}
          className="absolute"
          style={{ top: chip.top, left: chip.left }}
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 1.0 + chip.delay,
            ease: smooth,
          }}
        >
          <motion.div
            className="flex items-center gap-2 rounded-full border border-white/15 bg-[#143B39]/80 px-3 py-2.5 backdrop-blur-md"
            animate={
              shouldReduce
                ? {}
                : { y: [0, -4, 0] }
            }
            transition={{
              duration: 3.5 + i * 0.5,
              delay: 2.0 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="text-[13px] leading-none">{chip.emoji}</span>
            <span className="whitespace-nowrap text-[12px] font-medium leading-none text-[#F2E9DA]">
              {chip.text}
            </span>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}
