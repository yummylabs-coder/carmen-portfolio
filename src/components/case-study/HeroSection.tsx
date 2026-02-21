"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { CaseStudyDetail } from "@/lib/types";

interface HeroSectionProps {
  study: CaseStudyDetail;
  readTime: string;
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

function isVideo(url: string): boolean {
  return /\.(mp4|webm|mov)(\?|$)/i.test(url);
}

function isSvg(url: string): boolean {
  return /\.svg(\?|$)/i.test(url);
}

function MediaItem({
  src,
  alt,
  priority = false,
  sizes,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  if (isVideo(src)) {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  if (isSvg(src)) {
    /* eslint-disable-next-line @next/next/no-img-element */
    return (
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`object-cover ${className}`}
      priority={priority}
      sizes={sizes}
    />
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

export function HeroSection({ study, readTime }: HeroSectionProps) {
  return (
    <section className="flex flex-col gap-3">
      {/* Partner label — above badges, brand blue */}
      {study.partner && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-12 font-semibold uppercase tracking-[1.5px] text-blue-500"
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
              className="rounded-full bg-brand-ink px-3 py-1 text-11 font-semibold uppercase tracking-[0.5px] text-white"
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
        className="mt-1 font-brand text-42 font-extrabold leading-[1.1] text-brand-ink mobile:text-[32px]"
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
          className="text-16 leading-[1.8] text-neutral-600"
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
        className="flex items-center gap-1.5 text-13 text-neutral-500"
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
              className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-12 text-neutral-600"
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
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-14 font-semibold text-white transition-colors hover:bg-blue-600"
          >
            Go to website
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        ) : (
          <span className="inline-flex w-fit items-center gap-2 rounded-xl bg-neutral-200 px-5 py-3 text-14 font-semibold text-neutral-500">
            Under development
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </span>
        )}
      </motion.div>

      {/* Hero images / videos */}
      {study.heroImages.length > 0 && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={7}
          className="mt-4 flex flex-col gap-5"
        >
          {/* First media full-width */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
            <MediaItem
              src={study.heroImages[0]}
              alt={`${study.title} hero`}
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
          {/* Remaining media in 2-col grid */}
          {study.heroImages.length > 1 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {study.heroImages.slice(1).map((src, i) => (
                <div key={i} className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <MediaItem
                    src={src}
                    alt={`${study.title} hero ${i + 2}`}
                    sizes="(max-width: 640px) 100vw, 600px"
                  />
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </section>
  );
}
