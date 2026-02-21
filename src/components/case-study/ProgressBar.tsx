"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";

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

/**
 * Celebration uses our portfolio brand tokens — not the case study's brand.
 * brand-ink (#300101), blue-500 (#2216FF), blue-100 (#D4D1FF),
 * blue-50 (#EEEDFF), brand-canvas (#FFFEFC)
 */
const BRAND_CELEBRATION_COLORS = [
  "#2216FF", // blue-500
  "#300101", // brand-ink
  "#D4D1FF", // blue-100
  "#EEEDFF", // blue-50
  "#5A4FFF", // blue-400
  "#FFFEFC", // brand-canvas
];

/** Tiny SVG shapes: circle, square, triangle, diamond */
const shapeGenerators = [
  (color: string, s: number) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="5" r="4.5" fill="${color}"/></svg>`,
  (color: string, s: number) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="8" height="8" rx="1" fill="${color}"/></svg>`,
  (color: string, s: number) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><polygon points="5,1 9,9 1,9" fill="${color}"/></svg>`,
  (color: string, s: number) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><polygon points="5,0 10,5 5,10 0,5" fill="${color}"/></svg>`,
];

interface ProgressBarProps {
  progressBarColor?: string;
}

export function ProgressBar({ progressBarColor = "#2216FF" }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const hasShown = useRef(false);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const pct = Math.min(100, Math.round((scrollTop / docHeight) * 100));
    setProgress(pct);

    if (pct >= 100 && !hasShown.current) {
      hasShown.current = true;
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3500);
    }
    if (pct < 95) {
      hasShown.current = false;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Pre-generate random particle positions using brand colors
  const particles = useMemo(
    () =>
      Array.from({ length: 60 }).map((_, i) => {
        const shapeIdx = i % shapeGenerators.length;
        const colorIdx = i % BRAND_CELEBRATION_COLORS.length;
        const size = Math.random() * 10 + 6;
        const color = BRAND_CELEBRATION_COLORS[colorIdx];
        const svgStr = shapeGenerators[shapeIdx](color, size);
        const encoded = `data:image/svg+xml,${encodeURIComponent(svgStr)}`;
        return {
          left: `${Math.random() * 100}%`,
          top: `-${Math.random() * 15 + 5}%`,
          rotation: Math.random() * 360,
          delay: `${Math.random() * 1.2}s`,
          duration: `${Math.random() * 1.5 + 2}s`,
          encoded,
          size,
        };
      }),
    []
  );

  const msg = getMessage(progress);
  const isComplete = progress >= 100;

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-[60] hidden h-[36px] items-center bg-white/95 backdrop-blur-sm lg:left-[240px] lg:flex">
        {/* Progress track */}
        <div className="absolute bottom-0 left-0 right-0 h-[6px] rounded-b-[3px] bg-neutral-100">
          <div
            className="h-full rounded-b-[3px] transition-all duration-200"
            style={{ width: `${progress}%`, backgroundColor: progressBarColor }}
          />
        </div>
        {/* Content grouped on the right */}
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

      {/* Celebration: branded geometric shapes in portfolio colors */}
      {showCelebration && (
        <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute animate-confetti-fall"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
                animationDuration: p.duration,
                transform: `rotate(${p.rotation}deg)`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.encoded}
                alt=""
                width={p.size}
                height={p.size}
                style={{ width: p.size, height: p.size }}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
