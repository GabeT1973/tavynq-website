// Every editable value on the site lives here: niche, offer, prices, links, contact details.
// index.html's <head> (title, meta, Open Graph, JSON-LD) is filled from this file at build time
// by the plugin in vite.config.ts, so change things here and rebuild.

// Hours a client has after each call to flag it as a bad fit (Bad-Fit Free).
const badFitWindowHours = 24

export const site = {
  name: "Tavynq",
  // Registered business name used in the legal pages. Update if it differs from the brand.
  legalName: "Tavynq",
  url: "https://tavynq.com",

  niche: {
    full: "managed IT service providers",
    short: "MSPs",
    singular: "MSP",
  },

  offer: {
    systemName: "The Tavynq Pipeline System",
    headline: {
      start: "We fill MSP calendars with",
      highlight: "qualified sales calls",
      end: "from local businesses with a real reason to talk, without relying on referrals.",
    },
    subhead: "One setup fee, then you only pay for qualified calls that actually happen.",
  },

  badFitWindowHours,

  pricing: {
    plans: [
      {
        name: "Founding Partner",
        badge: "First 3 MSPs only",
        setupFee: 750,
        perQualifiedCall: 250,
        terms: "In exchange for permission to publish a case study about your results.",
      },
      {
        name: "Standard",
        badge: null,
        setupFee: 1500,
        perQualifiedCall: 250,
        terms: "Everything included, with the same pay-per-call model.",
      },
    ],
  },

  // What counts as a billable "qualified call". Mirror whatever goes in the written agreement.
  qualifiedCall: [
    "The business fits the ideal client profile we agree on in writing before launch (location in your metro, company size, and industry).",
    "The person on the call is a decision-maker, or brings one.",
    "They booked the call themselves after replying to our outreach.",
    "They show up to the scheduled call.",
    `You didn't flag it as a bad fit against our written criteria within ${badFitWindowHours} hours.`,
  ],

  // PLACEHOLDERS: replace before going live.
  calendlyUrl: "https://calendly.com/your-link",
  // YouTube video ID for the VSL (the part after "watch?v="). While empty, the video section
  // and the hero's "Watch" button are hidden.
  youtubeId: "",
  email: "gabe@tavynq.com",
  address: "[Business mailing address placeholder]",

  seo: {
    title: "Tavynq | Qualified Sales Calls for MSPs",
    description:
      "Tavynq books qualified sales calls for managed IT service providers with signal-based cold email. One setup fee, then pay only for calls that happen.",
    ogImage: "/og-image.png",
    ogImageAlt: "Tavynq: qualified sales calls for MSPs, booked with signal-based cold email.",
  },
} as const

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

export function formatUsd(amount: number) {
  return usd.format(amount)
}
