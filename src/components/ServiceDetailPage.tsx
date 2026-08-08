import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, MessageCircle } from "lucide-react";
import Reveal from "./Reveal";
import BlurRevealSection from "./BlurRevealSection";
import ParallaxImage from "./ParallaxImage";
import TiltCard from "./TiltCard";
import { Icon } from "@/lib/icons";
import {
  getPortfolio,
  getWhatsappLink,
  type ServiceCategory,
} from "@/lib/content";

const OFFERING_ICONS = [
  "layers",
  "wand",
  "video",
  "pen-tool",
  "sparkles",
  "clapperboard",
  "camera",
  "brush",
  "palette",
];

export default function ServiceDetailPage({ service }: { service: ServiceCategory }) {
  const relatedWork = getPortfolio()
    .filter(
      (item) =>
        item.tag === service.label ||
        (service.slug === "graphic-design" && item.tag === "Streaming Graphics")
    )
    .slice(0, 3);

  return (
    <>
      {/* 1. Hero image banner with text overlay */}
      <section className="relative pt-28 md:pt-32">
        <ParallaxImage
          src={service.heroImage.src}
          alt={service.heroImage.alt}
          className="h-[420px] md:h-[560px]"
          imgClassName="brightness-[0.55]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
        <div className="absolute inset-0 flex items-center">
          <Reveal direction="up" className="max-w-[1200px] w-full mx-auto px-6">
            <p className="text-[13px] font-semibold tracking-[0.15em] text-[#c4b5fd] mb-[18px]">
              {service.eyebrow}
            </p>
            <h1 className="text-[clamp(32px,5vw,54px)] font-semibold mb-5 max-w-[720px] text-white">
              {service.ctaHeading}
            </h1>
            <p className="text-white/80 max-w-[560px] mb-8 text-[15.5px]">{service.ctaSub}</p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[15px] font-semibold text-white grad-bg shadow-[0_8px_30px_-8px_rgba(139,92,246,0.6)] transition-transform hover:-translate-y-1"
              >
                Get Started
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[15px] font-semibold bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors"
              >
                View Portfolio
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Intro copy */}
      <section className="max-w-[820px] mx-auto px-6 py-[100px] text-center">
        <Reveal direction="up">
          <p className="text-text-dim mb-5">{service.intro}</p>
          <p className="text-text-dim">{service.intro2}</p>
        </Reveal>
      </section>

      {/* 3. Offerings grid */}
      <section className="max-w-[1200px] mx-auto px-6 pb-[120px]">
        <Reveal direction="up">
          <p className="text-[13px] font-semibold tracking-[0.15em] text-accent-3 mb-[18px] text-center">
            WHAT&apos;S INCLUDED
          </p>
          <h2 className="text-[clamp(26px,3.5vw,38px)] font-semibold mb-14 text-center max-w-[720px] mx-auto">
            We provide professional {service.shortLabel} services, bringing your
            ideas to life with creativity and cutting-edge technique.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 text-left">
          {service.offerings.map((o, i) => (
            <Reveal key={o.title} direction="up" delay={(i % 3) * 0.06}>
              <div className="bg-surface border border-text-dim/12 rounded-2xl p-6 h-full transition-all hover:-translate-y-1.5 hover:border-accent">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon name={OFFERING_ICONS[i % OFFERING_ICONS.length]} size={20} />
                </div>
                <h3 className="text-[15.5px] font-semibold mb-2">{o.title}</h3>
                <p className="text-[13.5px] text-text-dim">{o.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. From our portfolio */}
      {relatedWork.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-6 pb-[120px]">
          <Reveal direction="up">
            <p className="text-[13px] font-semibold tracking-[0.15em] text-accent-3 mb-[18px] text-center">
              SEE IT IN ACTION
            </p>
            <h2 className="text-[clamp(26px,3.5vw,38px)] font-semibold mb-14 text-center">
              From our {service.shortLabel} portfolio
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedWork.map((item, i) => (
              <Reveal key={item.label} direction="scale" delay={i * 0.08}>
                <TiltCard className="group aspect-[4/3] rounded-[18px] overflow-hidden border border-text-dim/12">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <span className="font-semibold text-white">{item.label}</span>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          <Reveal direction="up" className="text-center mt-10">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[15px] font-semibold border border-text-dim/25 hover:border-accent hover:text-accent transition-colors"
            >
              View Full Portfolio
            </Link>
          </Reveal>
        </section>
      )}

      {/* 5. Benefits section */}
      <section className="max-w-[1200px] mx-auto px-6 pb-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal direction="left">
            <div className="relative h-[340px]">
              <div
                className="absolute -right-5 -top-5 h-28 w-28 rounded-[22px] opacity-80 -z-10"
                style={{ background: "linear-gradient(135deg,#8b5cf6,#c4b5fd)" }}
              />
              <div className="relative h-full w-full overflow-hidden rounded-[24px] border border-text-dim/12 shadow-xl">
                <Image
                  src={service.galleryImage.src}
                  alt={service.galleryImage.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
          <Reveal direction="right">
            <p className="text-[13px] font-semibold tracking-[0.15em] text-accent-3 mb-[18px]">
              BENEFITS
            </p>
            <h2 className="text-[clamp(26px,3.5vw,38px)] font-semibold mb-[18px]">
              {service.benefitsTitle}
            </h2>
            <p className="text-text-dim mb-6">{service.benefitsIntro}</p>
            <ul className="space-y-3">
              {service.benefits.map((b) => (
                <li key={b.item} className="flex items-start gap-2.5 text-text-dim text-[15px]">
                  <CheckCircle2 size={18} className="shrink-0 mt-0.5 text-accent-3" />
                  {b.item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 6. Secondary category section */}
      <section className="max-w-[1200px] mx-auto px-6 pb-[120px]">
        <Reveal direction="up">
          <p className="text-[13px] font-semibold tracking-[0.15em] text-accent-3 mb-[18px] text-center">
            {service.extraSectionTitle.toUpperCase()}
          </p>
          <h2 className="text-[clamp(26px,3.5vw,38px)] font-semibold mb-4 text-center">
            {service.extraSectionTitle}
          </h2>
          <p className="text-text-dim max-w-[600px] mx-auto mb-14 text-center">
            {service.extraSectionIntro}
          </p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 text-left">
          {service.extraItems.map((item, i) => (
            <Reveal key={item.title} direction="up" delay={i * 0.08}>
              <div className="bg-surface-2 border border-text-dim/12 rounded-2xl p-6 h-full">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon name={OFFERING_ICONS[(i + 3) % OFFERING_ICONS.length]} size={18} />
                </div>
                <h3 className="text-[14.5px] font-semibold mb-2">{item.title}</h3>
                <p className="text-[13px] text-text-dim">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 7. Mid CTA banner */}
      <BlurRevealSection
        bgStyle={{
          background:
            "linear-gradient(180deg, #0d0d14 0%, #1a1028 100%), radial-gradient(circle at 30% 30%, rgba(139,92,246,.28), transparent 55%), radial-gradient(circle at 75% 70%, rgba(124,58,237,.22), transparent 55%)",
        }}
      >
        <p className="text-[13px] font-semibold tracking-[0.15em] text-[#c9c9ff] mb-[18px]">
          FELEXEL CREATIVE STUDIO
        </p>
        <h2 className="text-[clamp(26px,4vw,42px)] font-semibold text-white mb-5 max-w-[720px] mx-auto">
          Ready to start your {service.shortLabel} project?
        </h2>
        <p className="text-[#cfcfe6] max-w-[560px] mx-auto mb-8">
          Tell us what you have in mind and we&apos;ll reply on WhatsApp with
          next steps and pricing — usually within a few hours.
        </p>
        <a
          href={getWhatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 justify-center rounded-full px-7 py-3.5 text-[15px] font-semibold text-white grad-bg shadow-[0_8px_30px_-8px_rgba(139,92,246,0.6)] transition-transform hover:-translate-y-1"
        >
          <MessageCircle size={18} />
          Chat on WhatsApp
        </a>
      </BlurRevealSection>

      {/* 8. Final CTA */}
      <section className="max-w-[1200px] mx-auto px-6 py-[120px] text-center">
        <Reveal direction="up">
          <div className="bg-surface border border-text-dim/12 rounded-[24px] p-14">
            <h2 className="text-[clamp(24px,3vw,34px)] font-semibold mb-4">
              Have questions about {service.shortLabel}?
            </h2>
            <p className="text-text-dim max-w-[520px] mx-auto mb-8">
              Reach out and our team will help you scope the right package for
              your project.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[15px] font-semibold text-white grad-bg shadow-[0_8px_30px_-8px_rgba(139,92,246,0.6)] transition-transform hover:-translate-y-1"
              >
                Queries? Contact Us
              </Link>
              <Link
                href={`/packages#${service.slug}`}
                className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[15px] font-semibold bg-text-dim/8 hover:bg-text-dim/15 transition-colors"
              >
                View Packages
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
