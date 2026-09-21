# Shoreline Cleaning LLC

Production website for **Shoreline Cleaning LLC**, serving the 757 and surrounding Hampton Roads communities.

- Public site: [https://www.shorelinecleaning757.com](https://www.shorelinecleaning757.com)
- Repo name: `shoreline-cleaning-757`
- Stack: Next.js (App Router) · TypeScript · Tailwind CSS · Sanity CMS · Vercel

Quotes are **not** priced on the website. Visitors submit an intake form; the owner follows up by **call, text, or email**.

---

## Local setup

1. Install Node.js 22+.
2. Clone the repo and install dependencies:

```bash
npm install
```

3. Copy environment variables:

```bash
cp .env.example .env.local
```

4. Start the site:

```bash
npm run dev
```

The site runs without Sanity or Resend. Until those are connected it uses the same placeholder content you will later edit in Studio.

```bash
npm run build      # production build
npm run typecheck  # TypeScript
```

---

## GitHub repository

Suggested remote:

```bash
git init
git add .
git commit -m "Initial Shoreline Cleaning LLC website"
git branch -M main
git remote add origin git@github.com:YOUR_USER/shoreline-cleaning-757.git
git push -u origin main
```

Do not commit `.env.local` or API keys.

---

## Sanity project setup

Ordinary business content is edited in Sanity Studio. No paid Sanity plan is required for normal use.

1. Create a free project at [sanity.io/manage](https://www.sanity.io/manage).
2. Note the **Project ID**. Keep the dataset name `production` unless you have a reason not to.
3. Add to `.env.local` and to Vercel:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-09-01
```

4. In the Sanity project, add CORS origins:
   - `http://localhost:8080` (or your local port)
   - `https://www.shorelinecleaning757.com`
   - your Vercel preview URL
5. Restart the app. Open **`/studio`**.

Until a Project ID is set, `/studio` shows setup instructions and the public site uses built-in placeholder content.

### How to access Studio

- Local: `http://localhost:8080/studio`
- Production: `https://www.shorelinecleaning757.com/studio`

Log in with the Sanity account that owns the project. Invite the business owner as an Editor.

### Draft preview

1. Create a viewer token in Sanity (API → Tokens → Viewer).
2. Set `SANITY_API_READ_TOKEN` (server only).
3. Use Studio’s document list to publish or unpublish. Unpublished services, posts, and pages do not appear on the public site.

---

## How to edit content (no code)

Open `/studio`. Sidebar groups:

| Group | What it controls |
|---|---|
| Site Settings | Name, logo, phone, text, email, hours, social, announcement bar, footer, SEO defaults |
| Pages | Home, About, Service Areas |
| Services | Each cleaning service, including publish/unpublish and order |
| Gallery | Photos with required alt text and categories |
| Before & After | Before/after pairs |
| Reviews | Testimonials. Check **This is a SAMPLE review** for placeholders |
| FAQs | Questions, answers, categories |
| Team | Optional staff bios. Empty until you add people |
| Blog | Posts, categories, SEO, placeholder flag |
| Legal | Privacy and terms (templates until reviewed) |

### Replace placeholder business details

In **Site Settings**, replace these tokens with real values. Until they are real, the site will **not** treat them as clickable contact data:

- `[PHONE NUMBER]`
- `[TEXT NUMBER]`
- `[EMAIL ADDRESS]`
- `[BUSINESS ADDRESS OR SERVICE-AREA BUSINESS]`
- `[BUSINESS HOURS]`
- `[GOOGLE BUSINESS PROFILE URL]`
- `[FACEBOOK URL]`
- `[INSTAGRAM URL]`
- `[BOOKING URL]`

Call/text links and LocalBusiness telephone/email schema appear only after real values are saved.

### Add a service

Studio → Services → Create. Fill name, slug, descriptions, included items, photo + alt text. Set **Published**. Drag **Order** to sort. Unpublish to hide without deleting.

### Add a blog post

Studio → Blog → Posts. Title, slug, author, category, date, featured image + alt, body, SEO fields. Uncheck **Published** until ready. Sample posts are flagged **Mark as sample / draft placeholder**.

### Add a review

Studio → Reviews. Display name, rating (this review only — the site never invents a Google average), text. Uncheck **This is a SAMPLE review** for real quotes.

### Add an FAQ

Studio → FAQs. Question, answer, category, order.

### Add a gallery photo

Studio → Gallery. Upload image, **required alt text**, caption, category.

### Add a before/after pair

Studio → Before & After. Title, before image + alt, after image + alt.

---

## Quote form and email

The form posts to `/api/quote`.

1. Create a [Resend](https://resend.com) account (free tier).
2. Verify a sending domain (or use Resend’s onboarding sender for tests).
3. Set:

```
RESEND_API_KEY=re_...
QUOTE_TO_EMAIL=you@your-inbox.com
QUOTE_FROM_EMAIL=Shoreline Cleaning LLC <quotes@shorelinecleaning757.com>
```

`QUOTE_TO_EMAIL` is the inbox that receives quote requests.

If those keys are missing, the form validates but **does not pretend to send**. Visitors see a clear error. In development, the error mentions configuration.

The form includes a hidden honeypot field (`company`) and a consent checkbox. It does not collect payment information.

---

## Deploy to Vercel from GitHub

1. Import `shoreline-cleaning-757` in Vercel.
2. Framework: Next.js (auto-detected).
3. Add every variable from `.env.example` that you use.
4. Deploy.

### Domain: www + apex redirect

In Vercel → Project → Settings → Domains:

1. Add `www.shorelinecleaning757.com` as the **primary** domain.
2. Add `shorelinecleaning757.com` and set it to **redirect to www**.
3. At your DNS host:
   - `www` → CNAME to `cname.vercel-dns.com`
   - apex `@` → A record `10.0.1.2` (or Vercel’s current apex instructions)

Canonical URLs on the site already use `https://www.shorelinecleaning757.com`.

---

## Analytics and cookies

Analytics are **off** by default. Optional fields live in Site Settings / env:

- Google Analytics ID
- Plausible domain

A cookie banner flag exists in Site Settings and stays disabled until you turn it on and review the privacy policy.

---

## Launch checklist

Provide or confirm before public launch:

- [ ] Sanity project ID and dataset
- [ ] Real phone, text number, email, hours
- [ ] Address or “service-area business” wording
- [ ] Google Business, Facebook, Instagram URLs
- [ ] Real photos (replace sample interiors)
- [ ] Real reviews (uncheck Sample, or unpublish samples)
- [ ] Cities/communities on the Service Areas page
- [ ] Resend API key + quote inbox
- [ ] Privacy and terms reviewed (they are templates)
- [ ] Domain DNS + www redirect
- [ ] Optional: analytics IDs
- [ ] Optional: map embed

---

## Project map

```
src/app/(site)/     Public pages
src/app/studio/     Embedded Sanity Studio
src/app/api/quote/  Quote form endpoint
src/components/     UI and layout
src/lib/content/    Types + placeholder content fallback
src/sanity/         Schemas and Studio structure
public/images/      Replaceable sample photos
```

There are **no prices** on the public site. Service documents may include a pricing *note* such as “Quoted after intake.” Do not add dollar amounts unless you later decide to.

Sample reviews and sample blog posts are labeled on the site.
