"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export type NavService = { slug: string; label: string; navDesc: string };

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/packages", label: "Packages" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "/affiliated-artist", label: "Verify Artist" },
  { href: "/contact", label: "Contact" },
];

const SECONDARY_LINKS = LINKS.slice(2);

export default function Navbar({
  services,
  logoDark,
  logoLight,
  siteName,
}: {
  services: NavService[];
  logoDark: string;
  logoLight: string;
  siteName: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  function openServices() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  }
  function scheduleCloseServices() {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150);
  }

  const servicesActive = pathname.startsWith("/services");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        scrolled
          ? "bg-bg/75 backdrop-blur-xl border-b border-text-dim/10 py-3"
          : "py-4"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <Logo darkSrc={logoDark} lightSrc={logoLight} siteName={siteName} />

        <nav className="hidden lg:flex items-center gap-5">
          <Link
            href="/"
            className={`text-[13.5px] transition-colors whitespace-nowrap ${
              pathname === "/" ? "text-text" : "text-text-dim hover:text-text"
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`text-[13.5px] transition-colors whitespace-nowrap ${
              pathname.startsWith("/about") ? "text-text" : "text-text-dim hover:text-text"
            }`}
          >
            About
          </Link>

          <div
            className="relative"
            onMouseEnter={openServices}
            onMouseLeave={scheduleCloseServices}
          >
            <Link
              href="/services"
              className={`flex items-center gap-1 text-[13.5px] transition-colors whitespace-nowrap ${
                servicesActive ? "text-text" : "text-text-dim hover:text-text"
              }`}
            >
              Services
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}
              >
                <path
                  d="M2 3.5L5 6.5L8 3.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[300px]"
                >
                  <div className="bg-surface border border-text-dim/15 rounded-2xl p-2.5 shadow-2xl">
                    {services.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/services/${cat.slug}`}
                        className="block rounded-xl px-4 py-3 hover:bg-text-dim/10 transition-colors"
                      >
                        <div className="text-[13.5px] font-semibold text-text">{cat.label}</div>
                        <div className="text-[12px] text-text-dim mt-0.5">{cat.navDesc}</div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {SECONDARY_LINKS.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-[13.5px] transition-colors whitespace-nowrap ${
                  active ? "text-text" : "text-text-dim hover:text-text"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-text-dim/30 px-[18px] py-[10px] text-[13.5px] font-semibold hover:border-accent hover:text-accent transition-colors whitespace-nowrap"
          >
            Get Started
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col gap-[5px] p-1.5"
          >
            <span className="block w-[22px] h-[2px] bg-text" />
            <span className="block w-[22px] h-[2px] bg-text" />
            <span className="block w-[22px] h-[2px] bg-text" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-bg/97 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-1 p-6">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="text-sm text-text-dim hover:text-text py-2"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setOpen(false)}
                className="text-sm text-text-dim hover:text-text py-2"
              >
                About
              </Link>

              <button
                onClick={() => setMobileServicesOpen((v) => !v)}
                className="flex items-center justify-between text-sm text-text-dim hover:text-text py-2 text-left"
              >
                Services
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                >
                  <path
                    d="M2 3.5L5 6.5L8 3.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <AnimatePresence>
                {mobileServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden pl-4 flex flex-col"
                  >
                    <Link
                      href="/services"
                      onClick={() => setOpen(false)}
                      className="text-sm text-text-dim hover:text-text py-2"
                    >
                      All Services
                    </Link>
                    {services.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/services/${cat.slug}`}
                        onClick={() => setOpen(false)}
                        className="text-sm text-text-dim hover:text-text py-2"
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {SECONDARY_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-text-dim hover:text-text py-2"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
