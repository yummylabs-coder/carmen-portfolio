"use client";

import { motion } from "framer-motion";
import type { ModeId } from "./processData";
import { modeButtons } from "./processData";

interface ProjectTypeSelectorProps {
  activeMode: ModeId;
  onChange: (mode: ModeId) => void;
}

export function ProjectTypeSelector({ activeMode, onChange }: ProjectTypeSelectorProps) {
  return (
    <div>
      <p className="mb-[10px] font-body text-11 font-semibold uppercase tracking-[0.06em] text-neutral-600">
        What kind of project?
      </p>
      <div className="flex flex-wrap gap-1 rounded-xl border border-sand-300 bg-sand-100 p-1">
        {modeButtons.map((btn) => {
          const isActive = activeMode === btn.id;
          return (
            <motion.button
              key={btn.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => onChange(btn.id)}
              className={`relative flex items-center gap-2 rounded-lg px-4 py-2 text-13 font-medium transition-colors ${
                isActive
                  ? "text-brand-ink"
                  : "text-neutral-600 hover:text-neutral-600"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="project-type-pill"
                  className="absolute inset-0 rounded-lg bg-white shadow-sm"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative text-[16px]">{btn.emoji}</span>
              <span className="relative">{btn.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
