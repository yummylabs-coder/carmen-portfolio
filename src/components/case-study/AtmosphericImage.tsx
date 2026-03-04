import Image from "next/image";

interface AtmosphericImageProps {
  src: string;
  alt: string;
  /** Hero bg color for the gradient overlay at top */
  brandBg?: string;
  /** Optional children rendered as a floating overlay on top of the image */
  children?: React.ReactNode;
}

/**
 * Full-bleed, viewport-height atmospheric image placed directly after the hero.
 * Uses negative margin to sit flush against the hero section.
 * Includes a top gradient overlay that blends from the hero bg color.
 * Supports optional children overlay (e.g. floating phone mockups).
 */
export function AtmosphericImage({ src, alt, brandBg, children }: AtmosphericImageProps) {
  return (
    <div className="full-bleed-panel -mt-14 relative h-screen min-h-[500px]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      {/* Top gradient: hero bg → transparent for seamless transition */}
      {brandBg && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-40"
          style={{
            background: `linear-gradient(to bottom, ${brandBg}cc 0%, ${brandBg}66 40%, transparent 100%)`,
          }}
        />
      )}
      {/* Bottom gradient: dark fade for depth */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/40 via-black/15 to-transparent" />

      {/* Optional floating overlay content */}
      {children && (
        <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
          {children}
        </div>
      )}
    </div>
  );
}
