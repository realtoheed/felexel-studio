import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const CONTENT_DIR = path.join(process.cwd(), "content");

/* ---------------- shared types ---------------- */

export type CmsImage = { src: string; alt: string };

export type SiteSettings = {
  siteName: string;
  siteUrl: string;
  metaTitle: string;
  metaDescription: string;
  logoDark: string;
  logoLight: string;
  footerLogoDark: string;
  footerTagline: string;
  copyright: string;
  warningEnabled: boolean;
  warningText: string;
};

export type ContactSettings = {
  whatsappNumber: string;
  contactEmail: string;
  supportEmail: string;
  branches: { name: string; address: string; phones?: { number: string }[] }[];
};

export type SocialSettings = {
  links: { platform: string; url: string; enabled: boolean }[];
};

export type PaymentSettings = {
  paypalClientId: string;
  paypalCurrency: string;
};

export type ServiceCategory = {
  order: number;
  slug: string;
  label: string;
  shortLabel: string;
  icon: string;
  navDesc: string;
  eyebrow: string;
  title: string;
  heroImage: CmsImage;
  galleryImage: CmsImage;
  intro: string;
  intro2: string;
  offerings: { title: string; desc: string }[];
  ctaHeading: string;
  ctaSub: string;
  benefitsTitle: string;
  benefitsIntro: string;
  benefits: { item: string }[];
  extraSectionTitle: string;
  extraSectionIntro: string;
  extraItems: { title: string; desc: string }[];
};

export type PortfolioItem = {
  order: number;
  label: string;
  tag: string;
  image: CmsImage;
};

export type Testimonial = {
  order: number;
  author: string;
  rating: number;
  quote: string;
  avatar: CmsImage;
};

export type PackageTier = {
  name: string;
  price: string;
  features: { item: string }[];
};

export type PackageGroup = {
  order: number;
  category: string;
  title: string;
  tiers: PackageTier[];
};

export type CategoryTheme = { accent: string; accent2: string };

/**
 * Maps a package group's `category` (and a service's slug) to the section
 * shown on /packages. Keep in sync with the `category` select options in
 * public/admin/config.yml and with the service slugs in content/services/*.
 * Each category gets its own accent pair so the /packages page reads as
 * distinct sections rather than one long repeated card list.
 */
export const PACKAGE_CATEGORIES: { slug: string; label: string; blurb: string; theme: CategoryTheme }[] = [
  {
    slug: "animation",
    label: "Animation",
    blurb: "2D & 3D character and scene animation.",
    theme: { accent: "#a855f7", accent2: "#7c3aed" },
  },
  {
    slug: "vtuber-models",
    label: "VTuber Models",
    blurb: "VTuber models, PNGTuber assets & animated emotes.",
    theme: { accent: "#3b82f6", accent2: "#06b6d4" },
  },
  {
    slug: "graphic-design",
    label: "Graphic Design",
    blurb: "Logos, banners, panels, badges & emotes.",
    theme: { accent: "#ec4899", accent2: "#f43f5e" },
  },
  {
    slug: "comic-services",
    label: "Comic Services",
    blurb: "Character and scene illustration.",
    theme: { accent: "#f59e0b", accent2: "#f97316" },
  },
];

export type FaqItem = { order: number; question: string; answer: string };

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: CmsImage;
  author?: string;
  tags?: { tag: string }[];
  draft?: boolean;
  html: string;
};

export type HomeContent = {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    subtitle: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    floatingImages: CmsImage[];
  };
  services: { eyebrow: string; title: string; subtitle: string };
  stats: { value: number; label: string }[];
  why: {
    eyebrow: string;
    title: string;
    items: { icon: string; title: string; desc: string }[];
  };
  process: {
    eyebrow: string;
    title: string;
    steps: { title: string; desc: string }[];
  };
  skills: { icon: string; label: string }[];
  support: { text: string; ctaLabel: string };
  platforms: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { logo: string; icon: string; label: string }[];
  };
};

export type AboutContent = {
  eyebrow: string;
  title: string;
  body: string;
  image: CmsImage;
  bullets: { item: string }[];
  expertise: {
    eyebrow: string;
    title: string;
    items: { icon: string; label: string }[];
  };
};

