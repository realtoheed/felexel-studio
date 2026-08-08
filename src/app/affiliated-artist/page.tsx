import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import VerificationSteps from "@/components/VerificationSteps";
import AffiliatedArtist from "@/components/AffiliatedArtist";
import FaqSection from "@/components/FaqSection";
import { getContact, getMisc, getSite } from "@/lib/content";

export function generateMetadata(): Metadata {
  const { verifyHero } = getMisc();
  return {
    title: `Verify an Artist — ${getSite().siteName}`,
    description: verifyHero.subtitle,
  };
}

export default function AffiliatedArtistPage() {
  const { verifyHero } = getMisc();
  const contact = getContact();

  return (
    <>
      <PageHero
        eyebrow={verifyHero.eyebrow}
        title={verifyHero.title}
        subtitle={verifyHero.subtitle}
      />
      <VerificationSteps />
      <AffiliatedArtist contactEmail={contact.contactEmail} />
      <FaqSection />
    </>
  );
}
