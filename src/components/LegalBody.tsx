import Reveal from "./Reveal";

export default function LegalBody({ html }: { html: string }) {
  return (
    <section className="max-w-[800px] mx-auto px-6 pb-[120px]">
      <Reveal direction="up">
        <div className="prose-cms" dangerouslySetInnerHTML={{ __html: html }} />
      </Reveal>
    </section>
  );
}
