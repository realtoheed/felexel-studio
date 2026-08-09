import { CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";
import type { CategoryTheme, PackageGroup } from "@/lib/content";

export default function PackageGroupCard({
  group,
  index,
  theme,
}: {
  group: PackageGroup;
  index: number;
  theme: CategoryTheme;
}) {
  const { accent, accent2 } = theme;

  return (
    <Reveal direction="up" delay={(index % 2) * 0.08}>
      <div
        className="relative overflow-hidden rounded-[20px] border border-text-dim/12 bg-surface p-6 pt-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_var(--card-glow)] md:p-8 md:pt-9"
        style={{ ["--card-glow" as string]: `${accent}55` }}
      >
        <div
          className="absolute inset-x-0 top-0 h-1"
          style={{ background: `linear-gradient(90deg, ${accent}, ${accent2})` }}
        />
        <h3 className="text-lg font-semibold mb-5">{group.title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {group.tiers.map((tier) => {
            const featured = tier.name.toLowerCase() === "standard";
            return (
              <div
                key={tier.name}
                className={`relative text-left rounded-2xl p-5 border transition-colors ${
                  featured ? "" : "border-text-dim/12 bg-text-dim/[0.03]"
                }`}
                style={
                  featured
                    ? {
                        borderColor: accent,
                        background: `linear-gradient(160deg, ${accent}14, transparent 65%)`,
                      }
                    : undefined
                }
              >
                {featured && (
                  <span
                    className="absolute -top-3 right-4 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md"
                    style={{ background: `linear-gradient(135deg, ${accent}, ${accent2})` }}
                  >
                    Popular
                  </span>
                )}
                <p
                  className="text-[11px] font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: featured ? accent : "var(--text-dim)" }}
                >
                  {tier.name}
                </p>
                <p className="text-2xl font-bold mb-4">{tier.price}</p>
                <ul className="space-y-2">
                  {tier.features.map((f) => (
                    <li
                      key={f.item}
                      className="flex items-start gap-2 text-[13px] text-text-dim leading-snug"
                    >
                      <CheckCircle2
                        size={14}
                        className="shrink-0 mt-0.5"
                        style={{ color: featured ? accent : "var(--accent)" }}
                      />
                      {f.item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
