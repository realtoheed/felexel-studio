import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import LegalBody from "@/components/LegalBody";
import { getLegalPage, getSite } from "@/lib/content";

export function generateMetadata(): Metadata {
  return { title: `${getLegalPage("terms").title} — ${getSite().siteName}` };
}

export default function TermsPage() {
  const page = getLegalPage("terms");
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} />
      <LegalBody html={page.html} />
    </>
  );
}
