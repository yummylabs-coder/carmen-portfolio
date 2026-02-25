"use client";

import { useEffect, useState } from "react";

/* ─── Discord logo ─── */
function DiscordIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

/* ─── Types ─── */
interface DiscordMessage {
  author: string;
  avatar: string | null;
  content: string;
  timestamp: string;
}

export function DiscordCommunityCard() {
  const [memberCount, setMemberCount] = useState<number | null>(null);
  const [onlineCount, setOnlineCount] = useState<number | null>(null);
  const [messages, setMessages] = useState<DiscordMessage[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [countRes, msgRes] = await Promise.all([
          fetch("/api/discord"),
          fetch("/api/discord-messages"),
        ]);

        if (countRes.ok) {
          const data = await countRes.json();
          if (data.memberCount > 0) setMemberCount(data.memberCount);
          if (data.onlineCount > 0) setOnlineCount(data.onlineCount);
        }

        if (msgRes.ok) {
          const data = await msgRes.json();
          if (data.messages?.length > 0) setMessages(data.messages);
        }
      } catch {
        // Fail silently — the card still works without the data
      }
    }
    fetchData();
  }, []);

  function timeAgo(timestamp: string): string {
    const diff = Date.now() - new Date(timestamp).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  }

  return (
    <a
      href="https://discord.gg/7GnFfQuZ3m"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl border border-sand-300 transition-all hover:border-sand-400 hover:shadow-sm"
    >
      {/* Header — brand brown with cream Discord icon */}
      <div className="flex items-center gap-2.5 bg-brand-ink px-4 py-2.5">
        <DiscordIcon size={22} className="text-[#FFFEFC]" />
        <div className="flex flex-col">
          <span className="font-brand text-14 font-bold text-[#FFFEFC]">
            Design Community
          </span>
          <span className="text-11 text-white/50">
            Join the conversation on Discord
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col bg-sand-100 px-4 py-3">
        <p className="text-12 leading-relaxed text-neutral-500">
          Share work, get feedback, and grow with other designers.
        </p>

        {/* Live counts */}
        {(memberCount !== null || onlineCount !== null) && (
          <div className="mt-2 flex items-center gap-4">
            {memberCount !== null && (
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-neutral-300" />
                </span>
                <span className="font-mono text-12 font-semibold text-brand-ink">
                  {memberCount.toLocaleString()}
                </span>
                <span className="text-11 text-neutral-400">members</span>
              </div>
            )}
            {onlineCount !== null && onlineCount > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="font-mono text-12 font-semibold text-emerald-600">
                  {onlineCount.toLocaleString()}
                </span>
                <span className="text-11 text-neutral-400">online</span>
              </div>
            )}
          </div>
        )}

        {/* Recent messages or friendly empty state */}
        {messages.length > 0 ? (
          <div className="mt-3 flex flex-col gap-1.5">
            <span className="text-11 font-semibold uppercase tracking-wide text-neutral-400">
              Recent messages
            </span>
            {messages.map((msg, i) => (
              <div
                key={i}
                className="flex items-start gap-2 rounded-lg bg-white/70 px-2.5 py-2"
              >
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5865F2] text-[9px] font-bold text-white">
                  {msg.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={msg.avatar}
                      alt=""
                      className="h-5 w-5 rounded-full"
                    />
                  ) : (
                    msg.author[0]?.toUpperCase()
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-11 font-semibold text-brand-ink">
                      {msg.author}
                    </span>
                    <span className="text-10 text-neutral-400">
                      {timeAgo(msg.timestamp)}
                    </span>
                  </div>
                  <p className="truncate text-11 text-neutral-500">
                    {msg.content || "Shared an attachment"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {/* Join CTA */}
        <div className="mt-2.5 flex items-center justify-center gap-2 rounded-lg bg-[#2216ff] px-3.5 py-2 text-12 font-semibold text-white transition-colors group-hover:bg-[#1a10d9]">
          <DiscordIcon size={14} className="text-white/70" />
          Join the conversation
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="ml-0.5 shrink-0">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </a>
  );
}
