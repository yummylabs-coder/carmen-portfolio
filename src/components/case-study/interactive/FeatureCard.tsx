"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

export interface FeatureItem {
  /** 1-indexed feature number */
  number: number;
  title: string;
  description: string;
  /** Optional phone mockup image to show on expand/hover */
  mockupSrc?: string;
  /** Alt text for the mockup */
  mockupAlt?: string;
  /** Optional icon (ReactNode) */
  icon?: React.ReactNode;
}

interface FeatureCardProps {
  feature: FeatureItem;
  index: number;
  isInView: boolean;
  accentColor?: string;
}

interface FeatureGridProps {
  features: FeatureItem[];
  /** Number of columns on desktop. Default 3. */
  columns?: 2 | 3;
  /** Accent color for the number badge */
  accentColor?: string;
  className?: string;
}

function FeatureCardInner({
  feature,
  index,
  isInView,
  accentColor = "#2216ff",
}: FeatureCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
      onClick={() => feature.mockupSrc && setExpanded(!expanded)}
      className={`group relative overflow-hidden rounded-xl border border-sand-200 bg-white p-5 transition-all hover:border-sand-300 hover:shadow-sm ${
        feature.mockupSrc ? "cursor-pointer" : ""
      }`}
    >
      {/* Number badge */}
      <div
        className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg text-13 font-bold text-white"
        style={{ backgroundColor: accentColor }}
      >
        {feature.number}
      </div>

      {/* Icon */}
      {feature.icon && (
        <div className="mb-2 h-6 w-6 text-neutral-400">{feature.icon}</div>
      )}

      <h4 className="mb-1 text-15 font-semibold text-brand-ink">
        {feature.title}
      </h4>
      <p className="text-13 leading-relaxed text-neutral-500">
        {feature.description}
      </p>

      {/* Expandable mockup */}
      <AnimatePresence>
        {expanded && feature.mockupSrc && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mt-4 overflow-hidden"
          >
            <div className="mx-auto w-full max-w-[200px]">
              <div
                className="overflow-hidden rounded-[28px] border-[6px] border-[#1d1d1f] bg-[#1d1d1f]"
                style={{
                  filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.12))",
                }}
              >
                <div className="relative overflow-hidden rounded-[22px] bg-black">
                  <div className="absolute left-1/2 top-[8px] z-20 h-[16px] w-[60px] -translate-x-1/2 rounded-full bg-black" />
                  <div className="relative aspect-[9/19.5] w-full overflow-hidden bg-white">
                    <Image
                      src={feature.mockupSrc}
                      alt={feature.mockupAlt ?? feature.title}
                      fill
                      unoptimized
                      className="object-cover object-top"
                      sizes="200px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand hint */}
      {feature.mockupSrc && !expanded && (
        <div className="mt-3 flex items-center gap-1 text-11 text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
          Tap to preview
        </div>
      )}
    </motion.div>
  );
}

/**
 * Responsive grid of numbered feature cards.
 * Cards stagger-reveal on scroll.
 * Cards with mockupSrc expand on click to show a mini phone preview.
 */
export function FeatureGrid({
  features,
  columns = 3,
  accentColor,
  className,
}: FeatureGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const gridCols: Record<number, string> = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <div
      ref={ref}
      className={`grid gap-4 ${gridCols[columns]} ${className ?? ""}`}
    >
      {features.map((feature, i) => (
        <FeatureCardInner
          key={feature.number}
          feature={feature}
          index={i}
          isInView={isInView}
          accentColor={accentColor}
        />
      ))}
    </div>
  );
}
