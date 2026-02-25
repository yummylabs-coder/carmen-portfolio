"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
          : "font-medium text-text-tertiary hover:bg-sand-100"
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
function VersionBadge() {
  return (
    <div className="rounded-xl border border-sand-300 bg-brand-ink px-4 py-3">
      {/* Traffic lights */}
      <div className="mb-2.5 flex items-center justify-between">
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
        <span className="text-white/30"> ← current</span>
        <br />
        <span className="text-yellow-400/70">v15</span>
        <span className="text-white/30"> ← wip</span>
      </div>
    </div>
  );
}

export function Sidebar({ className = "" }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen w-[240px] flex-col border-r border-sand-300 bg-white pb-[3px] ${className}`}
      style={{ borderRadius: "0 16px 16px 0" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-neutral-100 px-4 pb-[17px] pt-4">
        <AnimatedLogoMark size={38} />
        <div className="flex flex-col">
          <span className="font-brand text-14 font-bold text-brand-ink">
            Carmen&apos;s Space
          </span>
          <span className="text-11 text-neutral-400">
            Product Design &amp; Strategy
          </span>
        </div>
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
          <VersionBadge />

          {/* Share portfolio */}
          <GlobalShareButton variant="sidebar" />
        </div>
      </nav>
    </aside>
  );
}
