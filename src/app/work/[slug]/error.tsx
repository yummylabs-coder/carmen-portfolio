"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function CaseStudyError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Clean up any stuck body styles from celebration scroll lock
    if (document.body.style.position === "fixed") {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
    }
    console.error("[case-study] Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="text-[40px]">&#128556;</div>
      <h2 className="font-brand text-20 font-bold text-brand-ink">
        Something went wrong
      </h2>
      <p className="max-w-sm text-14 leading-relaxed text-neutral-400">
        This case study had a hiccup loading. Try again or head back to browse
        all work.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded-lg border border-sand-300 bg-sand-50 px-4 py-2.5 text-13 font-medium text-neutral-500 transition-colors hover:bg-sand-100"
        >
          Try again
        </button>
        <Link
          href="/work"
          className="rounded-lg bg-brand-ink px-4 py-2.5 text-13 font-semibold text-white transition-colors hover:bg-brand-ink/90"
        >
          Back to work
        </Link>
      </div>
    </div>
  );
}
