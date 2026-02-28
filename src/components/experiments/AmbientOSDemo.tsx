"use client";

import { useRef, useEffect, useState } from "react";

/* ─── App orb definitions ─── */
const ORBS = [
  { id: "photos",   label: "Photos",   emoji: "\u{1F4F8}", color: "#FF6B8A", glow: "#FF6B8A", hx: 0.22, hy: 0.30, size: 56, phase: 0    },
  { id: "music",    label: "Music",    emoji: "\u{1F3B5}", color: "#A78BFA", glow: "#A78BFA", hx: 0.73, hy: 0.24, size: 52, phase: 1.2  },
  { id: "weather",  label: "Weather",  emoji: "\u{26C5}",  color: "#38BDF8", glow: "#38BDF8", hx: 0.14, hy: 0.66, size: 48, phase: 2.4  },
  { id: "messages", label: "Messages", emoji: "\u{1F4AC}", color: "#34D399", glow: "#34D399", hx: 0.50, hy: 0.50, size: 62, phase: 3.6  },
  { id: "maps",     label: "Maps",     emoji: "\u{1F5FA}", color: "#FB923C", glow: "#FB923C", hx: 0.82, hy: 0.60, size: 50, phase: 4.8  },
  { id: "calendar", label: "Calendar", emoji: "\u{1F4C5}", color: "#F472B6", glow: "#F472B6", hx: 0.38, hy: 0.16, size: 48, phase: 0.8  },
  { id: "notes",    label: "Notes",    emoji: "\u{270F}\u{FE0F}",  color: "#FBBF24", glow: "#FBBF24", hx: 0.62, hy: 0.78, size: 44, phase: 2.0  },
];

/* ─── Physics constants ─── */
const ATTRACT_RADIUS = 200;
const ATTRACT_FORCE = 35;
const DRIFT_AMP = 14;
const DRIFT_SPEED = 0.0005;
const LERP = 0.045;

/* ─── Deterministic star positions (SSR-safe) ─── */
function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const STARS = Array.from({ length: 35 }, (_, i) => ({
  w: seededRandom(i * 3) * 1.5 + 0.5,
  left: seededRandom(i * 3 + 1) * 100,
  top: seededRandom(i * 3 + 2) * 100,
  opacity: seededRandom(i * 7) * 0.3 + 0.05,
  dur: 3 + seededRandom(i * 11) * 4,
  delay: seededRandom(i * 13) * 3,
}));

