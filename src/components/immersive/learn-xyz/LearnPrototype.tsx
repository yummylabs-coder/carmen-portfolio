"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { LineMask } from "../LineMask";
import { SectionRoom, SectionLabel } from "../SectionRoom";
import { learnRooms, ease, duration } from "@/lib/motion";
import { IMAGES } from "./LearnData";

/* ── Phone frame (reusable) ──────────────────────────────────────── */

function PhoneFrame({
  src,
  alt,
  delay,
  floatOffset,
  shouldReduce,
  inView,
}: {
  src: string;
  alt: string;
  delay: number;
  floatOffset: number;
  shouldReduce: boolean | null;
  inView: boolean;
}) {
  return (
    <motion.div
      className="w-[180px] sm:w-[200px] md:w-[220px]"
      style={{
        filter:
          "drop-shadow(0 20px 40px rgba(0,0,0,0.15)) drop-shadow(0 8px 16px rgba(0,0,0,0.1))",
      }}
      initial={shouldReduce ? {} : { opacity: 0, y: 40 }}
      animate={
        inView
          ? {
              opacity: 1,
              y: shouldReduce
                ? 0
                : [floatOffset, -floatOffset, floatOffset],
            }
          : {}
      }
      transition={
        inView && !shouldReduce
          ? {
              opacity: { delay, duration: 0.8, ease: ease.expo },
              y: {
                delay,
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror" as const,
              },
            }
          : { delay, duration: 0.6, ease: ease.expo }
      }
    >
      <div className="overflow-hidden rounded-[32px] border-[6px] border-[#1d1d1f] bg-[#1d1d1f]">
        <div className="relative overflow-hidden rounded-[26px] bg-black">
          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-[8px] z-20 h-[18px] w-[64px] -translate-x-1/2 rounded-full bg-black" />
          {/* Screen */}
          <div className="relative aspect-[9/19.5] w-full overflow-hidden bg-white">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-top"
              sizes="220px"
            />
          </div>
          {/* Home indicator */}
          <div className="absolute bottom-[5px] left-1/2 z-20 h-[3px] w-[80px] -translate-x-1/2 rounded-full bg-white/30" />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main section ────────────────────────────────────────────────── */

export function LearnPrototype() {
  const room = learnRooms.prototype;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  const phones = [
    { src: IMAGES.learning1, alt: "AI micro-lesson experience", floatOffset: 8 },
    { src: IMAGES.learning2, alt: "AI suggested follow-up questions", floatOffset: -6 },
    { src: IMAGES.learning3, alt: "AI recommended next topics", floatOffset: 10 },
  ];

  return (
    <SectionRoom colors={room}>
      <div ref={ref} className="flex flex-col items-center text-center">
        <SectionLabel accentColor={room.accent}>Learning Experience</SectionLabel>
        <LineMask
          as="h2"
          className="mb-6 text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.02] tracking-tight"
          delay={0.15}
        >
          {"AI-assisted micro-lessons\nthat are easy-peazy\nto go through."}
        </LineMask>

        <motion.p
          className="mb-16 max-w-[560px] text-[17px] leading-[1.8] opacity-80"
          initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 0.8, y: 0 } : {}}
          transition={{
            delay: 0.4,
            duration: duration.slow,
            ease: ease.standard,
          }}
        >
          Learners keep going with AI-suggested next topics and follow-up
          questions that adapt to what they just learned.
        </motion.p>

        {/* Three phone frames side by side */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10">
          {phones.map((phone, i) => (
            <PhoneFrame
              key={i}
              src={phone.src}
              alt={phone.alt}
              delay={0.5 + i * 0.15}
              floatOffset={phone.floatOffset}
              shouldReduce={shouldReduce}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </SectionRoom>
  );
}
