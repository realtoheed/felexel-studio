import Link from "next/link";
import { LifeBuoy } from "lucide-react";
import Reveal from "./Reveal";
import EmailText from "./EmailText";
import { getContact, getHome } from "@/lib/content";

export default function SupportCta() {
  const { supportEmail } = getContact();
  const home = getHome();

  return (
    <section className="max-w-[1200px] mx-auto px-6 pb-[120px]">
      <Reveal direction="up">
        <div className="flex flex-col md:flex-row items-center gap-8 bg-surface border border-text-dim/12 rounded-[24px] p-10 md:p-12">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <LifeBuoy size={26} strokeWidth={1.8} />
          </div>
          <p className="flex-1 text-text-dim text-[15px] text-center md:text-left">
            <EmailText
              template={home.support.text}
              email={supportEmail}
              linkClassName="text-accent-3 font-semibold"
            />
          </p>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[15px] font-semibold text-white grad-bg shadow-[0_8px_30px_-8px_rgba(139,92,246,0.6)] transition-transform hover:-translate-y-1"
          >
            {home.support.ctaLabel}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
