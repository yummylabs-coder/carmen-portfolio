"use client";

import { motion, useReducedMotion } from "framer-motion";

/* Pilgrimz brand */
const TEAL = "#0F888F";
const AMBER = "#E89B24";
const CORAL = "#E84C44";

const smooth = [0.25, 0.1, 0.25, 1] as const;

/* Sonar-style pulse, positioned as a percentage of the map card.
   `filled` draws expanding solid discs (GPS), otherwise expanding rings (glow). */
function Pulse({
  x,
  y,
  color,
  base,
  reduce,
  duration,
  filled,
}: {
  x: string;
  y: string;
  color: string;
  base: number;
  reduce: boolean;
  duration: number;
  filled?: boolean;
}) {
  if (reduce) return null;
  return (
    <div className="absolute" style={{ left: x, top: y }}>
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={
            filled
              ? { width: base, height: base, backgroundColor: color }
              : { width: base, height: base, border: `2px solid ${color}` }
          }
          animate={{ scale: [1, 2.4, 1], opacity: [0.5, 0, 0.5] }}
          transition={{
            duration,
            delay: i * (duration / 2),
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function PilgrimzHeroVisual() {
  const reduce = useReducedMotion() ?? false;

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[360px]"
      style={{ aspectRatio: "393 / 411" }}
      initial={reduce ? false : { opacity: 0, scale: 0.95, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: smooth }}
    >
      {/* Gentle continuous float */}
      <motion.div
        className="relative h-full w-full"
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[26px] border border-black/[0.06] shadow-[0_20px_60px_rgba(28,27,25,0.28)]">
          {/* Base: the real Pilgrimz Map screen */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/pilgrimz/hero-map.png"
            alt="Pilgrimz map screen with a cultural audio guide playing"
            className="h-full w-full object-cover"
          />

          {/* GPS user-location pulse (teal) */}
          <Pulse x="62.6%" y="41.4%" color={TEAL} base={20} reduce={reduce} duration={2.6} filled />

          {/* Sponsored point of interest glow (amber) */}
          <Pulse x="89.3%" y="19.7%" color={AMBER} base={30} reduce={reduce} duration={3} />

          {/* Audio guide pause button pulse (coral) */}
          <Pulse x="86%" y="67.4%" color={CORAL} base={34} reduce={reduce} duration={2.2} />
        </div>
      </motion.div>
    </motion.div>
  );
}