export function AmbientOSDemo({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbElRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const orbPos = useRef<{ x: number; y: number }[]>([]);
  const rafRef = useRef(0);
  const t0 = useRef(0);
  const [hoveredOrb, setHoveredOrb] = useState<string | null>(null);
  const [notifs, setNotifs] = useState<Record<string, number>>({});

  /* ── Init orb positions ── */
  useEffect(() => {
    t0.current = performance.now();
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    orbPos.current = ORBS.map((o) => ({
      x: o.hx * r.width,
      y: o.hy * r.height,
    }));
  }, []);

  /* ── RAF animation loop (direct DOM for perf) ── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function tick() {
      const r = el!.getBoundingClientRect();
      const t = performance.now() - t0.current;
      const m = mouseRef.current;
      const mx = m.x - r.left;
      const my = m.y - r.top;

      ORBS.forEach((orb, i) => {
        const p = orbPos.current[i];
        if (!p) return;

        const hx = orb.hx * r.width;
        const hy = orb.hy * r.height;

        // Sine/cosine drift
        const dx = Math.sin(t * DRIFT_SPEED + orb.phase) * DRIFT_AMP;
        const dy =
          Math.cos(t * DRIFT_SPEED * 0.7 + orb.phase + 1.5) * DRIFT_AMP * 0.8;

        let tx = hx + dx;
        let ty = hy + dy;

        // Cursor attraction
        if (m.active) {
          const ax = mx - tx;
          const ay = my - ty;
          const dist = Math.sqrt(ax * ax + ay * ay);
          if (dist < ATTRACT_RADIUS && dist > 1) {
            const s = (1 - dist / ATTRACT_RADIUS) * ATTRACT_FORCE;
            tx += (ax / dist) * s;
            ty += (ay / dist) * s;
          }
        }

        // Smooth lerp
        p.x += (tx - p.x) * LERP;
        p.y += (ty - p.y) * LERP;

        // Direct DOM update
        const orbEl = orbElRefs.current[i];
        if (orbEl) {
          orbEl.style.transform = `translate3d(${p.x - orb.size / 2}px, ${p.y - orb.size / 2}px, 0)`;
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* ── Mouse tracking ── */
  useEffect(() => {
    const el = containerRef.current;
    function onMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    }
    function onLeave() {
      mouseRef.current = { ...mouseRef.current, active: false };
    }
    window.addEventListener("mousemove", onMove);
    el?.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* ── Touch support ── */
  useEffect(() => {
    const el = containerRef.current;
    function onTouch(e: TouchEvent) {
      const t = e.touches[0];
      if (t) mouseRef.current = { x: t.clientX, y: t.clientY, active: true };
    }
    function onEnd() {
      mouseRef.current = { ...mouseRef.current, active: false };
    }
    el?.addEventListener("touchmove", onTouch, { passive: true });
    el?.addEventListener("touchstart", onTouch, { passive: true });
    el?.addEventListener("touchend", onEnd);
    return () => {
      el?.removeEventListener("touchmove", onTouch);
      el?.removeEventListener("touchstart", onTouch);
      el?.removeEventListener("touchend", onEnd);
    };
  }, []);

  /* ── Random notification pings ── */
  useEffect(() => {
    const interval = setInterval(
      () => {
        const pick = ORBS[Math.floor(Math.random() * ORBS.length)];
        setNotifs((prev) => ({
          ...prev,
          [pick.id]: Math.min((prev[pick.id] || 0) + 1, 9),
        }));
        // Auto-clear after 3.5s
        setTimeout(() => {
          setNotifs((prev) => {
            const next = { ...prev };
            if (next[pick.id]) {
              next[pick.id]--;
              if (next[pick.id] <= 0) delete next[pick.id];
            }
            return next;
          });
        }, 3500);
      },
      4000 + Math.random() * 3000,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full select-none overflow-hidden ${className}`}
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, #0f172a 0%, #030712 60%, #000 100%)",
      }}
    >
      {/* ── Ambient star particles ── */}
      <div className="pointer-events-none absolute inset-0">
        {STARS.map((s, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full bg-white ambient-twinkle"
            style={{
              width: s.w,
              height: s.w,
              left: `${s.left}%`,
              top: `${s.top}%`,
              opacity: s.opacity,
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ── Rotating zone rings (SVG) ── */}
      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        width="700"
        height="600"
        viewBox="-350 -300 700 600"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      >
        {/* Inner ring — slow clockwise */}
        <ellipse
          cx={0}
          cy={0}
          rx={160}
          ry={130}
          fill="none"
          stroke="rgba(255,255,255,1)"
          strokeWidth={1}
          strokeDasharray="3 10"
          opacity={0.06}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="25s"
            repeatCount="indefinite"
          />
        </ellipse>

        {/* Middle ring — slow counter-clockwise */}
        <ellipse
          cx={0}
          cy={0}
          rx={260}
          ry={210}
          fill="none"
          stroke="rgba(255,255,255,1)"
          strokeWidth={0.5}
          strokeDasharray="2 14"
          opacity={0.04}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360"
            to="0"
            dur="35s"
            repeatCount="indefinite"
          />
        </ellipse>

        {/* Outer ring — very slow clockwise */}
        <ellipse
          cx={0}
          cy={0}
          rx={340}
          ry={280}
          fill="none"
          stroke="rgba(255,255,255,1)"
          strokeWidth={0.5}
          strokeDasharray="4 20"
          opacity={0.03}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="50s"
            repeatCount="indefinite"
          />
        </ellipse>
      </svg>

      {/* ── Ambient central glow ── */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Floating orbs ── */}
      {ORBS.map((orb, i) => (
        <div
          key={orb.id}
          ref={(el) => {
            orbElRefs.current[i] = el;
          }}
          className="absolute left-0 top-0 will-change-transform"
          style={{ width: orb.size, height: orb.size, zIndex: 10 }}
          onMouseEnter={() => setHoveredOrb(orb.id)}
          onMouseLeave={() => setHoveredOrb(null)}
        >
          {/* Breathing glow */}
          <div
            className="absolute -inset-4 rounded-full ambient-breathe"
            style={{
              background: `radial-gradient(circle, ${orb.glow}35, transparent 70%)`,
              animationDuration: `${3 + i * 0.4}s`,
            }}
          />

          {/* Orb body — glassmorphic sphere */}
          <div
            className="relative flex h-full w-full items-center justify-center rounded-full transition-transform duration-300 ease-out"
            style={{
              background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), ${orb.color}88 55%, ${orb.color}30)`,
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: `0 0 20px ${orb.glow}25, inset 0 1px 1px rgba(255,255,255,0.15)`,
              backdropFilter: "blur(4px)",
              transform: hoveredOrb === orb.id ? "scale(1.18)" : "scale(1)",
            }}
          >
            <span
              className="leading-none"
              style={{ fontSize: orb.size * 0.36 }}
            >
              {orb.emoji}
            </span>
          </div>

          {/* Label — revealed on hover */}
          <div
            className="pointer-events-none absolute left-1/2 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-medium text-white/80 backdrop-blur-md transition-all duration-200"
            style={{
              bottom: -22,
              transform: `translateX(-50%) translateY(${hoveredOrb === orb.id ? 0 : 4}px)`,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.06)",
              opacity: hoveredOrb === orb.id ? 1 : 0,
            }}
          >
            {orb.label}
          </div>

          {/* Notification badge */}
          {notifs[orb.id] && notifs[orb.id]! > 0 && (
            <div
              className="absolute flex items-center justify-center rounded-full bg-red-500 font-mono text-[8px] font-bold text-white ambient-pop-in"
              style={{
                width: 16,
                height: 16,
                top: -2,
                right: -2,
                boxShadow: "0 0 8px rgba(239,68,68,0.5)",
              }}
            >
              {notifs[orb.id]}
            </div>
          )}
        </div>
      ))}

      {/* ── Hint text ── */}
      <div className="absolute bottom-4 left-0 right-0 text-center sm:bottom-5">
        <p className="hidden text-[11px] tracking-wide text-white/20 sm:block">
          Move your cursor to interact with the spatial interface
        </p>
        <p className="text-[11px] tracking-wide text-white/20 sm:hidden">
          Touch to interact with the spatial interface
        </p>
      </div>
    </div>
  );
}
