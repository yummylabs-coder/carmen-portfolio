"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({ value, suffix = "", className = "" }: AnimatedCounterProps) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));

  useEffect(() => {
    animate(motionValue, value, { duration: 1.5, delay: 0.3, ease: "easeOut" });
  }, [motionValue, value]);

  return (
    <span className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
