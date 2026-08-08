import Image from "next/image";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import { getPortfolio, type PortfolioItem } from "@/lib/content";

export default function Portfolio({ items }: { items?: PortfolioItem[] }) {
  const portfolio = items ?? getPortfolio();

  return (
    <section className="max-w-[1200px] mx-auto px-6 pb-[120px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {portfolio.map((item, i) => (
          <Reveal key={item.label} direction="scale" delay={(i % 3) * 0.08}>
            <TiltCard className="group aspect-[4/3] rounded-[18px] overflow-hidden border border-text-dim/12">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-accent-3 mb-1">
                  {item.tag}
                </span>
                <span className="font-semibold text-white">{item.label}</span>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
