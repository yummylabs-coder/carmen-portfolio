"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const smooth = [0.25, 0.1, 0.25, 1] as const;

/**
 * Three stacked "Did you know?" fact cards for the Water.day hero.
 * Back & middle cards peek out; front card is fully visible.
 * Each card floats and rotates on a different axis.
 */

const CARDS = [
  {
    src: "/images/water-day/hero-card-back.png",
    alt: "Water.day fact card — abstract pattern",
    z: 1,
    // Offset from center (back card peeks top-left)
    x: -18,
    y: -24,
    rotate: -2.5,
    // Float animation
    float: {
      y: [-3, 3, -3],
      rotateZ: [-2.5, -1.5, -2.5],
      rotateY: [0.5, -0.5, 0.5],
      duration: 5.5,
      delay: 0,
    },
  },
  {
    src: "/images/water-day/hero-card-mid.png",
    alt: "Water.day fact card — apple illustration",
    z: 2,
    // Middle card peeks top-right
    x: 10,
    y: -14,
    rotate: 1.5,
    float: {
      y: [-2, 2, -2],
      rotateZ: [1.5, 2.5, 1.5],
      rotateX: [-0.5, 0.5, -0.5],
      duration: 4.8,
      delay: 0.3,
    },
  },
  {
    src: "/images/water-day/hero-card-front.png",
    alt: "Water.day fact card — Why a Simple Bend Changes Everything",
    z: 3,
    // Front card, centered
    x: 0,
    y: 6,
    rotate: 1.5,
    float: {
      y: [-2, 2, -2],
      rotateZ: [1.5, 0.5, 1.5],
      rotateX: [0.3, -0.3, 0.3],
      rotateY: [-0.3, 0.3, -0.3],
      duration: 5.2,
      delay: 0.6,
    },
  },
];

export function WaterdayHeroVisual() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[260px] sm:max-w-[340px]"
      style={{ aspectRatio: "340/520", perspective: "800px" }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: smooth }}
    >
      {CARDS.map((card, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            zIndex: card.z,
            transformStyle: "preserve-3d",
          }}
          initial={{
            opacity: 0,
            x: card.x,
            y: card.y + 30,
            rotate: card.rotate,
          }}
          animate={
            shouldReduce
              ? { opacity: 1, x: card.x, y: card.y, rotate: card.rotate }
              : {
                  opacity: 1,
                  x: card.x,
                  y: card.float.y.map((v) => v + card.y),
                  rotateZ: card.float.rotateZ,
                  rotateX: card.float.rotateX || [0, 0, 0],
                  rotateY: card.float.rotateY || [0, 0, 0],
                }
          }
          transition={
            shouldReduce
              ? { duration: 0.6, delay: 0.2 + i * 0.15, ease: "easeOut" }
              : {
                  opacity: { duration: 0.6, delay: 0.2 + i * 0.15, ease: "easeOut" },
                  x: { duration: 0.6, delay: 0.2 + i * 0.15, ease: "easeOut" },
                  y: {
                    duration: card.float.duration,
                    delay: card.float.delay + 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  rotateZ: {
                    duration: card.float.duration,
                    delay: card.float.delay + 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  rotateX: {
                    duration: card.float.duration * 1.2,
                    delay: card.float.delay + 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  rotateY: {
                    duration: card.float.duration * 1.1,
                    delay: card.float.delay + 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
          }
        >
          <Image
            src={card.src}
            alt={card.alt}
            width={716}
            height={1094}
            className="h-full w-full rounded-[20px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
            sizes="(max-width: 1024px) 80vw, 340px"
            priority={i === 2}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
