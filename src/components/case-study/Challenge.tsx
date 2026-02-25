"use client";

import { ScrollReveal } from "@/components/dashboard/ScrollReveal";

interface ChallengeProps {
  text: string;
}

export function Challenge({ text }: ChallengeProps) {
  if (!text) return null;

  const paragraphs = text.split("\n").filter((p) => p.trim());
  const heading = paragraphs[0] || "";
  const body = paragraphs.slice(1);

  return (
    <ScrollReveal>
      <section
        className="rounded-3xl px-6 py-8 md:px-10 md:py-12"
        style={{
          background:
            "linear-gradient(145deg, #300101 0%, #421414 100%)",
        }}
      >
        {/* Pill label */}
        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-11 font-semibold uppercase tracking-[1px] text-white/80">
          The challenge
        </span>

        {/* Heading — first paragraph promoted to heading */}
        {heading && (
          <h2 className="mt-5 max-w-[756px] font-brand text-[22px] font-bold leading-[1.5] text-white md:text-[26px]">
            {heading}
          </h2>
        )}

        {/* Body — remaining paragraphs */}
        {body.length > 0 && (
          <div className="mt-4 flex flex-col gap-3">
            {body.map((paragraph, i) => (
              <p
                key={i}
                className="max-w-[700px] text-16 leading-[1.8] text-white/70"
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </section>
    </ScrollReveal>
  );
}
