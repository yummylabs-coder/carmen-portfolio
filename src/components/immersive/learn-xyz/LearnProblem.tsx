"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { LineMask } from "../LineMask";
import {
  SectionRoom,
  SectionBody,
} from "../SectionRoom";
import { learnRooms, ease } from "@/lib/motion";
import { PROBLEM } from "./LearnData";

export function LearnProblem() {
  const room = learnRooms.problem;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  return (
    <SectionRoom colors={room} className="flex items-center">
      <div ref={ref} className="relative">
        {/* Giant "80%" watermark behind text */}
        <motion.span
          className="pointer-events-none absolute -left-4 top-1/2 -translate-y-1/2 select-none font-bold leading-none"
          style={{
            fontSize: "clamp(8rem, 25vw, 20rem)",
            color: `${room.accent}08`,
          }}
          initial={shouldReduce ? {} : { opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: ease.expo }}
        >
          {PROBLEM.stat}
        </motion.span>

        {/* Content */}
        <div className="relative z-10">
          <LineMask
            as="h2"
            className="mb-8 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight"
            delay={0.1}
          >
            {PROBLEM.headline}
          </LineMask>

          <SectionBody className="text-[17px] leading-[1.8]">
            {PROBLEM.body}
          </SectionBody>
        </div>
      </div>
    </SectionRoom>
  );
}
