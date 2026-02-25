"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon } from "@/components/icons/NavIcons";
import { AnimatedCounter } from "./AnimatedCounter";
import Link from "next/link";

/* ── Stat icons ───────────────────────────────────────── */

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

/* ── Year dots — one per year of experience ───────────── */

function YearDots({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-[5px]">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-[7px] w-[7px] rounded-full bg-gradient-to-br from-[#2216FF] to-[#5B4CFF]"
          style={{
            opacity: 0.4 + (i / count) * 0.6, // fade in progressively
          }}
        />
      ))}
      {/* Current year — pulsing dot */}
      <div className="relative h-[7px] w-[7px]">
        <div className="absolute inset-0 animate-ping rounded-full bg-[#2216FF] opacity-40" />
        <div className="relative h-[7px] w-[7px] rounded-full bg-[#2216FF]" />
      </div>
    </div>
  );
}

/* ── Stats data ───────────────────────────────────────── */

const stats = [
  {
    value: 9,
    suffix: "",
    label: "years in product",
    context: "Since 2017",
    color: "text-[#2216FF]",
    iconBg: "bg-white",
    iconColor: "text-[#2216FF]",
    Icon: CalendarIcon,
    viz: "dots" as const,
  },
  {
    value: 30,
    suffix: "+",
    label: "products shipped",
    context: "Across 5 industries",
    color: "text-[#4B3AFF]",
    iconBg: "bg-white",
    iconColor: "text-[#4B3AFF]",
    Icon: LayersIcon,
    viz: "none" as const,
  },
  {
    value: 100,
    suffix: "+",
    label: "designers mentored",
    context: "Through Yummy Labs",
    color: "text-[#7C5CFF]",
    iconBg: "bg-white",
    iconColor: "text-[#7C5CFF]",
    Icon: UsersIcon,
    viz: "none" as const,
  },
];

/* ── Component ────────────────────────────────────────── */

export function MyNumbersWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.8,
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      }}
      className="flex-1"
    >
      <div
        className="flex h-full flex-col rounded-xl border border-sand-300 bg-sand-100 p-[25px]"
      >
        {/* Header */}
        <div className="mb-5">
          <h3 className="font-brand text-15 font-bold text-brand-ink">
            My numbers
          </h3>
        </div>

        {/* Stats — icon + number + context */}
        <div className="flex flex-col gap-5">
          {stats.map((stat) => {
            const { Icon } = stat;
            return (
              <div key={stat.label} className="flex gap-3">
                {/* Icon */}
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${stat.iconBg} ${stat.iconColor}`}
                >
                  <Icon />
                </div>

                {/* Number + label + context */}
                <div className="flex flex-col gap-[2px]">
                  <div className="flex items-baseline gap-2">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      className={`font-brand text-28 font-bold leading-none ${stat.color}`}
                    />
                    <span className="text-14 text-neutral-500">
                      {stat.label}
                    </span>
                  </div>

                  {/* Year dots for experience, context tag for others */}
                  {stat.viz === "dots" ? (
                    <div className="mt-1">
                      <YearDots count={stat.value} />
                    </div>
                  ) : (
                    <span className="text-12 text-neutral-400">
                      {stat.context}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
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
