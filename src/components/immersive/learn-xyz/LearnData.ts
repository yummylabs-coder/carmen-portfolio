/**
 * Static content for the Learn.xyz immersive case study.
 * Separates copy from components for easy editing.
 */

/* ------------------------------------------------------------------ */
/*  Images — reuse existing CDN URLs from the old LearnXyzSections     */
/* ------------------------------------------------------------------ */

export const IMAGES = {
  // Hero
  hero: "https://framerusercontent.com/images/sH7xrKlGVFqbCMOXhtedwDhBw4.png",

  // Website screenshots
  website1:
    "https://framerusercontent.com/images/RGN9RVmVPpBmBxgpjMIJGYUTo.png",
  website2:
    "https://framerusercontent.com/images/mHcxSI4x38ypW2j5KbsXBFVZ5w.png",
  website3:
    "https://framerusercontent.com/images/0mGTJh1IjVIUWJIhqj8TZ0pST0.png",
  website4:
    "https://framerusercontent.com/images/nfSLHd9TbzDuNSwn7F5OVUQ1oQ.png",

  // Dashboard screenshots (real Figma exports)
  dashboard1: "/images/learn/web-dashboard-1.png",
  dashboard2: "/images/learn/web-dashboard-2.png",
  dashboard3: "/images/learn/web-dashboard-3.png",
  dashboard4: "/images/learn/web-dashboard-4.png",
  dashboard5: "/images/learn/web-dashboard-5.png",
  dashboard6: "/images/learn/web-dashboard-6.png",
  dashboard7: "/images/learn/web-dashboard-7.png",

  // Mobile screenshots (real Figma exports)
  mobile1: "/images/learn/mobile-app-1.png",
  mobile2: "/images/learn/mobile-app-2.png",
  mobile3: "/images/learn/mobile-app-3.png",
  mobile4: "/images/learn/mobile-app-4.png",
  mobile5: "/images/learn/mobile-app-5.png",
  mobile6: "/images/learn/mobile-app-6.png",
  mobile7: "/images/learn/mobile-app-7.png",
  mobile8: "/images/learn/mobile-app-8.png",

  // GIFs / motion
  gifWebsite:
    "https://framerusercontent.com/images/Uj4FrGeoRDHGx4ZPjRElDgBLg.gif",
  gifDashboard:
    "https://framerusercontent.com/images/mflf6MR8SXXZ8DrA5MynBhWlUKI.gif",
  gifMobile:
    "https://framerusercontent.com/images/rNsqfF1bMlYZFH8G1oXQCeBBQA.gif",
  gifBrand:
    "https://framerusercontent.com/images/1Fid9q2TLY5qMaKQTPfQhPX3dM.gif",

  // Misc
  brandVisual:
    "https://framerusercontent.com/images/vqxI0bq3iDCzFJuOlx2gK7nQ.png",

  // Real components from Figma
  componentActivity: "/images/learn/component-activity.png",
  componentProgress: "/images/learn/component-progress.png",
  componentFeatured: "/images/learn/component-featured.png",

  // Bet section — scrollable phone feed
  betHeader: "/images/learn/bet-header.png",
  betFeed: "/images/learn/bet-feed-full.png",

  // Design System — lesson editor with animated right panel
  dsEditorChat: "/images/learn/ds-editor-chat.png",
  dsViewLearners: "/images/learn/ds-view-learners.png",
  dsEditorPreview: "/images/learn/ds-editor-preview.png",

  // Placeholder office / team photos (replace with real shots)
  teamWorking:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
  officeCollab:
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
};

/* ------------------------------------------------------------------ */
/*  Section copy                                                       */
/* ------------------------------------------------------------------ */

export const HERO = {
  headline: "Learning that doesn't\nfeel like learning.",
  meta: "Learn.xyz · Founding Designer · 2022–2025",
  services: ["Product Design", "Design System", "UX Research", "Brand"],
  platforms: ["iOS", "Web", "Admin"],
};

