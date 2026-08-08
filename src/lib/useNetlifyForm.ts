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
 *
 * Posts to /__forms.html rather than "/" — Next.js's App Router output isn't
 * plain static HTML, so Netlify can't scan the live pages to register a
 * form. public/__forms.html is a genuinely static file with the same form
 * names/fields that Netlify's build-time bot picks up instead; submissions
 * to any registered form name land in the same place regardless of which
 * URL they're posted from. See public/__forms.html for details.
 */
export function useNetlifyForm(formName: string) {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(fields: Record<string, string>) {
    setStatus("submitting");
    try {
      const res = await fetch("/__forms.html", {
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
