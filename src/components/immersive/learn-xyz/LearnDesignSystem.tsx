"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { LineMask } from "../LineMask";
import {
  SectionRoom,
  SectionLabel,
  SectionBody,
  SectionVisual,
} from "../SectionRoom";
import { learnRooms, ease, stagger } from "@/lib/motion";
import { DESIGN_SYSTEM, IMAGES } from "./LearnData";

/* ================================================================== */
/*  Lesson Editor — MacBook frame with tab-switching right panel        */
/* ================================================================== */

/** Right panel width as a percentage of the full layout (1300 / 4173) */
const RIGHT_PANEL_PCT = 31.15;

function LessonEditorFrame() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduce = useReducedMotion();
  const [showLearners, setShowLearners] = useState(false);

  // Auto-toggle between Chat ↔ Learners view every 4s
  useEffect(() => {
    if (!inView || shouldReduce) return;
    const id = setInterval(() => setShowLearners((v) => !v), 4000);
    return () => clearInterval(id);
  }, [inView, shouldReduce]);

  return (
    <div
      ref={ref}
      className="mx-auto w-full max-w-[720px] lg:max-w-[960px]"
      style={{
        filter:
          "drop-shadow(0 20px 40px rgba(0,0,0,0.2)) drop-shadow(0 8px 16px rgba(0,0,0,0.12))",
      }}
    >
      <div className="overflow-hidden rounded-t-[10px] border-[6px] border-b-[18px] border-[#1d1d1f] bg-[#1d1d1f]">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          {/* Base layer: full layout with Chat tab active */}
          <Image
            src={IMAGES.dsEditorChat}
            alt="Learn.xyz lesson editor — AI chat assistant helps create lessons"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 960px, 720px"
            priority
          />

          {/* Overlay: "What learners will see" panel — covers right 31% */}
          <motion.div
            className="absolute bottom-0 right-0 top-0"
            style={{ width: `${RIGHT_PANEL_PCT}%` }}
            initial={false}
            animate={{ opacity: showLearners ? 1 : 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <Image
              src={IMAGES.dsViewLearners}
              alt="What learners will see — mobile preview of generated lesson"
              fill
              className="object-cover"
              sizes="300px"
            />
          </motion.div>
        </div>
      </div>

      {/* MacBook chin */}
      <div
        className="mx-auto h-[8px] rounded-b-md"
        style={{
          width: "104%",
          marginLeft: "-2%",
          background: "linear-gradient(180deg, #3a3a3c 0%, #1d1d1f 100%)",
        }}
      />
    </div>
  );
}

/* ================================================================== */
/*  Main Section                                                       */
/* ================================================================== */

export function LearnDesignSystem() {
  const room = learnRooms.designSystem;

  return (
    <SectionRoom colors={room} autoHeight={false} padding="px-6 md:px-16 lg:px-24 py-24 md:py-36">
      <SectionLabel accentColor={room.accent}>Design System</SectionLabel>

      <LineMask
        as="h2"
        className="mb-8 text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.02] tracking-tight"
        delay={0.15}
      >
        {DESIGN_SYSTEM.headline}
      </LineMask>

      <SectionBody>{DESIGN_SYSTEM.body}</SectionBody>

      {/* Moment 1: Token Architecture */}
      <div className="mt-20">
        <TokenArchitecture />
      </div>

      {/* Moment 2: Typography */}
      <div className="mt-24">
        <Typography />
      </div>

      {/* Moment 3: Component Showcase */}
      <div className="mt-24">
        <ComponentShowcase />
      </div>

      {/* Moment 4: Design Decisions */}
      <div className="mt-24">
        <DesignDecisions />
      </div>

      {/* Lesson Editor — MacBook frame with animated right panel */}
      <SectionVisual className="mt-24">
        <LessonEditorFrame />
      </SectionVisual>

    </SectionRoom>
  );
}

/* ================================================================== */
/*  Moment 1: Token Architecture (click-based)                         */
/* ================================================================== */

function TokenArchitecture() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();

  const cols = ["Primitive", "Semantic", "Component"];

  return (
    <div ref={ref}>
      <h3 className="mb-6 text-[13px] font-semibold uppercase tracking-[0.12em] opacity-50">
        Token Architecture
      </h3>

      {/* Column headers — desktop only */}
      <div className="mb-4 hidden md:grid md:grid-cols-3 md:gap-4">
        {cols.map((col, ci) => (
          <motion.span
            key={col}
            className="text-[11px] font-semibold uppercase tracking-wider opacity-40"
            initial={shouldReduce ? {} : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 0.4, y: 0 } : {}}
            transition={{ delay: ci * 0.1, duration: 0.4, ease: ease.standard }}
          >
            {col}
          </motion.span>
        ))}
      </div>

      {/* Token rows — static, no interaction */}
      <div className="space-y-3">
        {DESIGN_SYSTEM.tokenArchitecture.map((row, ri) => (
          <motion.div
            key={ri}
            className="rounded-xl p-3 md:grid md:grid-cols-3 md:items-center md:gap-4"
            initial={shouldReduce ? {} : { opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              delay: 0.2 + ri * 0.1,
              duration: 0.5,
              ease: ease.expo,
            }}
          >
            {/* Primitive */}
            <div className="flex items-center gap-3">
              <div
                className="h-8 w-8 shrink-0 rounded-full"
                style={{
                  backgroundColor: row.primitive.value,
                  boxShadow: row.primitive.value.toLowerCase() === "#0d0847"
                    ? "inset 0 0 0 1px rgba(255,255,255,0.25)"
                    : undefined,
                }}
              />
              <div>
                <span className="block text-[13px] font-medium">
                  {row.primitive.name}
                </span>
                <span className="text-[11px] opacity-40">
                  {row.primitive.value}
                </span>
              </div>
            </div>

            {/* Semantic */}
            <div className="mt-2 flex items-center md:mt-0">
              <span className="mr-2 text-[10px] uppercase tracking-wider opacity-30 md:hidden">
                &rarr;
              </span>
              <span
                className="rounded-md px-2 py-1 font-mono text-[12px]"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                }}
              >
                {row.semantic}
              </span>
            </div>

            {/* Component tokens */}
            <div className="mt-2 md:mt-0">
              <div className="flex flex-wrap items-center gap-1.5">
                {row.components.map((comp) => (
                  <span
                    key={comp}
                    className="rounded px-1.5 py-0.5 font-mono text-[11px] opacity-40"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.04)",
                    }}
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-4 text-[12px] italic opacity-30">
        Three layers mean we can rebrand without rebuilding. Change one
        primitive, and it cascades everywhere.
      </p>
    </div>
  );
}

