"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Voice commands — cycle through on repeated mic taps
   ───────────────────────────────────────────────────────────── */
const COMMANDS = [
  {
    text: "What's on my schedule this afternoon?",
    items: [
      { icon: "📅", title: "Meeting with Design Team", sub: "2:00 — 3:00 PM" },
      { icon: "☕", title: "Coffee with Alex", sub: "4:30 PM" },
    ],
  },
  {
    text: "How's the weather looking?",
    items: [
      { icon: "☀️", title: "Sunny, 72°F", sub: "Clear skies all afternoon" },
      { icon: "🌬️", title: "Light westerly breeze", sub: "5 mph" },
    ],
  },
  {
    text: "Any new messages?",
    items: [
      { icon: "💬", title: "Alex: Still on for coffee?", sub: "2 min ago" },
      { icon: "📎", title: "Design: Updated mockups", sub: "15 min ago" },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   Gesture definitions
   ───────────────────────────────────────────────────────────── */
const GESTURES = [
  { id: "wave", label: "Wave", action: "Dismiss" },
  { id: "pinch", label: "Pinch", action: "Select" },
  { id: "fist", label: "Fist", action: "Focus" },
  { id: "open", label: "Open", action: "Browse" },
  { id: "push", label: "Push", action: "Send" },
] as const;

type GestureId = (typeof GESTURES)[number]["id"];

/* Waveform seeds (stable across renders) */
const BAR_COUNT = 28;
const SEEDS = Array.from({ length: BAR_COUNT }, () => Math.random());

/* =============================================================
   SVG Icons
   ============================================================= */
function MicIcon({
  active = false,
  size = 16,
}: {
  active?: boolean;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <rect
        x="9"
        y="2"
        width="6"
        height="12"
        rx="3"
        fill={active ? "rgba(255,255,255,0.2)" : "none"}
      />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <path d="M12 17v4M8 21h8" />
    </svg>
  );
}

function GestureIconSvg({ id, size = 20 }: { id: GestureId; size?: number }) {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (id) {
    case "wave":
      return (
        <svg {...p}>
          <path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0" />
          <path d="M20 7l2-1.5M20 17l2 1.5" opacity="0.4" />
        </svg>
      );
    case "pinch":
      return (
        <svg {...p}>
          <path d="M5 5l5 5M19 5l-5 5M5 19l5-5M19 19l-5-5" />
          <circle
            cx="12"
            cy="12"
            r="1.5"
            fill="currentColor"
            opacity="0.4"
          />
        </svg>
      );
    case "fist":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.15" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="9.5" opacity="0.35" />
        </svg>
      );
    case "open":
      return (
        <svg {...p}>
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
          <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
        </svg>
      );
    case "push":
      return (
        <svg {...p}>
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </svg>
      );
  }
}

/* =============================================================
   Canvas Waveform — always animating, intensifies when active
   ============================================================= */
function Waveform({
  active,
  className = "",
}: {
  active: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const barW = 3;
    const gap = 3;
    const w = BAR_COUNT * (barW + gap) - gap;
    const h = 48;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    let raf: number;
    function draw(t: number) {
      ctx!.clearRect(0, 0, w, h);
      const on = activeRef.current;
      for (let i = 0; i < BAR_COUNT; i++) {
        const s = SEEDS[i];
        const p1 = t * (on ? 0.007 : 0.002) + s * Math.PI * 2;
        const p2 = t * (on ? 0.005 : 0.0015) + s * Math.PI * 3;
        const wave = ((Math.sin(p1) + Math.sin(p2)) / 2 + 1) / 2;
        const minH = on ? 6 : 3;
        const maxH = on ? h * 0.85 : h * 0.28;
        const bH = minH + wave * (maxH - minH) * (0.4 + s * 0.6);
        const x = i * (barW + gap);
        const y = (h - bH) / 2;
        const a = on ? 0.3 + wave * 0.5 : 0.1 + wave * 0.15;

        ctx!.fillStyle = `rgba(255,255,255,${a})`;
        ctx!.fillRect(x, y, barW, bH);
      }
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}

/* =============================================================
   Response Card — animates based on active gesture
   ============================================================= */
function ResponseCard({
  items,
  gesture,
  cmdIdx,
}: {
  items: (typeof COMMANDS)[number]["items"];
  gesture: GestureId | null;
  cmdIdx: number;
}) {
  const cardBase =
    "rounded-xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm";

  const renderItems = (
    list: (typeof COMMANDS)[number]["items"],
    highlight?: number,
  ) => (
    <div className="space-y-1.5">
      {list.map((item, i) => (
        <motion.div
          key={i}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
            highlight === i
              ? "bg-white/10 ring-1 ring-white/25"
              : "bg-white/[0.03]"
          }`}
          animate={
            gesture === "pinch" && highlight !== undefined
              ? i === highlight
                ? { scale: 1.02 }
                : { opacity: 0.3 }
              : {}
          }
          transition={{ duration: 0.3 }}
        >
          <span className="text-sm">{item.icon}</span>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium text-white/85">
              {item.title}
            </p>
            <p className="text-[11px] text-white/35">{item.sub}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );

  /* Card animation per gesture */
  const cardAnimate = (() => {
    switch (gesture) {
      case "wave":
        return { x: 280, opacity: 0, rotate: 6 };
      case "fist":
        return { scale: 1.04 };
      case "push":
        return { y: -120, scale: 0.75, opacity: 0 };
      default:
        return { x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 };
    }
  })();

  const cardTransition =
    gesture === "wave" || gesture === "push"
      ? { type: "spring" as const, damping: 18, stiffness: 140 }
      : { duration: 0.35, ease: "easeOut" as const };

  return (
    <div className="relative">
      {/* Ghost cards for "open" (browse) gesture */}
      <AnimatePresence>
        {gesture === "open" &&
          [-1, 1].map((dir) => {
            const idx = (cmdIdx + dir + COMMANDS.length) % COMMANDS.length;
            return (
              <motion.div
                key={dir}
                className={`absolute inset-0 ${cardBase}`}
                initial={{ x: 0, rotate: 0, opacity: 0 }}
                animate={{
                  x: dir * 50,
                  rotate: dir * 5,
                  opacity: 0.35,
                  scale: 0.95,
                }}
                exit={{ x: 0, rotate: 0, opacity: 0, scale: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 180 }}
                style={{ zIndex: 0 }}
              >
                {renderItems(COMMANDS[idx].items)}
              </motion.div>
            );
          })}
      </AnimatePresence>

      {/* Main card */}
      <motion.div
        className={`relative z-10 ${cardBase}`}
        initial={{ y: 20, opacity: 0, scale: 0.97 }}
        animate={cardAnimate}
        exit={{ y: 20, opacity: 0, scale: 0.97 }}
        transition={cardTransition}
        style={
          gesture === "fist"
            ? { boxShadow: "0 0 30px rgba(255,255,255,0.06)" }
            : undefined
        }
      >
        {renderItems(items, gesture === "pinch" ? 0 : undefined)}
      </motion.div>
    </div>
  );
}

/* =============================================================
   Gesture Button
   ============================================================= */
function GestureButton({
  gesture,
  active,
  enabled,
  onClick,
}: {
  gesture: (typeof GESTURES)[number];
  active: boolean;
  enabled: boolean;
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <motion.button
      onClick={enabled ? onClick : undefined}
      className={`flex flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 transition-colors sm:px-3 sm:py-2 ${
        enabled
          ? "cursor-pointer text-white/60 hover:bg-white/5 hover:text-white/90 active:bg-white/10"
          : "cursor-default text-white/20"
      }`}
      animate={active ? { scale: 1.15 } : {}}
      transition={{ type: "spring", damping: 15, stiffness: 200 }}
    >
      <GestureIconSvg id={gesture.id} size={20} />
      <span className="text-[10px] font-medium tracking-wide">
        {gesture.label}
      </span>
      <span className="text-[8px] text-white/25 sm:text-[9px]">
        {gesture.action}
      </span>
    </motion.button>
  );
}

/* =============================================================
   Checkmark confirmation (after Push gesture)
   ============================================================= */
function Checkmark() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", damping: 12, stiffness: 200 }}
      className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12l5 5L19 7" />
      </svg>
    </motion.div>
  );
}

/* =============================================================
   Main Component
   ============================================================= */
export function InteractionLayerDemo({
  className = "",
}: {
  className?: string;
  mobile?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleId = useRef(0);

  const [voicePhase, setVoicePhase] = useState<
    "idle" | "listening" | "typing" | "responding"
  >("idle");
  const [cmdIdx, setCmdIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [activeGesture, setActiveGesture] = useState<GestureId | null>(null);
  const [showResponse, setShowResponse] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);

  const command = COMMANDS[cmdIdx];
  const isVoiceBusy = voicePhase === "listening" || voicePhase === "typing";
  const gesturesEnabled =
    showResponse && !activeGesture && voicePhase === "responding";

  /* ── Typewriter effect ── */
  useEffect(() => {
    if (voicePhase !== "typing") return;
    const text = command.text;
    let i = 0;
    setTypedText("");
    const interval = setInterval(() => {
      i++;
      setTypedText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(() => {
          setVoicePhase("responding");
          setShowResponse(true);
        }, 500);
      }
    }, 35);
    return () => clearInterval(interval);
  }, [voicePhase, command.text]);

  /* ── Voice tap ── */
  const handleVoiceTap = useCallback(() => {
    if (isVoiceBusy || activeGesture) return;

    if (voicePhase === "responding") {
      setShowResponse(false);
      setVoicePhase("idle");
      setTypedText("");
      setCmdIdx((i) => (i + 1) % COMMANDS.length);
      return;
    }

    // Start voice sequence
    setVoicePhase("listening");
    setTimeout(() => setVoicePhase("typing"), 900);
  }, [voicePhase, isVoiceBusy, activeGesture]);

  /* ── Gesture tap ── */
  const handleGestureTap = useCallback(
    (id: GestureId, e: React.MouseEvent) => {
      if (activeGesture || !showResponse) return;

      // Haptic ripple at tap position
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rid = ++rippleId.current;
        setRipples((prev) => [...prev, { x, y, id: rid }]);
        setTimeout(
          () => setRipples((prev) => prev.filter((r) => r.id !== rid)),
          1000,
        );
      }

      setActiveGesture(id);

      if (id === "wave") {
        // Card slides away, then cleanup
        setTimeout(() => {
          setShowResponse(false);
          setActiveGesture(null);
          setVoicePhase("idle");
          setTypedText("");
        }, 800);
      } else if (id === "push") {
        // Card flies up, show checkmark, then cleanup
        setTimeout(() => {
          setShowResponse(false);
          setShowCheck(true);
          setActiveGesture(null);
        }, 700);
        setTimeout(() => {
          setShowCheck(false);
          setVoicePhase("idle");
          setTypedText("");
        }, 1800);
      } else {
        // pinch, fist, open — effect plays then resets
        const resetMs = id === "open" ? 2200 : 1500;
        setTimeout(() => {
          setActiveGesture(null);
        }, resetMs);
      }
    },
    [activeGesture, showResponse],
  );

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center overflow-hidden ${className}`}
      style={{
        background:
          "radial-gradient(ellipse at 50% 20%, #0f1729 0%, #080c14 60%, #050709 100%)",
      }}
    >
      {/* ── Haptic ripples ── */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="pointer-events-none absolute z-40"
          style={{ left: r.x, top: r.y }}
        >
          {[0, 1, 2].map((ring) => (
            <motion.div
              key={ring}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15"
              initial={{ width: 0, height: 0, opacity: 0.5 }}
              animate={{
                width: 60 + ring * 40,
                height: 60 + ring * 40,
                opacity: 0,
              }}
              transition={{
                duration: 0.7,
                delay: ring * 0.08,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      ))}

      {/* ── Content area ── */}
      <div className="flex flex-1 flex-col items-center justify-center px-5 sm:px-8">
        {/* Voice bubble + waveform (dims during "fist" gesture) */}
        <div
          className={`flex flex-col items-center transition-opacity duration-300 ${
            activeGesture === "fist" ? "opacity-15" : ""
          }`}
        >
          {/* Voice bubble */}
          <div onClick={handleVoiceTap} className="cursor-pointer select-none">
            <AnimatePresence mode="wait">
              {voicePhase === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 backdrop-blur-sm"
                >
                  <motion.div
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <MicIcon size={16} />
                  </motion.div>
                  <span className="text-[13px] text-white/35">
                    Tap to speak…
                  </span>
                </motion.div>
              )}

              {voicePhase === "listening" && (
                <motion.div
                  key="listening"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/[0.07] px-5 py-2.5 backdrop-blur-sm"
                >
                  <MicIcon size={16} active />
                  <span className="text-[13px] text-white/60">
                    Listening…
                  </span>
                </motion.div>
              )}

              {(voicePhase === "typing" || voicePhase === "responding") && (
                <motion.div
                  key="text"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="max-w-[320px] rounded-2xl border border-white/15 bg-white/[0.07] px-5 py-2.5 backdrop-blur-sm sm:max-w-[400px]"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5">
                      <MicIcon
                        size={16}
                        active={voicePhase === "typing"}
                      />
                    </div>
                    <span className="text-[13px] leading-relaxed text-white/80">
                      {typedText}
                      {voicePhase === "typing" && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="ml-0.5 text-white/40"
                        >
                          |
                        </motion.span>
                      )}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Waveform */}
          <div className="my-4 sm:my-5">
            <Waveform
              active={voicePhase === "listening" || voicePhase === "typing"}
            />
          </div>
        </div>

        {/* Response card area */}
        <div className="w-full max-w-[320px] sm:max-w-[360px]">
          <AnimatePresence mode="wait">
            {showResponse && !showCheck && (
              <ResponseCard
                key="card"
                items={command.items}
                gesture={activeGesture}
                cmdIdx={cmdIdx}
              />
            )}
            {showCheck && (
              <motion.div
                key="check"
                className="flex justify-center py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Checkmark />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Gesture bar ── */}
      <div className="flex w-full flex-col items-center border-t border-white/[0.06] px-3 pb-4 pt-2 sm:px-6 sm:pb-5">
        <AnimatePresence>
          {gesturesEnabled && !activeGesture && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-1.5 text-[10px] text-white/20"
            >
              tap a gesture to interact
            </motion.p>
          )}
        </AnimatePresence>
        <div className="flex items-start justify-center gap-1 sm:gap-3">
          {GESTURES.map((g) => (
            <GestureButton
              key={g.id}
              gesture={g}
              active={activeGesture === g.id}
              enabled={gesturesEnabled}
              onClick={(e) => handleGestureTap(g.id, e)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
