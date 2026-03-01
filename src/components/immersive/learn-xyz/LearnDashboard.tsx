"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { LineMask } from "../LineMask";
import {
  SectionRoom,
  SectionLabel,
  SectionBody,
  SectionVisual,
} from "../SectionRoom";
import { DeviceCarousel } from "../DeviceCarousel";
import { learnRooms } from "@/lib/motion";
import { DASHBOARD, IMAGES } from "./LearnData";

/* ── Illustration config ─────────────────────────────────────────── */

const illustrations = [
  { src: IMAGES.gamifyTarget, alt: "Target achievement" },
  { src: IMAGES.gamifyMountain, alt: "Mountain peak achievement" },
  { src: IMAGES.gamifyBurst, alt: "Achievement burst" },
  { src: IMAGES.gamifyTreasure, alt: "Treasure chest reward" },
  { src: IMAGES.gamifyBadge, alt: "Graduation badge" },
];

/* ── Main section ────────────────────────────────────────────────── */

export function LearnDashboard() {
  const room = learnRooms.dashboard;
  const shouldReduce = useReducedMotion();

  const slides = DASHBOARD.screens.map((s) => ({
    src: IMAGES[s.src],
    alt: s.alt,
    caption: s.caption,
  }));

  /* Scroll-driven horizontal slide for illustrations (like the 80%) */
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduce ? ["0%", "0%"] : ["30%", "-60%"],
  );

  return (
    <SectionRoom colors={room}>
      <SectionLabel accentColor={room.accent}>Web Dashboard</SectionLabel>

      <LineMask
        as="h2"
        className="mb-8 text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.02] tracking-tight"
        delay={0.15}
      >
        {DASHBOARD.headline}
      </LineMask>

      <SectionBody>{DASHBOARD.body}</SectionBody>

      <SectionVisual className="mt-16">
        <DeviceCarousel slides={slides} device="laptop" autoplay={5} />
      </SectionVisual>

      {/* Gamification illustrations — horizontal row, scroll-driven slide */}
      <div
        ref={rowRef}
        className="mt-20"
        style={{ marginLeft: "calc(-50vw + 50%)", marginRight: "calc(-50vw + 50%)", width: "100vw" }}
      >
        <motion.div
          className="flex items-center justify-center gap-8 sm:gap-12 md:gap-16"
          style={{ x }}
        >
          {illustrations.map((ill, i) => (
            <div
              key={i}
              className="w-[clamp(160px,22vw,300px)] shrink-0"
            >
              <Image
                src={ill.src}
                alt={ill.alt}
                width={600}
                height={600}
                className="h-auto w-full"
                sizes="(min-width: 1024px) 300px, 22vw"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </SectionRoom>
  );
}