export const JOURNEY = {
  headline: "Three years.\nOne vision.",
  duration: "2022 – 2025",
  body: "From a blank Figma file to a funded product used by teams worldwide. Here's how the work unfolded.",
  phases: [
    {
      label: "Discover",
      title: "Research & Strategy",
      description:
        "Interviewed 30+ L&D managers and learners. Mapped the competitive landscape. Identified the core insight: people don't hate learning — they hate the tools.",
      quarter: "Q1 2022",
      icon: "search" as const,
    },
    {
      label: "Define",
      title: "Brand & Design System",
      description:
        "Created the visual identity from scratch — the gold palette, the type system, the token architecture. Built a component library that scales from mobile to marketing.",
      quarter: "Q2 2022",
      icon: "palette" as const,
    },
    {
      label: "Design",
      title: "Mobile App & Dashboard",
      description:
        "Designed the learner-facing iOS app and the admin dashboard in parallel. Social feeds, gamification loops, AI-powered lesson creation — all from one design system.",
      quarter: "Q3–Q4 2022",
      icon: "layers" as const,
    },
    {
      label: "Ship",
      title: "Launch & Iterate",
      description:
        "Shipped the MVP to 5 pilot clients. Ran weekly usability sessions. Iterated on onboarding, lesson flow, and team features based on real usage data.",
      quarter: "2023",
      icon: "rocket" as const,
    },
    {
      label: "Scale",
      title: "Growth & Funding",
      description:
        "Expanded to 20+ global pilot clients. Designed the marketing site that helped close $4M in seed funding. Udemy noticed.",
      quarter: "2024–2025",
      icon: "trending" as const,
      isHighlight: true,
    },
  ],
};

export const PROBLEM = {
  headline: "Nobody finishes\ncorporate training.",
  body: "80% of workplace courses go incomplete. The content reads like compliance checklists. The interfaces feel like they were designed in 2011. And the people forced to use them? They alt-tab the second their manager looks away. Learn.xyz started with a provocation: what if professional development felt as good as your favorite app?",
  stat: "80%",
};

export const BET = {
  headline: "What if learning\nfelt like scrolling?",
  body: "Short-form lessons. Social feeds. Gamification loops. AI-generated content. We designed a platform that turns training into something people actually want to open.",
};

export const ROLE = {
  headline: "From zero to\nSeries Seed.",
  body: "I joined as the dedicated design partner from day zero, before there was a product, a brand, or a single screen. Over two years, I shaped the entire product ecosystem: the mobile app learners reach for, the dashboard admins rely on, and the website that convinced investors this was real.",
  cards: [
    {
      icon: "phone" as const,
      title: "Mobile App",
      description: "The experience learners love",
    },
    {
      icon: "laptop" as const,
      title: "Web Dashboard",
      description: "The engine admins depend on",
    },
    {
      icon: "globe" as const,
      title: "Marketing Site",
      description: "The story that sells it",
    },
  ],
};

