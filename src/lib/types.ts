export interface CaseStudy {
  id: string;
  title: string;
  summary: string;
  coverUrl: string;
  slug: string;
}

export interface ActivityItem {
  id: string;
  description: string;
  projectName: string;
  timestamp: string;
  icon: "update" | "publish" | "welcome";
}
