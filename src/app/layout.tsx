import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ProgressBar from "@/components/ProgressBar";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WarningTicker from "@/components/WarningTicker";
import ThemeProvider from "@/components/ThemeProvider";
import IdentityRedirect from "@/components/IdentityRedirect";
import NetlifyFormsFallback from "@/components/NetlifyFormsFallback";
import { getServices, getSite } from "@/lib/content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function generateMetadata(): Metadata {
  const site = getSite();
  return {
    metadataBase: site.siteUrl ? new URL(site.siteUrl) : undefined,
    title: site.metaTitle,
    description: site.metaDescription,
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  const site = getSite();
  const services = getServices().map((s) => ({
    slug: s.slug,
    label: s.label,
    navDesc: s.navDesc,
  }));

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        <ThemeProvider>
          <IdentityRedirect />
          <NetlifyFormsFallback />
          <div className="noise-overlay" />
          <ProgressBar />
          <SmoothScroll>
            <Navbar
              services={services}
              logoDark={site.logoDark}
              logoLight={site.logoLight}
              siteName={site.siteName}
            />
            <main>{children}</main>
            <WarningTicker />
            <Footer />
          </SmoothScroll>
          <WhatsAppFloat />
        </ThemeProvider>
      </body>
    </html>
  );
}
