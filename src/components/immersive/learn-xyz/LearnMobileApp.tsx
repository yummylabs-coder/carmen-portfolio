"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { LineMask } from "../LineMask";
import { SectionRoom, SectionLabel } from "../SectionRoom";
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
      {/* One row, two columns: text left, carousel right */}
      <div
        ref={ref}
        className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20"
      >
        {/* Left col: label + headline + body together */}
        <div className="flex-1">
          <SectionLabel accentColor={room.accent}>Mobile App</SectionLabel>
          <LineMask
            as="h2"
            className="mb-6 text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.02] tracking-tight"
            delay={0.15}
          >
            {MOBILE_APP.headline}
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
            {MOBILE_APP.body}
          </motion.p>
        </div>

        {/* Right col: phone carousel */}
        <motion.div
          className="flex shrink-0 justify-center lg:justify-end"
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

    </SectionRoom>
  );
}
