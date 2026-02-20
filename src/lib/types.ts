export interface CaseStudy {
  id: string;
  title: string;
  summary: string;
  coverUrl: string;
  slug: string;
  tags?: string[];
  isFeatured?: boolean;
  sortOrder?: number;
}

export interface ActivityItem {
  id: string;
  description: string;
  projectName: string;
  timestamp: string;
  icon: "update" | "publish" | "welcome";
}

export interface AboutPhoto {
  id: string;
  label: string;
  imageUrl: string;
  size: "normal" | "tall" | "wide";
  order: number;
}

export interface Favorite {
  id: string;
  title: string;
  category: "reading" | "watching" | "listening" | "cooking";
  subtitle: string;
  order: number;
}

export interface ExperienceRole {
  title: string;
  start: string;
  end: string;
}

export interface ExperienceEntry {
  id: string;
  slug: string;
  company: string;
  logoUrl: string;
  productImageUrl: string;
  roleSummary: string;
  dateRange: string;
  isCurrent: boolean;
  roles: ExperienceRole[];
  whatILearned: string;
  order: number;
}
