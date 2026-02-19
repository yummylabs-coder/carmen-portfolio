"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

function Card({ className = "", children, ...props }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`
        rounded-xl border border-border-default bg-bg-surface p-6
        transition-colors duration-150
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}

Card.displayName = "Card";
export { Card };
export type { CardProps };
