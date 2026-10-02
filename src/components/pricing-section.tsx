import { CircleCheck, ShieldCheck } from "lucide-react"
import { BookCallLink } from "@/components/book-call-link"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { formatPriceRange, site } from "@/config/site"

const plans = [
  {
    label: "One-time setup",
    price: formatPriceRange(site.pricing.setupFee),
    unit: "once",
    description:
      "Covers your sending domains, inboxes, 14-day warmup, lead lists, and email copy. We quote the exact figure on our call.",
  },
  {
    label: "Per qualified call",
    price: formatPriceRange(site.pricing.perQualifiedCall),
    unit: "per call that shows up",
    description:
      "After setup, you pay only when a qualified prospect actually shows up to a call. No monthly retainer.",
  },
]

export function PricingSection() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="mx-auto max-w-screen-xl px-4 py-20 md:px-8"
    >
      <SectionHeading
        id="pricing-heading"
        eyebrow="Pricing"
        title="Pay for calls, not promises"
        description="One setup fee. After that, you only pay for qualified calls that show up."
      />

      <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
        {plans.map((plan, index) => (
          <Reveal key={plan.label} delay={index * 100} className="h-full">
            <div className="h-full rounded-2xl border border-black/5 bg-white p-8 shadow-sm dark:border-white/5 dark:bg-gray-900">
              <h3 className="text-sm font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {plan.label}
              </h3>
              <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
                <span className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {plan.price}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{plan.unit}</span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {plan.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mx-auto mt-6 max-w-4xl">
        <div className="rounded-2xl border border-blue-600/20 bg-blue-50/60 p-8 dark:border-blue-400/20 dark:bg-blue-500/10">
          <h3
            id="qualified-call"
            className="text-lg font-medium text-gray-900 dark:text-white"
          >
            What counts as a qualified call
          </h3>
          <ul className="mt-4 space-y-3">
            {site.qualifiedCall.map((rule) => (
              <li key={rule} className="flex gap-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                <CircleCheck
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400"
                />
                {rule}
              </li>
            ))}
          </ul>
          <p className="mt-6 flex gap-3 border-t border-blue-600/10 pt-6 text-sm font-medium text-gray-900 dark:border-blue-400/10 dark:text-white">
            <ShieldCheck
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400"
            />
            No-shows are never billed. The full definition goes in your agreement, in writing,
            before anything launches.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 text-center">
        <BookCallLink />
      </div>
    </section>
  )
}
