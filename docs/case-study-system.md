# Case Study System — Build Reference

> How case study pages are built in this portfolio, so a new study (e.g. **pilgrimz**)
> can be assembled by reusing existing patterns instead of re-dissecting the codebase.
>
> Scope: the **non-immersive** case studies (Pandore, Ausventure, NeoTaste, Water.day).
> Learn.xyz is a separate **immersive** full-screen experience (`src/components/immersive/learn-xyz/`) and is intentionally excluded here.

---

## 1. Architecture at a glance

A case study page (`src/app/work/[slug]/page.tsx`) is composed from **three sources**:

1. **Notion data** — `getCaseStudyBySlug(slug)` from the **"Carmen Portfolio — Case Studies"** DB
   (`NOTION_DATABASE_ID`, data source `collection://9f3f2027-2978-46f4-a95c-a2481534f69d`).
   Provides: title, partner, headline, summary, overview, challenge, roleDescription,
   outcomes[], heroImages[], mainHeroImage, services[], platform[], industry, projectType, websiteUrl, order, status.
2. **Config** — `getCaseStudyConfig(slug)` from `src/lib/case-study-config.ts`.
   Provides: `readTime`, `timelineDuration`, `timelineSteps[]`, `brand` (18-token color system),
   optional `summaryOverride`, `atmosphericImage`, `heroVisual`.
3. **A bespoke `{Study}Sections` component** — the interactive middle, registered in `customSectionMap`
   in `work/[slug]/page.tsx`. This is where each study becomes unique.

### Fixed page order (`work/[slug]/page.tsx`)

```
ProgressBar                         // scroll progress + end-of-page celebration
HeroSection                         // branded 2-col hero (Notion data + brand + heroVisual)
AtmosphericImage (+ overlay)        // full-bleed mood image, only if config.atmosphericImage
MainHeroImage                       // full-bleed 16:9, only if study.mainHeroImage
Overview                            // Notion study.overview
Challenge                           // Notion study.challenge (dark maroon callout)
OurRole                             // Notion study.roleDescription   [skippable]
{Study}Sections OR Notion sections  // the bespoke interactive middle
ProcessTimeline                     // config.timelineSteps (hardcoded per study)
StickyNotesBanner                   // fixed "book a call" CTA
Outcomes                            // Notion study.outcomes          [skippable]
NextCaseStudy                       // linked "up next" card
```

**Skipping shared sections:** `skipSharedSections` in `page.tsx` lets a study suppress the shared
Role/Outcomes when its custom sections already cover them (e.g. `"water-day": { outcomes: true }`).

**Registration maps in `page.tsx`:**
- `customSectionMap` — `slug → {Study}Sections` component
- `skipSharedSections` — `slug → { role?, outcomes? }`
- `immersiveSlugs` — slugs that bypass the whole shell (only `learn-xyz`)
- `FALLBACK_SLUGS` — pre-built at deploy time even if Notion is down

---

## 2. Config & color contract (`src/lib/case-study-config.ts`)

Two distinct color mechanisms:

### A. `BrandColors` object (full hero theming)

Consumed by `HeroSection` and `Breadcrumb` only. 18 tokens:

```
bg, headlineText, bodyText, partnerText,
breadcrumbLink, breadcrumbSeparator, breadcrumbActive,
badgeBg, badgeText, readTimeText,
tagBg, tagBorder, tagText,
ctaBg, ctaText, ctaRadius,
progressBar, accentColor
```

Hero bg is a gradient computed from `brand.bg`:
`linear-gradient(170deg, ${bg} 0%, ${bg}e6 60%, ${bg}cc 100%)`.

Existing brand palettes (for reference / contrast):
- **learn-xyz** — gold `#FECB3A`, accent `#2216FF`
- **pandore** — dark navy `#0B1926`, accent `#3A4EFF`
- **water-day** — dark teal `#002B35`, accent `#00B3C7`
- **neotaste** — dark green `#092B18`, accent `#1A7A3D` (sections use a brighter `#53F293`/`#29F77C`)
- **ausventure** — warm teal `#143B39`, accent `#11607D`
- **klasse** — blue `#2216FF` (a "coming soon" stub)

### B. `accentColor` prop (lightweight, single hex string)

