"use client";

import type { AboutPhoto, Favorite } from "@/lib/types";
import { HeroCard } from "./HeroCard";
import { FlipCards } from "./FlipCards";
import { ValuesCard } from "./ValuesCard";
import { PhotoWall } from "./PhotoWall";
import { FavoritesShelf } from "./FavoritesShelf";

interface AboutPageContentProps {
  photos: AboutPhoto[];
  favorites: Favorite[];
}

export function AboutPageContent({ photos, favorites }: AboutPageContentProps) {
  return (
    <>
      {/* Page header */}
      <header className="mb-2">
        <h1 className="font-brand text-[24px] font-bold text-brand-ink">
          About Me
        </h1>
        <p className="mt-2 text-15 text-neutral-500">
          The person behind the pixels
        </p>
      </header>

      {/* Row 1: Hero + Working With Me */}
      <div className="grid gap-6 lg:grid-cols-2">
        <HeroCard />
        <FlipCards />
      </div>

      {/* Row 2: Values + Photo Wall */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ValuesCard />
        <PhotoWall photos={photos} />
      </div>

      {/* Row 3: Favorites Shelf (Full Width) */}
      <FavoritesShelf favorites={favorites} />
    </>
  );
}
