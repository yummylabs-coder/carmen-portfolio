"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Floating card overlays for the Neotaste atmospheric image.
 * Two restaurant cards positioned like Learn.xyz's overlay pattern:
 * - Card 1 (burger): bottom-left, tilted slightly
 * - Card 2 (poke + "Approved" badge): top-right, tilted opposite
 * Both float gently with Framer Motion infinite animation.
 */
export function NeotasteAtmosphericOverlay() {
  return (
    <div className="relative mx-auto h-full w-full max-w-[1200px]">
      {/* Card 1 — centered on mobile, bottom-left on desktop */}
      <motion.div
        className="absolute inset-0 m-auto h-fit w-[calc(100%-3rem)] max-w-[320px] sm:inset-auto sm:bottom-[8%] sm:left-[4%] sm:m-0 sm:w-[clamp(180px,22vw,280px)] sm:max-w-none"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <motion.div
          className="drop-shadow-2xl"
          animate={{
            y: [-6, 6, -6],
            rotate: [-1.5, 1.5, -1.5],
          }}
          transition={{
            duration: 5.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/images/neotaste/overlay-card-1.png"
            alt="Gourmet Burger Kitchen restaurant card with friend ratings"
            width={696}
            height={867}
            className="h-auto w-full rounded-2xl"
            sizes="(min-width: 640px) 22vw, calc(100vw - 3rem)"
          />
        </motion.div>
      </motion.div>

      {/* Card 2 — top-right (hidden on small mobile) */}
      <motion.div
        className="absolute right-[4%] top-[8%] hidden w-[clamp(180px,24vw,320px)] sm:block"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      >
        <motion.div
          className="drop-shadow-2xl"
          animate={{
            y: [-5, 5, -5],
            rotate: [1, -1, 1],
          }}
          transition={{
            duration: 4.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        >
          <Image
            src="/images/neotaste/overlay-card-2.png"
            alt="Poke Heaven restaurant card with Approved badge"
            width={808}
            height={898}
            className="h-auto w-full rounded-2xl"
            sizes="(min-width: 1024px) 320px, 24vw"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
