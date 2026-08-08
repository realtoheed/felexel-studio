import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";
import { Icon } from "@/lib/icons";
import { getMisc, getPackages, getWhatsappLink } from "@/lib/content";

export default function Packages() {
  const plans = getPackages();
  const { paymentNote } = getMisc();

  return (
    <section className="max-w-[1200px] mx-auto px-6 pb-[120px] text-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p, i) => (
          <Reveal key={p.name} direction="up" delay={i * 0.1}>
            <div
              className={`relative text-left rounded-[20px] p-10 h-full transition-transform hover:-translate-y-2 border ${
                p.featured ? "border-accent bg-surface-2" : "border-text-dim/12 bg-surface"
              }`}
            >
              {p.featured && p.badge && (
                <span className="absolute -top-3.5 right-6 grad-bg text-white text-xs font-bold px-3.5 py-1.5 rounded-full">
                  {p.badge}
                </span>
              )}
              <h3 className="text-xl font-semibold mb-1.5">{p.name}</h3>
              <p className="text-[28px] font-bold mb-5">{p.price}</p>
              <ul className="mb-7">
                {p.features.map((f, idx) => (
                  <li
                    key={f.item}
                    className={`flex items-center gap-2.5 py-2 text-[14.5px] text-text-dim ${
                      idx !== 0 ? "border-t border-text-dim/10" : ""
                    }`}
                  >
                    <CheckCircle2 size={16} className="shrink-0 text-accent" />
                    {f.item}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`w-full inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[15px] font-semibold transition-transform hover:-translate-y-0.5 ${
                  p.featured
                    ? "text-white grad-bg shadow-[0_8px_30px_-8px_rgba(139,92,246,0.6)]"
                    : "border border-text-dim/30 hover:border-accent hover:text-accent"
                }`}
              >
                {p.ctaLabel || "Choose Plan"}
              </Link>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal direction="up">
        <div className="mt-16 max-w-[640px] mx-auto bg-text-dim/5 border border-text-dim/12 rounded-[20px] p-9">
          <h4 className="text-lg font-semibold mb-3">{paymentNote.title}</h4>
          <p className="text-text-dim text-[14.5px] mb-5">{paymentNote.body}</p>
          <div className="flex gap-3.5 justify-center flex-wrap mb-6">
            {paymentNote.methods.map((m) => (
              <span
                key={m.label}
                className="flex items-center gap-2 bg-text-dim/8 px-4 py-2 rounded-lg text-[13px] font-semibold text-text-dim"
              >
                <Icon name={m.icon} size={15} />
                {m.label}
              </span>
            ))}
          </div>
          <a
            href={getWhatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[15px] font-semibold text-white grad-bg shadow-[0_8px_30px_-8px_rgba(139,92,246,0.6)] transition-transform hover:-translate-y-1"
          >
            Chat on WhatsApp
          </a>
        </div>
      </Reveal>
    </section>
  );
}
