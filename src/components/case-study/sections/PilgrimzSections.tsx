"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionReveal, ColorPalette, TypeShowcase } from "@/components/case-study/interactive";
import { SectionLabel } from "@/components/case-study/SectionLabel";

/* ── Pilgrimz brand ── */
const CORAL = "#E84C44";
const TEAL = "#0F888F";
const AMBER = "#E89B24";

/* Real tokens from the Pilgrimz Figma design system */
const pilgrimzColors = [
  { name: "Coral / Primary", hex: "#E84C44" },
  { name: "Coral / Light", hex: "#FDCFCC" },
  { name: "Teal / Secondary", hex: "#0F888F" },
  { name: "Teal / Light", hex: "#C2E5E7" },
  { name: "Amber / Accent", hex: "#E89B24" },
  { name: "Amber / Light", hex: "#FDEBCC" },
  { name: "Ink", hex: "#1C1B19" },
  { name: "Text", hex: "#33312D" },
  { name: "Muted", hex: "#807D76" },
  { name: "Border", hex: "#E8E6E1" },
  { name: "Surface", hex: "#FAF9F7" },
  { name: "Error", hex: "#DC2626" },
];

const jakartaSamples = [
  {
    label: "Display",
    text: "Know the story",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: 40,
    lineHeight: 44,
    letterSpacing: "-0.02em",
  },
  {
    label: "Heading",
    text: "A guide, not a children's app",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 600,
    fontSize: 22,
    lineHeight: 32,
  },
  {
    label: "Subhead",
    text: "Premium and high end",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 600,
    fontSize: 18,
    lineHeight: 24,
  },
];

const dmSamples = [
  {
    label: "Body large",
    text: "GPS triggered audio guides bring the story to where you stand.",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
    fontSize: 18,
    lineHeight: 29,
  },
  {
    label: "Body",
    text: "Warm neutrals, retuned color, and a voice that reads as a knowledgeable guide.",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 24,
  },
  {
    label: "Caption / UI",
    text: "Featured · Sponsored · Selected",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 20,
  },
];

/* ════════════════════════════════════════
   Section header helper
   ════════════════════════════════════════ */
function SectionHead({
  label,
  title,
  intro,
  accentColor,
}: {
  label: string;
  title: string;
  intro: string;
  accentColor: string;
}) {
  return (
    <SectionReveal>
      <SectionLabel label={label} accentColor={accentColor} />
      <h2 className="mt-4 font-brand text-28 font-bold leading-tight text-brand-ink">
        {title}
      </h2>
      <p className="mt-3 max-w-[760px] text-16 leading-[1.8] text-neutral-600">
        {intro}
      </p>
    </SectionReveal>
  );
}

/* ════════════════════════════════════════
   1 — Design system foundation
   ════════════════════════════════════════ */
function ColorUsageBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const segments = [
    { label: "Warm neutrals", w: "60%", color: "#33312D" },
    { label: "Teal", w: "25%", color: TEAL },
    { label: "Amber", w: "10%", color: AMBER },
    { label: "Coral", w: "5%", color: CORAL },
  ];
  return (
    <div ref={ref} className="mt-8">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[12px] font-semibold uppercase tracking-[0.05em] text-neutral-500">
          Usage on a real screen
        </span>
        <span className="text-[12px] text-neutral-500">a rough 60 to 10 split</span>
      </div>
      <div className="flex h-10 overflow-hidden rounded-xl border border-sand-300">
        {segments.map((s, i) => (
          <motion.div
            key={s.label}
            className="flex items-center justify-center"
            style={{ backgroundColor: s.color }}
            initial={{ width: 0 }}
            animate={inView ? { width: s.w } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: "easeOut" }}
          >
            <span className="px-2 text-[10px] font-semibold text-white/90 mix-blend-difference">
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
      <p className="mt-2 text-[12px] leading-relaxed text-neutral-500">
        Coral is reserved for primary actions like play buttons and main CTAs, so the color
        signals action, not alarm. The error red is kept deliberately distinct from it.
      </p>
    </div>
  );
}

function FoundationCard({
  title,
  body,
  swatch,
}: {
  title: string;
  body: string;
  swatch: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-sand-300 bg-white p-5">
      <div className="flex h-12 items-center">{swatch}</div>
      <div>
        <div className="font-body text-[14px] font-bold text-brand-ink">{title}</div>
        <p className="mt-1 text-[13px] leading-relaxed text-neutral-600">{body}</p>
      </div>
    </div>
  );
}

function DesignSystemSection({ accentColor }: { accentColor: string }) {
  return (
    <section className="mx-auto w-full max-w-5xl">
      <SectionHead
        accentColor={accentColor}
        label="Design system"
        title="A foundation built for consistency, not cosmetics"
        intro="Phase one was a product design system, not a rebrand, and I was explicit with the founders about that boundary. The deliverable was foundational tokens plus components connected to them, built for consistency, accessibility, and a premium feel."
      />

      {/* Color */}
      <div className="mt-10">
        <h3 className="mb-1 font-brand text-[18px] font-bold text-brand-ink">
          Color, with psychology and accessibility applied
        </h3>
        <p className="mb-5 max-w-[760px] text-[14px] leading-relaxed text-neutral-600">
          The base red was retuned into a coral primary, a teal secondary carries exploration and
          discovery, and an amber accent marks featured and sponsored content. Warm neutrals replace
          cold grays. Light mode is primary, with dark values defined across the scale, and contrast
          was a constraint throughout.
        </p>
        <ColorPalette colors={pilgrimzColors} />
        <ColorUsageBar />
      </div>

      {/* Typography */}
      <div className="mt-12">
        <h3 className="mb-1 font-brand text-[18px] font-bold text-brand-ink">
          Typography that reads as a guide
        </h3>
        <p className="mb-5 max-w-[760px] text-[14px] leading-relaxed text-neutral-600">
          Plus Jakarta Sans for headings and display, DM Sans for body and UI. The goal was a voice
          that reads as a knowledgeable guide, with a full scale, weights, line heights, and letter
          spacing defined as tokens.
        </p>
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex-1">
            <TypeShowcase
              fontName="Plus Jakarta Sans"
              fontCategory="Headings & display"
              samples={jakartaSamples}
              googleFontUrl="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
            />
          </div>
          <div className="flex-1">
            <TypeShowcase
              fontName="DM Sans"
              fontCategory="Body & UI"
              samples={dmSamples}
              googleFontUrl="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
            />
          </div>
        </div>
      </div>

      {/* Rest of the foundation */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <FoundationCard
          title="Spacing, radius, effects"
          body="A consistent rhythm and elevation system, including a glow and ring treatment for featured and sponsored points of interest."
          swatch={
            <div className="flex items-end gap-2">
              {[8, 12, 16, 24].map((r) => (
                <span
                  key={r}
                  className="bg-sand-200"
                  style={{ width: 24, height: 24, borderRadius: r / 1.5 }}
                />
              ))}
            </div>
          }
        />
        <FoundationCard
          title="POI differentiation"
          body="Cultural sites, restaurants, hotels, and shops can be told apart on the map, with paid visibility called out clearly."
          swatch={
            <div className="flex items-center gap-2.5">
              <span className="h-3.5 w-3.5 rounded-full border-2 border-white shadow" style={{ backgroundColor: TEAL }} />
              <span className="h-3.5 w-3.5 rounded-full border-2 border-white shadow" style={{ backgroundColor: CORAL }} />
              <span
                className="h-3.5 w-3.5 rounded-full border-2 border-white shadow"
                style={{ backgroundColor: AMBER, boxShadow: `0 0 10px ${AMBER}88` }}
              />
            </div>
          }
        />
        <FoundationCard
          title="Components on tokens"
          body="Components were connected back to the tokens, so the system holds together as it grows and new work stays inside it."
          swatch={
            <div className="flex flex-col gap-1.5">
              <span className="h-5 w-20 rounded-md" style={{ backgroundColor: CORAL }} />
              <span className="h-5 w-16 rounded-md border border-sand-300 bg-sand-100" />
            </div>
          }
        />
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   2 — AI enablement (signature)
   ════════════════════════════════════════ */
const pipelineNodes: { title: string; sub: string; icon: string; badge?: string }[] = [
  { title: "Figma tokens", sub: "Named with intent", icon: "layers" },
  { title: "Code", sub: "Maps to the theme", icon: "code" },
  { title: "Claude", sub: "System as context", icon: "spark" },
  { title: "On-system feature", sub: "In about an hour", icon: "check", badge: "~1 hr" },
];

function NodeIcon({ kind }: { kind: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (kind === "layers")
    return (
      <svg {...common}>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    );
  if (kind === "code")
    return (
      <svg {...common}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  if (kind === "spark")
    return (
      <svg {...common}>
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
        <path d="M12 8l1.2 2.8L16 12l-2.8 1.2L12 16l-1.2-2.8L8 12l2.8-1.2z" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function Pipeline({ accentColor }: { accentColor: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div
      ref={ref}
      className="mt-8 overflow-hidden rounded-3xl border border-sand-300 p-6 lg:p-8"
      style={{ background: "linear-gradient(160deg, #1C1B19 0%, #2A2724 100%)" }}
    >
      <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
        {pipelineNodes.map((node, i) => (
          <div key={node.title} className="flex flex-1 items-center gap-3 lg:flex-col lg:gap-3">
            <motion.div
              className="relative flex w-full flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-sm lg:flex-col lg:items-start lg:gap-2"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.15, ease: "easeOut" }}
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${accentColor}26`, color: "#FFFFFF" }}
              >
                <NodeIcon kind={node.icon} />
              </span>
              <div>
                <div className="font-brand text-[14px] font-semibold text-white">{node.title}</div>
                <div className="text-[11px] text-white/55">{node.sub}</div>
              </div>
              {node.badge && (
                <span
                  className="absolute right-3 top-3 rounded-full px-2 py-0.5 text-[9px] font-bold lg:static lg:mt-1"
                  style={{ backgroundColor: `${AMBER}26`, color: "#F0AC3E" }}
                >
                  {node.badge}
                </span>
              )}
            </motion.div>
            {i < pipelineNodes.length - 1 && (
              <motion.span
                className="shrink-0 text-white/30 lg:rotate-90"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AiCard({ title, body, i, inView }: { title: string; body: string; i: number; inView: boolean }) {
  return (
    <motion.div
      className="rounded-2xl border border-sand-300 bg-white p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.45, delay: 0.15 + i * 0.08, ease: "easeOut" }}
    >
      <div className="font-body text-[14px] font-bold text-brand-ink">{title}</div>
      <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-600">{body}</p>
    </motion.div>
  );
}

function AiEnablementSection({ accentColor }: { accentColor: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const cards = [
    {
      title: "AI-readable tokens",
      body: "Variables named with intent so they translate cleanly to code, mapping toward the Gluestack theme while staying portable if the team moves off it.",
    },
    {
      title: "A real bridge to dev",
      body: "The token structure supports a Figma to code pipeline, so a change in Figma can flow toward the codebase instead of being re-typed by hand.",
    },
    {
      title: "A Storybook home",
      body: "A browsable library of tokens and usage, so the code side of the system is something you can see and reference, not just read in a file.",
    },
    {
      title: "Infrastructure inside Claude",
      body: "The system travels as context, so when the team asks Claude to build a feature, the output already respects the tokens, the components, and the intent.",
    },
  ];
  return (
    <section className="mx-auto w-full max-w-5xl">
      <SectionHead
        accentColor={accentColor}
        label="AI enablement"
        title="From a design system to infrastructure"
        intro="This is what separates the work from a normal design system. I did not just make tokens look good in Figma. I built the system to be readable and usable by AI, so a tiny team can design and ship fast."
      />

      <Pipeline accentColor={accentColor} />

      <div ref={ref} className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cards.map((c, i) => (
          <AiCard key={c.title} title={c.title} body={c.body} i={i} inView={inView} />
        ))}
      </div>

      <SectionReveal delay={0.1}>
        <div
          className="mt-6 rounded-2xl p-6"
          style={{ backgroundColor: `${accentColor}0F` }}
        >
          <p className="text-[15px] font-medium leading-relaxed text-brand-ink">
            This is the difference between making a design system and building infrastructure that
            scales. The system is not a document the team has to remember to follow. It is wired into
            how they design and build, including how their AI tools behave.
          </p>
        </div>
      </SectionReveal>
    </section>
  );
}

/* ════════════════════════════════════════
   3 — Redesign of core flows (strategic)
   ════════════════════════════════════════ */
function StrategyCard({
  tag,
  title,
  body,
  i,
  inView,
  accentColor,
}: {
  tag: string;
  title: string;
  body: string;
  i: number;
  inView: boolean;
  accentColor: string;
}) {
  return (
    <motion.div
      className="rounded-2xl border border-sand-300 bg-white p-6"
      style={{ borderLeft: `3px solid ${accentColor}` }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: "easeOut" }}
    >
      <span
        className="text-[11px] font-bold uppercase tracking-[0.05em]"
        style={{ color: accentColor }}
      >
        {tag}
      </span>
      <h3 className="mt-1.5 font-brand text-[18px] font-bold text-brand-ink">{title}</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-neutral-600">{body}</p>
    </motion.div>
  );
}

function RedesignSection({ accentColor }: { accentColor: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const cards = [
    {
      tag: "Navigation and discovery",
      title: "Moving between cities without a fight",
      body: "Users, especially older ones, struggled to move between cities without zooming the map. They reached for search but missed a small plane icon, and the path from there felt messy. I treated this as an experience problem, not an icon problem.",
    },
    {
      tag: "The map",
      title: "A primary surface, not a backdrop",
      body: "People lean on the map to sense what is around them and gauge distances. The redesign differentiates point of interest types and surfaces sponsored or premium places clearly, which ties directly to how Pilgrimz monetizes.",
    },
    {
      tag: "The Hub",
      title: "A revenue surface, made premium",
      body: "Hubs are curated experiences from museums, tourism boards, and cultural organizations, the business to business product Pilgrimz sells. I moved it toward a cleaner Airbnb and Strava feel: continuous scroll instead of tabs, a consolidated Experiences section, a sticky book this experience button, and audio guide sources that collapse by default and expand on demand.",
    },
  ];
  return (
    <section className="mx-auto w-full max-w-5xl">
      <SectionHead
        accentColor={accentColor}
        label="Redesign"
        title="Core flows, restructured around trust and the business"
        intro="With the foundation in place, the work moved to the core screens and flows. This was not about making things prettier. It was about consistency that builds trust, flows that reduce confusion, and structure that supports how the app actually makes money."
      />
      <div ref={ref} className="mt-8 flex flex-col gap-4">
        {cards.map((c, i) => (
          <StrategyCard key={c.tag} {...c} i={i} inView={inView} accentColor={accentColor} />
        ))}
      </div>
      <SectionReveal delay={0.1}>
        <p className="mt-6 max-w-[760px] text-[14px] leading-relaxed text-neutral-500">
          The redesign is downstream of the system. Because the foundation exists, these screens
          could be reworked quickly and stay consistent, and the choices were driven by trust,
          retention, and the B2B model rather than by taste.
        </p>
      </SectionReveal>
    </section>
  );
}

/* ════════════════════════════════════════
   4 — Social layer (in progress)
   ════════════════════════════════════════ */
function DirectionCard({
  title,
  body,
  i,
  inView,
}: {
  title: string;
  body: string;
  i: number;
  inView: boolean;
}) {
  return (
    <motion.div
      className="flex flex-col gap-2 rounded-2xl border border-sand-300 bg-sand-50 p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.45, delay: 0.15 + i * 0.1, ease: "easeOut" }}
    >
      <span
        className="w-fit rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.05em]"
        style={{ backgroundColor: `${AMBER}1F`, color: "#996310" }}
      >
        Exploring
      </span>
      <div className="font-body text-[14px] font-bold text-brand-ink">{title}</div>
      <p className="text-[13px] leading-relaxed text-neutral-600">{body}</p>
    </motion.div>
  );
}

function SocialSection({ accentColor }: { accentColor: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const cards = [
    {
      title: "A feed built around places",
      body: "A discovery feed rethought around places, inspiration, and saving destinations for later, rather than a social network of strangers.",
    },
    {
      title: "Light micro-feedback",
      body: "Quick, useful tags after a tour, like good for solo travelers or great coffee, that improve the product without asking users to produce content for an audience.",
    },
    {
      title: "Shareable trip cards",
      body: "A trip card and shareable card layer where the priority is outbound sharing to Instagram and WhatsApp, designed to inspire the person who receives it to go do the same thing.",
    },
  ];
  return (
    <section className="mx-auto w-full max-w-5xl">
      <SectionHead
        accentColor={accentColor}
        label="What's next"
        title="A social layer built around places, not strangers"
        intro="This part is underway, not finished. It is the next chapter. The existing feed showed strangers' activity with no reason to care, so the social layer is being reframed around destinations. The useful unit is many travelers visited this place and found it great for solo travelers, not this user took a Tuesday walk."
      />
      <div ref={ref} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((c, i) => (
          <DirectionCard key={c.title} title={c.title} body={c.body} i={i} inView={inView} />
        ))}
      </div>
      <SectionReveal delay={0.1}>
        <div
          className="mt-6 rounded-2xl p-6"
          style={{ backgroundColor: `${accentColor}0F` }}
        >
          <p className="text-[15px] font-medium leading-relaxed text-brand-ink">
            Organic contribution and inspiration beat asking early users to perform for an audience.
            Ownership and memory come before gamification.
          </p>
        </div>
      </SectionReveal>
    </section>
  );
}

/* ════════════════════════════════════════
   Main
   ════════════════════════════════════════ */
export function PilgrimzSections({ accentColor }: { accentColor: string }) {
  return (
    <div className="flex w-full flex-col gap-20">
      <DesignSystemSection accentColor={accentColor} />
      <AiEnablementSection accentColor={accentColor} />
      <RedesignSection accentColor={accentColor} />
      <SocialSection accentColor={accentColor} />
    </div>
  );
}
