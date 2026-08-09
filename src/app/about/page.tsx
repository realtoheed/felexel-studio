import type { Metadata } from "next";
import About from "@/components/About";
import SkillsMarquee from "@/components/SkillsMarquee";
import Stats from "@/components/Stats";
import Expertise from "@/components/Expertise";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import ExploreCta from "@/components/ExploreCta";
import { getAbout, getHome, getSite } from "@/lib/content";

export function generateMetadata(): Metadata {
  const site = getSite();
  const about = getAbout();
  return {
    title: `${about.title} — ${site.siteName}`,
    description: about.body.slice(0, 155),
  };
}

export default function AboutPage() {
  const home = getHome();
  return (
    <div className="pt-40">
      <About />
      <SkillsMarquee />
      <Stats stats={home.stats} />
      <Expertise />
      <WhyUs />
      <Process />
      <ExploreCta />
    </div>
  );
}
