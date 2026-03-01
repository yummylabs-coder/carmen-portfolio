"use client";

/**
 * Hook that returns an onClick handler for triggering the brand curtain
 * page transition from any card component.
 *
 * Usage:
 *   const handleClick = useCurtainTransition(slug);
 *   <Link href={`/work/${slug}`} onClick={handleClick}>...</Link>
 *
 * The Link stays for SEO/prefetch, but the click is intercepted
 * to play the curtain animation before navigating.
 */

import { useCallback, type MouseEvent } from "react";
import { usePageTransition } from "./PageTransitionContext";
import { getTransitionConfig } from "@/lib/transition-config";

export function useCurtainTransition(slug: string) {
  const { startTransition } = usePageTransition();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.preventDefault();

      // Find the card element to get its bounding rect
      // Walk up from the click target to find the article (card wrapper)
      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();

      const config = getTransitionConfig(slug);

      startTransition({
        rect,
        color: config.color,
        textColor: config.textColor,
        slug,
        logoUrl: config.logoUrl,
      });
    },
    [slug, startTransition],
  );

  return handleClick;
}
