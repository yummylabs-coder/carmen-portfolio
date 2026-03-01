"use client";

import {
  motion,
  useInView,
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
import { learnRooms, ease } from "@/lib/motion";
import { DASHBOARD, IMAGES } from "./LearnData";

/* ── Floating illustration with scroll + float + rotate ──────────── */

interface FloatingIllustrationProps {
  src: string;
  alt: string;
  /** Size in px (width) — responsive via clamp */
  size: string;
  /** Positioned via absolute — top/left/right/bottom in % */
  style: React.CSSProperties;
  /** Scroll-driven Y range [from, to] in px */
  scrollY: [number, number];
  /** Float offset in px */
  floatOffset: number;
  /** Rotation range [from, to] in degrees */
  rotateRange: [number, number];
  /** Stagger delay */
  delay: number;
  shouldReduce: boolean | null;
  inView: boolean;
  scrollProgress: import("framer-motion").MotionValue<number>;
}

function FloatingIllustration({
  src,
  alt,
  size,
  style,
  scrollY,
  floatOffset,
  rotateRange,
  delay,
  shouldReduce,
  inView,
  scrollProgress,
}: FloatingIllustrationProps) {
  const y = useTransform(
    scrollProgress,
    [0, 1],
    shouldReduce ? [0, 0] : scrollY,
  );
  const rotate = useTransform(
    scrollProgress,
    [0, 1],
    shouldReduce ? [0, 0] : rotateRange,
  );

  return (
    <motion.div
      className="absolute"
      style={{
        width: size,
        ...style,
        y,
        rotate,
      }}
      initial={shouldReduce ? {} : { opacity: 0, scale: 0.6 }}
      animate={
        inView
          ? {
              opacity: 1,
              scale: shouldReduce
                ? 1
                : [1, 1.04, 1],
            }
          : {}
      }
      transition={
        inView && !shouldReduce
          ? {
              opacity: { delay, duration: 0.8, ease: ease.expo },
              scale: {
                delay,
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror" as const,
              },
            }
          : { delay, duration: 0.6, ease: ease.expo }
      }
    >
      <Image
        src={src}
        alt={alt}
        width={600}
        height={600}
        className="h-auto w-full"
        sizes={size}
      />
    </motion.div>
  );
}

/* ── Illustration config ─────────────────────────────────────────── */

const illustrations = [
  {
    src: IMAGES.gamifyTarget,
    alt: "Target achievement illustration",
    size: "clamp(140px, 18vw, 260px)",
    style: { top: "2%", left: "3%" },
    scrollY: [-40, 40] as [number, number],
    floatOffset: 8,
    rotateRange: [-8, 8] as [number, number],
    delay: 0.1,
  },
  {
    src: IMAGES.gamifyTreasure,
    alt: "Treasure chest reward illustration",
    size: "clamp(150px, 20vw, 280px)",
    style: { top: "8%", right: "5%" },
    scrollY: [-50, 30] as [number, number],
    floatOffset: -6,
    rotateRange: [5, -5] as [number, number],
    delay: 0.2,
  },
  {
    src: IMAGES.gamifyMountain,
    alt: "Mountain peak achievement illustration",
    size: "clamp(160px, 22vw, 300px)",
    style: { top: "38%", left: "8%" },
    scrollY: [-30, 50] as [number, number],
    floatOffset: 10,
    rotateRange: [-6, 10] as [number, number],
    delay: 0.3,
  },
  {
    src: IMAGES.gamifyBadge,
    alt: "Graduation badge illustration",
    size: "clamp(120px, 16vw, 220px)",
    style: { top: "42%", right: "10%" },
    scrollY: [-20, 60] as [number, number],
    floatOffset: -8,
    rotateRange: [8, -4] as [number, number],
    delay: 0.35,
  },
  {
    src: IMAGES.gamifyBurst,
    alt: "Achievement burst illustration",
    size: "clamp(140px, 19vw, 270px)",
    style: { bottom: "4%", left: "50%", transform: "translateX(-50%)" },
    scrollY: [-60, 20] as [number, number],
    floatOffset: 7,
    rotateRange: [-10, 6] as [number, number],
    delay: 0.45,
  },
];

/* ── Main section ────────────────────────────────────────────────── */

export function LearnDashboard() {
  const room = learnRooms.dashboard;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  const illustrationRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: illustrationRef,
    offset: ["start end", "end start"],
  });

  const slides = DASHBOARD.screens.map((s) => ({
    src: IMAGES[s.src],
    alt: s.alt,
    caption: s.caption,
  }));

  return (
    <SectionRoom colors={room}>
      <div ref={ref}>
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

        {/* Gamification illustrations — scattered, floating, scroll-driven */}
        <div
          ref={illustrationRef}
          className="relative mx-auto mt-20 h-[60vw] max-h-[600px] min-h-[400px] w-full max-w-[1100px] overflow-hidden"
        >
          {illustrations.map((ill, i) => (
            <FloatingIllustration
              key={i}
              {...ill}
              shouldReduce={shouldReduce}
              inView={inView}
              scrollProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </SectionRoom>
  );
}
