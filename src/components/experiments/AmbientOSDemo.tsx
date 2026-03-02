"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";

/* ─────────────────────────────────────────────────────────────────────────────
   Monoline SVG icons — thin white strokes, futuristic/spatial feel
   ───────────────────────────────────────────────────────────────────────────── */
function IconCamera({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}
function IconWaveform({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M3 12h2l2-7 3 14 3-10 2 6h2l2-3h2" />
    </svg>
  );
}
function IconCloud({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  );
}
function IconChat({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function IconCompass({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" fillOpacity="0.15" stroke="currentColor" />
    </svg>
  );
}
function IconGrid({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
function IconPen({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

const ICON_MAP: Record<string, (props: { size?: number }) => React.JSX.Element> = {
  photos: IconCamera,
  music: IconWaveform,
  weather: IconCloud,
  messages: IconChat,
  maps: IconCompass,
  calendar: IconGrid,
  notes: IconPen,
};

/* ─────────────────────────────────────────────────────────────────────────────
   Orb definitions — each is a spatial app concept with design rationale
   ───────────────────────────────────────────────────────────────────────────── */
interface OrbDef {
  id: string;
  label: string;
  concept: string;
  color: string;
  glow: string;
  hx: number;
  hy: number;
  size: number;
  phase: number;
  connections: string[];
}

const ORBS: OrbDef[] = [
  {
    id: "photos",
    label: "Photos",
    concept: "Memories float into your space when relevant — visiting a place surfaces photos you took there.",
    color: "#FF6B8A", glow: "#FF6B8A",
    hx: 0.22, hy: 0.30, size: 56, phase: 0,
    connections: ["maps", "calendar"],
  },
  {
    id: "music",
    label: "Music",
    concept: "Spatial audio follows you room to room. Music lives in the space, not in your ears.",
    color: "#A78BFA", glow: "#A78BFA",
    hx: 0.73, hy: 0.24, size: 52, phase: 1.2,
    connections: ["weather", "messages"],
  },
  {
    id: "weather",
    label: "Weather",
    concept: "A glanceable atmospheric layer — feel the forecast through ambient light and color shifts in your environment.",
    color: "#38BDF8", glow: "#38BDF8",
    hx: 0.14, hy: 0.66, size: 48, phase: 2.4,
    connections: ["maps", "music"],
  },
  {
    id: "messages",
    label: "Messages",
    concept: "Conversations appear as whispered bubbles near the people who sent them — proximity-based, not notification-based.",
    color: "#34D399", glow: "#34D399",
    hx: 0.50, hy: 0.50, size: 62, phase: 3.6,
    connections: ["calendar", "notes"],
  },
  {
    id: "maps",
    label: "Maps",
    concept: "Your space IS the map. Directions project onto your actual path — no screen needed, just follow the light.",
    color: "#FB923C", glow: "#FB923C",
    hx: 0.82, hy: 0.60, size: 50, phase: 4.8,
    connections: ["photos", "weather"],
  },
  {
    id: "calendar",
    label: "Calendar",
    concept: "Time becomes visible. Events approach you as the day progresses — a meeting glows brighter as it nears.",
    color: "#F472B6", glow: "#F472B6",
    hx: 0.38, hy: 0.16, size: 48, phase: 0.8,
    connections: ["messages", "photos"],
  },
  {
    id: "notes",
    label: "Notes",
    concept: "Thoughts pin to surfaces. Leave a note on the fridge, literally — spatial context makes ideas stick.",
    color: "#FBBF24", glow: "#FBBF24",
    hx: 0.62, hy: 0.78, size: 44, phase: 2.0,
    connections: ["messages", "calendar"],
  },
];

/* ── Physics constants ── */
const ATTRACT_RADIUS = 200;
const ATTRACT_FORCE = 35;
const DRIFT_AMP = 14;
const DRIFT_SPEED = 0.0005;
const LERP = 0.045;

/* Mobile-specific physics — gentler, smaller */
const M_DRIFT_AMP = 8;
const M_ATTRACT_RADIUS = 120;
const M_ATTRACT_FORCE = 20;

/* ── Deterministic stars (SSR-safe) ── */
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

/* ═══════════════════════════════════════════════════════════════════════════ */
export function AmbientOSDemo({
  className = "",
  mobile = false,
}: {
  className?: string;
  mobile?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbElRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const orbPos = useRef<{ x: number; y: number }[]>([]);
  const rafRef = useRef(0);
  const t0 = useRef(0);
  const sceneRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef({ x: 0, y: 0 });

  const [hoveredOrb, setHoveredOrb] = useState<string | null>(null);
  const [expandedOrb, setExpandedOrb] = useState<string | null>(null);
  const [ripple, setRipple] = useState<{ id: string; key: number } | null>(null);
  const [notifs, setNotifs] = useState<Record<string, number>>({});

  /* Mobile orb size scale */
  const sizeScale = mobile ? 0.72 : 1;

  /* ── Click handler ── */
  const handleOrbClick = useCallback(
    (orbId: string) => {
      if (expandedOrb === orbId) {
        setExpandedOrb(null);
      } else {
        setRipple({ id: orbId, key: Date.now() });
        setExpandedOrb(orbId);
      }
    },
    [expandedOrb],
  );

  /* ── Close on backdrop click ── */
  const handleBackdropClick = useCallback(() => {
    if (expandedOrb) setExpandedOrb(null);
  }, [expandedOrb]);

  /* ── Init orb positions ── */
  useEffect(() => {
    t0.current = performance.now();
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    orbPos.current = ORBS.map((o) => ({
      x: o.hx * r.width,
      y: o.hy * (mobile ? r.height * 0.75 : r.height),
    }));
  }, [mobile]);

  /* ── RAF animation loop ── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const driftAmp = mobile ? M_DRIFT_AMP : DRIFT_AMP;
    const attractRadius = mobile ? M_ATTRACT_RADIUS : ATTRACT_RADIUS;
    const attractForce = mobile ? M_ATTRACT_FORCE : ATTRACT_FORCE;

    function tick() {
      const r = el!.getBoundingClientRect();
      const t = performance.now() - t0.current;
      const m = mouseRef.current;
      const mx = m.x - r.left;
      const my = m.y - r.top;
      const areaH = mobile ? r.height * 0.75 : r.height;

      ORBS.forEach((orb, i) => {
        const p = orbPos.current[i];
        if (!p) return;

        const hx = orb.hx * r.width;
        const hy = orb.hy * areaH;

        const dx = Math.sin(t * DRIFT_SPEED + orb.phase) * driftAmp;
        const dy = Math.cos(t * DRIFT_SPEED * 0.7 + orb.phase + 1.5) * driftAmp * 0.8;

        let tx = hx + dx;
        let ty = hy + dy;

        if (m.active) {
          const ax = mx - tx;
          const ay = my - ty;
          const dist = Math.sqrt(ax * ax + ay * ay);
          if (dist < attractRadius && dist > 1) {
            const s = (1 - dist / attractRadius) * attractForce;
            tx += (ax / dist) * s;
            ty += (ay / dist) * s;
          }
        }

        p.x += (tx - p.x) * LERP;
        p.y += (ty - p.y) * LERP;

        const orbEl = orbElRefs.current[i];
        if (orbEl) {
          const sz = orb.size * sizeScale;
          const breathe = 1 + Math.sin(t * 0.0008 + orb.phase * 2.5) * 0.025;
          orbEl.style.transform = `translate3d(${p.x - sz / 2}px, ${p.y - sz / 2}px, 0) scale(${breathe})`;
        }
      });

      // ── Scene 3D tilt from mouse ──
      if (!mobile) {
        const cx = r.width / 2;
        const cy = r.height / 2;
        const MAX_TILT = 3;
        if (m.active) {
          const nx = Math.max(-1, Math.min(1, (mx - cx) / cx));
          const ny = Math.max(-1, Math.min(1, (my - cy) / cy));
          tiltRef.current.x += (-ny * MAX_TILT - tiltRef.current.x) * 0.04;
          tiltRef.current.y += (nx * MAX_TILT - tiltRef.current.y) * 0.04;
        } else {
          tiltRef.current.x *= 0.96;
          tiltRef.current.y *= 0.96;
        }
        if (sceneRef.current) {
          sceneRef.current.style.transform = `rotateX(${tiltRef.current.x}deg) rotateY(${tiltRef.current.y}deg)`;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mobile, sizeScale]);

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

  /* ── Notification pings ── */
  useEffect(() => {
    const interval = setInterval(
      () => {
        const pick = ORBS[Math.floor(Math.random() * ORBS.length)];
        setNotifs((prev) => ({
          ...prev,
          [pick.id]: Math.min((prev[pick.id] || 0) + 1, 9),
        }));
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

  /* ── Connection lines (SVG between expanded orb + connected orbs) ── */
  function renderConnections() {
    if (!expandedOrb) return null;
    const src = ORBS.find((o) => o.id === expandedOrb);
    if (!src) return null;
    const srcPos = orbPos.current[ORBS.indexOf(src)];
    if (!srcPos) return null;

    return (
      <svg className="pointer-events-none absolute inset-0 z-[5]" width="100%" height="100%">
        {src.connections.map((targetId) => {
          const tIdx = ORBS.findIndex((o) => o.id === targetId);
          const tPos = orbPos.current[tIdx];
          if (!tPos) return null;
          return (
            <line
              key={targetId}
              x1={srcPos.x}
              y1={srcPos.y}
              x2={tPos.x}
              y2={tPos.y}
              stroke={src.color}
              strokeWidth={0.8}
              strokeDasharray="4 8"
              opacity={0.25}
              className="ambient-fade-in"
            />
          );
        })}
      </svg>
    );
  }

  const expandedOrbData = expandedOrb
    ? ORBS.find((o) => o.id === expandedOrb)
    : null;

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full select-none overflow-hidden ${className}`}
      style={{
        perspective: mobile ? undefined : "800px",
        background:
          "radial-gradient(ellipse at 50% 40%, #0f172a 0%, #030712 60%, #000 100%)",
      }}
      onClick={handleBackdropClick}
    >
      {/* ── 3D Scene — tilts on mouse for depth parallax (desktop only) ── */}
      <div
        ref={sceneRef}
        className="relative h-full w-full"
        style={mobile ? undefined : { transformStyle: "preserve-3d" }}
      >

      {/* ── Back depth layer — stars ── */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={mobile ? undefined : { transform: "translateZ(-120px)" }}
      >
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

      {/* ── Mid depth layer — rings + glow ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={mobile ? undefined : { transform: "translateZ(-50px)" }}
      >
      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        width="700"
        height="600"
        viewBox="-350 -300 700 600"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      >
        <ellipse cx={0} cy={0} rx={160} ry={130} fill="none" stroke="rgba(255,255,255,1)" strokeWidth={1} strokeDasharray="3 10" opacity={0.06}>
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="25s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx={0} cy={0} rx={260} ry={210} fill="none" stroke="rgba(255,255,255,1)" strokeWidth={0.5} strokeDasharray="2 14" opacity={0.04}>
          <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="35s" repeatCount="indefinite" />
        </ellipse>
        {!mobile && (
          <ellipse cx={0} cy={0} rx={340} ry={280} fill="none" stroke="rgba(255,255,255,1)" strokeWidth={0.5} strokeDasharray="4 20" opacity={0.03}>
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="50s" repeatCount="indefinite" />
          </ellipse>
        )}
      </svg>

      {/* ── Ambient central glow ── */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
        }}
      />
      </div>{/* close mid depth layer */}

      {/* ── Front depth layer — orbs, effects, UI ── */}
      <div className="absolute inset-0">

      {/* ── Connection lines ── */}
      {renderConnections()}

      {/* ── Ripple effect ── */}
      {ripple && (
        <div
          key={ripple.key}
          className="pointer-events-none absolute z-[6] ambient-ripple"
          style={{
            left: orbPos.current[ORBS.findIndex((o) => o.id === ripple.id)]?.x ?? 0,
            top: orbPos.current[ORBS.findIndex((o) => o.id === ripple.id)]?.y ?? 0,
            transform: "translate(-50%, -50%)",
            width: mobile ? 120 : 200,
            height: mobile ? 120 : 200,
            borderRadius: "50%",
            border: `1.5px solid ${ORBS.find((o) => o.id === ripple.id)?.color ?? "#fff"}`,
          }}
          onAnimationEnd={() => setRipple(null)}
        />
      )}

      {/* ── Dimming overlay when expanded ── */}
      {expandedOrb && (
        <div className="pointer-events-none absolute inset-0 z-[8] bg-black/30 ambient-fade-in" />
      )}

      {/* ── Floating orbs ── */}
      {ORBS.map((orb, i) => {
        const isExpanded = expandedOrb === orb.id;
        const isDimmed = expandedOrb !== null && !isExpanded && !ORBS.find((o) => o.id === expandedOrb)?.connections.includes(orb.id);
        const Icon = ICON_MAP[orb.id];
        const sz = orb.size * sizeScale;

        return (
          <div
            key={orb.id}
            ref={(el) => {
              orbElRefs.current[i] = el;
            }}
            className="absolute left-0 top-0 will-change-transform"
            style={{
              width: sz,
              height: sz,
              zIndex: isExpanded ? 20 : 10,
              opacity: isDimmed ? 0.3 : 1,
              transition: "opacity 0.4s ease",
            }}
            onMouseEnter={() => !expandedOrb && setHoveredOrb(orb.id)}
            onMouseLeave={() => setHoveredOrb(null)}
            onClick={(e) => {
              e.stopPropagation();
              handleOrbClick(orb.id);
            }}
          >
            {/* Breathing glow */}
            <div
              className="absolute -inset-4 rounded-full ambient-breathe"
              style={{
                background: `radial-gradient(circle, ${orb.glow}35, transparent 70%)`,
                animationDuration: `${3 + i * 0.4}s`,
              }}
            />

            {/* Elevation shadow — floating above surface */}
            <div
              className="pointer-events-none absolute left-1/2 -translate-x-1/2"
              style={{
                bottom: -sz * 0.22,
                width: sz * 1.4,
                height: sz * 0.35,
                background: `radial-gradient(ellipse, ${orb.color}18 0%, transparent 70%)`,
                filter: "blur(8px)",
              }}
            />

            {/* Orb body */}
            <div
              className="relative flex h-full w-full cursor-pointer items-center justify-center rounded-full transition-all duration-300 ease-out"
              style={{
                background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), ${orb.color}70 55%, ${orb.color}20)`,
                border: `1px solid rgba(255,255,255,${isExpanded ? 0.25 : 0.1})`,
                boxShadow: isExpanded
                  ? `0 0 30px ${orb.glow}40, 0 0 60px ${orb.glow}15, inset 0 1px 1px rgba(255,255,255,0.15)`
                  : `0 0 20px ${orb.glow}20, inset 0 1px 1px rgba(255,255,255,0.1)`,
                backdropFilter: "blur(4px)",
                transform: isExpanded
                  ? "scale(1.25)"
                  : hoveredOrb === orb.id
                    ? "scale(1.12)"
                    : "scale(1)",
              }}
            >
              {Icon && (
                <span style={{ opacity: 0.9 }}>
                  <Icon size={sz * 0.38} />
                </span>
              )}
            </div>

            {/* Label — on hover (desktop only, when nothing expanded) */}
            {!mobile && !expandedOrb && (
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
            )}

            {/* Mobile: always show label below orb */}
            {mobile && !expandedOrb && (
              <div
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center text-[9px] font-medium text-white/50"
                style={{ top: sz + 4 }}
              >
                {orb.label}
              </div>
            )}

            {/* Notification badge */}
            {notifs[orb.id] && notifs[orb.id]! > 0 && !isExpanded && (
              <div
                className="absolute flex items-center justify-center rounded-full bg-red-500 font-mono text-[8px] font-bold text-white ambient-pop-in"
                style={{
                  width: mobile ? 14 : 16,
                  height: mobile ? 14 : 16,
                  top: -2,
                  right: -2,
                  boxShadow: "0 0 8px rgba(239,68,68,0.5)",
                }}
              >
                {notifs[orb.id]}
              </div>
            )}

            {/* ── Desktop: Expanded concept card (floating below orb) ── */}
            {!mobile && isExpanded && (
              <div
                className="absolute left-1/2 z-30 w-[220px] ambient-card-enter"
                style={{ top: orb.size + 12 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="relative -translate-x-1/2 rounded-xl px-4 py-3.5"
                  style={{
                    background: "rgba(15, 23, 42, 0.85)",
                    backdropFilter: "blur(20px)",
                    border: `1px solid ${orb.color}30`,
                    boxShadow: `0 4px 30px rgba(0,0,0,0.4), 0 0 20px ${orb.color}10`,
                  }}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div
                      className="flex h-6 w-6 items-center justify-center rounded-md"
                      style={{ background: `${orb.color}25` }}
                    >
                      {Icon && <Icon size={14} />}
                    </div>
                    <span className="text-[12px] font-semibold" style={{ color: orb.color }}>
                      {orb.label}
                    </span>
                  </div>
                  <p className="text-[11px] leading-[1.55] text-white/60">
                    {orb.concept}
                  </p>
                  <div className="mt-2.5 flex items-center gap-1 border-t border-white/[0.06] pt-2">
                    <span className="text-[9px] uppercase tracking-wider text-white/25">
                      Connected to
                    </span>
                    {orb.connections.map((cId) => {
                      const c = ORBS.find((o) => o.id === cId);
                      if (!c) return null;
                      return (
                        <span
                          key={cId}
                          className="rounded-full px-1.5 py-0.5 text-[9px] font-medium"
                          style={{ background: `${c.color}15`, color: `${c.color}99` }}
                        >
                          {c.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* ── Hint text ── */}
      <div
        className="absolute bottom-4 left-0 right-0 text-center transition-opacity duration-300 sm:bottom-5"
        style={{ opacity: expandedOrb ? 0 : 1 }}
      >
        <p className={`text-[11px] tracking-wide text-white/20 ${mobile ? "" : "hidden sm:block"}`}>
          {mobile ? "Tap an orb to explore" : "Tap an orb to explore the spatial interaction model"}
        </p>
        {!mobile && (
          <p className="text-[11px] tracking-wide text-white/20 sm:hidden">
            Tap an orb to explore
          </p>
        )}
      </div>

      </div>{/* close front depth layer */}

      </div>{/* close 3D scene */}

      {/* ── Mobile: Full-screen bottom sheet via portal (escapes all overflow clips) ── */}
      {mobile && expandedOrbData && typeof window !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-x-0 bottom-0 z-[260] ambient-card-enter"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="mx-4 mb-4 max-h-[50vh] overflow-y-auto rounded-2xl px-5 py-5"
              style={{
                background: "rgba(15, 23, 42, 0.95)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: `1px solid ${expandedOrbData.color}30`,
                boxShadow: `0 -4px 30px rgba(0,0,0,0.5), 0 0 40px ${expandedOrbData.color}10`,
              }}
            >
              {/* Header row */}
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: `${expandedOrbData.color}25` }}
                  >
                    {(() => {
                      const Icon = ICON_MAP[expandedOrbData.id];
                      return Icon ? <Icon size={20} /> : null;
                    })()}
                  </div>
                  <span
                    className="text-[16px] font-semibold"
                    style={{ color: expandedOrbData.color }}
                  >
                    {expandedOrbData.label}
                  </span>
                </div>
                <button
                  onClick={() => setExpandedOrb(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/50"
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 4L12 12M4 12L12 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Concept */}
              <p className="text-[14px] leading-[1.7] text-white/60">
                {expandedOrbData.concept}
              </p>

              {/* Connected to */}
              <div className="mt-3.5 flex items-center gap-2 border-t border-white/[0.06] pt-3">
                <span className="text-[10px] uppercase tracking-wider text-white/25">
                  Connected to
                </span>
                {expandedOrbData.connections.map((cId) => {
                  const c = ORBS.find((o) => o.id === cId);
                  if (!c) return null;
                  return (
                    <span
                      key={cId}
                      className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                      style={{
                        background: `${c.color}15`,
                        color: `${c.color}99`,
                      }}
                    >
                      {c.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
