"use client";

import { motion } from "framer-motion";
import type { CaseStudyDetail } from "@/lib/types";
import type { BrandColors } from "@/lib/case-study-config";
import { Breadcrumb } from "./Breadcrumb";
import { ImageWithShimmer } from "@/components/ui/ImageWithShimmer";

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

function isSvg(url: string): boolean {
  return /\.svg(\?|$)/i.test(url);
}

export function HeroSection({ study, readTime, brand }: HeroSectionProps) {
  const heroImage = study.heroImages?.[0] || "";

  return (
    <section
      className="full-bleed-panel full-bleed-hero flex flex-col justify-center px-4 pb-10 pt-[96px] md:px-6 lg:min-h-[calc(100vh-36px)] lg:px-[44px] lg:pt-10"
      style={{
        background: `linear-gradient(170deg, ${brand.bg} 0%, ${brand.bg}e6 60%, ${brand.bg}cc 100%)`,
      }}
    >
      {/* Breadcrumb inside the branded bg */}
      <div className="mb-8">
        <Breadcrumb caseName={study.title} brand={brand} />
      </div>

      {/* Two-column layout: text left, image right (stacked on mobile) */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
        {/* Left column — text content */}
        <div className="flex flex-col gap-[18px] lg:w-[55%] lg:shrink-0">
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
                  className="rounded-md px-[10px] py-1 text-11 font-semibold uppercase tracking-[0.05em]"
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
            className="max-w-[750px] font-brand text-42 font-extrabold leading-[1.15] mobile:text-[32px]"
            style={{ color: brand.headlineText }}
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
                  className="rounded-md border px-[10px] py-1 text-12"
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

        {/* Right column — hero image */}
        {heroImage && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex items-center justify-center lg:w-[45%]"
          >
            <div className="relative w-full overflow-hidden">
              {isSvg(heroImage) ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={heroImage}
                  alt={`${study.title} preview`}
                  className="h-auto w-full"
                />
              ) : (
                <ImageWithShimmer
                  src={heroImage}
                  alt={`${study.title} preview`}
                  width={800}
                  height={600}
                  className="h-auto w-full"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  priority
                />
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
