"use client";

import { ScrollReveal } from "@/components/dashboard/ScrollReveal";

interface OurRoleProps {
  description: string;
}

export function OurRole({ description }: OurRoleProps) {
  if (!description) return null;

  return (
    <ScrollReveal>
      <section className="flex flex-col gap-4">
        <h2 className="font-brand text-[24px] font-bold text-brand-ink">
          My Role
        </h2>
        <div className="max-w-[756px] whitespace-pre-line text-16 leading-[1.8] text-neutral-600">
          {description}
        </div>
      </section>
    </ScrollReveal>
  );
}
