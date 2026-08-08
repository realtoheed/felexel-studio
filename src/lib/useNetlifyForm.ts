"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

/**
 * Submits to Netlify Forms via AJAX so the visitor stays on the page and
 * sees an inline success message instead of being bounced to a mail client.
 * Requires a matching static form (see NetlifyFormsFallback) so Netlify's
 * build-time scanner registers the form name.
 */
export function useNetlifyForm(formName: string) {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(fields: Record<string, string>) {
    setStatus("submitting");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": formName, ...fields }),
      });
      if (!res.ok) throw new Error(`Netlify Forms responded ${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return { status, submit, reset: () => setStatus("idle") };
}