Threaded into body components (`Outcomes`, `ProcessTimeline`, `ContentSection`, `SectionLabel`,
`RichText`, `FeatureGrid`, `TestimonialCard`) **and every `{Study}Sections` component**.

**The core theming trick — hex + alpha suffix:**

| Suffix | Use |
|---|---|
| `${accentColor}08` | ~3% tint background (cards, panels) |
| `${accentColor}10` / `12` / `14` | tint backgrounds, icon chips, label pills |
| `${accentColor}18` | slightly stronger chip tint |
| `${accentColor}30` | tinted borders |
| `${accentColor}20` | glow/shadow rings (timeline highlight) |
| raw `accentColor` | solid: dots, badges, bold-word color, gradient bars |

Set one accent and a whole study themes itself.

`ProgressBar` takes its own `progressBarColor` (wire from `brand.progressBar`).

### Adding a config entry

Add a `"<slug>"` key to the `configs` record with `readTime`, `timelineDuration`,
`timelineSteps[]`, `brand`, and optionally `summaryOverride`, `atmosphericImage`, `heroVisual`.

---

## 3. Shared component reference

### Generic sections (`src/components/case-study/`)

| Component | Props | Renders |
|---|---|---|
| **HeroSection** | `study, readTime, brand, heroVisual?` | Branded 2-col hero: breadcrumb, partner, badges, headline, summary, read-time, service tags, CTA. Right col = registered hero visual (via `heroVisualMap`) or `study.heroImages[0]`. |
| **Overview** | `text` | "Overview" h2 + paragraphs (split on `\n`). |
| **Challenge** | `text` | Dark **maroon** gradient callout (`#300101→#421414`, hardcoded). First para = heading. |
| **OurRole** | `description` | "My Role" prose block (`whitespace-pre-line`). |
| **Outcomes** | `outcomes[], accentColor?` | "Outcomes" h2 + metric cards grid (🎯). Card bg `${accentColor}10`. |
| **ProcessTimeline** | `duration, steps, accentColor?` | "The Journey" vertical timeline. `step.isHighlight` → glowing dot. |
| **ContentSection** | `section, accentColor?` | The flexible Notion body block — layout-aware media (see below). |
| **MainHeroImage** | `src, alt` | Full-bleed 16:9 banner (video/SVG/image auto-detect). |
| **AtmosphericImage** | `src, alt, brandBg?, children?` | Full-viewport mood image, brand-blended top gradient, optional overlay children. |
| **ProgressBar** | `progressBarColor?, nextProject?` | Fixed scroll progress + 100% celebration overlay + share. |
| **StickyNotesBanner** | — | Fixed "book a call" CTA (hardcoded Cal.com link). |
| **SectionLabel** | `label, accentColor?, centered?` | Uppercase pill: bg `${c}14`, border `${c}30`, text `c`. |
| **RichText** | `segments, accentColor?` | Notion rich-text; **bold spans colored with accent**. |
| **Breadcrumb** | `caseName, brand` | "My Work / {case}" nav. |
| **NextCaseStudy** | `project` | Linked "up next" card (arrow circle hardcoded `blue-500`). |

**`ContentSection` media is layout-aware** via `section.layout`:
`phone-pair` · `phone-single` · `laptop` · `desktop` · `full-bleed` · `side-by-side` · default (1 image or 2/3-up grid).
`MediaItem` auto-detects video (`.mp4/.webm/.mov`), SVG, else `ImageWithShimmer`.

### Device frames

| Frame | max-w | Screen aspect | Chrome |
|---|---|---|---|
| **PhoneFrame** | 280px | `9/19.5` | iPhone bezel, Dynamic Island, home indicator |
| **LaptopFrame** | 800px | `16/10` | MacBook bezel + hinge base |
| **DesktopFrame** | 900px | `16/10` | iMac bezel + chin + stand |

All take `{ src, alt }`, `object-cover object-top`. Design screenshots to the frame's aspect ratio.
`DeviceMockupCarousel` re-implements the same three shells internally (as children wrappers).

### Interactive library (`src/components/case-study/interactive/`, barrel `index.ts`)

