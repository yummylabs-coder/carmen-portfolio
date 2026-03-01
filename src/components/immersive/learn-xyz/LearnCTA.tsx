"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { LineMask } from "../LineMask";
import { SectionRoom, SectionLabel } from "../SectionRoom";
import { learnRooms, ease, duration } from "@/lib/motion";

function StickyNotesIllustration() {
  return (
    <div className="relative h-[140px] w-[180px] shrink-0">
      <div className="absolute left-2 top-4 h-14 w-14 rotate-[-8deg] rounded-sm bg-[#FECB3A]/80 shadow-sm">
        <div className="mt-3 ml-2 h-px w-6 bg-[#D4A000]" />
        <div className="mt-1 ml-2 h-px w-8 bg-[#D4A000]" />
        <div className="mt-1 ml-2 h-px w-4 bg-[#D4A000]" />
      </div>
      <div className="absolute left-10 top-2 h-14 w-14 rotate-[5deg] rounded-sm bg-[#FECB3A]/60 shadow-sm">
        <div className="mt-3 ml-2 h-px w-7 bg-[#D4A000]" />
        <div className="mt-1 ml-2 h-px w-5 bg-[#D4A000]" />
        <span className="absolute bottom-2 right-2 text-[18px] font-bold text-[#D4A000]">?</span>
      </div>
      <div className="absolute left-6 top-12 h-14 w-14 rotate-[-3deg] rounded-sm bg-[#FECB3A]/90 shadow-sm">
        <div className="mt-3 ml-2 h-px w-5 bg-[#D4A000]" />
        <div className="mt-1 ml-2 h-px w-7 bg-[#D4A000]" />
      </div>
      <div className="absolute left-[70px] top-6 h-12 w-12 rotate-[12deg] rounded-sm bg-[#FECB3A]/50 shadow-sm">
        <span className="absolute bottom-1 right-2 text-[14px] font-bold text-[#D4A000]">?</span>
      </div>
      <div className="absolute left-[85px] top-16 h-12 w-12 rotate-[-6deg] rounded-sm bg-[#FECB3A]/70 shadow-sm">
        <div className="mt-3 ml-1 h-px w-5 bg-[#D4A000]" />
        <div className="mt-1 ml-1 h-px w-6 bg-[#D4A000]" />
      </div>
    </div>
  );
}

export function LearnCTA() {
  const room = learnRooms.cta;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  return (
    <SectionRoom colors={room}>
      <div
        ref={ref}
        className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-20"
      >
        {/* Left col: label + headline + body + CTA */}
        <div className="flex-1">
          <SectionLabel accentColor={room.accent}>Behind the Scenes</SectionLabel>
          <LineMask
            as="h2"
            className="mb-6 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.08] tracking-tight"
            delay={0.15}
          >
            {"Looking for sticky notes\nand empathy maps?"}
          </LineMask>

          <motion.p
            className="mb-8 max-w-[640px] text-[17px] leading-[1.8] opacity-70"
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

          <motion.a
            href="https://cal.com/yummy-labs-ps5kau/secret"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
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
        </div>

        {/* Right col: sticky notes illustration */}
        <motion.div
          className="flex shrink-0 justify-center lg:justify-end"
          initial={shouldReduce ? {} : { opacity: 0, scale: 0.9, rotate: -3 }}
          animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{
            delay: 0.5,
            duration: duration.slower,
            ease: ease.expo,
          }}
        >
          <StickyNotesIllustration />
        </motion.div>
      </div>
    </SectionRoom>
  );
}
