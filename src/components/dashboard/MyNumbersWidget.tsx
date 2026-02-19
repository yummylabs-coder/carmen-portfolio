"use client";

import { PulseIcon, ArrowRightIcon } from "@/components/icons/NavIcons";
import { AnimatedCounter } from "./AnimatedCounter";
import { ScrollReveal } from "./ScrollReveal";
import Link from "next/link";

const stats = [
  { value: 9, suffix: "", label: "years in product", color: "text-blue-600" },
  { value: 50, suffix: "+", label: "products shipped", color: "text-blue-500" },
  { value: 100, suffix: "+", label: "designers mentored", color: "text-blue-500" },
];

export function MyNumbersWidget() {
  return (
    <ScrollReveal delay={0.2} className="flex-1">
      <div
        className="flex h-full flex-col rounded-xl border border-neutral-200 p-[25px]"
        style={{
          background: "var(--brand-canvas)",
          boxShadow:
            "0px 1px 3px 0px rgba(48,1,1,0.04), 0px 0px 0px 1px rgba(48,1,1,0.04)",
        }}
      >
        {/* Header */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50">
            <PulseIcon size={14} className="text-blue-500" />
          </div>
          <h3 className="font-brand text-15 font-bold text-brand-ink">
            My numbers
          </h3>
        </div>

        {/* Stats */}
        <div className="flex items-start justify-center gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-1 flex-col gap-[3px]">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                className={`font-brand text-28 font-bold leading-[28px] ${stat.color}`}
              />
              <span className="text-14 leading-[1.6] text-neutral-600">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Footer link */}
        <div className="mt-auto pt-2">
          <Link
            href="/experience"
            className="inline-flex items-center gap-1 text-13 font-medium text-blue-500 hover:text-blue-600"
          >
            View experience
            <ArrowRightIcon size={16} />
          </Link>
        </div>
      </div>
    </ScrollReveal>
  );
}
