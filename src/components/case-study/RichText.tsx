import type { RichTextSpan } from "@/lib/types";

interface RichTextProps {
  segments: RichTextSpan[];
  accentColor?: string;
  className?: string;
}

/**
 * Renders Notion rich text segments with formatting.
 * Bold words get the brand accent color for visual emphasis.
 */
export function RichText({ segments, accentColor, className }: RichTextProps) {
  if (segments.length === 0) return null;

  return (
    <p className={className}>
      {segments.map((seg, i) => {
        let content: React.ReactNode = seg.text;

        if (seg.bold) {
          content = (
            <strong
              className="font-bold"
              style={accentColor ? { color: accentColor } : undefined}
            >
              {content}
            </strong>
          );
        }

        if (seg.italic) {
          content = <em>{content}</em>;
        }

        return <span key={i}>{content}</span>;
      })}
    </p>
  );
}
