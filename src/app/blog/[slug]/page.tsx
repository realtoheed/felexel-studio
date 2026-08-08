import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Reveal from "@/components/Reveal";
import SupportCta from "@/components/SupportCta";
import { formatDate, getBlogPost, getBlogPosts, getSite } from "@/lib/content";

export function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — ${getSite().siteName}`,
    description: post.excerpt,
    openGraph: post.coverImage?.src ? { images: [post.coverImage.src] } : undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = getBlogPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <article className="max-w-[800px] mx-auto px-6 pt-40 pb-[100px]">
        <Reveal direction="up">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-text-dim hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft size={15} />
            All articles
          </Link>

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="text-[13px] text-text-dim">{formatDate(post.date)}</span>
            {post.author && (
              <span className="text-[13px] text-text-dim">· {post.author}</span>
            )}
            {post.tags?.map((t) => (
              <span
                key={t.tag}
                className="text-[11px] font-semibold uppercase tracking-wider text-accent-3 bg-accent/10 px-2 py-0.5 rounded-full"
              >
                {t.tag}
              </span>
            ))}
          </div>

          <h1 className="text-[clamp(30px,4.5vw,46px)] font-semibold leading-tight mb-6">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-text-dim mb-10">{post.excerpt}</p>
          )}
        </Reveal>

        {post.coverImage?.src && (
          <Reveal direction="scale">
            <div className="relative aspect-[16/9] rounded-[24px] overflow-hidden border border-text-dim/12 mb-12">
              <Image
                src={post.coverImage.src}
                alt={post.coverImage.alt}
                fill
                sizes="(max-width: 800px) 100vw, 800px"
                priority
                className="object-cover"
              />
            </div>
          </Reveal>
        )}

        <Reveal direction="up">
          <div className="prose-cms" dangerouslySetInnerHTML={{ __html: post.html }} />
        </Reveal>
      </article>

      {related.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-6 pb-[120px]">
          <Reveal direction="up">
            <h2 className="text-[clamp(24px,3vw,32px)] font-semibold mb-10 text-center">
              Keep reading
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((p, i) => (
              <Reveal key={p.slug} direction="up" delay={i * 0.08}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="block h-full bg-surface border border-text-dim/12 rounded-2xl p-6 transition-all hover:-translate-y-1.5 hover:border-accent"
                >
                  <span className="text-[12px] text-text-dim">{formatDate(p.date)}</span>
                  <h3 className="text-[15.5px] font-semibold mt-2 mb-2 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-[13px] text-text-dim line-clamp-2">{p.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <SupportCta />
    </>
  );
}
