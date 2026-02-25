"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeGreeting {
  text: string;
  emoji: string;
  label: string;
}

function getGreeting(): TimeGreeting {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12)
    return { text: "Good morning", emoji: "\u{1F305}", label: "sunrise" };
  if (hour >= 12 && hour < 18)
    return { text: "Good afternoon", emoji: "\u2600\uFE0F", label: "sun" };
  return { text: "Good evening", emoji: "\u{1F319}", label: "moon" };
}

const availabilityPhrases = [
  "Available for collaborations",
  "Open to brainstorming",
  "Open to experiences",
  "Open to partnerships",
  "Open to networking",
];

export function GreetingSection() {
  const greeting = useMemo(() => getGreeting(), []);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % availabilityPhrases.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative">
      <div className="flex flex-col gap-2">
        {/* Top row: badge above heading on mobile, side-by-side on desktop */}
        <div className="flex flex-col-reverse items-start gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          {/* Heading — first thing to appear */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
            className="font-brand text-22 font-bold leading-[1.25] text-brand-ink"
          >
            {greeting.text}, friend{" "}
            <motion.span
              role="img"
              aria-label={greeting.label}
              className="inline-block origin-center"
              initial={{ opacity: 0, scale: 0, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.6,
                type: "spring",
                stiffness: 260,
                damping: 12,
              }}
            >
              <motion.span
                className="inline-block"
                animate={
                  greeting.label === "moon"
                    ? { rotate: [0, -10, 10, -5, 0], y: [0, -2, 0] }
                    : greeting.label === "sun"
                      ? { rotate: [0, 15, -15, 10, 0], scale: [1, 1.15, 1, 1.1, 1] }
                      : { y: [0, -6, 0, -3, 0], rotate: [0, 5, -5, 0] }
                }
                transition={{
                  duration: 2.5,
                  delay: 1.2,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "easeInOut",
                }}
              >
                {greeting.emoji}
              </motion.span>
            </motion.span>
          </motion.h1>

          {/* Availability badge — pops in after heading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.4, type: "spring", stiffness: 300, damping: 20 }}
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1"
          >
            <span className="relative flex h-[6px] w-[6px]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-emerald-500" />
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={phraseIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-11 font-medium text-emerald-700"
              >
                {availabilityPhrases[phraseIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Subtitle — follows the heading */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.4, ease: "easeOut" }}
          className="max-w-[700px] text-14 text-neutral-400"
        >
          Welcome to my cozy corner of the internet. I&apos;m a product designer
          who builds things people genuinely enjoy using.
        </motion.p>
      </div>
    </section>
  );
}
