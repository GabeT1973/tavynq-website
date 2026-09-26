# Tavynq website

Marketing site for Tavynq: missed-call text-back automation for HVAC, plumbing, and roofing
companies in the Tampa Bay / Pasco area. Hosted on Vercel, repo on GitHub (GabeT1973).

## Goal of this site
- Convert local trade business owners into booked demo calls.
- Audience: busy owners, often on their phone, not technical. Clear, plain, trustworthy copy.
- Every page needs one obvious call to action (book a call / text us).

## Stack
- Framework: React 19 + TypeScript SPA, built with Vite 8. Routing via `react-router-dom` v7
  (routes in `src/App.tsx`: `/`, `/contact`, `/privacy`, `/terms`, `/cancellation-policy`).
- Styling: Tailwind CSS v4 (via `@tailwindcss/vite`, no tailwind.config — theme lives in
  `src/index.css`), shadcn/ui components (`src/components/ui`, config in `components.json`),
  Radix UI, lucide-react icons, Geist font. Light/dark theme in `src/lib/theme.tsx`.
- Path alias: `@/` -> `src/`.
- Layout: `src/pages/` (one file per route), `src/components/` (sections, header/footer),
  `src/lib/` (utils, `usePageMeta` for per-page title + meta description).
- API: Vercel serverless functions in `api/`. `api/contact.ts` handles POST `/api/contact`
  from the contact page and emails the submission via nodemailer/SMTP.
  Env vars: `SMTP_HOST`, `SMTP_PORT` (default 587), `SMTP_USER`, `SMTP_PASS`,
  `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
- SEO note: it's a client-rendered SPA — page titles/meta are set at runtime by `usePageMeta`;
  `index.html` holds the default title/meta crawlers see first.
- Deploy: Vercel, auto-deploys from `main`. `vercel.json` rewrites every non-`/api/` path to
  `index.html` for client-side routing.

## Commands
- Dev server: `npm run dev` (Vite only — does NOT run `api/` functions; use `vercel dev`
  to test the contact form locally)
- Build: `npm run build` (`tsc -b && vite build`, output in `dist/`)  <- run this before saying you're done
- Lint: `npm run lint` (oxlint)
- Preview prod build: `npm run preview`
- Regenerate favicons: `node scripts/generate-favicons.mjs`

## Rules for this repo
- Mobile-first. Check layouts at phone width.
- Keep pages fast: optimize images, avoid heavy libraries.
- Forms / webhooks go to n8n. Webhook URLs live in env vars, never hardcoded.
- Work on a branch, commit when a step is done. Ask before pushing to `main` (that deploys live).
- Local SEO matters: include service area (Lutz, Land O' Lakes, Wesley Chapel, Tampa) in
  titles/meta where natural.
