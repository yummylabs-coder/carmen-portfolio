"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { LineMask } from "../LineMask";
import {
  SectionRoom,
  SectionLabel,
  SectionBody,
  SectionVisual,
} from "../SectionRoom";
import { learnRooms, ease, stagger, spring } from "@/lib/motion";
import { DESIGN_SYSTEM, IMAGES } from "./LearnData";

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
        className="mb-8 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight"
        delay={0.15}
      >
        {DESIGN_SYSTEM.headline}
      </LineMask>

      <SectionBody>{DESIGN_SYSTEM.body}</SectionBody>

      {/* Moment 1: Token Architecture */}
      <div className="mt-20">
        <TokenArchitecture />
      </div>

      {/* Moment 2: Component Inspector */}
      <div className="mt-24">
        <ComponentInspector />
      </div>

      {/* Moment 3: Design Decisions */}
      <div className="mt-24">
        <DesignDecisions />
      </div>

      {/* Brand in motion GIF */}
      <SectionVisual className="mt-24">
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src={IMAGES.gifBrand}
            alt="Learn.xyz brand identity animation"
            width={1200}
            height={675}
            className="h-auto w-full"
            unoptimized
          />
        </div>
      </SectionVisual>

      {/* Closing line */}
      <motion.p
        className="mt-16 text-center text-[15px] italic opacity-60"
        style={{ color: learnRooms.designSystem.accent }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 0.6, transition: { duration: 0.8, delay: 0.3 } },
        }}
      >
        {DESIGN_SYSTEM.closingLine}
      </motion.p>
    </SectionRoom>
  );
}

/* ================================================================== */
/*  Moment 1: Token Architecture                                       */
/* ================================================================== */

