import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Testimonials from "@/components/Testimonials";
import Stats from "@/components/Stats";
import Portfolio from "@/components/Portfolio";
import FaqSection from "@/components/FaqSection";
import ExploreCta from "@/components/ExploreCta";
import { getHome, getMisc, getSite } from "@/lib/content";

export function generateMetadata(): Metadata {
  const { testimonialsHero } = getMisc();
  return {
    title: `Testimonials — ${getSite().siteName}`,
    description: testimonialsHero.subtitle || testimonialsHero.title,
  };
}

export default function TestimonialsPage() {
  const { testimonialsHero } = getMisc();
  const home = getHome();
  return (
    <>
      <PageHero
        eyebrow={testimonialsHero.eyebrow}
        title={testimonialsHero.title}
        subtitle={testimonialsHero.subtitle}
      />
      <Testimonials />
      <Stats stats={home.stats} />
      <Portfolio />
      <FaqSection />
      <ExploreCta />
    </>
  );
}
