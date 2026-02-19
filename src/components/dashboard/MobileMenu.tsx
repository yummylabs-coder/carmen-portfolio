"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HomeIcon,
  WorkIcon,
  ProcessIcon,
  AboutIcon,
  ExperienceIcon,
  AcceleratorIcon,
  ContactIcon,
} from "@/components/icons/NavIcons";

const allNav = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "My Work", href: "/work", icon: WorkIcon },
  { label: "My Process", href: "/process", icon: ProcessIcon },
  { label: "About Me", href: "/about", icon: AboutIcon },
  { label: "Experience", href: "/experience", icon: ExperienceIcon },
  { label: "My Design Accelerator", href: "/accelerator", icon: AcceleratorIcon },
  { label: "Contact", href: "/contact", icon: ContactIcon },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-x-0 top-[60px] z-30 border-b border-neutral-200 bg-white p-4 shadow-lg lg:hidden"
        >
          <nav className="flex flex-col gap-1">
            {allNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex h-[48px] items-center gap-3 rounded-md px-3 text-15 transition-colors ${
                  item.href === "/"
                    ? "bg-blue-50 font-semibold text-blue-700"
                    : "font-medium text-text-secondary hover:bg-bg-hover"
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-4 rounded-lg bg-neutral-50 p-4">
            <p className="font-body text-15 font-bold text-brand-ink">
              Let&apos;s talk!
            </p>
            <p className="text-13 text-neutral-500">hello@carmen.design</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
