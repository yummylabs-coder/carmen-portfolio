"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { LineMask } from "../LineMask";
import { SectionRoom, SectionLabel } from "../SectionRoom";
import { AnimatedCounter } from "../AnimatedCounter";
import { learnRooms, ease, duration } from "@/lib/motion";
import { OUTCOMES } from "./LearnData";

/* ── Chart tokens ───────────────────────────────────────────── */

const GOLD = "#FECB3A";
const TRACK = "rgba(255,255,255,0.10)";

interface ChartProps {
  inView: boolean;
  delay: number;
  reduce: boolean | null;
}

/* ── 20 dots lighting up — one per pilot client ─────────────── */

function DotsChart({ inView, delay, reduce }: ChartProps) {
  return (
    <svg
      viewBox="0 0 130 88"
      fill="none"
      className="mx-auto h-auto w-full max-w-[130px]"
    >
      {Array.from({ length: 20 }).map((_, i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        const op = 0.5 + (i % 3) * 0.25;
        return (
          <motion.circle
            key={i}
            cx={13 + col * 26}
            cy={11 + row * 22}
            r={7.5}
            fill={GOLD}
            initial={reduce ? { scale: 1, opacity: op } : { scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: op } : {}}
            transition={{
              delay: delay + i * 0.03,
              duration: 0.35,
              ease: "backOut",
            }}
          />
        );
      })}
    </svg>
  );
}

/* ── Radial ring filling to 80% ─────────────────────────────── */

function RadialChart({ inView, delay, reduce }: ChartProps) {
  const r = 34;
  const c = 2 * Math.PI * r;
  const fill = c * 0.8;

  return (
    <svg
      viewBox="0 0 88 88"
      fill="none"
      className="mx-auto h-auto w-full max-w-[88px]"
    >
      <circle cx="44" cy="44" r={r} stroke={TRACK} strokeWidth="7" />
      <motion.circle
        cx="44"
        cy="44"
        r={r}
        stroke={GOLD}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={c}
        transform="rotate(-90 44 44)"
        initial={
          reduce
            ? { strokeDashoffset: c - fill }
            : { strokeDashoffset: c }
        }
        animate={inView ? { strokeDashoffset: c - fill } : {}}
        transition={{
          delay: delay + 0.1,
          duration: 1.4,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
      {/* Percentage text in center */}
      <motion.text
        x="44"
        y="48"
        textAnchor="middle"
        fill={GOLD}
        fontSize="16"
        fontWeight="700"
        opacity={0.35}
        initial={reduce ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 0.35 } : {}}
        transition={{ delay: delay + 0.8, duration: 0.5 }}
      >
        80%
      </motion.text>
    </svg>
  );
}

/* ── 7 bars — weekly lesson rhythm ──────────────────────────── */

function BarsChart({ inView, delay, reduce }: ChartProps) {
  const bars = [36, 62, 48, 76, 54, 68, 40];
  const w = 12;
  const g = 5;
  const viewW = bars.length * (w + g) - g + 8;

  return (
    <svg
      viewBox={`0 0 ${viewW} 84`}
      fill="none"
      className="mx-auto h-auto w-full max-w-[127px]"
    >
      {bars.map((h, i) => {
        const op = 0.4 + (h / 76) * 0.6;
        return (
          <motion.rect
            key={i}
            x={4 + i * (w + g)}
            width={w}
            rx={4}
            fill={GOLD}
            initial={
              reduce
                ? { y: 84 - h, height: h, opacity: op }
                : { y: 84, height: 0 }
            }
            animate={inView ? { y: 84 - h, height: h, opacity: op } : {}}
            transition={{
              delay: delay + i * 0.06,
              duration: 0.5,
              ease: "backOut",
            }}
          />
        );
      })}
    </svg>
  );
}

/* ── Rising area chart — exponential lesson creation ─────────── */

function AreaChart({ inView, delay, reduce }: ChartProps) {
  const line = "M4,72 L24,68 L44,58 L64,42 L84,24 L104,10 L124,2";
  const area =
    "M4,72 L24,68 L44,58 L64,42 L84,24 L104,10 L124,2 L124,82 L4,82 Z";

  return (
    <svg
      viewBox="0 0 128 84"
      fill="none"
      className="mx-auto h-auto w-full max-w-[128px]"
    >
      {/* Filled area under the line */}
      <motion.path
        d={area}
        fill={GOLD}
        initial={reduce ? { opacity: 0.12 } : { opacity: 0 }}
        animate={inView ? { opacity: 0.12 } : {}}
        transition={{ delay: delay + 0.3, duration: 0.8 }}
      />
      {/* The line itself */}
      <motion.path
        d={line}
        stroke={GOLD}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{
          delay: delay + 0.1,
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
      {/* Peak dot */}
      <motion.circle
        cx="124"
        cy="2"
        r="4.5"
        fill={GOLD}
        initial={reduce ? { scale: 1 } : { scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: delay + 1.0, duration: 0.3, ease: "backOut" }}
      />
    </svg>
  );
}

/* ── Chart registry ──────────────────────────────────────────── */

const CHARTS = [DotsChart, RadialChart, BarsChart, AreaChart];

/* ── Main section ────────────────────────────────────────────── */

export function LearnOutcomes() {
  const room = learnRooms.outcomes;
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();

  return (
    <SectionRoom colors={room} className="flex items-center">
      <div className="flex w-full flex-col items-center text-center">
        <SectionLabel accentColor={room.accent}>Outcomes</SectionLabel>

        {/* Big headline */}
        <div className="mb-16">
          <LineMask
            as="h2"
            className="text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold leading-[1.02] tracking-tight"
            delay={0.15}
          >
            {OUTCOMES.headline}
          </LineMask>
        </div>

        {/* Stats grid with charts */}
        <div
          ref={statsRef}
          className="mx-auto grid w-full max-w-[680px] grid-cols-2 gap-x-8 gap-y-12 md:gap-x-16 md:gap-y-14"
        >
          {OUTCOMES.stats.map((stat, i) => {
            const Chart = CHARTS[i];
            const d = i * 0.22;
            return (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center"
                initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: d,
                  duration: duration.normal,
                  ease: ease.expo,
                }}
              >
                {/* Data viz chart */}
                <div className="mb-4 flex h-[90px] w-full items-center justify-center">
                  <Chart
                    inView={statsInView}
                    delay={d}
                    reduce={shouldReduce}
                  />
                </div>

                {/* Animated number */}
                <div className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-none tracking-tight">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    delay={d}
                  />
                </div>

                {/* Label */}
                <p className="mt-2 text-[14px] opacity-60">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Closing line */}
        <motion.p
          className="mx-auto mt-16 max-w-[640px] text-[15px] leading-relaxed opacity-50"
          initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
          animate={statsInView ? { opacity: 0.5, y: 0 } : {}}
          transition={{
            delay: 1.2,
            duration: duration.slow,
            ease: ease.standard,
          }}
        >
          {OUTCOMES.closingLine}
        </motion.p>
      </div>
    </SectionRoom>
  );
}