| Component | Key props | Use |
|---|---|---|
| **SectionReveal** | `children, delay?, direction?: up\|left\|right` | Directional scroll-reveal wrapper. |
| **AnimatedStats** | `stats[], columns?` | Count-up metric grid (ease-out-cubic, 1500ms). Cards `bg-blue-50` (not brand). |
| **BeforeAfter** | `beforeSrc, afterSrc, aspectRatio?` | Draggable before/after image slider. |
| **ColorPalette** | `colors: {name,hex,dark?}[]` | Click-to-copy swatch grid (2→5 cols). |
| **DeviceMockupCarousel** | `slides: {src,alt,caption?}[], device?, autoPlay?` | Auto-playing, swipeable multi-screen device carousel. |
| **FeatureGrid** | `features[], columns?, accentColor?, showMockups?` | Numbered feature cards, optional phone mockups. |
| **TestimonialCard** | `quote, name, role, avatarSrc?, accentColor?` | Quote card w/ avatar + accent top bar. |
| **TypeShowcase** | `fontName, samples[], googleFontUrl?` | Live type specimen (loads Google Font). |

---

## 4. Motion patterns

### The core reveal primitive

Two near-identical scroll-reveal components:

- **`ScrollReveal`** (`src/components/dashboard/ScrollReveal.tsx`) — used by **all generic sections**.
  `useInView({ once:true, margin:"-60px" })`, `{opacity:0, y:20} → {0}`, `transition:{ duration:0.5, delay, ease:"easeOut" }`.
- **`SectionReveal`** (`interactive/SectionReveal.tsx`) — directional variant for custom content.
  `margin:"-80px"`, offsets `up:y30 / left:x-30 / right:x30`, `duration:0.6, ease:"easeOut"`.

Neither uses spring. The only spring in the system is the ProgressBar celebration slide.

### Conventions (copy these values)

- **Card-grid stagger:** `initial {opacity:0, y:24} → {0}`, `transition {duration:0.5, delay: BASE + i*STEP, ease:"easeOut"}`.
  Common `BASE` 0.15–0.2, `STEP` 0.06–0.15.
- **inView trigger:** `useInView(ref, { once:true, margin:"-60px" })` (or `-80px`), gate `animate` on the boolean.
- **Perpetual float loop** (floating phones/cards): keyframe arrays e.g. `y:[off,-off,off]`,
  `transition {duration:~5-6, ease:"easeInOut", repeat:Infinity, repeatType:"mirror", delay: per-item}`.
  Use **out-of-phase per-item delays + alternating signs** so items don't sync.
- **Custom easings seen:** `[0.25,0.1,0.25,1]` ("smooth", hero visuals), `[0.16,1,0.3,1]` (expo-out, atmospheric overlays), `[0.25,0.4,0.25,1]` (hero section).
- **Reduced motion:** hero visuals + atmospheric overlays + Water.day sections honor `useReducedMotion()`. Section grids generally don't (they rely on `once:true`).
- **No scroll-linked parallax** except Water.day (`useScroll`/`useTransform`).

---

## 5. The `{Study}Sections` pattern

Every bespoke middle follows the same skeleton:

```tsx
"use client";
// imports: framer-motion (motion, useInView, ...), SectionReveal, SectionLabel,
//          DeviceMockupCarousel, ColorPalette, (TypeShowcase), device frames

export function PilgrimzSections({ accentColor }: { accentColor: string }) {
  return (
    <div className="flex w-full flex-col gap-20">   {/* gap-20 or gap-28 */}
      <SectionA accentColor={accentColor} />
      <SectionB accentColor={accentColor} />
      {/* ... */}
    </div>
  );
}
```

Each sub-section (a private `function` in the same file) opens with the same header recipe:

```
<section className="mx-auto w-full max-w-5xl">
  <SectionLabel label="..." accentColor={accentColor} />
  <h2 className="mt-4 font-brand text-28 font-bold text-brand-ink">...</h2>
  <p className="max-w-[760px] text-16 leading-[1.8] text-neutral-600">...</p>
  {/* content */}
</section>
```

Contained to `max-w-5xl` (~1024px) unless deliberately full-bleed.
A local `BRAND` palette constant often drives dark gradient "showpiece" cards while `accentColor` drives tints.

> **Consistency note:** some studies mix `accentColor` (prop) with a local `BRAND.accent` constant.
> For a new study, **pick one**: thread `accentColor` everywhere, OR define a full local `BRAND` and ignore the prop.

---

## 6. Per-study cheat sheet

Studies sit on a complexity spectrum from **calm brand-book** (Pandore) to **rich product** (Water.day).

