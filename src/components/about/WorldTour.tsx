"use client";

import { useRef } from "react";
import type { TravelDestination } from "@/lib/types";

/* ─── Coordinates lookup (capital/major city per country) ─── */
const coordinates: Record<string, { lat: string; lng: string }> = {
  VEN: { lat: "10.4806° N", lng: "66.9036° W" },
  COL: { lat: "4.7110° N",  lng: "74.0721° W" },
  BRA: { lat: "15.7975° S", lng: "47.8919° W" },
  MEX: { lat: "19.4326° N", lng: "99.1332° W" },
  SXM: { lat: "18.0425° N", lng: "63.0548° W" },
  DOM: { lat: "18.4861° N", lng: "69.9312° W" },
  USA: { lat: "38.9072° N", lng: "77.0369° W" },
  CAN: { lat: "45.4215° N", lng: "75.6972° W" },
  ESP: { lat: "41.3874° N", lng: "2.1686° E"  },
  FRA: { lat: "48.8566° N", lng: "2.3522° E"  },
  IRL: { lat: "53.3498° N", lng: "6.2603° W"  },
  ITA: { lat: "41.9028° N", lng: "12.4964° E" },
  PRT: { lat: "38.7223° N", lng: "9.1393° W"  },
  GBR: { lat: "51.5074° N", lng: "0.1278° W"  },
  AUT: { lat: "48.2082° N", lng: "16.3738° E" },
  CZE: { lat: "50.0755° N", lng: "14.4378° E" },
  NLD: { lat: "52.3676° N", lng: "4.9041° E"  },
  VNM: { lat: "21.0278° N", lng: "105.8342° E"},
  THA: { lat: "13.7563° N", lng: "100.5018° E"},
  HKG: { lat: "22.3193° N", lng: "114.1694° E"},
  CHE: { lat: "46.9480° N", lng: "7.4474° E"  },
};

/* ─── Placeholder stamp SVG ─── */
function PlaceholderStamp({ code }: { code: string }) {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full">
      <rect x="4" y="4" width="112" height="112" rx="2" fill="none" stroke="white" strokeWidth="1.5" />
      <rect x="10" y="10" width="100" height="100" rx="1" fill="none" stroke="white" strokeWidth="0.75" strokeDasharray="2,2" />
      <circle cx="20" cy="20" r="4" fill="none" stroke="white" strokeWidth="0.5" />
      <circle cx="100" cy="20" r="4" fill="none" stroke="white" strokeWidth="0.5" />
      <circle cx="20" cy="100" r="4" fill="none" stroke="white" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="4" fill="none" stroke="white" strokeWidth="0.5" />
      <text x="60" y="68" textAnchor="middle" fontSize="28" fontWeight="700" fill="white" fontFamily="DM Sans, sans-serif">
        {code}
      </text>
      <text x="60" y="100" textAnchor="middle" fontSize="9" fontWeight="600" fill="white" fontFamily="Georgia, serif" letterSpacing="2">
        STAMP
      </text>
    </svg>
  );
}

/* ─── Single Boarding Pass ─── */
function BoardingPass({ dest }: { dest: TravelDestination }) {
  return (
    <div className="w-[280px] shrink-0 select-none overflow-hidden rounded-2xl border border-sand-300">
      {/* ── Top section ── */}
      <div className="relative bg-sand-100 px-6 pb-8 pt-6">
        {/* Badge */}
        <div className="mb-5 inline-block rounded bg-[#300101]/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[2px] text-[#300101]/30">
          Boarding Pass
        </div>

        {/* Destination code + name */}
        <div className="mb-6">
          <div className="font-brand text-[50px] font-bold leading-none tracking-[-2px] text-[#2216ff]">
            {dest.code}
          </div>
          <div className="mt-1 text-[12px] uppercase tracking-[2px] text-[#300101]/70">
            {dest.name}
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <div className="text-[10px] uppercase tracking-[1px] text-[#300101]/60">
              Name
            </div>
            <div className="text-[14px] font-semibold text-[#300101]">
              CARMEN RINCON
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[1px] text-[#300101]/60">
              Seat No.
            </div>
            <div className="text-[14px] font-semibold text-[#300101]">
              {dest.seat}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[1px] text-[#300101]/60">
              Depart
            </div>
            <div className="text-[14px] font-semibold text-[#300101]">
              {dest.departure}
            </div>
          </div>
        </div>

        {/* Notch cutouts at bottom of top section */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between">
          <div className="h-4 w-4 -translate-x-1/2 translate-y-1/2 rounded-full bg-white" />
          <div className="h-4 w-4 translate-x-1/2 translate-y-1/2 rounded-full bg-white" />
        </div>
        {/* Dashed tear line */}
        <div className="absolute bottom-0 left-4 right-4 border-b border-dashed border-[#300101]/15" />
      </div>

      {/* ── Bottom section ── */}
      <div className="relative bg-[#2216ff] px-6 pb-5 pt-6">
        {/* Notch cutouts at top of bottom section */}
        <div className="absolute left-0 right-0 top-0 flex justify-between">
          <div className="h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
          <div className="h-4 w-4 translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
        </div>

        {/* Coordinates + Stamp */}
        <div className="flex items-start justify-between gap-6 pt-2">
          <div>
            <div className="text-[10px] uppercase tracking-[1px] text-white/70">
              Coordinates
            </div>
            <div className="mt-1 font-mono text-[13px] leading-relaxed tracking-wide text-white/90">
              {coordinates[dest.code]?.lat ?? "—"}
              <br />
              {coordinates[dest.code]?.lng ?? "—"}
            </div>
          </div>
          <div className="h-[100px] w-[100px] shrink-0">
            {dest.stampUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={dest.stampUrl}
                alt={`${dest.name} stamp`}
                className="h-full w-full object-contain"
              />
            ) : (
              <PlaceholderStamp code={dest.code} />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ─── Scroll Arrow ─── */
function ScrollArrow({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-sand-300 bg-white text-neutral-500 shadow-sm transition-all hover:border-sand-400 hover:text-neutral-700"
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        {direction === "left" ? (
          <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

/* ─── Main Section ─── */
export function WorldTour({ destinations }: { destinations: TravelDestination[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (destinations.length === 0) return null;

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="rounded-3xl border border-sand-300 bg-white p-6">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-brand text-15 font-semibold text-brand-ink">
            My World Tour
          </h2>
          <p className="mt-0.5 text-12 text-neutral-400">
            {destinations.length} destination{destinations.length !== 1 ? "s" : ""} and counting
          </p>
        </div>
        <div className="flex gap-2">
          <ScrollArrow direction="left" onClick={() => scroll("left")} />
          <ScrollArrow direction="right" onClick={() => scroll("right")} />
        </div>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="scrollbar-hide -mx-6 flex gap-4 overflow-x-auto px-6 pb-2"
      >
        {destinations.map((dest) => (
          <BoardingPass key={dest.id} dest={dest} />
        ))}
      </div>
    </div>
  );
}
