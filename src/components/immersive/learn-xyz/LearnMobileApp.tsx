"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { LineMask } from "../LineMask";
import {
  SectionRoom,
  SectionLabel,
} from "../SectionRoom";
import { DeviceCarousel } from "../DeviceCarousel";
import { learnRooms, ease, duration } from "@/lib/motion";
import { MOBILE_APP, IMAGES } from "./LearnData";

export function LearnMobileApp() {
  const room = learnRooms.mobileApp;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  const slides = MOBILE_APP.screens.map((s) => ({
    src: IMAGES[s.src],
    alt: s.alt,
    caption: s.caption,
  }));

  return (
    <SectionRoom colors={room}>
      <SectionLabel accentColor={room.accent}>Mobile App</SectionLabel>

      {/* Headline — full width, above the split layout */}
      <LineMask
        as="h2"
        className="mb-8 text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.02] tracking-tight"
        delay={0.15}
      >
        {MOBILE_APP.headline}
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
            {MOBILE_APP.body}
          </motion.p>
        </div>

        {/* Right: Phone carousel */}
        <motion.div
          className="flex flex-1 justify-center lg:justify-end"
          initial={shouldReduce ? {} : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: 0.4,
            duration: duration.slower,
            ease: ease.expo,
          }}
        >
          <DeviceCarousel
            slides={slides}
            device="phone"
            autoplay={3.5}
          />
        </motion.div>
      </div>

      {/* Interactive prototype GIF — separate visual below */}
      <motion.div
        className="mt-24"
        initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{
          delay: 0.8,
          duration: duration.slow,
          ease: ease.expo,
        }}
      >
        <div className="mx-auto max-w-[400px] overflow-hidden rounded-[28px] shadow-xl">
          <Image
            src={IMAGES.gifMobile}
            alt="Learn.xyz mobile app interactive prototype"
            width={400}
            height={711}
            className="h-auto w-full"
            unoptimized
          />
        </div>
        <p className="mt-3 text-center text-[13px] italic opacity-30">
          Interactive prototype: swipe through a real lesson flow
        </p>
      </motion.div>
    </SectionRoom>
  );
}
