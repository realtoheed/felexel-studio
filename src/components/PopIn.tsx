"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type PopVariant = "pop" | "bounce" | "up" | "left" | "right";

const variantMap: Record<PopVariant, Variants> = {
  // Springs in from slightly small — reads as a confident "pop" on load.
  pop: {
    hidden: { opacity: 0, scale: 0.75 },
    visible: { opacity: 1, scale: 1 },
  },
  // Drops in from above with overshoot — used for hero titles.
  bounce: {
    hidden: { opacity: 0, y: -36, scale: 0.85 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  up: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
};

/**
 * Mount-triggered entrance (vs. Reveal's scroll-triggered whileInView) —
 * for content that's already above the fold when a page loads, like page
 * titles, so it plays immediately instead of waiting for a scroll.
 */
export default function PopIn({
  children,
  variant = "bounce",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  variant?: PopVariant;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={variantMap[variant]}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay }}
    >
      {children}
    </motion.div>
  );
}
