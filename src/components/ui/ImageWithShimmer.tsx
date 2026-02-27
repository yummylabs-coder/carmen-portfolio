"use client";

import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";

/* ── Animated image icon — pulses gently while loading ─────────── */
function AnimatedImageIcon() {
  return (
    <div className="absolute inset-0 z-[1] flex items-center justify-center bg-sand-50">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-pulse text-sand-300"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
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
  }, []);

  const imgClassName = `${className} transition-opacity duration-500 ${isLoaded && !hasError ? "opacity-100" : "opacity-0"}`;

  /*
   * fill mode — both shimmer and Image are rendered as siblings (Fragment).
   * The PARENT container must have `position: relative` and explicit dimensions.
   */
  if (fill) {
    return (
      <>
        {(!isLoaded || hasError) && <AnimatedImageIcon />}
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
      {(!isLoaded || hasError) && <AnimatedImageIcon />}
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
