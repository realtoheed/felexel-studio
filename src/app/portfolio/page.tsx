import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Portfolio from "@/components/Portfolio";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import ExploreCta from "@/components/ExploreCta";
import { getHome, getMisc, getSite } from "@/lib/content";

export function generateMetadata(): Metadata {
  const { portfolioHero } = getMisc();
  return {
    title: `Portfolio — ${getSite().siteName}`,
    description: portfolioHero.subtitle,
  };
}

export default function PortfolioPage() {
  const { portfolioHero } = getMisc();
  const home = getHome();
  return (
    <>
      <PageHero
        eyebrow={portfolioHero.eyebrow}
        title={portfolioHero.title}
        subtitle={portfolioHero.subtitle}
      />
      <Portfolio />
      <Stats stats={home.stats} />
      <Testimonials />
      <ExploreCta />
    </>
  );
}
