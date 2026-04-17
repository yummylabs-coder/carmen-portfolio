"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const smooth = [0.25, 0.1, 0.25, 1] as const;

/**
 * Animated hero visual for the Ausventure case study.
 * A detailed compass inspired by real compass UI — with tick marks,
 * cardinal directions, and a red north marker.
 *
 * Animation sequence:
 *  1. Compass fades in, needle rotates (searching)
 *  2. "Locating..." text appears
 *  3. Needle settles, text fades
 *  4. Destination chips fly in with photo thumbnails
 */

const DESTINATIONS = [
  {
    text: "Great Barrier Reef",
    image: "/images/ausventure/great-barrier-reef.avif",
    top: "8%",
    left: "4%",
    delay: 0,
  },
  {
    text: "Blue Mountains",
    image: "/images/ausventure/blue-mountains.avif",
    top: "38%",
    left: "55%",
    delay: 0.3,
  },
  {
    text: "Milford Sound",
    image: "/images/ausventure/milford-sound.avif",
    top: "75%",
    left: "8%",
    delay: 0.6,
  },
] as const;

/** Generate tick marks around the compass */
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
        stroke="#333"
        strokeWidth={width}
        opacity={isCardinal ? 0.9 : isMajor ? 0.5 : 0.25}
      />
    );
  }
  return <>{ticks}</>;
}

export function AusventureHeroVisual() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[380px]"
      style={{ aspectRatio: "380/520" }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: smooth }}
    >
      {/* ── Compass ── */}
      <motion.div
        className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: smooth }}
      >
        <svg
          width="220"
          height="220"
          viewBox="0 0 220 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Outer circle */}
          <circle cx="110" cy="110" r="100" stroke="#ccc" strokeWidth="1" opacity="0.6" />

          {/* Tick marks */}
          <CompassTicks />

          {/* Inner circle */}
          <circle cx="110" cy="110" r="78" stroke="#ddd" strokeWidth="0.8" opacity="0.4" />

          {/* Center glow */}
          <circle cx="110" cy="110" r="30" fill="url(#centerGlow)" opacity="0.25" />

          {/* Crosshair */}
          <line x1="110" y1="85" x2="110" y2="135" stroke="#333" strokeWidth="0.6" opacity="0.3" />
          <line x1="85" y1="110" x2="135" y2="110" stroke="#333" strokeWidth="0.6" opacity="0.3" />

          {/* Cardinal directions */}
          <text x="110" y="28" textAnchor="middle" fill="#1a1a1a" fontSize="15" fontWeight="800" fontFamily="'Archivo', system-ui">N</text>
          <text x="110" y="205" textAnchor="middle" fill="#888" fontSize="13" fontWeight="600" fontFamily="'Archivo', system-ui">S</text>
          <text x="16" y="115" textAnchor="middle" fill="#888" fontSize="13" fontWeight="600" fontFamily="'Archivo', system-ui">W</text>
          <text x="204" y="115" textAnchor="middle" fill="#888" fontSize="13" fontWeight="600" fontFamily="'Archivo', system-ui">E</text>

          {/* Red north marker (triangle above N) */}
          <polygon points="110,5 105,14 115,14" fill="#E8543E" />

          {/* Black line above N marker */}
          <line x1="110" y1="0" x2="110" y2="5" stroke="#1a1a1a" strokeWidth="3" />

          {/* Center dot */}
          <circle cx="110" cy="110" r="3.5" fill="#1a1a1a" />
          <circle cx="110" cy="110" r="1.5" fill="white" />

          <defs>
            <radialGradient id="centerGlow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#ccc" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ccc" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        {/* Rotating needle overlay */}
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
            {/* North needle (red/orange) */}
            <polygon points="30,6 26,28 34,28" fill="#E8543E" />
            {/* South needle (light grey) */}
            <polygon points="30,54 26,32 34,32" fill="#ccc" />
            {/* Center ring */}
            <circle cx="30" cy="30" r="5" fill="white" stroke="#333" strokeWidth="1.5" />
            <circle cx="30" cy="30" r="2" fill="#333" />
          </svg>
        </motion.div>
      </motion.div>

      {/* ── "Locating..." text ── */}
      <motion.p
        className="absolute left-1/2 -translate-x-1/2 text-center font-brand text-[16px] font-medium tracking-wide text-white/70"
        style={{ top: "72%" }}
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
        Locating…
      </motion.p>

      {/* ── Destination chips with photo thumbnails ── */}
      {DESTINATIONS.map((dest, i) => (
        <motion.div
          key={dest.text}
          className="absolute"
          style={{ top: dest.top, left: dest.left }}
          initial={{ opacity: 0, y: 30, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.7,
            delay: shouldReduce ? 0.3 + i * 0.15 : 4.2 + dest.delay,
            ease: smooth,
          }}
        >
          <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-[#19323A]/75 py-1.5 pl-1.5 pr-4 backdrop-blur-lg">
            {/* Photo thumbnail */}
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
            {/* Label */}
            <span className="whitespace-nowrap text-[13px] font-semibold leading-none text-[#F2E9DA]">
              {dest.text}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
