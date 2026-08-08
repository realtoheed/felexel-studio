import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Contact from "@/components/Contact";
import ParallaxImage from "@/components/ParallaxImage";
import Reveal from "@/components/Reveal";
import FaqSection from "@/components/FaqSection";
import { getContact, getMisc, getSite, getWhatsappLink } from "@/lib/content";

export function generateMetadata(): Metadata {
  const { contactHero } = getMisc();
  return {
    title: `Contact — ${getSite().siteName}`,
    description: contactHero.subtitle,
  };
}

export default function ContactPage() {
  const { contactHero, contactImage } = getMisc();
  const contact = getContact();

  return (
    <>
      <PageHero
        eyebrow={contactHero.eyebrow}
        title={contactHero.title}
        subtitle={contactHero.subtitle}
      />
      <Reveal direction="scale" className="max-w-[1200px] mx-auto px-6 pb-[100px]">
        <ParallaxImage
          src={contactImage.src}
          alt={contactImage.alt}
          className="h-[220px] md:h-[340px] rounded-[28px] border border-text-dim/12"
        />
      </Reveal>
      <Contact
        contactEmail={contact.contactEmail}
        supportEmail={contact.supportEmail}
        whatsappLink={getWhatsappLink()}
      />
      <FaqSection />
    </>
  );
}
