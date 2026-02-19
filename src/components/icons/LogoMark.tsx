interface LogoMarkProps {
  size?: number;
  className?: string;
}

export function LogoMark({ size = 38, className = "" }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 39 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="38.4888" height="38.4888" rx="8" fill="#2216FF" />
      <path
        d="M24.7153 30.2719C26.4976 30.2719 28.0469 29.2891 28.8601 27.8282L22.1563 23.9605C21.3432 25.4214 21.3432 27.387 22.1563 28.8479L24.7153 30.2719Z"
        fill="#F1FF53"
      />
      <rect
        x="26.3203"
        y="8.5"
        width="8"
        height="8"
        rx="4"
        transform="rotate(60 26.3203 8.5)"
        fill="#F1FF53"
      />
    </svg>
  );
}
