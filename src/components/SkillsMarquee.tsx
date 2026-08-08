import Marquee from "./Marquee";
import { Icon } from "@/lib/icons";
import { getHome } from "@/lib/content";

export default function SkillsMarquee() {
  const home = getHome();

  return (
    <div className="border-y border-text-dim/10">
      <Marquee
        items={home.skills.map((s) => (
          <div key={s.label} className="flex items-center gap-2.5">
            <Icon name={s.icon} size={18} className="text-accent" />
            <span className="text-sm font-medium whitespace-nowrap">{s.label}</span>
          </div>
        ))}
      />
    </div>
  );
}
