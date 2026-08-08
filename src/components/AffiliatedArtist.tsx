"use client";

import { useState } from "react";
import Reveal from "./Reveal";

export default function AffiliatedArtist({ contactEmail }: { contactEmail: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent("Affiliated Artist Verification Request");
    const body = encodeURIComponent(
      `Artist Name: ${name}\nRequester Email: ${email}\nDetails: ${details}`
    );
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <section className="max-w-[800px] mx-auto px-6 pb-[120px]">
      <Reveal direction="up">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-surface border border-text-dim/12 rounded-[20px] p-9"
        >
          <input
            type="text"
            required
            placeholder="Artist Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-text-dim/5 border border-text-dim/15 rounded-[10px] px-4 py-3.5 text-[14.5px] focus:outline-none focus:border-accent"
          />
          <input
            type="email"
            required
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-text-dim/5 border border-text-dim/15 rounded-[10px] px-4 py-3.5 text-[14.5px] focus:outline-none focus:border-accent"
          />
          <textarea
            placeholder="Additional details (optional)"
            rows={3}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="bg-text-dim/5 border border-text-dim/15 rounded-[10px] px-4 py-3.5 text-[14.5px] focus:outline-none focus:border-accent resize-y"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[15px] font-semibold text-white grad-bg shadow-[0_8px_30px_-8px_rgba(139,92,246,0.6)] transition-transform hover:-translate-y-1"
          >
            Submit for Review
          </button>
          <p className="text-[12.5px] text-text-dim text-center">
            We do not display artist names publicly. Every request is checked
            manually by our team.
          </p>
        </form>
      </Reveal>
    </section>
  );
}
