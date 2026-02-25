"use client";

import { useState, useEffect } from "react";
import { CurateIcon } from "@/components/icons/NavIcons";

export function CurateToggle() {
  const [active, setActive] = useState(false);

  // Listen for curate-end event (sent by WorkGrid when exiting curation)
  useEffect(() => {
    const handleEnd = () => setActive(false);
    window.addEventListener("curate-end", handleEnd);
    return () => window.removeEventListener("curate-end", handleEnd);
  }, []);

  const handleClick = () => {
    if (active) {
      window.dispatchEvent(new Event("curate-cancel"));
      setActive(false);
    } else {
      window.dispatchEvent(new Event("curate-start"));
      setActive(true);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-13 font-medium transition-colors sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-12 ${
        active
          ? "border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
          : "border-sand-300 bg-sand-50 text-neutral-500 hover:bg-sand-100 hover:text-neutral-600"
      }`}
    >
      {/* Larger icon on mobile, smaller on desktop */}
      <span className="block sm:hidden"><CurateIcon size={18} /></span>
      <span className="hidden sm:block"><CurateIcon size={14} /></span>
      <span className="text-left leading-tight">
        {active ? "Cancel curation" : "Curate a share packet"}
      </span>
    </button>
  );
}
