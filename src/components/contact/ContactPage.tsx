"use client";

import { useState } from "react";
import { PageEntrance } from "@/components/ui/PageEntrance";
import { DiscordCommunityCard } from "@/components/contact/DiscordCommunityCard";

/* ─── Types ─── */
type Purpose = "fulltime" | "consulting" | "yummylabs" | "speaker" | "other";

interface PurposeItem {
  key: Purpose;
  label: string;
  icon: React.ReactNode;
}

/* ─── Data ─── */
const purposes: PurposeItem[] = [
  {
    key: "fulltime",
    label: "Full-time",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    key: "consulting",
    label: "Consulting",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    key: "yummylabs",
    label: "Yummy Labs",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    key: "speaker",
    label: "Speaker",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
  {
    key: "other",
    label: "Say hi",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

const stats = [
  {
    value: "<24h",
    label: "Response Time",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    value: "Open",
    label: "To Experience",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    value: "Yes",
    label: "Coffee Chats",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

/* ═══════════════════════════════════
   Stats Row — blue cards across top
   ═══════════════════════════════════ */
function StatsRow() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl bg-[#2216ff] p-5 text-center"
        >
          <div className="mx-auto mb-2 h-7 w-7 text-white/70">{s.icon}</div>
          <div className="font-brand text-22 font-bold text-[#FFFEFC]">
            {s.value}
          </div>
          <div className="text-12 text-white/70">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════
   Sticky Note Form
   ═══════════════════════════════════ */
function StickyForm() {
  const [selected, setSelected] = useState<Purpose | null>(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          message,
          workType: selected,
        }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSent(true);
    } catch {
      alert("Something went wrong. Please email me directly at carmenrincon92@gmail.com");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="relative rounded-[4px] bg-[#FEF9C3] p-6 shadow-[4px_4px_12px_rgba(0,0,0,0.12)]">
      {/* Tape strip */}
      <div className="absolute left-1/2 top-0 h-4 w-[50px] -translate-x-1/2 rounded-b bg-black/[0.08]" />

      {sent ? (
        <div className="py-8 text-center">
          <div className="mb-3 text-[40px]">&#10024;</div>
          <h3 className="font-brand text-[18px] font-bold text-[var(--brand-ink)]">
            Note sent!
          </h3>
          <p className="text-13 text-[var(--neutral-500)]">
            I&apos;ll get back to you soon.
          </p>
        </div>
      ) : (
        <>
          <h2 className="mt-2 font-brand text-[18px] font-bold text-[var(--brand-ink)]">
            Leave me a note &#128221;
          </h2>
          <p className="mb-5 text-13 text-[var(--neutral-600)]">
            I&apos;ll get back to you soon!
          </p>

          <form onSubmit={handleSubmit}>
            {/* Purpose Selector */}
            <div className="mb-4">
              <label className="mb-2 block text-12 font-semibold text-[var(--brand-ink)]">
                What&apos;s this about?
              </label>
              <div className="grid grid-cols-3 gap-[6px]">
                {purposes.map((p) => {
                  const isActive = selected === p.key;
                  return (
                    <button
                      key={p.key}
                      type="button"
                      onClick={() => setSelected(p.key)}
                      className={`rounded-md border-2 bg-white p-[10px_8px] text-center transition-all duration-150 ${
                        isActive
                          ? "border-[#2216ff] bg-[var(--blue-50)]"
                          : "border-transparent hover:border-[var(--blue-100)]"
                      }`}
                    >
                      <div
                        className={`mx-auto mb-1 h-6 w-6 ${
                          isActive ? "text-[#2216ff]" : "text-[var(--neutral-400)]"
                        }`}
                      >
                        {p.icon}
                      </div>
                      <div className="text-11 font-semibold text-[var(--brand-ink)]">
                        {p.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-3">
              <label
                htmlFor="contact-email"
                className="mb-1 block text-12 font-semibold text-[var(--brand-ink)]"
              >
                Your email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-md border-2 border-black/[0.08] bg-white/80 px-3 py-[10px] font-body text-13 text-[var(--brand-ink)] placeholder:text-[var(--neutral-400)] focus:border-[#2216ff] focus:bg-white focus:outline-none"
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="contact-message"
                className="mb-1 block text-12 font-semibold text-[var(--brand-ink)]"
              >
                Your message
              </label>
              <textarea
                id="contact-message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What's on your mind?"
                rows={4}
                className="w-full resize-y rounded-md border-2 border-black/[0.08] bg-white/80 px-3 py-[10px] font-body text-13 text-[var(--brand-ink)] placeholder:text-[var(--neutral-400)] focus:border-[#2216ff] focus:bg-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={!selected || sending}
              className="w-full rounded-md bg-[var(--brand-ink)] px-4 py-3 font-body text-14 font-semibold text-white transition-colors hover:bg-[#2216ff] disabled:cursor-not-allowed disabled:bg-[var(--neutral-400)]"
            >
              {!selected
                ? "Pick a topic first"
                : sending
                  ? "Sending\u2026"
                  : "Send note \u2728"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════
   Email Card
   ═══════════════════════════════════ */
function EmailCard() {
  return (
    <div className="rounded-xl bg-[var(--brand-ink)] p-6 text-white">
      <div className="mb-1 text-12 opacity-70">Email me directly</div>
      <a
        href="mailto:carmenrincon92@gmail.com"
        className="mb-4 block font-brand text-16 font-semibold text-white hover:underline"
      >
        carmenrincon92@gmail.com
      </a>
      <a
        href="https://linkedin.com/in/carmenrincon"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-[6px] rounded-lg bg-white/15 px-[14px] py-[10px] text-13 font-medium text-white transition-colors hover:bg-white/25"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        Connect on LinkedIn
      </a>
    </div>
  );
}

/* ═══════════════════════════════════
   Main — ContactPage
   ═══════════════════════════════════ */
export function ContactPage() {
  return (
    <PageEntrance>
      {/* Page Header — matches all other pages */}
      <div className="flex flex-col gap-1">
        <h1 className="font-brand text-22 font-bold text-brand-ink">
          Contact{" "}
          <span className="inline-block origin-[70%_70%] animate-wave">
            &#128075;
          </span>
        </h1>
        <p className="text-14 leading-[1.6] text-neutral-400">
          Whether you have a project in mind, want to collaborate, or just want
          to say hi, I&apos;d love to hear from you.
        </p>
      </div>

      {/* Blue Stats — full width row on top */}
      <StatsRow />

      {/* Two Column Layout — Note+Email left, Discord right */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_340px]">
        {/* Left Column: Sticky Form + Email Card */}
        <div className="flex flex-col gap-4">
          <StickyForm />
          <EmailCard />
        </div>

        {/* Right Column: Discord Community */}
        <DiscordCommunityCard />
      </div>
    </PageEntrance>
  );
}
