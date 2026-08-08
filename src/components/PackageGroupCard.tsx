import { CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";
import type { PackageGroup } from "@/lib/content";

export default function PackageGroupCard({ group, index }: { group: PackageGroup; index: number }) {
  return (
    <Reveal direction="up" delay={(index % 2) * 0.08}>
      <div className="bg-surface border border-text-dim/12 rounded-[20px] p-6 md:p-8">
        <h3 className="text-lg font-semibold mb-5">{group.title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {group.tiers.map((tier) => {
            const featured = tier.name.toLowerCase() === "standard";
            return (
              <div
                key={tier.name}
                className={`relative text-left rounded-2xl p-5 border ${
                  featured ? "border-accent bg-surface-2" : "border-text-dim/12 bg-text-dim/[0.03]"
                }`}
              >
                {featured && (
                  <span className="absolute -top-3 right-4 grad-bg text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    Popular
                  </span>
                )}
                <p className="text-[11px] font-semibold uppercase tracking-wider text-accent-3 mb-1.5">
                  {tier.name}
                </p>
                <p className="text-2xl font-bold mb-4">{tier.price}</p>
                <ul className="space-y-2">
                  {tier.features.map((f) => (
                    <li
                      key={f.item}
                      className="flex items-start gap-2 text-[13px] text-text-dim leading-snug"
                    >
                      <CheckCircle2 size={14} className="shrink-0 mt-0.5 text-accent" />
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
