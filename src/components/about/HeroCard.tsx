"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

/** Handwritten sign-off that "writes" itself when scrolled into view */
function HandwrittenSignoff() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [charIndex, setCharIndex] = useState(0);
  const text = "Thanks for being here";

  useEffect(() => {
    if (!isInView) return;
    if (charIndex >= text.length) return;

    const speed = 50 + Math.random() * 40; // slight variation like real writing
    const timeout = setTimeout(() => setCharIndex((i) => i + 1), speed);
    return () => clearTimeout(timeout);
  }, [isInView, charIndex, text.length]);

  const done = charIndex >= text.length;

  return (
    <div ref={ref} className="mt-5">
      <p className="font-handwritten text-[22px] leading-[1.3] text-white">
        {/* Revealed text */}
        <span>{text.slice(0, charIndex)}</span>

        {/* Blinking cursor while writing */}
        {isInView && !done && (
          <motion.span
            className="ml-[1px] inline-block h-[22px] w-[2px] translate-y-[3px] bg-white/70"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" as const }}
          />
        )}

        {/* Heart pops in after text finishes */}
        {done && (
          <motion.span
            className="ml-1 inline-block"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.15,
              duration: 0.4,
              type: "spring",
              stiffness: 400,
              damping: 12,
            }}
          >
            ♥
          </motion.span>
        )}
      </p>
    </div>
  );
}

export function HeroCard() {
  return (
    <div
      className="flex flex-col gap-5 rounded-3xl px-6 pb-8 pt-8 sm:px-8"
      style={{
        background:
          "linear-gradient(135deg, #300101 0%, #1a0101 50%, #300101 100%)",
      }}
    >
      {/* Avatar + greeting row */}
      <div className="flex items-center gap-4">
        <div className="relative h-[80px] w-[80px] shrink-0 overflow-hidden rounded-full border-2 border-white/15">
          <Image
            src="/carmen-avatar.jpg"
            alt="Carmen Rincon"
            fill
            className="object-cover"
            sizes="80px"
            unoptimized
          />
        </div>
        <div>
          <h2 className="font-brand text-[20px] font-bold text-white">
            Hey, I&apos;m Carmen
          </h2>
          <p className="text-12 text-white/40">A little letter about me</p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-white/10" />

      {/* Letter body */}
      <div className="text-[14px] leading-[1.8] text-white/70">
        <p className="mb-4">
          Originally from Venezuela, I moved to the States young and
          always knew I&apos;d end up in the creative field. I studied design
          at SCAD, launched my career in D.C., and intentionally worked across
          very different industries and states. Living in Barcelona, Geneva,
          Madrid, and Mexico City in my early twenties sparked a deep curiosity
          for new places and cultures.
        </p>
        <p>
          I care deeply about my craft, my time, and who I work with. In these
          changing times, I&apos;m more focused than ever on how I contribute
          to the design world. AI hasn&apos;t scared me — it&apos;s fueled me to
          sharpen my skills, embrace powerful new tools, and build more than ever.
        </p>

        {/* Animated handwritten sign-off */}
        <HandwrittenSignoff />

        {/* LinkedIn CTA */}
        <a
          href="https://www.linkedin.com/in/carmenerincon/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-13 font-medium text-white/80 transition-colors hover:bg-white/15 hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Connect on LinkedIn
        </a>
      </div>
    </div>
  );
}
