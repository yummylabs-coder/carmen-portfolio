"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { LineMask } from "../LineMask";
import { SectionRoom, SectionLabel } from "../SectionRoom";
import { learnRooms, ease, duration } from "@/lib/motion";
import { IMAGES } from "./LearnData";

export function LearnPrototype() {
  const room = learnRooms.prototype;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  return (
    <SectionRoom colors={room}>
      <div ref={ref}>
        <SectionLabel accentColor={room.accent}>Interactive Prototype</SectionLabel>
        <LineMask
          as="h2"
          className="mb-6 text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.02] tracking-tight"
          delay={0.15}
        >
          {"Try before\nyou ship."}
        </LineMask>

        <motion.p
          className="mx-auto mb-16 max-w-[640px] text-[17px] leading-[1.8] opacity-80"
          initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 0.8, y: 0 } : {}}
          transition={{
            delay: 0.4,
            duration: duration.slow,
            ease: ease.standard,
          }}
        >
          Before writing a single line of production code, we validated every
          interaction in high-fidelity prototypes. Swipe through a real lesson
          flow to feel what learners experience.
        </motion.p>

        {/* Interactive prototype GIF */}
        <motion.div
          className="flex justify-center"
          initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: 0.6,
            duration: duration.slow,
            ease: ease.expo,
          }}
        >
          {/* iPhone frame */}
          <div
            className="mx-auto w-[260px] sm:w-[300px]"
            style={{
              filter:
                "drop-shadow(0 20px 40px rgba(0,0,0,0.2)) drop-shadow(0 8px 16px rgba(0,0,0,0.12))",
            }}
          >
            <div className="overflow-hidden rounded-[40px] border-[8px] border-[#1d1d1f] bg-[#1d1d1f]">
              <div className="relative overflow-hidden rounded-[32px] bg-black">
                <div className="absolute left-1/2 top-[10px] z-20 h-[22px] w-[80px] -translate-x-1/2 rounded-full bg-black" />
                <div className="relative aspect-[9/19.5] w-full overflow-hidden bg-white">
                  <Image
                    src={IMAGES.gifMobile}
                    alt="Learn.xyz mobile app interactive prototype"
                    fill
                    className="object-cover object-top"
                    sizes="300px"
                    unoptimized
                  />
                </div>
                <div className="absolute bottom-[6px] left-1/2 z-20 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-white/30" />
              </div>
            </div>
          </div>
        </motion.div>
        <motion.p
          className="mt-4 text-center text-[13px] italic opacity-30"
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 0.3 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Interactive prototype: swipe through a real lesson flow
        </motion.p>
      </div>
    </SectionRoom>
  );
}
