import Image from "next/image";
import type { CaseStudySection } from "@/lib/types";

interface ContentSectionProps {
  section: CaseStudySection;
}

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
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover transition-transform duration-300 hover:scale-[1.02]"
      sizes={sizes}
    />
  );
}

export function ContentSection({ section }: ContentSectionProps) {
  const mediaCount = section.images.length;

  return (
    <section className="flex flex-col gap-5">
      <h2 className="font-brand text-[24px] font-bold text-brand-ink">
        {section.title}
      </h2>

      {section.description && (
        <div className="whitespace-pre-line text-16 leading-[1.8] text-neutral-600">
          {section.description}
        </div>
      )}

      {mediaCount > 0 && (
        <div
          className={`grid gap-5 ${
            mediaCount === 1
              ? "grid-cols-1"
              : mediaCount === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {section.images.map((src, i) => (
            <figure key={i} className="flex flex-col gap-2">
              <div
                className={`relative w-full overflow-hidden rounded-2xl ${
                  mediaCount === 1 ? "aspect-[16/9]" : "aspect-[4/3]"
                }`}
              >
                <MediaItem
                  src={src}
                  alt={section.captions[i] || `${section.title} image ${i + 1}`}
                  sizes={
                    mediaCount === 1
                      ? "(max-width: 1200px) 100vw, 1200px"
                      : mediaCount === 2
                        ? "(max-width: 640px) 100vw, 600px"
                        : "(max-width: 640px) 100vw, 400px"
                  }
                />
              </div>
              {section.captions[i] && (
                <figcaption className="text-center text-13 italic text-neutral-500">
                  {section.captions[i]}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
