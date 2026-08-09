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

// Overshoots past 100% before settling — reads as a bounce/pop even though
// it's a fixed-duration tween (springs finish too fast to guarantee a
// minimum visible duration).
const BOUNCE_EASE: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

/**
 * Mount-triggered entrance (vs. Reveal's scroll-triggered whileInView) —
 * for content that's already above the fold when a page loads, like page
 * titles, so it plays immediately instead of waiting for a scroll.
 *
 * Duration defaults to a full second so the pop/bounce/slide is clearly
 * visible rather than flashing by.
 */
export default function PopIn({
  children,
  variant = "bounce",
  delay = 0,
  duration = 1,
  className = "",
}: {
  children: ReactNode;
  variant?: PopVariant;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={variantMap[variant]}
      transition={{ duration, ease: BOUNCE_EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
