# SignalFill - Project Context

**Rebranded 2026-10-05: Tavynq -> SignalFill.** If you see "Tavynq" anywhere below this
line, it's historical narrative describing what was true at the time it was written (old
branch names, old file names). The live brand, domain, and email are SignalFill /
signalfill.com / gabe@signalfill.com. See "Where we left off" for the rebrand details.

## Who I am
Gabriel, solo founder. I work a 9-5 and want this
business to replace it. Lean budget: about $300
total startup. Keep tasks small and explain what
you're doing in plain English.

## The business (revamped Oct 2026)
- OLD: missed-call text-back automation for HVAC,
  plumbing, and roofing. Now PARKED. Do not use it
  in site copy, emails, or sales material unless
  I ask.
- NEW: B2B lead generation agency. We use cold
  email to book qualified sales calls for B2B
  businesses. We use the same system to win our
  own clients, which proves it works.
- Niche: managed IT service providers (MSPs).
  We email local businesses on the MSP's behalf.
  No trades or homeowner-facing niches.
- Offer: "Qualified sales calls for MSPs, without
  relying on referrals." We email local
  businesses with a real reason to talk.
  Delivered via the SignalFill Pipeline System.
- Contract: month-to-month, 14 days' written
  notice either side. Setup fee non-refundable
  once campaigns launch. Calls billed monthly.
- Pricing: Founding Partner (first 3 MSPs only):
  $750 setup + $250 per qualified call, in
  exchange for permission to publish a case
  study. Standard: $1,500 setup + $250 per
  qualified call. "Qualified call" is defined in
  writing. No-shows are never billed.
