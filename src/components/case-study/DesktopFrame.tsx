import Image from "next/image";

interface DesktopFrameProps {
  src: string;
  alt: string;
}

/**
 * Clean iMac-style desktop frame.
 * Dark bezel with aluminum chin, stand, and soft elevation.
 */
export function DesktopFrame({ src, alt }: DesktopFrameProps) {
  return (
    <div
      className="mx-auto w-full max-w-[900px]"
      style={{
        filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.12)) drop-shadow(0 8px 16px rgba(0,0,0,0.08))",
      }}
    >
      {/* Monitor */}
      <div className="overflow-hidden rounded-[10px] border-[6px] border-b-0 border-[#1d1d1f] bg-[#1d1d1f]">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 900px) 100vw, 900px"
          />
        </div>
      </div>

      {/* Chin */}
      <div className="flex items-center justify-center rounded-b-[10px] bg-gradient-to-b from-[#e4e4e7] to-[#d4d4d8] py-[8px]">
        <div className="h-[4px] w-[4px] rounded-full bg-[#a1a1aa]" />
      </div>

      {/* Stand */}
      <div className="flex justify-center">
        <div
          className="h-[40px] w-[60px] bg-gradient-to-b from-[#d4d4d8] to-[#c4c4c8]"
          style={{ clipPath: "polygon(15% 0%, 85% 0%, 95% 100%, 5% 100%)" }}
        />
      </div>
      <div className="flex justify-center">
        <div className="h-[4px] w-[120px] rounded-[2px] bg-gradient-to-b from-[#c4c4c8] to-[#b4b4b8]" />
      </div>
    </div>
  );
}
