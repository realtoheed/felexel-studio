# Felexel Creative Studio — Deployment & Admin Setup

The site is a Next.js app. All editable content lives as files in `/content`,
and the admin panel (Decap CMS) writes changes straight back to GitHub, which
triggers a fresh Netlify build. No database, no server, free tier throughout.

---

## 1. Push to GitHub

This folder (`felexel-next`) is the repository root — push it directly.

```bash
git add .
git commit -m "Felexel site with admin panel"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

> The old static prototype (`index.html`, `style.css`, `script.js`) sits in the
> **parent** folder and is deliberately outside this repo. Nothing to do there.

---

## 2. Create the Netlify site

1. Netlify → **Add new site → Import an existing project** → pick your repo.
2. Netlify auto-detects Next.js. Leave the defaults — `netlify.toml` already sets:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Deploy.

Note your live URL (e.g. `https://felexel.netlify.app`).

---

## 3. Point the site at your real URL

In the admin panel later, or directly in these two files, replace
`https://felexel.netlify.app` with your real domain:

- `content/settings/site.json` → `siteUrl`
- `public/admin/config.yml` → `site_url` and `display_url`
- `public/robots.txt` → the `Sitemap:` line

---

## 4. Turn on Netlify Identity + Git Gateway

This is what lets the client log in to `/admin`.

1. In Netlify: **Site configuration → Identity → Enable Identity**.
2. Under **Identity → Registration**, set **Registration preferences** to
   **Invite only**. (Important — otherwise anyone could sign up and edit.)
3. Under **Identity → Services → Git Gateway**, click **Enable Git Gateway**.
   This is what gives the CMS permission to commit to your repo.

### Invite the client

**Identity → Invite users** → enter their email. They get an email, click the
link, set a password, and land in the admin panel.

---

## 5. Using the admin panel

Go to **`https://your-site.netlify.app/admin`** and log in.

Saving anything commits to GitHub → Netlify rebuilds → live in ~1-2 minutes.

### What's editable

| Section | What it covers |
|---|---|
| **Settings → Site & Branding** | Logos (dark/light/footer), site name, SEO title & description, the amber scam-warning bar |
| **Settings → Contact Details** | WhatsApp number, emails, office addresses & phone numbers |
| **Settings → Social Links** | Instagram / X / YouTube / Facebook URLs — toggle any off to hide its icon |
| **Page Content → Home Page** | Hero copy & buttons, floating images, stat counters, "why choose us", process steps, skills bar, support banner |
| **Page Content → About Page** | About copy, photo, bullet points, expertise list |
| **Page Content → Other Page Headings** | Headings for Services, Portfolio, Packages, Testimonials, Contact, Verify Artist, Blog + the payment info box |
| **Page Content → Terms / Privacy** | Full rich-text legal pages |
| **Services** | Add / edit / delete service categories. Each one automatically gets its own page at `/services/<slug>` and appears in the Services dropdown |
| **Portfolio** | Add / remove work samples |
| **Testimonials** | Add / remove client quotes with photo and star rating |
| **Packages** | Add / remove pricing plans |
| **FAQ** | Add / remove questions |
| **Blog** | Write, edit and delete posts. Tick **Save as draft** to keep one hidden |

### Images and alt text

Every image field has a matching **Alt text** box right underneath it. Alt text
describes the image for screen readers and Google — always fill it in.

Uploads go to `public/images` and are available in the shared media library, so
an image uploaded once can be reused anywhere.

### A few rules worth knowing

- **Display order** — most collections have an order number. Lower shows first.
- **Service URL slug** — avoid changing it after launch; the old link will 404.
- **Portfolio "Category"** — set it to a service name (e.g. `Animation`) and that
  item automatically appears on that service's page. `Streaming Graphics` also
  shows under Graphic Design.
- **`{email}` token** — in the warning bar and support banner, write `{email}`
  where the support address should appear. It becomes a clickable link.
- **Hero "words to colour purple"** — must exactly match a phrase inside the
  headline, otherwise nothing is highlighted.

---

## 6. Custom domain (optional)

**Domain management → Add a domain** → follow the DNS instructions. Netlify
issues a free HTTPS certificate automatically. After that, update the three
URL references from step 3.

---

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

The admin panel needs Netlify Identity, so `/admin` only works on the deployed
site. To edit locally, change the files in `/content` directly — or run
`npx decap-server` and temporarily set the backend in `public/admin/config.yml`
to:

```yaml
backend:
  name: proxy
  proxy_url: http://localhost:8081/api/v1
```

(Revert that before pushing.)

---

## Troubleshooting

**"Failed to load config.yml"** — usually an indentation slip in
`public/admin/config.yml`. YAML is whitespace-sensitive.

**Login works but saving fails** — Git Gateway isn't enabled, or the repo was
renamed. Re-enable under Identity → Services → Git Gateway.

**Edits saved but site unchanged** — check **Deploys** in Netlify; the build may
still be running or may have failed.

**Anyone can sign up** — set Registration to **Invite only** (step 4.2).
