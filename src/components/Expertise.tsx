import Reveal from "./Reveal";
import { Icon } from "@/lib/icons";
import { getAbout } from "@/lib/content";

export default function Expertise() {
  const about = getAbout();

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-[120px] text-center">
      <p className="text-[13px] font-semibold tracking-[0.15em] text-accent-3 mb-[18px]">
        {about.expertise.eyebrow}
      </p>
      <h2 className="text-[clamp(28px,4vw,44px)] font-semibold mb-[18px]">
        {about.expertise.title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-12">
        {about.expertise.items.map((item, i) => (
          <Reveal key={item.label} direction="up" delay={(i % 3) * 0.08}>
            <div className="flex items-center gap-4 rounded-2xl bg-surface border border-text-dim/10 px-6 py-7 text-left transition-all hover:-translate-y-1.5 hover:border-accent">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Icon name={item.icon} size={20} />
              </div>
              <span className="text-[16px] font-semibold">{item.label}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
