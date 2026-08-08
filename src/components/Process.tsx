import Reveal from "./Reveal";
import { getHome } from "@/lib/content";

export default function Process() {
  const home = getHome();

  return (
    <section
      id="process"
      className="max-w-[1200px] mx-auto px-6 py-[120px] text-center"
    >
      <p className="text-[13px] font-semibold tracking-[0.15em] text-accent-3 mb-[18px]">
        {home.process.eyebrow}
      </p>
      <h2 className="text-[clamp(28px,4vw,44px)] font-semibold mb-[18px] max-w-3xl mx-auto">
        {home.process.title}
      </h2>
      <div className="relative grid grid-cols-1 md:grid-cols-5 gap-4 mt-16">
        <div className="hidden md:block absolute top-6 left-[5%] right-[5%] h-px bg-text-dim/15 z-0" />
        {home.process.steps.map((s, i) => (
          <Reveal key={s.title} direction="up" delay={i * 0.1} className="relative z-10 px-2">
            <div className="w-12 h-12 rounded-full grad-bg text-white flex items-center justify-center font-bold mx-auto mb-[18px]">
              {i + 1}
            </div>
            <h3 className="text-base font-semibold mb-2">{s.title}</h3>
            <p className="text-[13.5px] text-text-dim">{s.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
