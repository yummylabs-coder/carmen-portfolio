"use client";

/**
 * PageTransitionContext — global state for the brand curtain page transition.
 *
 * When a case study card is clicked, it stores:
 * - The card's bounding rect (for the expansion origin)
 * - The target brand color (for the curtain fill)
 * - The target slug (for navigation after the curtain fills)
 * - Optional logo URL (displayed during the hold)
 *
 * The TransitionOverlay reads this state and orchestrates the animation.
 */

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface TransitionPayload {
  /** The card element's bounding rect at the moment of click */
  rect: DOMRect;
  /** Brand background color for the curtain */
  color: string;
  /** Text color for any logo/wordmark on the curtain */
  textColor?: string;
  /** Where to navigate */
  slug: string;
  /** Optional logo image URL */
  logoUrl?: string;
}

interface PageTransitionContextValue {
  /** Start the curtain transition */
  startTransition: (payload: TransitionPayload) => void;
  /** Current transition (null when idle) */
  transition: TransitionPayload | null;
  /** Called by the overlay once the curtain has expanded and navigation fired */
  clearTransition: () => void;
  /** Whether the curtain is currently visible (expanding or contracting) */
  isTransitioning: boolean;
  setIsTransitioning: (v: boolean) => void;
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(
  null,
);

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [transition, setTransition] = useState<TransitionPayload | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = useCallback((payload: TransitionPayload) => {
    setTransition(payload);
    setIsTransitioning(true);
  }, []);

  const clearTransition = useCallback(() => {
    setTransition(null);
  }, []);

  return (
    <PageTransitionContext.Provider
      value={{
        startTransition,
        transition,
        clearTransition,
        isTransitioning,
        setIsTransitioning,
      }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error(
      "usePageTransition must be used within a PageTransitionProvider",
    );
  }
  return ctx;
}
