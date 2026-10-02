// Every editable value on the site lives here: niche, prices, links, contact details.
// index.html's <head> (title, meta, Open Graph, JSON-LD) is filled from this file at build time
// by the plugin in vite.config.ts, so change things here and rebuild.

export const site = {
  name: "Tavynq",
  // Registered business name used in the legal pages. Update if it differs from the brand.
  legalName: "Tavynq",
  url: "https://tavynq.com",

  // Niche placeholder until the real one is chosen. Plural form is used in sentences.
  niche: "recruitment agencies",

  offer: {
    systemName: "The Tavynq Pipeline System",
    headlineStart: "We help",
    headlineResult: "land 3–5 new clients in 90 days",
    headlineEnd: "without relying on referrals.",
    subhead:
      "Beyond a one-time setup fee, you only pay for booked calls that actually show up.",
  },

  pricing: {
    setupFee: { min: 1500, max: 3000 },
    perQualifiedCall: { min: 200, max: 300 },
  },

  // What counts as a billable "qualified call". Mirror whatever goes in the written agreement.
  qualifiedCall: [
    "The prospect fits the ideal client profile we agree on in writing before launch (industry, company size, location, and role).",
    "They're a decision-maker, or bring one to the call.",
    "They booked the call themselves after replying to our outreach.",
    "They show up to the scheduled call.",
  ],

  // PLACEHOLDERS: replace before going live.
  calendlyUrl: "https://calendly.com/your-link",
  // YouTube video ID for the VSL (the part after "watch?v="). Leave empty to show a placeholder.
  youtubeId: "",
  email: "gabe@tavynq.com",
  address: "[Business mailing address placeholder]",

  seo: {
    title: "Tavynq | B2B Lead Generation That Books Qualified Sales Calls",
    description:
      "Tavynq books qualified sales calls for B2B companies with done-for-you cold email. One setup fee, then you only pay for qualified calls that show up.",
    ogImage: "/og-image.png",
    ogImageAlt: "Tavynq: qualified sales calls for B2B companies, booked with cold email.",
  },
} as const

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

export function formatPriceRange({ min, max }: { min: number; max: number }) {
  return min === max ? usd.format(min) : `${usd.format(min)}–${usd.format(max)}`
}
