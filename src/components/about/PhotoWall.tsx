"use client";

import type { AboutPhoto } from "@/lib/types";

interface PhotoWallProps {
  photos: AboutPhoto[];
}

const fallbackPhotos: AboutPhoto[] = [
  { id: "1", label: "Drawing", imageUrl: "", size: "tall", order: 1 },
  { id: "2", label: "Eating", imageUrl: "", size: "normal", order: 2 },
  { id: "3", label: "Traveling", imageUrl: "", size: "normal", order: 3 },
  { id: "4", label: "Building", imageUrl: "", size: "normal", order: 4 },
  { id: "5", label: "Family", imageUrl: "", size: "wide", order: 5 },
  { id: "6", label: "The ocean", imageUrl: "", size: "normal", order: 6 },
];

export function PhotoWall({ photos }: PhotoWallProps) {
  const items = photos.length > 0 ? photos : fallbackPhotos;

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6">
      <div className="mb-5 flex items-center gap-[10px]">
        <span className="text-[20px]">🌴</span>
        <h2 className="font-brand text-15 font-semibold text-brand-ink">
          When I&apos;m not designing
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4"
        style={{ gridAutoRows: "100px" }}
      >
        {items.map((photo) => (
          <div
            key={photo.id}
            className={`group relative cursor-pointer overflow-hidden rounded-lg bg-neutral-200 transition-all hover:z-10 hover:scale-[1.02] hover:shadow-lg ${
              photo.size === "tall" ? "row-span-2" : ""
            } ${photo.size === "wide" ? "col-span-2" : ""}`}
          >
            {photo.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo.imageUrl}
                alt={photo.label}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[10px] font-medium uppercase tracking-wide text-neutral-400">
                {photo.label}
              </div>
            )}

            {/* Hover label */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-[10px] py-2 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-[11px] font-semibold text-white">
                {photo.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
