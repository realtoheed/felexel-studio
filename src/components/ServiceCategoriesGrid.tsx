import Link from "next/link";
import Reveal from "./Reveal";
import BlurRevealSection from "./BlurRevealSection";
import { Icon } from "@/lib/icons";
import { getHome, getServices } from "@/lib/content";

export default function ServiceCategoriesGrid() {
  const services = getServices();
  const home = getHome();

  return (
    <BlurRevealSection
      bgStyle={{
        background:
          "linear-gradient(180deg, #0a0a0f 0%, #120c22 100%), radial-gradient(circle at 30% 30%, rgba(139,92,246,.25), transparent 55%), radial-gradient(circle at 75% 70%, rgba(124,58,237,.2), transparent 55%)",
      }}
    >
      <p className="text-[13px] font-semibold tracking-[0.15em] text-[#c9c9ff] mb-[18px]">
        {home.services.eyebrow}
      </p>
      <h2 className="text-[clamp(28px,4vw,44px)] font-semibold text-white mb-[18px]">
        {home.services.title}
      </h2>
      <p className="text-base text-[#cfcfe6] max-w-[640px] mx-auto mb-5">
        {home.services.subtitle}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
        {services.map((cat, i) => (
          <Reveal key={cat.slug} direction="up" delay={i * 0.1}>
            <Link
              href={`/services/${cat.slug}`}
              className="block bg-white/5 backdrop-blur-md border border-white/[0.08] rounded-[20px] p-8 h-full transition-all hover:-translate-y-2 hover:bg-white/[0.08]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#c4b5fd]">
                <Icon name={cat.icon} size={24} />
              </div>
              <h3 className="text-[19px] font-semibold mb-2.5 text-white">{cat.label}</h3>
              <p className="text-[14.5px] text-[#cfcfe6]">{cat.navDesc}</p>
              <span className="inline-block mt-4 text-[13px] font-semibold text-[#c4b5fd]">
                Explore {cat.label} →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </BlurRevealSection>
  );
}
