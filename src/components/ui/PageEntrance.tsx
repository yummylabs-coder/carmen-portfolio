"use client";

import { motion } from "framer-motion";
import { Children, type ReactNode } from "react";

/**
 * Wraps page content and staggers each direct child with a cinematic
 * fade-up entrance on first render.
 */
export function PageEntrance({ children }: { children: ReactNode }) {
  const items = Children.toArray(children);

  return (
    <div className="flex flex-col gap-6">
      {items.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.08 + i * 0.1,
            duration: 0.45,
            ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
