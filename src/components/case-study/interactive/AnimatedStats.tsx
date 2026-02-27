"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export interface StatItem {
  /** The final number to animate to */
  value: number;
  /** Optional prefix, e.g. "$" or "<" */
  prefix?: string;
  /** Optional suffix, e.g. "%", "+", "x", "h" */
  suffix?: string;
  /** Label below the number */
  label: string;
  /** Optional icon (ReactNode) */
  icon?: React.ReactNode;
}

interface AnimatedStatsProps {
  stats: StatItem[];
  /** Number of columns on desktop. Default 3. */
  columns?: 2 | 3 | 4;
  className?: string;
}

function useCountUp(
  target: number,
  isInView: boolean,
  duration = 1500,
): number {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [isInView, target, duration]);

  return count;
}

function StatCard({
  stat,
  index,
  isInView,
}: {
  stat: StatItem;
  index: number;
  isInView: boolean;
}) {
  const count = useCountUp(stat.value, isInView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="flex flex-col items-center rounded-xl border border-blue-100 bg-blue-50 p-6 text-center"
    >
      {stat.icon && (
        <div className="mb-3 h-8 w-8 text-neutral-400">{stat.icon}</div>
      )}
      <div className="font-brand text-32 font-bold tabular-nums text-brand-ink">
        {stat.prefix}
        {count}
        {stat.suffix}
      </div>
      <div className="mt-1 text-13 text-neutral-500">{stat.label}</div>
    </motion.div>
  );
}

/**
 * Animated statistics grid.
 * Numbers count up when scrolling into view.
 * Supports prefixes/suffixes and optional icons.
 */
export function AnimatedStats({
  stats,
  columns = 3,
  className,
}: AnimatedStatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const gridCols: Record<number, string> = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  return (
    <div
      ref={ref}
      className={`grid gap-4 ${gridCols[columns]} ${className ?? ""}`}
    >
      {stats.map((stat, i) => (
        <StatCard
          key={stat.label + i}
          stat={stat}
          index={i}
          isInView={isInView}
        />
      ))}
    </div>
  );
}
