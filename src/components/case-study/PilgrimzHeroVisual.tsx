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

/* Small floating UI satellite — white card, pops in after the phone lands */
function Satellite({
  className = "",
  innerClassName = "flex items-center gap-2 px-3 py-2",
  delay,
  floatDur,
  reduce,
  children,
}: {
  className?: string;
  innerClassName?: string;
  delay: number;
  floatDur: number;
  reduce: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={`absolute z-10 ${className}`}
      initial={reduce ? false : { opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: smooth }}
    >
      <motion.div
        className={`rounded-xl border bg-white ${innerClassName}`}
        style={{
          borderColor: "#E8E6E1",
          boxShadow: "0 0 1px rgba(28,27,25,0.08), 0 12px 32px rgba(14,53,56,0.30)",
        }}
        animate={reduce ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: floatDur, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* Tiny equalizer — three bars breathing while the guide plays */
function EqBars({ reduce }: { reduce: boolean }) {
  return (
    <span className="flex h-3.5 items-end gap-[2px]">
      {[0.9, 0.55, 0.75].map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full"
          style={{ backgroundColor: CORAL, height: `${h * 100}%` }}
          animate={reduce ? undefined : { scaleY: [1, 0.4, 1] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.22,
          }}
        />
      ))}
    </span>
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
      {/* Background depth: soft bloom + faint topographic contours */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 45%, transparent 70%)",
        }}
      />
      <motion.svg
        viewBox="0 0 400 400"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[190%] w-[190%] -translate-x-1/2 -translate-y-1/2"
        fill="none"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
      >
        {[
          "M200 84c66 0 118 40 122 96s-34 118-104 126S82 274 74 210 110 84 200 84Z",
          "M200 44c92 0 156 62 162 138s-52 158-146 168S46 300 38 210 84 44 200 44Z",
          "M200 4c118 0 194 84 200 178s-70 198-186 210S10 326 2 214 50 4 200 4Z",
        ].map((d, i) => (
          <path key={i} d={d} stroke="white" strokeOpacity={0.06 - i * 0.015} strokeWidth="1.5" />
        ))}
      </motion.svg>

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

        {/* UI satellites — small real-product moments orbiting the screen */}
        <Satellite
          className="-left-9 top-[8%] sm:-left-14"
          innerClassName="p-[3px]"
          delay={0.9}
          floatDur={5.2}
          reduce={reduce}
        >
          <div className="relative h-[100px] w-[100px] overflow-hidden rounded-[10px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/pilgrimz/hero-photo-square.avif"
              alt="A stop along a Pilgrimz cultural walking tour"
              className="h-full w-full scale-[1.25] object-cover"
            />
            <span
              className="absolute left-1.5 top-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{ backgroundColor: "#FDEBCC", color: "#8A5B10" }}
            >
              Hidden gem
            </span>
          </div>
        </Satellite>

        <Satellite className="-right-6 top-[58%] sm:-right-10" delay={1.15} floatDur={6.1} reduce={reduce}>
          <EqBars reduce={reduce} />
          <span className="whitespace-nowrap text-[12px] font-semibold text-[#1C1B19]">
            Historic deep dive
          </span>
        </Satellite>

        <Satellite className="-left-5 bottom-[8%] sm:-left-9" delay={1.4} floatDur={5.6} reduce={reduce}>
          <span className="flex items-center">
            {["/images/pilgrimz/avatar-1.png", "/images/pilgrimz/avatar-2.png", "/images/pilgrimz/avatar-3.png"].map(
              (src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src}
                  src={src}
                  alt="Pilgrim avatar"
                  className={`h-6 w-6 rounded-full border-2 border-white object-cover ${i > 0 ? "-ml-2" : ""}`}
                />
              ),
            )}
          </span>
          <span className="whitespace-nowrap text-[12px] font-semibold text-[#1C1B19]">
            on this tour
          </span>
        </Satellite>
      </motion.div>
    </motion.div>
  );
}
