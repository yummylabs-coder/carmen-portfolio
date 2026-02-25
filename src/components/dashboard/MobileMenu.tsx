"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
function MobileVersionBadge() {
  return (
    <div className="rounded-xl bg-brand-ink px-4 py-3">
      {/* Traffic lights + building indicator */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        </div>
        <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.5px] text-yellow-500">
          <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-yellow-500" />
          building
        </span>
      </div>
      {/* Terminal content */}
      <div className="font-mono text-[11px] leading-[1.6]">
        <span className="text-white/40">~/portfolio $</span>{" "}
        <span className="text-white/80">git tag</span>
        <br />
        <span className="text-emerald-400">v14</span>
        <span className="text-white/30"> &larr; current</span>
        <br />
        <span className="text-yellow-400/70">v15</span>
        <span className="text-white/30"> &larr; wip</span>
      </div>
    </div>
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-x-0 top-[60px] z-30 border-b border-sand-300 bg-white p-4 shadow-lg lg:hidden"
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
            <MobileVersionBadge />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
