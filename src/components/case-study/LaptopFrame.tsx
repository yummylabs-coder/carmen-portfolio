import Image from "next/image";

interface LaptopFrameProps {
  src: string;
  alt: string;
}

/**
 * Clean MacBook-style laptop frame.
 * Dark bezel with soft elevation. No complex multi-layer base.
 */
export function LaptopFrame({ src, alt }: LaptopFrameProps) {
  return (
    <div
      className="mx-auto w-full max-w-[800px]"
      style={{
        filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15)) drop-shadow(0 8px 16px rgba(0,0,0,0.1))",
      }}
    >
      {/* Screen */}
      <div className="overflow-hidden rounded-t-[10px] border-[6px] border-b-[18px] border-[#1d1d1f] bg-[#1d1d1f]">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 800px) 100vw, 800px"
          />
        </div>
      </div>

      {/* Base / hinge */}
      <div
        className="mx-auto h-[8px] rounded-b-md"
        style={{
          width: "104%",
          marginLeft: "-2%",
          background: "linear-gradient(180deg, #3a3a3c 0%, #1d1d1f 100%)",
        }}
      />
    </div>
  );
}
