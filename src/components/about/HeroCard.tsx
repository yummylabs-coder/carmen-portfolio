"use client";

export function HeroCard() {
  return (
    <div
      className="flex items-center gap-6 rounded-3xl p-6"
      style={{
        background:
          "linear-gradient(135deg, #300101 0%, #1a0101 50%, #300101 100%)",
      }}
    >
      {/* Avatar */}
      <div className="flex h-[100px] w-[100px] shrink-0 items-center justify-center rounded-full border-[3px] border-white/20 text-[50px] shadow-lg"
        style={{
          background: "linear-gradient(135deg, var(--blue-100) 0%, #ede9fe 100%)",
        }}
      >
        <span role="img" aria-label="avatar">👩🏻‍🎨</span>
      </div>

      {/* Text */}
      <div>
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
