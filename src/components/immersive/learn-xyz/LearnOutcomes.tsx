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
const TRACK = "rgba(255,255,255,0.08)";

interface ChartProps {
  inView: boolean;
  delay: number;
  reduce: boolean | null;
}

/* ═══════════════════════════════════════════════════════════════
   1. DOT GLOBE — 20+ Global Pilot Clients
   A sphere of dots with "land" (filled gold) and "ocean" (visible
   outline circles). The circular boundary is clearly defined.
   Dots shrink slightly near edges for a subtle 3-D illusion.
   ═══════════════════════════════════════════════════════════════ */

// 13×13 bitmap — 0: empty, 1: ocean dot, 2: land dot
const GLOBE: number[][] = [
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 2, 2, 2, 1, 1, 1, 1, 0, 0],
  [0, 1, 2, 2, 2, 2, 1, 1, 2, 2, 1, 1, 0],
  [1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 1],
  [1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1],
  [1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
  [1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1],
  [1, 1, 2, 2, 2, 1, 1, 2, 2, 1, 1, 1, 0],
  [0, 1, 1, 2, 2, 1, 1, 2, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 2, 2, 2, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
];

function DotGlobeChart({ inView, delay, reduce }: ChartProps) {
  const gridN = 13;
  const sp = 14;
  const svgSize = gridN * sp;
  const ctr = svgSize / 2;
  const maxR = ctr;

  const dots: { x: number; y: number; t: number; dist: number }[] = [];
  for (let r = 0; r < gridN; r++) {
    for (let c = 0; c < gridN; c++) {
      const t = GLOBE[r][c];
      if (!t) continue;
      const x = c * sp + sp / 2;
      const y = r * sp + sp / 2;
      dots.push({ x, y, t, dist: Math.hypot(x - ctr, y - ctr) });
    }
  }
  dots.sort((a, b) => a.dist - b.dist);

  return (
    <svg
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      fill="none"
      className="mx-auto h-auto w-full max-w-[182px]"
    >
      {dots.map((d, i) => {
        const edge = 1 - (d.dist / maxR) * 0.25; // subtler edge scaling
        const dotR = 3.6 * edge;
        const stagger = (d.dist / maxR) * 0.7;

        return d.t === 2 ? (
          <motion.circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={dotR}
            fill={GOLD}
            initial={
              reduce
                ? { scale: 1, opacity: 0.9 }
                : { scale: 0, opacity: 0 }
            }
            animate={inView ? { scale: 1, opacity: 0.9 } : {}}
            transition={{
              delay: delay + stagger,
              duration: 0.4,
              ease: "backOut",
            }}
          />
        ) : (
          <motion.circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={dotR}
            fill="none"
            stroke={GOLD}
            strokeWidth={1.2}
            initial={
              reduce
                ? { scale: 1, opacity: 0.45 }
                : { scale: 0, opacity: 0 }
            }
            animate={inView ? { scale: 1, opacity: 0.45 } : {}}
            transition={{
              delay: delay + stagger,
              duration: 0.35,
              ease: "backOut",
            }}
          />
        );
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   2. GRADIENT RADIAL — 80 % Lesson Completion Rate
   A single smooth ring that sweeps from faint to fully saturated
   gold over 80 % of its circumference. Center shows a checkmark
   icon instead of the number (since the number is already below).
   ═══════════════════════════════════════════════════════════════ */

function GradientRadialChart({ inView, delay, reduce }: ChartProps) {
  const cx = 90;
  const cy = 90;
  const r = 70;
  const circumference = 2 * Math.PI * r;
  const fillLength = circumference * 0.8;

  return (
    <svg
      viewBox="0 0 180 180"
      fill="none"
      className="mx-auto h-auto w-full max-w-[180px]"
    >
      <defs>
        {/* Gradient goes from dim (start) to bright (end of stroke) */}
        <linearGradient
          id="radialStroke"
          gradientUnits="userSpaceOnUse"
          x1="155"
          y1="20"
          x2="20"
          y2="100"
        >
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.15" />
          <stop offset="50%" stopColor={GOLD} stopOpacity="0.5" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Track ring (full circle, very faint) */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        stroke={TRACK}
        strokeWidth="8"
      />

      {/* Gradient-filled 80% arc */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        stroke="url(#radialStroke)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        transform={`rotate(-90 ${cx} ${cy})`}
        initial={
          reduce
            ? { strokeDashoffset: circumference - fillLength }
            : { strokeDashoffset: circumference }
        }
        animate={
          inView
            ? { strokeDashoffset: circumference - fillLength }
            : {}
        }
        transition={{
          delay: delay + 0.1,
          duration: 1.6,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      {/* Center: checkmark icon */}
      <motion.path
        d="M76,92 L85,101 L106,78"
        stroke={GOLD}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={reduce ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.5 } : {}}
        transition={{
          delay: delay + 1.2,
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   3. THICK PILL BARS — 10 / week Avg. Lessons per Learner
   7 chunky pill-shaped bars (Mon–Sun) with day-letter labels
   inside. Thursday (peak) is highlighted at full opacity.
   ═══════════════════════════════════════════════════════════════ */

function PillBarsChart({ inView, delay, reduce }: ChartProps) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const heights = [60, 92, 75, 118, 85, 105, 50];
  const barW = 20;
  const gap = 6;
  const peak = 3; // Thursday
  const viewW = days.length * (barW + gap) - gap + 24;
  const viewH = 155;
  const base = viewH - 6;

  return (
    <svg
      viewBox={`0 0 ${viewW} ${viewH}`}
      fill="none"
      className="mx-auto h-auto w-full max-w-[206px]"
    >
      {days.map((day, i) => {
        const h = heights[i];
        const x = 12 + i * (barW + gap);
        const y = base - h;
        const isPeak = i === peak;
        const op = isPeak ? 1 : 0.4 + (h / 120) * 0.4;

        return (
          <g key={i}>
            {/* Pill bar */}
            <motion.rect
              x={x}
              width={barW}
              rx={barW / 2}
              fill={GOLD}
              initial={
                reduce
                  ? { y, height: h, opacity: op }
                  : { y: base, height: 0, opacity: 0 }
              }
              animate={inView ? { y, height: h, opacity: op } : {}}
              transition={{
                delay: delay + i * 0.07,
                duration: 0.6,
                ease: "backOut",
              }}
            />
            {/* Day label inside bar */}
            <motion.text
              x={x + barW / 2}
              y={base - 10}
              textAnchor="middle"
              fill={isPeak ? "#1a1200" : "rgba(26,18,0,0.5)"}
              fontSize="8.5"
              fontWeight="700"
              fontFamily="system-ui, sans-serif"
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{
                delay: delay + 0.5 + i * 0.04,
                duration: 0.3,
              }}
            >
              {day}
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   4. JOY S-CURVE — 1000+ Lessons Created in Week 1
   A smooth cubic-bezier "joy" curve rising from bottom-left to
   top-right. Gradient area fill underneath, two labelled data-
   point markers ("Day 1" above, "Week 1" below). The Week 1
   endpoint pulses gently.
   ═══════════════════════════════════════════════════════════════ */

function JoyCurveChart({ inView, delay, reduce }: ChartProps) {
  // Shifted down 15px to make room for Week 1 label above
  const line = "M 20,152 C 60,152 80,38 250,34";
  const area = "M 20,152 C 60,152 80,38 250,34 L 260,34 L 260,168 L 20,168 Z";

  return (
    <svg
      viewBox="0 0 280 175"
      fill="none"
      className="mx-auto h-auto w-full max-w-[272px]"
    >
      <defs>
        <linearGradient id="joyFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.28" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Gradient area under the curve */}
      <motion.path
        d={area}
        fill="url(#joyFill)"
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.4, duration: 0.8 }}
      />

      {/* The S-curve line */}
      <motion.path
        d={line}
        stroke={GOLD}
        strokeWidth="3.5"
        strokeLinecap="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{
          delay: delay + 0.1,
          duration: 1.6,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      {/* ── Day 1 marker (bottom-left, label ABOVE the line) ── */}
      <g>
        {/* Glow ring */}
        <motion.circle
          cx={35}
          cy={150}
          r={14}
          fill={GOLD}
          initial={reduce ? { opacity: 0.1, scale: 1 } : { opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 0.1, scale: 1 } : {}}
          transition={{ delay: delay + 0.9, duration: 0.4, ease: "backOut" }}
        />
        {/* Dot */}
        <motion.circle
          cx={35}
          cy={150}
          r={5.5}
          fill={GOLD}
          initial={reduce ? { scale: 1 } : { scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: delay + 0.9, duration: 0.35, ease: "backOut" }}
        />
        {/* Label pill — well above the line */}
        <motion.g
          initial={reduce ? { opacity: 0.85 } : { opacity: 0, y: 5 }}
          animate={inView ? { opacity: 0.85, y: 0 } : {}}
          transition={{ delay: delay + 1.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <rect x={9} y={115} width="52" height="18" rx="9" fill="rgba(255,255,255,0.14)" />
          <text
            x={35}
            y={128}
            textAnchor="middle"
            fill="white"
            fontSize="9"
            fontWeight="600"
            fontFamily="system-ui, sans-serif"
          >
            Day 1
          </text>
        </motion.g>
      </g>

      {/* ── Week 1 marker (top-right, label ABOVE with pulse) ── */}
      <g>
        {/* Pulsing glow ring */}
        <motion.circle
          cx={240}
          cy={34}
          r={14}
          fill={GOLD}
          initial={reduce ? { opacity: 0.12, scale: 1 } : { opacity: 0, scale: 0 }}
          animate={
            inView
              ? {
                  opacity: [0.08, 0.2, 0.08],
                  scale: [1, 1.3, 1],
                }
              : {}
          }
          transition={{
            delay: delay + 1.2,
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Dot */}
        <motion.circle
          cx={240}
          cy={34}
          r={5.5}
          fill={GOLD}
          initial={reduce ? { scale: 1 } : { scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: delay + 1.2, duration: 0.35, ease: "backOut" }}
        />
        {/* Label pill — positioned above, within viewBox */}
        <motion.g
          initial={reduce ? { opacity: 0.85 } : { opacity: 0, y: 5 }}
          animate={inView ? { opacity: 0.85, y: 0 } : {}}
          transition={{ delay: delay + 1.4, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <rect x={212} y={3} width="56" height="18" rx="9" fill="rgba(255,255,255,0.14)" />
          <text
            x={240}
            y={16}
            textAnchor="middle"
            fill="white"
            fontSize="9"
            fontWeight="600"
            fontFamily="system-ui, sans-serif"
          >
            Week 1
          </text>
        </motion.g>
      </g>
    </svg>
  );
}

/* ── Chart registry ──────────────────────────────────────────── */

const CHARTS = [DotGlobeChart, GradientRadialChart, PillBarsChart, JoyCurveChart];

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

        {/* Stats grid — 2 cols mobile, 4 cols desktop */}
        <div
          ref={statsRef}
          className="mx-auto grid w-full max-w-[780px] grid-cols-2 gap-x-8 gap-y-14 md:gap-x-12 lg:max-w-[1100px] lg:grid-cols-4 lg:gap-x-10 lg:gap-y-10"
        >
          {OUTCOMES.stats.map((stat, i) => {
            const Chart = CHARTS[i];
            const d = i * 0.2;
            return (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center"
                initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: d,
                  duration: duration.normal,
                  ease: ease.expo,
                }}
              >
                {/* Data viz chart */}
                <div className="mb-5 flex h-[180px] w-full items-center justify-center lg:h-[150px]">
                  <Chart
                    inView={statsInView}
                    delay={d}
                    reduce={shouldReduce}
                  />
                </div>

                {/* Animated number */}
                <div className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-none tracking-tight lg:text-[clamp(1.75rem,3vw,2.75rem)]">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    delay={d}
                  />
                </div>

                {/* Label */}
                <p className="mt-2 text-[14px] opacity-80 lg:text-[13px]">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Closing line */}
        <motion.p
          className="mx-auto mt-16 max-w-[640px] text-[15px] leading-relaxed opacity-75"
          initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
          animate={statsInView ? { opacity: 0.75, y: 0 } : {}}
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
