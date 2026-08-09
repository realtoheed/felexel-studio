"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CreditCard, X, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";
import PayPalButton from "./PayPalButton";
import { useNetlifyForm } from "@/lib/useNetlifyForm";
import type { PaymentSettings } from "@/lib/content";

type Step = "form" | "options" | "paid";

export default function PayNowButton({
  payments,
  whatsappLink,
}: {
  payments: PaymentSettings;
  whatsappLink: string;
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pkg, setPkg] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const { status, submit, reset } = useNetlifyForm("pay-now");

  const close = useCallback(() => {
    setOpen(false);
    setStep("form");
    reset();
  }, [reset]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const company = (e.currentTarget.elements.namedItem("company") as HTMLInputElement)?.value ?? "";
    if (company) return; // honeypot tripped — silently drop the submission
    submit({ name, email, package: pkg, amount, notes }).then(() => setStep("options"));
  }

  const whatsappMessage = [
    `Hi, I'd like to pay for a package.`,
    `Name: ${name}`,
    pkg && `Package: ${pkg}`,
    amount && `Amount: $${amount}`,
    notes && `Notes: ${notes}`,
  ]
    .filter(Boolean)
    .join("\n");

  const numericAmount = Number(amount);
  const canUsePaypal = payments.paypalClientId.trim().length > 0 && numericAmount > 0;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 justify-center rounded-full px-[18px] py-[10px] text-[13.5px] font-semibold text-white grad-bg shadow-[0_8px_24px_-8px_rgba(139,92,246,0.6)] transition-transform hover:-translate-y-0.5 whitespace-nowrap"
      >
        <CreditCard size={15} />
        Pay Now
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            role="dialog"
            aria-modal="true"
            aria-label="Pay now"
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative w-full max-w-[440px] max-h-[85vh] overflow-y-auto bg-surface border border-text-dim/12 rounded-[24px] p-7 md:p-8"
            >
              <button
                onClick={close}
                aria-label="Close"
                className="absolute top-5 right-5 text-text-dim hover:text-text transition-colors"
              >
                <X size={20} />
              </button>

              {step === "form" && (
                <>
                  <h3 className="text-xl font-semibold mb-1.5">Pay Now</h3>
                  <p className="text-text-dim text-[14px] mb-6">
                    Tell us a bit about your order — we&apos;ll confirm it and get you paid up in a minute.
                  </p>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
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
                      required
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-text-dim/5 border border-text-dim/15 rounded-[10px] px-4 py-3 text-[14.5px] focus:outline-none focus:border-accent"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-text-dim/5 border border-text-dim/15 rounded-[10px] px-4 py-3 text-[14.5px] focus:outline-none focus:border-accent"
                    />
                    <input
                      type="text"
                      placeholder="Package / Service (e.g. Standard Logo Package)"
                      value={pkg}
                      onChange={(e) => setPkg(e.target.value)}
                      className="bg-text-dim/5 border border-text-dim/15 rounded-[10px] px-4 py-3 text-[14.5px] focus:outline-none focus:border-accent"
                    />
                    <input
                      type="number"
                      min="1"
                      step="0.01"
                      required
                      placeholder="Amount (USD)"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-text-dim/5 border border-text-dim/15 rounded-[10px] px-4 py-3 text-[14.5px] focus:outline-none focus:border-accent"
                    />
                    <textarea
                      placeholder="Notes (optional)"
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="bg-text-dim/5 border border-text-dim/15 rounded-[10px] px-4 py-3 text-[14.5px] focus:outline-none focus:border-accent resize-y"
                    />
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="mt-1.5 inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[15px] font-semibold text-white grad-bg shadow-[0_8px_30px_-8px_rgba(139,92,246,0.6)] transition-transform hover:-translate-y-1 disabled:opacity-60 disabled:hover:translate-y-0"
                    >
                      {status === "submitting" ? "Submitting…" : "Continue"}
                    </button>
                    {status === "error" && (
                      <p className="flex items-center gap-2 text-[13px] text-red-400 justify-center">
                        <AlertCircle size={15} />
                        Something went wrong — please try again.
                      </p>
                    )}
                  </form>
                </>
              )}

              {step === "options" && (
                <>
                  <div className="flex items-center gap-2 text-accent mb-1.5">
                    <CheckCircle2 size={20} />
                    <h3 className="text-xl font-semibold text-text">Request received</h3>
                  </div>
                  <p className="text-text-dim text-[14px] mb-6">
                    Choose how you&apos;d like to pay — WhatsApp confirmation is fastest, or pay
                    directly with PayPal below.
                  </p>

                  <a
                    href={`${whatsappLink}?text=${encodeURIComponent(whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full px-6 py-3.5 mb-4 text-[14.5px] font-semibold text-white bg-[#25D366] shadow-[0_8px_24px_-8px_rgba(37,211,102,0.6)] transition-transform hover:-translate-y-0.5"
                  >
                    <MessageCircle size={18} />
                    Continue on WhatsApp
                  </a>

                  <div className="relative flex items-center gap-3 my-5">
                    <div className="h-px flex-1 bg-text-dim/15" />
                    <span className="text-[12px] text-text-dim">or pay with PayPal</span>
                    <div className="h-px flex-1 bg-text-dim/15" />
                  </div>

                  {canUsePaypal ? (
                    <PayPalButton
                      clientId={payments.paypalClientId}
                      currency={payments.paypalCurrency || "USD"}
                      amount={numericAmount}
                      description={pkg || "Felexel Creative Studio order"}
                      onSuccess={() => setStep("paid")}
                      onError={() => setStep("options")}
                    />
                  ) : (
                    <p className="text-center text-[13px] text-text-dim bg-text-dim/5 border border-text-dim/12 rounded-xl px-4 py-3.5">
                      Online PayPal payment is coming soon. For now, please confirm and pay via
                      WhatsApp above.
                    </p>
                  )}
                </>
              )}

              {step === "paid" && (
                <div className="flex flex-col items-center text-center gap-3 py-6">
                  <CheckCircle2 size={40} className="text-accent" />
                  <h3 className="text-xl font-semibold">Payment successful</h3>
                  <p className="text-text-dim text-[14.5px]">
                    Thanks, {name || "there"}! We&apos;ve received your payment and will start on
                    your order shortly. A confirmation has been sent to {email}.
                  </p>
                  <button
                    onClick={close}
                    className="mt-2 inline-flex items-center justify-center rounded-full px-7 py-3 text-[14px] font-semibold border border-text-dim/25 hover:border-accent hover:text-accent transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
