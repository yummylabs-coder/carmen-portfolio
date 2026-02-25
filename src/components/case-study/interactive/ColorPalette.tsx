"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export interface ColorSwatch {
  name: string;
  hex: string;
  /** Optional: display as a dark swatch (white text) — auto-detected if omitted */
  dark?: boolean;
}

interface ColorPaletteProps {
  colors: ColorSwatch[];
  className?: string;
}

function isDark(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.55;
}

/**
 * Interactive color palette grid.
 * Hover to see the color name; click to copy the hex value.
 * Swatches animate in with staggered reveal on scroll.
 */
export function ColorPalette({ colors, className }: ColorPaletteProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  function handleCopy(hex: string, idx: number) {
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1500);
    });
  }

  return (
    <div ref={ref} className={className}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {colors.map((color, i) => {
          const textDark = color.dark ?? isDark(color.hex);
          return (
            <motion.button
              key={color.hex + i}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 20, scale: 0.95 }
              }
              transition={{
                duration: 0.4,
                delay: i * 0.06,
                ease: "easeOut",
              }}
              onClick={() => handleCopy(color.hex, i)}
              className="group relative flex aspect-[3/2] flex-col items-start justify-end overflow-hidden rounded-xl p-3 text-left transition-transform hover:scale-[1.03] active:scale-[0.98]"
              style={{ backgroundColor: color.hex }}
            >
              {/* Hover overlay */}
              <div
                className={`absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 ${
                  textDark ? "bg-black/10" : "bg-white/10"
                }`}
              />

              {/* Color name */}
              <span
                className={`relative z-10 text-12 font-semibold leading-tight ${
                  textDark ? "text-white" : "text-black/80"
                }`}
              >
                {color.name}
              </span>

              {/* Hex value */}
              <span
                className={`relative z-10 font-mono text-11 ${
                  textDark ? "text-white/60" : "text-black/50"
                }`}
              >
                {copiedIdx === i ? "Copied!" : color.hex}
              </span>

              {/* Copy icon on hover */}
              <div
                className={`absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100 ${
                  textDark ? "text-white/50" : "text-black/30"
                }`}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
