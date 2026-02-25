"use client";

import { useState, useCallback } from "react";
import { ShareIcon } from "@/components/icons/NavIcons";
import { ShareModal } from "./ShareModal";

interface GlobalShareButtonProps {
  variant?: "sidebar" | "header";
  className?: string;
}

export function GlobalShareButton({
  variant = "sidebar",
  className = "",
}: GlobalShareButtonProps) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = useCallback(() => {
    setShowModal(true);
  }, []);

  if (variant === "header") {
    return (
      <>
        <button
          onClick={handleClick}
          className={`flex h-10 w-10 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-sand-100 hover:text-brand-ink ${className}`}
          aria-label="Share portfolio"
        >
          <ShareIcon size={18} />
        </button>
        <ShareModal open={showModal} onClose={() => setShowModal(false)} />
      </>
    );
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`flex items-center gap-2 rounded-xl border border-sand-300 bg-sand-100 px-4 py-3 text-13 text-neutral-500 transition-all hover:border-sand-400 hover:bg-sand-200/60 ${className}`}
        aria-label="Share portfolio"
      >
        <ShareIcon size={15} className="shrink-0" />
        <span className="flex-1 text-left leading-[1.2]">Share my portfolio</span>
      </button>
      <ShareModal open={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
