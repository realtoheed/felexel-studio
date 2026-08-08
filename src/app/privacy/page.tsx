import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import LegalBody from "@/components/LegalBody";
import { getLegalPage, getSite } from "@/lib/content";

export function generateMetadata(): Metadata {
  return { title: `${getLegalPage("privacy").title} — ${getSite().siteName}` };
}

export default function PrivacyPage() {
  const page = getLegalPage("privacy");
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} />
      <LegalBody html={page.html} />
    </>
  );
}
