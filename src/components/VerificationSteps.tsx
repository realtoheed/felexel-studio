import Reveal from "./Reveal";
import { Icon } from "@/lib/icons";
import { getMisc } from "@/lib/content";

export default function VerificationSteps() {
  const { verifySteps } = getMisc();

  return (
    <section className="max-w-[900px] mx-auto px-6 pb-[100px]">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {verifySteps.map((s, i) => (
          <Reveal key={s.title} direction="up" delay={i * 0.1}>
            <div className="text-center bg-surface border border-text-dim/12 rounded-2xl p-7 h-full">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Icon name={s.icon} size={22} />
              </div>
              <h3 className="text-[15px] font-semibold mb-2">{s.title}</h3>
              <p className="text-[13px] text-text-dim">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
