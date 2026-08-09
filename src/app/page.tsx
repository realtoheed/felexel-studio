import Hero from "@/components/Hero";
import SkillsMarquee from "@/components/SkillsMarquee";
import ServiceCategoriesGrid from "@/components/ServiceCategoriesGrid";
import PlatformsGrid from "@/components/PlatformsGrid";
import Stats from "@/components/Stats";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import FaqSection from "@/components/FaqSection";
import SupportCta from "@/components/SupportCta";
import ExploreCta from "@/components/ExploreCta";
import { getHome } from "@/lib/content";

export default function Home() {
  const home = getHome();

  return (
    <>
      <Hero content={home} />
      <SkillsMarquee />
      <ServiceCategoriesGrid />
      <PlatformsGrid />
      <Stats stats={home.stats} />
      <WhyUs />
      <Process />
      <Portfolio />
      <Testimonials showMore />
      <FaqSection />
      <SupportCta />
      <ExploreCta />
    </>
  );
}
