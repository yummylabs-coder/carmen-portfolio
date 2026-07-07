"use client";

import { motion, useReducedMotion } from "framer-motion";

/* Pilgrimz brand */
const TEAL = "#0F888F";
const CORAL = "#E84C44";

const smooth = [0.25, 0.1, 0.25, 1] as const;

/*
 * Anchors children centered on a point of the map, as percentages of the card.
 * Centering lives on this wrapper (not on the animated spans), because
 * framer-motion's scale animation replaces the transform and would otherwise
 * cancel the -translate-x/y-1/2 and drift the rings off their targets.
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

/* GPS location: sonar. Discrete rings expand outward and fade, like a radar locating you. */
function GpsSonar() {
  return (
    <>
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-full"
          style={{ border: `2px solid ${TEAL}` }}
          animate={{ scale: [1, 2.8], opacity: [0.55, 0] }}
          transition={{
            duration: 2.4,
            delay: i * 1.2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
}

/* Audio playing: a soft breathing glow hugging the button, like sound filling the room.
   No expanding rings here, this is a different interaction from locating. */
function PlayingGlow() {
  return (
    <>
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: CORAL, filter: "blur(10px)" }}
        animate={{ scale: [1, 1.22, 1], opacity: [0.22, 0.4, 0.22] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ border: `1.5px solid ${CORAL}` }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.12, 0.35] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
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
              {/* GPS user location: sonar rings */}
              <CenterAnchor x="62.9%" y="41.2%" size={18}>
                <GpsSonar />
              </CenterAnchor>

              {/* Audio guide pause button: breathing playback glow */}
              <CenterAnchor x="87.3%" y="69%" size={42}>
                <PlayingGlow />
              </CenterAnchor>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
