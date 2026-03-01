"use client";

/**
 * LearnJourney — animated interactive timeline for the Learn.xyz case study.
 *
 * Vertical timeline with scroll-triggered animations, expandable phases,
 * and a drawing line effect that progresses as the user scrolls.
 */

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import { LineMask } from "../LineMask";
import { SectionRoom, SectionLabel, SectionBody } from "../SectionRoom";
import { learnRooms, ease, spring } from "@/lib/motion";
import { JOURNEY } from "./LearnData";

/* ── Icons ─────────────────────────────────────────────────────────── */

const PHASE_ICONS = {
  search: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  ),
  palette: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r="2" />
      <circle cx="17.5" cy="10.5" r="2" />
      <circle cx="8.5" cy="7.5" r="2" />
      <circle cx="6.5" cy="12.5" r="2" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  ),
  layers: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 12.5-8.58 3.9a2 2 0 0 1-1.66 0L2 12.5" />
      <path d="m22 17.5-8.58 3.9a2 2 0 0 1-1.66 0L2 17.5" />
    </svg>
  ),
  rocket: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  trending: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  ),
};

/* ── Phase card ────────────────────────────────────────────────────── */

function PhaseCard({
  phase,
  index,
  isExpanded,
  onToggle,
  inView,
  shouldReduce,
  accentColor,
  textColor,
}: {
  phase: (typeof JOURNEY.phases)[number];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  inView: boolean;
  shouldReduce: boolean | null;
  accentColor: string;
  textColor: string;
}) {
  return (
    <motion.div
      className="relative flex gap-5 md:gap-8"
      initial={shouldReduce ? {} : { opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        delay: 0.3 + index * 0.12,
        duration: 0.6,
        ease: ease.expo,
      }}
    >
      {/* Timeline node */}
      <div className="relative flex flex-col items-center">
        {/* The dot */}
        <motion.button
          onClick={onToggle}
          className="relative z-10 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 transition-colors"
          style={{
            borderColor: isExpanded ? accentColor : `${textColor}20`,
            backgroundColor: isExpanded ? `${accentColor}12` : "transparent",
            color: isExpanded ? accentColor : `${textColor}60`,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={spring.snappy}
        >
          {PHASE_ICONS[phase.icon]}

          {/* Pulse ring on highlight */}
          {phase.isHighlight && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ borderColor: accentColor }}
              animate={{
                boxShadow: [
                  `0 0 0 0px ${accentColor}30`,
                  `0 0 0 8px ${accentColor}00`,
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          )}
        </motion.button>

        {/* Connector line (not on last item) */}
        {index < JOURNEY.phases.length - 1 && (
          <div
            className="w-px flex-1"
            style={{ backgroundColor: `${textColor}12`, minHeight: 24 }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-10 md:pb-14">
        <button
          onClick={onToggle}
          className="w-full cursor-pointer text-left"
        >
          {/* Quarter badge */}
          <motion.span
            className="mb-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{
              backgroundColor: isExpanded ? `${accentColor}14` : `${textColor}06`,
              color: isExpanded ? accentColor : `${textColor}50`,
            }}
          >
            {phase.quarter}
          </motion.span>

          {/* Phase label */}
          <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: `${accentColor}99` }}>
            {phase.label}
          </div>

          {/* Title */}
          <h3
            className="text-[20px] font-bold leading-tight md:text-[24px]"
            style={{ color: textColor }}
          >
            {phase.title}
          </h3>
        </button>

        {/* Expandable description */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: ease.standard }}
              className="overflow-hidden"
            >
              <p
                className="mt-3 max-w-[480px] text-[15px] leading-[1.7]"
                style={{ color: `${textColor}90` }}
              >
                {phase.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ── Main component ────────────────────────────────────────────────── */

export function LearnJourney() {
  const room = learnRooms.journey;
  const ref = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  /* Scroll-driven progress line */
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.6"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <SectionRoom colors={room}>
      <div ref={ref}>
        <SectionLabel accentColor={room.accent}>The Journey</SectionLabel>

        <LineMask
          as="h2"
          className="mb-4 text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.02] tracking-tight"
          delay={0.15}
        >
          {JOURNEY.headline}
        </LineMask>

        {/* Duration badge */}
        <motion.div
          className="mb-6 flex items-center gap-3"
          initial={shouldReduce ? {} : { opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5, ease: ease.standard }}
        >
          <span
            className="rounded-full px-3 py-1 text-[13px] font-medium"
            style={{
              backgroundColor: `${room.accent}10`,
              color: room.accent,
            }}
          >
            {JOURNEY.duration}
          </span>
        </motion.div>

        <SectionBody>{JOURNEY.body}</SectionBody>

        {/* Timeline */}
        <div ref={timelineRef} className="relative mt-16 md:mt-20">
          {/* The animated progress line (behind the dots) */}
          {!shouldReduce && (
            <motion.div
              className="absolute left-[19px] top-0 w-[2px] origin-top md:left-[19px]"
              style={{
                height: lineHeight,
                background: `linear-gradient(180deg, ${room.accent} 0%, ${room.accent}40 100%)`,
                zIndex: 1,
              }}
            />
          )}

          {/* Static track line */}
          <div
            className="absolute left-[19px] top-0 h-full w-[2px] md:left-[19px]"
            style={{
              backgroundColor: `${room.text}08`,
            }}
          />

          {/* Phase cards */}
          <div className="relative z-10">
            {JOURNEY.phases.map((phase, i) => (
              <PhaseCard
                key={phase.label}
                phase={phase}
                index={i}
                isExpanded={expandedIndex === i}
                onToggle={() =>
                  setExpandedIndex(expandedIndex === i ? null : i)
                }
                inView={inView}
                shouldReduce={shouldReduce}
                accentColor={room.accent}
                textColor={room.text}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionRoom>
  );
}
