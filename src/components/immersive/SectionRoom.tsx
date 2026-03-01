"use client";

/**
 * SectionRoom — a full-viewport colored "room" for immersive case studies.
 *
 * Each room owns its background color, text color, and accent color.
 * Content inside is choreographed with the section cascade pattern:
 * label (0ms) → headline (150ms) → body (350ms) → visual (550ms)
 *
 * The room reports its color to a parent context so the page can
 * morph background colors during scroll.
 */

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { ease, duration, stagger, viewport } from "@/lib/motion";
import type { RoomColors } from "@/lib/motion";

interface SectionRoomProps {
  id?: string;
  colors: RoomColors;
  children: ReactNode;
  className?: string;
  /** If true, uses min-h-screen instead of fixed height */
  autoHeight?: boolean;
  /** Padding override */
  padding?: string;
}

export function SectionRoom({
  id,
  colors,
  children,
  className = "",
  autoHeight = true,
  padding = "px-6 md:px-16 lg:px-24 py-20 md:py-32",
}: SectionRoomProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, viewport.standard);
  const shouldReduce = useReducedMotion();

  return (
    <section
      id={id}
      ref={ref}
      className={`relative w-full ${autoHeight ? "min-h-screen" : ""} ${padding} ${className}`}
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        transition: shouldReduce ? "none" : undefined,
      }}
    >
      <motion.div
        className="mx-auto max-w-[1200px]"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: stagger.section,
            },
          },
        }}
      >
        {children}
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components for the section cascade                             */
/* ------------------------------------------------------------------ */

/** Small uppercase label pill */
export function SectionLabel({
  children,
  accentColor,
}: {
  children: ReactNode;
  accentColor: string;
}) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className="mb-6 flex items-center gap-3"
      variants={
        shouldReduce
          ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
          : {
              hidden: { opacity: 0, x: -12 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: duration.fast, ease: ease.standard },
              },
            }
      }
    >
      <motion.span
        className="h-[1px] origin-left"
        style={{ backgroundColor: accentColor }}
        variants={
          shouldReduce
            ? { hidden: { width: 24 }, visible: { width: 24 } }
            : {
                hidden: { width: 0 },
                visible: {
                  width: 24,
                  transition: { duration: duration.normal, ease: ease.standard },
                },
              }
        }
      />
      <span
        className="text-[11px] font-semibold uppercase tracking-[0.15em]"
        style={{ color: accentColor }}
      >
        {children}
      </span>
    </motion.div>
  );
}

/** Body paragraph with fade-up */
export function SectionBody({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.p
      className={`max-w-[640px] text-[17px] leading-[1.7] opacity-90 ${className}`}
      variants={
        shouldReduce
          ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
          : {
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: duration.normal, ease: ease.standard },
              },
            }
      }
    >
      {children}
    </motion.p>
  );
}

/** Visual content wrapper with scale-in entrance */
export function SectionVisual({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={
        shouldReduce
          ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
          : {
              hidden: { opacity: 0, scale: 0.97 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: duration.slow, ease: ease.expo },
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}

/** Display headline wrapper — provides the motion variant for the cascade.
 *  Use <LineMask> as a child for the actual text reveal. */
export function SectionHeadline({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        visible: {},
      }}
    >
      {children}
    </motion.div>
  );
}
