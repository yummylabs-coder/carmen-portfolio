"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Prev button */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:left-6 sm:flex sm:p-3"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Next button */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:right-6 sm:flex sm:p-3"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Image */}
      <motion.div
        key={photo.id}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-xl sm:max-w-[80vw] sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {photo.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo.imageUrl}
            alt={photo.label}
            className="max-h-[85vh] w-auto object-contain"
          />
        ) : (
          <div className="flex h-[50vh] w-[70vw] items-center justify-center rounded-xl bg-neutral-800 sm:h-[60vh] sm:w-[50vw]">
            <span className="text-sm font-medium uppercase tracking-wider text-neutral-500">
              {photo.label}
            </span>
          </div>
        )}

        {/* Label */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-8">
          <span className="text-sm font-semibold text-white">{photo.label}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Photo Wall ─── */
export function PhotoWall({ photos }: PhotoWallProps) {
  const items = photos.length > 0 ? photos : fallbackPhotos;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + items.length) % items.length : null));
  }, [items.length]);

  const handleNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % items.length : null));
  }, [items.length]);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  return (
    <>
      <div className="rounded-3xl border border-neutral-200 bg-white p-6">
        <div className="mb-5 flex items-center gap-[10px]">
          <span className="text-[20px]">🌴</span>
          <h2 className="font-brand text-15 font-semibold text-brand-ink">
            When I&apos;m not designing
          </h2>
        </div>

        <div
          className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4"
          style={{ gridAutoRows: "100px" }}
        >
          {items.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setLightboxIndex(idx)}
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

      {/* Lightbox portal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photo={items[lightboxIndex]}
            onClose={handleClose}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </>
  );
}
