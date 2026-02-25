"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import type { Track } from "@/lib/types";

/* ─── Fallback songs when Notion has no data ─── */
const fallbackTracks: Track[] = [
  { id: "1", title: "Todavía",       artist: "Khruangbin",  order: 1 },
  { id: "2", title: "Telepatía",     artist: "Kali Uchis",  order: 2 },
  { id: "3", title: "Nights",        artist: "Frank Ocean",  order: 3 },
  { id: "4", title: "Ojitos Lindos", artist: "Bad Bunny",    order: 4 },
];

/* ─── Alternating brand colors for labels without cover art ─── */
const labelColors = ["#2216ff", "#ffffff", "#2216ff", "#ffffff"];

/* ─── Hook: fetch preview URL from Deezer — always fresh, with retry ─── */
function useDeezerPreview(title: string, artist: string) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const retryCount = useRef(0);
  const maxRetries = 2;

  const fetchPreview = useCallback(
    async (bust = false) => {
      try {
        const params = new URLSearchParams({ artist, title });
        // Add cache-bust param on retry to bypass any edge/CDN cache
        if (bust) params.set("_t", String(Date.now()));
        const res = await fetch(`/api/preview?${params.toString()}`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.previewUrl) {
          setPreviewUrl(data.previewUrl);
        }
      } catch {
        // Silently fail — previews are a nice-to-have
      }
    },
    [artist, title]
  );

  // Fetch on mount — always get a fresh URL
  useEffect(() => {
    retryCount.current = 0;
    fetchPreview();
  }, [fetchPreview]);

  // Called when <audio> fails to load — retry with cache bust
  const refresh = useCallback(() => {
    if (retryCount.current >= maxRetries) return;
    retryCount.current += 1;
    setPreviewUrl(undefined); // clear stale URL
    fetchPreview(true); // bust cache
  }, [fetchPreview]);

  return { previewUrl, refresh };
}

/* ─── Shared AudioContext singleton (mobile Web Audio API path) ─── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AudioCtx = typeof window !== "undefined" ? (window.AudioContext || (window as any).webkitAudioContext) : null;
let sharedCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext | null {
  if (!AudioCtx) return null;
  if (!sharedCtx || sharedCtx.state === "closed") {
    sharedCtx = new AudioCtx();
  }
  return sharedCtx;
}

/* ─── Sound On indicator ─── */
function SoundIndicator() {
  return (
    <div className="flex items-center gap-1">
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-brand-ink"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" className="animate-pulse" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" className="animate-pulse" style={{ animationDelay: "150ms" }} />
      </svg>
      <span className="text-[10px] font-medium text-neutral-400">Playing</span>
    </div>
  );
}

