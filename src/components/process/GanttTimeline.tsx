"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ModeConfig } from "./processData";
import { blocks, barColors, legendItems } from "./processData";

interface GanttTimelineProps {
  config: ModeConfig;
  selectedBlock: string | null;
  onSelectBlock: (id: string) => void;
}

export function GanttTimeline({ config, selectedBlock, onSelectBlock }: GanttTimelineProps) {
  const { totalWeeks, nowWeek, duration, rows } = config;
  const nowPct = (nowWeek / totalWeeks) * 100;
  const nowWeekIndex = Math.floor(nowWeek);

  return (
    <section
      className="overflow-x-auto rounded-3xl border border-white/[0.06] p-6"
      style={{
        background:
          "linear-gradient(135deg, var(--brand-ink) 0%, #1a0a0a 50%, #0f0505 100%)",
      }}
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-brand text-15 font-semibold text-white">
          Typical timeline
        </h2>
        <span className="rounded-full bg-white/[0.08] px-3 py-1 text-13 text-white/50">
          {duration}
        </span>
      </div>

      {/* Gantt chart */}
      <div className="relative min-w-[500px]">
        {/* Week headers */}
        <div className="mb-4 flex border-b border-white/[0.08] pb-3">
          {Array.from({ length: totalWeeks }, (_, i) => (
            <div
              key={i}
              className={`relative flex-1 text-center text-[10px] font-medium uppercase tracking-[0.03em] ${
                i === nowWeekIndex
                  ? "font-bold text-[#fbbf24]"
                  : "text-white/50"
              }`}
            >
              W{i + 1}
              {i === nowWeekIndex && (
                <span className="absolute -bottom-[13px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#fbbf24]" />
              )}
            </div>
          ))}
        </div>

        {/* Rows + now line */}
        <div className="relative flex flex-col gap-2">
          {/* Now line — yellow/gold */}
          <div
            className="absolute bottom-0 top-0 z-10 w-[2px] bg-[#fbbf24] opacity-60"
            style={{ left: `${nowPct}%` }}
          >
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-[#fbbf24]/20 px-2 py-[2px] text-[10px] font-bold text-[#fbbf24]">
              Now
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={duration}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-2"
            >
              {rows.map((row, ri) => (
                <div key={ri} className="relative flex h-14 items-center">
                  {row.map((item) => {
                    const block = blocks[item.id];
                    const leftPct = (item.start / totalWeeks) * 100;
                    const widthPct = (block.weeks / totalWeeks) * 100;
                    const colors = barColors[block.type];
                    const isSelected = selectedBlock === item.id;

                    return (
                      <motion.button
                        key={item.id}
                        layout
                        onClick={() => onSelectBlock(item.id)}
                        className={`absolute flex h-12 min-w-[90px] flex-col items-start justify-center rounded-md border px-3 py-2 text-left backdrop-blur-sm transition-all ${colors.bg} ${colors.border} ${colors.text} ${
                          isSelected
                            ? "z-20 -translate-y-[2px] shadow-[0_4px_20px_rgba(251,191,36,0.3)] outline outline-2 outline-offset-2 outline-[#fbbf24]"
                            : "hover:-translate-y-[2px] hover:shadow-[0_4px_16px_rgba(255,255,255,0.08)]"
                        }`}
                        style={{
                          left: `${leftPct}%`,
                          width: `${widthPct}%`,
                        }}
                      >
                        <span className="whitespace-nowrap text-12 font-semibold leading-[1.2]">
                          {block.name}
                        </span>
                        <span className="mt-[2px] text-[10px] font-medium opacity-60">
                          {block.weeks}w
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3 border-t border-white/[0.08] pt-4">
        {legendItems.map((item) => (
          <div key={item.type} className="flex items-center gap-[5px] text-[10px] text-white/60">
            <span className={`h-[10px] w-[10px] rounded-[3px] ${item.color}`} />
            {item.label}
          </div>
        ))}
      </div>
    </section>
  );
}
