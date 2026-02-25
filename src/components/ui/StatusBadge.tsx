interface StatusBadgeProps {
  label?: string;
  className?: string;
}

function StatusBadge({
  label = "Join my design community",
  className = "",
}: StatusBadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-2
        rounded-full border border-border-default
        bg-bg-surface px-3 py-1
        text-13 font-medium text-text-secondary
        ${className}
      `}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
      </span>
      {label}
    </span>
  );
}

StatusBadge.displayName = "StatusBadge";
export { StatusBadge };
export type { StatusBadgeProps };
