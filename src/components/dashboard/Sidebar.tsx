"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/icons/LogoMark";
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

const primaryNav = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "My Work", href: "/work", icon: WorkIcon },
  { label: "My Process", href: "/process", icon: ProcessIcon },
  { label: "About Me", href: "/about", icon: AboutIcon },
  { label: "Experience", href: "/experience", icon: ExperienceIcon },
];

const otherNav = [
  { label: "My Design Accelerator", href: "/accelerator", icon: AcceleratorIcon },
  { label: "My Experiments", href: "/experiments", icon: ExperimentsIcon },
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
          : "font-medium text-text-tertiary hover:bg-bg-hover"
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

export function Sidebar({ className = "" }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen w-[240px] flex-col border-r border-neutral-200 bg-white pb-[3px] ${className}`}
      style={{ borderRadius: "0 16px 16px 0" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-neutral-100 px-4 pb-[17px] pt-4">
        <LogoMark size={38} />
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
              active={pathname === item.href}
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
              active={pathname === item.href}
            />
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Footer */}
        <div className="flex flex-col gap-3">
          {/* Let's talk card — links to email */}
          <a
            href="mailto:carmenrincon92@gmail.com"
            className="block rounded-xl bg-neutral-50 p-4 transition-colors hover:bg-neutral-100"
          >
            <p className="font-body text-16 font-bold text-brand-ink">
              Let&apos;s talk!
            </p>
            <p className="text-13 text-neutral-500">
              carmenrincon92@gmail.com
            </p>
          </a>

          {/* Status bar — links to yummy-labs.com */}
          <a
            href="https://yummy-labs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md bg-neutral-50 px-4 py-3 transition-colors hover:bg-neutral-100"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400 shadow-[0_0_0_3px_var(--green-200)]" />
            </span>
            <span className="flex-1 text-13 text-neutral-500">
              Building Yummy Labs
            </span>
            <ArrowRightIcon size={16} className="text-neutral-400" />
          </a>
        </div>
      </nav>
    </aside>
  );
}
