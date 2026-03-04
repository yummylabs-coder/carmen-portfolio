"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { VersionDetailsModal } from "./VersionDetailsModal";
import { AnimatedLogoMark } from "@/components/icons/AnimatedLogoMark";
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
import { GlobalShareButton } from "@/components/share/GlobalShareButton";

const primaryNav = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "My Work", href: "/work", icon: WorkIcon },
  { label: "My Process", href: "/process", icon: ProcessIcon },
  { label: "About Me", href: "/about", icon: AboutIcon },
  { label: "Experience", href: "/experience", icon: ExperienceIcon },
];

const otherNav = [
  { label: "My Design Accelerator", href: "/accelerator", icon: AcceleratorIcon },
  { label: "The Lab", href: "/experiments", icon: ExperimentsIcon },
  { label: "Contact", href: "/contact", icon: ContactIcon },
];

interface NavLinkProps {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  active?: boolean;
}

function NavLink({ href, label, icon: Icon, active }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`flex h-[42px] items-center gap-1 rounded-md px-2 py-[7px] text-13 transition-colors ${
        active
          ? "bg-blue-50 font-semibold text-blue-700"
          : "font-medium text-[#5C4E46] hover:bg-sand-100"
      }`}
    >
      <Icon size={16} />
      <span>{label}</span>
    </Link>
  );
}

interface SidebarProps {
  className?: string;
}

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

/* ─── Portfolio version badge (lab/terminal style) ─── */
function VersionBadge({ onViewDetails }: { onViewDetails: () => void }) {
  return (
    <div className="rounded-xl border border-sand-300 bg-sand-100 px-4 py-3">
      {/* Traffic lights */}
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        </div>
        <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.5px] text-yellow-700">
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
        <span className="text-neutral-600"> ← deployed</span>
        <br />
        <span className="text-yellow-600">v15</span>
        <span className="text-neutral-600"> ← in progress</span>
        <br />
        <span className="ml-[2ch] rounded bg-yellow-100 px-1 text-[10px] text-yellow-700">improving case studies</span>
        <br />
        <span className="ml-[2ch] rounded bg-yellow-100 px-1 text-[10px] text-yellow-700">optimizing loading times</span>
      </div>
      {/* View details link */}
      <button
        onClick={onViewDetails}
        className="mt-2.5 flex items-center gap-1 font-mono text-[11px] text-neutral-600 transition-colors hover:text-brand-ink/60"
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

export function Sidebar({ className = "" }: SidebarProps) {
  const pathname = usePathname();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
    <VersionDetailsModal isOpen={showDetails} onClose={() => setShowDetails(false)} />
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen w-[240px] flex-col border-r border-[#f3ede7] bg-[#fcfaf8] pb-[3px] ${className}`}
      style={{ borderRadius: "0 16px 16px 0" }}
    >
      {/* Header */}
      <div className="border-b border-[#f3ede7] px-4 pb-[17px] pt-4">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <AnimatedLogoMark size={38} />
          <div className="flex flex-col">
            <span className="font-brand text-14 font-bold text-brand-ink">
              Carmen&apos;s Space
            </span>
            <span className="text-[12px] text-[#5C4E46]">
              Product Design &amp; Strategy
            </span>
          </div>
        </Link>
      </div>

      {/* Primary nav */}
      <nav className="flex flex-1 flex-col overflow-y-auto p-2">
        <div className="flex flex-col">
          {primaryNav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={isActive(pathname, item.href)}
            />
          ))}
        </div>

        {/* Other section */}
        <div className="mt-4">
          <span className="mb-1 block px-2 font-body text-11 font-semibold uppercase tracking-[0.66px] text-brand-ink">
            Other
          </span>
          {otherNav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={isActive(pathname, item.href)}
            />
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Footer CTAs */}
        <div className="flex flex-col gap-2">
          {/* Portfolio version badge */}
          <VersionBadge onViewDetails={() => setShowDetails(true)} />

          {/* Share portfolio */}
          <GlobalShareButton variant="sidebar" />
        </div>
      </nav>
    </aside>
    </>
  );
}