function TokenArchitecture() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();
  const [activeRow, setActiveRow] = useState<number | null>(null);

  const cols = ["Primitive", "Semantic", "Component"];

  return (
    <div ref={ref}>
      <h3 className="mb-6 text-[13px] font-semibold uppercase tracking-[0.12em] opacity-50">
        Token Architecture
      </h3>

      {/* Column headers */}
      <div className="mb-4 grid grid-cols-3 gap-4">
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

      {/* Token rows */}
      <div className="space-y-3">
        {DESIGN_SYSTEM.tokenArchitecture.map((row, ri) => {
          const isActive = activeRow === ri;
          return (
            <motion.div
              key={ri}
              className="grid cursor-pointer grid-cols-3 gap-4 rounded-xl p-3 transition-colors"
              style={{
                backgroundColor: isActive
                  ? `${row.primitive.value}12`
                  : "transparent",
              }}
              onMouseEnter={() => setActiveRow(ri)}
              onMouseLeave={() => setActiveRow(null)}
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
                <motion.div
                  className="h-5 w-5 rounded-md"
                  style={{ backgroundColor: row.primitive.value }}
                  animate={isActive ? { scale: 1.2 } : { scale: 1 }}
                  transition={spring.snappy}
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
              <div className="flex items-center">
                <motion.span
                  className="rounded-md px-2 py-1 font-mono text-[12px]"
                  style={{
                    backgroundColor: isActive
                      ? `${row.primitive.value}20`
                      : "rgba(255,255,255,0.06)",
                  }}
                  animate={isActive ? { scale: 1.02 } : { scale: 1 }}
                >
                  {row.semantic}
                </motion.span>
              </div>

              {/* Component tokens */}
              <div className="flex flex-wrap items-center gap-1.5">
                {row.components.map((comp, ci) => (
                  <motion.span
                    key={comp}
                    className="rounded px-1.5 py-0.5 font-mono text-[11px]"
                    style={{
                      backgroundColor: isActive
                        ? `${row.primitive.value}18`
                        : "rgba(255,255,255,0.04)",
                    }}
                    initial={shouldReduce ? {} : { opacity: 0 }}
                    animate={
                      inView
                        ? isActive
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0.6, x: 0 }
                        : {}
                    }
                    transition={{
                      delay: isActive ? ci * 0.05 : 0,
                      duration: 0.3,
                    }}
                  >
                    {comp}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-4 text-[12px] italic opacity-30">
        Three layers mean we can rebrand without rebuilding. Change one
        primitive, and it cascades everywhere.
      </p>
    </div>
  );
}

/* ================================================================== */
/*  Moment 2: Component Inspector                                      */
/* ================================================================== */

function ComponentInspector() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const zone = DESIGN_SYSTEM.inspectorZones.find((z) => z.id === activeZone);

  return (
    <div ref={ref}>
      <h3 className="mb-6 text-[13px] font-semibold uppercase tracking-[0.12em] opacity-50">
        Component Inspector
      </h3>
      <p className="mb-8 text-[13px] opacity-40">
        Hover over any part of the card to inspect its design tokens.
      </p>

      <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-12">
        {/* The lesson card */}
        <motion.div
          className="relative flex-shrink-0"
          initial={
            shouldReduce
              ? {}
              : { opacity: 0, rotateX: 3, rotateY: -2 }
          }
          animate={
            inView
              ? { opacity: 1, rotateX: 0, rotateY: 0 }
              : {}
          }
          transition={{ duration: 0.8, ease: ease.expo, delay: 0.2 }}
          style={{ perspective: 800 }}
        >
          <div
            className="relative w-[248px] rounded-2xl p-4 shadow-lg"
            style={{ backgroundColor: "#FFFEFC" }}
          >
            {/* Badge */}
            <div
              className="mb-3 inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold"
              style={{ backgroundColor: "#FECB3A", color: "#300101" }}
              onMouseEnter={() => setActiveZone("badge")}
              onMouseLeave={() => setActiveZone(null)}
            >
              Leadership
            </div>

            {/* Title */}
            <h4
              className="mb-1 text-[16px] font-semibold leading-tight"
              style={{ color: "#300101" }}
              onMouseEnter={() => setActiveZone("title")}
              onMouseLeave={() => setActiveZone(null)}
            >
              Async Communication
            </h4>
            <p
              className="mb-4 text-[12px]"
              style={{ color: "#503B00" }}
            >
              Master remote team strategies
            </p>

            {/* Progress bar */}
            <div
              className="mb-4 h-[6px] overflow-hidden rounded-full"
              style={{ backgroundColor: "#FFF8E1" }}
              onMouseEnter={() => setActiveZone("progress")}
              onMouseLeave={() => setActiveZone(null)}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: "65%",
                  backgroundColor: "#2216FF",
                }}
              />
            </div>

            {/* Avatar stack */}
            <div
              className="flex items-center"
              onMouseEnter={() => setActiveZone("avatar")}
              onMouseLeave={() => setActiveZone(null)}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-6 w-6 rounded-full border-2"
                  style={{
                    backgroundColor: ["#FF6B6B", "#2216FF", "#00D4AA"][i],
                    borderColor: "#FFFEFC",
                    marginLeft: i > 0 ? -6 : 0,
                    zIndex: 3 - i,
                    position: "relative",
                  }}
                />
              ))}
              <span
                className="ml-2 text-[11px]"
                style={{ color: "#503B00" }}
              >
                +12 learners
              </span>
            </div>

            {/* Invisible full-card hover zone */}
            <div
              className="absolute inset-0 rounded-2xl"
              onMouseEnter={() => setActiveZone("card-bg")}
              onMouseLeave={() => setActiveZone(null)}
              style={{ zIndex: -1 }}
            />

            {/* Active zone highlight */}
            {activeZone && (
              <motion.div
                className="pointer-events-none absolute rounded-lg ring-2"
                style={{
                  backgroundColor: "rgba(254,203,58,0.08)",
                  boxShadow: "0 0 0 2px #FECB3A",
                }}
                layoutId="zone-highlight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              />
            )}
          </div>
        </motion.div>

        {/* Inspector panel */}
        <AnimatePresence mode="wait">
          {zone ? (
            <motion.div
              key={zone.id}
              className="min-w-[280px] max-w-[360px] rounded-xl border p-5"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                backgroundColor: "rgba(255,255,255,0.04)",
              }}
              initial={shouldReduce ? {} : { opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2, ease: ease.expo }}
            >
              <h4 className="mb-3 text-[14px] font-semibold">
                {zone.label}
              </h4>

              <div className="space-y-2">
                {zone.tokens.map((t) => (
                  <div
                    key={t.prop}
                    className="flex items-baseline justify-between gap-4"
                  >
                    <span className="text-[12px] opacity-50">{t.prop}</span>
                    <div className="text-right">
                      <span className="block font-mono text-[12px] text-[#FECB3A]">
                        {t.token}
                      </span>
                      <span className="block font-mono text-[11px] opacity-40">
                        → {t.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4 border-t border-white/10 pt-3 text-[12px] italic opacity-50">
                {zone.why}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="flex min-h-[200px] min-w-[280px] items-center justify-center rounded-xl border border-dashed p-5"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
            >
              <span className="text-[13px] opacity-50">
                ← Hover the card to inspect tokens
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Moment 3: Design Decisions                                         */
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
