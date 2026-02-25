import Link from "next/link";
import { AnimatedLogoMark } from "@/components/icons/AnimatedLogoMark";

interface SharePacketHeaderProps {
  companyName?: string;
  projectCount: number;
  note?: string;
}

export function SharePacketHeader({ companyName, projectCount, note }: SharePacketHeaderProps) {
  return (
    <header className="border-b border-sand-200 bg-white">
      <div className="mx-auto flex max-w-[1000px] items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-70">
          <AnimatedLogoMark size={30} />
          <div className="flex flex-col">
            <span className="font-brand text-13 font-bold text-brand-ink">Carmen Rincon</span>
            <span className="text-11 text-neutral-400">Product Design &amp; Strategy</span>
          </div>
        </Link>
        <Link
          href="/work"
          className="hidden items-center gap-1.5 rounded-lg border border-sand-300 bg-sand-50 px-3.5 py-2 text-12 font-medium text-neutral-500 transition-colors hover:bg-sand-100 hover:text-brand-ink sm:flex"
        >
          Explore full portfolio
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <div className="mx-auto max-w-[1000px] px-5 pb-6 pt-2 sm:px-8">
        <h1 className="font-brand text-22 font-bold text-brand-ink sm:text-[28px]">
          {companyName
            ? `Curated for ${companyName}`
            : "Hey! Take a look at these"}
        </h1>
        <p className="mt-1 text-14 text-neutral-400">
          {companyName
            ? `Carmen curated ${projectCount} case ${projectCount === 1 ? "study" : "studies"} for ${companyName}`
            : `${projectCount} hand-picked case ${projectCount === 1 ? "study" : "studies"} from Carmen\u2019s portfolio`}
        </p>

        {note && (
          <div className="mt-4 rounded-xl border border-sand-200 bg-sand-50 px-4 py-3">
            <p className="text-11 font-medium uppercase tracking-wide text-neutral-400">A message for you</p>
            <p className="mt-1 text-14 leading-relaxed text-neutral-600">{decodeURIComponent(note)}</p>
          </div>
        )}
      </div>
    </header>
  );
}
