"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { AboutPhoto } from "@/lib/types";

interface PhotoWallProps {
  photos: AboutPhoto[];
}

const fallbackPhotos: AboutPhoto[] = [
  { id: "1", label: "Drawing", imageUrl: "", size: "normal", order: 1 },
  { id: "2", label: "Eating", imageUrl: "", size: "normal", order: 2 },
  { id: "3", label: "Traveling", imageUrl: "", size: "normal", order: 3 },
  { id: "4", label: "Building", imageUrl: "", size: "normal", order: 4 },
  { id: "5", label: "Family", imageUrl: "", size: "wide", order: 5 },
  { id: "6", label: "The ocean", imageUrl: "", size: "normal", order: 6 },
];

const PHOTOS_PER_PAGE = 6;

/* ─── Shuffle icon ─── */
function ShuffleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 3h5v5" />
      <path d="M4 20L21 3" />
      <path d="M21 16v5h-5" />
      <path d="M15 15l6 6" />
      <path d="M4 4l5 5" />
    </svg>
  );
}

/* ─── Fisher-Yates shuffle ─── */
function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/* ─── Preload lightbox-sized images in the background ─── */
function PreloadImages({ photos }: { photos: AboutPhoto[] }) {
  return (
    <div className="hidden" aria-hidden="true">
      {photos.map((p) =>
        p.imageUrl ? (
          <Image
            key={p.id}
            src={p.imageUrl}
            alt=""
            width={800}
            height={600}
            quality={50}
            loading="eager"
          />
        ) : null
      )}
    </div>
  );
}

/* ─── Lightbox Modal ─── */
function Lightbox({
  photo,
  onClose,
  onPrev,
  onNext,
}: {
  photo: AboutPhoto;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        key={photo.id}
        initial={{ scale: 0.95, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 12 }}
        transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
        className="relative flex max-h-[90vh] w-full max-w-[680px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-neutral-500 transition-colors hover:bg-black/10 hover:text-neutral-800"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4L12 12M4 12L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Image area */}
        <div className="relative shrink-0 bg-white">
          <div className="relative aspect-[16/10]">
            <AnimatePresence mode="wait">
              <motion.div
                key={photo.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                {photo.imageUrl ? (
                  <Image
                    src={photo.imageUrl}
                    alt={photo.label}
                    fill
                    sizes="(max-width: 680px) 100vw, 680px"
                    className="object-contain"
                    quality={85}
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-neutral-100">
                    <span className="text-sm font-medium uppercase tracking-wider text-neutral-400">
                      {photo.label}
                    </span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-neutral-600 shadow-sm transition-all hover:bg-white"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-neutral-600 shadow-sm transition-all hover:bg-white"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1 overflow-y-auto p-5">
          <h3 className="font-brand text-[18px] font-bold text-brand-ink">
            {photo.label}
          </h3>
          {photo.caption && (
            <p className="text-14 leading-[1.6] text-neutral-500">
              {photo.caption}
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

/* ─── Aspect ratio based on size property ─── */
function getAspectRatio(size: AboutPhoto["size"]): string {
  switch (size) {
    case "tall":
      return "aspect-[3/4]";
    case "wide":
      return "aspect-[16/9]";
    default:
      return "aspect-square";
  }
}

/* ─── Photo Wall ─── */
export function PhotoWall({ photos }: PhotoWallProps) {
  const allPhotos = photos.length > 0 ? photos : fallbackPhotos;
  const [rotation, setRotation] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Determine pagination vs shuffle mode
  const canPaginate = allPhotos.length > PHOTOS_PER_PAGE;
  const totalRotations = canPaginate
    ? Math.ceil(allPhotos.length / PHOTOS_PER_PAGE)
    : Math.max(3, Math.ceil(allPhotos.length / PHOTOS_PER_PAGE));

  // Shuffled orderings for when there aren't enough photos to paginate
  const [shuffledSets, setShuffledSets] = useState<AboutPhoto[][]>([]);

  // Initialize shuffled sets on mount (only for shuffle mode)
  useEffect(() => {
    if (!canPaginate) {
      const sets: AboutPhoto[][] = [allPhotos];
      for (let i = 1; i < totalRotations; i++) {
        sets.push(shuffleArray(allPhotos));
      }
      setShuffledSets(sets);
    }
  }, [canPaginate, allPhotos, totalRotations]);

  const currentItems = useMemo(() => {
    if (canPaginate) {
      // Paginate mode: show different slices
      const start = rotation * PHOTOS_PER_PAGE;
      const end = start + PHOTOS_PER_PAGE;
      return allPhotos.slice(start, end);
    }
    // Shuffle mode: show shuffled ordering
    if (shuffledSets.length > 0 && shuffledSets[rotation]) {
      return shuffledSets[rotation];
    }
    return allPhotos;
  }, [allPhotos, rotation, canPaginate, shuffledSets]);

  const handleShuffle = useCallback(() => {
    setRotation((prev) => (prev + 1) % totalRotations);
    setLightboxIndex(null);
  }, [totalRotations]);

  const handlePrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + currentItems.length) % currentItems.length : null));
  }, [currentItems.length]);

  const handleNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % currentItems.length : null));
  }, [currentItems.length]);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  return (
    <>
      <div className="rounded-3xl border border-sand-300 bg-white p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-brand text-15 font-semibold text-brand-ink">
            When I&apos;m not designing
          </h2>

          <button
            onClick={handleShuffle}
            className="group flex items-center gap-1.5 rounded-full border border-sand-300 bg-sand-100 px-3 py-1.5 text-11 font-medium text-neutral-500 transition-all hover:border-sand-400 hover:bg-sand-200 hover:text-neutral-700"
          >
            <ShuffleIcon className="transition-transform duration-300 group-hover:rotate-180" />
            <span>Shuffle</span>
            <span className="ml-0.5 text-neutral-400">
              {rotation + 1}/{totalRotations}
            </span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={rotation}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="columns-2 gap-2 sm:columns-3"
          >
            {currentItems.map((photo, idx) => (
              <div
                key={`${photo.id}-${rotation}`}
                onClick={() => setLightboxIndex(idx)}
                className="group relative mb-2 cursor-pointer overflow-hidden rounded-lg break-inside-avoid transition-all hover:z-10 hover:scale-[1.02] hover:shadow-lg"
              >
                {photo.imageUrl ? (
                  <div className={`relative w-full ${getAspectRatio(photo.size)}`}>
                    <Image
                      src={photo.imageUrl}
                      alt={photo.label}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover"
                      quality={75}
                    />
                  </div>
                ) : (
                  <div className={`flex w-full items-center justify-center bg-neutral-200 ${getAspectRatio(photo.size)}`}>
                    <span className="text-[10px] font-medium uppercase tracking-wide text-neutral-400">
                      {photo.label}
                    </span>
                  </div>
                )}

                {/* Hover overlay with label + caption */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-[10px] pb-2 pt-6 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-[11px] font-semibold text-white">
                    {photo.label}
                  </span>
                  {photo.caption && (
                    <p className="mt-0.5 text-[10px] leading-tight text-white/70">
                      {photo.caption}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Preload lightbox-sized images in background */}
      <PreloadImages photos={currentItems} />

      {/* Lightbox portal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photo={currentItems[lightboxIndex]}
            onClose={handleClose}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </>
  );
}
