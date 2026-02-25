"use client";

import { motion } from "framer-motion";
import type { CaseStudy } from "@/lib/types";
import { CaseStudyCard } from "@/components/ui";

interface FeaturedWorkSectionProps {
  caseStudies: CaseStudy[];
}

export function FeaturedWorkSection({ caseStudies }: FeaturedWorkSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      }}
      className="overflow-hidden rounded-3xl border border-[#3D0A0A] p-6"
      style={{
        background:
          "linear-gradient(145deg, #300101 0%, #3D0A0A 50%, #2A0000 100%)",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4,
          duration: 0.4,
          ease: "easeOut",
        }}
        className="mb-6 max-w-[700px] font-brand text-17 font-semibold leading-[1.3] text-white"
      >
        Latest work
      </motion.h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {caseStudies.map((study, index) => (
          <motion.div
            key={study.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5 + index * 0.12,
              duration: 0.5,
              ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
            }}
          >
            <CaseStudyCard
              title={study.title}
              summary={study.summary}
              coverUrl={study.coverUrl}
              slug={study.slug}
              className="w-full"
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
