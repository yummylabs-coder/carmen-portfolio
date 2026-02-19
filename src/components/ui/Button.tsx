"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: Variant;
  children: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-action-primary text-white hover:bg-action-primary-hover shadow-sm",
  secondary:
    "bg-bg-surface text-text-primary border border-border-default hover:border-border-strong hover:bg-bg-muted",
  ghost:
    "bg-transparent text-text-secondary hover:bg-bg-muted hover:text-text-primary",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        className={`
          inline-flex items-center justify-center gap-2
          rounded-lg px-4 py-2 text-14 font-medium
          transition-colors duration-150 cursor-pointer
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
          disabled:pointer-events-none disabled:opacity-50
          ${variantStyles[variant]}
          ${className}
        `}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export { Button };
export type { ButtonProps };
