import { NextResponse, type NextRequest } from "next/server";

/**
 * Site-wide Basic Auth gate for client-preview deploys.
 *
 * Netlify's built-in password protection requires a Pro plan; this runs as
 * a Netlify Edge Function instead (free on any plan) so only people with
 * the shared credentials can view the site while it's not ready to launch.
 * Set SITE_LOGIN / SITE_PASSWORD in Netlify → Site configuration →
 * Environment variables, then trigger a redeploy. Remove this file (or the
 * env vars) when the site is ready to go public.
 */
export function proxy(request: NextRequest) {
  const user = process.env.SITE_LOGIN;
  const pass = process.env.SITE_PASSWORD;

  // If no credentials are configured, don't lock anyone out (e.g. local dev).
  if (!user || !pass) return NextResponse.next();

  const authHeader = request.headers.get("authorization");

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const sepIndex = decoded.indexOf(":");
      const suppliedUser = decoded.slice(0, sepIndex);
      const suppliedPass = decoded.slice(sepIndex + 1);
      if (suppliedUser === user && suppliedPass === pass) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Felexel Preview", charset="UTF-8"' },
  });
}

export const config = {
  matcher: [
    /*
     * Match all paths except Next internals and static image files, so the
     * prompt doesn't repeatedly fire for every asset request.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
