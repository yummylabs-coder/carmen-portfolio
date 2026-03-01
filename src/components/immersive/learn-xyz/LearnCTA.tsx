"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { LineMask } from "../LineMask";
import { SectionRoom, SectionLabel } from "../SectionRoom";
import { learnRooms, ease, duration } from "@/lib/motion";

/* ── User research quotes for sticky notes ─────────────────────────── */

const RESEARCH_NOTES = [
  { quote: "User 1 had issues finding the right learning path", color: "#FECB3A", rotate: -4 },
  { quote: "I forget to open the app after the first week", color: "#FFE082", rotate: 3 },
  { quote: "Can I share progress with my team?", color: "#FECB3A", rotate: -2 },
  { quote: "Navigation gets confusing after lesson 3", color: "#FFF3C4", rotate: 5 },
  { quote: "The gamification makes me want to come back", color: "#FFE082", rotate: -3 },
  { quote: "I wish I could pick up where I left off", color: "#FECB3A", rotate: 2 },
  { quote: "Completion rates drop after day 5", color: "#FFF3C4", rotate: -5 },
  { quote: "Why can't I see what my colleagues are learning?", color: "#FFE082", rotate: 4 },
];

function StickyNote({
  quote,
  color,
  rotate,
  index,
  inView,
  shouldReduce,
}: {
  quote: string;
  color: string;
  rotate: number;
  index: number;
  inView: boolean;
  shouldReduce: boolean | null;
}) {
  return (
    <motion.div
      className="relative flex h-[140px] w-[160px] flex-col justify-between p-4 shadow-md sm:h-[150px] sm:w-[170px]"
      style={{
        backgroundColor: color,
        transform: `rotate(${rotate}deg)`,
        borderRadius: "2px",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08), inset 0 -2px 4px rgba(0,0,0,0.04)",
      }}
      initial={shouldReduce ? {} : { opacity: 0, y: 30, scale: 0.9 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : {}
      }
      transition={{
        delay: 0.3 + index * 0.08,
        duration: duration.slow,
        ease: ease.expo,
      }}
    >
      {/* Tape strip at top */}
      <div
        className="absolute -top-2 left-1/2 h-5 w-12 -translate-x-1/2"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 100%)",
          borderRadius: "1px",
        }}
      />

      {/* Handwritten quote */}
      <p
        className="font-handwritten text-[14px] leading-[1.35] sm:text-[15px]"
        style={{ color: "#5C3D00" }}
      >
        &ldquo;{quote}&rdquo;
      </p>

      {/* Participant label */}
      <span
        className="mt-auto self-end text-[10px] font-medium uppercase tracking-wider opacity-40"
        style={{ color: "#5C3D00" }}
      >
        P{index + 1}
      </span>
    </motion.div>
  );
}

export function LearnCTA() {
  const room = learnRooms.cta;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  return (
    <SectionRoom colors={room}>
      <div ref={ref} className="flex flex-col items-center text-center">
        {/* Label */}
        <div className="flex justify-center">
          <SectionLabel accentColor={room.accent}>Behind the Scenes</SectionLabel>
        </div>

        {/* Headline — centered */}
        <LineMask
          as="h2"
          className="mb-6 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.08] tracking-tight"
          delay={0.15}
        >
          {"Looking for sticky notes\nand empathy maps?"}
        </LineMask>

        {/* Body — centered */}
        <motion.p
          className="mx-auto mb-10 max-w-[560px] text-[17px] leading-[1.8] opacity-70"
          initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 0.7, y: 0 } : {}}
          transition={{
            delay: 0.4,
            duration: duration.slow,
            ease: ease.standard,
          }}
        >
          There&apos;s more to this story than fits on a page. I&apos;d rather
          walk you through the research, the pivots, and the messy middle over
          a real conversation.
        </motion.p>

        {/* CTA button — centered */}
        <motion.a
          href="https://cal.com/yummy-labs-ps5kau/secret"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-16 inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{
            backgroundColor: "#FECB3A",
            color: "#300101",
          }}
          initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: 0.6,
            duration: duration.slow,
            ease: ease.expo,
          }}
        >
          Book a call
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="opacity-60"
          >
            <path
              d="M6 12L10 8L6 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.a>

        {/* Sticky notes grid — scattered, realistic post-its */}
        <div className="grid w-full max-w-[800px] grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5">
          {RESEARCH_NOTES.map((note, i) => (
            <div key={i} className="flex justify-center">
              <StickyNote
                quote={note.quote}
                color={note.color}
                rotate={note.rotate}
                index={i}
                inView={inView}
                shouldReduce={shouldReduce}
              />
            </div>
          ))}
        </div>

        {/* Subtle caption */}
        <motion.p
          className="mt-8 text-[12px] italic opacity-20"
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 0.2 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Real quotes from user research sessions
        </motion.p>
      </div>
    </SectionRoom>
  );
}
