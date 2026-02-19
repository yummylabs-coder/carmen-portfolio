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
