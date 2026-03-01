"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { LineMask } from "../LineMask";
import { SectionRoom } from "../SectionRoom";
import { learnRooms, ease, duration } from "@/lib/motion";
import { PROBLEM } from "./LearnData";

export function LearnProblem() {
  const room = learnRooms.problem;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  return (
    <SectionRoom colors={room} className="flex items-center justify-center">
      <div ref={ref} className="relative flex flex-col items-center text-center">
        {/* Giant "80%" watermark — dramatic, visible, animated */}
        <motion.span
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-extrabold leading-none"
          style={{
            fontSize: "clamp(12rem, 35vw, 28rem)",
            color: room.accent,
            opacity: 0,
          }}
          animate={
            inView
              ? {
                  opacity: [0, 0.15, 0.1],
                  scale: shouldReduce ? 1 : [0.8, 1.02, 1],
                  filter: shouldReduce
                    ? "blur(0px)"
                    : ["blur(8px)", "blur(0px)", "blur(0px)"],
                }
              : {}
          }
          transition={{
            duration: 1.8,
            delay: 0.2,
            ease: ease.expo,
            times: [0, 0.6, 1],
          }}
        >
          {PROBLEM.stat}
        </motion.span>

        {/* Content — centered */}
        <div className="relative z-10 mx-auto max-w-[800px]">
          <LineMask
            as="h2"
            className="mb-8 text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1.02] tracking-tight"
            delay={0.1}
          >
            {PROBLEM.headline}
          </LineMask>

          <motion.p
            className="mx-auto max-w-[600px] text-[18px] leading-[1.8] opacity-80"
            initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 0.8, y: 0 } : {}}
            transition={{
              delay: 0.6,
              duration: duration.slow,
              ease: ease.standard,
            }}
          >
            {PROBLEM.body}
          </motion.p>
        </div>
      </div>
    </SectionRoom>
  );
}
