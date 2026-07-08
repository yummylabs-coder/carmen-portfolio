"use client";

import { ScrollReveal } from "@/components/dashboard/ScrollReveal";

interface OverviewProps {
  text: string;
  /** Optional side column (e.g. a role summary). Renders 2-col on desktop, stacked on mobile. */
  aside?: React.ReactNode;
}

export function Overview({ text, aside }: OverviewProps) {
  if (!text) return null;

  const paragraphs = text.split("\n").filter((p) => p.trim());

  const overviewBlock = (
    <div className="flex flex-col gap-4">
      <h2 className="font-brand text-[24px] font-bold text-brand-ink">
        Overview
      </h2>
      <div className="flex flex-col gap-4">
        {paragraphs.map((paragraph, i) => (
          <p
            key={i}
            className="max-w-[760px] text-16 leading-[1.8] text-neutral-600"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );

  return (
    <ScrollReveal>
      <section className="mx-auto max-w-5xl">
        {aside ? (
          <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[1fr_320px] lg:gap-12">
            {overviewBlock}
            <div className="border-t border-[#EEEBE8] pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              {aside}
            </div>
          </div>
        ) : (
          overviewBlock
        )}
      </section>
    </ScrollReveal>
  );
}
