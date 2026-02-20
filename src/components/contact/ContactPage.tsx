"use client";

import { useState } from "react";

/* ─── Types ─── */
type WorkOption = "fulltime" | "consulting" | "yummylabs" | "speaking";

interface WorkItem {
  key: WorkOption;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

/* ─── Data ─── */
const workOptions: WorkItem[] = [
  {
    key: "fulltime",
    title: "Full-time role",
    desc: "Join your team as a product designer",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    key: "consulting",
    title: "Consulting",
    desc: "Work with me through my studio",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    key: "yummylabs",
    title: "Yummy Labs Sprint",
    desc: "Partner for a design sprint",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M12 18v-6" /><path d="M8 18v-1" /><path d="M16 18v-3" />
      </svg>
    ),
  },
  {
    key: "speaking",
    title: "Speaking",
    desc: "Podcast, event, or workshop",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
];

const stickyNotes = [
  { text: "\u201CGreat portfolio!\u201D", color: "bg-[#FCE7F3]", rotate: "-rotate-1" },
  { text: "\u201CLove your work on Learn.xyz\u201D", color: "bg-[#DBEAFE]", rotate: "rotate-1" },
  { text: "\u201CLet\u2019s collaborate!\u201D", color: "bg-[#D1FAE5]", rotate: "-rotate-[0.5deg]" },
  { text: "\u201CInspiring process\u201D", color: "bg-[#FEF9C3]", rotate: "rotate-[0.5deg]" },
];

/* ─── Icons ─── */
function MailIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 7L2 7" />
    </svg>
  );
}

/* ═══════════════════════════════════
   Section — Stats
   ═══════════════════════════════════ */
