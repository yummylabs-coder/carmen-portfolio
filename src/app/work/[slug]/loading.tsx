"use client";

import { useParams, usePathname } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getCaseStudyConfig } from "@/lib/case-study-config";

function Pulse({ className, light }: { className?: string; light?: boolean }) {
  return (
    <div
      className={`animate-pulse rounded-lg ${light ? "bg-white/10" : "bg-neutral-100"} ${className ?? ""}`}
    />
  );
}

export default function CaseStudyLoading() {
  const params = useParams();
  const pathname = usePathname();
  /* useParams can be empty inside loading.tsx, so fall back to the URL */
  const slug =
    typeof params?.slug === "string"
      ? params.slug
      : pathname?.split("/").filter(Boolean).pop() ?? "";
  const { brand, loadingLogo } = getCaseStudyConfig(slug);
  const bg = brand.heroBg ?? brand.bg;

  /* Determine if the hero bg is dark so we use light-coloured pulse blocks */
  const isDark = isDarkColor(brand.bg);

  return (
    <DashboardShell>
      <div className="flex flex-col gap-14">
        {/* Hero skeleton — branded splash when the study has a loading logo */}
        <div
          className={`full-bleed-panel full-bleed-hero flex flex-col gap-4 px-4 pb-10 pt-[96px] md:px-6 lg:min-h-[calc(100vh-36px)] lg:px-[44px] lg:pt-10 ${
            loadingLogo ? "items-center justify-center" : "justify-center"
          }`}
          style={{ background: bg }}
        >
          {loadingLogo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={loadingLogo}
              alt=""
              className="w-[180px] max-w-[50vw] animate-pulse object-contain"
            />
          ) : (
            <>
              <Pulse className="h-4 w-32" light={isDark} />
              <div className="flex gap-2">
                <Pulse className="h-7 w-24 rounded-full" light={isDark} />
                <Pulse className="h-7 w-20 rounded-full" light={isDark} />
              </div>
              <Pulse className="h-12 w-[70%] max-w-[600px]" light={isDark} />
              <Pulse className="h-5 w-[50%] max-w-[400px]" light={isDark} />
              <Pulse className="h-5 w-[55%] max-w-[450px]" light={isDark} />
              <Pulse className="h-4 w-32" light={isDark} />
              <div className="flex gap-2">
                <Pulse className="h-8 w-24 rounded-full" light={isDark} />
                <Pulse className="h-8 w-20 rounded-full" light={isDark} />
                <Pulse className="h-8 w-28 rounded-full" light={isDark} />
              </div>
              <Pulse className="mt-2 h-12 w-40 rounded-lg" light={isDark} />
            </>
          )}
        </div>

        {/* Content skeleton */}
        <div className="flex flex-col gap-6">
          <Pulse className="h-7 w-32" />
          <Pulse className="h-4 w-[90%] max-w-[700px]" />
          <Pulse className="h-4 w-[80%] max-w-[600px]" />
          <Pulse className="h-4 w-[60%] max-w-[500px]" />
        </div>
      </div>
    </DashboardShell>
  );
}

/** Quick luminance check — returns true when the hex colour is dark */
function isDarkColor(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}
