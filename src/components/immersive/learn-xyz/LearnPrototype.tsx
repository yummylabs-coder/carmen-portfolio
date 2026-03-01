"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useCallback } from "react";
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
      className="w-[180px] shrink-0 sm:w-[200px] md:w-[220px]"
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

/* ── Mobile carousel dots ────────────────────────────────────────── */

function CarouselDots({
  count,
  current,
  onSelect,
}: {
  count: number;
  current: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="mt-6 flex justify-center gap-2.5 lg:hidden">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className="h-2 w-2 rounded-full transition-all duration-200"
          style={{
            backgroundColor: "currentColor",
            opacity: i === current ? 1 : 0.25,
          }}
          aria-label={`Go to screen ${i + 1}`}
        />
      ))}
    </div>
  );
}

/* ── Main section ────────────────────────────────────────────────── */

const phones = [
  { src: IMAGES.learning1, alt: "AI-generated lesson intro — Understanding Edge Computing", floatOffset: 8 },
  { src: IMAGES.learning2, alt: "Lesson slide with reading content and navigation", floatOffset: -6 },
  { src: IMAGES.learning3, alt: "AI follow-up questions after completing a lesson", floatOffset: 10 },
  { src: IMAGES.learning4, alt: "Personalized next steps with goals and badges", floatOffset: -7 },
];

export function LearnPrototype() {
  const room = learnRooms.prototype;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();
  const [mobileIndex, setMobileIndex] = useState(0);

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
      const swipe = info.offset.x;
      const velocity = info.velocity.x;
      if (swipe > 50 || velocity > 300) {
        setMobileIndex((c) => Math.max(0, c - 1));
      } else if (swipe < -50 || velocity < -300) {
        setMobileIndex((c) => Math.min(phones.length - 1, c + 1));
      }
    },
    [],
  );

  return (
    <SectionRoom colors={room}>
      <div ref={ref} className="flex flex-col items-center text-center">
        <SectionLabel accentColor={room.accent}>Learning Experience</SectionLabel>
        <LineMask
          as="h2"
          className="mb-6 text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.02] tracking-tight"
          delay={0.15}
        >
          {"Bite-sized lessons\npowered by AI."}
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
          AI generates micro-lessons learners can finish in minutes. When
          they&apos;re done, follow-up questions deepen understanding and
          personalized next steps keep the momentum going.
        </motion.p>

        {/* Desktop: 4 phones side by side */}
        <div className="hidden lg:flex lg:items-center lg:justify-center lg:gap-8">
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

        {/* Mobile: swipeable carousel */}
        <div className="w-full overflow-hidden lg:hidden">
          <motion.div
            className="flex justify-center"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            style={{ touchAction: "pan-y" }}
          >
            <PhoneFrame
              src={phones[mobileIndex].src}
              alt={phones[mobileIndex].alt}
              delay={0.5}
              floatOffset={phones[mobileIndex].floatOffset}
              shouldReduce={shouldReduce}
              inView={inView}
            />
          </motion.div>
          <CarouselDots
            count={phones.length}
            current={mobileIndex}
            onSelect={setMobileIndex}
          />
        </div>
      </div>
    </SectionRoom>
  );
}
