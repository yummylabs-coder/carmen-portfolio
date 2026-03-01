"use client";

/**
 * AnimatedCounter — counts from 0 to a target number on scroll.
 * Uses Framer Motion's useSpring for a natural overshoot-then-settle.
 */

import {
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { spring as springPresets } from "@/lib/motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  /** Delay before counting starts (seconds) */
  delay?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  delay = 0,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, springPresets.counter);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;

    const timeout = setTimeout(() => {
      motionValue.set(value);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [inView, value, delay, motionValue]);

  useEffect(() => {
    if (shouldReduce) {
      setDisplay(String(value));
      return;
    }

    const unsubscribe = springValue.on("change", (v) => {
      setDisplay(String(Math.round(v)));
    });

    return unsubscribe;
  }, [springValue, shouldReduce, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
