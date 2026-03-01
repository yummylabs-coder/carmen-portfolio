"use client";

/**
 * ImmersiveNextStudy — bold "Next Case Study" section for immersive layouts.
 *
 * Full-viewport section with large text and hover interaction.
 * Replaces the small card-style NextCaseStudy for immersive case studies.
 */

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { LineMask } from "./LineMask";
import { ease, duration } from "@/lib/motion";

interface ImmersiveNextStudyProps {
  title: string;
  slug: string;
  coverUrl: string;
  tag?: string;
  tags?: string[];
  /** Background color of this section */
  bg?: string;
  /** Text color */
  text?: string;
}

export function ImmersiveNextStudy({
  title,
  slug,
  coverUrl,
  tag,
  tags,
  bg = "#FFFEFC",
  text = "#300101",
}: ImmersiveNextStudyProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden"
      style={{ backgroundColor: bg, color: text }}
    >
      <Link
        href={`/work/${slug}`}
        className="group relative z-10 flex flex-col items-center gap-8 px-6 py-24 text-center"
      >
        {/* Label */}
        <motion.span
          className="text-[11px] font-semibold uppercase tracking-[0.15em] opacity-40"
          initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
          animate={inView ? { opacity: 0.4, y: 0 } : {}}
          transition={{ duration: duration.fast, ease: ease.standard }}
        >
          Next Case Study
        </motion.span>

        {/* Big title */}
        <LineMask
          as="h2"
          className="text-[clamp(2.5rem,8vw,6rem)] font-extrabold leading-[1.02] tracking-tight"
          delay={0.2}
        >
          {title}
        </LineMask>

        {/* Tags */}
        {(tags?.length ? tags : tag ? [tag] : []).length > 0 && (
          <motion.div
            className="flex flex-wrap justify-center gap-2"
            initial={shouldReduce ? {} : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.6,
              duration: duration.normal,
              ease: ease.standard,
            }}
          >
            {(tags?.length ? tags : tag ? [tag] : []).map((t) => (
              <span
                key={t}
                className="rounded-full px-3 py-1 text-[13px] opacity-50"
                style={{ backgroundColor: `${text}08`, border: `1px solid ${text}15` }}
              >
                {t}
              </span>
            ))}
          </motion.div>
        )}

        {/* Arrow */}
        <motion.div
          className="mt-4 flex h-14 w-14 items-center justify-center rounded-full transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${text}10` }}
          initial={shouldReduce ? {} : { opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            delay: 0.7,
            duration: duration.normal,
            ease: ease.expo,
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.div>
      </Link>

      {/* Background image — subtle, blurred */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        initial={shouldReduce ? {} : { scale: 1.1 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 1.5, ease: ease.smooth }}
      >
        <Image
          src={coverUrl}
          alt=""
          fill
          className="object-cover blur-sm"
          sizes="100vw"
        />
      </motion.div>
    </section>
  );
}
