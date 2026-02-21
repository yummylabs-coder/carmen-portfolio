"use client";

import { useEffect, useState, useCallback, useRef } from "react";

const messages = [
  { min: 0, text: "Let's go!", emoji: "\u{1F680}" },
  { min: 25, text: "You're doing great", emoji: "\u{1F4AA}" },
  { min: 50, text: "Halfway there, I promise it's worth it", emoji: "\u231B" },
  { min: 75, text: "Almost done, you've got this", emoji: "\u{1F525}" },
  { min: 90, text: "Okay now you're just showing off", emoji: "\u{1F60F}" },
  { min: 100, text: "Look at you, finishing things.", emoji: "\u{1F389}" },
];

const CONFETTI_COLORS = ["#2216FF", "#FFE066", "#22c55e", "#f97316", "#D4D1FF", "#300101"];

function getMessage(progress: number) {
  let current = messages[0];
  for (const m of messages) {
    if (progress >= m.min) current = m;
  }
  return current;
}

export function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const hasShownConfetti = useRef(false);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const pct = Math.min(100, Math.round((scrollTop / docHeight) * 100));
    setProgress(pct);

    if (pct >= 100 && !hasShownConfetti.current) {
      hasShownConfetti.current = true;
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    if (pct < 95) {
      hasShownConfetti.current = false;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const msg = getMessage(progress);
  const isComplete = progress >= 100;

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-[60] flex h-[36px] items-center bg-white/95 backdrop-blur-sm lg:left-[240px]">
        {/* Progress track (gray background) */}
        <div className="absolute bottom-0 left-0 right-0 h-[6px] rounded-b-[3px] bg-neutral-100">
          {/* Progress fill */}
          <div
            className="h-full rounded-b-[3px] bg-blue-500 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mx-auto flex w-full max-w-[900px] items-center justify-between px-4 md:px-8">
          <span className="hidden text-12 text-neutral-500 md:block">
            {msg.text}
          </span>
          <span
            className={`text-14 ${isComplete ? "animate-celebrate" : ""}`}
          >
            {msg.emoji}
          </span>
          <span className="text-11 font-medium text-neutral-400">
            {progress}%
          </span>
        </div>
      </div>

      {/* Confetti */}
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
          {Array.from({ length: 100 }).map((_, i) => (
            <span
              key={i}
              className="absolute animate-confetti-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20 + 5}%`,
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                borderRadius: Math.random() > 0.5 ? "50%" : "0",
                animationDelay: `${Math.random() * 1}s`,
                animationDuration: `${Math.random() * 1.5 + 2}s`,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
