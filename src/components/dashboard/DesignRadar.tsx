"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { RadarTopic } from "@/lib/types";

/* ─── Fallback topics ─── */
const fallbackTopics: RadarTopic[] = [
  {
    id: "1",
    topic: "Spatial Interfaces",
    oneLiner: "I think depth is the new scroll",
    expandedCopy:
      "I keep thinking about how spatial computing isn't just for headsets. It's already changing how we layer, focus, and create depth on flat screens. The designers who master spatial thinking in 2D will define what comes next.",
    interest: 5,
    color: "#818CF8",
    order: 1,
  },
  {
    id: "2",
    topic: "Variable Fonts",
    oneLiner: "I believe type should be alive",
    expandedCopy:
      "One file, infinite expressions. I find it wild that we've shipped static fonts for decades. I'm exploring how type can respond to context, your scroll speed, your screen, even time of day. Typography shouldn't be frozen.",
    interest: 4,
    color: "#67E8F9",
    order: 2,
  },
  {
    id: "3",
    topic: "Design Tokens",
    oneLiner: "I'm obsessed with design-to-code bridges",
    expandedCopy:
      "I've been deep in token architecture lately. The gap between a designer's intention and what ships is where quality goes to die. I think tokens are the bridge, and most teams are barely scratching the surface.",
    interest: 4,
    color: "#A78BFA",
    order: 3,
  },
  {
    id: "4",
    topic: "Craft Culture",
    oneLiner: "I think craft is a team's secret weapon",
    expandedCopy:
      "I study teams where every 2px matters. Not because they're precious, but because that rigor compounds. The best products feel handmade at scale. Craft culture is what separates good from unforgettable.",
    interest: 3,
    color: "#E8A87C",
    order: 4,
  },
  {
    id: "5",
    topic: "Calm Technology",
    oneLiner: "I'm drawn to technology that whispers",
    expandedCopy:
      "I gravitate toward products that don't scream for your attention. Subtle cues, ambient awareness, respectful silence. The most powerful technology is the kind you barely notice, until you need it.",
    interest: 3,
    color: "#6EE7B7",
    order: 5,
  },
];

/* ─── Bubble sizing by interest level ─── */
function getBubbleSize(interest: number, isDesktop: boolean): number {
  if (isDesktop) {
    const sizes: Record<number, number> = { 1: 52, 2: 60, 3: 70, 4: 80, 5: 90 };
    return sizes[interest] ?? 64;
  }
  const sizes: Record<number, number> = { 1: 40, 2: 46, 3: 52, 4: 58, 5: 66 };
  return sizes[interest] ?? 52;
}

/* ─── Pre-computed positions (% based, responsive) ─── */
const positions = [
  { x: 50, y: 42 },   // center — highest interest sits here
  { x: 16, y: 18 },
  { x: 84, y: 18 },
  { x: 18, y: 70 },
  { x: 82, y: 70 },
  { x: 10, y: 44 },
  { x: 90, y: 44 },
  { x: 50, y: 82 },
];

/* ─── Hex helpers ─── */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

