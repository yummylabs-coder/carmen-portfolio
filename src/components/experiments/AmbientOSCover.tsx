"use client";

/**
 * Lightweight animated cover for the Ambient OS experiment card.
 * Pure CSS — no RAF, no interactivity. Just soft orbiting circles
 * matching the real demo's color palette.
 */

const COVER_ORBS = [
  { color: "#FF6B8A", size: 40, x: 22, y: 30, dur: 7 },
  { color: "#A78BFA", size: 36, x: 73, y: 24, dur: 8 },
  { color: "#38BDF8", size: 32, x: 14, y: 65, dur: 6.5 },
  { color: "#34D399", size: 44, x: 50, y: 50, dur: 9 },
  { color: "#FB923C", size: 34, x: 82, y: 60, dur: 7.5 },
  { color: "#F472B6", size: 30, x: 38, y: 16, dur: 8.5 },
  { color: "#FBBF24", size: 28, x: 62, y: 78, dur: 6 },
];

export function AmbientOSCover() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, #0f172a 0%, #030712 60%, #000 100%)",
      }}
    >
      {/* Subtle zone ring hint */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.06]">
        <ellipse
          cx="50%"
          cy="55%"
          rx="28%"
          ry="22%"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          strokeDasharray="2 8"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50% 55%"
            to="360 50% 55%"
            dur="20s"
            repeatCount="indefinite"
          />
        </ellipse>
      </svg>

      {/* Floating orbs */}
      {COVER_ORBS.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full ambient-cover-drift"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle at 35% 35%, ${orb.color}55 0%, ${orb.color}25 40%, transparent 70%)`,
            boxShadow: `0 0 ${orb.size * 0.6}px ${orb.color}15, 0 0 ${orb.size}px ${orb.color}08`,
            animationDuration: `${orb.dur}s`,
            animationDelay: `${i * -1.2}s`,
          }}
        />
      ))}

      {/* Ambient center glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
