"use client";

const items = [
  "Made with love",
  "Made with Figma",
  "Made with Claude Code",
  "Made with Github",
  "Made with Vercel",
  "Made with creativity",
  "Made with Notion API",
  "Made with Spotify API",
  "Made with caffeine",
];

/**
 * Soft horizontal marquee footer.
 *
 * The trick for a seamless infinite scroll: render the list twice,
 * then translate the whole strip by −50 % — when the first copy has
 * scrolled away the second copy is in exactly the same position,
 * so the CSS animation loops with zero jump.
 */
export function RotatingFooter() {
  const strip = items.map((item, i) => (
    <span key={i} className="flex shrink-0 items-center gap-3">
      <span>{item}</span>
      <span className="text-[10px] opacity-40" aria-hidden="true">
        ●
      </span>
    </span>
  ));

  return (
    <footer className="w-full border-t border-sand-300 bg-sand-50">
      {/* Perspective tilt + edge fade make the strip read as a rotating belt */}
      <div
        className="overflow-hidden py-3"
        style={{
          perspective: "520px",
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 14%, black 86%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 14%, black 86%, transparent 100%)",
        }}
      >
        <div style={{ transform: "rotateX(26deg)", transformOrigin: "center bottom" }}>
          <div
            className="flex w-max animate-marquee items-center gap-3 whitespace-nowrap font-body text-12 font-medium"
            style={{ color: "rgba(48, 1, 1, 0.45)" }}
          >
            {strip}
            {/* Duplicate for seamless loop */}
            {strip}
          </div>
        </div>
      </div>
    </footer>
  );
}
