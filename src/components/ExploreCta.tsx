import Link from "next/link";
import Reveal from "./Reveal";

const LINKS = [
  { href: "/services", label: "Our Services", desc: "Design, animation & web development." },
  { href: "/portfolio", label: "Portfolio", desc: "See a glimpse of our recent work." },
  { href: "/packages", label: "Packages", desc: "Simple, flexible pricing plans." },
  { href: "/contact", label: "Contact Us", desc: "Start your project with us today." },
];

export default function ExploreCta() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-[120px] text-center">
      <p className="text-[13px] font-semibold tracking-[0.15em] text-accent-3 mb-[18px]">
        EXPLORE
      </p>
      <h2 className="text-[clamp(28px,4vw,44px)] font-semibold mb-12">
        Ready to see more?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {LINKS.map((l, i) => (
          <Reveal key={l.href} direction="up" delay={i * 0.08}>
            <Link
              href={l.href}
              className="block text-left bg-surface border border-text-dim/12 rounded-2xl p-6 h-full transition-all hover:-translate-y-1.5 hover:border-accent"
            >
              <h3 className="text-base font-semibold mb-2">{l.label}</h3>
              <p className="text-[13.5px] text-text-dim">{l.desc}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
