import Image from "next/image";
import Reveal from "./Reveal";
import { Icon } from "@/lib/icons";
import { getBrandIcon } from "@/lib/brandIcons";
import { getHome } from "@/lib/content";

export default function PlatformsGrid() {
  const { platforms } = getHome();
  if (!platforms?.items?.length) return null;

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-[100px]">
      <Reveal direction="up">
        <p className="text-[13px] font-semibold tracking-[0.15em] text-accent-3 mb-[18px] text-center">
          {platforms.eyebrow}
        </p>
        <h2 className="text-[clamp(28px,4vw,44px)] font-semibold mb-[18px] text-center">
          {platforms.title}
        </h2>
        <p className="text-base text-text-dim max-w-[640px] mx-auto mb-14 text-center">
          {platforms.subtitle}
        </p>
      </Reveal>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
        {platforms.items.map((p, i) => {
          const brand = getBrandIcon(p.label);
          const BrandIcon = brand?.icon;

          return (
            <Reveal key={p.label} direction="up" delay={(i % 3) * 0.06}>
              <div className="flex items-center gap-3.5 bg-surface border border-text-dim/12 rounded-2xl px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-accent/40">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl overflow-hidden"
                  style={
                    !p.logo && brand
                      ? { background: `${brand.color}1f`, color: brand.color }
                      : { background: "color-mix(in oklab, var(--text-dim) 8%, transparent)" }
                  }
                >
                  {p.logo ? (
                    <Image
                      src={p.logo}
                      alt={p.label}
                      width={44}
                      height={44}
                      className="object-contain"
                    />
                  ) : BrandIcon ? (
                    <BrandIcon size={22} />
                  ) : (
                    <Icon name={p.icon || "sparkles"} size={20} className="text-accent-3" />
                  )}
                </div>
                <span className="font-semibold text-[15px]">{p.label}</span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
