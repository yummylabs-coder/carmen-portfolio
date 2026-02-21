"use client";

import { motion } from "framer-motion";
import type { CaseStudyDetail } from "@/lib/types";
import type { BrandColors } from "@/lib/case-study-config";

interface HeroSectionProps {
  study: CaseStudyDetail;
  readTime: string;
  brand: BrandColors;
}

function ClockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
  }),
};

export function HeroSection({ study, readTime, brand }: HeroSectionProps) {
  return (
    <section
      className="-mx-4 px-4 pb-12 pt-8 md:-mx-6 md:px-6 lg:-ml-11 lg:-mr-15 lg:px-11 lg:pt-10"
      style={{ backgroundColor: brand.bg }}
    >
      <div className="max-w-[756px]">
        <div className="flex flex-col gap-3">
          {/* Partner label */}
          {study.partner && (
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="text-12 font-semibold uppercase tracking-[1.5px]"
              style={{ color: brand.textMuted }}
            >
              Partner: {study.partner}
            </motion.p>
          )}

          {/* Platform badges */}
          {study.platform.length > 0 && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="flex flex-wrap gap-2"
            >
              {study.platform.map((p) => (
                <span
                  key={p}
                  className="rounded-full px-3 py-1 text-11 font-semibold uppercase tracking-[0.5px]"
                  style={{ backgroundColor: brand.badgeBg, color: brand.badgeText }}
                >
                  {p}
                </span>
              ))}
            </motion.div>
          )}

          {/* Headline (h1) */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="mt-1 font-brand text-42 font-extrabold leading-[1.1] mobile:text-[32px]"
            style={{ color: brand.text }}
          >
            {study.headline || study.title}
          </motion.h1>

          {/* Summary */}
          {study.summary && (
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="text-16 leading-[1.8]"
              style={{ color: brand.textMuted }}
            >
              {study.summary}
            </motion.p>
          )}

          {/* Read time with clock icon */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="flex items-center gap-1.5 text-13"
            style={{ color: brand.textMuted }}
          >
            <ClockIcon />
            <span>{readTime}</span>
          </motion.div>

          {/* Services tags */}
          {study.services.length > 0 && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
              className="mt-2 flex flex-wrap gap-2"
            >
              {study.services.map((s) => (
                <span
                  key={s}
                  className="rounded-full border px-3 py-1.5 text-12"
                  style={{
                    borderColor: brand.tagBorder,
                    backgroundColor: brand.tagBg,
                    color: brand.tagText,
                  }}
                >
                  {s}
                </span>
              ))}
            </motion.div>
          )}

          {/* CTA button */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={6}
            className="mt-1"
          >
            {study.websiteUrl ? (
              <a
                href={study.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-xl px-5 py-3 text-14 font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: brand.ctaBg, color: brand.ctaText }}
              >
                Go to website
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            ) : (
              <span
                className="inline-flex w-fit items-center gap-2 rounded-xl px-5 py-3 text-14 font-semibold opacity-60"
                style={{ backgroundColor: brand.ctaBg, color: brand.ctaText }}
              >
                Under development
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </span>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
