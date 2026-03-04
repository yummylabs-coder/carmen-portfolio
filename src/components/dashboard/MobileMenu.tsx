"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { VersionDetailsModal } from "./VersionDetailsModal";
import {
  HomeIcon,
  WorkIcon,
  ProcessIcon,
  AboutIcon,
  ExperienceIcon,
  AcceleratorIcon,
  ExperimentsIcon,
  ContactIcon,
} from "@/components/icons/NavIcons";

const allNav = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "My Work", href: "/work", icon: WorkIcon },
  { label: "My Process", href: "/process", icon: ProcessIcon },
  { label: "About Me", href: "/about", icon: AboutIcon },
  { label: "Experience", href: "/experience", icon: ExperienceIcon },
  { label: "My Design Accelerator", href: "/accelerator", icon: AcceleratorIcon },
  { label: "The Lab", href: "/experiments", icon: ExperimentsIcon },
  { label: "Contact", href: "/contact", icon: ContactIcon },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

/* ─── Compact version badge (terminal style) ─── */
function MobileVersionBadge({ onViewDetails }: { onViewDetails: () => void }) {
  return (
    <div className="rounded-xl border border-sand-300 bg-sand-100 px-4 py-3">
      {/* Traffic lights + building indicator */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        </div>
        <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.5px] text-yellow-600">
          <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-yellow-600" />
          building
        </span>
      </div>
      {/* Terminal content */}
      <div className="font-mono text-[11px] leading-[1.6]">
        <span className="text-neutral-600">~/portfolio $</span>{" "}
        <span className="text-brand-ink/70">git tag</span>
        <br />
        <span className="text-emerald-600">v14</span>
        <span className="text-neutral-600"> &larr; deployed</span>
        <br />
        <span className="text-yellow-600">v15</span>
        <span className="text-neutral-600"> &larr; in progress</span>
        <br />
        <span className="ml-[2ch] rounded bg-yellow-100 px-1 text-[10px] text-yellow-700">improving case studies</span>
      </div>
      {/* View details link */}
      <button
        onClick={onViewDetails}
        className="mt-2.5 flex items-center gap-1 font-mono text-[10px] text-neutral-600 transition-colors hover:text-brand-ink/60"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        view details
      </button>
    </div>
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [showDetails, setShowDetails] = useState(false);

  // Lock background scroll when menu is open (iOS-compatible)
  const savedScrollY = useRef(0);
  useEffect(() => {
    if (isOpen) {
      savedScrollY.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${savedScrollY.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, savedScrollY.current);
    }
    return () => {
      if (document.body.style.position === "fixed") {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        window.scrollTo(0, savedScrollY.current);
      }
    };
  }, [isOpen]);

  return (
    <>
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark overlay behind menu */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[60px] z-[36] bg-brand-ink/60 backdrop-blur-[2px] lg:hidden"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-0 top-[60px] z-[38] max-h-[calc(100dvh-60px)] overflow-y-auto border-b border-sand-300 bg-white p-4 shadow-lg lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {allNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex h-[48px] items-center gap-3 rounded-md px-3 text-15 transition-colors ${
                    isActive(pathname, item.href)
                      ? "bg-blue-50 font-semibold text-blue-700"
                      : "font-medium text-text-secondary hover:bg-sand-100"
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Version badge */}
            <div className="mt-4">
              <MobileVersionBadge
                onViewDetails={() => {
                  onClose();
                  // Small delay so menu scroll-lock cleanup runs first
                  setTimeout(() => setShowDetails(true), 250);
                }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

    <VersionDetailsModal isOpen={showDetails} onClose={() => setShowDetails(false)} />
  </>
  );
}
