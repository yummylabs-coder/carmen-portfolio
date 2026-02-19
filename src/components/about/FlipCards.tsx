"use client";

import { useState } from "react";

const cards = [
  {
    emoji: "🙋‍♀️",
    front: "I'll push back respectfully",
    back: "If something doesn't feel right, I'll say so — but I'll bring ideas, not just objections. The best work comes from honest conversations.",
  },
  {
    emoji: "🍪",
    front: "I bring the snacks",
    back: "Good food makes everything better. Team morale, brainstorms, long meetings — snacks fix it all. (Venezuelan arepas if you're lucky.)",
  },
  {
    emoji: "🔥",
    front: "I'll become obsessed",
    back: "When I care about what we're building, I go deep. I'll think about it in the shower, prototype on weekends, and push until it's great.",
  },
];

export function FlipCards() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6">
      <div className="mb-5 flex items-center gap-[10px]">
        <span className="text-[20px]">🤝</span>
        <h2 className="font-brand text-15 font-semibold text-brand-ink">
          Working with me
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {cards.map((card, i) => {
          const isFlipped = flippedIndex === i;
          return (
            <div
              key={i}
              className="h-[100px] cursor-pointer"
              style={{ perspective: "1000px" }}
              onClick={() => setFlippedIndex(isFlipped ? null : i)}
              onMouseEnter={() => setFlippedIndex(i)}
              onMouseLeave={() => setFlippedIndex(null)}
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
                  className="absolute inset-0 flex items-center gap-[14px] rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-4"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <span className="text-[28px]">{card.emoji}</span>
                  <h3 className="font-brand text-14 font-semibold text-brand-ink">
                    {card.front}
                  </h3>
                  <span className="ml-auto rounded bg-white px-2 py-1 text-[10px] text-neutral-400">
                    Hover me
                  </span>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 flex items-center rounded-xl px-5 py-4"
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
