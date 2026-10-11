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

**Rebrand complete and live: Tavynq -> SignalFill.** `rebrand-signalfill` merged to `main`
2026-10-06 and deployed to production. Gabe added signalfill.com + www to the Vercel project
(verified, redirects to www), set up gabe@signalfill.com in Zoho Mail, and verified
notify.signalfill.com in Resend with a RESEND_API_KEY that works for both notify domains.

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
- `npm run build` passes. Mobile Lighthouse on the preview: performance 98, accessibility 100,
  best practices 100, SEO 100.

Merged and verified live (2026-10-06):
- `www.signalfill.com` confirmed serving the new build (title, meta, `?v=3` icons all correct).
- Sent one real POST to `/api/contact` on production; API returned `{"success":true}`.
- `tavynq.com` (apex) -> `www.signalfill.com` redirect set up by Gabe in Vercel and verified:
  `/`, `/contact`, and `/privacy` all return 308 with the path preserved on the target.

Open issue, not yet fixed: `www.tavynq.com` (the www subdomain of the OLD domain) is broken.
Its TLS cert only covers `tavynq.com` (cert error on `www.tavynq.com` before any redirect
even happens), and underneath that it's still a 307 to the old `tavynq.com` rather than
straight to `www.signalfill.com` - a leftover from before the rebrand that the apex-only fix
didn't touch. Needs the same redirect-to-another-domain fix in Vercel, applied to the
`www.tavynq.com` domain entry specifically.

# Where we left off (2026-10-06)

**Pipeline flow diagram + mobile-overflow tooling, merged and live.** Two branches
(`flow-diagram`, `check-overflow-script`) merged to `main` and confirmed deployed to
`www.signalfill.com`.

Pipeline flow diagram (`src/components/pipeline-flow-diagram.tsx`, in the How It Works
section): an animated SVG-and-CSS flow diagram (4 boxes, 5 labelled dashed arrows, one
desktop layout + one mobile vertical-stack layout) sitting above the original 4-step cards,
which are kept unchanged as the detailed onboarding breakdown beneath it (the diagram tells
a different story - the ongoing campaign cycle - so nothing is duplicated). No new runtime
dependency. Box/arrow coordinates are all plain 0-100 percentages
(`viewBox="0 0 100 100"` + `preserveAspectRatio="none"`) so boxes and the arrows connecting
them can't drift apart at any width - a pixel-based first attempt did drift and caused a
real overlap bug, documented below. Dashes animate continuously even with
`prefers-reduced-motion` (owner exception, same as the hero grid); the per-box pulse glow is
decorative only and does respect it.

**Mobile-overflow tooling methodology correction (important for future sessions):** a plain
headless-browser CLI screenshot (`msedge.exe --headless --window-size=W,H --screenshot=...`)
does NOT reliably emulate a narrow CSS viewport for layout/media-query purposes - it has been
observed consistently rendering pages as if laid out wider than requested, then cropping the
capture at the requested size. This looks exactly like a horizontal-overflow bug but isn't
one, and re-testing the same flawed method multiple ways (fresh browser profile, legacy vs.
new headless mode, longer wait times) just re-confirms the same measurement error rather than
independently verifying anything. **Use `puppeteer-core`'s `page.setViewport()` instead**
(real CDP-based viewport emulation, driving the already-installed Edge/Chrome, no browser
download) for any layout screenshot or overflow check from now on. `npm run check:overflow`
(new, `scripts/check-overflow.mjs`, `puppeteer-core` is now a real devDependency) does this
properly: walks every page across 6 widths (320-768px) x both themes, checks
`document.documentElement.scrollWidth` against the viewport, and reports the root offending
element(s) if it fails. Re-run against production after this merge: **48/48 checks pass,
confirmed clean on `www.signalfill.com`.**