/* ─── Single Vinyl Record ─── */
function Vinyl({
  track,
  index,
  playingId,
  onPlayChange,
}: {
  track: Track;
  index: number;
  playingId: string | null;
  onPlayChange: (id: string | null) => void;
}) {
  /**
   * Two playback paths:
   *
   * DESKTOP (canHover = true):
   *   Standard <audio> element with the raw Deezer CDN URL.
   *   <audio> elements don't have CORS restrictions for playback.
   *   Hover sets playingId → useEffect calls play().
   *   If <audio> errors (expired URL), auto-retries via refresh().
   *
   * MOBILE (canHover = false):
   *   Web Audio API via our /api/audio proxy (same-origin, no CORS).
   *   fetch(proxyUrl) → decodeAudioData → BufferSource.
   *   The proxy is needed because fetch() IS subject to CORS, and
   *   the Deezer CDN doesn't send CORS headers.
   *   Tap resumes AudioContext (user gesture) then decodes & plays.
   */
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const audioDataRef = useRef<ArrayBuffer | null>(null);
  const canHover = useRef(false);

  const isPlaying = playingId === track.id;

  useEffect(() => {
    canHover.current = window.matchMedia("(hover: hover)").matches;
  }, []);

  // Always fetch fresh preview URL (never trust cached/stored URLs)
  const { previewUrl, refresh } = useDeezerPreview(track.title, track.artist);

  // Proxy URL for mobile path only (same-origin fetch, no CORS)
  const proxyUrl = previewUrl
    ? `/api/audio?url=${encodeURIComponent(previewUrl)}`
    : undefined;

  // Pre-fetch MP3 binary via proxy — only on touch devices (mobile path)
  useEffect(() => {
    if (!proxyUrl) return;
    // Skip pre-fetch on desktop — desktop uses <audio> element directly
    if (window.matchMedia("(hover: hover)").matches) return;

    // Clear stale pre-fetched data when URL changes
    audioDataRef.current = null;

    let cancelled = false;

    fetch(proxyUrl)
      .then((res) => {
        if (!res.ok) throw new Error("proxy error");
        return res.arrayBuffer();
      })
      .then((buf) => {
        if (!cancelled) audioDataRef.current = buf;
      })
      .catch(() => { /* non-critical */ });

    return () => { cancelled = true; };
  }, [proxyUrl]);

  // DESKTOP: auto-play via <audio> when this vinyl becomes active
  useEffect(() => {
    if (isPlaying && canHover.current && previewUrl && audioRef.current) {
      const el = audioRef.current;
      // Always set to the latest fresh URL
      el.src = previewUrl;
      el.load();
      el.volume = 0.3;
      el.play().catch(() => {
        // Autoplay blocked or URL failed — try refreshing
        refresh();
      });
    }
  }, [isPlaying, previewUrl, refresh]);

  // Stop playback when no longer the active vinyl (both paths)
  useEffect(() => {
    if (!isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (sourceRef.current) {
        try { sourceRef.current.stop(); } catch { /* already stopped */ }
        sourceRef.current = null;
      }
    }
  }, [isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
      if (sourceRef.current) {
        try { sourceRef.current.stop(); } catch { /* ok */ }
        sourceRef.current = null;
      }
    };
  }, []);

  // Handle <audio> load errors — expired URL, network issue, etc.
  const handleAudioError = useCallback(() => {
    if (isPlaying) {
      refresh();
    }
  }, [isPlaying, refresh]);

  // MOBILE: play via Web Audio API (called from tap handler = user gesture)
  const playMobile = useCallback(() => {
    if (!proxyUrl) return;

    // Stop any existing source
    if (sourceRef.current) {
      try { sourceRef.current.stop(); } catch { /* ok */ }
      sourceRef.current = null;
    }

    const ctx = getAudioCtx();
    if (!ctx) return;

    // Resume AudioContext in user-gesture call stack (iOS requirement)
    ctx.resume();

    // Use pre-fetched data (copy, since decodeAudioData detaches the buffer)
    // or fetch fresh from proxy
    const dataPromise = audioDataRef.current
      ? Promise.resolve(audioDataRef.current.slice(0))
      : fetch(proxyUrl).then((r) => {
          if (!r.ok) throw new Error("proxy error");
          return r.arrayBuffer();
        });

    dataPromise
      .then((buf) => ctx.decodeAudioData(buf))
      .then((audioBuffer) => {
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        const gain = ctx.createGain();
        gain.gain.value = 0.3;
        source.connect(gain).connect(ctx.destination);
        source.start(0);
        sourceRef.current = source;
      })
      .catch(() => {
        // Failed — clear stale data and refresh URL for next attempt
        audioDataRef.current = null;
        refresh();
      });
  }, [proxyUrl, refresh]);

  // Desktop: hover handlers
  const handleEnter = useCallback(() => {
    if (!canHover.current) return;
    onPlayChange(track.id);
  }, [onPlayChange, track.id]);

  const handleLeave = useCallback(() => {
    if (!canHover.current) return;
    onPlayChange(null);
  }, [onPlayChange]);

  // Mobile: tap to toggle
  const handleTap = useCallback(() => {
    if (canHover.current) return;
    if (isPlaying) {
      onPlayChange(null);
    } else {
      playMobile();
      onPlayChange(track.id);
    }
  }, [isPlaying, onPlayChange, track.id, playMobile]);

  const color = labelColors[index % labelColors.length];
  const isWhiteLabel = color === "#ffffff";

  return (
    <div className="flex flex-col items-center gap-3">
      {/* ── Disc ── */}
      <div
        className="relative aspect-square w-[135px] cursor-pointer sm:w-[160px]"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleTap}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: isPlaying
              ? "0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)"
              : "0 4px 20px rgba(0,0,0,0.15), 0 1px 4px rgba(0,0,0,0.1)",
            transition: "box-shadow 0.3s ease",
          }}
        />

        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `
              radial-gradient(
                circle at center,
                transparent 0%, transparent 93%,
                #0d0d0d 93.5%, #222 95%, #0a0a0a 96.5%, #181818 98%, #111 100%
              ),
              conic-gradient(from 20deg,
                rgba(255,255,255,0) 0%,
                rgba(255,255,255,0.06) 8%,
                rgba(255,255,255,0) 16%,
                rgba(255,255,255,0.03) 30%,
                rgba(255,255,255,0) 42%,
                rgba(255,255,255,0.05) 55%,
                rgba(255,255,255,0) 65%,
                rgba(255,255,255,0.02) 78%,
                rgba(255,255,255,0) 88%,
                rgba(255,255,255,0.04) 95%,
                rgba(255,255,255,0) 100%
              ),
              repeating-radial-gradient(
                circle at center,
                #131313 0px, #131313 1px,
                #1b1b1b 1px, #1b1b1b 2px,
                #161616 2px, #161616 2.8px,
                #1e1e1e 2.8px, #1e1e1e 3.6px
              )
            `,
            animation: "vinyl-spin 2.8s linear infinite",
            animationPlayState: isPlaying ? "running" : "paused",
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: "46%",
              height: "46%",
              border: "1px solid rgba(255,255,255,0.04)",
            }}
          />

          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full"
            style={{
              width: "42%",
              height: "42%",
              backgroundColor: track.coverUrl ? undefined : color,
              boxShadow: `inset 0 0 0 1px rgba(0,0,0,0.12), 0 0 6px rgba(0,0,0,0.25)`,
              border: isWhiteLabel && !track.coverUrl ? "1px solid rgba(0,0,0,0.08)" : undefined,
            }}
          >
            {track.coverUrl ? (
              <Image
                src={track.coverUrl}
                alt={`${track.title} cover`}
                fill
                className="object-cover"
                sizes="80px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span
                  className={`text-[8px] font-bold tracking-[0.2em] ${
                    isWhiteLabel ? "text-neutral-300" : "text-white/50"
                  }`}
                >
                  ♪
                </span>
              </div>
            )}
          </div>

          <div
            className="absolute left-1/2 top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, #444 0%, #1a1a1a 60%, #111 100%)",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.6)",
            }}
          />
        </div>
      </div>

      {/* ── Track info + sound indicator ── */}
      <div className="flex flex-col items-center gap-1">
        <div className="text-center">
          <div className="font-brand text-13 font-semibold leading-tight text-brand-ink">
            {track.title}
          </div>
          <div className="mt-0.5 text-[11px] text-neutral-400">
            {track.artist}
          </div>
        </div>
        <div
          className="transition-opacity duration-300"
          style={{ opacity: isPlaying && previewUrl ? 1 : 0 }}
        >
          <SoundIndicator />
        </div>
      </div>

      {/* Desktop: hidden audio element — src set dynamically in play effect */}
      <audio
        ref={audioRef}
        preload="none"
        onError={handleAudioError}
      />
    </div>
  );
}

/* ─── Vinyl Shelf (full-width section) ─── */
interface VinylShelfProps {
  tracks?: Track[];
}

export function VinylShelf({ tracks }: VinylShelfProps) {
  const items = tracks && tracks.length > 0 ? tracks : fallbackTracks;
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlayChange = useCallback((id: string | null) => {
    setPlayingId(id);
  }, []);

  return (
    <div className="rounded-3xl border border-sand-300 bg-sand-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-brand text-15 font-semibold text-brand-ink">
          On Rotation
        </h2>
        <p className="mt-0.5 text-12 text-neutral-400">
          What I&apos;m listening to lately
          <span className="sm:hidden"> · Tap to play</span>
        </p>
      </div>

      {/* Records */}
      <div className="grid grid-cols-2 justify-items-center gap-6 sm:flex sm:justify-center sm:gap-10">
        {items.map((track, i) => (
          <Vinyl
            key={track.id}
            track={track}
            index={i}
            playingId={playingId}
            onPlayChange={handlePlayChange}
          />
        ))}
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes vinyl-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
