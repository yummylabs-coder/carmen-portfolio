"use client";

/**
 * Client-side wrapper that provides the page transition context
 * and renders the overlay. Used in the root layout.
 */

import { type ReactNode } from "react";
import { PageTransitionProvider } from "./PageTransitionContext";
import { TransitionOverlay } from "./TransitionOverlay";

export function TransitionProvider({ children }: { children: ReactNode }) {
  return (
    <PageTransitionProvider>
      {children}
      <TransitionOverlay />
    </PageTransitionProvider>
  );
}