- Edge: signal-based targeting (public signals
  only, never scan anyone's systems), Bad-Fit Free
  (24h to flag a call; flagged calls not billed),
  a one-page Meeting Brief before every call,
  email only with client approval of every
  message, client owns domains/lists/copy, one
  MSP per metro, replies within minutes.
- Site copy: no statistics, reply rates, or
  results claims until we have real data. No
  compliance deadline claims (CMMC, HIPAA).

## How the business runs
Funnel: cold email > reply > video (VSL) > book
call (Calendly) > sales call > invoice (Stripe)
> client onboarding > run the same system for
the client.
- NO cold calling. The only calls are ones
  prospects book themselves.

## Lean tech stack
- Website: this repo (GitHub: GabeT1973),
  deployed on Vercel
- Sending: lookalike .com domains (Porkbun),
  Microsoft 365 Business Basic month-to-month,
  3 inboxes per domain, Smartlead Base,
  20-30 emails per inbox per day, 14-day warmup
- Leads: Apollo free account for filtering,
  small batches (~2,000), verify before sending
- Automation: n8n. Claude classifies replies.
  Smartlead webhooks are Pro-only, so n8n watches
  the Outlook inboxes directly instead.
- Free tools: Calendly, Google Meet, unlisted
  YouTube for the VSL

## Rules
- Never send cold email from signalfill.com. Burner
  lookalike domains only.
- No fake testimonials, stats, client logos,
  reviews, or case studies. Real results only.
  Use clearly marked placeholders until then.
- Cold emails: short, plain text, readable in
  20 seconds, include opt-out + business address
  (CAN-SPAM).
- Prefer free tools. Ask before adding any paid
  service or heavy library.
- Ask before big or destructive changes. Work on
  branches. Never merge to main without my OK.
- Outreach that mentions security gaps (e.g.
  public email security records) must be factual
  and helpful, never alarming. No scare tactics
  or threat-based urgency.

## Website goal
One page: nav, hero offer, VSL, problem, how it
works (4 steps), what's included, pricing, proof
line, FAQ, final CTA, footer. Keep the existing
aesthetic and dark/light mode. All editable values
(niche, prices, Calendly URL, YouTube ID, email,
address) live in ONE config file.

## Roadmap (what you'll help me build)
1. Website revamp (done, live on www.signalfill.com as of the rebrand)
2. SignalFill Signal Scanner (next): its own project
   at C:\dev\signalfill-signal-scanner, not this repo.
   Replaces the old "lead list scripts" step.
3. n8n reply agent: classify replies, draft
   responses, text me hot leads, auto-send the
   VSL + Calendly link to clear "yes" replies
4. Client onboarding form + weekly client report
   generator from Smartlead exports
5. Optional: AI-written first lines per lead

---

# Codebase (technical notes)

## Stack
- Framework: React 19 + TypeScript SPA, built with Vite 8. Routing via `react-router-dom` v7
  (routes in `src/App.tsx`: `/`, `/contact`, `/privacy`, `/terms`, plus a `*` 404 page).
- Styling: Tailwind CSS v4 (via `@tailwindcss/vite`, no tailwind.config — theme lives in
  `src/index.css`), shadcn/ui components (`src/components/ui`, config in `components.json`),
  Radix UI, lucide-react icons, Geist font. Light/dark theme in `src/lib/theme.tsx`.
- Path alias: `@/` -> `src/`.
- Layout: `src/pages/` (one file per route), `src/components/` (sections, header/footer),
  `src/lib/` (utils, `usePageMeta` for per-page title + meta description).
- API: Vercel serverless functions in `api/`. `api/contact.ts` handles POST `/api/contact`
  from the contact page and emails the submission through the Resend API (plain `fetch`,
  no SDK), from `website@notify.signalfill.com` with Reply-To set to the visitor.
  Env vars: `RESEND_API_KEY` (required), `CONTACT_TO_EMAIL` (optional, defaults to
  gabe@signalfill.com; not currently set in Vercel, so the code default is what counts).
  `notify.signalfill.com` must stay verified in Resend.
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
- Regenerate logo mark + favicons + app icons from the master logo:
  `npm i --no-save sharp potrace && node scripts/generate-brand-assets.mjs`

## Rules for this repo
- Mobile-first. Check layouts at phone width.
- Keep pages fast: optimize images, avoid heavy libraries.
- Forms / webhooks go to n8n. Webhook URLs live in env vars, never hardcoded.
- Work on a branch, commit when a step is done. Ask before pushing to `main` (that deploys live).
- Every page needs one obvious call to action (book a call).
- Never commit `My workflow.json` (n8n export, may contain private webhook URLs). It's gitignored.
  Stage files by name; don't use `git add -A`.

# Where we left off (2026-10-04)

**Live on tavynq.com.** `revamp-leadgen` (the full MSP revamp) was merged into `main` on
2026-10-03 and deployed to production. The branch is kept. For new work, branch off `main`.
Vercel builds a preview per pushed branch; find its URL in the GitHub commit status (no `gh`
or `vercel` CLI installed). If a push shows no Vercel status after ~5 minutes, Vercel missed
it: push an empty commit (`git commit --allow-empty`) to retrigger. This happened once on
`main` (2026-10-04).

Done:
- One-page MSP site: hero, problem, Pipeline System (4 steps), How we're different (6),
  what's included, pricing (Founding Partner + Standard), proof line, FAQ, final CTA.
- All editable values in `src/config/site.ts`; `<head>` meta/OG/JSON-LD built from it.
- Theme follows system + remembers choice. Share image (`scripts/og-image.html`).
- Logo mark (live 2026-10-04, branch `add-logo-mark`):
  - Master: `src/assets/brand/tavynq-logo-master.png` (1408x768 PNG with real alpha). Never
    edit it; regenerate everything with `scripts/generate-brand-assets.mjs`. The earlier
    `tavynq-logo.jpeg` had a baked-in checkerboard and must not be used.
  - Header/footer: `src/components/logo.tsx`, mark 33x28 (1x/2x/3x WebP + PNG fallback),
    decorative alt, 8px gap, wordmark sheen kept. Dark mode only: brightness(1.35) + soft
    blue drop-shadow so the dark metal reads on the near-black header. Footer uses h-6.
  - Tab icons: flat #3b82f6 traced silhouette (favicon.svg, 16/32 PNG, ICO 16/32/48).
    Home-screen: full mark + glow on #0a0a0a (apple-touch 180, 192, 512, maskable 512).
  - Icon URLs in `index.html` and the manifest carry `?v=2`; bump it when icons change.
  - The share image (`scripts/og-image.html`) shows the mark next to the name.
- Hero grid (2026-10-04): loops seamlessly (moves exactly 10 cells per 6s cycle) and,
  by Gabe's decision, animates even with prefers-reduced-motion. Everything else still
  respects reduced motion.
- Premium polish: three-part sticky header with scrollspy, wordmark sheen, shared
  section/card styles, glowing Founding Partner card.
- Final section: "What happens after you book" timeline + inline Calendly embed
  (loads on scroll, theme colors on paid plans, falls back to a Book a call link).
- `/contact` is "Ask a question" (name, work email, website, optional metro, question);
  `api/contact.ts` emails it, metro included. Privacy + Terms rewritten (DRAFT).
- Removed `/cancellation-policy`; old URLs redirect in `vercel.json`. 404 page added.
- Lighthouse (preview, mobile): perf 90+, a11y 100, best practices 100, SEO 100 apart
  from the preview-only noindex.
- Calendly link and business address set in `src/config/site.ts`; Calendly event updated
  for the MSP offer (30 min).
- Privacy + Terms reviewed by Gabe (code comments still say DRAFT; remove if desired).
- Contact form fix (2026-10-03): production SMTP login failed (535 5.7.8 Authentication
  failed), so `api/contact.ts` now sends through Resend and nodemailer/SMTP were removed.
  Preview delivery confirmed; merged to `main` and live on 2026-10-04. Old SMTP_* and
  CONTACT_FROM_EMAIL env vars in Vercel are no longer used.

Later / optional:
- `youtubeId` once the VSL is recorded (video section + Watch button appear automatically).
- Real case studies in `src/components/results-section.tsx` (Founding Partners).
- Replace `/contact` with a "Free Local Signal Snapshot" form (website + metro) once
  the Signal Scanner is built.
- Prerender the homepage (React Router framework mode, `ssr: false` + `prerender`) so AI
  crawlers, which don't run JS, can read the copy.

Next on the roadmap: #2 the SignalFill Signal Scanner, built in its own folder at
`C:\dev\signalfill-signal-scanner` (separate from this website repo).

# Where we left off (2026-10-05)

**Rebrand in progress: Tavynq -> SignalFill, branch `rebrand-signalfill`, not yet merged.**
Gabe already added signalfill.com + www to the Vercel project (verified, redirects to www),
set up gabe@signalfill.com in Zoho Mail, and verified notify.signalfill.com in Resend with
a RESEND_API_KEY that works for both notify domains.

Done on the branch:
- Name/domain/email swapped everywhere: `src/config/site.ts` (name, legalName, url ->
  https://www.signalfill.com, email -> gabe@signalfill.com), the couple of hardcoded strings
  outside config (`final-cta.tsx`, `different-section.tsx`), static files the config plugin
  doesn't reach (`site.webmanifest`, `sitemap.xml`, `robots.txt`, `og-image.html`, `README.md`,
  `package.json` name), legal pages' literal `tavynq.com` mentions, and `api/contact.ts`
  (`FROM_ADDRESS` -> website@notify.signalfill.com, `DEFAULT_TO` -> gabe@signalfill.com).
  Kept as-is: the Calendly URL slug (`gabe-tavynq`, an external service, needs Gabe to
  rename it there if he wants) and the GitHub repo name (`GabeT1973/tavynq-website`,
  a separate account-level rename).
- New logo: Gabe's first export had a baked-in checkerboard + baked-in glow (no real alpha),
  so it was rejected per his own rule and not shipped. His second export
  (`src/assets/brand/signalfill-logo-master.png`) is clean: real alpha, sharp anti-aliased
  edges, no baked glow (confirmed with a pixel-level alpha-profile check, not just eyeballing).
  Old `tavynq-logo-master.png` and `tavynq-mark-*` files removed.
  `scripts/generate-brand-assets.mjs` updated: new master path, `signalfill-mark-*` output
  names, SignalFill favicon aria-label, and the trim-bbox alpha threshold raised from >0 to
  >16 (the new export had a few stray near-invisible alpha pixels out near the canvas corners
  that would otherwise blow the crop out to the full canvas).
- Glow redone as CSS only (`src/components/logo.tsx`), never baked into the shipped image:
  `drop-shadow` behind the mark, a gentle blue halo in dark mode and a much fainter one in
  light mode, tight enough it doesn't reach the wordmark. A `size="small"` variant scales it
  down for the footer. No glow on the flat tab favicons (unchanged, those were always a flat
  silhouette); the static home-screen icons (apple-touch, 192, 512, maskable) keep a baked
  glow since there's no CSS available for OS-rendered icons.
  Icon `?v=` bumped 2 -> 3 in `index.html` and `site.webmanifest` since the icons changed.
- `npm run build` passes. Screenshots and Lighthouse: see the branch's PR/preview notes.

Not done yet: merge to `main`, confirm the `www.signalfill.com` production deploy, one real
test through the live contact form, and the `tavynq.com` -> `www.signalfill.com` 308 redirect
(Gabe does this one in Vercel once he's ready to retire the old domain). All blocked on
Gabe reviewing the preview and saying go.
