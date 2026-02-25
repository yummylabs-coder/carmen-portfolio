"use client";

import { ScrollReveal } from "@/components/dashboard/ScrollReveal";

interface OverviewProps {
  text: string;
}

export function Overview({ text }: OverviewProps) {
  if (!text) return null;

  const paragraphs = text.split("\n").filter((p) => p.trim());

  return (
    <ScrollReveal>
      <section className="flex flex-col gap-4">
        <h2 className="font-brand text-[24px] font-bold text-brand-ink">
          Overview
        </h2>
        <div className="flex flex-col gap-4">
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="max-w-[756px] text-16 leading-[1.8] text-neutral-600 md:text-[17px]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}
