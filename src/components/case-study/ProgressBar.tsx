"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  { min: 0, text: "Let's go!", emoji: "\u{1F680}" },
  { min: 25, text: "You're doing great", emoji: "\u{1F4AA}" },
  { min: 50, text: "Halfway there, I promise it's worth it", emoji: "\u231B" },
  { min: 75, text: "Almost done, you've got this", emoji: "\u{1F525}" },
  { min: 90, text: "Okay now you're just showing off", emoji: "\u{1F60F}" },
  { min: 100, text: "Look at you, finishing things.", emoji: "\u{1F389}" },
];

function getMessage(progress: number) {
  let current = messages[0];
  for (const m of messages) {
    if (progress >= m.min) current = m;
  }
  return current;
}

interface NextProject {
  title: string;
  slug: string;
  coverUrl: string;
  tags?: string[];
}

interface ProgressBarProps {
  progressBarColor?: string;
  nextProject?: NextProject | null;
}

export function ProgressBar({ progressBarColor = "#2216FF", nextProject }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const hasShown = useRef(false);
  const shareCopiedTimer = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const pct = Math.min(100, Math.round((scrollTop / docHeight) * 100));
    setProgress(pct);

    if (pct >= 100 && !hasShown.current) {
      hasShown.current = true;
      setShowCelebration(true);
    }
    if (pct < 95) {
      hasShown.current = false;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll when celebration is showing
  useEffect(() => {
    if (!showCelebration) return;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, scrollY);
    };
  }, [showCelebration]);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    const title = document.title;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // User cancelled or share failed — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setShareCopied(true);
    if (shareCopiedTimer.current) clearTimeout(shareCopiedTimer.current);
    shareCopiedTimer.current = setTimeout(() => setShareCopied(false), 2500);
  }, []);

  const msg = getMessage(progress);
  const isComplete = progress >= 100;

  return (
    <>
      <div className="fixed left-0 right-0 top-[60px] z-[35] flex h-[40px] items-center bg-white/95 backdrop-blur-sm lg:top-0 lg:z-[60] lg:left-[240px] lg:h-[36px]">
        {/* Progress track — softer, thinner, gradient fill — flush to bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-neutral-100/50">
          <div
            className="h-full transition-all duration-300 ease-out"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${progressBarColor}25, ${progressBarColor}80, ${progressBarColor})`,
              borderRadius: "0 2px 2px 0",
            }}
          />
        </div>

        {/* Back link */}
        <Link
          href="/work"
          className="flex items-center gap-1 pl-4 text-12 font-medium text-neutral-500 transition-colors hover:text-brand-ink lg:hidden"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>My Work</span>
        </Link>

        {/* Progress info */}
        <div className="ml-auto flex items-center gap-2 pr-4 md:pr-8">
          <span className="hidden text-12 text-neutral-500 md:block">
            {msg.text}
          </span>
          <span className={`text-14 ${isComplete ? "animate-celebrate" : ""}`}>
            {msg.emoji}
          </span>
          <span className="text-11 font-medium text-neutral-400">
            {progress}%
          </span>
        </div>
      </div>

      {/* ── Ethereal half-moon celebration ── */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-brand-ink/20 backdrop-blur-[6px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              onClick={() => setShowCelebration(false)}
            />

            {/* Half-moon — fills ~50vh on mobile, capped on desktop */}
            <motion.div
              className="relative z-10 w-[100vw] max-w-[700px] sm:w-[94vw]"
              style={{
                height: "min(50vh, 420px)",
                borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
                overflow: "hidden",
                animation: "celebrate-breathe 5s ease-in-out infinite",
                boxShadow:
                  "0 -12px 60px rgba(167,139,250,0.12), 0 -4px 24px rgba(129,140,248,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 20, mass: 1 }}
            >
              {/* ── Glass base: soft white with very diffuse color wash ── */}
              <div
                className="absolute inset-0"
                style={{
                  background: `
                    radial-gradient(circle at 28% 18%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.6) 30%, transparent 60%),
                    radial-gradient(circle at 72% 78%, rgba(167,139,250,0.18) 0%, transparent 55%),
                    radial-gradient(circle at 22% 68%, rgba(103,232,249,0.12) 0%, transparent 50%),
                    radial-gradient(circle at 82% 22%, rgba(129,140,248,0.15) 0%, transparent 55%),
                    radial-gradient(circle at 50% 50%, rgba(255,255,255,0.92) 0%, rgba(167,139,250,0.06) 100%)
                  `,
                }}
              />

              {/* ── Slow orbiting color wash: very blended, wide gradients ── */}
              <div
                className="absolute inset-[-30%]"
                style={{
                  background: `
                    radial-gradient(circle at 60% 30%, rgba(167,139,250,0.14) 0%, transparent 45%),
                    radial-gradient(circle at 30% 70%, rgba(103,232,249,0.10) 0%, transparent 45%)
                  `,
                  animation: "celebrate-orbit 20s linear infinite",
                  filter: "blur(30px)",
                }}
              />

              {/* ── Counter-rotating secondary: even more subtle + blurred ── */}
              <div
                className="absolute inset-[-20%]"
                style={{
                  background: `
                    radial-gradient(circle at 40% 20%, rgba(129,140,248,0.10) 0%, transparent 45%),
                    radial-gradient(circle at 65% 80%, rgba(232,168,124,0.06) 0%, transparent 40%)
                  `,
                  animation: "celebrate-orbit 28s linear infinite reverse",
                  filter: "blur(24px)",
                }}
              />

              {/* ── 3D glass highlight at the dome ── */}
              <div
                className="pointer-events-none absolute"
                style={{
                  top: "3%",
                  left: "12%",
                  width: "76%",
                  height: "35%",
                  background:
                    "radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, transparent 100%)",
                  filter: "blur(14px)",
                  transform: "rotate(-3deg)",
                }}
              />

              {/* ── Tilting aura ring: sweeping highlight tracing the arc ──
                   Full circle (h=200% of parent = parent width) positioned at top:0
                   so only the upper semicircle is visible within overflow:hidden.
                   Conic gradient + radial mask = thin ring stroke. */}
              <div
                className="pointer-events-none absolute left-[-3px] right-[-3px] top-[-3px]"
                style={{
                  height: "calc(200% + 6px)",
                  borderRadius: "9999px",
                  background: `conic-gradient(from 0deg, transparent 0%, rgba(167,139,250,0.5) 6%, rgba(129,140,248,0.28) 14%, transparent 28%, transparent 100%)`,
                  WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - 2.5px), black calc(100% - 2px))`,
                  mask: `radial-gradient(farthest-side, transparent calc(100% - 2.5px), black calc(100% - 2px))`,
                  animation: "celebrate-orbit 7s linear infinite",
                }}
              />

              {/* ── Static luminous border (subtle always-on edge) ── */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
                  border: "1px solid rgba(167,139,250,0.12)",
                  borderBottom: "none",
                }}
              />

              {/* ── Pulsing outer glow ── */}
              <div
                className="pointer-events-none absolute -inset-8"
                style={{
                  borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
                  backgroundColor: "rgba(167,139,250,0.06)",
                  filter: "blur(35px)",
                  animation: "celebrate-radiate 4.5s ease-in-out infinite",
                }}
              />

              {/* ── Content ── */}
              <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 pb-6 sm:px-14 sm:pb-8">
                {/* Handwritten message */}
                <motion.p
                  className="relative font-handwritten text-[22px] text-brand-ink sm:text-[32px]"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                >
                  Thanks for reading{" "}
                  <motion.span
                    className="inline-block"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.8,
                      duration: 0.4,
                      type: "spring",
                      stiffness: 350,
                      damping: 12,
                    }}
                  >
                    &#9829;
                  </motion.span>
                </motion.p>

                {/* Ethereal divider */}
                <motion.div
                  className="mt-3 h-px w-10 sm:mt-5 sm:w-16"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(167,139,250,0.3), transparent)",
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
                />

                {/* Next case study CTA */}
                {nextProject && (
                  <motion.div
                    className="mt-3 w-full max-w-[260px] sm:mt-5 sm:max-w-[320px]"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
                  >
                    <span className="mb-1.5 block text-center text-[9px] font-semibold uppercase tracking-[1.5px] text-brand-ink/20 sm:text-[10px]">
                      Next Case Study
                    </span>
                    <Link
                      href={`/work/${nextProject.slug}`}
                      className="group flex items-center gap-2.5 rounded-xl p-2 transition-all hover:shadow-sm sm:gap-3 sm:p-2.5"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.3)",
                        backdropFilter: "blur(14px)",
                        WebkitBackdropFilter: "blur(14px)",
                        border: "1px solid rgba(167,139,250,0.12)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                      }}
                      onClick={() => setShowCelebration(false)}
                    >
                      {/* Thumbnail */}
                      <div className="relative h-[40px] w-[54px] shrink-0 overflow-hidden rounded-lg sm:h-[48px] sm:w-[64px]">
                        <Image
                          src={nextProject.coverUrl}
                          alt={nextProject.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate font-brand text-12 font-bold text-brand-ink sm:text-14">
                          {nextProject.title}
                        </span>
                        {nextProject.tags && nextProject.tags[0] && (
                          <span className="text-11 text-brand-ink/35 sm:text-12">
                            {nextProject.tags[0]}
                          </span>
                        )}
                      </div>

                      {/* Arrow */}
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-brand-ink/30 transition-colors group-hover:bg-brand-ink/5 group-hover:text-brand-ink/50 sm:h-8 sm:w-8">
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  </motion.div>
                )}

                {/* Share this case study */}
                <motion.button
                  className="mt-3 flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] font-medium text-brand-ink/30 transition-all hover:bg-brand-ink/5 hover:text-brand-ink/50 sm:mt-4 sm:text-12"
                  style={{
                    border: "1px solid rgba(167,139,250,0.12)",
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.4, ease: "easeOut" }}
                  onClick={handleShare}
                >
                  {shareCopied ? (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      Link copied!
                    </>
                  ) : (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                        <polyline points="16 6 12 2 8 6" />
                        <line x1="12" y1="2" x2="12" y2="15" />
                      </svg>
                      Share this case study
                    </>
                  )}
                </motion.button>

                {/* Dismiss hint */}
                <motion.button
                  className="mt-2 text-[10px] text-brand-ink/15 transition-colors hover:text-brand-ink/30 sm:mt-2 sm:text-11"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.4 }}
                  onClick={() => setShowCelebration(false)}
                >
                  tap to close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyframes for celebration effects */}
      <style>{`
        @keyframes celebrate-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.01); }
        }
        @keyframes celebrate-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes celebrate-radiate {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </>
  );
}
