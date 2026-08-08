import BlurRevealSection from "./BlurRevealSection";
import Reveal from "./Reveal";
import { Icon } from "@/lib/icons";
import { getHome } from "@/lib/content";

export default function WhyUs() {
  const home = getHome();

  return (
    <section id="why">
      <BlurRevealSection
        bgStyle={{
          background:
            "linear-gradient(180deg, #0d0d14 0%, #191024 100%), radial-gradient(circle at 70% 20%, rgba(196,181,253,.2), transparent 55%), radial-gradient(circle at 20% 80%, rgba(139,92,246,.25), transparent 55%)",
        }}
      >
        <p className="text-[13px] font-semibold tracking-[0.15em] text-[#c9c9ff] mb-[18px]">
          {home.why.eyebrow}
        </p>
        <h2 className="text-[clamp(28px,4vw,44px)] font-semibold text-white mb-[18px]">
          {home.why.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-12 text-left">
          {home.why.items.map((r, i) => (
            <Reveal key={r.title} direction="up" delay={i * 0.08}>
              <div className="bg-white/5 border border-white/[0.08] rounded-2xl p-[26px] h-full">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#c4b5fd]">
                  <Icon name={r.icon} size={20} strokeWidth={2} />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{r.title}</h3>
                <p className="text-[13.5px] text-[#cfcfe6]">{r.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </BlurRevealSection>
    </section>
  );
}
