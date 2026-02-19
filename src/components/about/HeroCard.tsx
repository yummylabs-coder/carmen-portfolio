"use client";

import { PixelAvatar } from "./PixelAvatar";

export function HeroCard() {
  return (
    <div
      className="flex flex-col items-center gap-6 rounded-3xl px-6 pb-8 pt-8"
      style={{
        background:
          "linear-gradient(135deg, #300101 0%, #1a0101 50%, #300101 100%)",
      }}
    >
      {/* Pixel Avatar */}
      <PixelAvatar />

      {/* Text */}
      <div className="text-center">
        <h2 className="mb-2 font-brand text-[20px] font-bold text-white">
          Hey, I&apos;m Carmen 👋
        </h2>
        <p className="text-14 leading-relaxed text-white/70">
          I&apos;m a designer who loves building things that matter. When I
          believe in what we&apos;re creating, I go all in — thinking about it
          in the shower, prototyping on weekends, pushing until it&apos;s great.
          I care about craft, but I care more about shipping and learning.
        </p>
      </div>
    </div>
  );
}
