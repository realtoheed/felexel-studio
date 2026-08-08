"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

function Counter({ target }: { target: number }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, target, motionVal]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(Math.floor(v)));
    return unsub;
  }, [spring]);

  return (
    <h3 ref={ref} className="text-[clamp(32px,4vw,52px)] font-semibold grad-text">
      {display.toLocaleString()}+
    </h3>
  );
}

export default function Stats({
  stats,
}: {
  stats: { value: number; label: string }[];
}) {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-[120px]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
          >
            <Counter target={s.value} />
            <p className="text-text-dim mt-2 text-sm">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
