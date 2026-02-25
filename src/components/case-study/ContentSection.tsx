"use client";

import type { CaseStudySection } from "@/lib/types";
import { ScrollReveal } from "@/components/dashboard/ScrollReveal";
import { ImageWithShimmer } from "@/components/ui/ImageWithShimmer";
import { RichText } from "./RichText";
import { SectionLabel } from "./SectionLabel";
import { PhoneFrame } from "./PhoneFrame";
import { LaptopFrame } from "./LaptopFrame";
import { DesktopFrame } from "./DesktopFrame";

interface ContentSectionProps {
  section: CaseStudySection;
  accentColor?: string;
}

/* ── helpers ──────────────────────────────────────────────────────── */

function isVideo(url: string): boolean {
  return /\.(mp4|webm|mov)(\?|$)/i.test(url);
}

function isSvg(url: string): boolean {
  return /\.svg(\?|$)/i.test(url);
}

function MediaItem({
  src,
  alt,
  sizes,
}: {
  src: string;
  alt: string;
  sizes: string;
}) {
  if (isVideo(src)) {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover"
      />
    );
  }

  if (isSvg(src)) {
    /* eslint-disable-next-line @next/next/no-img-element */
    return (
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <ImageWithShimmer
      src={src}
      alt={alt}
      fill
      className="object-cover transition-transform duration-300 hover:scale-[1.02]"
      sizes={sizes}
    />
  );
}

/* ── layout-aware media renderer ─────────────────────────────────── */

function SectionMedia({
  section,
}: {
  section: CaseStudySection;
}) {
  const { images, captions, layout, title } = section;
  if (images.length === 0) return null;

  /* Phone pair — two iPhones side by side */
  if (layout === "phone-pair") {
    const pair = images.slice(0, 2);
    return (
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
        {pair.map((src, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <PhoneFrame src={src} alt={captions[i] || `${title} screen ${i + 1}`} />
            {captions[i] && (
              <p className="text-center text-13 italic text-neutral-500">
                {captions[i]}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  }

  /* Phone single — one centered iPhone */
  if (layout === "phone-single") {
    return (
      <div className="flex flex-col items-center gap-2">
        <PhoneFrame src={images[0]} alt={captions[0] || `${title} screen`} />
        {captions[0] && (
          <p className="text-center text-13 italic text-neutral-500">
            {captions[0]}
          </p>
        )}
      </div>
    );
  }

  /* Laptop — MacBook frame */
  if (layout === "laptop") {
    return (
      <div className="flex flex-col items-center gap-2">
        <LaptopFrame src={images[0]} alt={captions[0] || `${title} screenshot`} />
        {captions[0] && (
          <p className="text-center text-13 italic text-neutral-500">
            {captions[0]}
          </p>
        )}
      </div>
    );
  }

  /* Desktop — iMac frame */
  if (layout === "desktop") {
    return (
      <div className="flex flex-col items-center gap-2">
        <DesktopFrame src={images[0]} alt={captions[0] || `${title} screenshot`} />
        {captions[0] && (
          <p className="text-center text-13 italic text-neutral-500">
            {captions[0]}
          </p>
        )}
      </div>
    );
  }

  /* Full-bleed — edge-to-edge image, no rounded corners */
  if (layout === "full-bleed") {
    return (
      <div className="-mx-5 sm:-mx-8 md:-mx-12">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <MediaItem
            src={images[0]}
            alt={captions[0] || `${title} image`}
            sizes="100vw"
          />
        </div>
        {captions[0] && (
          <p className="mt-2 px-5 text-center text-13 italic text-neutral-500 sm:px-8 md:px-12">
            {captions[0]}
          </p>
        )}
      </div>
    );
  }

  /* Side-by-side — two images in equal columns */
  if (layout === "side-by-side") {
    const pair = images.slice(0, 2);
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {pair.map((src, i) => (
          <figure key={i} className="flex flex-col gap-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <MediaItem
                src={src}
                alt={captions[i] || `${title} image ${i + 1}`}
                sizes="(max-width: 640px) 100vw, 600px"
              />
            </div>
            {captions[i] && (
              <figcaption className="text-center text-13 italic text-neutral-500">
                {captions[i]}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    );
  }

  /* Default — single image at natural ratio, multi-image in grid */
  const mediaCount = images.length;

  /* Single image — show at natural aspect ratio (no cropping) */
  if (mediaCount === 1) {
    const src = images[0];
    const alt = captions[0] || `${title} image 1`;

    return (
      <figure className="flex flex-col gap-2">
        <div className="w-full overflow-hidden rounded-2xl">
          {isVideo(src) ? (
            <video
              src={src}
              autoPlay
              loop
              muted
              playsInline
              className="h-auto w-full"
            />
          ) : isSvg(src) ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={src} alt={alt} className="h-auto w-full" />
          ) : (
            <ImageWithShimmer
              src={src}
              alt={alt}
              width={2000}
              height={1200}
              className="h-auto w-full"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          )}
        </div>
        {captions[0] && (
          <figcaption className="text-center text-13 italic text-neutral-500">
            {captions[0]}
          </figcaption>
        )}
      </figure>
    );
  }

  /* Multi-image grid */
  return (
    <div
      className={`grid gap-5 ${
        mediaCount === 2
          ? "grid-cols-1 sm:grid-cols-2"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      }`}
    >
      {images.map((src, i) => (
        <figure key={i} className="flex flex-col gap-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <MediaItem
              src={src}
              alt={captions[i] || `${title} image ${i + 1}`}
              sizes={
                mediaCount === 2
                  ? "(max-width: 640px) 100vw, 600px"
                  : "(max-width: 640px) 100vw, 400px"
              }
            />
          </div>
          {captions[i] && (
            <figcaption className="text-center text-13 italic text-neutral-500">
              {captions[i]}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

/* ── main component ──────────────────────────────────────────────── */

export function ContentSection({ section, accentColor }: ContentSectionProps) {
  return (
    <ScrollReveal>
      <section className="flex flex-col gap-5">
        {/* Optional pill label */}
        {section.label && (
          <SectionLabel label={section.label} accentColor={accentColor} />
        )}

        {/* Title */}
        <h2 className="font-brand text-[24px] font-bold text-brand-ink">
          {section.title}
        </h2>

        {/* Optional rich intro text (bold words in accent color) */}
        {section.introText && section.introText.length > 0 && (
          <RichText
            segments={section.introText}
            accentColor={accentColor}
            className="max-w-[756px] text-[20px] leading-[1.65] text-neutral-700 md:text-[22px]"
          />
        )}

        {/* Plain description */}
        {section.description && (
          <div className="max-w-[756px] whitespace-pre-line text-16 leading-[1.8] text-neutral-600">
            {section.description}
          </div>
        )}

        {/* Layout-aware media */}
        <SectionMedia section={section} />
      </section>
    </ScrollReveal>
  );
}
