"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SPLASH_KEY = "carmen-splash-shown";

interface SplashScreenProps {
  /** Fires when the splash is fully gone — dashboard should cascade in */
  onComplete?: () => void;
  /** Fires immediately if the splash won't show (already seen this session) */
  onSkipped?: () => void;
}

/**
 * "The Awakening" splash screen.
 *
 * Phase 1 — Emergence:
 *   On a deep brand-blue void, the logo mark draws itself in at generous
 *   scale. The white swoosh traces its path, fills, and the yellow accent
 *   dot bounces to life. "Carmen." materializes from blur below.
 *   "Product Designer" follows softly. An ambient glow breathes behind.
 *
 * Phase 2 — The Bloom:
 *   Text, swoosh, and logo background dissolve, leaving only the yellow
 *   dot — a single point of light. It gathers energy, then blooms outward
 *   with deliberate pacing: slow start, accelerating middle, smooth landing.
 *   Yellow warmth transitions to sand, covering the viewport. The splash
 *   fades away, and dashboard sections cascade in one by one.
 *
 * Only shows once per browser session (sessionStorage).
 */
export function SplashScreen({ onComplete, onSkipped }: SplashScreenProps) {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<"intro" | "bloom">("intro");
  const isBloom = phase === "bloom";

  // Stable refs so timer closures always have the latest callbacks
  const onCompleteRef = useRef(onComplete);
  const onSkippedRef = useRef(onSkipped);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });
  useEffect(() => {
    onSkippedRef.current = onSkipped;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem(SPLASH_KEY)) {
      // Already shown this session — skip splash, notify parent immediately
      onSkippedRef.current?.();
      return;
    }

    sessionStorage.setItem(SPLASH_KEY, "1");
    setShow(true);

    // Phase 2 — bloom after the intro has lived for a moment
    const bloomTimer = setTimeout(() => setPhase("bloom"), 2400);
    // Start exit — AnimatePresence fades the splash out
    const exitTimer = setTimeout(() => setShow(false), 4000);
    // Signal dashboard to cascade content in
    const completeTimer = setTimeout(
      () => onCompleteRef.current?.(),
      4200
    );

    return () => {
      clearTimeout(bloomTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#2216FF" }}
          exit={{
            opacity: 0,
            transition: { duration: 0.2, ease: "easeOut" },
          }}
        >
          {/* ── Ambient glow ── */}
          <motion.div
            className="pointer-events-none absolute"
            style={{
              width: 340,
              height: 340,
              left: "50%",
              top: "50%",
              x: "-50%",
              y: "-60%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
              zIndex: 5,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              isBloom
                ? { opacity: 0, scale: 0.8 }
                : {
                    opacity: [0, 0.8, 0.5, 0.8],
                    scale: [0.5, 1.05, 0.97, 1.02],
                  }
            }
            transition={
              isBloom
                ? { duration: 0.3, ease: "easeOut" }
                : {
                    duration: 4,
                    ease: "easeInOut",
                    times: [0, 0.3, 0.6, 1],
                  }
            }
          />

          {/* ── Content ── */}
          <div className="relative z-10 flex flex-col items-center">
            {/* ── Logo Mark — large and prominent ── */}
            <motion.svg
              width={96}
              height={96}
              viewBox="0 0 39 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              {/* Blue background — fades during bloom */}
              <motion.rect
                width="38.4888"
                height="38.4888"
                rx="8"
                fill="#2216FF"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="0.8"
                initial={{ opacity: 0 }}
                animate={{ opacity: isBloom ? 0 : 1 }}
                transition={{
                  duration: isBloom ? 0.35 : 0.4,
                  ease: "easeOut",
                }}
              />

              {/* White swoosh — draws in, fades during bloom */}
              <motion.path
                d="M24.7153 30.2719C26.4976 29.7036 28.1237 28.748 29.5938 27.4049C29.9037 27.1218 29.9735 26.665 29.7828 26.2911L27.4411 21.7009C27.1422 21.1149 26.3584 20.9974 25.8136 21.366C24.835 22.0282 23.7801 22.3247 22.649 22.2557C21.1056 22.1547 19.6091 21.3794 18.1595 19.9298C17.4239 19.1942 16.8433 18.3467 16.4178 17.3875C15.9851 16.4211 15.7831 15.4908 15.812 14.5965C15.8294 14.2355 15.8886 13.9022 15.9895 13.5965C16.2008 12.9561 16.0592 12.1225 15.4466 11.8406L11.2883 9.92682C10.9201 9.75733 10.4822 9.83257 10.2114 10.1342C8.78037 11.7283 7.94977 13.5086 7.71958 15.4751C7.46428 17.629 7.5279 19.606 8.32238 21.675C9.13234 23.7594 10.7058 24.9818 12.3502 26.6262C14.3191 28.5951 16.3709 29.8608 18.5057 30.4234C20.6477 30.9787 22.7175 30.9282 24.7153 30.2719Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="white"
                initial={{ pathLength: 0, fillOpacity: 0, strokeOpacity: 1 }}
                animate={
                  isBloom
                    ? { pathLength: 1, fillOpacity: 0, strokeOpacity: 0 }
                    : { pathLength: 1, fillOpacity: 1, strokeOpacity: 0 }
                }
                transition={
                  isBloom
                    ? {
                        fillOpacity: { duration: 0.3, ease: "easeOut" },
                        strokeOpacity: { duration: 0.2 },
                      }
                    : {
                        pathLength: {
                          delay: 0.3,
                          duration: 1.1,
                          ease: "easeInOut",
                        },
                        fillOpacity: {
                          delay: 1.2,
                          duration: 0.4,
                          ease: "easeOut",
                        },
                        strokeOpacity: { delay: 1.4, duration: 0.25 },
                      }
                }
              />

              {/* Yellow dot — stays longer, hands off to portal */}
              <motion.rect
                x="26.3203"
                y="8.5"
                width="8"
                height="8"
                rx="4"
                transform="rotate(60 26.3203 8.5)"
                fill="#F1FF53"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: isBloom ? 0 : 1 }}
                transition={
                  isBloom
                    ? {
                        opacity: {
                          delay: 0.45,
                          duration: 0.15,
                          ease: "easeOut",
                        },
                      }
                    : {
                        delay: 1.4,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 500,
                        damping: 14,
                      }
                }
              />
            </motion.svg>

            {/* ── Name ── */}
            <motion.div
              className="mt-5 flex items-baseline"
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{
                opacity: isBloom ? 0 : 1,
                y: isBloom ? -10 : 0,
                filter: isBloom ? "blur(6px)" : "blur(0px)",
              }}
              transition={
                isBloom
                  ? { duration: 0.4, ease: [0.4, 0, 1, 1] }
                  : {
                      delay: 0.15,
                      duration: 0.9,
                      ease: [0.25, 0.4, 0.25, 1],
                    }
              }
            >
              <span
                className="font-brand text-[38px] font-bold text-white sm:text-[48px]"
                style={{ lineHeight: 1.1 }}
              >
                Carmen
              </span>
              <motion.span
                className="font-brand text-[38px] font-bold sm:text-[48px]"
                style={{ lineHeight: 1.1, color: "#F1FF53" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: isBloom ? 0 : 1,
                  scale: isBloom ? 0.5 : 1,
                }}
                transition={
                  isBloom
                    ? { duration: 0.3 }
                    : {
                        delay: 1.0,
                        duration: 0.4,
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                      }
                }
              >
                .
              </motion.span>
            </motion.div>

            {/* ── Role ── */}
            <motion.p
              className="mt-2 font-body text-[12px] font-medium uppercase tracking-[0.22em] text-white/30 sm:mt-2.5 sm:text-[14px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isBloom ? 0 : 1,
                y: isBloom ? -6 : 0,
              }}
              transition={
                isBloom
                  ? { duration: 0.25, ease: "easeIn" }
                  : { delay: 0.55, duration: 0.8, ease: "easeOut" }
              }
            >
              Product Designer
            </motion.p>
          </div>

          {/* ── The Portal — yellow dot blooms into the world ──
           *
           * Positioned at the dot's screen location in the 96px logo.
           * Dot center in viewBox: ~(24.86, 13.96) → pixel: ~(61, 34).
           * Relative to viewport center: +13px right, -60px above.
           */}
          {isBloom && (
            <motion.div
              className="absolute rounded-full"
              style={{
                width: "300vmax",
                height: "300vmax",
                left: "calc(50% + 13px)",
                top: "calc(50% - 60px)",
                x: "-50%",
                y: "-50%",
                zIndex: 20,
              }}
              initial={{
                scale: 0,
                backgroundColor: "#F1FF53",
                boxShadow: "0 0 60px 30px rgba(241,255,83,0.3)",
              }}
              animate={{
                scale: 1,
                backgroundColor: "#FFFEFC",
                boxShadow: "0 0 80px 40px rgba(255,254,252,0.04)",
              }}
              transition={{
                scale: {
                  delay: 0.45,
                  duration: 1.4,
                  ease: [0.45, 0, 0.15, 1],
                },
                backgroundColor: {
                  delay: 0.75,
                  duration: 0.9,
                  ease: "easeInOut",
                },
                boxShadow: {
                  delay: 0.6,
                  duration: 1.0,
                  ease: "easeOut",
                },
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
