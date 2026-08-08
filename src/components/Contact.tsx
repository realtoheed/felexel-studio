"use client";

import { useState } from "react";
import { Mail, LifeBuoy, MessageCircle } from "lucide-react";
import Reveal from "./Reveal";

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const sub = encodeURIComponent(subject || "New Project Inquiry");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${contactEmail}?subject=${sub}&body=${body}`;
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                required
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-text-dim/5 border border-text-dim/15 rounded-[10px] px-4 py-3.5 text-[14.5px] focus:outline-none focus:border-accent"
              />
              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-text-dim/5 border border-text-dim/15 rounded-[10px] px-4 py-3.5 text-[14.5px] focus:outline-none focus:border-accent"
              />
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-text-dim/5 border border-text-dim/15 rounded-[10px] px-4 py-3.5 text-[14.5px] focus:outline-none focus:border-accent"
              />
              <textarea
                required
                placeholder="Your Message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-text-dim/5 border border-text-dim/15 rounded-[10px] px-4 py-3.5 text-[14.5px] focus:outline-none focus:border-accent resize-y"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[15px] font-semibold text-white grad-bg shadow-[0_8px_30px_-8px_rgba(139,92,246,0.6)] transition-transform hover:-translate-y-1"
              >
                Send Message
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
