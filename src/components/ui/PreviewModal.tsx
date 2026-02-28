"use client";

import { useEffect } from "react";
import { StoryViewer } from "@/components/ui/StoryViewer";
import type { StorySlide } from "@/components/ui/StoryViewer";

/* ─── Types (kept for consumer compatibility) ─── */
export interface PreviewModalData {
  title: string;
  summary?: string;
  coverUrl?: string;
  imageUrls?: string[];
  captions?: string[];
  videoUrl?: string;
  tags?: string[];
  fit?: "cover" | "contain";
}

/* ─── Convert PreviewModalData → StorySlide[] ─── */
function toStorySlides(data: PreviewModalData): StorySlide[] {
  const slides: StorySlide[] = [];
  const captions = data.captions ?? [];

  // Video first
  if (data.videoUrl) {
    slides.push({
      id: "video-0",
      videoUrl: data.videoUrl,
      label: data.title,
      caption: "Video walkthrough",
    });
  }

  // Preview images
  if (data.imageUrls && data.imageUrls.length > 0) {
    data.imageUrls.forEach((url, i) => {
      slides.push({
        id: `img-${i}`,
        imageUrl: url,
        label: captions[i] || data.title,
        caption: captions[i],
      });
    });
  }

  // Fall back to cover if no other media
  if (slides.length === 0 && data.coverUrl) {
    slides.push({
      id: "cover",
      imageUrl: data.coverUrl,
      label: data.title,
    });
  }

  return slides;
}

/* ─── Modal Component (now wraps StoryViewer) ─── */
export function PreviewModal({
  data,
  onClose,
}: {
  data: PreviewModalData;
  onClose: () => void;
}) {
  const slides = toStorySlides(data);

  /* Safety: if no media at all, close via useEffect (never during render) */
  useEffect(() => {
    if (slides.length === 0) {
      onClose();
    }
  }, [slides.length, onClose]);

  if (slides.length === 0) {
    return null;
  }

  return (
    <StoryViewer
      slides={slides}
      onClose={onClose}
      aspect="landscape"
      autoAdvance={false}
      fit={data.fit}
    />
  );
}
