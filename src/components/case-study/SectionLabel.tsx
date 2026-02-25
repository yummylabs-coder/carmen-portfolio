interface SectionLabelProps {
  label: string;
  accentColor?: string;
}

/**
 * Small pill label displayed above a section title.
 * Uses a tinted version of the accent color as background.
 */
export function SectionLabel({ label, accentColor }: SectionLabelProps) {
  if (!label) return null;

  return (
    <span
      className="inline-flex w-fit rounded-md border px-[10px] py-1 text-11 font-semibold uppercase tracking-[0.05em]"
      style={{
        backgroundColor: accentColor ? `${accentColor}14` : "#EEF2FF",
        borderColor: accentColor ? `${accentColor}30` : "#C7D2FE",
        color: accentColor || "#4F46E5",
      }}
    >
      {label}
    </span>
  );
}