/* ================================================================== */
/*  Moment 2: Typography                                                */
/* ================================================================== */

function Typography() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();

  return (
    <div ref={ref}>
      <h3 className="mb-8 text-[13px] font-semibold uppercase tracking-[0.12em] opacity-50">
        Typography
      </h3>

      <div className="space-y-10">
        {DESIGN_SYSTEM.typeSpecimens.map((spec, i) => (
          <motion.div
            key={spec.style}
            className="group"
            initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.2 + i * 0.15,
              duration: 0.6,
              ease: ease.expo,
            }}
          >
            {/* Meta row */}
            <div className="mb-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider opacity-40">
                {spec.style}
              </span>
              <span className="font-mono text-[11px] opacity-25">
                {spec.weight} / {spec.size}px / {spec.letterSpacing}
              </span>
            </div>

            {/* The specimen itself — rendered in Source Sans Pro */}
            <p
              className="leading-[1.15]"
              style={{
                fontFamily: "var(--font-learn), 'Source Sans 3', sans-serif",
                fontWeight: spec.weight,
                fontSize: `clamp(${Math.max(spec.size * 0.5, 14)}px, ${spec.size <= 16 ? "16px" : `${spec.size / 16}vw + 4px`}, ${spec.size}px)`,
                letterSpacing: spec.letterSpacing,
              }}
            >
              {spec.sample}
            </p>

            {/* Divider */}
            {i < DESIGN_SYSTEM.typeSpecimens.length - 1 && (
              <div
                className="mt-8 h-px w-full"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
              />
            )}
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mt-8 text-[12px] italic opacity-30"
        initial={shouldReduce ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 0.3 } : {}}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        Source Sans Pro everywhere. Clean enough for data-dense dashboards,
        warm enough for a learning app.
      </motion.p>
    </div>
  );
}

/* ================================================================== */
/*  Moment 3: Component Showcase (real Figma exports)                   */
/* ================================================================== */

function ComponentShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();

  return (
    <div ref={ref}>
      <h3 className="mb-2 text-[13px] font-semibold uppercase tracking-[0.12em] opacity-50">
        Components
      </h3>
      <p className="mb-8 text-[13px] opacity-40">
        Real components from the design system, exported directly from Figma.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {DESIGN_SYSTEM.componentShowcase.map((comp, i) => (
          <motion.div
            key={comp.name}
            className="group flex flex-col"
            initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.2 + i * 0.12,
              duration: 0.6,
              ease: ease.expo,
            }}
          >
            {/* Component image */}
            <div
              className="relative flex items-center justify-center overflow-hidden rounded-xl p-6 transition-transform duration-300 group-hover:scale-[1.02]"
              style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
            >
              <Image
                src={IMAGES[comp.image]}
                alt={comp.name}
                width={comp.width}
                height={comp.height}
                className="h-auto max-h-[320px] w-auto max-w-full object-contain"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </div>

            {/* Label + description */}
            <div className="mt-4">
              <h4 className="text-[14px] font-semibold">{comp.name}</h4>
              <p className="mt-1 text-[13px] leading-relaxed opacity-50">
                {comp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mt-6 text-center text-[12px] italic opacity-30"
        initial={shouldReduce ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 0.3 } : {}}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {DESIGN_SYSTEM.closingLine}
      </motion.p>
    </div>
  );
}

/* ================================================================== */
/*  Moment 4: Design Decisions                                         */
/* ================================================================== */

function DesignDecisions() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div ref={ref}>
      <h3 className="mb-6 text-[13px] font-semibold uppercase tracking-[0.12em] opacity-50">
        Design Decisions
      </h3>

      <div className="grid gap-4 sm:grid-cols-2">
        {DESIGN_SYSTEM.decisions.map((d, i) => {
          const isExpanded = expandedIndex === i;
          return (
            <motion.button
              key={i}
              className="group relative cursor-pointer rounded-xl border p-5 text-left transition-colors"
              style={{
                borderColor: isExpanded
                  ? "rgba(254,203,58,0.3)"
                  : "rgba(255,255,255,0.08)",
                backgroundColor: isExpanded
                  ? "rgba(254,203,58,0.06)"
                  : "rgba(255,255,255,0.02)",
              }}
              onClick={() =>
                setExpandedIndex(isExpanded ? null : i)
              }
              initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.3 + i * stagger.card,
                duration: 0.5,
                ease: ease.expo,
              }}
              layout
            >
              {/* Question */}
              <div className="flex items-start justify-between gap-3">
                <span className="text-[14px] font-medium leading-snug">
                  {d.question}
                </span>
                <motion.span
                  className="mt-0.5 flex-shrink-0 text-[14px] opacity-40"
                  animate={{ rotate: isExpanded ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  +
                </motion.span>
              </div>

              {/* Answer */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: ease.standard }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-[13px] leading-relaxed opacity-60">
                      {d.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
