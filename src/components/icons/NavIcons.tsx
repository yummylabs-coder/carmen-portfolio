interface IconProps {
  size?: number;
  className?: string;
}

const defaultProps = { size: 16, className: "" };

export function HomeIcon({ size = defaultProps.size, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M2 6.5L8 2L14 6.5V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V6.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6 14V9H10V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WorkIcon({ size = defaultProps.size, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 4V3C5.5 2.44772 5.94772 2 6.5 2H9.5C10.0523 2 10.5 2.44772 10.5 3V4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ProcessIcon({ size = defaultProps.size, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 5V8L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function AboutIcon({ size = defaultProps.size, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 14C3 11.2386 5.23858 9 8 9C10.7614 9 13 11.2386 13 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ExperienceIcon({ size = defaultProps.size, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M2 3H14M2 8H14M2 13H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ExperimentsIcon({ size = defaultProps.size, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M6 2V5.5L3 12C2.7 12.6 3.1 13.5 3.8 13.5H12.2C12.9 13.5 13.3 12.6 13 12L10 5.5V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 2H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="7" cy="10.5" r="0.75" fill="currentColor" />
      <circle cx="9.5" cy="11.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function AcceleratorIcon({ size = defaultProps.size, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M9 1.5L3.5 9H8L7 14.5L12.5 7H8L9 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ContactIcon({ size = defaultProps.size, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 5L8 9L14 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PulseIcon({ size = defaultProps.size, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M1 8H4L6 3L8 13L10 6L12 8H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ActivityIcon({ size = defaultProps.size, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 4.5V8H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowRightIcon({ size = defaultProps.size, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UpdateIcon({ size = defaultProps.size, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M13 2V6H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.5 10A5 5 0 1 1 12.83 5.5L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function PublishIcon({ size = defaultProps.size, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M8 2V10M8 2L5 5M8 2L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 11V13H13V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WelcomeIcon({ size = defaultProps.size, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 9.5C6 9.5 6.8 10.5 8 10.5C9.2 10.5 10 9.5 10 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="6" cy="7" r="0.75" fill="currentColor" />
      <circle cx="10" cy="7" r="0.75" fill="currentColor" />
    </svg>
  );
}

export function MenuIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 7H21M3 12H21M3 17H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ShareIcon({ size = defaultProps.size, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M8 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 5L8 2L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 9V12.5C13 13.0523 12.5523 13.5 12 13.5H4C3.44772 13.5 3 13.0523 3 12.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function CopyIcon({ size = defaultProps.size, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 5.5V3.5C10.5 2.67157 9.82843 2 9 2H3.5C2.67157 2 2 2.67157 2 3.5V9C2 9.82843 2.67157 10.5 3.5 10.5H5.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function CheckIcon({ size = defaultProps.size, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LinkedInIcon({ size = defaultProps.size, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
      <path d="M4.00002 2.66669C4.00002 3.40307 3.40307 4.00002 2.66669 4.00002C1.93031 4.00002 1.33335 3.40307 1.33335 2.66669C1.33335 1.93031 1.93031 1.33335 2.66669 1.33335C3.40307 1.33335 4.00002 1.93031 4.00002 2.66669ZM4.00002 5.33335H1.33335V14.6667H4.00002V5.33335ZM8.66669 5.33335H6.00002V14.6667H8.66669V9.80002C8.66669 7.13335 12 6.86669 12 9.80002V14.6667H14.6667V8.86669C14.6667 4.53335 9.80002 4.70002 8.66669 6.83335V5.33335Z" />
    </svg>
  );
}

export function XIcon({ size = defaultProps.size, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
      <path d="M12.2 1.5H14.3L9.55 7.01L15.1 14.5H10.7L7.33 10.11L3.47 14.5H1.37L6.43 8.63L1.1 1.5H5.6L8.66 5.53L12.2 1.5ZM11.47 13.18H12.63L4.73 2.69H3.48L11.47 13.18Z" />
    </svg>
  );
}

export function CurateIcon({ size = defaultProps.size, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 11.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 9.5V13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
