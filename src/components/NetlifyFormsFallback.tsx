/**
 * Netlify detects forms by scanning the static HTML it builds — it can't see
 * forms that only exist after client-side JS runs. Next.js SSGs our real
 * forms into the initial HTML too, so that alone usually works, but shipping
 * a second, always-static copy here guarantees Netlify registers both forms
 * regardless of how the app-router output happens to be structured. These
 * are never shown to visitors.
 */
export default function NetlifyFormsFallback() {
  return (
    <div style={{ display: "none" }} aria-hidden="true">
      <form name="contact" data-netlify="true" netlify-honeypot="company">
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="text" name="subject" />
        <textarea name="message" />
        <input type="text" name="company" />
      </form>
      <form name="affiliated-artist" data-netlify="true" netlify-honeypot="company">
        <input type="text" name="artistName" />
        <input type="email" name="email" />
        <textarea name="details" />
        <input type="text" name="company" />
      </form>
    </div>
  );
}
