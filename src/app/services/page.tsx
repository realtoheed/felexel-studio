import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ServiceCategoriesGrid from "@/components/ServiceCategoriesGrid";
import Expertise from "@/components/Expertise";
import Process from "@/components/Process";
import { getMisc, getSite } from "@/lib/content";

export function generateMetadata(): Metadata {
  const site = getSite();
  const { servicesHero } = getMisc();
  return {
    title: `Services — ${site.siteName}`,
    description: servicesHero.subtitle || site.metaDescription,
  };
}

export default function ServicesPage() {
  const { servicesHero } = getMisc();
  return (
    <>
      <PageHero
        eyebrow={servicesHero.eyebrow}
        title={servicesHero.title}
        subtitle={servicesHero.subtitle}
      />
      <ServiceCategoriesGrid />
      <Expertise />
      <Process />
    </>
  );
}
