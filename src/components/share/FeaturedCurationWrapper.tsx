"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { CheckIcon } from "@/components/icons/NavIcons";

interface FeaturedCurationWrapperProps {
  children: ReactNode;
  slug: string;
}

/**
 * Wraps the FeaturedHeroCard to make it selectable during curation mode.
 * Uses the same custom-event system as CurateToggle and WorkGrid.
 */
export function FeaturedCurationWrapper({ children, slug }: FeaturedCurationWrapperProps) {
  const [isCurating, setIsCurating] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setIsCurating(true);
      setIsSelected(false);
    };
    const handleCancel = () => {
      setIsCurating(false);
      setIsSelected(false);
    };
    const handleEnd = () => {
      setIsCurating(false);
      setIsSelected(false);
    };

    window.addEventListener("curate-start", handleStart);
    window.addEventListener("curate-cancel", handleCancel);
    window.addEventListener("curate-end", handleEnd);
    return () => {
      window.removeEventListener("curate-start", handleStart);
      window.removeEventListener("curate-cancel", handleCancel);
      window.removeEventListener("curate-end", handleEnd);
    };
  }, []);

  const handleClick = useCallback(() => {
    if (!isCurating) return;
    const newSelected = !isSelected;
    setIsSelected(newSelected);
    window.dispatchEvent(
      new CustomEvent(newSelected ? "featured-select" : "featured-deselect", {
        detail: { slug },
      }),
    );
  }, [isCurating, isSelected, slug]);

  // When not curating, render children as-is (no wrapper overhead)
  if (!isCurating) return <>{children}</>;

  return (
    <div className="relative cursor-pointer" onClick={handleClick}>
      {/* Selection ring overlay */}
      <div
        className={`pointer-events-none absolute inset-0 z-10 rounded-3xl border-2 transition-all duration-200 ${
          isSelected
            ? "border-blue-400 bg-blue-500/5 ring-2 ring-blue-100"
            : "border-transparent"
        }`}
      />

      {/* Checkbox indicator */}
      <div className="absolute right-4 top-4 z-20">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-200 ${
            isSelected
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-white/80 bg-white/60 text-transparent backdrop-blur-sm"
          }`}
        >
          <CheckIcon size={16} />
        </div>
      </div>

      {/* Prevent the inner Link from navigating during curation */}
      <div className="pointer-events-none">{children}</div>
    </div>
  );
}
