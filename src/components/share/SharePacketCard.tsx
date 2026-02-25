import Link from "next/link";
import { ImageWithShimmer } from "@/components/ui/ImageWithShimmer";

interface SharePacketCardProps {
  title: string;
  summary: string;
  coverUrl: string;
  slug: string;
  tags?: string[];
}

export function SharePacketCard({
  title,
  summary,
  coverUrl,
  slug,
  tags,
}: SharePacketCardProps) {
  return (
    <Link
      href={`/work/${slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-sand-200 bg-white transition-all hover:border-sand-300 hover:shadow-md"
    >
      {/* Cover */}
      <div className="relative h-[200px] w-full overflow-hidden">
        <ImageWithShimmer
          src={coverUrl}
          alt={`${title} cover`}
          fill
          quality={85}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5">
        <h3 className="font-brand text-17 font-bold text-brand-ink">
          {title}
        </h3>
        <p className="line-clamp-3 text-14 leading-[1.5] text-neutral-500">
          {summary}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-sand-100 px-2.5 py-0.5 text-11 font-medium text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Read CTA */}
        <div className="mt-auto flex items-center gap-1 pt-2 text-13 font-medium text-blue-600 transition-colors group-hover:text-blue-700">
          Read case study
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-0.5">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
