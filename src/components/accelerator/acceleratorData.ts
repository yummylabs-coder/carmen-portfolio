export interface Testimonial {
  name: string;
  title: string;
  location: string;
  flag: string;
  quote: string;
  badge: string;
  initial: string;
  avatarSlug: string;
  featured?: boolean;
}

export interface Partner {
  name: string;
  description: string;
  logoText: string;
  slug: string;
}

export interface Tool {
  name: string;
  logoText: string;
  slug: string;
}

export interface Stat {
  icon: string;
  number: string;
  label: string;
}

export interface GalleryItem {
  label: string;
  slug: string;
}

export const stats: Stat[] = [
  { icon: "\u{1F3C3}", number: "3", label: "Sprints Run" },
  { icon: "\u{1F469}\u200D\u{1F3A8}", number: "30+", label: "Designers Trained" },
  { icon: "\u{1F680}", number: "3", label: "Startup Partners" },
  { icon: "\u2B50", number: "2", label: "Weeks per Sprint" },
];

export const roles = [
  { icon: "\u{1F4D0}", text: "Curriculum design" },
  { icon: "\u{1F393}", text: "Lead mentorship" },
  { icon: "\u{1F91D}", text: "Startup partnerships" },
  { icon: "\u{1F680}", text: "Product vision" },
];

export const partners: Partner[] = [
  {
    name: "Cathouse",
    description: "New-Gen Homebuying\nWith the Former VP Product, Tinder",
    logoText: "C",
    slug: "partner-cathouse",
  },
  {
    name: "Twenty.com",
    description: "Open source CRM\nWith 2X YC founders & Airbnb Product",
    logoText: "20",
    slug: "partner-twenty",
  },
  {
    name: "Superbloom",
    description: "Game-tech startup\nWith ex-Glu Games leader",
    logoText: "S",
    slug: "partner-superbloom",
  },
];

export const tools: Tool[] = [
  { name: "Figma", logoText: "F", slug: "tool-figma" },
  { name: "UX Pilot", logoText: "U", slug: "tool-uxpilot" },
  { name: "Builder.io", logoText: "B", slug: "tool-builder" },
  { name: "Subframe", logoText: "S", slug: "tool-subframe" },
];

export const testimonials: Testimonial[] = [
  {
    name: "Harry Dodd-Irwin",
    title: "Designer & Developer",
    location: "London",
    flag: "\u{1F1EC}\u{1F1E7}",
    badge: "\u2713 Completed",
    initial: "H",
    avatarSlug: "avatar-harry",
    featured: true,
    quote:
      "I'm not usually a 'course' person. I prefer to dive in and learn by doing. But this was different. Yummy Labs didn't tell us what to design - they taught us how to think like product designers. My sleep schedule's wrecked, but my process is sharper and my design thinking's leveled up.",
  },
  {
    name: "Stephanie Liu",
    title: "UX Designer",
    location: "Seattle",
    flag: "\u{1F1FA}\u{1F1F8}",
    badge: "\u2713 Completed",
    initial: "S",
    avatarSlug: "avatar-stephanie",
    quote:
      "It definitely wasn't easy, but I left this sprint knowing how it truly feels to think like a designer. We went from building user flows to functional prototypes in two weeks.",
  },
  {
    name: "Manushri Dave",
    title: "UX Designer",
    location: "Savannah",
    flag: "\u{1F1FA}\u{1F1F8}",
    badge: "\u2B50 Top Sprinter",
    initial: "M",
    avatarSlug: "avatar-manushri",
    quote:
      "This sprint reminded me why I love what I do - blending design, business, code and empathy. I was recognized as a Top Sprinter with my work presented to the founders!",
  },
  {
    name: "Eszter Rakita",
    title: "UX Designer",
    location: "London",
    flag: "\u{1F1EC}\u{1F1E7}",
    badge: "\u2713 Completed",
    initial: "E",
    avatarSlug: "avatar-eszter",
    quote:
      "This sprint taught me how to design with empathy while leveraging AI to accelerate clarity, decision-making, and innovation, without losing the human touch.",
  },
  {
    name: "Sof\u00EDa Garay",
    title: "UX Designer",
    location: "Madrid",
    flag: "\u{1F1EA}\u{1F1F8}",
    badge: "\u2713 Completed",
    initial: "S",
    avatarSlug: "avatar-sofia",
    quote:
      "Over two intense weeks, we worked on a project for a stealth startup founded by the ex-CPO of Tinder. Can't wait to show you this project in my portfolio soon!",
  },
  {
    name: "Britney Whiten",
    title: "UX Designer",
    location: "Maryland",
    flag: "\u{1F1FA}\u{1F1F8}",
    badge: "\u2713 Completed",
    initial: "B",
    avatarSlug: "avatar-britney",
    quote:
      "I left this sprint sharper, more curious, and with a deeper appreciation for how AI can accelerate design. This definitely won't be my last sprint with the team.",
  },
];

export const galleryItems: GalleryItem[] = [
  { label: "Mentoring session", slug: "gallery-mentoring" },
  { label: "Designer work", slug: "gallery-work-1" },
  { label: "Sprint kickoff", slug: "gallery-kickoff" },
  { label: "Designer work", slug: "gallery-work-2" },
  { label: "Feedback session", slug: "gallery-feedback" },
  { label: "Final presentations", slug: "gallery-presentations" },
];
