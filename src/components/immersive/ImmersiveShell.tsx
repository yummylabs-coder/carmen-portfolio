"use client";

/**
 * ImmersiveShell — full-screen layout for immersive case studies.
 *
 * Replaces DashboardShell for case studies that need to break free
 * from the sidebar. Provides:
 * - Full viewport (no sidebar offset)
 * - Floating back button (top-left)
 * - Scroll progress bar
 * - Exit animation support
 */

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef, type ReactNode } from "react";
import { ease, duration } from "@/lib/motion";
import { usePageTransition } from "@/components/transitions/PageTransitionContext";

interface ImmersiveShellProps {
  children: ReactNode;
  /** Brand accent color for the progress bar */
  progressColor?: string;
  /** Background color for the back button area */
  backButtonBg?: string;
}

export function ImmersiveShell({
  children,
  progressColor = "#2216FF",
  backButtonBg = "rgba(255,255,255,0.9)",
}: ImmersiveShellProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const { isTransitioning } = usePageTransition();

  // Extra delay when arriving via curtain transition so shell UI
  // doesn't appear before the curtain finishes revealing
  const shellDelay = isTransitioning ? 1.2 : 0.8;

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-x-hidden">
      {/* Progress bar */}
      <motion.div
        className="fixed left-0 top-0 z-[80] h-1 w-full origin-left"
        style={{
          scaleX,
          backgroundColor: progressColor,
        }}
      />

      {/* Floating back button */}
      <motion.button
        onClick={() => router.push("/work")}
        className="fixed left-5 top-5 z-[70] flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-medium shadow-lg backdrop-blur-md transition-colors hover:scale-[1.02] active:scale-[0.98]"
        style={{
          backgroundColor: backButtonBg,
          color: "#300101",
        }}
        initial={shouldReduce ? { opacity: 1 } : { opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: duration.slow,
          delay: shellDelay,
          ease: ease.expo,
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="opacity-60"
        >
          <path
            d="M10 12L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back
      </motion.button>

      {/* Content */}
      <main className="relative z-10">{children}</main>
    </div>
  );
}
