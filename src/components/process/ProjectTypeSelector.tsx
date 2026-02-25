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
      <div className="flex flex-wrap gap-1 rounded-xl border border-sand-300 bg-sand-100 p-1">
        {modeButtons.map((btn) => {
          const isActive = activeMode === btn.id;
          return (
            <motion.button
              key={btn.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => onChange(btn.id)}
              className={`relative flex items-center gap-2 rounded-lg px-4 py-2 text-13 font-medium transition-all ${
                isActive
                  ? "bg-white text-brand-ink shadow-sm"
                  : "text-neutral-400 hover:text-neutral-600"
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
