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
      <div className="flex flex-col gap-1">
        <h1 className="font-brand text-22 font-bold text-brand-ink">
          About Me
        </h1>
        <p className="text-14 leading-[1.6] text-neutral-400">
          The person behind the pixels
        </p>
      </div>

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
