"use client";

import {
  stats,
  roles,
  partners,
  tools,
  testimonials,
  galleryItems,
} from "./acceleratorData";

const YUMMY_URL = "https://yummy-labs.com";

/* ─── External Link Arrow Icon ─── */
function ExternalArrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
      <path
        d="M4 12L12 4M12 4H6M12 4V10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ═══════════════════════════════════
   Section 1 — Header
   ═══════════════════════════════════ */
function Header() {
  return (
    <header className="relative mb-8 flex items-start gap-5">
      {/* Logo */}
      <div className="flex h-[82px] w-[82px] shrink-0 items-center justify-center rounded-2xl border border-[#7c3aed] bg-[#ede9fe] text-[32px]">
        {"\u{1F9EA}"}
      </div>

      {/* Title + subtitle */}
      <div className="flex-1">
        <div className="mb-1 flex h-[51px] items-center gap-3">
          <h1 className="font-brand text-[32px] font-extrabold text-gray-800">
            Yummy Labs
          </h1>
          <span className="inline-flex items-center rounded-full border border-[#7c3aed] bg-[#ede9fe] px-[13px] py-[7px] font-brand text-[11px] font-bold text-[#7c3aed]">
            {"\u2713"} Figma Partner
          </span>
        </div>
        <p className="text-[16px] text-gray-500">
          Design accelerator I co-founded to help designers grow through real
          startup sprints
        </p>
      </div>

      {/* Dog mascot placeholder - hidden on mobile */}
      <div className="absolute right-0 top-[-10px] hidden h-[240px] w-[200px] items-center justify-center md:flex">
        {/* Replace with: <img src="/images/yummy-labs/dog.svg" alt="Yummy Labs Dog" className="h-full w-full object-contain" /> */}
      </div>
    </header>
  );
}

/* ═══════════════════════════════════
   Section 2 — Problem + Role
   ═══════════════════════════════════ */