/* ─── 3D Glass Orb — white base + soft color mesh ─── */
function GlassOrb({
  color,
  size,
  isHovered,
  breathDuration,
  glowDelay,
}: {
  color: string;
  size: number;
  isHovered: boolean;
  breathDuration: number;
  glowDelay: number;
}) {
  const { r, g, b } = hexToRgb(color);

  return (
    <div
      className="relative overflow-hidden rounded-full"
      style={{
        width: size,
        height: size,
        animation: `radar-breathe ${breathDuration}s ease-in-out infinite`,
        animationDelay: `${glowDelay}s`,
        border: `1.5px solid rgba(${r},${g},${b},0.3)`,
        boxShadow: isHovered
          ? `0 4px 18px rgba(${r},${g},${b},0.14), inset 0 -2px 8px rgba(${r},${g},${b},0.06)`
          : `0 1px 6px rgba(${r},${g},${b},0.05), inset 0 -1px 4px rgba(${r},${g},${b},0.03)`,
        transition: "box-shadow 500ms ease",
      }}
    >
      {/* Base: white with stronger color wash */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `
            radial-gradient(circle at 30% 25%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 35%, transparent 65%),
            radial-gradient(circle at 65% 70%, rgba(${r},${g},${b},0.45) 0%, transparent 55%),
            radial-gradient(circle at 35% 60%, rgba(${r},${g},${b},0.25) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, rgba(${r},${g},${b},0.2) 100%)
          `,
        }}
      />

      {/* Orbiting color mesh — continuous circular motion */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `
            radial-gradient(circle at 70% 20%, rgba(${r},${g},${b},0.42) 0%, transparent 38%),
            radial-gradient(circle at 20% 75%, rgba(${Math.min(r + 40, 255)},${Math.min(g + 30, 255)},${Math.min(b + 50, 255)},0.3) 0%, transparent 42%)
          `,
          animation: `radar-orbit 7s linear infinite`,
          animationDelay: `${glowDelay}s`,
        }}
      />

      {/* Counter-rotating secondary wash */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `
            radial-gradient(circle at 35% 15%, rgba(${Math.min(r + 20, 255)},${Math.min(g + 20, 255)},${Math.min(b + 30, 255)},0.25) 0%, transparent 38%)
          `,
          animation: `radar-orbit 10s linear infinite reverse`,
          animationDelay: `${glowDelay + 1}s`,
        }}
      />

      {/* 3D highlight — top-left glass reflection */}
      <div
        className="absolute rounded-full"
        style={{
          top: "12%",
          left: "18%",
          width: "35%",
          height: "25%",
          background: "radial-gradient(ellipse, rgba(255,255,255,0.7) 0%, transparent 100%)",
          filter: "blur(2px)",
          transform: "rotate(-15deg)",
        }}
      />

      {/* Subtle edge rim */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid rgba(${r},${g},${b},0.25)`,
          animation: `radar-shimmer ${breathDuration + 1}s ease-in-out infinite`,
          animationDelay: `${glowDelay + 0.5}s`,
        }}
      />
    </div>
  );
}

/* ─── Single Topic Bubble ─── */
function TopicBubble({
  topic,
  index,
  anyExpanded,
  onExpand,
  canHoverRef,
  isDesktop,
}: {
  topic: RadarTopic;
  index: number;
  anyExpanded: boolean;
  onExpand: () => void;
  canHoverRef: React.RefObject<boolean>;
  isDesktop: boolean;
}) {
  const size = getBubbleSize(topic.interest, isDesktop);
  const pos = positions[index % positions.length];
  const [isHovered, setIsHovered] = useState(false);
  const { r, g, b } = hexToRgb(topic.color);

  const breathDuration = 3.5 + (index % 4) * 0.6;
  const floatDuration = 10 + (index % 5) * 2;
  const glowDelay = index * 0.8;

  /*
   * Hit area = orb size + 16px padding on each side for easy tapping.
   * Centered at the position point using calc() — NO transform needed.
   * This avoids the iOS bug where transform: translate(-50%, -50%)
   * causes the touch-hit-test area to not match the visual position.
   */
  const hitSize = size + 16;

  return (
    <div
      className="absolute cursor-pointer"
      style={{
        left: `calc(${pos.x}% - ${hitSize / 2}px)`,
        top: `calc(${pos.y}% - ${hitSize / 2}px)`,
        width: hitSize,
        height: hitSize,
        zIndex: isHovered ? 20 : 10,
        animation: `radar-float-${index % 6} ${floatDuration}s ease-in-out infinite`,
        animationDelay: `-${index * 2.3}s`,
        opacity: anyExpanded ? 0 : 1,
        transition: "opacity 350ms ease",
        pointerEvents: anyExpanded ? "none" : "auto",
        touchAction: "manipulation",
      }}
      role="button"
      tabIndex={0}
      onMouseEnter={() => canHoverRef.current && setIsHovered(true)}
      onMouseLeave={() => canHoverRef.current && setIsHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onExpand();
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onExpand();
      }}
    >
      {/* Soft glow halo — centered behind the orb */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: size + 28,
          height: size + 28,
          backgroundColor: topic.color,
          filter: "blur(22px)",
          animation: `radar-glow ${breathDuration}s ease-in-out infinite`,
          animationDelay: `${glowDelay}s`,
        }}
      />

      {/* Orb + hover radiance — centered in the hit area */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: size, height: size }}
      >
        {/* Soft radiating glow — visible on hover */}
        <div
          className="absolute rounded-full"
          style={{
            inset: -10,
            background: `conic-gradient(from 0deg, transparent 0%, rgba(${r},${g},${b},0.2) 15%, transparent 35%, rgba(${r},${g},${b},0.12) 55%, transparent 75%)`,
            animation: "radar-orbit 6s linear infinite",
            filter: "blur(6px)",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 400ms ease",
          }}
        />
        {/* Animated ring stroke — crisp tracing arc on hover */}
        <div
          className="absolute rounded-full"
          style={{
            inset: -4,
            background: `conic-gradient(from 0deg, transparent 0%, rgba(${r},${g},${b},0.6) 10%, rgba(${r},${g},${b},0.35) 22%, transparent 40%)`,
            WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))`,
            mask: `radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))`,
            animation: "radar-orbit 2.5s linear infinite",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 300ms ease",
          }}
        />
        {topic.imageUrl ? (
          <div
            className="relative overflow-hidden rounded-full"
            style={{
              width: size,
              height: size,
              animation: `radar-breathe ${breathDuration}s ease-in-out infinite`,
              animationDelay: `${glowDelay}s`,
              boxShadow: `0 4px 16px rgba(${r},${g},${b},0.12)`,
            }}
          >
            <Image
              src={topic.imageUrl}
              alt={topic.topic}
              fill
              className="object-cover"
              sizes={`${size}px`}
            />
          </div>
        ) : (
          <GlassOrb
            color={topic.color}
            size={size}
            isHovered={isHovered}
            breathDuration={breathDuration}
            glowDelay={glowDelay}
          />
        )}
      </div>

      {/* Label — below the hit area, centered */}
      <span
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-center font-brand text-11 font-semibold leading-tight text-brand-ink"
        style={{ top: hitSize + 2, maxWidth: 90 }}
      >
        {topic.topic}
      </span>

      {/* One-liner — frosted glass pill on hover (desktop only) */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: hitSize + 22,
          left: "50%",
          width: 200,
          opacity: isHovered ? 1 : 0,
          transform: `translateX(-50%) translateY(${isHovered ? "0" : "-4px"})`,
          transition: "opacity 250ms ease-out, transform 250ms ease-out",
        }}
      >
        <div
          className="rounded-lg px-3 py-1.5 text-center text-[11px] leading-snug text-brand-ink/70"
          style={{
            backgroundColor: "rgba(255, 252, 248, 0.7)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(0,0,0,0.04)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          {topic.oneLiner}
        </div>
      </div>
    </div>
  );
}

