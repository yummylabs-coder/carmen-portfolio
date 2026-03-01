"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { LineMask } from "../LineMask";
import { learnRooms, ease, duration, stagger } from "@/lib/motion";
import { HERO, IMAGES } from "./LearnData";

export function LearnHero() {
  const room = learnRooms.hero;
  const shouldReduce = useReducedMotion();

  const fadeUp = (i: number) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: duration.normal,
            delay: 0.6 + i * stagger.hero,
            ease: ease.standard,
          },
        };

  return (
    <section
      className="relative flex min-h-screen w-full items-center overflow-hidden"
      style={{ backgroundColor: room.bg }}
    >
      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-start gap-12 px-6 py-24 md:flex-row md:items-center md:gap-16 md:px-16 lg:px-24">
        {/* Left column: text */}
        <div className="flex-1 space-y-6">
          {/* Meta line */}
          <motion.p
            className="text-[13px] font-medium tracking-wide"
            style={{ color: room.accent }}
            {...fadeUp(0)}
          >
            {HERO.meta}
          </motion.p>

          {/* Headline */}
          <LineMask
            as="h1"
            className="font-brand text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight"
            delay={0.7}
          >
            {HERO.headline}
          </LineMask>

          {/* Service tags */}
          <motion.div className="flex flex-wrap gap-2" {...fadeUp(4)}>
            {HERO.services.map((s) => (
              <span
                key={s}
                className="rounded-lg border px-3 py-1.5 text-[12px] font-medium"
                style={{
                  borderColor: `${room.text}20`,
                  color: room.text,
                  backgroundColor: `${room.text}08`,
                }}
              >
                {s}
              </span>
            ))}
          </motion.div>

          {/* Platform badges */}
          <motion.div className="flex gap-2" {...fadeUp(5)}>
            {HERO.platforms.map((p) => (
              <span
                key={p}
                className="rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider"
                style={{
                  backgroundColor: room.text,
                  color: room.bg,
                }}
              >
                {p}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right column: hero image */}
        <motion.div
          className="relative flex-1"
          initial={shouldReduce ? {} : { opacity: 0, x: 30, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            duration: duration.slower,
            delay: 1.0,
            ease: ease.expo,
          }}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src={IMAGES.hero}
              alt="Learn.xyz product overview"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="h-8 w-[1px]"
          style={{ backgroundColor: room.text }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </section>
  );
}
