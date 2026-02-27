"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export interface TypeSample {
  /** Display label, e.g. "Display" or "Body" */
  label: string;
  /** The text to render, e.g. "Make AI stick." */
  text: string;
  /** Font family CSS value, e.g. "'Raleway', sans-serif" */
  fontFamily: string;
  /** Font weight, e.g. 700 */
  fontWeight?: number;
  /** Font size in pixels */
  fontSize: number;
  /** Optional letter spacing, e.g. "-0.02em" */
  letterSpacing?: string;
  /** Optional line height */
  lineHeight?: number;
  /** Optional color override */
  color?: string;
}

interface TypeShowcaseProps {
  /** Font family name for the heading, e.g. "Raleway" */
  fontName: string;
  /** Optional font classification, e.g. "Sans-serif" */
  fontCategory?: string;
  /** Array of type samples to render at different sizes */
  samples: TypeSample[];
  /** Optional Google Fonts URL to load */
  googleFontUrl?: string;
  className?: string;
}

/**
 * Live-rendered typography showcase.
 * Renders font samples at multiple sizes/weights with scroll-reveal.
 * Optionally loads a Google Font via <link>.
 */
export function TypeShowcase({
  fontName,
  fontCategory,
  samples,
  googleFontUrl,
  className,
}: TypeShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className={`rounded-2xl border border-sand-200 bg-sand-50 p-6 sm:p-8 ${className ?? ""}`}>
      {/* Load Google Font if provided */}
      {googleFontUrl && (
        // eslint-disable-next-line @next/next/no-page-custom-font
        <link rel="stylesheet" href={googleFontUrl} />
      )}

      {/* Font header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-6 flex items-baseline gap-3"
      >
        <span
          className="text-28 font-bold text-brand-ink"
          style={{ fontFamily: `'${fontName}', sans-serif` }}
        >
          {fontName}
        </span>
        {fontCategory && (
          <span className="text-13 text-neutral-400">{fontCategory}</span>
        )}
      </motion.div>

      {/* Character preview */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="mb-8 overflow-hidden rounded-lg border border-sand-200 bg-white p-4"
      >
        <p
          className="text-13 leading-relaxed text-neutral-400"
          style={{ fontFamily: `'${fontName}', sans-serif` }}
        >
          Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv
          Ww Xx Yy Zz 0123456789
        </p>
      </motion.div>

      {/* Samples */}
      <div className="space-y-6">
        {samples.map((sample, i) => (
          <motion.div
            key={sample.label + i}
            initial={{ opacity: 0, x: -20 }}
            animate={
              isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
            }
            transition={{
              duration: 0.5,
              delay: 0.15 + i * 0.08,
              ease: "easeOut",
            }}
          >
            <div className="mb-1 flex items-baseline gap-3">
              <span className="text-11 font-semibold uppercase tracking-wider text-neutral-400">
                {sample.label}
              </span>
              <span className="font-mono text-11 text-neutral-300">
                {sample.fontWeight ?? 400} / {sample.fontSize}px
              </span>
            </div>
            <p
              style={{
                fontFamily: sample.fontFamily,
                fontWeight: sample.fontWeight ?? 400,
                fontSize: `${sample.fontSize}px`,
                letterSpacing: sample.letterSpacing,
                lineHeight: sample.lineHeight ?? 1.3,
                color: sample.color,
              }}
              className="text-brand-ink"
            >
              {sample.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