/* ─── Full-screen Expanded Overlay (rendered via portal) ─── */
function ExpandedOverlay({
  topic,
  onClose,
}: {
  topic: RadarTopic;
  onClose: () => void;
}) {
  const { r, g, b } = hexToRgb(topic.color);
  const copy = topic.expandedCopy || topic.oneLiner;

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="fixed inset-0 z-[100] flex items-center justify-center"
        onClick={onClose}
        style={{
          backgroundColor: `rgba(${r},${g},${b},0.12)`,
          backdropFilter: "blur(36px)",
          WebkitBackdropFilter: "blur(36px)",
        }}
      >
        {/* Color-tinted radial wash behind the orb */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(${r},${g},${b},0.15) 0%, transparent 60%)`,
          }}
        />

        {/* The expanded orb */}
        <motion.div
          className="relative z-10"
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.2, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 220 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Primary radar sweep — outer rotating radiance */}
          <div
            className="absolute -inset-10 rounded-full"
            style={{
              background: `conic-gradient(from 0deg, transparent 0%, rgba(${r},${g},${b},0.35) 15%, transparent 35%, rgba(${r},${g},${b},0.2) 55%, transparent 75%, rgba(${r},${g},${b},0.3) 95%, transparent 100%)`,
              animation: "radar-orbit 8s linear infinite",
              filter: "blur(8px)",
            }}
          />

          {/* Secondary radar sweep — counter-rotating for depth */}
          <div
            className="absolute -inset-12 rounded-full"
            style={{
              background: `conic-gradient(from 180deg, transparent 0%, rgba(${r},${g},${b},0.15) 25%, transparent 50%, rgba(${r},${g},${b},0.1) 75%, transparent 100%)`,
              animation: "radar-orbit 14s linear infinite reverse",
              filter: "blur(14px)",
            }}
          />

          {/* Pulsing outer glow */}
          <div
            className="absolute -inset-14 rounded-full"
            style={{
              backgroundColor: `rgba(${r},${g},${b},0.25)`,
              filter: "blur(44px)",
              animation: "radar-radiate 3.5s ease-in-out infinite",
            }}
          />

          {/* Main expanded glass sphere */}
          <div
            className="relative flex h-[280px] w-[280px] flex-col items-center justify-center overflow-hidden rounded-full sm:h-[360px] sm:w-[360px]"
            style={{
              animation: "radar-breathe-expanded 4s ease-in-out infinite",
              border: `1.5px solid rgba(${r},${g},${b},0.32)`,
              boxShadow: `
                0 0 50px rgba(${r},${g},${b},0.2),
                0 0 100px rgba(${r},${g},${b},0.1),
                inset 0 -8px 24px rgba(${r},${g},${b},0.15)
              `,
            }}
          >
            {/* Glass base with color mesh */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `
                  radial-gradient(circle at 30% 25%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 35%, transparent 60%),
                  radial-gradient(circle at 65% 70%, rgba(${r},${g},${b},0.35) 0%, transparent 50%),
                  radial-gradient(circle at 30% 65%, rgba(${Math.min(r + 30, 255)},${Math.min(g + 40, 255)},${Math.min(b + 30, 255)},0.2) 0%, transparent 45%),
                  radial-gradient(circle at 75% 30%, rgba(${r},${g},${b},0.2) 0%, transparent 50%),
                  radial-gradient(circle at 50% 50%, rgba(255,255,255,0.85) 0%, rgba(${r},${g},${b},0.18) 100%)
                `,
              }}
            />

            {/* Orbiting color mesh inside expanded sphere */}
            <div
              className="absolute inset-[-6px] rounded-full"
              style={{
                background: `
                  radial-gradient(circle at 60% 25%, rgba(${r},${g},${b},0.2) 0%, transparent 40%),
                  radial-gradient(circle at 30% 70%, rgba(${Math.min(r + 30, 255)},${Math.min(g + 30, 255)},${Math.min(b + 40, 255)},0.15) 0%, transparent 40%)
                `,
                animation: "radar-orbit 12s linear infinite",
              }}
            />

            {/* Counter-rotating inner shimmer */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, transparent 0%, rgba(${r},${g},${b},0.1) 25%, transparent 50%, rgba(${r},${g},${b},0.08) 75%, transparent 100%)`,
                animation: "radar-orbit 16s linear infinite reverse",
              }}
            />

            {/* 3D highlight */}
            <div
              className="absolute rounded-full"
              style={{
                top: "10%",
                left: "15%",
                width: "40%",
                height: "22%",
                background: "radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, transparent 100%)",
                filter: "blur(4px)",
                transform: "rotate(-15deg)",
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-3 px-10 text-center sm:px-14">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-ink/40">
                {topic.topic}
              </span>
              <p className="text-[12px] leading-[1.6] text-brand-ink/75 sm:text-[13px]">
                {copy}
              </p>
            </div>

            {/* Inner rim */}
            <div
              className="absolute inset-[2px] rounded-full"
              style={{
                border: `1px solid rgba(${r},${g},${b},0.22)`,
              }}
            />
          </div>
        </motion.div>

        {/* Close hint */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 text-[11px] text-brand-ink/30"
        >
          tap anywhere to close
        </motion.p>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

/* ─── Main Design Radar Component ─── */
interface DesignRadarProps {
  topics?: RadarTopic[];
}

export function DesignRadar({ topics }: DesignRadarProps) {
  const items = topics && topics.length > 0 ? topics : fallbackTopics;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const canHoverRef = useRef(false);

  useEffect(() => {
    canHoverRef.current = window.matchMedia("(hover: hover)").matches;
    const mq = window.matchMedia("(min-width: 640px)");
    setIsDesktop(mq.matches);
    const handler = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const sorted = [...items].sort((a, b) => b.interest - a.interest);

  const expandedTopic = expandedIndex !== null ? sorted[expandedIndex] : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.8,
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      }}
      className="flex-1"
    >
      <div className="flex h-full flex-col rounded-xl border border-sand-300 bg-sand-100 p-[25px]">
        {/* Header */}
        <div className="mb-2">
          <h3 className="font-brand text-15 font-bold text-brand-ink">
            Design Radar
          </h3>
          <p className="mt-0.5 text-12 text-neutral-400">
            What I&apos;m currently exploring
          </p>
        </div>

        {/* Constellation area */}
        <div className="relative flex-1 min-h-[260px] lg:min-h-[300px]">
          {/* Concentric rings */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {[34, 58, 84].map((pct, i) => (
              <div
                key={pct}
                className="absolute rounded-full border border-sand-300"
                style={{
                  width: `${pct}%`,
                  height: `${pct}%`,
                  opacity: 0.08,
                  animation: `radar-ring-pulse 6s ease-in-out infinite`,
                  animationDelay: `${i * 1.5}s`,
                }}
              />
            ))}
          </div>

          {/* Topic bubbles */}
          {sorted.map((topic, i) => (
            <TopicBubble
              key={topic.id}
              topic={topic}
              index={i}
              anyExpanded={expandedIndex !== null}
              onExpand={() => setExpandedIndex(i)}
              canHoverRef={canHoverRef}
              isDesktop={isDesktop}
            />
          ))}
        </div>
      </div>

      {/* Full-screen expanded overlay — portaled to <body> */}
      {expandedTopic && (
        <ExpandedOverlay
          topic={expandedTopic}
          onClose={() => setExpandedIndex(null)}
        />
      )}

      {/* Keyframes */}
      <style>{`
        @keyframes radar-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        @keyframes radar-breathe-expanded {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.025); }
        }
        @keyframes radar-glow {
          0%, 100% { opacity: 0.06; }
          50% { opacity: 0.18; }
        }
        @keyframes radar-shimmer {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.02); }
        }
        /* radar-mesh-shift removed — now using radar-orbit for continuous circular motion */
        @keyframes radar-ring-pulse {
          0%, 100% { opacity: 0.06; transform: scale(1); }
          50% { opacity: 0.12; transform: scale(1.02); }
        }
        @keyframes radar-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes radar-radiate {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.08); }
        }

        @keyframes radar-float-0 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(3px, -4px); }
          66% { transform: translate(-2px, 3px); }
        }
        @keyframes radar-float-1 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(-3px, 2px); }
          66% { transform: translate(2px, -4px); }
        }
        @keyframes radar-float-2 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(2px, 4px); }
          66% { transform: translate(-3px, -2px); }
        }
        @keyframes radar-float-3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(4px, -3px); }
        }
        @keyframes radar-float-4 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-3px, 3px); }
        }
        @keyframes radar-float-5 {
          0%, 100% { transform: translate(0, 0); }
          40% { transform: translate(3px, 3px); }
          80% { transform: translate(-2px, -3px); }
        }

        /* Disable float on mobile — CSS transform animations break iOS touch targets */
        @media (max-width: 639px) {
          @keyframes radar-float-0 { 0%, 100% { transform: none; } }
          @keyframes radar-float-1 { 0%, 100% { transform: none; } }
          @keyframes radar-float-2 { 0%, 100% { transform: none; } }
          @keyframes radar-float-3 { 0%, 100% { transform: none; } }
          @keyframes radar-float-4 { 0%, 100% { transform: none; } }
          @keyframes radar-float-5 { 0%, 100% { transform: none; } }
        }
      `}</style>
    </motion.div>
  );
}
