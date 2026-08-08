import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Packages from "@/components/Packages";
import FaqSection from "@/components/FaqSection";
import ExploreCta from "@/components/ExploreCta";
import { getMisc, getSite } from "@/lib/content";

export function generateMetadata(): Metadata {
  const { packagesHero } = getMisc();
  return {
    title: `Packages — ${getSite().siteName}`,
    description: packagesHero.subtitle,
  };
}

export default function PackagesPage() {
  const { packagesHero } = getMisc();
  return (
    <>
      <PageHero
        eyebrow={packagesHero.eyebrow}
        title={packagesHero.title}
        subtitle={packagesHero.subtitle}
      />
      <Packages />
      <FaqSection />
      <ExploreCta />
    </>
  );
}
