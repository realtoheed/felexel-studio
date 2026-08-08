"use client";

import { useState } from "react";
import { Mail, LifeBuoy, MessageCircle, CheckCircle2, AlertCircle } from "lucide-react";
import Reveal from "./Reveal";
import { useNetlifyForm } from "@/lib/useNetlifyForm";

export default function Contact({
  contactEmail,
  supportEmail,
  whatsappLink,
}: {
  contactEmail: string;
  supportEmail: string;
  whatsappLink: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { status, submit } = useNetlifyForm("contact");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const company = (e.currentTarget.elements.namedItem("company") as HTMLInputElement)?.value ?? "";
    if (company) return; // honeypot tripped — silently drop the submission
    submit({ name, email, subject, message, company });
  }

  return (
    <section className="max-w-[1200px] mx-auto px-6 pb-[120px]">
      <div className="bg-surface rounded-[20px] md:rounded-[32px] py-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center px-6 md:px-10">
          <Reveal direction="left">
            <h2 className="text-2xl font-semibold mb-[18px]">Send us a message</h2>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 justify-center rounded-full px-7 py-3.5 text-[15px] font-semibold text-white grad-bg shadow-[0_8px_30px_-8px_rgba(139,92,246,0.6)] transition-transform hover:-translate-y-1 mb-6"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>
            <div className="flex items-center gap-2.5 text-[14.5px] text-text-dim mt-2">
              <Mail size={16} className="text-accent-3" />
              <strong className="text-text">Email:</strong> {contactEmail}
            </div>
            <div className="flex items-center gap-2.5 text-[14.5px] text-text-dim mt-2">
              <LifeBuoy size={16} className="text-accent-3" />
              <strong className="text-text">Support:</strong> {supportEmail}
            </div>
          </Reveal>

          <Reveal direction="right">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center gap-3 h-full py-10 border border-accent/30 bg-accent/5 rounded-2xl">
                <CheckCircle2 size={36} className="text-accent" />
                <h3 className="text-lg font-semibold">Message sent</h3>
                <p className="text-text-dim text-[14.5px] max-w-[320px]">
                  Thanks — we&apos;ll get back to you within 24 hours. For a
                  faster reply, message us on WhatsApp.
                </p>
              </div>
            ) : (
              <form name="contact" onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Honeypot: hidden from real visitors, bots tend to fill every field */}
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
                  name="name"
                  required
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-text-dim/5 border border-text-dim/15 rounded-[10px] px-4 py-3.5 text-[14.5px] focus:outline-none focus:border-accent"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-text-dim/5 border border-text-dim/15 rounded-[10px] px-4 py-3.5 text-[14.5px] focus:outline-none focus:border-accent"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="bg-text-dim/5 border border-text-dim/15 rounded-[10px] px-4 py-3.5 text-[14.5px] focus:outline-none focus:border-accent"
                />
                <textarea
                  name="message"
                  required
                  placeholder="Your Message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-text-dim/5 border border-text-dim/15 rounded-[10px] px-4 py-3.5 text-[14.5px] focus:outline-none focus:border-accent resize-y"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[15px] font-semibold text-white grad-bg shadow-[0_8px_30px_-8px_rgba(139,92,246,0.6)] transition-transform hover:-translate-y-1 disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {status === "submitting" ? "Sending…" : "Send Message"}
                </button>
                {status === "error" && (
                  <p className="flex items-center gap-2 text-[13px] text-red-400">
                    <AlertCircle size={15} />
                    Something went wrong — please try WhatsApp instead.
                  </p>
                )}
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