function StatsRow() {
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

  return (
    <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl bg-[#2216ff] p-5 text-center"
        >
          <div className="mx-auto mb-2 h-8 w-8 text-white/70">{s.icon}</div>
          <div className="font-brand text-2xl font-bold text-[#FFFEFC]">
            {s.value}
          </div>
          <div className="text-[13px] text-white/70">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════
   Section — Work Options
   ═══════════════════════════════════ */
function WorkOptionsSection({
  selected,
  onSelect,
}: {
  selected: WorkOption | null;
  onSelect: (opt: WorkOption) => void;
}) {
  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-[var(--border-default)] bg-white">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-[var(--neutral-100)] px-6 py-5">
        <span className="text-[var(--neutral-400)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </span>
        <h2 className="font-brand text-base font-bold text-[var(--brand-ink)]">
          How can we work together?
        </h2>
      </div>

      {/* Options grid */}
      <div className="grid grid-cols-1 gap-3 p-6 sm:grid-cols-2">
        {workOptions.map((opt) => {
          const isSelected = selected === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onSelect(opt.key)}
              className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                isSelected
                  ? "border-[#2216ff] bg-[var(--blue-50)]"
                  : "border-transparent bg-[var(--neutral-50)] hover:border-[var(--blue-100)] hover:bg-[var(--blue-50)]"
              }`}
            >
              {/* Icon */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  isSelected
                    ? "bg-[var(--blue-50)] text-[#2216ff]"
                    : "bg-white text-[var(--neutral-500)]"
                }`}
              >
                {opt.icon}
              </div>

              {/* Text */}
              <div className="flex-1">
                <div className="text-sm font-semibold text-[var(--brand-ink)]">
                  {opt.title}
                </div>
                <div className="text-xs text-[var(--neutral-500)]">
                  {opt.desc}
                </div>
              </div>

              {/* Check circle */}
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-xs transition-all duration-200 ${
                  isSelected
                    ? "border-[#2216ff] bg-[#2216ff] text-white"
                    : "border-[var(--neutral-200)] text-transparent"
                }`}
              >
                &#10003;
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section — Sticky Note Form
   ═══════════════════════════════════ */
function StickyNoteForm({
  selected,
  onClear,
}: {
  selected: WorkOption | null;
  onClear: () => void;
}) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const selectedItem = workOptions.find((o) => o.key === selected);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          message,
          workType: selected ?? "",
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
    <div className="-rotate-1 relative rounded-[4px] bg-[#FEF9C3] p-8 shadow-[4px_4px_12px_rgba(0,0,0,0.12)]">
      {/* Tape strip */}
      <div className="absolute left-1/2 top-0 h-5 w-[60px] -translate-x-1/2 rounded-b bg-black/[0.08]" />

      {sent ? (
        /* ── Success ── */
        <div className="py-10 text-center">
          <div className="mb-4 text-5xl">&#10024;</div>
          <h3 className="font-brand text-xl font-bold text-[var(--brand-ink)]">
            Note sent!
          </h3>
          <p className="text-sm text-[var(--neutral-500)]">
            I&apos;ll get back to you soon.
          </p>
        </div>
      ) : (
        /* ── Form ── */
        <>
          <h2 className="mt-2 font-brand text-xl font-bold text-[var(--brand-ink)]">
            Leave me a note &#128221;
          </h2>
          <p className="mb-6 text-sm text-[var(--neutral-500)]">
            I&apos;ll get back to you as soon as I can!
          </p>

          {/* Selected option tag */}
          {selectedItem && (
            <div className="mb-5 flex items-center gap-[10px] rounded-lg bg-white p-[10px_14px] text-sm font-medium shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-[var(--blue-50)] text-[#2216ff]">
                {selectedItem.icon}
              </span>
              <span>{selectedItem.title}</span>
              <button
                type="button"
                onClick={onClear}
                className="ml-auto text-lg leading-none text-[var(--neutral-400)] hover:text-[var(--brand-ink)]"
              >
                &times;
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="contact-email"
                className="mb-[6px] block text-[13px] font-semibold text-[var(--brand-ink)]"
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
                className="w-full rounded-lg border-2 border-black/[0.08] bg-white/80 px-[14px] py-3 font-body text-sm text-[var(--brand-ink)] placeholder:text-[var(--neutral-400)] focus:border-[#2216ff] focus:bg-white focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="contact-message"
                className="mb-[6px] block text-[13px] font-semibold text-[var(--brand-ink)]"
              >
                Your message
              </label>
              <textarea
                id="contact-message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What's on your mind?"
                rows={5}
                className="w-full resize-y rounded-lg border-2 border-black/[0.08] bg-white/80 px-[14px] py-3 font-body text-sm text-[var(--brand-ink)] placeholder:text-[var(--neutral-400)] focus:border-[#2216ff] focus:bg-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-lg bg-[var(--brand-ink)] px-5 py-[14px] font-body text-[15px] font-semibold text-white transition-colors hover:bg-[#2216ff] disabled:opacity-60"
            >
              {sending ? "Sending\u2026" : "Send note \u2728"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════
   Section — Sidebar Widgets
   ═══════════════════════════════════ */
function SidebarWidgets() {
  return (
    <div>
      {/* Quick Contact */}
      <div className="mb-4 rounded-xl bg-[var(--brand-ink)] p-5 text-white">
        <div className="mb-1 text-xs opacity-70">Email me directly</div>
        <a
          href="mailto:carmenrincon92@gmail.com"
          className="block text-sm font-semibold text-white hover:underline"
        >
          carmenrincon92@gmail.com
        </a>
        <a
          href="https://linkedin.com/in/carmenrincon"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-[6px] rounded-lg bg-white/15 px-3 py-2 text-[13px] font-medium text-white transition-colors hover:bg-white/25"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Connect on LinkedIn
        </a>
      </div>

      {/* Notes from Others */}
      <div className="rounded-xl bg-[var(--neutral-50)] p-5">
        <div className="mb-4 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--neutral-500)]">
          &#128172; Notes from others
        </div>
        {stickyNotes.map((note, i) => (
          <div
            key={i}
            className={`mb-3 rounded-[4px] px-4 py-[14px] text-[13px] italic text-[var(--brand-ink)] shadow-[2px_2px_6px_rgba(0,0,0,0.08)] ${note.color} ${note.rotate}`}
          >
            {note.text}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Main — ContactPage
   ═══════════════════════════════════ */
export function ContactPage() {
  const [selected, setSelected] = useState<WorkOption | null>(null);

  return (
    <div className="mx-auto max-w-[1000px] px-4 py-10 md:px-8">
      {/* Page Header */}
      <header className="mb-8 flex items-start gap-5 max-sm:flex-col max-sm:items-center max-sm:text-center">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-[var(--border-default)] bg-white text-[var(--neutral-500)]">
          <MailIcon />
        </div>
        <div className="flex-1">
          <h1 className="mb-1 flex items-center gap-3 font-brand text-[32px] font-extrabold text-[var(--brand-ink)] max-sm:justify-center">
            Contact{" "}
            <span className="inline-block origin-[70%_70%] animate-wave">
              &#128075;
            </span>
          </h1>
          <p className="max-w-[500px] text-base text-[var(--neutral-500)]">
            Whether you have a project in mind, want to collaborate, or just
            want to say hi, I&apos;d love to hear from you.
          </p>
        </div>
      </header>

      {/* Stats */}
      <StatsRow />

      {/* Work Options */}
      <WorkOptionsSection selected={selected} onSelect={setSelected} />

      {/* Two Column: Form + Sidebar */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <StickyNoteForm selected={selected} onClear={() => setSelected(null)} />
        <SidebarWidgets />
      </div>
    </div>
  );
}
