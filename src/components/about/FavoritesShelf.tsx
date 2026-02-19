"use client";

import type { Favorite } from "@/lib/types";

interface FavoritesShelfProps {
  favorites: Favorite[];
}

const fallbackFavorites: Favorite[] = [
  { id: "1", title: "Creative Confidence", category: "reading", subtitle: "Tom & David Kelley", order: 1 },
  { id: "2", title: "Severance", category: "watching", subtitle: "Apple TV+", order: 2 },
  { id: "3", title: "Khruangbin", category: "listening", subtitle: "A La Sala", order: 3 },
  { id: "4", title: "Arepas Reinas", category: "cooking", subtitle: "Trying to perfect it", order: 4 },
];

const shelfConfig: Record<
  Favorite["category"],
  { emoji: string; objectClass: string }
> = {
  reading: {
    emoji: "📖",
    objectClass:
      "w-[55px] rounded-r-md border-l-4 border-[#b91c1c] bg-gradient-to-br from-[#ef4444] to-[#dc2626]",
  },
  watching: {
    emoji: "🎬",
    objectClass:
      "w-[70px] rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#2563eb]",
  },
  listening: {
    emoji: "🎧",
    objectClass:
      "w-[70px] rounded-lg bg-gradient-to-br from-[#22c55e] to-[#16a34a]",
  },
  cooking: {
    emoji: "🍳",
    objectClass:
      "h-[80px] w-[80px] rounded-full bg-gradient-to-br from-[#f97316] to-[#ea580c]",
  },
};

export function FavoritesShelf({ favorites }: FavoritesShelfProps) {
  const items = favorites.length > 0 ? favorites : fallbackFavorites;

  return (
    <div
      className="relative rounded-3xl p-6 pt-8 md:p-8"
      style={{
        background:
          "linear-gradient(135deg, #300101 0%, #1a0101 50%, #300101 100%)",
      }}
    >
      {/* Header */}
      <div className="mb-6 flex items-center gap-[10px]">
        <span className="text-[20px]">📚</span>
        <h2 className="font-brand text-15 font-semibold text-white/90">
          Current favorites
        </h2>
      </div>

      {/* Shelf items */}
      <div className="relative z-10 flex flex-wrap justify-center gap-5 pb-4 sm:flex-nowrap sm:gap-8">
        {items.map((item) => {
          const config = shelfConfig[item.category];
          return (
            <div
              key={item.id}
              className="group flex flex-col items-center"
              style={{ flex: "1 0 0" }}
            >
              {/* 3D object */}
              <div
                className={`mb-3 flex h-[100px] items-center justify-center text-[32px] shadow-[2px_4px_8px_rgba(0,0,0,0.3)] transition-transform group-hover:-translate-y-1 ${config.objectClass}`}
              >
                {config.emoji}
              </div>

              {/* Label */}
              <div className="text-center">
                <div className="text-[9px] font-semibold uppercase tracking-wider text-white/50">
                  {item.category}
                </div>
                <div className="mt-1 font-brand text-12 font-semibold text-white/90">
                  {item.title}
                </div>
                <div className="mt-[2px] text-[10px] text-white/50">
                  {item.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Wood plank */}
      <div
        className="absolute bottom-6 left-0 right-0 mx-6 h-3 rounded-sm md:mx-8"
        style={{
          background:
            "linear-gradient(180deg, #4a1a1a 0%, #300101 50%, #1a0101 100%)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        }}
      />
    </div>
  );
}
