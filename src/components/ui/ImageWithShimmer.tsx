"use client";

import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";

/* ── Tiny landscape icon for the shimmer placeholder ───────────── */
function PlaceholderIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}

/* ── Shimmer skeleton shown while image loads ──────────────────── */
function ShimmerPlaceholder() {
  return (
    <div className="absolute inset-0 z-[1] flex items-center justify-center overflow-hidden">
      {/* Animated gradient sweep */}
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-neutral-100 via-white to-neutral-100 bg-[length:200%_100%]" />
      {/* Centered icon */}
      <PlaceholderIcon className="relative z-10 text-neutral-300" />
    </div>
  );
}

/* ── Static fallback when an image fails to load ─────────────── */
function ErrorPlaceholder() {
  return (
    <div className="absolute inset-0 z-[1] flex items-center justify-center bg-neutral-50">
      <PlaceholderIcon className="text-neutral-300" />
    </div>
  );
}

/* ── ImageWithShimmer ──────────────────────────────────────────── */

interface ImageWithShimmerProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  quality?: number;
}

export function ImageWithShimmer({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  priority,
  className = "",
  quality,
}: ImageWithShimmerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  /*
   * Handle the case where the image is already loaded from SSR/cache
   * before React hydrates and attaches the onLoad handler.
   */
  const setRef = useCallback((node: HTMLImageElement | null) => {
    imgRef.current = node;
    if (node?.complete && node.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, []);

  /* Fallback: check again after hydration */
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, []);

  const handleLoad = useCallback(() => setIsLoaded(true), []);
  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true); // hide shimmer
  }, []);

  const imgClassName = `${className} transition-opacity duration-500 ${isLoaded && !hasError ? "opacity-100" : "opacity-0"}`;

  /*
   * fill mode — both shimmer and Image are rendered as siblings (Fragment).
   * The PARENT container must have `position: relative` and explicit dimensions.
   */
  if (fill) {
    return (
      <>
        {hasError ? (
          <ErrorPlaceholder />
        ) : (
          !isLoaded && <ShimmerPlaceholder />
        )}
        <Image
          ref={setRef}
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={quality}
          className={imgClassName}
          onLoad={handleLoad}
          onError={handleError}
        />
      </>
    );
  }

  /* width/height mode — Image flows naturally, shimmer overlays */
  return (
    <div className="relative overflow-hidden">
      {hasError ? (
        <ErrorPlaceholder />
      ) : (
        !isLoaded && <ShimmerPlaceholder />
      )}
      <Image
        ref={setRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        quality={quality}
        className={imgClassName}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}
