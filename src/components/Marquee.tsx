"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function Marquee({
  items,
  speed = 28,
  className = "py-6",
  gap = "gap-14",
}: {
  items: ReactNode[];
  speed?: number;
  className?: string;
  gap?: string;
}) {
  const track = [...items, ...items];

  return (
    <div
      className={`relative overflow-hidden ${className} [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]`}
    >
      <motion.div
        className={`flex items-center ${gap} w-max`}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {track.map((item, i) => (
          <div key={i} className="flex items-center gap-3 text-text-dim shrink-0">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
