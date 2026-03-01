"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { LineMask } from "../LineMask";
import { SectionRoom, SectionLabel } from "../SectionRoom";
import { learnRooms, ease, duration } from "@/lib/motion";
import { BET, IMAGES } from "./LearnData";

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

        {/* Right col: phone */}
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
          {/* iPhone frame */}
          <div
            className="w-[220px] sm:w-[260px]"
            style={{
              filter:
                "drop-shadow(0 20px 40px rgba(48,1,1,0.2)) drop-shadow(0 8px 16px rgba(48,1,1,0.1))",
            }}
          >
            <div className="overflow-hidden rounded-[40px] border-[8px] border-[#1d1d1f] bg-[#1d1d1f]">
              <div className="relative overflow-hidden rounded-[32px] bg-black">
                <div className="absolute left-1/2 top-[10px] z-20 h-[22px] w-[80px] -translate-x-1/2 rounded-full bg-black" />
                <div className="relative aspect-[9/19.5] w-full overflow-hidden bg-white">
                  <Image
                    src={IMAGES.gifMobile}
                    alt="Learn.xyz mobile app swipe interaction"
                    fill
                    className="object-cover object-top"
                    sizes="260px"
                    unoptimized
                  />
                </div>
                <div className="absolute bottom-[6px] left-1/2 z-20 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-white/30" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionRoom>
  );
}
