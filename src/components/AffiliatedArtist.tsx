"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import Reveal from "./Reveal";
import { useNetlifyForm } from "@/lib/useNetlifyForm";

export default function AffiliatedArtist() {
  const [artistName, setArtistName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const { status, submit } = useNetlifyForm("affiliated-artist");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const company = (e.currentTarget.elements.namedItem("company") as HTMLInputElement)?.value ?? "";
    submit({ artistName, email, details, company });
  }

  return (
    <section className="max-w-[800px] mx-auto px-6 pb-[120px]">
      <Reveal direction="up">
        {status === "success" ? (
          <div className="flex flex-col items-center justify-center text-center gap-3 py-14 border border-accent/30 bg-accent/5 rounded-[20px]">
            <CheckCircle2 size={36} className="text-accent" />
            <h3 className="text-lg font-semibold">Request received</h3>
            <p className="text-text-dim text-[14.5px] max-w-[360px]">
              Our team will review this manually and reply to your email. We
              don&apos;t display artist names publicly.
            </p>
          </div>
        ) : (
          <form
            name="affiliated-artist"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-surface border border-text-dim/12 rounded-[20px] p-9"
            data-netlify="true"
            netlify-honeypot="company"
          >
            <input type="hidden" name="form-name" value="affiliated-artist" />
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <input
              type="text"
              name="artistName"
              required
              placeholder="Artist Name"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              className="bg-text-dim/5 border border-text-dim/15 rounded-[10px] px-4 py-3.5 text-[14.5px] focus:outline-none focus:border-accent"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-text-dim/5 border border-text-dim/15 rounded-[10px] px-4 py-3.5 text-[14.5px] focus:outline-none focus:border-accent"
            />
            <textarea
              name="details"
              placeholder="Additional details (optional)"
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="bg-text-dim/5 border border-text-dim/15 rounded-[10px] px-4 py-3.5 text-[14.5px] focus:outline-none focus:border-accent resize-y"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[15px] font-semibold text-white grad-bg shadow-[0_8px_30px_-8px_rgba(139,92,246,0.6)] transition-transform hover:-translate-y-1 disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {status === "submitting" ? "Submitting…" : "Submit for Review"}
            </button>
            {status === "error" && (
              <p className="flex items-center gap-2 text-[13px] text-red-400 justify-center">
                <AlertCircle size={15} />
                Something went wrong — please try again.
              </p>
            )}
            <p className="text-[12.5px] text-text-dim text-center">
              We do not display artist names publicly. Every request is checked
              manually by our team.
            </p>
          </form>
        )}
      </Reveal>
    </section>
  );
}
