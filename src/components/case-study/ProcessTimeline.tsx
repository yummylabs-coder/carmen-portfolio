"use client";

import type { TimelineStep } from "@/lib/types";
import { ScrollReveal } from "@/components/dashboard/ScrollReveal";

interface ProcessTimelineProps {
  duration: string;
  steps: TimelineStep[];
  /** Brand accent color — overrides default blue for dots, labels, highlights */
  accentColor?: string;
}

export function ProcessTimeline({ duration, steps, accentColor }: ProcessTimelineProps) {
  if (steps.length === 0) return null;

  return (
    <ScrollReveal>
      <section className="mx-auto max-w-5xl flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="font-brand text-[24px] font-bold text-brand-ink">
            The Journey
          </h2>
          <p className="text-14 text-neutral-500">{duration}</p>
        </div>

        <div className="relative ml-2 mobile:ml-0">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-neutral-200" />

          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="relative flex gap-4 pl-7">
                  {/* Dot */}
                  {accentColor ? (
                    <div
                      className="absolute left-0 top-1 h-4 w-4 rounded-full border-2"
                      style={
                        step.isHighlight
                          ? { borderColor: accentColor, backgroundColor: accentColor, boxShadow: `0 0 0 4px ${accentColor}20` }
                          : { borderColor: accentColor, backgroundColor: "white" }
                      }
                    />
                  ) : (
                    <div
                      className={`absolute left-0 top-1 h-4 w-4 rounded-full border-2 ${
                        step.isHighlight
                          ? "border-blue-500 bg-blue-500 shadow-[0_0_0_4px_var(--blue-50)]"
                          : "border-blue-500 bg-white"
                      }`}
                    />
                  )}

                  <div className="flex flex-col gap-1">
                    <span
                      className={`text-11 font-semibold uppercase tracking-[1px] ${accentColor ? "" : "text-blue-500"}`}
                      style={accentColor ? { color: accentColor } : undefined}
                    >
                      {step.label}
                    </span>
                    <h3 className="font-brand text-16 font-bold text-brand-ink">
                      {step.title}
                    </h3>
                    <p className="text-14 leading-[1.6] text-neutral-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