Two real bugs this surfaced and fixed in the diagram itself (not phantom ones - found via the
trusted Puppeteer method, each confirmed by precise DOM measurement, not just screenshots):
- Mobile (320-414px): an arrow label spilled up to 59px past the viewport edge because the
  box-stack width was a fixed px value while the gutter beside it (where the label sits)
  scaled with the viewport - at narrow widths the gutter shrank below what the label needed.
  Fixed by making both the box-stack width and the label/curve positions percentages of the
  same container, and letting the two side labels wrap onto 2 lines.
- Desktop at exactly 768px (narrowest width before this layout applies): a box's description
  wrapped onto an extra line at that narrower box width and grew taller than the
  fixed-percentage layout assumed, overlapping the label below it. Fixed by giving the
  desktop diagram more vertical headroom (`aspect-ratio` 1000/460 -> 1000/560).

Not done: `polish-dynamics` (back-to-top button, logo-goes-home, hero product visual,
spotlight-glow cards) and `trust-tools` (security section, comparison table, ROI calculator,
founder section) were both planned in detail earlier but never approved/started - no
branches exist for either. `prerender-seo` (prerendering, FAQ JSON-LD, Vercel Web Analytics
recommendation) was also planned in detail (researched against official docs: a lightweight
`vite build --ssr` + `StaticRouter` + `renderToString` script, not a React Router
framework-mode migration) but not started either. All three are just sitting as plans in
conversation history, not in this file - pick back up by asking Gabe which (if any) he still
wants.

# Where we left off (2026-10-10)

**New home-screen icon set, on branch `add-new-favicon` (not merged/pushed - Gabe needs to
review and say go-ahead before it touches `main`).**

Gabe supplied a separately-designed favicon pack (`signalfill-favicon.zip`, extracted to
`C:\Users\gabez\Downloads\signalfill-favicon.zip\signalfill-favicon` as Explorer shows it):
a flatter "S" mark - dark navy fill (`#08122a`) with a thin blue glow outline - in two styles:
a transparent-background version (`favicon-*.png`) and a version pre-composited onto a solid
`#08122a` rounded-square backdrop (`icon-*.png` / `apple-touch-icon.png`). This is a different
design from the glossy chrome-style mark in `src/assets/brand/signalfill-logo-master.png`
that the header/footer logo and the existing auto-generated icons use.

