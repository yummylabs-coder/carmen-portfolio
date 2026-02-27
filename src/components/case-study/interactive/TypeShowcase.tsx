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
 * Clean card layout with dividers between each type scale sample.
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
    <div
      ref={ref}
      className={`overflow-hidden rounded-2xl border border-sand-200 bg-sand-50 ${className ?? ""}`}
    >
      {/* Load Google Font if provided */}
      {googleFontUrl && (
        // eslint-disable-next-line @next/next/no-page-custom-font
        <link rel="stylesheet" href={googleFontUrl} />
      )}

      {/* Header — font name + category */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex items-baseline justify-between border-b border-sand-200 px-6 py-5 sm:px-8"
      >
        <span
          className="text-[22px] font-bold text-brand-ink sm:text-[26px]"
          style={{ fontFamily: `'${fontName}', sans-serif` }}
        >
          {fontName}
        </span>
        {fontCategory && (
          <span className="text-12 text-neutral-400">{fontCategory}</span>
        )}
      </motion.div>

      {/* Character set row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
        className="border-b border-sand-200 bg-white px-6 py-4 sm:px-8"
      >
        <p
          className="text-[15px] leading-loose tracking-[0.06em] text-neutral-400"
          style={{ fontFamily: `'${fontName}', sans-serif` }}
        >
          Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv
          Ww Xx Yy Zz 0123456789
        </p>
      </motion.div>

      {/* Type scale samples */}
      <div className="divide-y divide-sand-200">
        {samples.map((sample, i) => (
          <motion.div
            key={sample.label + i}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{
              duration: 0.4,
              delay: 0.12 + i * 0.06,
              ease: "easeOut",
            }}
            className="px-6 py-5 sm:px-8"
          >
            <div className="mb-2.5 flex items-center justify-between gap-4">
              <span className="text-11 font-semibold uppercase tracking-widest text-neutral-400">
                {sample.label}
              </span>
              <span className="shrink-0 rounded-full border border-sand-200 bg-white px-2.5 py-0.5 font-mono text-10 text-neutral-300">
                {sample.fontWeight ?? 400} · {sample.fontSize}px
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