### Pandore — `sections/PandoreSections.tsx` (calm/brand-book)
- 8 contained sub-sections, **entrance fades only** (no loops, no parallax, no reduced-motion).
- Reuses: `SectionReveal`, `ColorPalette`, `TypeShowcase` (Raleway), `DeviceMockupCarousel` (1 desktop).
- Bespoke: quote cards (left accent border), dual logo tiles (3D `rotateY` entrance), pattern banner + Transform/Adapt/Scale cards, "3 weeks" highlight card.
- **No custom hero visual.** Assets: **100% Framer CDN** (no local images).

### Ausventure — `sections/AusventureSections.tsx` (mid-high)
- Stack: AtAGlance → Friction → DesignLanguage → Discovery → **Booking** → BeforeAfter → Testimonial → Outcome → Vision. `gap-20`.
- Reuses: `SectionReveal`, `ColorPalette`, `TypeShowcase` (Archivo + Figtree), `DeviceMockupCarousel` (desktop + phone), `TestimonialCard`, `DesktopFrame`.
- **Signature `BookingSection`:** gradient backdrop + blurred radial accent glow + framed desktops with **bobbing floating phones** (`BOOKING_FLOAT_OFFSETS`, two-channel opacity/y transition).
- Hero visual: **compass** with rotating "locating" needle + floating destination badges. Atmospheric overlay: **typewriter headline** (React state, not framer) + pulsing GPS marker.
- Note: `OutcomeSection` **hardcodes** `#8AB5B3`/`#143B39` and ignores `accentColor`.
- Assets: `/images/ausventure/` (PNG screenshots, `.avif` badges) + 2 Framer CDN.

### NeoTaste — `sections/NeotasteSections.tsx` (high)
- Stack: Role → Friction → Discovery(+sticky "Beyond the feed") → BrandedDivider → Invites → OtherConcepts → Outcomes. `gap-28`.
- Reuses: `SectionReveal`, `DeviceMockupCarousel`, `SectionLabel`.
- **Signature pieces:** `IOSLockScreen` — fully hand-built animated iOS Live-Activity mock (distance counter via `setInterval` + `AnimatePresence`, progress bar); `StickyPhoneShowcase` — IntersectionObserver (`rootMargin:"-40% 0px -40%"`) + sticky phone that crossfades media as text steps scroll; inline **data-viz SVGs** (decline chart, broken-loop diagram).
- Hero visual: glowing orb + frosted recommendation chips + twinkling sparkles. Atmospheric overlay: two floating restaurant cards.
- Assets: `/images/neotaste/` (discovery/invite/concept PNGs, `outcomes-bg.jpg`, ring SVGs, overlay cards) + `/images/logos/neotaste-symbol.svg`.

### Water.day — `sections/WaterdaySections.tsx` (highest ambition)
- Stack: Role → DesignSystem → Platform → Personalization → Stories → CalmDesign → **Outcome (bespoke)** → Vision. `gap-20`. **Skips shared Outcomes.**
- Reuses: `SectionReveal`, `ColorPalette` (23 tokens), `DeviceMockupCarousel` (laptop + 2 phone). Builds its **own** type spec tables (no `TypeShowcase`).
- **Signature pieces:** `ScrollingLaptop` — Mac frame auto-scrolling a tall (1440×3681) screenshot with a **pinned sidebar** overlay; **full-bleed horizontally-parallaxing illustration strip** (`useScroll`/`useTransform`, `x: 30%→-60%`); photo-backed split Outcomes (sticky headline + 2×2 glass cards).
- Honors `useReducedMotion()` everywhere; hover **spring** on role icons (`stiffness:300, damping:15`).
- Hero visual (`waterday-cards`): **3 stacked 3D "Did you know?" cards** floating on independent axes (`perspective:800px`). Atmospheric overlay: big "70%" / "of your body is water".
- Assets: hybrid — Framer CDN + local `/images/water-day/` (illustrations, platform, habits, persona, components, `outcomes-bg.jpg`, hero cards).