**What changed:** only the four home-screen/app icons -
`public/apple-touch-icon.png` (180), `public/icon-192.png`, `public/icon-512.png` (all three
copied straight from the zip's solid-background versions), and `public/icon-maskable-512.png`
(rebuilt from the zip's transparent `favicon-512.png`, composited onto a plain opaque
`#08122a` square at the project's usual 0.56 safe-zone scale - Android's maskable spec needs
a fully opaque square with no pre-rounded corners, and the zip's own `icon-512.png` had
transparent rounded corners, so it couldn't be used as-is for that one file; verified the
mark's own bounding box sits inside the 80% safe-zone circle before and after). `?v=` bumped
3 -> 4 on every icon link in `index.html` and in `site.webmanifest`. Added
`generate-brand-assets.mjs` a header-comment warning that re-running it will silently
overwrite these four files back to the old glossy look, since the script doesn't know about
this manual override.

**Deliberately did NOT change, with reasoning:**
- The tiny browser-tab favicons (`favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`,
  `favicon.svg`) stay the existing flat **blue** silhouette. Composited the zip's small
  navy favicons (16/32/48/64, transparent background) onto a dark tab-bar-grey swatch and a
  white swatch to check: on dark, the new navy mark was nearly invisible (only the thin glow
  line showed at all), while the current blue one read instantly - confirming the "flat blue,
  not navy: reads on light and dark tabs" reasoning already documented in
  `generate-brand-assets.mjs` is still correct. The zip had no design built for tiny dark-tab
  legibility (its small sizes are the same navy-on-transparent mark, and its "icon-*" rounded
  badges at small sizes are solid-background, meant for a different context, not a tab icon).
- Didn't touch `src/components/logo.tsx` (header/footer logo), the OG share image, or the
  master logo file - Gabe's ask was specifically "the favicon," and swapping the live header
  logo to match this new style is a separate, bigger decision he didn't make here.
- `theme-color` (both in `index.html` and `site.webmanifest`) stays `#0a0a0a`, not the `#08122a`
  the new icons use as their own canvas fill. `theme-color` is supposed to match the actual
  page background so the mobile browser chrome blends with scrolled content - the site's real
  background is `#0a0a0a`, so matching the icon artwork's internal padding color instead would
  create a visible seam at the top of the page on mobile instead of fixing one.
- Did not add `apple-mobile-web-app-capable`, `mobile-web-app-capable`,
  `apple-mobile-web-app-status-bar-style`, or the `msapplication-Tile*` tags Gabe's pasted
  checklist suggested. Checked against official docs first: Windows no longer supports pinned
  tiles at all (Microsoft's own Windows 11 spec page: "Live Tiles are no longer available"),
  and iOS 26 now opens every home-screen-added site in app mode by default regardless of these
  tags, so they'd add nothing today and the status-bar-style tag specifically risks the page
  content drawing under the status bar if iOS ever needs it. Did keep
  `apple-mobile-web-app-title` (harmless, gives a clean fixed "SignalFill" label for the
  home-screen icon instead of whichever page's `<title>` happened to be live when it was added).

**Not done:** merge/push - this is sitting on `add-new-favicon` for Gabe to look at the actual
icons (not just read about them) before it goes anywhere near `main`.

**Update, same day: Gabe sent a second, different favicon pack and overrode both flags
above.** New zip (`signalfill-favicon (2).zip`), still on `add-new-favicon`, not pushed.

The new pack is a different mark entirely (a flag/pennant shape with a signal-pulse/heartbeat
line through it, not the "S") on the same `#08122a` navy with a blue glow outline. Gabe
re-sent the exact same instructions as before, unprompted, with one line added at the end:
"Use the transparent favicon-*.png files for small browser tabs" - explicitly re-asserting the
exact point flagged above. Re-ran the same dark/light tab-bar composite test on the new pack's
small sizes first: this one's glow is visibly brighter relative to the shape, so on a dark tab
it actually reads now (not as crisp as the current flat blue, but genuinely visible, unlike the
first pack). Given that plus Gabe repeating the instruction a second time, implemented it as
asked this time instead of pushing back again:

- Replaced every favicon file, not just the four home-screen ones: `favicon-16.png`,
  `favicon-32.png`, `favicon-48.png`, `favicon-64.png` (new, transparent, matching the pack's
  own naming), `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` (new, solid `#08122a`
  background). Deleted the old `favicon-16x16.png`, `favicon-32x32.png`, and `favicon.svg`
  (no vector master for the new mark, so no SVG this round) rather than leaving them orphaned.
  Rebuilt `favicon.ico` from the new 16/32/48 PNGs (not in Gabe's list, kept for old browsers/
  Windows, which still check it first) and `icon-maskable-512.png` the same way as before -
  composited the new pack's transparent `favicon-512.png` onto a solid opaque `#08122a` square
  at the same 0.56 safe-zone scale (also not in Gabe's list; his sample manifest only had two
  `any` icons, no `maskable` - added it anyway since it's a real Android correctness gap with
  no downside, verified the mark's bbox is still well inside the safe circle on the new mark).
- `theme-color` and the manifest's `theme_color`/`background_color` are now `#08122A` as Gabe
  specified, in both `index.html` and `site.webmanifest` - applied this time since he gave the
  same exact hex twice unprompted; still worth knowing it won't exactly match the page's real
  `#0a0a0a` background if that ever becomes visible as a seam on mobile.
- Added back `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`,
  `mobile-web-app-capable`, and the two `msapplication-Tile*` tags, since Gabe's checklist
  listed them again verbatim after I'd explained why I dropped them. The Windows tile tags are
  still inert (Microsoft's own docs: tiles are gone) but harmless.
- `?v=` bumped 4 -> 5 everywhere (every icon link in `index.html`, every icon `src` in
  `site.webmanifest`). Updated `generate-brand-assets.mjs`'s header-comment warning to match
  the new state (now the WHOLE favicon set is manually overridden, not just the four large
  icons, and `favicon.svg` no longer exists at all).

**Update, same day again: fixed the status-bar risk flagged above.** Gabe chose between
reverting to the default status bar or adding safe-area padding; went with the default
(`apple-mobile-web-app-status-bar-style` is now `default`, not `black-translucent`). Picked
that over safe-area padding because the padding fix needs `viewport-fit=cover` on the viewport
meta tag, which changes how regular (non-home-screen) Safari renders the page too - extends
content under the notch/Dynamic Island everywhere, not just in standalone mode - for an edge
case (someone actually adding this marketing site to their home screen) that's rare to begin
with. Default status bar removes the risk with a one-line change and no new rendering surface.
Pushed to `add-new-favicon` (still not merged to `main`).

# Where we left off (2026-10-10, continued)

**New logo mark, on branch `new-logo` (not merged - Gabe needs to say go-ahead).** Replaces
the old "S" with Gabe's new signal-pulse mark (the same shape family as the `add-new-favicon`
branch's icon pack, but recreated as real vector paths and now driving the live header/footer
logo, not just static favicon files).

Source: `C:\Users\gabez\Downloads\logo\anJ2Z.png`, the only file in that folder. 512x512,
genuinely transparent (not baked-white), but DID have a baked-in soft blur glow - stripped for
the clean recreation per Gabe's instruction, since all glow is now done in code/CSS instead.

**No vector source existed anywhere** - the two outer shapes were reconstructed via potrace on
an alpha-threshold mask (with the heartbeat line's hole filled in first via flood-fill from the
canvas border, otherwise potrace traced its thin diagonal edges in painstaking stair-step
detail), and the heartbeat line's vertices were measured directly from pixel data (isolating it
by color was messy - the glow halo bleeds into the gap between the two shapes with a similar
pale tint to the line itself, so had to spatially exclude that area and gate on the red channel).
Shown side-by-side with the original on dark/white before Gabe approved it.

Confirmed via flood-fill: the ribbon and panel are two genuinely separate shapes (a real gap
between them, like the old "S"), not one connected silhouette - this mattered for the outline
glow animation below.

**Animations (`src/index.css`, applied in `src/components/logo.tsx`):**
- A brighter blue light travels around each shape's own outline independently (two separate
  `stroke-dasharray`/`dashoffset` loops, each sized to its own measured path length - ribbon
  719.4, panel 870.1 - so each loop is mathematically seamless). Two independent loops instead
  of one shared path specifically because the shapes don't touch; one path would have to jump
  across that gap every lap, which Gabe's brief explicitly ruled out ("no jump").
- A slower breathing opacity pulse sits underneath (separate blurred stroke copies).
- The heartbeat line gets a dark sweep, left to right, repeating. Built 3 variants (flat black,
  black + pale highlight edge, soft blurred shadow + edge) and rendered all 3 via Puppeteer at
  3 points in the sweep, with the dark-mode cells actually filtered through
  `brightness(1.3) saturate(1.1)` (not just a different page background) since that's the real
  mechanism in the existing CSS that could wash out black-on-navy - the SVG itself always sits
  on the same navy panel in both themes, so a page-background swap alone would've tested the
  wrong thing. Variant C (soft shadow) read noticeably weaker in dark mode; Gabe picked B
  (black + highlight edge).
- Both animations ignore `prefers-reduced-motion` by owner decision (same exception as the hero
  grid and pipeline diagram - not listed in that media-query block).
- Pausing on a hidden tab is a real `visibilitychange` listener in `logo.tsx` (toggles a
  `logo-anim-paused` class that sets `animation-play-state: paused`), not reliance on browser
  throttling - confirmed via Puppeteer that the dash offsets actually freeze (not just slow
  down) when `document.hidden` is true.
- Verified via Puppeteer that `stroke-dashoffset` on the ring/heartbeat paths is actually
  changing frame to frame (the animations are really running, not just defined).

**Placement:** header and footer already had a `<Logo />` slot (unchanged call sites - the
component's props stayed the same shape, so `site-header.tsx`/`site-footer.tsx` needed zero
edits). Confirmed with Gabe there's no separate logo inside the mobile dropdown - the header's
mark already stays visible when it opens, screenshotted to confirm it still looks right at
390px. Click-to-home behavior untouched (still the same `<Link to="/">` wrapper in
`site-header.tsx`).

**Icons regenerated** (`scripts/generate-brand-assets.mjs`, rewritten - no potrace step
anymore since we now have real vector paths, not a raster to trace): flat blue silhouette for
tiny tab icons (16/32/48, no heartbeat detail, no glow - matches the long-standing
"blue-not-navy reads on dark tabs" reasoning), full mark + baked static glow on `#0a0a0a` for
apple-touch/192/512/maskable (a static PNG can't run the live CSS animation, so a baked
approximation of the same glow intent is the equivalent for icon files specifically).
`?v=` bumped 5 -> 6. Also reverted `index.html`'s icon `<link>` block and `site.webmanifest`'s
colors back to the plain, well-reasoned set from before the interim zip-based favicon
detour (`#0a0a0a` theme-color matching the real page background, no Windows tile tags, no
app-mode-only Apple tags beyond `apple-mobile-web-app-title`) - the filenames in `index.html`
had drifted to the old zip pack's naming (`favicon-16.png` etc.) which this rewritten script
no longer produces, so that block needed rewriting anyway; took the opportunity to clean it up
rather than reintroduce the dead tags. Deleted the now-unused `public/favicon-16.png/-32/-48/-64`
from that interim pack.

Removed the old raster-based header/footer pipeline entirely - no more
`signalfill-mark-{28,56,84}.{webp,png}` exports, since the mark is inline SVG in `logo.tsx`
now and never needs a raster export for the live site (only for the static icon files above).

**Checks:** `npm run check:overflow` - 48/48 pass. Lighthouse (local preview build, mobile
emulation): performance 100, accessibility 100, best practices 100, SEO 100.

Not done: merge/push - sitting on `new-logo` for Gabe's go-ahead, same as `add-new-favicon`.

# Where we left off (2026-10-11)

**Urgent hotfix, direct to `main`: Calendly link was 404ing live.** `calendlyUrl` in
`src/config/site.ts` updated to `https://calendly.com/signalfill/msp-walkthrough` (old slug
`gabe-tavynq/tavynq-pilot-walkthrough` was the only place it appeared in code - confirmed via
repo-wide grep - so every "Book a call" button and the inline embed updated from this one
change). Added `hide_gdpr_banner=1` to the embed URL.

**Confirmed live (via Puppeteer, inspecting the actual iframe): the Calendly plan on this
account does NOT honor the embed's `background_color`/`text_color`/`primary_color` params** -
dark mode rendered a stark white Calendly card despite the correct params being in the iframe
src. That's a paid-tier Calendly feature, not something fixable from this side. Per Gabe's own
fallback instruction, stopped trying to force the iframe's internal colors and instead made the
surrounding container blend on purpose: the card frame (`final-cta.tsx`) no longer fights the
inevitable white iframe with a dark background - it's a light panel in both themes, with a
soft blue-glow border in dark mode so it reads as "a bright card on a dark page" rather than a
bug. The loading/failed states inside `calendly-embed.tsx` were also switched from
theme-dependent colors to fixed light-panel colors to match, for the same reason. Light mode
needed no change - the iframe's own fixed white/dark-text/blue-accent look already matched
light mode's card by coincidence.

Checked: `npm run check:overflow` 48/48 pass, Lighthouse (local build, mobile) 100/100/100/100,
all 4 "Book a call" links verified in the live DOM pointing at the new URL, and the new booking
page itself loads without a 404/error (checked the iframe's own text content, not just a
screenshot).

Next: merge this same fix onto `new-logo` so it isn't lost when that branch eventually merges.
