"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { LineMask } from "../LineMask";
import { SectionRoom, SectionLabel } from "../SectionRoom";
import { AnimatedCounter } from "../AnimatedCounter";
import { learnRooms, ease, duration } from "@/lib/motion";
import { OUTCOMES } from "./LearnData";

export function LearnOutcomes() {
  const room = learnRooms.outcomes;
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();

  return (
    <SectionRoom colors={room} className="flex items-center">
      <SectionLabel accentColor={room.accent}>Outcomes</SectionLabel>

      {/* Big headline with scale + line mask */}
      <div className="mb-16">
        <LineMask
          as="h2"
          className="text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold leading-[1.02] tracking-tight"
          delay={0.15}
        >
          {OUTCOMES.headline}
        </LineMask>
      </div>

      {/* Stats grid */}
      <div ref={statsRef} className="grid grid-cols-2 gap-8 md:gap-12">
        {OUTCOMES.stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="space-y-2"
            initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: i * 0.2,
              duration: duration.normal,
              ease: ease.expo,
            }}
          >
            <div className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-none tracking-tight">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                delay={i * 0.2}
              />
            </div>
            <p className="text-[14px] opacity-60">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Closing line */}
      <motion.p
        className="mt-16 max-w-[480px] text-[15px] leading-relaxed opacity-50"
        initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
        animate={statsInView ? { opacity: 0.5, y: 0 } : {}}
        transition={{ delay: 1.2, duration: duration.slow, ease: ease.standard }}
      >
        {OUTCOMES.closingLine}
      </motion.p>
    </SectionRoom>
  );
}
