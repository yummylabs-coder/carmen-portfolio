export interface Role {
  title: string;
  start: string;
  end: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  logoEmoji: string;
  roleSummary: string;
  dateRange: string;
  isCurrent: boolean;
  roles: Role[];
  whatILearned: string;
}

export const experiences: ExperienceEntry[] = [
  {
    id: "yummy",
    company: "Yummy Design Labs",
    logoEmoji: "🧪",
    roleSummary: "Co-Founder & Product Sprint Leader",
    dateRange: "2025 - Now",
    isCurrent: true,
    roles: [
      { title: "Product Sprint Leader", start: "Sep 2025", end: "Present" },
      { title: "Co-Founder, Product Lead", start: "Mar 2025", end: "Present" },
    ],
    whatILearned:
      "Running my own design studio, working with startups through focused sprints. Also built Yummy Labs - an accelerator helping junior-mid level designers get hands-on experience with tech and AI startups.",
  },
  {
    id: "learnxyz",
    company: "Learn.xyz",
    logoEmoji: "📚",
    roleSummary: "Director, Product Design - Senior Product Designer",
    dateRange: "2022 - 2025",
    isCurrent: false,
    roles: [
      { title: "Director, Product Design", start: "Jul 2023", end: "Mar 2025" },
      { title: "Senior Product Designer", start: "Jan 2022", end: "Jul 2023" },
    ],
    whatILearned:
      "Founding designer of an AI learning startup (B2C + B2B). Built everything from the ground up - product vision, design system, user research, and shipped features across web and mobile.",
  },
  {
    id: "cleanchoice",
    company: "CleanChoice Energy",
    logoEmoji: "⚡",
    roleSummary: "Product Designer",
    dateRange: "2019 - 2022",
    isCurrent: false,
    roles: [
      { title: "Product Designer", start: "Dec 2019", end: "Jan 2022" },
    ],
    whatILearned:
      "Worked with a large product and tech team, navigating the complexities of environmental regulations and clean energy policy. Learned to design for compliance while keeping the user experience simple.",
  },
  {
    id: "vox",
    company: "VOX Global",
    logoEmoji: "🌐",
    roleSummary: "UX Designer - Graphic Designer - Intern",
    dateRange: "2017 - 2019",
    isCurrent: false,
    roles: [
      { title: "User Experience Designer", start: "Jul 2019", end: "Nov 2019" },
      { title: "Graphic Designer", start: "Jun 2018", end: "Apr 2019" },
      { title: "Associate Designer", start: "Aug 2017", end: "Jun 2018" },
      { title: "Digital Fellow & Intern", start: "Jan 2017", end: "Jul 2017" },
    ],
    whatILearned:
      "Where it all started. Grew from intern to UX designer over 2+ years. By the end, I was leading major UX projects for clients like AT&T and Nissan.",
  },
];
