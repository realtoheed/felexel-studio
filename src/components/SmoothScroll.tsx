"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t: number) => 1 - Math.pow(1 - t, 2.5),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
    });
    lenisInstance = lenis;

    let rafId: number;
    function raf(time: number) {
      try {
        lenis.raf(time);
      } catch {
        // swallow a stray frame error so the loop never permanently stops
      }
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Recalculate scrollable height shortly after mount, once fonts/images settle.
    const resizeTimer = setTimeout(() => lenis.resize(), 300);

    // Safety net: re-sync whenever document height actually changes (late
    // image/font loads, animated content, etc.) so the scroll limit never
    // goes stale mid-session.
    const resizeObserver = new ResizeObserver(() => lenis.resize());
    resizeObserver.observe(document.body);

    return () => {
      clearTimeout(resizeTimer);
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  // App Router doesn't remount the layout between routes, so Lenis never
  // re-measures content height on navigation. Force a resize whenever the
  // route changes so a shorter/longer page doesn't leave scroll stuck.
  useEffect(() => {
    const id = requestAnimationFrame(() => lenisInstance?.resize());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}
