"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRightIcon } from "@/components/icons/NavIcons";
import { AnimatedCounter } from "./AnimatedCounter";
import Link from "next/link";

/* ── Year timeline — horizontal dots from 2017 → Now ── */

function YearTimeline() {
  const years = Array.from({ length: 9 }, (_, i) => 2017 + i);

  return (
    <div className="mt-3 flex items-end gap-[6px]">
      {years.map((year, i) => (
        <div key={year} className="flex flex-col items-center gap-1">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 + i * 0.06, type: "spring", stiffness: 400, damping: 20 }}
            className="relative"
          >
            <div
              className="h-[8px] w-[8px] rounded-full"
              style={{
                background: `linear-gradient(135deg, #2216FF, #5B4CFF)`,
                opacity: 0.35 + (i / 8) * 0.65,
              }}
            />
            {/* Last dot pulses */}
            {i === years.length - 1 && (
              <div className="absolute inset-0 animate-ping rounded-full bg-[#2216FF] opacity-30" />
            )}
          </motion.div>
          {/* Show first and last year labels */}
          {(i === 0 || i === years.length - 1) && (
            <span className="text-[9px] tabular-nums text-neutral-400">
              {i === years.length - 1 ? "Now" : year}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Product grid — mini squares representing shipped products ── */

function ProductGrid() {
  const total = 30;
  const cols = 10;

  return (
    <div className="mt-3 flex flex-wrap gap-[3px]" style={{ maxWidth: cols * 9 }}>
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 + i * 0.02, type: "spring", stiffness: 500, damping: 25 }}
          className="h-[6px] w-[6px] rounded-[1.5px]"
          style={{
            background: `linear-gradient(135deg, #4B3AFF, #7C5CFF)`,
            opacity: 0.3 + Math.random() * 0.7,
          }}
        />
      ))}
    </div>
  );
}

/* ── Avatar cluster — overlapping circles for mentored designers ── */

function AvatarCluster() {
  const visible = 8;
  const colors = [
    "#7C5CFF", "#9B7FFF", "#B5A0FF", "#A68EFF",
    "#8B6FFF", "#C4B5FF", "#6B4EFF", "#DDD5FF",
  ];

  return (
    <div className="mt-3 flex items-center">
      <div className="flex -space-x-[6px]">
        {colors.slice(0, visible).map((color, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, x: -10 }}
            animate={{ scale: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.05, type: "spring", stiffness: 400, damping: 20 }}
            className="relative flex h-[22px] w-[22px] items-center justify-center rounded-full border-[1.5px] border-white"
            style={{ backgroundColor: color, zIndex: visible - i }}
          >
            {/* Tiny person silhouette */}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white" opacity="0.6">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
            </svg>
          </motion.div>
        ))}
      </div>
      <motion.span
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3 }}
        className="ml-2 text-11 font-medium text-neutral-400"
      >
        +92 more
      </motion.span>
    </div>
  );
}

/* ── Stat card icons (watermark style) ─────────────── */

function CalendarWatermark() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[#2216FF]/[0.08]">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function LayersWatermark() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[#4B3AFF]/[0.08]">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function UsersWatermark() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[#7C5CFF]/[0.08]">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

/* ── Component ────────────────────────────────────── */

export function MyNumbersWidget() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.8,
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      }}
      className="flex-1"
    >
      <div className="flex h-full flex-col rounded-xl border border-sand-300 bg-sand-100 p-[25px]">
        {/* Header */}
        <div className="mb-4">
          <h3 className="font-brand text-15 font-bold text-brand-ink">
            My numbers
          </h3>
        </div>

        {/* Bento grid — 2 top + 1 wide bottom */}
        <div className="grid grid-cols-2 gap-3">
          {/* ── Card 1: Years ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="relative overflow-hidden rounded-xl border border-sand-200 bg-white p-4"
          >
            <div className="absolute right-3 top-3">
              <CalendarWatermark />
            </div>
            <div className="relative">
              <AnimatedCounter
                value={9}
                className="font-brand text-32 font-bold leading-none text-[#2216FF]"
              />
              <p className="mt-1 text-12 font-medium text-neutral-500">
                years in product
              </p>
              <YearTimeline />
            </div>
          </motion.div>

          {/* ── Card 2: Products ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.0, duration: 0.4 }}
            className="relative overflow-hidden rounded-xl border border-sand-200 bg-white p-4"
          >
            <div className="absolute right-3 top-3">
              <LayersWatermark />
            </div>
            <div className="relative">
              <AnimatedCounter
                value={30}
                suffix="+"
                className="font-brand text-32 font-bold leading-none text-[#4B3AFF]"
              />
              <p className="mt-1 text-12 font-medium text-neutral-500">
                products shipped
              </p>
              <p className="mt-0.5 text-11 text-neutral-400">
                Across 5 industries
              </p>
              <ProductGrid />
            </div>
          </motion.div>

          {/* ── Card 3: Designers (wide) ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1, duration: 0.4 }}
            className="relative col-span-2 overflow-hidden rounded-xl border border-sand-200 bg-white p-4"
          >
            <div className="absolute right-3 top-3">
              <UsersWatermark />
            </div>
            <div className="relative">
              <div className="flex items-baseline gap-2">
                <AnimatedCounter
                  value={100}
                  suffix="+"
                  className="font-brand text-32 font-bold leading-none text-[#7C5CFF]"
                />
                <span className="text-14 font-medium text-neutral-500">
                  designers mentored
                </span>
              </div>
              <p className="mt-0.5 text-11 text-neutral-400">
                Through Yummy Labs
              </p>
              <AvatarCluster />
            </div>
          </motion.div>
        </div>

        {/* Footer link */}
        <div className="mt-auto pt-5">
          <Link
            href="/experience"
            className="group/link inline-flex items-center gap-1 text-13 font-medium text-blue-500 transition-colors hover:text-blue-600"
          >
            View experience
            <ArrowRightIcon size={16} className="transition-transform duration-200 group-hover/link:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
