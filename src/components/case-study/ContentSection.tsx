import Image from "next/image";
import type { CaseStudySection } from "@/lib/types";

interface ContentSectionProps {
  section: CaseStudySection;
}

export function ContentSection({ section }: ContentSectionProps) {
  const imageCount = section.images.length;

  return (
    <section className="flex flex-col gap-5">
      <h2 className="font-brand text-[24px] font-bold text-brand-ink">
        {section.title}
      </h2>

      {section.description && (
        <div className="text-16 leading-[1.8] text-neutral-600 whitespace-pre-line">
          {section.description}
        </div>
      )}

      {imageCount > 0 && (
        <div
          className={`grid gap-5 ${
            imageCount === 1
              ? "grid-cols-1"
              : imageCount === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {section.images.map((img, i) => (
            <figure key={i} className="flex flex-col gap-2">
              <div
                className={`relative w-full overflow-hidden rounded-2xl ${
                  imageCount === 1 ? "aspect-[16/9]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={img}
                  alt={section.captions[i] || `${section.title} image ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-[1.02]"
                  sizes={
                    imageCount === 1
                      ? "(max-width: 900px) 100vw, 900px"
                      : imageCount === 2
                        ? "(max-width: 640px) 100vw, 450px"
                        : "(max-width: 640px) 100vw, 300px"
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
