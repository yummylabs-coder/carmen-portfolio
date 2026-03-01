"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { LineMask } from "../LineMask";
import { SectionRoom, SectionLabel } from "../SectionRoom";
import { learnRooms, ease, duration } from "@/lib/motion";
import { BET, IMAGES } from "./LearnData";

/* ── Scrollable Phone ─────────────────────────────────── */

/**
 * Renders an iPhone frame with a sticky header (logo bar) and
 * an auto-scrolling feed pulled from a real Figma export.
 *
 * The feed content image is taller than the phone viewport,
 * so it auto-scrolls on loop to sell the "learning = scrolling" concept.
 */
function ScrollablePhone({
  inView,
  shouldReduce,
}: {
  inView: boolean;
  shouldReduce: boolean | null;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  // Measure the scroll distance once content is loaded
  const measure = useCallback(() => {
    if (contentRef.current && viewportRef.current) {
      const contentH = contentRef.current.scrollHeight;
      const viewportH = viewportRef.current.clientHeight;
      setScrollDistance(Math.max(0, contentH - viewportH));
    }
  }, []);

  useEffect(() => {
    // Small delay to ensure images are laid out
    const timer = setTimeout(measure, 500);
    return () => clearTimeout(timer);
  }, [measure]);

  return (
    <div
      className="w-[220px] sm:w-[260px]"
      style={{
        filter:
          "drop-shadow(0 20px 40px rgba(48,1,1,0.2)) drop-shadow(0 8px 16px rgba(48,1,1,0.1))",
      }}
    >
      <div className="overflow-hidden rounded-[40px] border-[8px] border-[#1d1d1f] bg-[#1d1d1f]">
        <div className="relative overflow-hidden rounded-[32px] bg-black">
          {/* Dynamic island */}
          <div className="absolute left-1/2 top-[10px] z-30 h-[22px] w-[80px] -translate-x-1/2 rounded-full bg-black" />

          {/* Phone screen viewport */}
          <div
            ref={viewportRef}
            className="relative aspect-[9/19.5] w-full overflow-hidden"
            style={{ backgroundColor: "#FEF9F6" }}
          >
            {/* Auto-scrolling content wrapper */}
            <motion.div
              ref={contentRef}
              className="absolute inset-x-0 top-0 will-change-transform"
              animate={
                inView && !shouldReduce && scrollDistance > 0
                  ? {
                      y: [0, -scrollDistance, -scrollDistance, 0],
                    }
                  : { y: 0 }
              }
              transition={{
                duration: 18,
                ease: "easeInOut",
                repeat: Infinity,
                times: [0, 0.4, 0.6, 1],
              }}
            >
              {/* Header (scrolls with content but is duplicated as fixed overlay) */}
              <Image
                src={IMAGES.betHeader}
                alt=""
                width={1175}
                height={239}
                className="h-auto w-full"
                sizes="260px"
                aria-hidden
              />
              {/* Feed content with original side padding */}
              <div className="px-[4%]">
                <Image
                  src={IMAGES.betFeed}
                  alt="Learn.xyz mobile feed — learning paths, progress tracking, and team activity"
                  width={1078}
                  height={3929}
                  className="h-auto w-full"
                  sizes="260px"
                  onLoad={measure}
                />
              </div>
            </motion.div>

            {/* Fixed header overlay — stays pinned at top */}
            <div
              className="absolute inset-x-0 top-0 z-20"
              style={{
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <Image
                src={IMAGES.betHeader}
                alt="Learn.xyz app header"
                width={1175}
                height={239}
                className="h-auto w-full"
                sizes="260px"
              />
            </div>
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-[6px] left-1/2 z-20 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-white/30" />
        </div>
      </div>
    </div>
  );
}

/* ── Main Section ─────────────────────────────────────── */

export function LearnBet() {
  const room = learnRooms.bet;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  return (
    <SectionRoom colors={room}>
      {/* One row, two columns: text left, phone right */}
      <div
        ref={ref}
        className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20"
      >
        {/* Left col: label + headline + body together */}
        <div className="flex-1">
          <SectionLabel accentColor={room.accent}>The Bet</SectionLabel>
          <LineMask
            as="h2"
            className="mb-6 text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.02] tracking-tight"
            delay={0.1}
          >
            {BET.headline}
          </LineMask>

          <motion.p
            className="max-w-[640px] text-[17px] leading-[1.8] opacity-80"
            initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 0.8, y: 0 } : {}}
            transition={{
              delay: 0.5,
              duration: duration.slow,
              ease: ease.standard,
            }}
          >
            {BET.body}
          </motion.p>
        </div>

        {/* Right col: scrollable phone */}
        <motion.div
          className="flex shrink-0 justify-center lg:justify-end"
          initial={shouldReduce ? {} : { opacity: 0, y: 30, scale: 0.96 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            delay: 0.4,
            duration: duration.slower,
            ease: ease.expo,
          }}
        >
          <ScrollablePhone inView={inView} shouldReduce={!!shouldReduce} />
        </motion.div>
      </div>
    </SectionRoom>
  );
}