### Shared DNA across all
- `flex flex-col gap-20/28` stack of local sub-section functions.
- Header recipe: `SectionLabel → h2 text-28 → p max-w-[760px]`, contained `max-w-5xl`.
- Dark gradient "showpiece" cards; glassmorphic **2×2 outcome grids** (`backdrop-blur-md`, `border-white/10`).
- Bespoke hand-built phone frames for floating arrangements (don't reuse the carousel shell when you need JSX inside).

---

## 7. Asset conventions

- New studies: put images in **`public/images/<slug>/`** (Water.day's local pattern is the model).
- Naming: descriptive + numbered, e.g. `discovery-1.png`, `phone-1.png`, `outcomes-bg.jpg`, `hero-card-front.png`.
- Local screenshots → `next/image` with explicit `width/height` + `sizes` (or `fill` + `sizes`).
- Floating phone mockups deliberately use raw `<img loading="lazy">` (with eslint-disable) inside hand-built frames.
- Hero-visual badge images sometimes `.avif`; backgrounds `.jpg`; UI screenshots `.png`; logos/diagrams `.svg`.

---

## 8. Recipe: add a new case study (e.g. pilgrimz)

1. **Config** — add a `"pilgrimz"` entry to `configs` in `src/lib/case-study-config.ts`
   (brand palette + `timelineSteps` + `readTime`; optional `summaryOverride`, `atmosphericImage`, `heroVisual`).
2. **Sections component** — create `src/components/case-study/sections/PilgrimzSections.tsx`
   exporting `PilgrimzSections({ accentColor })`. Register it in `customSectionMap` in `work/[slug]/page.tsx`.
3. **(Optional) custom hero visual** — create `PilgrimzHeroVisual.tsx`, register under a `heroVisual`
   key in `HeroSection`'s `heroVisualMap`, and set `heroVisual: "pilgrimz-..."` in config.
4. **(Optional) atmospheric overlay** — create `PilgrimzAtmosphericOverlay.tsx`, add to the overlay
   switch in `page.tsx` (`{slug === "pilgrimz" && <PilgrimzAtmosphericOverlay />}`), set `atmosphericImage` in config.
5. **(Optional) skip shared sections** — add to `skipSharedSections` if the custom sections own Role/Outcomes.
6. **Notion row** — add a row to "Carmen Portfolio — Case Studies" with the standard fields
   (Name, Slug = `pilgrimz`, Overview, Challenge, Role Description, Outcomes, Cover, Status, Order, etc.).
   Add `pilgrimz` to `FALLBACK_SLUGS` in `page.tsx` so it builds even if Notion is unavailable.
7. **Assets** — drop images in `public/images/pilgrimz/`.

### Gotchas
- Hardcoded (non-brand) spots that won't follow `accentColor`: `Challenge` maroon gradient,
  `NextCaseStudy` blue arrow, `AnimatedStats` blue cards, `StickyNotesBanner` Cal.com link,
  and some studies' `OutcomeSection`/dark cards (Ausventure hardcodes `#143B39`).
- Notion image URLs expire ~1h → pages set `revalidate = 3600`. A Notion edit appears within the
  hour or on redeploy (no on-demand revalidation wired yet).

---

## 9. Key file map

```
src/app/work/[slug]/page.tsx                  # orchestration: order, maps, fallbacks
src/lib/case-study-config.ts                  # brand colors, timeline, hero/atmospheric config
src/lib/notion.ts                             # getCaseStudyBySlug / getCaseStudySections / getAllProjects
src/components/case-study/                     # generic sections + device frames + per-study visuals
  ├─ HeroSection, Overview, Challenge, OurRole, Outcomes, ProcessTimeline, ContentSection
  ├─ MainHeroImage, AtmosphericImage, ProgressBar, StickyNotesBanner, SectionLabel, RichText,
  │  Breadcrumb, NextCaseStudy
  ├─ PhoneFrame, LaptopFrame, DesktopFrame
  ├─ {Study}HeroVisual.tsx, {Study}AtmosphericOverlay.tsx   # bespoke per study
  ├─ interactive/                             # SectionReveal, AnimatedStats, BeforeAfter, ColorPalette,
  │                                           #   DeviceMockupCarousel, FeatureCard(FeatureGrid),
  │                                           #   TestimonialCard, TypeShowcase
  └─ sections/{Study}Sections.tsx             # the bespoke interactive middle per study
src/components/dashboard/ScrollReveal.tsx     # the core fade-up reveal primitive
src/components/immersive/learn-xyz/           # Learn.xyz only (separate immersive system)
```
