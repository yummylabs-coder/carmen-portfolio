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
      <p className="mb-[10px] font-body text-11 font-semibold uppercase tracking-[0.06em] text-neutral-400">
        What kind of project?
      </p>
      <div className="flex flex-wrap gap-[10px]">
        {modeButtons.map((btn) => {
          const isActive = activeMode === btn.id;
          return (
            <motion.button
              key={btn.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => onChange(btn.id)}
              className={`flex items-center gap-2 rounded-md px-4 py-[10px] text-13 font-medium transition-colors ${
                isActive
                  ? "bg-blue-500 font-semibold text-white"
                  : "border border-neutral-200 bg-white text-neutral-500 hover:border-blue-500 hover:bg-blue-50 hover:text-brand-ink"
              }`}
            >
              <span className="text-[16px]">{btn.emoji}</span>
              <span>{btn.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
