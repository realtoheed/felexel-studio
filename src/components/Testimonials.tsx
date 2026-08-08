import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import Reveal from "./Reveal";
import { getTestimonials } from "@/lib/content";

export default function Testimonials({ showMore = false }: { showMore?: boolean }) {
  const testimonials = getTestimonials();

  return (
    <section className="max-w-[1200px] mx-auto px-6 pb-[120px] text-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <Reveal key={t.author} direction="up" delay={i * 0.1}>
            <div className="text-left bg-surface border border-text-dim/12 rounded-[20px] p-8 h-full flex flex-col">
              <div className="flex gap-0.5 text-accent mb-4">
                {Array.from({ length: t.rating || 5 }).map((_, idx) => (
                  <Star key={idx} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-[15px] text-text italic mb-6 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-text-dim/15">
                  <Image
                    src={t.avatar.src}
                    alt={t.avatar.alt}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <h4 className="text-[13.5px] text-text-dim font-semibold">{t.author}</h4>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      {showMore && (
        <Reveal direction="up" className="mt-12">
          <Link
            href="/testimonials"
            className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[15px] font-semibold border border-text-dim/25 hover:border-accent hover:text-accent transition-colors"
          >
            Load More
          </Link>
        </Reveal>
      )}
    </section>
  );
}
