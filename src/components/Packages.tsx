import Link from "next/link";
import { Icon } from "@/lib/icons";
import Reveal from "./Reveal";
import PackageGroupCard from "./PackageGroupCard";
import {
  PACKAGE_CATEGORIES,
  getMisc,
  getPackageGroupsByCategory,
  getServices,
  getWhatsappLink,
} from "@/lib/content";

export default function Packages() {
  const { paymentNote } = getMisc();
  const services = getServices();

  return (
    <section className="max-w-[1200px] mx-auto px-6 pb-[60px]">
      {PACKAGE_CATEGORIES.map((cat) => {
        const groups = getPackageGroupsByCategory(cat.slug);
        if (groups.length === 0) return null;
        const service = services.find((s) => s.slug === cat.slug);

        return (
          <div key={cat.slug} id={cat.slug} className="scroll-mt-28 pt-16 first:pt-0">
            <Reveal direction="up">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
                <div>
                  <h2 className="text-[clamp(22px,3vw,30px)] font-semibold mb-1.5">{cat.label}</h2>
                  <p className="text-text-dim text-[14.5px]">{cat.blurb}</p>
                </div>
                {service && (
                  <Link
                    href={`/services/${service.slug}`}
                    className="shrink-0 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-accent hover:text-accent-3 transition-colors"
                  >
                    {service.icon && <Icon name={service.icon} size={15} />}
                    View {service.label} service →
                  </Link>
                )}
              </div>
            </Reveal>
            <div className="grid grid-cols-1 gap-6">
              {groups.map((group, i) => (
                <PackageGroupCard key={group.title} group={group} index={i} />
              ))}
            </div>
          </div>
        );
      })}

      {/* Fursuits & Plushies has no fixed pricing tiers — always a custom quote */}
      <div id="fursuits-plushies" className="scroll-mt-28 pt-16">
        <Reveal direction="up">
          <div className="bg-surface border border-text-dim/12 rounded-[20px] p-8 md:p-10 text-center">
            <h2 className="text-[clamp(22px,3vw,30px)] font-semibold mb-2">Fursuits & Plushies</h2>
            <p className="text-text-dim text-[14.5px] max-w-[520px] mx-auto mb-6">
              Every fursuit and plushie is handmade to order, so pricing depends
              on size, materials and detail. Message us with your character
              design and we&apos;ll send a custom quote.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link
                href="/services/fursuits-plushies"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-[14px] font-semibold border border-text-dim/25 hover:border-accent hover:text-accent transition-colors"
              >
                View Fursuits & Plushies service
              </Link>
              <a
                href={getWhatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-[14px] font-semibold text-white grad-bg shadow-[0_8px_30px_-8px_rgba(139,92,246,0.6)] transition-transform hover:-translate-y-0.5"
              >
                Get a Custom Quote
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal direction="up">
        <div className="mt-16 max-w-[640px] mx-auto bg-text-dim/5 border border-text-dim/12 rounded-[20px] p-9 text-center">
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
