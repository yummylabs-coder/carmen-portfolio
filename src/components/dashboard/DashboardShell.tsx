"use client";

import { useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { MobileHeader } from "./MobileHeader";
import { MobileMenu } from "./MobileMenu";

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar — fixed, full height */}
      <Sidebar className="hidden lg:flex" />

      {/* Mobile header */}
      <MobileHeader
        isMenuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((v) => !v)}
      />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Main content — offset by sidebar width on desktop */}
      <main className="min-h-screen pt-[60px] lg:ml-[240px] lg:pt-0">
        <div className="w-full px-4 pb-8 pt-8 md:px-6 lg:pl-4 lg:pr-8 lg:pt-12">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-0 lg:px-7">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
