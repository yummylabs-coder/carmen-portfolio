interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center rounded-full
        bg-bg-accent px-3 py-1
        text-12 font-medium text-blue-700
        ${className}
      `}
    >
      {children}
    </span>
  );
}

Badge.displayName = "Badge";
export { Badge };
export type { BadgeProps };
