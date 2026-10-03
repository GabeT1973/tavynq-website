# Tavynq website

Marketing site for **Tavynq**, a lead generation agency for managed IT service providers
(MSPs). We use signal-based cold email to book qualified sales calls from local businesses.
One-page site with pricing, FAQ, an optional VSL, and a "Book a call" (Calendly) call to
action. Live at https://tavynq.com.

## Editing content

Almost everything you'd want to change lives in **`src/config/site.ts`**:

- niche, offer/headline, hero subhead
- pricing plans (Founding Partner and Standard) and the bad-fit window
- the "qualified call" definition
- Calendly URL, YouTube video ID (the video section stays hidden until it is set), contact
  email, mailing address
- page title, meta description, and social preview text

`index.html`'s `<head>` (title, meta, Open Graph, JSON-LD) is filled from that file at build
time by a small plugin in `vite.config.ts`, so edit the config, not `index.html`.

Real client results go in `src/components/results-section.tsx` (then un-comment
`<ResultsSection />` in `src/pages/home.tsx`). Real results only.

## Stack

React 19 + TypeScript + Vite, Tailwind CSS v4, lucide-react icons, Geist font. Hosted on
Vercel. `api/contact.ts` is a Vercel function that emails contact-form submissions through
[Resend](https://resend.com) from `website@notify.tavynq.com` (env vars: `RESEND_API_KEY`,
required; `CONTACT_TO_EMAIL`, optional, defaults to gabe@tavynq.com).

## Commands

```bash
npm install
npm run dev       # local dev server (no api/ functions; use `vercel dev` for the contact form)
npm run build     # type-check + production build into dist/
npm run lint      # oxlint
npm run preview   # serve the production build
```

## Other files

- `vercel.json`: redirects for removed pages + SPA rewrite.
- `public/robots.txt`, `public/sitemap.xml`, `public/site.webmanifest`: SEO / install metadata.
- `public/og-image.png`: link-preview image, generated from `scripts/og-image.html`
  (regeneration command is at the top of that file).
- `scripts/generate-favicons.mjs`: regenerates the favicon PNG/ICO set.
