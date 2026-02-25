"use client";

import { useState, useRef, type ReactNode, Children } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileHeader } from "./MobileHeader";
import { MobileMenu } from "./MobileMenu";
import { SplashScreen } from "./SplashScreen";
import { RotatingFooter } from "./RotatingFooter";

/**
 * Variants for each dashboard section in the entrance cascade.
 * Each section slides up and fades in with a smooth ease.
 */
const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  },
};

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Content stays hidden until the splash signals it's done (or skipped)
  const [contentVisible, setContentVisible] = useState(false);

  // Track whether this visit had a splash — affects cascade timing
  const hadSplash = useRef(true);

  /** Called by SplashScreen when splash doesn't show (already seen) */
  const handleSkipped = () => {
    hadSplash.current = false;
    setContentVisible(true);
  };

  /** Called by SplashScreen after splash fully exits */
  const handleComplete = () => {
    setContentVisible(true);
  };

  return (
    <>
      {/* Splash — communicates via callbacks, never relies on shared storage */}
      <SplashScreen
        onComplete={handleComplete}
        onSkipped={handleSkipped}
      />

      {/* Desktop sidebar — fixed, full height */}
      <Sidebar className="hidden lg:flex" />

      {/* Mobile header */}
      <MobileHeader
        isMenuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((v) => !v)}
      />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Main content — offset by sidebar width on desktop */}
      <main className="flex min-h-screen flex-col pt-[60px] lg:ml-[240px] lg:pt-0">
        <div className="w-full flex-1 px-4 pb-8 pt-8 md:px-6 lg:pl-4 lg:pr-8 lg:pt-12">
          <motion.div
            className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-0 lg:px-7"
            initial="hidden"
            animate={contentVisible ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  // Splash visit: generous stagger for a cinematic cascade
                  // Non-splash: snappy entrance on page load
                  staggerChildren: hadSplash.current ? 0.22 : 0.1,
                  delayChildren: 0,
                },
              },
            }}
          >
            {Children.map(children, (child, i) => (
              <motion.div key={i} variants={sectionVariants}>
                {child}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Soft rotating marquee — sits at the natural bottom of every page */}
        <RotatingFooter />
      </main>
    </>
  );
}
