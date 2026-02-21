import Link from "next/link";
import type { BrandColors } from "@/lib/case-study-config";

interface BreadcrumbProps {
  caseName: string;
  brand: BrandColors;
}

export function Breadcrumb({ caseName, brand }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-14">
      <Link
        href="/work"
        className="transition-colors hover:opacity-70"
        style={{ color: brand.breadcrumbLink }}
      >
        My Work
      </Link>
      <span style={{ color: brand.breadcrumbSeparator }}>/</span>
      <span className="font-medium" style={{ color: brand.breadcrumbActive }}>
        {caseName}
      </span>
    </nav>
  );
}