function ProblemAndRole() {
  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      {/* The Problem card */}
      <div className="flex-shrink-0 rounded-[28px] bg-[#2216ff] p-6 text-white lg:w-[540px]">
        <span className="mb-[13px] inline-flex items-center rounded-md bg-white/90 px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-[#7c3aed]">
          The problem I saw
        </span>
        <h3 className="mb-3 font-brand text-[20px] font-extrabold leading-tight">
          Bootcamps weren&apos;t cutting it anymore.
        </h3>
        <div className="space-y-4 text-[14px] leading-relaxed text-white/85">
          <p>
            Designers were paying thousands for courses teaching outdated methods
            on fake projects. They&apos;d graduate with polished case studies
            that hiring managers could spot as &quot;concept work&quot; from a
            mile away.
          </p>
          <p>
            I wanted to build something different: real products, real
            constraints, real shipped work.
          </p>
        </div>
        <a
          href={YUMMY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-[10px] rounded-full bg-[#fffefc] px-8 py-4 font-body text-[15px] font-bold text-[#300101] shadow-[0_4px_16px_rgba(124,58,237,0.3)] transition-transform hover:-translate-y-0.5"
        >
          Visit yummy-labs.com
        </a>
      </div>

      {/* My Role card */}
      <div className="flex-1 rounded-[28px] border border-neutral-200 bg-white p-6">
        <span className="mb-[13px] inline-flex items-center rounded-md bg-[#ede9fe] px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-[#7c3aed]">
          My role
        </span>
        <h3 className="mb-4 font-brand text-[20px] font-bold leading-tight text-gray-800">
          Co-Founder & Sprint Leader
        </h3>
        <div className="grid grid-cols-1 gap-[11px] sm:grid-cols-2 sm:gap-x-[34px]">
          {roles.map((role) => (
            <div
              key={role.text}
              className="flex items-center gap-1 rounded-lg bg-[#ede9fe] px-[14px] py-[9px]"
            >
              <span className="text-[16px]">{role.icon}</span>
              <span className="font-body text-[13px] font-medium text-[#5b21b6]">
                {role.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 3 — Stats
   ═══════════════════════════════════ */
function Stats() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[20px] border border-[#e0e0dc] bg-[#fffefc] px-[17px] py-5 text-center shadow-[0_0_0_0_rgba(48,1,1,0.04),0_1px_3px_0_rgba(48,1,1,0.04)] transition-transform duration-300 ease-out hover:-rotate-2 hover:scale-[1.04]"
        >
          <div className="mb-2 text-[28px]">{stat.icon}</div>
          <div
            className="font-brand text-[32px] font-extrabold leading-relaxed"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #2216ff 50%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {stat.number}
          </div>
          <div className="font-body text-[12px] font-semibold uppercase tracking-[0.03em] text-gray-500">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════
   Section 4 — How It Works
   ═══════════════════════════════════ */
function HowItWorks() {
  return (
    <div className="rounded-[28px] border border-neutral-200 bg-white p-6">
      <span className="mb-[13px] inline-flex items-center rounded-md bg-[#ede9fe] px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-[#7c3aed]">
        {"\u26A1"} How it works
      </span>
      <h3 className="mb-4 font-brand text-[20px] font-bold leading-tight text-gray-800">
        2-week sprints. Real startups. Shipped products.
      </h3>

      <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-[35px]">
        {/* Week 1 */}
        <div className="relative w-full flex-1 rounded-[20px] border border-[#7c3aed] bg-[#ede9fe] p-[17px]">
          <span className="mb-[10px] inline-block rounded-[4px] bg-[#7c3aed] px-2 py-[3px] text-[10px] font-bold uppercase text-white">
            Week 1
          </span>
          <div className="mb-[6px] font-brand text-[14px] font-bold text-[#5b21b6]">
            Discover & Frame
          </div>
          <div className="text-[12px] leading-relaxed text-gray-500">
            Access real startup data, understand constraints, frame the problem
            with AI tools
          </div>
          {/* Arrow */}
          <span className="absolute -right-[27px] top-1/2 hidden -translate-y-1/2 font-body text-[20px] font-bold text-[#7c3aed] lg:block">
            {"\u2192"}
          </span>
        </div>

        {/* Week 2 */}
        <div className="w-full flex-1 rounded-[20px] border border-[#7c3aed] bg-[#ede9fe] p-[17px]">
          <span className="mb-[10px] inline-block rounded-[4px] bg-[#7c3aed] px-2 py-[3px] text-[10px] font-bold uppercase text-white">
            Week 2
          </span>
          <div className="mb-[6px] font-brand text-[14px] font-bold text-[#5b21b6]">
            Design & Ship
          </div>
          <div className="text-[12px] leading-relaxed text-gray-500">
            Design core flows, run user tests, ship a working prototype to
            production
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 5 — Partners
   ═══════════════════════════════════ */
function Partners() {
  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      {/* Startup Partners */}
      <div className="flex-1 rounded-[28px] border border-neutral-200 bg-white p-6">
        <span className="mb-4 inline-flex items-center rounded-md bg-[#ede9fe] px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-[#7c3aed]">
          {"\u{1F680}"} Startup partners
        </span>
        <div className="flex flex-col gap-3 sm:flex-row">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex-1 rounded-[20px] border border-neutral-200 bg-white p-4 text-center"
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-50">
                <span className="font-body text-[14px] font-bold text-gray-500">
                  {partner.logoText}
                </span>
              </div>
              <div className="mb-1 font-body text-[14px] font-bold text-[#300101]">
                {partner.name}
              </div>
              <div className="whitespace-pre-line text-[11px] leading-relaxed text-gray-500">
                {partner.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tool Partners */}
      <div className="flex-1 rounded-[28px] border border-[#e0e0dc] bg-white p-6">
        <span className="mb-[13px] inline-flex items-center rounded-md bg-[#ede9fe] px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-[#7c3aed]">
          {"\u{1F6E0}\uFE0F"} Tool partners
        </span>
        <h3 className="mb-4 font-brand text-[20px] font-bold leading-tight text-gray-800">
          Free tool access for every sprinter
        </h3>
        <div className="flex flex-col flex-wrap gap-3 sm:flex-row">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="flex items-center gap-2 rounded-full border border-[#e0e0dc] bg-white px-[17px] py-[11px]"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-[4px] bg-[#ede9fe]">
                <span className="font-body text-[10px] font-bold text-[#7c3aed]">
                  {tool.logoText}
                </span>
              </div>
              <span className="font-body text-[13px] font-semibold text-gray-800">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 6 — Testimonials
   ═══════════════════════════════════ */
function TestimonialCard({
  t,
  featured,
}: {
  t: (typeof testimonials)[0];
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-[18px] border border-[rgba(255,244,235,0.41)] bg-[#4b1b1b] p-[21px] ${
        featured ? "w-full" : "flex-1"
      }`}
    >
      <p className="mb-[15px] text-[14px] leading-relaxed text-neutral-50">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-[10px]">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#7c3aed] to-[#f472b6] font-body text-[14px] font-bold text-white">
          {t.initial}
        </div>
        <div className="flex-1">
          <div className="font-body text-[13px] font-bold text-neutral-50">
            {t.name}
          </div>
          <div className="text-[11px] text-neutral-50">
            {t.title}, {t.location} {t.flag}
          </div>
        </div>
        <span className="inline-flex items-center rounded-[4px] bg-[#d1fae5] px-2 py-[3px] font-body text-[10px] font-bold text-[#34d399]">
          {t.badge}
        </span>
      </div>
    </div>
  );
}

function Testimonials() {
  const featured = testimonials.find((t) => t.featured);
  const rest = testimonials.filter((t) => !t.featured);

  return (
    <div className="rounded-[28px] border border-neutral-200 bg-[#300101] p-[26px]">
      <span className="mb-[13px] inline-flex items-center rounded-md bg-[#ede9fe] px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-[#7c3aed]">
        {"\u{1F4AC}"} Designer testimonials
      </span>

      <div className="mt-8 flex flex-col gap-4">
        {/* Featured */}
        {featured && <TestimonialCard t={featured} featured />}

        {/* Rows of 2 */}
        {[0, 2, 4].map((startIdx) => {
          const pair = rest.slice(startIdx, startIdx + 2);
          if (pair.length === 0) return null;
          return (
            <div key={startIdx} className="flex flex-col gap-4 md:flex-row">
              {pair.map((t) => (
                <TestimonialCard key={t.name} t={t} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 7 — Gallery
   ═══════════════════════════════════ */
const tiltClasses = [
  "-rotate-1",
  "rotate-[1.5deg]",
  "-rotate-[0.5deg]",
  "rotate-1",
  "-rotate-[1.5deg]",
  "rotate-[0.5deg]",
];

function Gallery() {
  return (
    <div className="mt-2">
      <span className="mb-5 inline-flex items-center rounded-md bg-[#ede9fe] px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-[#7c3aed]">
        {"\u{1F4F8}"} Behind the scenes
      </span>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item, idx) => (
          <div
            key={item.label + idx}
            className={`flex min-h-[180px] items-center justify-center overflow-hidden rounded-[20px] border border-neutral-200 bg-gradient-to-br from-[#ede9fe] to-[#f3e8ff] transition-all hover:scale-[1.02] hover:border-[#7c3aed] hover:rotate-0 ${
              tiltClasses[idx] || ""
            } ${idx === 0 || idx === 5 ? "sm:col-span-2 lg:col-span-1" : ""}`}
          >
            <span className="px-3 text-center text-[11px] text-gray-500">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Section 8 — CTA
   ═══════════════════════════════════ */
function CtaSection() {
  return (
    <div className="mt-6 text-center">
      <a
        href={YUMMY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-[10px] rounded-full bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] px-8 py-4 font-body text-[15px] font-bold text-white shadow-[0_4px_16px_rgba(124,58,237,0.3)] transition-transform hover:-translate-y-0.5"
      >
        Visit yummy-labs.com
        <ExternalArrow />
      </a>
    </div>
  );
}

/* ═══════════════════════════════════
   Main Page
   ═══════════════════════════════════ */
export function YummyLabsPage() {
  return (
    <div className="mx-auto w-full max-w-[1100px]">
      <Header />

      <div className="flex flex-col gap-5">
        <ProblemAndRole />
        <Stats />
        <HowItWorks />
        <Partners />
        <Testimonials />
        <Gallery />
        <CtaSection />
      </div>
    </div>
  );
}
