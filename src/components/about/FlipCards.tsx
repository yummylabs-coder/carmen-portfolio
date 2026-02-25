"use client";

import { useState, useEffect, useRef } from "react";

/* Shield with check — standing your ground respectfully */
function PushBackIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/* Coffee cup — snacks & good vibes */
function SnacksIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  );
}

/* Rocket — going above and beyond */
function RocketIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

/* Chat bubbles — asking for early feedback */
function FeedbackIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <line x1="9" y1="9" x2="15" y2="9" />
      <line x1="9" y1="13" x2="13" y2="13" />
    </svg>
  );
}

/* Users + heart — vouching for users and the business */
function VouchIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M20 8l1.5 1.5L23 8" />
      <path d="M21.5 9.5V12" />
    </svg>
  );
}

const cards = [
  {
    icon: PushBackIcon,
    front: "I'll push back respectfully",
    back: "If something doesn't feel right, I'll say so, but I'll bring ideas, not just objections. The best work comes from honest conversations.",
  },
  {
    icon: SnacksIcon,
    front: "I bring the snacks",
    back: "Good food makes everything better. Team morale, brainstorms, long meetings, snacks fix it all. (Venezuelan arepas if you're lucky.)",
  },
  {
    icon: RocketIcon,
    front: "I'll become obsessed",
    back: "When I care about what we're building, I go deep. I'll think about it in the shower, prototype on weekends, and push until it's great.",
  },
  {
    icon: FeedbackIcon,
    front: "I'll ask for early feedback",
    back: "I don't wait until things are perfect to share. Showing work early means we catch problems faster and build the right thing together.",
  },
  {
    icon: VouchIcon,
    front: "I'll vouch for our users, and the business",
    back: "I care about the people using what we build and the goals behind it. I'll always advocate for both sides and find the sweet spot where great UX meets real impact.",
  },
];

export function FlipCards() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const canHover = useRef(false);

  useEffect(() => {
    canHover.current = window.matchMedia("(hover: hover)").matches;
  }, []);

  return (
    <div className="rounded-3xl border border-sand-300 bg-white p-6">
      <div className="mb-5">
        <h2 className="font-brand text-15 font-semibold text-brand-ink">
          Working with me
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {cards.map((card, i) => {
          const isFlipped = flippedIndex === i;
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="h-[88px] cursor-pointer"
              style={{ perspective: "1000px" }}
              onClick={() => setFlippedIndex(isFlipped ? null : i)}
              onMouseEnter={() => {
                if (canHover.current) setFlippedIndex(i);
              }}
              onMouseLeave={() => {
                if (canHover.current) setFlippedIndex(null);
              }}
            >
              <div
                className="relative h-full w-full transition-transform duration-500"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
                }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 flex items-center gap-[14px] rounded-xl border border-sand-300 bg-sand-100 px-4 py-3"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-neutral-600 shadow-sm">
                    <Icon />
                  </span>
                  <h3 className="font-brand text-14 font-semibold text-brand-ink">
                    {card.front}
                  </h3>
                  <span className="ml-auto rounded bg-white px-2 py-1 text-[10px] text-neutral-400">
                    {canHover.current ? "Hover me" : "Tap me"}
                  </span>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 flex items-center rounded-xl px-4 py-3"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    background: "var(--brand-ink)",
                  }}
                >
                  <p className="text-13 leading-snug text-white">
                    {card.back}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
