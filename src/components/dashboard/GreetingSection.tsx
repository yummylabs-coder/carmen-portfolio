"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function GreetingSection() {
  const greeting = useMemo(() => getGreeting(), []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative"
    >
      <div className="flex flex-col gap-1">
        <h1 className="font-brand text-22 font-bold leading-[1.25] text-brand-ink">
          {greeting}, friend{" "}
          <span role="img" aria-label="wave">
            👋
          </span>
        </h1>
        <p className="max-w-[700px] text-14 leading-[1.6] text-neutral-400">
          Welcome to my cozy corner of the internet, I&apos;m glad you stopped
          by.
        </p>
      </div>
    </motion.section>
  );
}
