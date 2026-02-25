"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  /** Optional avatar image URL */
  avatarSrc?: string;
  /** Accent color for the quote mark. Default brand-ink. */
  accentColor?: string;
  className?: string;
}

/**
 * Styled testimonial card with quote mark, avatar, and subtle rotation.
 * Fades + slides in on scroll.
 */
export function TestimonialCard({
  quote,
  name,
  role,
  avatarSrc,
  accentColor,
  className,
}: TestimonialCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, rotate: -1 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotate: -0.5 }
          : { opacity: 0, y: 24, rotate: -1 }
      }
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-xl border border-sand-200 bg-white p-6 shadow-sm ${className ?? ""}`}
    >
      {/* Quote mark */}
      <div
        className="mb-3 text-[48px] font-bold leading-none"
        style={{ color: accentColor ?? "var(--brand-ink)" }}
      >
        &ldquo;
      </div>

      {/* Quote text */}
      <blockquote className="mb-5 text-16 leading-[1.7] text-brand-ink">
        {quote}
      </blockquote>

      {/* Attribution */}
      <div className="flex items-center gap-3">
        {avatarSrc && (
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-sand-200">
            <Image
              src={avatarSrc}
              alt={name}
              fill
              unoptimized
              className="object-cover"
              sizes="40px"
            />
          </div>
        )}
        <div>
          <div className="text-14 font-semibold text-brand-ink">{name}</div>
          <div className="text-12 text-neutral-400">{role}</div>
        </div>
      </div>

      {/* Subtle accent bar at top */}
      <div
        className="absolute left-0 top-0 h-[3px] w-full"
        style={{
          background: accentColor
            ? `linear-gradient(90deg, ${accentColor}, transparent)`
            : "linear-gradient(90deg, var(--brand-ink), transparent)",
        }}
      />
    </motion.div>
  );
}
