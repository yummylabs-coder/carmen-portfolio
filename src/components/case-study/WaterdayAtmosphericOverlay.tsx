"use client";

import { motion } from "framer-motion";

/**
 * Centered text overlay for the Water.day atmospheric image.
 * Shows "70% of your body is water" with a staggered entrance.
 */
export function WaterdayAtmosphericOverlay() {
  return (
    <div className="relative flex flex-col items-center text-center">
      {/* "70%" — large, bold, staggered entrance */}
      <motion.span
        initial={{ opacity: 0, y: 40, scale: 0.85 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="font-brand text-[clamp(104px,18vw,180px)] font-extrabold leading-none text-white drop-shadow-[0_6px_40px_rgba(0,0,0,0.5)]"
      >
        70%
      </motion.span>

      {/* Subtitle — fades in after the number */}
      <motion.span
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="mt-1 text-[clamp(21px,2.5vw,22px)] font-medium tracking-[0.06em] text-white/85 drop-shadow-[0_2px_14px_rgba(0,0,0,0.35)]"
      >
        of your body is water
      </motion.span>
    </div>
  );
}
