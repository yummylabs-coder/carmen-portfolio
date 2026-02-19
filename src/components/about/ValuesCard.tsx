"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const values = [
  {
    title: "Ship early, learn fast",
    body: "I'd rather put something real in front of users than polish a deck for weeks. Feedback from the wild beats assumptions every time. Ship it, watch what happens, then make it better.",
  },
  {
    title: "Adapt the process to the problem",
    body: "I don't follow a rigid playbook. Some projects need deep research; others need us to jump straight into code. I read the situation and pick the right approach — not the \"correct\" one.",
  },
  {
    title: "Don't get stuck in trendy tools",
    body: "Tools change every year. Problems don't. I'll use Figma, code, AI, napkin sketches — whatever gets us to the right solution fastest. The craft is in the thinking, not the software.",
  },
];

export function ValuesCard() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6">
      <div className="mb-5 flex items-center gap-[10px]">
        <span className="text-[20px]">💭</span>
        <h2 className="font-brand text-15 font-semibold text-brand-ink">
          What I believe
        </h2>
      </div>

      <div className="flex flex-col gap-[10px]">
        {values.map((v, i) => {
          const isOpen = expandedIndex === i;
          return (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 transition-colors hover:border-blue-500"
            >
              <button
                onClick={() => setExpandedIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <h3 className="flex items-center gap-[10px] font-brand text-14 font-semibold text-brand-ink">
                  <span className="font-serif text-[24px] leading-none text-blue-500">
                    &ldquo;
                  </span>
                  {v.title}
                </h3>
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[16px] transition-all duration-200 ${
                    isOpen
                      ? "rotate-45 bg-blue-500 text-white"
                      : "bg-white text-neutral-400"
                  }`}
                >
                  +
                </span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-13 leading-relaxed text-neutral-500">
                      {v.body}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
