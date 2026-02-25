export interface CaseStudy {
  id: string;
  title: string;
  summary: string;
  coverUrl: string;
  slug: string;
  tags?: string[];
  isFeatured?: boolean;
  isComingSoon?: boolean;
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
  caption?: string;
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

export interface Track {
  id: string;
  title: string;
  artist: string;
  coverUrl?: string;
  previewUrl?: string;
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

export interface CaseStudyDetail {
  id: string;
  title: string;
  slug: string;
  partner: string;
  headline: string;
  summary: string;
  overview: string;
  challenge: string;
  coverUrl: string;
  heroImages: string[];
  mainHeroImage: string;
  roleDescription: string;
  services: string[];
  platform: string[];
  industry: string;
  projectType: string;
  websiteUrl: string;
  outcomes: { metric: string; description: string }[];
  order: number;
  status: string;
}

/** A single segment of Notion rich text with formatting annotations */
export interface RichTextSpan {
  text: string;
  bold: boolean;
  italic: boolean;
}

/** Layout variants for content sections */
export type SectionLayout =
  | "default"
  | "phone-pair"
  | "laptop"
  | "desktop"
  | "full-bleed"
  | "phone-single"
  | "side-by-side";

export interface CaseStudySection {
  id: string;
  title: string;
  label: string;
  introText: RichTextSpan[];
  description: string;
  images: string[];
  captions: string[];
  layout: SectionLayout;
  order: number;
}

export interface TimelineStep {
  label: string;
  title: string;
  description: string;
  isHighlight?: boolean;
}

export interface Experiment {
  id: string;
  name: string;
  description: string;
  type: string;
  category: "experiment" | "toolkit";
  status: "live" | "progress" | "archived";
  statusLabel: string;
  url?: string;
  coverUrl?: string;
  galleryUrls?: string[];
  galleryCaptions?: string[];
  videoUrl?: string;
  order: number;
}

export interface ExperimentPreview {
  experimentName: string;
  imageUrls: string[];
  captions: string[];
  videoUrl?: string;
}

/** Maps experiment name (lowercase) → preview data */
export type ExperimentPreviewMap = Record<string, ExperimentPreview>;

export interface CaseStudyPreview {
  caseStudyTitle: string;
  imageUrls: string[];
  captions: string[];
  videoUrl?: string;
}

/** Maps case study title (lowercase) → preview data */
export type CaseStudyPreviewMap = Record<string, CaseStudyPreview>;

export interface YummyAsset {
  id: string;
  name: string;
  slug: string;
  category: "Branding" | "Partner Logo" | "Tool Logo" | "Designer Avatar" | "Gallery";
  imageUrl: string;
  order: number;
}

export interface YummyAssetsMap {
  branding: Record<string, string>;
  partnerLogos: Record<string, string>;
  toolLogos: Record<string, string>;
  avatars: Record<string, string>;
  gallery: { slug: string; imageUrl: string; name: string }[];
}

/** Maps process phase key to its image URL */
export type ProcessPhaseImages = Record<string, string>;

export interface TravelDestination {
  id: string;
  name: string;
  code: string;
  stampUrl?: string;
  seat: string;
  departure: string;
  highlight?: string;
  order: number;
}

export interface RadarTopic {
  id: string;
  topic: string;
  oneLiner: string;
  expandedCopy?: string;
  imageUrl?: string;
  interest: number;
  color: string;
  order: number;
}