export const DESIGN_SYSTEM = {
  headline: "Bold. Joyful.\nUnmistakable.",
  body: "Corporate learning tools look corporate. We built a design language that refuses to. Every color, every typeface, every interaction was chosen to spark curiosity and make people feel like they discovered something good, not like they were assigned homework.",
  closingLine: "From button to billboard. One system, every surface.",

  colors: [
    { name: "Learn Gold", hex: "#FECB3A", semantic: "color.brand.primary", usage: "CTAs, highlights, brand moments" },
    { name: "Deep Violet", hex: "#0D0847", semantic: "color.bg.primary", usage: "Backgrounds, sections, copy on light surfaces" },
    { name: "Brand Blue", hex: "#2216FF", semantic: "color.action.main", usage: "Buttons, links, progress indicators" },
    { name: "Electric Violet", hex: "#5B4FFF", semantic: "color.action.hover", usage: "Hover states, active indicators" },
    { name: "Off White", hex: "#FFFEFC", semantic: "color.surface.base", usage: "Page backgrounds, copy on dark surfaces" },
    { name: "Cream", hex: "#FFF8E1", semantic: "color.surface.warm", usage: "Cards, inputs, soft surfaces" },
    { name: "Coral", hex: "#FF6B6B", semantic: "color.sentiment.error", usage: "Errors, alerts, urgent badges" },
    { name: "Mint", hex: "#00D4AA", semantic: "color.sentiment.success", usage: "Success states, completion" },
  ],

  typeSpecimens: [
    {
      style: "Display",
      sample: "Learning that actually sticks.",
      weight: 700,
      size: 44,
      letterSpacing: "-0.03em",
    },
    {
      style: "Heading",
      sample: "Gamified. Social. AI-powered.",
      weight: 600,
      size: 28,
      letterSpacing: "-0.01em",
    },
    {
      style: "Body",
      sample:
        "Lessons are short, engaging, and designed for busy teams. No more boring corporate training that nobody finishes.",
      weight: 400,
      size: 16,
      letterSpacing: "0",
    },
  ],

  tokenArchitecture: [
    {
      primitive: { name: "Gold 400", value: "#FECB3A" },
      semantic: "color.brand.primary",
      components: ["button.cta.bg", "badge.highlight", "nav.active"],
    },
    {
      primitive: { name: "Blue 600", value: "#2216FF" },
      semantic: "color.action.main",
      components: ["button.primary.bg", "link.default", "progress.fill"],
    },
    {
      primitive: { name: "Violet 900", value: "#0D0847" },
      semantic: "color.bg.primary",
      components: ["section.bg", "heading.on-light", "body.on-light"],
    },
    {
      primitive: { name: "White 50", value: "#FFFEFC" },
      semantic: "color.surface.base",
      components: ["page.bg", "text.on-dark", "card.surface"],
    },
  ],

  decisions: [
    {
      question: "Why gold in a sea of corporate blue?",
      answer:
        "Every competitor uses blue to signal 'trustworthy enterprise.' Gold says 'this is different' before you read a single word. It's a positioning decision disguised as a color choice.",
    },
    {
      question: "Why one typeface for everything?",
      answer:
        "Source Sans Pro is clean enough for data-dense dashboards but warm enough for a learning app. One typeface that works at 11px in a table and 44px on a billboard means less cognitive load and faster design decisions.",
    },
    {
      question: "Why an 8px base grid?",
      answer:
        "8 divides cleanly into screen densities (1x, 2x, 3x). Every margin, padding, and gap is a multiple of 8, so the layout math never breaks, even when engineers round differently.",
    },
    {
      question: "Why 200ms default motion?",
      answer:
        "Fast enough that the UI feels instant. Slow enough that transitions register as intentional. We tested 150ms (too robotic) and 300ms (too sluggish). 200ms is the sweet spot for 'snappy but alive.'",
    },
  ],

  componentShowcase: [
    {
      name: "Activity Feed",
      description: "Social learning activity — completions, kudos, team engagement at a glance.",
      image: "componentActivity" as const,
      width: 316,
      height: 428,
    },
    {
      name: "Learning Path Card",
      description: "Progress tracking through multi-lesson paths with visual completion.",
      image: "componentProgress" as const,
      width: 358,
      height: 143,
    },
    {
      name: "Featured Lesson",
      description: "Hero card for highlighted content with rich media, author attribution, and CTA.",
      image: "componentFeatured" as const,
      width: 358,
      height: 355,
    },
  ],

  inspectorZones: [
    {
      id: "badge",
      label: "Category Badge",
      x: 12,
      y: 8,
      w: 80,
      h: 24,
      tokens: [
        { prop: "background", token: "color.brand.primary", value: "#FECB3A" },
        { prop: "text", token: "color.text.on-brand", value: "#300101" },
        { prop: "radius", token: "radius.pill", value: "999px" },
        { prop: "padding", token: "space.xs space.sm", value: "4px 8px" },
      ],
      why: "Badges use brand gold to signal curated content — not system-generated defaults.",
    },
    {
      id: "title",
      label: "Lesson Title",
      x: 12,
      y: 40,
      w: 220,
      h: 28,
      tokens: [
        { prop: "font", token: "type.heading.sm", value: "600 / 18px" },
        { prop: "color", token: "color.text.primary", value: "#300101" },
        { prop: "spacing", token: "space.xs", value: "4px bottom" },
      ],
      why: "Title hierarchy uses weight, not size. Keeps the card compact without sacrificing readability.",
    },
    {
      id: "progress",
      label: "Progress Bar",
      x: 12,
      y: 130,
      w: 220,
      h: 8,
      tokens: [
        { prop: "fill", token: "color.action.main", value: "#2216FF" },
        { prop: "track", token: "color.surface.warm", value: "#FFF8E1" },
        { prop: "radius", token: "radius.sm", value: "4px" },
        { prop: "height", token: "size.progress", value: "6px" },
      ],
      why: "Blue signals active progress. The warm track blends with the card surface, keeping visual noise low.",
    },
    {
      id: "avatar",
      label: "Avatar Stack",
      x: 12,
      y: 155,
      w: 80,
      h: 28,
      tokens: [
        { prop: "size", token: "size.avatar.sm", value: "24px" },
        { prop: "border", token: "color.surface.base", value: "#FFFEFC" },
        { prop: "overlap", token: "space.avatar.overlap", value: "-6px" },
      ],
      why: "Overlapping avatars create social proof at a glance — this is a team activity, not solo homework.",
    },
    {
      id: "card-bg",
      label: "Card Surface",
      x: 0,
      y: 0,
      w: 248,
      h: 192,
      tokens: [
        { prop: "background", token: "color.surface.base", value: "#FFFEFC" },
        { prop: "radius", token: "radius.lg", value: "16px" },
        { prop: "shadow", token: "elevation.card", value: "0 2px 8px rgba(0,0,0,0.06)" },
        { prop: "padding", token: "space.md", value: "16px" },
      ],
      why: "Off-white instead of pure white. Feels warmer, more approachable — matching the brand personality.",
    },
  ],
};

