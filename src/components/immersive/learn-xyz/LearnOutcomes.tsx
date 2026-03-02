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

/* ── Helper: polar coordinate for arcs ─────────────────────── */

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

/* ═══════════════════════════════════════════════════════════════
   1. DOT GLOBE — 20+ Global Pilot Clients
   A sphere of dots with "land" (filled gold) and "ocean" (faint
   outlines). Dots shrink near edges for a 3-D illusion. Animates
   radially outward from the center.
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
        const edge = 1 - (d.dist / maxR) * 0.45;
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
                ? { scale: 1, opacity: 0.9 * edge }
                : { scale: 0, opacity: 0 }
            }
            animate={inView ? { scale: 1, opacity: 0.9 * edge } : {}}
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
            strokeWidth={0.7}
            initial={
              reduce
                ? { scale: 1, opacity: 0.18 * edge }
                : { scale: 0, opacity: 0 }
            }
            animate={inView ? { scale: 1, opacity: 0.18 * edge } : {}}
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
   2. SEGMENTED RADIAL — 80 % Lesson Completion Rate
   24 individual arc segments that light up sequentially.
   19 are filled gold, 5 are faint track. Creates a dramatic
   sweep-on effect. Big "80 %" label in the center.
   ═══════════════════════════════════════════════════════════════ */

function SegmentedRadialChart({ inView, delay, reduce }: ChartProps) {
  const total = 24;
  const filled = Math.round(total * 0.8); // 19 lit segments
  const cx = 90;
  const cy = 90;
  const r = 72;
  const gapDeg = 3;
  const segDeg = (360 - total * gapDeg) / total;

  const arcs = Array.from({ length: total }, (_, i) => {
    const a1 = i * (segDeg + gapDeg);
    const a2 = a1 + segDeg;
    const s = polar(cx, cy, r, a1);
    const e = polar(cx, cy, r, a2);
    return {
      d: `M ${s.x} ${s.y} A ${r} ${r} 0 0 1 ${e.x} ${e.y}`,
      lit: i < filled,
      i,
    };
  });

  return (
    <svg
      viewBox="0 0 180 180"
      fill="none"
      className="mx-auto h-auto w-full max-w-[180px]"
    >
      {arcs.map((a) => (
        <motion.path
          key={a.i}
          d={a.d}
          stroke={a.lit ? GOLD : TRACK}
          strokeWidth={a.lit ? 8 : 4}
          strokeLinecap="round"
          initial={
            reduce
              ? { opacity: a.lit ? 0.9 : 0.25, pathLength: 1 }
              : { opacity: 0, pathLength: 0 }
          }
          animate={
            inView
              ? { opacity: a.lit ? 0.9 : 0.25, pathLength: 1 }
              : {}
          }
          transition={{
            delay: delay + a.i * 0.04,
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}

      {/* Center percentage */}
      <motion.text
        x={cx}
        y={cy + 10}
        textAnchor="middle"
        fill={GOLD}
        fontSize="30"
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
        initial={reduce ? { opacity: 0.45 } : { opacity: 0 }}
        animate={inView ? { opacity: 0.45 } : {}}
        transition={{ delay: delay + 0.9, duration: 0.5 }}
      >
        80%
      </motion.text>
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
   point markers ("Day 1" and "Week 1") with glowing rings.
   ═══════════════════════════════════════════════════════════════ */

function JoyCurveChart({ inView, delay, reduce }: ChartProps) {
  const line = "M 15,138 C 55,138 75,22 250,18";
  const area = "M 15,138 C 55,138 75,22 250,18 L 260,18 L 260,148 L 15,148 Z";

  const markers = [
    { x: 30, y: 137, label: "Day 1", labelOff: -26 },
    { x: 235, y: 20, label: "Week 1", labelOff: -26 },
  ];

  return (
    <svg
      viewBox="0 0 272 158"
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

      {/* Data-point markers */}
      {markers.map((m, i) => (
        <g key={m.label}>
          {/* Glow ring */}
          <motion.circle
            cx={m.x}
            cy={m.y}
            r={14}
            fill={GOLD}
            initial={
              reduce
                ? { opacity: 0.1, scale: 1 }
                : { opacity: 0, scale: 0 }
            }
            animate={inView ? { opacity: 0.1, scale: 1 } : {}}
            transition={{
              delay: delay + 0.9 + i * 0.3,
              duration: 0.4,
              ease: "backOut",
            }}
          />
          {/* Center dot */}
          <motion.circle
            cx={m.x}
            cy={m.y}
            r={5.5}
            fill={GOLD}
            initial={reduce ? { scale: 1 } : { scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{
              delay: delay + 0.9 + i * 0.3,
              duration: 0.35,
              ease: "backOut",
            }}
          />
          {/* Label pill */}
          <motion.g
            initial={reduce ? { opacity: 0.85 } : { opacity: 0, y: 5 }}
            animate={inView ? { opacity: 0.85, y: 0 } : {}}
            transition={{
              delay: delay + 1.1 + i * 0.3,
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <rect
              x={m.x - 26}
              y={m.y + m.labelOff}
              width="52"
              height="18"
              rx="9"
              fill="rgba(255,255,255,0.14)"
            />
            <text
              x={m.x}
              y={m.y + m.labelOff + 13}
              textAnchor="middle"
              fill="white"
              fontSize="9"
              fontWeight="600"
              fontFamily="system-ui, sans-serif"
            >
              {m.label}
            </text>
          </motion.g>
        </g>
      ))}
    </svg>
  );
}

/* ── Chart registry ──────────────────────────────────────────── */

const CHARTS = [DotGlobeChart, SegmentedRadialChart, PillBarsChart, JoyCurveChart];

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
          className="mx-auto grid w-full max-w-[780px] grid-cols-2 gap-x-8 gap-y-14 md:gap-x-16 md:gap-y-16"
        >
          {OUTCOMES.stats.map((stat, i) => {
            const Chart = CHARTS[i];
            const d = i * 0.25;
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
                <div className="mb-5 flex h-[180px] w-full items-center justify-center">
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
