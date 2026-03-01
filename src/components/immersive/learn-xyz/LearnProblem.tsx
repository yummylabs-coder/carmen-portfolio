"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
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

  /* Scroll-driven horizontal slide for the "80%" */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduce ? ["0%", "0%"] : ["-150%", "150%"]
  );

  return (
    <SectionRoom
      colors={room}
      className="flex items-center justify-center overflow-hidden"
    >
      <div
        ref={ref}
        className="flex flex-col items-center text-center"
      >
        {/* Content — centered, sits above the sliding 80 */}
        <div className="relative z-10 mx-auto max-w-[1000px]">
          <LineMask
            as="h2"
            className="mb-8 text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1.02] tracking-tight"
            delay={0.1}
          >
            {PROBLEM.headline}
          </LineMask>

          <motion.p
            className="mx-auto max-w-[640px] text-[18px] leading-[1.8] opacity-80"
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

        {/* Giant "80%" — scroll-driven horizontal slide, below the copy */}
        <motion.div
          className="pointer-events-none mt-10 select-none whitespace-nowrap font-extrabold leading-none"
          style={{
            fontSize: "clamp(8rem, 28vw, 22rem)",
            color: "#FECB3A",
            opacity: 0.2,
            x,
          }}
        >
          {PROBLEM.stat}
        </motion.div>
      </div>
    </SectionRoom>
  );
}
