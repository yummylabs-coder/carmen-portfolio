"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import type { AboutPhoto } from "@/lib/types";
import { StoryViewer } from "@/components/ui/StoryViewer";
import type { StorySlide } from "@/components/ui/StoryViewer";

/* ─── Fallback photos ─── */
const fallbackPhotos: AboutPhoto[] = [
  { id: "1", label: "Drawing", imageUrl: "", size: "normal", order: 1 },
  { id: "2", label: "Eating", imageUrl: "", size: "normal", order: 2 },
  { id: "3", label: "Traveling", imageUrl: "", size: "normal", order: 3 },
  { id: "4", label: "Building", imageUrl: "", size: "normal", order: 4 },
  { id: "5", label: "Family", imageUrl: "", size: "wide", order: 5 },
  { id: "6", label: "The ocean", imageUrl: "", size: "normal", order: 6 },
];

/* ─── Single ribbon photo ─── */
function RibbonPhoto({
  photo,
  realIndex,
  onClick,
}: {
  photo: AboutPhoto;
  realIndex: number;
  onClick: (index: number) => void;
}) {
  return (
    <div
      className="group relative h-full shrink-0 cursor-pointer overflow-hidden rounded-xl"
      style={{ width: photo.size === "wide" ? "220px" : "160px" }}
      onClick={() => onClick(realIndex)}
    >
      {photo.imageUrl ? (
        <Image
          src={photo.imageUrl}
          alt={photo.label}
          fill
          sizes="220px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          quality={70}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-sand-200">
          <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
            {photo.label}
          </span>
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 px-3 pb-2.5 pt-6 opacity-0 transition-all duration-300 group-hover:opacity-100">
        <span className="text-11 font-semibold text-white drop-shadow-sm">
          {photo.label}
        </span>
      </div>
    </div>
  );
}

/* ─── Convert AboutPhoto[] → StorySlide[] ─── */
function toStorySlides(photos: AboutPhoto[]): StorySlide[] {
  return photos.map((p) => ({
    id: p.id,
    imageUrl: p.imageUrl || undefined,
    label: p.label,
    caption: p.caption,
  }));
}

/* ─── Photo Mosaic (Horizontal Ribbon) ─── */
interface PhotoMosaicProps {
  photos: AboutPhoto[];
}

export function PhotoMosaic({ photos }: PhotoMosaicProps) {
  const allPhotos = photos.length > 0 ? photos : fallbackPhotos;
  const [storyIndex, setStoryIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleOpenStory = useCallback((index: number) => {
    setStoryIndex(index);
  }, []);

  const handleCloseStory = useCallback(() => {
    setStoryIndex(null);
  }, []);

  /*
   * Split photos into two rows.
   * Row 1 scrolls left ←, Row 2 scrolls right →
   * Each row's content is duplicated for seamless infinite loop.
   */
  const mid = Math.ceil(allPhotos.length / 2);
  const row1 = allPhotos.slice(0, mid);
  const row2 = allPhotos.slice(mid);

  /* Speed: wider rows scroll slower. ~40s for a full cycle feels elegant. */
  const row1Duration = Math.max(30, row1.length * 8);
  const row2Duration = Math.max(30, row2.length * 8);

  return (
    <>
      <div
        className="rounded-3xl border border-sand-300 bg-white overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Header — has its own padding */}
        <div className="px-5 pt-5 pb-4">
          <h2 className="font-brand text-15 font-semibold text-brand-ink">
            When I&apos;m not designing
          </h2>
          <p className="mt-0.5 text-12 text-neutral-400">
            Hover to pause &middot; tap to explore
          </p>
        </div>

        {/* Ribbon rows — edge-to-edge, no side padding */}
        <div className="flex flex-col gap-1.5 pb-5">
          {/* Row 1 — scrolls left */}
          <div className="relative h-[120px] sm:h-[140px]">
            {/* Fade edges — at true container edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent" />

            <div
              className="ribbon-track ribbon-left flex h-full gap-1.5"
              style={{
                animationDuration: `${row1Duration}s`,
                animationPlayState: isPaused ? "paused" : "running",
              }}
            >
              {[...row1, ...row1].map((photo, i) => (
                <RibbonPhoto
                  key={`r1-${i}`}
                  photo={photo}
                  realIndex={allPhotos.indexOf(photo)}
                  onClick={handleOpenStory}
                />
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div className="relative h-[120px] sm:h-[140px]">
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent" />

            <div
              className="ribbon-track ribbon-right flex h-full gap-1.5"
              style={{
                animationDuration: `${row2Duration}s`,
                animationPlayState: isPaused ? "paused" : "running",
              }}
            >
              {[...row2, ...row2].map((photo, i) => (
                <RibbonPhoto
                  key={`r2-${i}`}
                  photo={photo}
                  realIndex={allPhotos.indexOf(photo)}
                  onClick={handleOpenStory}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Story Viewer overlay */}
      {storyIndex !== null && (
        <StoryViewer
          slides={toStorySlides(allPhotos)}
          startIndex={storyIndex}
          onClose={handleCloseStory}
        />
      )}

      {/* Ribbon animation keyframes */}
      <style>{`
        .ribbon-track {
          will-change: transform;
        }
        @keyframes ribbon-scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes ribbon-scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .ribbon-left {
          animation: ribbon-scroll-left linear infinite;
        }
        .ribbon-right {
          animation: ribbon-scroll-right linear infinite;
        }
      `}</style>
    </>
  );
}
