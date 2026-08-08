import Reveal from "./Reveal";
import Faq from "./Faq";
import { getFaqs } from "@/lib/content";

export default function FaqSection() {
  const faqs = getFaqs();
  if (faqs.length === 0) return null;

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-[120px]">
      <Reveal direction="up">
        <p className="text-[13px] font-semibold tracking-[0.15em] text-accent-3 mb-[18px] text-center">
          FAQ
        </p>
        <h2 className="text-[clamp(28px,4vw,44px)] font-semibold mb-14 text-center">
          Questions, answered
        </h2>
      </Reveal>
      <Faq items={faqs} />
    </section>
  );
}
