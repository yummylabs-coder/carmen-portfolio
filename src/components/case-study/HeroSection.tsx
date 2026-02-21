"use client";

import { motion } from "framer-motion";
import type { CaseStudyDetail } from "@/lib/types";
import type { BrandColors } from "@/lib/case-study-config";
import { Breadcrumb } from "./Breadcrumb";

interface HeroSectionProps {
  study: CaseStudyDetail;
  readTime: string;
  brand: BrandColors;
}

function ClockIcon() {
  return (
    <svg
      width="16"
      height="16"
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
      className="-mx-4 -mt-6 px-4 pb-8 pt-8 md:-mx-6 md:px-6 lg:-ml-11 lg:-mr-15 lg:px-11 lg:pt-8"
      style={{ backgroundColor: brand.bg }}
    >
      {/* Breadcrumb inside the branded bg */}
      <div className="mb-8">
        <Breadcrumb caseName={study.title} brand={brand} />
      </div>

      <div className="flex flex-col gap-[18px]">
        {/* Partner label */}
        {study.partner && (
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-12 font-semibold uppercase tracking-[1px]"
            style={{ color: brand.partnerText }}
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
                className="rounded-[20px] px-3 py-1 text-11 font-semibold uppercase tracking-[0.5px]"
                style={{ backgroundColor: brand.badgeBg, color: brand.badgeText }}
              >
                {p}
              </span>
            ))}
          </motion.div>
        )}

        {/* Headline (h1) — max 750px */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="max-w-[750px] font-brand text-42 font-extrabold leading-[1.15] mobile:text-[32px]"
          style={{ color: brand.headlineText }}
        >
          {study.headline || study.title}
        </motion.h1>

        {/* Summary — max 700px, 18px */}
        {study.summary && (
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="max-w-[700px] text-[18px] leading-[1.45]"
            style={{ color: brand.bodyText }}
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
          className="flex items-center gap-1.5 text-14"
          style={{ color: brand.readTimeText }}
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
            className="flex flex-wrap gap-2"
          >
            {study.services.map((s) => (
              <span
                key={s}
                className="rounded-[20px] border px-[13px] py-1.5 text-12"
                style={{
                  backgroundColor: brand.tagBg,
                  borderColor: brand.tagBorder,
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
              className="inline-flex w-fit items-center gap-2 px-5 py-3 text-14 font-medium transition-opacity hover:opacity-90"
              style={{
                backgroundColor: brand.ctaBg,
                color: brand.ctaText,
                borderRadius: brand.ctaRadius,
              }}
            >
              Go to website
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          ) : (
            <span
              className="inline-flex w-fit items-center gap-2 px-5 py-3 text-14 font-medium opacity-60"
              style={{
                backgroundColor: brand.ctaBg,
                color: brand.ctaText,
                borderRadius: brand.ctaRadius,
              }}
            >
              Under development
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </span>
          )}
        </motion.div>
      </div>
    </section>
  );
}
