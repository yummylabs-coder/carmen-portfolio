"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageEntrance } from "@/components/ui/PageEntrance";
import { DiscordCommunityCard } from "@/components/contact/DiscordCommunityCard";

/* ─── Types ─── */
type Purpose = "fulltime" | "consulting" | "yummylabs" | "speaker" | "other";

/* ─── Purpose data with icons ─── */
const purposes: { key: Purpose; label: string; icon: React.ReactNode }[] = [
  {
    key: "fulltime",
    label: "Full-time",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
  {
    key: "consulting",
    label: "Consulting",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    key: "yummylabs",
    label: "Yummy Labs",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        <path d="M9 3h6" />
        <path d="M10 3v7.4L4.7 18.5a1 1 0 0 0 .8 1.5h13a1 1 0 0 0 .8-1.5L14 10.4V3" />
      </svg>
    ),
  },
  {
    key: "speaker",
    label: "Speaker",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        <rect x="9" y="2" width="6" height="11" rx="3" />
        <path d="M5 10a7 7 0 0 0 14 0" />
        <path d="M12 17v4" />
        <path d="M8 21h8" />
      </svg>
    ),
  },
  {
    key: "other",
    label: "Say hi",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
];

/* ─── Stats data ─── */
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

/* ─── Refined input class ─── */
const inputClass =
  "w-full rounded-lg border border-sand-200 bg-white px-3.5 py-2.5 text-13 text-brand-ink placeholder:text-neutral-300 outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100";

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
   Note Card Form — compact with tape
   ═══════════════════════════════════ */
function NoteForm() {
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
    <motion.div
      className="relative rounded-xl border border-sand-200 bg-sand-50 p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
      animate={{ rotate: [0, -1, 1, -0.6, 0.6, -0.3, 0] }}
      transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
    >
      {/* Dotted grid pattern — designer grid paper */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(circle, rgb(215,201,183) 0.8px, transparent 0.8px)",
          backgroundSize: "14px 14px",
        }}
      />

      {/* Washi tape — semi-transparent with diagonal stripes, rotated */}
      <div className="absolute -top-[16px] left-1/2 z-20 -translate-x-1/2 rotate-[-2deg]">
        <div
          className="relative h-[32px] w-[130px] overflow-hidden"
          style={{
            background: "rgba(226, 217, 203, 0.65)",
            borderRadius: "1px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          {/* Diagonal stripe texture */}
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, transparent, transparent 2.5px, rgba(180,164,142,0.6) 2.5px, rgba(180,164,142,0.6) 3.5px)",
            }}
          />
          {/* Subtle edge roughness via inset shadow */}
          <div
            className="absolute inset-0"
            style={{
              boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.5), inset 0 -0.5px 0 rgba(0,0,0,0.04)",
            }}
          />
        </div>
      </div>

      {sent ? (
        <div className="relative z-[1] py-5 text-center">
          <div className="mb-2 text-[28px]">&#10024;</div>
          <h3 className="font-brand text-15 font-bold text-brand-ink">
            Note sent!
          </h3>
          <p className="text-13 text-neutral-400">
            I&apos;ll get back to you soon.
          </p>
        </div>
      ) : (
        <div className="relative z-[1]">
          <h2 className="mt-1 font-brand text-15 font-bold text-brand-ink">
            Leave me a note &#128221;
          </h2>
          <p className="mb-3 text-12 text-neutral-400">
            I&apos;ll get back to you soon!
          </p>

          <form onSubmit={handleSubmit}>
            {/* Purpose Selector — icon cards in grid */}
            <div className="mb-3">
              <label className="mb-1.5 block text-12 font-medium text-neutral-500">
                What&apos;s this about?
              </label>
              <div className="grid grid-cols-3 gap-2 mobile:grid-cols-2">
                {purposes.map((p) => {
                  const isActive = selected === p.key;
                  return (
                    <button
                      key={p.key}
                      type="button"
                      onClick={() => setSelected(p.key)}
                      className={`flex flex-col items-center gap-1 rounded-lg border px-3 py-2.5 text-12 transition-all ${
                        isActive
                          ? "border-blue-300 bg-blue-50 font-semibold text-[#2216ff]"
                          : "border-sand-200 bg-white text-neutral-500 hover:border-sand-300 hover:bg-sand-50"
                      }`}
                    >
                      <span className={`h-[18px] w-[18px] ${isActive ? "opacity-90" : "opacity-50"}`}>
                        {p.icon}
                      </span>
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-2.5">
              <label
                htmlFor="contact-email"
                className="mb-1 block text-12 font-medium text-neutral-500"
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
                className={inputClass}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="contact-message"
                className="mb-1 block text-12 font-medium text-neutral-500"
              >
                Your message
              </label>
              <textarea
                id="contact-message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What's on your mind?"
                rows={3}
                className={`${inputClass} resize-y`}
              />
            </div>

            <button
              type="submit"
              disabled={!selected || sending}
              className="w-full rounded-lg bg-[#2216ff] px-4 py-2.5 text-13 font-semibold text-white transition-colors hover:bg-[#1a10d9] disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400"
            >
              {!selected
                ? "Pick a topic first"
                : sending
                  ? "Sending\u2026"
                  : "Send note \u2728"}
            </button>
          </form>
        </div>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════
   Email Card
   ═══════════════════════════════════ */
function EmailCard() {
  return (
    <div className="rounded-xl bg-brand-ink p-4 text-white">
      <div className="mb-1 text-11 opacity-70">Email me directly</div>
      <a
        href="mailto:carmenrincon92@gmail.com"
        className="mb-3 block font-brand text-14 font-semibold text-white hover:underline"
      >
        carmenrincon92@gmail.com
      </a>
      <a
        href="https://linkedin.com/in/carmenrincon"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-[6px] rounded-lg bg-white/15 px-3 py-1.5 text-12 font-medium text-white transition-colors hover:bg-white/25"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
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
      {/* Page Header */}
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

      {/* Blue Stats — full width */}
      <StatsRow />

      {/* Two Column: Form + Email (aligned to first 2 stats) · Discord (aligned to 3rd stat) */}
      <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-3">
        {/* Left: Note Form + Email — spans 2 columns to align with first 2 stats */}
        <div className="flex flex-col gap-3 lg:col-span-2">
          <NoteForm />
          <EmailCard />
        </div>

        {/* Right: Discord — 1 column aligned with 3rd stat */}
        <DiscordCommunityCard />
      </div>
    </PageEntrance>
  );
}
