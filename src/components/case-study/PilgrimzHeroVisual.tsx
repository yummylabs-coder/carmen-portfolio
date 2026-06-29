"use client";

import { motion, useReducedMotion } from "framer-motion";

/* Pilgrimz brand */
const CORAL = "#E84C44";
const TEAL = "#0F888F";
const AMBER = "#E89B24";
const PAPER = "#FAF9F7";
const PAPER_2 = "#F3F2EF";
const LINE = "#E8E6E1";

const smooth = [0.25, 0.1, 0.25, 1] as const;

/* Now-playing audio guide chip with an animated teal waveform */
function AudioChip({ reduce }: { reduce: boolean }) {
  const bars = [10, 18, 13, 22, 16, 9];
  return (
    <motion.div
      className="absolute left-3 top-3 z-20 flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/85 px-3 py-2 shadow-[0_8px_32px_rgba(28,27,25,0.12)] backdrop-blur-md"
      initial={reduce ? false : { opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 1.1, ease: smooth }}
    >
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: CORAL }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
          <polygon points="8,5 20,12 8,19" />
        </svg>
      </span>
      <div className="flex flex-col gap-1">
        <span className="font-brand text-[10px] font-semibold leading-none text-[#33312D]">
          Cultural audio guide
        </span>
        <div className="flex items-end gap-[2px]">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              className="w-[2px] rounded-full"
              style={{ backgroundColor: TEAL, height: h, transformOrigin: "bottom" }}
              animate={
                reduce ? undefined : { scaleY: [1, 0.45, 1.15, 0.7, 1] }
              }
              transition={{
                duration: 1.4 + i * 0.12,
                delay: 1.6 + i * 0.06,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* A point-of-interest marker */
function Marker({
  x,
  y,
  color,
  delay,
  reduce,
  ring,
  active,
}: {
  x: string;
  y: string;
  color: string;
  delay: number;
  reduce: boolean;
  ring?: boolean;
  active?: boolean;
}) {
  return (
    <motion.div
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y }}
      initial={reduce ? false : { opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: smooth }}
    >
      {/* Featured ring + glow */}
      {ring && (
        <span
          className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ border: `2px solid ${color}59`, boxShadow: `0 0 16px ${color}66` }}
        />
      )}
      {/* Pulse rings for the active play marker */}
      {active && !reduce && (
        <>
          <motion.span
            className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: color }}
            animate={{ scale: [1, 2.2, 1], opacity: [0.45, 0, 0.45] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: color }}
            animate={{ scale: [1, 1.8, 1], opacity: [0.35, 0, 0.35] }}
            transition={{ duration: 2.4, delay: 0.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
      {active ? (
        <span
          className="relative flex h-6 w-6 items-center justify-center rounded-full shadow-[0_4px_12px_rgba(232,76,68,0.45)]"
          style={{ backgroundColor: color }}
        >
          <svg width="9" height="9" viewBox="0 0 24 24" fill="white">
            <polygon points="8,5 20,12 8,19" />
          </svg>
        </span>
      ) : (
        <span
          className="relative block h-3.5 w-3.5 rounded-full border-2 border-white"
          style={{ backgroundColor: color, boxShadow: "0 2px 6px rgba(28,27,25,0.25)" }}
        />
      )}
    </motion.div>
  );
}

export function PilgrimzHeroVisual() {
  const reduce = useReducedMotion() ?? false;

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[340px]"
      style={{ aspectRatio: "340 / 460" }}
      initial={reduce ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: smooth }}
    >
      {/* Map card */}
      <div
        className="relative h-full w-full overflow-hidden rounded-[24px] border border-[#E8E6E1] shadow-[0_16px_48px_rgba(28,27,25,0.18)]"
        style={{ background: `linear-gradient(160deg, ${PAPER} 0%, ${PAPER_2} 100%)` }}
      >
        {/* Abstract map base */}
        <svg
          viewBox="0 0 340 460"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Park / green space (faint teal) */}
          <rect x="196" y="40" width="150" height="130" rx="18" fill={`${TEAL}0F`} />
          {/* Water (faint) */}
          <path d="M-10 360 C 80 330, 140 400, 250 360 S 360 350, 360 350 L 360 480 L -10 480 Z" fill={`${TEAL}12`} />
          {/* Streets */}
          <g stroke={LINE} strokeWidth="10" strokeLinecap="round">
            <line x1="20" y1="120" x2="320" y2="150" />
            <line x1="40" y1="250" x2="330" y2="230" />
            <line x1="90" y1="-10" x2="140" y2="470" />
            <line x1="230" y1="-10" x2="270" y2="470" />
          </g>
          <g stroke="#EFEEEA" strokeWidth="5" strokeLinecap="round">
            <line x1="0" y1="320" x2="340" y2="300" />
            <line x1="160" y1="0" x2="190" y2="460" />
          </g>

          {/* GPS route */}
          <motion.path
            d="M70 410 C 70 330, 150 320, 150 250 S 250 190, 250 120 S 210 70, 270 70"
            fill="none"
            stroke={TEAL}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="2 9"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.4, ease: "easeInOut" }}
          />
        </svg>

        {/* Audio guide chip */}
        <AudioChip reduce={reduce} />

        {/* POI markers */}
        <Marker x="79%" y="15%" color={AMBER} delay={1.6} reduce={reduce} ring />
        <Marker x="44%" y="54%" color={CORAL} delay={2.0} reduce={reduce} active />
        <Marker x="74%" y="44%" color={TEAL} delay={2.2} reduce={reduce} />
        <Marker x="21%" y="89%" color={TEAL} delay={2.3} reduce={reduce} />

        {/* Featured label */}
        <motion.span
          className="absolute right-3 top-[19%] z-20 rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.05em]"
          style={{ backgroundColor: `${AMBER}1F`, color: "#996310" }}
          initial={reduce ? false : { opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 2.0, ease: smooth }}
        >
          Featured
        </motion.span>
      </div>
    </motion.div>
  );
}
