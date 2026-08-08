"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export default function Logo({
  className = "",
  variant,
  darkSrc,
  lightSrc,
  siteName,
}: {
  className?: string;
  variant?: "dark" | "light";
  darkSrc: string;
  lightSrc: string;
  siteName: string;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const effectiveTheme = variant ?? (mounted && resolvedTheme === "light" ? "light" : "dark");
  const src = effectiveTheme === "light" ? lightSrc : darkSrc;

  return (
    <Link href="/" className={`block ${className}`} aria-label={`${siteName} — Home`}>
      <Image
        src={src}
        alt={siteName}
        width={1348}
        height={416}
        priority
        className="h-9 w-auto"
      />
    </Link>
  );
}
