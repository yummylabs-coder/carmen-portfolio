"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { PhaseBlock } from "./processData";
import { badgeColors } from "./processData";

interface PhaseDetailsPanelProps {
  phase: PhaseBlock | null;
  imageUrl?: string;
}

export function PhaseDetailsPanel({ phase, imageUrl }: PhaseDetailsPanelProps) {
  return (
    <aside className="sticky top-10 rounded-3xl border border-sand-300 bg-white p-6">
      <AnimatePresence mode="wait">
        {!phase ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-10 text-center text-neutral-400"
          >
            <div className="mb-3 text-[32px] opacity-50">&#x1F446;</div>
            <p className="text-14 leading-[1.5]">
              Click any phase to learn when I use it, and when I skip it.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={phase.name}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.3 }}
          >
            {/* Type badge */}
            <span
              className={`mb-2 inline-block rounded-md px-[10px] py-1 text-[11px] font-semibold uppercase tracking-[0.05em] ${badgeColors[phase.type]}`}
            >
              {phase.type}
            </span>

            {/* Phase name */}
            <h3 className="mb-4 font-brand text-[18px] font-bold text-brand-ink">
              {phase.name}
            </h3>

            {/* When I use this */}
            <div className="mb-4">
              <h4 className="mb-[6px] font-body text-11 font-semibold uppercase tracking-[0.05em] text-neutral-400">
                When I use this
              </h4>
              <p className="text-13 leading-[1.6] text-neutral-600">
                {phase.when}
              </p>
            </div>

            {/* I skip this when */}
            <div className={imageUrl ? "mb-4" : ""}>
              <h4 className="mb-[6px] font-body text-11 font-semibold uppercase tracking-[0.05em] text-neutral-400">
                I skip this when...
              </h4>
              <div className="rounded-md border-l-[3px] border-[#f97316] bg-[#ffedd5] px-3 py-[10px] text-12 leading-[1.5] text-[#c2410c]">
                {phase.skip}
              </div>
            </div>

            {/* Phase image — only shown when an image is uploaded in Notion */}
            {imageUrl && (
              <div className="overflow-hidden rounded-lg">
                {imageUrl.toLowerCase().includes(".svg") ? (
                  /* SVGs can't be optimised by next/image — use a plain img */
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={imageUrl}
                    alt={`${phase.name} example`}
                    className="h-auto w-full"
                  />
                ) : (
                  <Image
                    src={imageUrl}
                    alt={`${phase.name} example`}
                    width={600}
                    height={400}
                    className="h-auto w-full object-cover"
                  />
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
