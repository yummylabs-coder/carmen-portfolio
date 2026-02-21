import Image from "next/image";

interface MainHeroImageProps {
  src: string;
  alt: string;
}

function isVideo(url: string): boolean {
  return /\.(mp4|webm|mov)(\?|$)/i.test(url);
}

function isSvg(url: string): boolean {
  return /\.svg(\?|$)/i.test(url);
}

export function MainHeroImage({ src, alt }: MainHeroImageProps) {
  return (
    <div className="full-bleed-panel">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {isVideo(src) ? (
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
        ) : isSvg(src) ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
      </div>
    </div>
  );
}
