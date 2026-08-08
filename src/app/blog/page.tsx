import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import ExploreCta from "@/components/ExploreCta";
import { formatDate, getBlogPosts, getMisc, getSite } from "@/lib/content";

export function generateMetadata(): Metadata {
  const { blogHero } = getMisc();
  return {
    title: `Blog — ${getSite().siteName}`,
    description: blogHero.subtitle,
  };
}

export default function BlogPage() {
  const { blogHero } = getMisc();
  const posts = getBlogPosts();

  return (
    <>
      <PageHero
        eyebrow={blogHero.eyebrow}
        title={blogHero.title}
        subtitle={blogHero.subtitle}
      />

      <section className="max-w-[1200px] mx-auto px-6 pb-[120px]">
        {posts.length === 0 ? (
          <p className="text-center text-text-dim">
            No posts published yet — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <Reveal key={post.slug} direction="up" delay={(i % 3) * 0.08}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block h-full bg-surface border border-text-dim/12 rounded-[20px] overflow-hidden transition-all hover:-translate-y-1.5 hover:border-accent"
                >
                  {post.coverImage?.src && (
                    <TiltCard className="aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.coverImage.src}
                        alt={post.coverImage.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </TiltCard>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="text-[12px] text-text-dim">
                        {formatDate(post.date)}
                      </span>
                      {post.tags?.slice(0, 2).map((t) => (
                        <span
                          key={t.tag}
                          className="text-[11px] font-semibold uppercase tracking-wider text-accent-3 bg-accent/10 px-2 py-0.5 rounded-full"
                        >
                          {t.tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-[18px] font-semibold mb-2 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-[13.5px] text-text-dim line-clamp-3">
                      {post.excerpt}
                    </p>
                    <span className="inline-block mt-4 text-[13px] font-semibold text-accent">
                      Read article →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <ExploreCta />
    </>
  );
}
