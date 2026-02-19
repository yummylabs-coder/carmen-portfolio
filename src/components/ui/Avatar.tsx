import Image from "next/image";

type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps {
  src: string;
  alt: string;
  size?: AvatarSize;
  className?: string;
}

const sizeMap: Record<AvatarSize, { container: string; px: number }> = {
  sm: { container: "h-8 w-8", px: 32 },
  md: { container: "h-12 w-12", px: 48 },
  lg: { container: "h-20 w-20", px: 80 },
};

function Avatar({ src, alt, size = "md", className = "" }: AvatarProps) {
  const { container, px } = sizeMap[size];

  return (
    <div
      className={`
        relative overflow-hidden rounded-full
        border-2 border-border-default
        ${container} ${className}
      `}
    >
      <Image
        src={src}
        alt={alt}
        width={px}
        height={px}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

Avatar.displayName = "Avatar";
export { Avatar };
export type { AvatarProps };
