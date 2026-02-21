import Image from "next/image";
import type { CaseStudyDetail } from "@/lib/types";

interface HeroSectionProps {
  study: CaseStudyDetail;
  readTime: string;
}

export function HeroSection({ study, readTime }: HeroSectionProps) {
  return (
    <section className="flex flex-col gap-6">
      {/* Partner + Platform badges */}
      <div className="flex flex-wrap items-center gap-3">
        {study.partner && (
          <span className="text-12 font-semibold uppercase tracking-[1px] text-neutral-500">
            {study.partner}
          </span>
        )}
        {study.platform.map((p) => (
          <span
            key={p}
            className="rounded-full bg-brand-ink px-3 py-1 text-11 font-semibold uppercase tracking-[0.5px] text-white"
          >
            {p}
          </span>
        ))}
      </div>

      {/* Title (Headline from Notion) */}
      <h1 className="font-brand text-42 font-extrabold text-brand-ink mobile:text-[32px]">
        {study.headline || study.title}
      </h1>

      {/* Summary */}
      {study.summary && (
        <p className="text-16 leading-[1.8] text-neutral-600">
          {study.summary}
        </p>
      )}

      {/* Read time */}
      <p className="text-13 italic text-neutral-500">{readTime}</p>

      {/* Services tags */}
      {study.services.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {study.services.map((s) => (
            <span
              key={s}
              className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-12 text-neutral-600"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      {/* CTA button */}
      {study.websiteUrl ? (
        <a
          href={study.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-14 font-semibold text-white transition-colors hover:bg-blue-600"
        >
          Go to website
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>
      ) : (
        <span className="inline-flex w-fit items-center gap-2 rounded-xl bg-neutral-200 px-5 py-3 text-14 font-semibold text-neutral-500">
          Under development
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        </span>
      )}

      {/* Hero images */}
      {study.heroImages.length > 0 && (
        <div className="flex flex-col gap-5">
          {/* First image full-width */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
            <Image
              src={study.heroImages[0]}
              alt={`${study.title} hero`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 900px) 100vw, 900px"
            />
          </div>
          {/* Remaining images in 2-col grid */}
          {study.heroImages.length > 1 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {study.heroImages.slice(1).map((img, i) => (
                <div key={i} className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={img}
                    alt={`${study.title} hero ${i + 2}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 450px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
