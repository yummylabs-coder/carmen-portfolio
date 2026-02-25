import Image from "next/image";

interface PhoneFrameProps {
  src: string;
  alt: string;
}

/**
 * Clean iPhone-style phone frame.
 * Dark bezel with Dynamic Island and soft elevation.
 */
export function PhoneFrame({ src, alt }: PhoneFrameProps) {
  return (
    <div
      className="mx-auto w-full max-w-[280px]"
      style={{
        filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15)) drop-shadow(0 8px 16px rgba(0,0,0,0.1))",
      }}
    >
      <div className="overflow-hidden rounded-[40px] border-[8px] border-[#1d1d1f] bg-[#1d1d1f]">
        {/* Screen with Dynamic Island */}
        <div className="relative overflow-hidden rounded-[32px] bg-black">
          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-[10px] z-20 h-[22px] w-[80px] -translate-x-1/2 rounded-full bg-black" />

          {/* Screen content */}
          <div className="relative aspect-[9/19.5] w-full overflow-hidden bg-white">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-top"
              sizes="280px"
            />
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-[6px] left-1/2 z-20 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-white/30" />
        </div>
      </div>
    </div>
  );
}
