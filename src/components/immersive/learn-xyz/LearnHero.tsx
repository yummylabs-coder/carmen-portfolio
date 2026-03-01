"use client";

/**
 * LearnHero — hero section with real Figma product-card images.
 *
 * Left column: text (headline, services, platforms)
 * Right column (lg+): three Figma-exported card images arranged in a
 *   non-overlapping cluster:
 *     - Stat card (wide) centred at top
 *     - AI Creator (tall) bottom-left
 *     - Template (medium) bottom-right
 *
 * All cards share: unified fade-up entrance → idle float
 */

import {
  motion,
  useReducedMotion,
  useInView,
} from "framer-motion";
import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { LineMask } from "../LineMask";
import { learnRooms, ease, duration, stagger } from "@/lib/motion";
import { HERO } from "./LearnData";

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

        {/* ── Right: Figma card images (lg+ only) ── */}
        <div ref={cardsRef} className="hidden flex-1 lg:block">
          <div className="relative ml-auto w-full max-w-[540px]">
            {/* Blur glow behind the card cluster */}
            <div className="pointer-events-none absolute inset-0">
              <div
                className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(34,22,255,0.14) 0%, rgba(13,8,71,0.07) 40%, transparent 68%)",
                  filter: "blur(60px)",
                }}
              />
            </div>

            {/*
             * Card cluster layout (non-overlapping):
             *
             *         ┌──── Stat Card (wide) ────┐
             *         └──────────────────────────┘
             *             16px gap
             *  ┌── AI Creator ──┐  ┌── Template ──┐
             *  │                │  │              │
             *  └────────────────┘  └──────────────┘
             */}
            <div className="relative flex flex-col items-center gap-4">
              {/* Row 1: Stat card — centred at top */}
              <motion.div
                initial={shouldReduce ? {} : { opacity: 0, y: 40, scale: 0.95 }}
                animate={cardsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 1.0, duration: 0.7, ease: ease.expo }}
              >
                <IdleFloat delay={1} amplitude={shouldReduce ? 0 : 5}>
                  <Image
                    src="/images/learn/hero-stat-card.png"
                    alt="Overall Lesson Completion Rate: 85%"
                    width={341}
                    height={111}
                    className="h-auto w-[340px] drop-shadow-xl"
                    priority
                  />
                </IdleFloat>
              </motion.div>

              {/* Row 2: AI Creator (left) + Template (right) */}
              <div className="flex items-start gap-4">
                {/* AI Creator */}
                <motion.div
                  initial={shouldReduce ? {} : { opacity: 0, y: 40, scale: 0.95 }}
                  animate={cardsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: 1.2, duration: 0.7, ease: ease.expo }}
                >
                  <IdleFloat delay={0} amplitude={shouldReduce ? 0 : 6}>
                    <Image
                      src="/images/learn/hero-ai-creator.png"
                      alt="Creating your lesson with AI — analyzing company knowledge, integrating insights, closing skill gaps"
                      width={242}
                      height={261}
                      className="h-auto w-[230px] drop-shadow-xl"
                      priority
                    />
                  </IdleFloat>
                </motion.div>

                {/* Template */}
                <motion.div
                  initial={shouldReduce ? {} : { opacity: 0, y: 40, scale: 0.95 }}
                  animate={cardsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: 1.4, duration: 0.7, ease: ease.expo }}
                >
                  <IdleFloat delay={2} amplitude={shouldReduce ? 0 : 7}>
                    <Image
                      src="/images/learn/hero-template.png"
                      alt="Cybersecurity Prevention Training template card"
                      width={275}
                      height={161}
                      className="h-auto w-[260px] drop-shadow-xl"
                      priority
                    />
                  </IdleFloat>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle depth gradient — bottom (mobile) + ambient depth */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[280px]"
        style={{
          background:
            "linear-gradient(to top, rgba(13,8,71,0.06) 0%, rgba(34,22,255,0.03) 40%, transparent 100%)",
        }}
      />

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
