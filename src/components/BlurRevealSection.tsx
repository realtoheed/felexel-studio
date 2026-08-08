"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function BlurRevealSection({
  children,
  bgStyle,
}: {
  children: ReactNode;
  bgStyle: React.CSSProperties;
}) {
  return (
    <div className="relative isolate overflow-hidden py-[120px]">
      <div className="absolute inset-0 -z-10" style={bgStyle} />
      <motion.div
        className="relative z-10 max-w-[1200px] w-full mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
