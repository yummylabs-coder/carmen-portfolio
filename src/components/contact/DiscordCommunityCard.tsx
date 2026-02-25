"use client";

import { useEffect, useState } from "react";

/* ─── Discord logo ─── */
function DiscordIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

export function DiscordCommunityCard() {
  const [memberCount, setMemberCount] = useState<number | null>(null);
  const [onlineCount, setOnlineCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch("/api/discord");
        if (!res.ok) return;
        const data = await res.json();
        if (data.memberCount > 0) setMemberCount(data.memberCount);
        if (data.onlineCount > 0) setOnlineCount(data.onlineCount);
      } catch {
        // Fail silently — the card still works without the count
      }
    }
    fetchCount();
  }, []);

  return (
    <a
      href="https://discord.gg/7GnFfQuZ3m"
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-xl border border-sand-300 bg-sand-100 transition-all hover:border-sand-400 hover:shadow-sm"
    >
      {/* Header with Discord branding */}
      <div className="flex items-center gap-3 bg-[#5865F2] px-5 py-4">
        <DiscordIcon size={28} />
        <div className="flex flex-col">
          <span className="font-brand text-15 font-bold text-white">
            Design Community
          </span>
          <span className="text-12 text-white/70">
            Join the conversation on Discord
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <p className="text-13 leading-relaxed text-neutral-500">
          A space for designers to share work, get feedback, and grow together.
          Whether you&apos;re just starting out or a seasoned pro, you&apos;re welcome here.
        </p>

        {/* Live count */}
        <div className="mt-3 flex items-center gap-4">
          {memberCount !== null && (
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-neutral-300" />
              </span>
              <span className="font-mono text-13 font-semibold text-brand-ink">
                {memberCount.toLocaleString()}
              </span>
              <span className="text-12 text-neutral-400">members</span>
            </div>
          )}
          {onlineCount !== null && onlineCount > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-13 font-semibold text-emerald-600">
                {onlineCount.toLocaleString()}
              </span>
              <span className="text-12 text-neutral-400">online now</span>
            </div>
          )}
        </div>

        {/* Join CTA */}
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#5865F2] px-4 py-2.5 text-center text-13 font-semibold text-white transition-colors group-hover:bg-[#4752c4]">
          <DiscordIcon size={16} />
          Join the community
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="ml-auto shrink-0">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </a>
  );
}
