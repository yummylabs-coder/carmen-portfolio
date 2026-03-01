"use client";

/**
 * LineMask — split-text line-mask reveal animation.
 *
 * Wraps each visual line in an overflow-hidden container so text
 * slides up from behind a mask. Used for display headlines.
 *
 * Usage:
 *   <LineMask as="h1" className="text-5xl font-bold">
 *     Learning that doesn't feel like learning.
 *   </LineMask>
 */

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode, type ElementType } from "react";
import { ease, duration, stagger } from "@/lib/motion";

interface LineMaskProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Extra delay before animation starts (seconds) */
  delay?: number;
  /** Override trigger — if provided, skips internal useInView */
  animate?: boolean;
}

export function LineMask({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  animate: externalAnimate,
}: LineMaskProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  const isVisible = externalAnimate !== undefined ? externalAnimate : inView;

  // Convert children to string, split by newline or just render as single line
  const text = typeof children === "string" ? children : null;
  const lines = text ? text.split("\n").filter(Boolean) : [children];

  if (shouldReduce) {
    return (
      <Tag className={className} ref={ref}>
        {text ? children : lines[0]}
      </Tag>
    );
  }

  return (
    <Tag className={className} ref={ref}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            animate={isVisible ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: duration.headline,
              ease: ease.expo,
              delay: delay + i * stagger.line,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
