import Link from "next/link";

interface BreadcrumbProps {
  caseName: string;
}

export function Breadcrumb({ caseName }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-14">
      <Link href="/work" className="text-neutral-500 hover:text-blue-500 transition-colors">
        My Work
      </Link>
      <span className="text-neutral-300">/</span>
      <span className="font-medium text-brand-ink">{caseName}</span>
    </nav>
  );
}
