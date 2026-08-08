import Link from "next/link";
import Logo from "./Logo";
import {
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
  FacebookIcon,
} from "./SocialIcons";
import { getContact, getSite, getSocial, getWhatsappLink } from "@/lib/content";

const SOCIAL_ICONS: Record<string, typeof InstagramIcon> = {
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  youtube: YoutubeIcon,
  facebook: FacebookIcon,
};

const SOCIAL_LABELS: Record<string, string> = {
  instagram: "Instagram",
  twitter: "Twitter / X",
  youtube: "YouTube",
  facebook: "Facebook",
};

export default function Footer() {
  const site = getSite();
  const contact = getContact();
  const socials = getSocial().links.filter((s) => s.enabled && s.url);

  return (
    <footer className="bg-[#08080c] px-6 pt-[70px] pb-6 border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10">
        <div>
          <Logo
            variant="dark"
            darkSrc={site.footerLogoDark}
            lightSrc={site.logoLight}
            siteName={site.siteName}
          />
          <p className="text-text-dim text-sm mt-3.5">{site.footerTagline}</p>
          {socials.length > 0 && (
            <div className="flex gap-3 mt-5">
              {socials.map((s) => {
                const IconCmp = SOCIAL_ICONS[s.platform];
                if (!IconCmp) return null;
                return (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={SOCIAL_LABELS[s.platform] ?? s.platform}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-text-dim hover:text-accent-3 hover:border-accent-3/40 transition-colors"
                  >
                    <IconCmp size={16} />
                  </a>
                );
              })}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4 text-white">Company</h4>
          <Link href="/about" className="block text-text-dim text-sm mb-2.5 hover:text-accent-3">
            About Us
          </Link>
          <Link href="/portfolio" className="block text-text-dim text-sm mb-2.5 hover:text-accent-3">
            Our Portfolio
          </Link>
          <Link href="/testimonials" className="block text-text-dim text-sm mb-2.5 hover:text-accent-3">
            Testimonials
          </Link>
          <Link href="/packages" className="block text-text-dim text-sm mb-2.5 hover:text-accent-3">
            Our Packages
          </Link>
          <Link href="/blog" className="block text-text-dim text-sm mb-2.5 hover:text-accent-3">
            Blog
          </Link>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4 text-white">Legal</h4>
          <Link href="/terms" className="block text-text-dim text-sm mb-2.5 hover:text-accent-3">
            Terms &amp; Conditions
          </Link>
          <Link href="/privacy" className="block text-text-dim text-sm mb-2.5 hover:text-accent-3">
            Privacy Policy
          </Link>
          <Link
            href="/affiliated-artist"
            className="block text-text-dim text-sm mb-2.5 hover:text-accent-3"
          >
            Verify an Artist
          </Link>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4 text-white">Contact</h4>
          <Link href="/contact" className="block text-text-dim text-sm mb-2.5 hover:text-accent-3">
            Contact Us
          </Link>
          <a
            href={getWhatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-text-dim text-sm mb-2.5 hover:text-accent-3"
          >
            WhatsApp
          </a>
          <a
            href={`mailto:${contact.contactEmail}`}
            className="block text-text-dim text-sm mb-2.5 hover:text-accent-3"
          >
            {contact.contactEmail}
          </a>
        </div>
      </div>

      {contact.branches.length > 0 && (
        <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {contact.branches.map((b) => (
            <div key={b.name}>
              <h4 className="text-[13px] font-semibold mb-2 text-white">{b.name}</h4>
              <p className="text-text-dim text-[13px] leading-relaxed">{b.address}</p>
              {b.phones?.map((p) => (
                <a
                  key={p.number}
                  href={`tel:${p.number.replace(/[^0-9+]/g, "")}`}
                  className="block text-text-dim text-[13px] mt-1 hover:text-accent-3"
                >
                  {p.number}
                </a>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-[1200px] mx-auto mt-12 pt-6 border-t border-white/[0.06] text-center text-text-dim text-[13px]">
        <p>{site.copyright}</p>
      </div>
    </footer>
  );
}
