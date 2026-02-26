"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * If `?print=true` is in the URL, auto-triggers the browser print dialog
 * after a short delay (lets fonts and layout settle first).
 */
export function ResumePrintTrigger() {
  const searchParams = useSearchParams();
  const isPrint = searchParams.get("print") === "true";

  useEffect(() => {
    if (!isPrint) return;
    const timer = setTimeout(() => {
      window.print();
    }, 600);
    return () => clearTimeout(timer);
  }, [isPrint]);

  return null;
}
