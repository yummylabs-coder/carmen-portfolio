"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const smooth = [0.25, 0.1, 0.25, 1] as const;

/**
 * Ausventure hero — compass centered with destination badges
 * floating at the corners, slightly overlapping the ring.
 * "Locating..." sits directly below the compass.
 */

const DESTINATIONS = [
  {
    text: "Great Barrier Reef",
    image: "/images/ausventure/great-barrier-reef.avif",
    // Top-right corner of compass
    style: { top: "-8%", right: "-35%" },
    floatY: [-3, 3, -3] as number[],
    floatDuration: 4.5,
    delay: 0,
  },
  {
    text: "Blue Mountains",
    image: "/images/ausventure/blue-mountains.avif",
    // Middle-right, slightly outside
    style: { top: "38%", right: "-42%" },
    floatY: [-4, 4, -4] as number[],
    floatDuration: 5.2,
    delay: 0.3,
  },
  {
    text: "Milford Sound",
    image: "/images/ausventure/milford-sound.avif",
    // Bottom-left corner of compass
    style: { bottom: "2%", left: "-30%" },
    floatY: [-3, 3, -3] as number[],
    floatDuration: 4.8,
    delay: 0.6,
  },
];

/** Generate tick marks — all off-white */
function CompassTicks() {
  const ticks = [];
  for (let deg = 0; deg < 360; deg += 6) {
    const isMajor = deg % 30 === 0;
    const isCardinal = deg % 90 === 0;
    const len = isCardinal ? 14 : isMajor ? 10 : 5;
    const width = isCardinal ? 2.5 : isMajor ? 1.5 : 0.8;
    const r1 = 96;
    const r2 = r1 - len;
    const rad = (deg * Math.PI) / 180;
    ticks.push(
      <line
        key={deg}
        x1={110 + r1 * Math.sin(rad)}
        y1={110 - r1 * Math.cos(rad)}
        x2={110 + r2 * Math.sin(rad)}
        y2={110 - r2 * Math.cos(rad)}
        stroke="#F2E9DA"
        strokeWidth={width}
        opacity={isCardinal ? 0.9 : isMajor ? 0.45 : 0.2}
      />
    );
  }
  return <>{ticks}</>;
}

export function AusventureHeroVisual() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto flex w-full max-w-[380px] flex-col items-center justify-center"
      style={{ minHeight: 420 }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: smooth }}
    >
      {/* ── Compass wrapper — badges positioned relative to this ── */}
      <div className="relative">
        {/* Compass SVG — slightly bigger */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: smooth }}
        >
          <svg
            width="240"
            height="240"
            viewBox="-20 -20 260 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="110" cy="110" r="100" stroke="#F2E9DA" strokeWidth="1" opacity="0.35" />
            <CompassTicks />
            <circle cx="110" cy="110" r="78" stroke="#F2E9DA" strokeWidth="0.8" opacity="0.2" />
            <circle cx="110" cy="110" r="30" fill="url(#centerGlow)" opacity="0.15" />
            <line x1="110" y1="85" x2="110" y2="135" stroke="#F2E9DA" strokeWidth="0.6" opacity="0.2" />
            <line x1="85" y1="110" x2="135" y2="110" stroke="#F2E9DA" strokeWidth="0.6" opacity="0.2" />
            {/* Cardinal directions — outside ring */}
            <text x="110" y="-6" textAnchor="middle" fill="#F2E9DA" fontSize="14" fontWeight="800" fontFamily="'Archivo', system-ui">N</text>
            <text x="110" y="234" textAnchor="middle" fill="#F2E9DA" fontSize="12" fontWeight="600" fontFamily="'Archivo', system-ui" opacity="0.6">S</text>
            <text x="-10" y="114" textAnchor="middle" fill="#F2E9DA" fontSize="12" fontWeight="600" fontFamily="'Archivo', system-ui" opacity="0.6">W</text>
            <text x="230" y="114" textAnchor="middle" fill="#F2E9DA" fontSize="12" fontWeight="600" fontFamily="'Archivo', system-ui" opacity="0.6">E</text>
            <polygon points="110,5 106,13 114,13" fill="#E8543E" />
            <line x1="110" y1="-1" x2="110" y2="5" stroke="#F2E9DA" strokeWidth="2.5" />
            <circle cx="110" cy="110" r="3.5" fill="#F2E9DA" />
            <circle cx="110" cy="110" r="1.5" fill="#19323A" />
            <defs>
              <radialGradient id="centerGlow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#F2E9DA" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#F2E9DA" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>

          {/* Rotating needle */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ rotate: -60 }}
            animate={
              shouldReduce
                ? { rotate: 15 }
                : { rotate: [-60, 300, 660, 735, 735] }
            }
            transition={
              shouldReduce
                ? { duration: 0.6, ease: "easeOut" }
                : {
                    duration: 4,
                    ease: [0.2, 0.6, 0.3, 1],
                    times: [0, 0.3, 0.65, 0.9, 1],
                  }
            }
          >
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" aria-hidden="true">
              <polygon points="30,6 26,28 34,28" fill="#E8543E" />
              <polygon points="30,54 26,32 34,32" fill="#F2E9DA" opacity="0.5" />
              <circle cx="30" cy="30" r="5" fill="#F2E9DA" stroke="#F2E9DA" strokeWidth="1" opacity="0.9" />
              <circle cx="30" cy="30" r="2" fill="#19323A" />
            </svg>
          </motion.div>
        </motion.div>

        {/* ── Destination badges — absolutely positioned at compass corners ── */}
        {DESTINATIONS.map((dest, i) => (
          <motion.div
            key={dest.text}
            className="absolute z-10"
            style={dest.style}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: shouldReduce ? 0.3 + i * 0.15 : 4.2 + dest.delay,
              ease: smooth,
            }}
          >
            <motion.div
              animate={
                shouldReduce
                  ? {}
                  : { y: dest.floatY }
              }
              transition={{
                duration: dest.floatDuration,
                delay: 5 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-[#19323A]/75 py-1.5 pl-1.5 pr-4 backdrop-blur-lg">
                <div className="size-10 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={dest.image}
                    alt={dest.text}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                    sizes="40px"
                  />
                </div>
                <span className="whitespace-nowrap text-[13px] font-semibold leading-none text-[#F2E9DA]">
                  {dest.text}
                </span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* "Locating..." — directly below compass, no gap */}
      <motion.p
        className="mt-2 text-center font-brand text-[15px] font-medium tracking-[0.08em] text-white/50"
        initial={{ opacity: 0 }}
        animate={
          shouldReduce
            ? { opacity: 0 }
            : { opacity: [0, 0, 1, 1, 0] }
        }
        transition={{
          duration: 4.5,
          times: [0, 0.2, 0.35, 0.75, 1],
          ease: "easeInOut",
        }}
      >
        Locating&hellip;
      </motion.p>
    </motion.div>
  );
}
