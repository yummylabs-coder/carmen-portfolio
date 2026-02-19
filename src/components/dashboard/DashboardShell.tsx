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
    <div className="flex min-h-screen items-start">
      {/* Desktop sidebar */}
      <Sidebar className="hidden lg:flex" />

      {/* Mobile header */}
      <MobileHeader
        isMenuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((v) => !v)}
      />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Main content area */}
      <main className="flex flex-1 flex-col items-start justify-center overflow-auto pt-[60px] lg:pt-0">
        <div className="w-full px-4 py-6 md:px-6 lg:pl-4 lg:pr-8">
          <div className="mx-auto flex w-full max-w-[960px] flex-col gap-6 px-0 lg:px-7">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
