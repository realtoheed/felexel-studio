"use client";

import { useEffect } from "react";

/**
 * Netlify Identity emails (invite / password reset / email confirm) link to the
 * site root with a token in the URL hash. Those tokens have to be handled by the
 * Identity widget, which only lives on /admin. Rather than shipping the widget
 * on every page, we just forward the hash to /admin when a token is present.
 */
export default function IdentityRedirect() {
  useEffect(() => {
    const hash = window.location.hash;
    const isToken =
      hash.includes("invite_token=") ||
      hash.includes("recovery_token=") ||
      hash.includes("confirmation_token=") ||
      hash.includes("email_change_token=");

    if (isToken && !window.location.pathname.startsWith("/admin")) {
      window.location.replace(`/admin/${hash}`);
    }
  }, []);

  return null;
}