export const MOBILE_APP = {
  headline: "Swipe. Learn.\nRepeat.",
  body: "The learner app feels more like a social feed than a training portal. Lessons are short, visual, and designed for the moments between meetings. Gamification loops drive engagement. Team-based progress turns learning into a shared experience, not a lonely checkbox.",
  screens: [
    { src: "mobile1" as const, alt: "Home feed with notification", caption: "Home Feed | Notification Announcement" },
    { src: "mobile2" as const, alt: "Notification center", caption: "Notification Center" },
    { src: "mobile3" as const, alt: "Learner profile", caption: "Learner Profile" },
    { src: "mobile4" as const, alt: "Create a learning group", caption: "Create a learning group 'Circles'" },
    { src: "mobile5" as const, alt: "Post in your Circle", caption: "Post in your Circle" },
    { src: "mobile6" as const, alt: "Streaks", caption: "Streaks" },
    { src: "mobile7" as const, alt: "Learning paths", caption: "Learning Paths" },
    { src: "mobile8" as const, alt: "Lesson creation for learners", caption: "Lesson Creation Learner" },
  ],
};

export const DASHBOARD = {
  headline: "Create a lesson\nin minutes.",
  body: "Admins don't have time for complex authoring tools. We designed a dashboard where AI generates lesson drafts, content organizes by team or topic, and publishing happens in one click. Smart defaults mean less setup. Preview tools mean fewer surprises.",
  screens: [
    { src: "dashboard1" as const, alt: "Start of lesson or path creation", caption: "Start of lesson or path creation" },
    { src: "dashboard2" as const, alt: "Files drop", caption: "Files drop" },
    { src: "dashboard3" as const, alt: "Selecting type of content", caption: "Selecting type of content" },
    { src: "dashboard4" as const, alt: "Lesson editor", caption: "Lesson editor" },
    { src: "dashboard5" as const, alt: "Publishing to groups", caption: "Publishing to groups" },
    { src: "dashboard6" as const, alt: "Publish success and share", caption: "Publish success & Share" },
    { src: "dashboard7" as const, alt: "Learner completion analytics", caption: "Learner completion analytics" },
  ],
};

export const WEBSITE = {
  headline: "Not your average\ntraining tool.",
  body: "The marketing site needed to feel as fresh as the product it represents. We used bold visuals, playful micro-interactions, and conversion-focused copy to make Learn.xyz's pitch instantly clear: this is different, and you want in.",
  screens: [
    { src: "website1" as const, alt: "Homepage", caption: "Playful homepage with energy and clarity" },
    { src: "website2" as const, alt: "Features", caption: "Bold visuals and micro-interactions" },
    { src: "website3" as const, alt: "Product page", caption: "Clear product storytelling" },
    { src: "website4" as const, alt: "Social proof", caption: "Conversion-focused with social proof" },
  ],
};

export const OUTCOMES = {
  headline: "$4M raised.\nUdemy noticed.",
  closingLine: "The numbers that got investors excited, and the design that made them possible.",
  stats: [
    { value: 20, suffix: "+", label: "Global Pilot Clients" },
    { value: 80, suffix: "%", label: "Lesson Completion Rate" },
    { value: 10, suffix: "/week", label: "Avg. Lessons per Learner" },
    { value: 1000, suffix: "+", label: "Lessons Created in Week 1" },
  ],
};
