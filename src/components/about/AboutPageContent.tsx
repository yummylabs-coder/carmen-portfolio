"use client";

import type { AboutPhoto, TravelDestination, Track } from "@/lib/types";
import { HeroCard } from "./HeroCard";
import { FlipCards } from "./FlipCards";
import { ValuesCard } from "./ValuesCard";
import { PhotoMosaic } from "./PhotoMosaic";
import { VinylShelf } from "./VinylShelf";
import { WorldTour } from "./WorldTour";
import { PageEntrance } from "@/components/ui/PageEntrance";

interface AboutPageContentProps {
  photos: AboutPhoto[];
  destinations: TravelDestination[];
  tracks: Track[];
}

export function AboutPageContent({ photos, destinations, tracks }: AboutPageContentProps) {
  return (
    <PageEntrance>
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-brand text-22 font-bold text-brand-ink">
          About Me
        </h1>
        <p className="text-14 leading-[1.6] text-neutral-400">
          The person behind the pixels
        </p>
      </div>

      {/* Row 1: Letter + Working With Me */}
      <div className="grid gap-6 lg:grid-cols-2">
        <HeroCard />
        <FlipCards />
      </div>

      {/* Row 2: On Rotation — Vinyl Records (Full Width) */}
      <VinylShelf tracks={tracks} />

      {/* Row 3: Values + Photo Mosaic */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ValuesCard />
        <PhotoMosaic photos={photos} />
      </div>

      {/* Row 4: World Tour (Full Width) */}
      <WorldTour destinations={destinations} />
    </PageEntrance>
  );
}
