"use client";

/**
 * FullBleedImage — full-viewport image section that lives between rooms.
 *
 * Creates a dramatic visual pause in the scroll journey.
 * Supports an optional overlay with children (e.g., floating components, text).
 */

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef, type ReactNode } from "react";

interface FullBleedImageProps {
  src: string;
  alt: string;
  /** Optional overlay color (e.g., "rgba(0,0,0,0.3)") */
  overlay?: string;
  /** Children render on top of the image */
  children?: ReactNode;
  /** Aspect ratio override — defaults to full viewport height */
  className?: string;
}

export function FullBleedImage({
  src,
  alt,
  overlay,
  children,
  className = "",
}: FullBleedImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle parallax: image moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], shouldReduce ? ["0%", "0%"] : ["-5%", "5%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <section
      ref={ref}
      className={`relative h-screen w-full overflow-hidden ${className}`}
    >
      {/* Parallax image */}
      <motion.div
        className="absolute inset-[-5%] h-[110%] w-[110%]"
        style={shouldReduce ? {} : { y, scale }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Optional overlay */}
      {overlay && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: overlay }}
        />
      )}

      {/* Optional children overlay */}
      {children && (
        <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
          {children}
        </div>
      )}
    </section>
  );
}
