import type { TimelineStep } from "@/lib/types";

interface ProcessTimelineProps {
  duration: string;
  steps: TimelineStep[];
}

export function ProcessTimeline({ duration, steps }: ProcessTimelineProps) {
  if (steps.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
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
            <div key={i} className="relative flex gap-4 pl-7">
              {/* Dot */}
              <div
                className={`absolute left-0 top-1 h-4 w-4 rounded-full border-2 ${
                  step.isHighlight
                    ? "border-blue-500 bg-blue-500 shadow-[0_0_0_4px_var(--blue-50)]"
                    : "border-blue-500 bg-white"
                }`}
              />

              <div className="flex flex-col gap-1">
                <span className="text-11 font-semibold uppercase tracking-[1px] text-blue-500">
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
          ))}
        </div>
      </div>
    </section>
  );
}
