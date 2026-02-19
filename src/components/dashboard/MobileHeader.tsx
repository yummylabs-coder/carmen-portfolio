"use client";

import { LogoMark } from "@/components/icons/LogoMark";
import { MenuIcon, CloseIcon } from "@/components/icons/NavIcons";

interface MobileHeaderProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

export function MobileHeader({ isMenuOpen, onToggleMenu }: MobileHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-[60px] items-center justify-between border-b border-neutral-200 bg-white px-4 lg:hidden">
      <div className="flex items-center gap-2">
        <LogoMark size={32} />
        <span className="font-brand text-14 font-bold text-brand-ink">
          Carmen&apos;s Space
        </span>
      </div>
      <button
        onClick={onToggleMenu}
        className="flex h-10 w-10 items-center justify-center rounded-md text-text-secondary hover:bg-bg-hover"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>
    </header>
  );
}