export type PageHeroContent = { eyebrow: string; title: string; subtitle?: string };

export type MiscContent = {
  servicesHero: PageHeroContent;
  portfolioHero: PageHeroContent;
  packagesHero: PageHeroContent;
  testimonialsHero: PageHeroContent;
  contactHero: PageHeroContent;
  contactImage: CmsImage;
  verifyHero: PageHeroContent;
  verifySteps: { icon: string; title: string; desc: string }[];
  blogHero: PageHeroContent;
  paymentNote: {
    title: string;
    body: string;
    methods: { icon: string; label: string }[];
  };
};

export type LegalPage = { title: string; eyebrow: string; html: string };

/* ---------------- readers ---------------- */

function readJson<T>(...segments: string[]): T {
  const file = path.join(CONTENT_DIR, ...segments);
  return JSON.parse(fs.readFileSync(file, "utf8")) as T;
}

function readCollection<T extends { order?: number }>(dir: string): T[] {
  const folder = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(folder)) return [];
  return fs
    .readdirSync(folder)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const data = JSON.parse(fs.readFileSync(path.join(folder, f), "utf8"));
      // The CMS names each file after its slug, so the filename is a reliable
      // fallback if an editor leaves the slug field blank.
      return { _file: f.replace(/\.json$/, ""), ...data } as T & { _file: string };
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/** Turns any editor input into a safe URL segment. */
function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const getSite = () => readJson<SiteSettings>("settings", "site.json");
export const getContact = () => readJson<ContactSettings>("settings", "contact.json");
export const getSocial = () => readJson<SocialSettings>("settings", "social.json");
export const getPayments = () => readJson<PaymentSettings>("settings", "payments.json");
export const getHome = () => readJson<HomeContent>("pages", "home.json");
export const getAbout = () => readJson<AboutContent>("pages", "about.json");
export const getMisc = () => readJson<MiscContent>("pages", "misc.json");

export function getServices(): ServiceCategory[] {
  return readCollection<ServiceCategory & { _file: string }>("services")
    .map((s) => ({
      ...s,
      // Prefer the explicit slug, else fall back to the filename, else the label.
      slug: slugify(s.slug || s._file || s.label || ""),
      shortLabel: s.shortLabel || s.label,
    }))
    .filter((s) => s.slug.length > 0);
}

export const getService = (slug: string) => getServices().find((s) => s.slug === slug);
export const getPortfolio = () => readCollection<PortfolioItem>("portfolio");
export const getTestimonials = () => readCollection<Testimonial>("testimonials");
export const getPackageGroups = () => readCollection<PackageGroup>("package-groups");
export const getFaqs = () => readCollection<FaqItem>("faq");

export function getPackageGroupsByCategory(category: string) {
  return getPackageGroups().filter((g) => g.category === category);
}

/* ---------------- derived helpers ---------------- */

export function getWhatsappLink(message?: string) {
  const base = `https://wa.me/${getContact().whatsappNumber.replace(/[^0-9]/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Replaces the {email} token editors use in CMS copy with a real address. */
export function fillEmail(template: string, email: string) {
  return template.replace(/\{email\}/g, email);
}

/* ---------------- markdown ---------------- */

export function getLegalPage(name: "terms" | "privacy"): LegalPage {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "pages", `${name}.md`), "utf8");
  const { data, content } = matter(raw);
  return {
    title: (data.title as string) ?? name,
    eyebrow: (data.eyebrow as string) ?? "LEGAL",
    html: marked.parse(content, { async: false }) as string,
  };
}

export function getBlogPosts(): BlogPost[] {
  const folder = path.join(CONTENT_DIR, "blog");
  if (!fs.existsSync(folder)) return [];
  return fs
    .readdirSync(folder)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(folder, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title as string,
        date: data.date ? new Date(data.date).toISOString() : new Date(0).toISOString(),
        excerpt: (data.excerpt as string) ?? "",
        coverImage: data.coverImage as CmsImage | undefined,
        author: data.author as string | undefined,
        tags: (data.tags as { tag: string }[] | undefined) ?? [],
        draft: Boolean(data.draft),
        html: marked.parse(content, { async: false }) as string,
      };
    })
    .filter((p) => !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getBlogPost(slug: string) {
  return getBlogPosts().find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
