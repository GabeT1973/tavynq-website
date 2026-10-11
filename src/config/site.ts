// Every editable value on the site lives here: niche, offer, prices, links, contact details.
// index.html's <head> (title, meta, Open Graph, JSON-LD) is filled from this file at build time
// by the plugin in vite.config.ts, so change things here and rebuild.

// Hours a client has after each call to flag it as a bad fit (Bad-Fit Free).
const badFitWindowHours = 24
// Days of written notice either side gives to cancel (FAQ + Terms).
const cancellationNoticeDays = 14

export const site = {
  name: "SignalFill",
  // Registered business name used in the legal pages. Update if it differs from the brand.
  legalName: "SignalFill",
  url: "https://www.signalfill.com",

  niche: {
    full: "managed IT service providers",
    short: "MSPs",
    singular: "MSP",
  },

  offer: {
    systemName: "The SignalFill Pipeline System",
    // Rendered as: start + highlighted part (blue gradient) + end. Any part can be empty.
    headline: {
      start: "",
      highlight: "Qualified sales calls",
      end: "for MSPs, without relying on referrals.",
    },
    subhead:
      "We email local businesses with a real reason to talk. One setup fee, then you only pay for qualified calls that actually happen.",
  },

  badFitWindowHours,
  cancellationNoticeDays,

  pricing: {
    plans: [
      {
        name: "Founding Partner",
        // A plan with a badge is shown as the highlighted card.
        badge: "Limited: 3 spots",
        note: "For our first 3 MSP clients only.",
        setupFee: 750,
        perQualifiedCall: 250,
        terms: "In exchange for permission to publish a case study about your results.",
      },
      {
        name: "Standard",
        badge: null,
        note: null,
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

  // Booking link, video, and contact details.
  calendlyUrl: "https://calendly.com/signalfill/msp-walkthrough",
  // YouTube video ID for the VSL (the part after "watch?v="). While empty, the video section
  // and the hero's "Watch" button are hidden.
  youtubeId: "",
  email: "gabe@signalfill.com",
  // The street address lives outside this repo entirely (it's public on GitHub) - this is
  // what the public site shows instead (footer, Privacy, Terms).
  displayLocation: "Tampa Bay, Florida",

  seo: {
    title: "SignalFill | Qualified Sales Calls for MSPs",
    description:
      "SignalFill books qualified sales calls for managed IT service providers with signal-based cold email. One setup fee, then pay only for calls that happen.",
    ogImage: "/og-image.png",
    ogImageAlt: "SignalFill: qualified sales calls for MSPs, booked with signal-based cold email.",
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
