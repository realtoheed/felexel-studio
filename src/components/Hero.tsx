"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { HomeContent } from "@/lib/content";

const FLOAT_POSITIONS = [
  { className: "top-[14%] left-[4%] w-36 h-44 -rotate-6", float: [0, -14, 0], duration: 6 },
  { className: "top-[8%] right-[6%] w-32 h-40 rotate-6", float: [0, -10, 0], duration: 7 },
  { className: "bottom-[10%] left-[10%] w-28 h-36 rotate-3", float: [0, -12, 0], duration: 5.5 },
  { className: "bottom-[16%] right-[3%] w-32 h-40 -rotate-3", float: [0, -16, 0], duration: 6.5 },
];

export default function Hero({ content }: { content: HomeContent }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Split the headline so the editor-chosen phrase renders in the gradient style.
  const highlight = content.hero.highlight;
  const idx = highlight ? content.hero.title.indexOf(highlight) : -1;
  const titleParts =
    idx >= 0
      ? [
          content.hero.title.slice(0, idx),
          highlight,
          content.hero.title.slice(idx + highlight.length),
        ]
      : [content.hero.title, "", ""];

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden px-6 pt-32 pb-16"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute -inset-[20%] -z-10 blur-[60px]"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(139,92,246,.35), transparent 45%), radial-gradient(circle at 80% 30%, rgba(124,58,237,.3), transparent 45%), radial-gradient(circle at 50% 80%, rgba(196,181,253,.22), transparent 45%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-[820px]"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-[13px] font-semibold tracking-[0.15em] text-accent-3 mb-[18px]"
        >
          {content.hero.eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[clamp(36px,6vw,68px)] leading-[1.05] font-semibold mb-[22px]"
        >
          {titleParts[0]}
          {titleParts[1] && <span className="grad-text">{titleParts[1]}</span>}
          {titleParts[2]}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-text-dim max-w-[600px] mx-auto mb-9"
        >
          {content.hero.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Link
            href={content.hero.primaryCta.href}
            className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[15px] font-semibold text-white grad-bg shadow-[0_8px_30px_-8px_rgba(139,92,246,0.6)] transition-transform hover:-translate-y-1"
          >
            {content.hero.primaryCta.label}
          </Link>
          <Link
            href={content.hero.secondaryCta.href}
            className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[15px] font-semibold bg-text-dim/8 hover:bg-text-dim/15 transition-colors"
          >
            {content.hero.secondaryCta.label}
          </Link>
        </motion.div>
      </motion.div>

      <div className="hidden lg:block">
        {content.hero.floatingImages.slice(0, 4).map((img, i) => {
          const pos = FLOAT_POSITIONS[i];
          return (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, y: pos.float }}
              transition={{
                opacity: { duration: 0.8, delay: 0.4 + i * 0.1 },
                scale: { duration: 0.8, delay: 0.4 + i * 0.1 },
                y: {
                  duration: pos.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                },
              }}
              className={`absolute z-0 ${pos.className} rounded-2xl overflow-hidden border border-text-dim/15 shadow-2xl`}
            >
              <Image src={img.src} alt={img.alt} fill sizes="150px" className="object-cover" />
            </motion.div>
          );
        })}
      </div>

      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-text-dim tracking-[0.1em]">
        <span className="block w-px h-9 bg-gradient-to-b from-accent to-transparent animate-pulse" />
        Scroll
      </div>
    </section>
  );
}
