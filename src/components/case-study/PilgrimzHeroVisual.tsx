"use client";

import { motion, useReducedMotion } from "framer-motion";

/* Pilgrimz brand */
const TEAL = "#0F888F";
const CORAL = "#E84C44";

const smooth = [0.25, 0.1, 0.25, 1] as const;

/*
 * Anchors children centered on a point of the map, as percentages of the card.
 * Centering lives on this (non-animated) wrapper: framer-motion's scale
 * animation replaces the transform on the spans it animates, so translate
 * centering must never share an element with an animated scale.
 */
function CenterAnchor({
  x,
  y,
  size,
  children,
}: {
  x: string;
  y: string;
  size: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        {children}
      </div>
    </div>
  );
}

/*
 * GPS location: sonar. Each ring is born small and invisible under the dot,
 * fades in as it expands, and fades fully out before looping, so the restart
 * never pops. Two rings offset by half a cycle.
 */
function GpsSonar() {
  return (
    <>
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-full"
          style={{ border: `2px solid ${TEAL}` }}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: [0.7, 2.6], opacity: [0, 0.5, 0] }}
          transition={{
            opacity: { duration: 2.8, times: [0, 0.25, 1], repeat: Infinity, delay: i * 1.4, ease: "easeOut" },
            scale: { duration: 2.8, repeat: Infinity, delay: i * 1.4, ease: "easeOut" },
          }}
        />
      ))}
    </>
  );
}

/*
 * Audio playing: a soft breathing glow hugging the pause button, like sound
 * from a speaker. No rings here (the button art already has a subtle halo),
 * and no expansion, this is a different interaction from locating.
 */
function PlayingGlow() {
  return (
    <motion.span
      className="absolute inset-0 rounded-full"
      style={{ backgroundColor: CORAL, filter: "blur(12px)" }}
      animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.45, 0.25] }}
      transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
    />
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

          {!reduce && (
            <>
              {/* GPS user location: sonar rings (measured center of the teal dot) */}
              <CenterAnchor x="62.5%" y="41.4%" size={16}>
                <GpsSonar />
              </CenterAnchor>

              {/* Audio guide pause button: breathing playback glow (measured center + size) */}
              <CenterAnchor x="87.5%" y="69.3%" size={44}>
                <PlayingGlow />
              </CenterAnchor>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
