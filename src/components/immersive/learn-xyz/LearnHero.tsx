"use client";

/**
 * LearnHero — hero section with animated product cards.
 *
 * Left column: text (headline, services, platforms)
 * Right column (lg+): three animated cards built as code components
 *   1. AI Creator — sequential checklist with check animations
 *   2. 85% Stat — counter animation with mini bar chart
 *   3. Template — badge pop-in, tag fade-in
 *
 * All cards share: unified fade-up entrance → interior animations → idle float
 */

import {
  motion,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { useRef, useEffect, useState, type ReactNode } from "react";
import { LineMask } from "../LineMask";
import { learnRooms, ease, duration, stagger, spring } from "@/lib/motion";
import { HERO } from "./LearnData";

/* ── Animated Counter Hook ────────────────────────────────── */

function useCounter(
  end: number,
  shouldStart: boolean,
  delayMs = 0,
  durationMs = 1200,
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let frame: number;
    let startTime: number | null = null;

    const timeout = setTimeout(() => {
      const step = (timestamp: number) => {
        if (startTime === null) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / durationMs, 1);
        /* easeOutExpo — fast start, smooth settle */
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(Math.round(eased * end));
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, delayMs);

    return () => {
      clearTimeout(timeout);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [end, shouldStart, delayMs, durationMs]);

  return count;
}

/* ── Card 1: AI Lesson Creator ────────────────────────────── */

const CHECKLIST = [
  "Define lesson topic",
  "Select target audience",
  "Generate outline",
  "Finalizing content…",
];

function AICreatorCard({
  inView,
  shouldReduce,
}: {
  inView: boolean;
  shouldReduce: boolean | null;
}) {
  return (
    <motion.div
      className="w-[230px] rounded-2xl p-5 shadow-2xl"
      style={{ backgroundColor: "#1F004A", color: "#FFFFFF" }}
      initial={shouldReduce ? {} : { opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 1.2, duration: 0.7, ease: ease.expo }}
    >
      {/* Header */}
      <div className="mb-3 flex items-center gap-2">
        <div
          className="flex h-7 w-7 items-center justify-center rounded-lg"
          style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FECB3A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2 2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <span
          className="text-[10px] font-medium uppercase tracking-wider"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          AI Creator
        </span>
      </div>

      <h4 className="mb-4 text-[14px] font-semibold leading-tight">
        Creating your lesson
        <br />
        with AI
      </h4>

      {/* Checklist */}
      <div className="space-y-2.5">
        {CHECKLIST.map((item, i) => {
          const isLast = i === CHECKLIST.length - 1;
          return (
            <motion.div
              key={item}
              className="flex items-center gap-2.5"
              initial={shouldReduce ? {} : { opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                delay: 1.8 + i * 0.22,
                duration: 0.4,
                ease: ease.standard,
              }}
            >
              {/* Check circle */}
              <motion.div
                className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
                style={{
                  backgroundColor: isLast
                    ? "rgba(255,255,255,0.08)"
                    : "#FECB3A",
                }}
                initial={shouldReduce ? {} : { scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{
                  delay: 1.95 + i * 0.22,
                  ...(shouldReduce ? {} : spring.bouncy),
                }}
              >
                {!isLast ? (
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1F004A"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <motion.div
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.div>

              <span
                className="text-[12px]"
                style={{
                  color: isLast
                    ? "rgba(255,255,255,0.35)"
                    : "rgba(255,255,255,0.8)",
                  fontStyle: isLast ? "italic" : "normal",
                }}
              >
                {item}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div
        className="mt-4 h-1 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: "#FECB3A" }}
          initial={{ width: "0%" }}
          animate={inView ? { width: "75%" } : {}}
          transition={{ delay: 2.6, duration: 1.0, ease: ease.expo }}
        />
      </div>
    </motion.div>
  );
}

/* ── Card 2: 85 % Completion Stat ─────────────────────────── */

function StatCard({
  inView,
  shouldReduce,
}: {
  inView: boolean;
  shouldReduce: boolean | null;
}) {
  const animatedCount = useCounter(85, inView, 800, 1200);
  const displayCount = shouldReduce ? 85 : animatedCount;

  return (
    <motion.div
      className="w-[300px] rounded-2xl p-4 shadow-xl"
      style={{ backgroundColor: "#FEF9F6", color: "#300101" }}
      initial={shouldReduce ? {} : { opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 1.0, duration: 0.7, ease: ease.expo }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p
            className="mb-1 text-[10px] font-medium uppercase tracking-wider"
            style={{ color: "rgba(48,1,1,0.4)" }}
          >
            Overall Lesson Completion Rate
          </p>
          <span
            className="text-[38px] font-bold leading-none tracking-tight"
            style={{ fontFamily: "var(--font-learn), sans-serif" }}
          >
            {displayCount}%
          </span>
        </div>

        {/* Target emoji */}
        <motion.span
          className="text-[26px]"
          initial={shouldReduce ? {} : { scale: 0, rotate: -20 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{
            delay: 2.1,
            ...(shouldReduce ? {} : spring.bouncy),
          }}
        >
          🎯
        </motion.span>
      </div>

      {/* Mini bar chart */}
      <div className="mt-2.5 flex items-end gap-1">
        {[40, 52, 58, 66, 75, 85].map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              backgroundColor:
                i === 5 ? "#2216FF" : `rgba(34,22,255,${0.1 + i * 0.06})`,
            }}
            initial={{ height: 0 }}
            animate={inView ? { height: h * 0.3 } : {}}
            transition={{
              delay: 1.5 + i * 0.06,
              duration: 0.5,
              ease: ease.expo,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Card 3: Template Card ────────────────────────────────── */

function TemplateCard({
  inView,
  shouldReduce,
}: {
  inView: boolean;
  shouldReduce: boolean | null;
}) {
  return (
    <motion.div
      className="w-[250px] overflow-hidden rounded-2xl shadow-xl"
      style={{ backgroundColor: "#FFFFFF", color: "#300101" }}
      initial={shouldReduce ? {} : { opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 1.4, duration: 0.7, ease: ease.expo }}
    >
      {/* Cover gradient */}
      <div
        className="relative h-[80px] w-full"
        style={{
          background:
            "linear-gradient(135deg, #1F004A 0%, #2216FF 50%, #5B4FFF 100%)",
        }}
      >
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -right-3 -top-3 h-16 w-16 rounded-full"
            style={{ backgroundColor: "rgba(254,203,58,0.15)" }}
          />
          <div
            className="absolute -bottom-2 left-6 h-10 w-10 rounded-full"
            style={{ backgroundColor: "rgba(91,79,255,0.25)" }}
          />
        </div>

        {/* Draft badge */}
        <motion.span
          className="absolute right-3 top-3 rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
          style={{ backgroundColor: "#FECB3A", color: "#300101" }}
          initial={shouldReduce ? {} : { scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{
            delay: 2.2,
            ...(shouldReduce ? {} : spring.bouncy),
          }}
        >
          Draft
        </motion.span>
      </div>

      {/* Body */}
      <div className="p-4">
        <motion.span
          className="mb-2 inline-block rounded-md px-2 py-0.5 text-[9px] font-medium"
          style={{ backgroundColor: "#F0EDFF", color: "#2216FF" }}
          initial={shouldReduce ? {} : { opacity: 0, y: 4 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.4, duration: 0.35, ease: ease.standard }}
        >
          Template
        </motion.span>

        <h4 className="text-[13px] font-semibold leading-snug">
          Cybersecurity
          <br />
          Prevention Training
        </h4>

        <p
          className="mt-1.5 text-[10px]"
          style={{ color: "rgba(48,1,1,0.35)" }}
        >
          12 lessons · 45 min
        </p>
      </div>
    </motion.div>
  );
}

/* ── Idle Float Wrapper ───────────────────────────────────── */

function IdleFloat({
  children,
  delay = 0,
  amplitude = 6,
}: {
  children: ReactNode;
  delay?: number;
  amplitude?: number;
}) {
  if (amplitude === 0) return <>{children}</>;

  return (
    <motion.div
      animate={{ y: [-amplitude, amplitude, -amplitude] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── Main Component ───────────────────────────────────────── */

export function LearnHero() {
  const room = learnRooms.hero;
  const shouldReduce = useReducedMotion();
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsInView = useInView(cardsRef, { once: true });

  const fadeUp = (i: number) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: duration.normal,
            delay: 0.6 + i * stagger.hero,
            ease: ease.standard,
          },
        };

  return (
    <section
      className="relative flex min-h-screen w-full items-center overflow-hidden"
      style={{ backgroundColor: room.bg }}
    >
      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-start gap-12 px-6 py-24 md:px-16 lg:flex-row lg:items-center lg:gap-16 lg:px-24">
        {/* ── Left: text ─────────────────── */}
        <div className="flex-1 space-y-6">
          {/* Meta line */}
          <motion.p
            className="text-[13px] font-medium tracking-wide"
            style={{ color: room.accent }}
            {...fadeUp(0)}
          >
            {HERO.meta}
          </motion.p>

          {/* Headline */}
          <LineMask
            as="h1"
            className="font-brand text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight"
            delay={0.7}
          >
            {HERO.headline}
          </LineMask>

          {/* Service tags */}
          <motion.div className="flex flex-wrap gap-2" {...fadeUp(4)}>
            {HERO.services.map((s) => (
              <span
                key={s}
                className="rounded-lg border px-3 py-1.5 text-[12px] font-medium"
                style={{
                  borderColor: `${room.text}20`,
                  color: room.text,
                  backgroundColor: `${room.text}08`,
                }}
              >
                {s}
              </span>
            ))}
          </motion.div>

          {/* Platform badges */}
          <motion.div className="flex gap-2" {...fadeUp(5)}>
            {HERO.platforms.map((p) => (
              <span
                key={p}
                className="rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider"
                style={{
                  backgroundColor: room.text,
                  color: room.bg,
                }}
              >
                {p}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Right: animated cards (lg+ only) ── */}
        <div ref={cardsRef} className="hidden flex-1 lg:block">
          <div className="relative ml-auto h-[440px] w-full max-w-[540px]">
            {/* Stat card — upper right (arrives first) */}
            <div className="absolute right-0 top-0 z-10">
              <IdleFloat delay={1} amplitude={shouldReduce ? 0 : 5}>
                <StatCard inView={cardsInView} shouldReduce={shouldReduce} />
              </IdleFloat>
            </div>

            {/* AI Creator — left, offset down (arrives second) */}
            <div className="absolute left-0 top-[50px] z-20">
              <IdleFloat delay={0} amplitude={shouldReduce ? 0 : 6}>
                <AICreatorCard
                  inView={cardsInView}
                  shouldReduce={shouldReduce}
                />
              </IdleFloat>
            </div>

            {/* Template — bottom center (arrives third) */}
            <div className="absolute bottom-0 left-[60px] z-30">
              <IdleFloat delay={2} amplitude={shouldReduce ? 0 : 7}>
                <TemplateCard
                  inView={cardsInView}
                  shouldReduce={shouldReduce}
                />
              </IdleFloat>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="h-8 w-[1px]"
          style={{ backgroundColor: room.text }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </section>
  );
}
