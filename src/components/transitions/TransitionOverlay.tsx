"use client";

/**
 * TransitionOverlay — the "brand curtain" page transition.
 *
 * Lifecycle:
 * 1. Card click → context receives payload (rect, color, slug)
 * 2. PHASE 1 — EXPAND: A div positioned at the card's rect springs to fill the viewport.
 *    The brand color floods the screen. A subtle wordmark fades in at center.
 * 3. PHASE 2 — NAVIGATE: router.push() fires. The new page loads underneath.
 * 4. PHASE 3 — REVEAL: The curtain slides up and out, revealing the case study hero.
 *
 * Rendered once, at root layout level. Uses createPortal to sit above everything.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { usePageTransition } from "./PageTransitionContext";

type Phase = "idle" | "expanding" | "holding" | "navigated" | "revealing";

export function TransitionOverlay() {
  const router = useRouter();
  const pathname = usePathname();
  const { transition, clearTransition, setIsTransitioning } =
    usePageTransition();
  const shouldReduce = useReducedMotion();

  const [phase, setPhase] = useState<Phase>("idle");
  const [mounted, setMounted] = useState(false);
  const targetSlugRef = useRef<string | null>(null);
  const prevPathnameRef = useRef(pathname);

  // Portal mount check
  useEffect(() => {
    setMounted(true);
  }, []);

  // ─── Phase 1: Kick off expansion when transition arrives ───
  useEffect(() => {
    if (!transition) return;
    targetSlugRef.current = transition.slug;

    if (shouldReduce) {
      // Skip animation — navigate immediately
      router.push(`/work/${transition.slug}`);
      clearTransition();
      setIsTransitioning(false);
      return;
    }

    setPhase("expanding");
  }, [transition, shouldReduce, router, clearTransition, setIsTransitioning]);

  // ─── Phase 2: After expansion, hold briefly then navigate ───
  const onExpandComplete = useCallback(() => {
    if (phase !== "expanding") return;
    setPhase("holding");

    // Brief hold for the brand moment, then navigate
    const holdTimer = setTimeout(() => {
      if (targetSlugRef.current) {
        router.push(`/work/${targetSlugRef.current}`);
        setPhase("navigated");
      }
    }, 300);

    return () => clearTimeout(holdTimer);
  }, [phase, router]);

  // ─── Phase 3: Detect when navigation completes (pathname changes) ───
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;

      if (phase === "navigated" || phase === "holding") {
        // The new page has mounted — start the reveal
        // Small delay to let the new page render its first frame
        const revealTimer = setTimeout(() => {
          setPhase("revealing");
        }, 100);
        return () => clearTimeout(revealTimer);
      }
    }
  }, [pathname, phase]);

  // ─── Phase 4: After reveal animation completes, clean up ───
  const onRevealComplete = useCallback(() => {
    if (phase !== "revealing") return;
    setPhase("idle");
    clearTransition();
    setIsTransitioning(false);
    targetSlugRef.current = null;
  }, [phase, clearTransition, setIsTransitioning]);

  if (!mounted) return null;

  const isActive = phase !== "idle" && transition;

  // Calculate the expansion origin from the card rect
  const rect = transition?.rect;
  const color = transition?.color ?? "#FECB3A";
  const textColor = transition?.textColor ?? "#300101";

  // We animate from the card's position/size to full viewport
  const initial = rect
    ? {
        position: "fixed" as const,
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        borderRadius: 24, // matches card's rounded-3xl
      }
    : {
        position: "fixed" as const,
        top: "50%",
        left: "50%",
        width: 0,
        height: 0,
        borderRadius: 999,
      };

  const expanded = {
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    borderRadius: 0,
  };

  // Logo visible during hold phase, fades out during reveal
  const showLogo =
    phase === "holding" || phase === "navigated" || phase === "revealing";
  const logoVisible = phase === "holding" || phase === "navigated";

  return createPortal(
    <>
      {/* Curtain — managed by AnimatePresence / Framer Motion */}
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            key="brand-curtain"
            className="pointer-events-auto"
            style={{
              position: "fixed",
              backgroundColor: color,
              overflow: "hidden",
              zIndex: 9999,
            }}
            initial={initial}
            animate={
              phase === "revealing"
                ? {
                    opacity: 0,
                    transition: {
                      duration: 0.5,
                      ease: [0.25, 0.4, 0.25, 1],
                    },
                  }
                : {
                    ...expanded,
                    transition: {
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }
            }
            exit={{
              opacity: 0,
              transition: { duration: 0 },
            }}
            onAnimationComplete={() => {
              if (phase === "expanding") {
                onExpandComplete();
              } else if (phase === "revealing") {
                onRevealComplete();
              }
            }}
          />
        )}
      </AnimatePresence>

      {/*
        Logo — completely outside AnimatePresence.
        Plain div, CSS transition only. No framer-motion.
        It never moves. Only opacity changes.
      */}
      {showLogo && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
            pointerEvents: "none",
            opacity: logoVisible ? 1 : 0,
            transition: logoVisible
              ? "opacity 0.3s ease-out"
              : "opacity 0.15s ease-out",
          }}
        >
          {transition?.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={transition.logoUrl}
              alt=""
              style={{ height: 80, width: "auto", objectFit: "contain" }}
            />
          ) : (
            <div style={{ color: textColor, opacity: 0.25 }}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
              >
                <circle cx="24" cy="24" r="5" fill="currentColor" opacity="0.4" />
                <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1" opacity="0.2" />
                <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
              </svg>
            </div>
          )}
        </div>
      )}
    </>,
    document.body,
  );
}
