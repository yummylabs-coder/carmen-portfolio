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
  ArrowRightIcon,
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

/* ─── Discord logo ─── */
function DiscordIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
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
          {/* Let's talk card */}
          <a
            href="mailto:carmenrincon92@gmail.com"
            className="block rounded-xl border border-sand-300 bg-sand-100 p-4 transition-all hover:border-sand-400 hover:bg-sand-200/60"
          >
            <p className="font-body text-16 font-bold text-brand-ink">
              Let&apos;s talk!
            </p>
            <p className="text-13 text-neutral-500">
              carmenrincon92@gmail.com
            </p>
          </a>

          {/* Discord community link */}
          <a
            href="https://discord.gg/7GnFfQuZ3m"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start rounded-xl border border-sand-300 bg-sand-100 px-4 py-3 transition-all hover:border-sand-400 hover:bg-sand-200/60"
            style={{ gap: "8px" }}
          >
            <DiscordIcon size={16} className="mt-[2px] shrink-0 text-brand-ink" />
            <span className="flex-1 text-13 leading-[1.2] text-neutral-500">
              Join my design community
            </span>
            <ArrowRightIcon size={16} className="mt-[2px] shrink-0 text-neutral-400" />
          </a>

          {/* Share portfolio */}
          <GlobalShareButton variant="sidebar" />
        </div>
      </nav>
    </aside>
  );
}
