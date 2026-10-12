// Every editable value on the site lives here: niche, offer, prices, links, contact details.
// index.html's <head> (title, meta, Open Graph, JSON-LD) is filled from this file at build time
// by the plugin in vite.config.ts, so change things here and rebuild.

// Hours a client has after each call to flag it as a bad fit (Bad-Fit Replacement).
const badFitWindowHours = 24
// Days of written notice either side gives to cancel after the initial term (FAQ + Terms).
const cancellationNoticeDays = 14
// Length of the initial term before plans go month-to-month (pricing, FAQ, Terms).
const initialTermDays = 90

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
      "We email local businesses with a real reason to talk and book qualified sales calls on your calendar. One flat monthly rate. No long-term lock-in.",
  },

  badFitWindowHours,
  cancellationNoticeDays,
  initialTermDays,

  pricing: {
    // Flip to true once all 3 Founding Partner spots are taken: that card then shows
    // "Founding spots filled" instead of its badge, drops its highlight, and its JSON-LD
    // offer is marked SoldOut.
    foundingSpotsFilled: false,
    plans: [
      {
        name: "Founding Partner",
        // Only the founding plan is affected by foundingSpotsFilled.
        founding: true,
        // The highlighted plan gets the glowing card.
        highlight: true,
        badge: "Limited: 3 spots",
        note: "For our first 3 MSP clients only.",
        monthlyPrice: 1000,
        // Listed first on this card, before the shared `included` list below.
        perks: ["Rate locked for 12 months while subscribed"],
        terms: "In exchange for permission to publish a case study about your results.",
      },
      {
        name: "Standard",
        founding: false,
        highlight: false,
        badge: null,
        note: "Available in any open metro.",
        monthlyPrice: 2000,
        perks: [],
        terms: "Everything included, at one flat monthly rate.",
      },
    ],
    // Shown on every plan card.
    included: [
      `${initialTermDays}-day initial term, then month-to-month with ${cancellationNoticeDays} days' written notice`,
      "No setup fee",
      "Sending domains and inboxes included",
      "Bad-fit calls and no-shows replaced at no extra cost",
    ],
    // Shown below the plan cards.
    tailoredNote:
      "Covering multiple metros, committing to a longer term, or prefer quarterly or annual billing? We'll tailor your rate on the strategy call.",
  },

  // What we target on every call. A call that misses any of these, or that the client flags
  // as a bad fit within badFitWindowHours, is replaced at no extra cost. Mirror whatever goes
  // in the written agreement.
  qualifiedCall: [
    "The business fits the ideal client profile we agree on in writing before launch (location in your metro, company size, and industry).",
    "The person on the call is a decision-maker, or brings one.",
    "They booked the call themselves after replying to our outreach.",
    "They show up to the scheduled call.",
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
      "SignalFill books qualified sales calls for managed IT service providers with signal-based cold email. One flat monthly rate, no setup fee.",
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
