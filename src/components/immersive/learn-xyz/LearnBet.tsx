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
    <SectionRoom colors={room} className="flex items-center">
      <SectionLabel accentColor={room.accent}>The Bet</SectionLabel>

      {/* Headline — full width, above the split layout */}
      <LineMask
        as="h2"
        className="mb-8 text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.02] tracking-tight"
        delay={0.1}
      >
        {BET.headline}
      </LineMask>

      <div
        ref={ref}
        className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20"
      >
        {/* Left: Body text */}
        <div className="flex-1">
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

        {/* Right: Mobile app GIF in phone frame */}
        <motion.div
          className="flex flex-1 justify-center lg:justify-end"
          initial={shouldReduce ? {} : { opacity: 0, y: 30, scale: 0.96 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            delay: 0.4,
            duration: duration.slower,
            ease: ease.expo,
          }}
        >
          <div className="relative w-[240px] sm:w-[280px]">
            {/* Phone frame */}
            <div
              className="relative overflow-hidden rounded-[28px] shadow-2xl"
              style={{
                aspectRatio: "9/19",
                boxShadow:
                  "0 20px 60px rgba(48,1,1,0.2), 0 4px 12px rgba(48,1,1,0.08)",
              }}
            >
              <Image
                src={IMAGES.gifMobile}
                alt="Learn.xyz mobile app swipe interaction"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            {/* Phone chin */}
            <div
              className="mx-auto mt-1.5 h-1 w-1/3 rounded-full"
              style={{ backgroundColor: `${room.text}15` }}
            />
          </div>
        </motion.div>
      </div>
    </SectionRoom>
  );
}
