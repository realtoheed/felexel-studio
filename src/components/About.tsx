import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";
import PopIn from "./PopIn";
import { getAbout } from "@/lib/content";

export default function About() {
  const about = getAbout();

  return (
    <section id="about" className="max-w-[1200px] mx-auto px-6 py-[120px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <Reveal direction="left">
          <div className="relative h-[420px]">
            <div
              className="absolute -right-6 -top-6 h-40 w-40 rounded-[28px] opacity-80 -z-10"
              style={{ background: "linear-gradient(135deg,#8b5cf6,#c4b5fd)" }}
            />
            <div
              className="absolute -left-6 -bottom-6 h-32 w-32 rounded-[24px] opacity-80 -z-10"
              style={{ background: "linear-gradient(135deg,#7c3aed,#8b5cf6)" }}
            />
            <div className="relative h-full w-full overflow-hidden rounded-[28px] border border-text-dim/12 shadow-2xl">
              <Image
                src={about.image.src}
                alt={about.image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </Reveal>
        <Reveal direction="right">
          <PopIn variant="pop">
            <p className="text-[13px] font-semibold tracking-[0.15em] text-accent-3 mb-[18px]">
              {about.eyebrow}
            </p>
          </PopIn>
          <PopIn variant="bounce" delay={0.1}>
            <h2 className="text-[clamp(28px,4vw,44px)] font-semibold mb-[18px]">
              {about.title}
            </h2>
          </PopIn>
          <p className="text-text-dim mb-5">{about.body}</p>
          <ul className="space-y-3">
            {about.bullets.map((b) => (
              <li key={b.item} className="flex items-start gap-2.5 text-text-dim text-[15px]">
                <CheckCircle2 size={18} className="shrink-0 mt-0.5 text-accent-3" />
                {b.item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
