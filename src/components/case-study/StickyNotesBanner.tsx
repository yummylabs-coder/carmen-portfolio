"use client";

import { ScrollReveal } from "@/components/dashboard/ScrollReveal";

function StickyNotesIllustration() {
  return (
    <div className="relative h-[120px] w-[160px] shrink-0">
      {/* Sticky notes */}
      <div className="absolute left-2 top-4 h-14 w-14 rotate-[-8deg] rounded-sm bg-[#FFE066] shadow-sm">
        <div className="mt-3 ml-2 h-px w-6 bg-[#D4A000]" />
        <div className="mt-1 ml-2 h-px w-8 bg-[#D4A000]" />
        <div className="mt-1 ml-2 h-px w-4 bg-[#D4A000]" />
      </div>
      <div className="absolute left-10 top-2 h-14 w-14 rotate-[5deg] rounded-sm bg-[#FFEB99] shadow-sm">
        <div className="mt-3 ml-2 h-px w-7 bg-[#D4A000]" />
        <div className="mt-1 ml-2 h-px w-5 bg-[#D4A000]" />
        <span className="absolute bottom-2 right-2 text-[18px] font-bold text-[#D4A000]">?</span>
      </div>
      <div className="absolute left-6 top-12 h-14 w-14 rotate-[-3deg] rounded-sm bg-[#FFD633] shadow-sm">
        <div className="mt-3 ml-2 h-px w-5 bg-[#D4A000]" />
        <div className="mt-1 ml-2 h-px w-7 bg-[#D4A000]" />
      </div>
      <div className="absolute left-[70px] top-6 h-12 w-12 rotate-[12deg] rounded-sm bg-[#FFF2B3] shadow-sm">
        <span className="absolute bottom-1 right-2 text-[14px] font-bold text-[#D4A000]">?</span>
      </div>
      <div className="absolute left-[85px] top-16 h-12 w-12 rotate-[-6deg] rounded-sm bg-[#FFE066] shadow-sm">
        <div className="mt-3 ml-1 h-px w-5 bg-[#D4A000]" />
        <div className="mt-1 ml-1 h-px w-6 bg-[#D4A000]" />
      </div>
    </div>
  );
}

export function StickyNotesBanner() {
  return (
    <ScrollReveal>
      <section className="flex flex-col items-center gap-6 rounded-2xl bg-brand-ink p-8 sm:flex-row sm:gap-8">
        <StickyNotesIllustration />
        <div className="flex flex-1 flex-col gap-1.5 text-center sm:text-left">
          <p className="font-brand text-[20px] font-bold text-white/90">
            Looking for sticky notes and empathy maps? Let&apos;s chat instead.
          </p>
          <p className="text-14 text-white/60">
            I&apos;d rather tell you the real story over coffee &#x2615;
          </p>
          <a
            href="https://cal.com/yummy-labs-ps5kau/secret"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex w-fit self-center rounded-xl bg-brand-canvas px-5 py-3 text-14 font-semibold text-brand-ink transition-colors hover:bg-white sm:self-start"
          >
            Book a call
          </a>
        </div>
      </section>
    </ScrollReveal>
  );
}
